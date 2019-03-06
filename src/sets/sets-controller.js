/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  function manageCartHelpText($scope, $translate, $cookies) {
    var cookiesCartHelp = 'micaHideCartHelpText';

    $translate(['sets.cart.help'])
      .then(function (translation) {
        if (!$scope.options.CartHelpText && !$cookies.get(cookiesCartHelp)) {
          $scope.options.CartHelpText = translation['sets.cart.help'];
        }
      });

    // Close the cart help box and set the local cookies
    $scope.closeHelpBox = function () {
      $cookies.put(cookiesCartHelp, true);
      $scope.options.CartHelpText = null;
    };

    // Retrieve from local cookies if user has disabled the cart help box and hide the box if true
    if ($cookies.get(cookiesCartHelp)) {
      $scope.options.CartHelpText = null;
    }
  }

  ngObibaMica.sets
  .controller('CartController', [
    '$scope',
    '$location',
    '$translate',
    '$cookies',
    'SetService',
    'ngObibaMicaSetsTemplateUrl',
    'AlertService',
    'ngObibaMicaUrl',
    function($scope, $location, $translate, $cookies, SetService, ngObibaMicaSetsTemplateUrl, AlertService, ngObibaMicaUrl) {
      $scope.options = {};
      manageCartHelpText($scope, $translate, $cookies);
      $scope.cartHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('cart');
      $scope.loading = true;
      var limit = 100;

      var onDocuments = function(variables) {
        $scope.loading = false;
        $scope.variables = variables;
      };

      var promisedDocs = SetService.getCartDocuments('variables', 0, limit);
      if (promisedDocs) {
        promisedDocs.then(onDocuments);
      } else {
        $scope.variables = { total: 0 };
      }

      function onUpdate(setId, setName, addedCount) {
        SetsAlertBuilder.newBuilder(AlertService)
          .withId(setId)
          .withName(setName)
          .withCount(addedCount)
          .withMsgKey('sets.set.variables-added')
          .withEmptyMsgKey('sets.set.no-variable-added')
          .withRedirectUrl(ngObibaMicaUrl.getUrl('SetsPage'))
          .showAlert();
      }

      $scope.$on('cart-cleared', function(event, type) {
        $scope.loading = true;
        SetService.getCartDocuments(type, 0, limit).then(onDocuments);
      });

      $scope.onPaginate = function(type, from) {
        SetService.getCartDocuments(type, from, limit).then(onDocuments);
      };

      $scope.onUpdate = onUpdate;
    }])

  .controller('VariableToCartController', [
    '$scope',
    'SetService',
    'AlertService',
    'ngObibaMicaUrl',
    function($scope, SetService, AlertService, ngObibaMicaUrl) {
      $scope.canBeAdded = false;
      $scope.canBeRemoved = false;
      $scope.loading = true;

      $scope.onInit = function(id) {
        SetService.serverConfig().then((config) => {
          const canEditCart = config.isCartEnabled && config.currentUserCanCreateCart;

          SetService.isDocumentInCart('variables', id)
            .then(function () {
              $scope.loading = false;
              $scope.canBeRemoved = canEditCart;
            })
            .catch(function () {
              $scope.loading = false;
              $scope.canBeAdded = canEditCart;
            });
        });
      };

      $scope.onAdd = function(id) {
        $scope.loading = true;
        var beforeCart = SetService.getCartSet('variables');
        SetService.addDocumentToCart('variables', id)
          .then(function(set) {
            $scope.loading = false;
            var addedCount = set.count - (beforeCart ? beforeCart.count : 0);
            $scope.canBeRemoved = addedCount > 0;
            $scope.canBeAdded = !$scope.canBeRemoved;

            SetsAlertBuilder.newBuilder(AlertService)
              .withCount(addedCount)
              .withMsgKey('sets.cart.variable-added')
              .withEmptyMsgKey('sets.cart.no-variable-added')
              .withRedirectUrl(ngObibaMicaUrl.getUrl('CartPage'))
              .showAlert();
          })
          .catch(function() {
            $scope.loading = false;
          });
      };

      $scope.onRemove = function(id) {
        $scope.loading = true;
        var beforeCart = SetService.getCartSet('variables');
        SetService.removeDocumentFromCart('variables', id)
          .then(function(set) {
            $scope.loading = false;
            var removedCount = (beforeCart ? beforeCart.count : 0) - set.count;
            $scope.canBeAdded = removedCount > 0;
            $scope.canBeRemoved = !$scope.canBeAdded;

            SetsAlertBuilder.newBuilder(AlertService)
              .withCount(removedCount)
              .withMsgKey('sets.cart.variable-removed')
              .withEmptyMsgKey('sets.cart.no-variable-removed')
              .withRedirectUrl(ngObibaMicaUrl.getUrl('CartPage'))
              .showAlert();
         })
         .catch(function() {
           $scope.loading = false;
         });
      };

    }])

  .controller('SetsController', [
    '$rootScope',
    '$scope',
    '$route',
    '$location',
    'ObibaSearchOptions',
    'ngObibaMicaSetsTemplateUrl',
    'MetaTaxonomyService',
    'SetsResource',
    'SetResource',
    'SetService',
    'NOTIFICATION_EVENTS',
    'AlertService',
    'ngObibaMicaUrl',
    function (
      $rootScope,
      $scope,
      $route,
      $location,
      ObibaSearchOptions,
      ngObibaMicaSetsTemplateUrl,
      MetaTaxonomyService,
      SetsResource,
      SetResource,
      SetService,
      NOTIFICATION_EVENTS,
      AlertService,
      ngObibaMicaUrl) {

    var searchTaxonomyDisplay = {
      variable: ObibaSearchOptions.variables.showSearchTab,
      dataset: ObibaSearchOptions.datasets.showSearchTab,
      study: ObibaSearchOptions.studies.showSearchTab,
      network: ObibaSearchOptions.networks.showSearchTab
    };

    var limit = 100;
    var registeredlocationChangeEvent;

    $scope.setsHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('sets');

    // use in `initSets` function instead of hard-coded ['variable'] when resources are available
    $scope.tabs = ObibaSearchOptions.targetTabsOrder.filter(function (target) {
      return searchTaxonomyDisplay[target];
    });

    $scope.sets = {};
    $scope.checked = {};
    $scope.canDelete = {};
    $scope.selectedSet = {};

    function findSetById(sets, id) {
      return (sets || []).filter(function(set) {
        return set.id === id;
      }).pop();
    }

    function initSets() {
      MetaTaxonomyService.getMetaTaxonomyForTargets(['variable']).then(function (metaTaxonomies) {
        $scope.useableTabs = metaTaxonomies;
        metaTaxonomies.forEach(function (meta) {
          SetsResource.query({type: targetToType(meta.name)}).$promise.then(function(allSets) {
            return allSets.filter(function (set) { return set.name; });
          }).then(function (sets) {
            $scope.sets[meta.name] = sets;
            var selectedSetId = $scope.selectedSet.id;
            var selectedInSet = findSetById(sets, selectedSetId); // ensure selected is not deleted

            if (selectedInSet) {
              selectSetId(selectedInSet.id);
            } else if (!selectedInSet) {
              // ensure route ID exists and hasn't been deleted
              let routeId =
                $route.current.params.id && $route.current.params.id !== selectedSetId ? $route.current.params.id : null;

              let setToSelect = null;
              if (routeId) {
                setToSelect = routeId;
              } else if (sets.length > 0) {
                setToSelect = sets[0].id;
              } else {
                $scope.selectedSet = {};
                unsetLocationChange();
                $location.search('id', null);
                setLocationChange();
              }
              selectSetId(setToSelect);
            }
          });
        });
      });
    }

    function setLocationChange() {
      if (registeredlocationChangeEvent) {
        unsetLocationChange();
      }
      registeredlocationChangeEvent = $scope.$on('$locationChangeSuccess', () => selectSetId($route.current.params.id));
    }

    function unsetLocationChange() {
      if (registeredlocationChangeEvent) {
        registeredlocationChangeEvent();
        registeredlocationChangeEvent = undefined;
      }
    }

    function selectSetId(setId) {
      if (setId) {
        var foundSet = Object.keys($scope.sets).reduce((acc, key) => acc.concat($scope.sets[key]), []).find((set) => set.id === setId);
        if (foundSet) {
          selectSet(foundSet.type.toLowerCase(), foundSet);
        } else {
          unsetLocationChange();
          setLocationChange();

          if ($scope.selectedSet.id === setId) {
            $scope.selectedSet = {};
          }

          $location.search('id', $scope.selectedSet.id);
        }
      }
    }

    function selectSet(target, set) {
      $scope.loading = true;
      $scope.selectedType = targetToType(target);
      $scope.selectedSet = set;

      unsetLocationChange();
      $location.search('id', set.id);
      setLocationChange();

      var promisedDocs = SetService.getSetDocuments($scope.selectedSet.id, $scope.selectedType, 0, limit);
      if (promisedDocs) {
        promisedDocs.then(onDocuments);
      } else {
        $scope.documents = { total: 0 };
      }
    }

    function onDocuments(documents) {
      $scope.loading = false;
      $scope.documents = documents;

      $scope.selectedSet.count = documents.total;
    }

    function showAlert(setId, setName, addedCount, addedMsgKey, noCountMsgKey, url) {
      let msgKey = addedMsgKey;
      let msgArgs = [url, setId, addedCount, setName];

      if (addedCount === 0) {
        msgKey = noCountMsgKey;
        msgArgs = [];
      }

      AlertService.growl({
        id: 'MainControllerGrowl',
        type: 'info',
        msgKey: msgKey,
        msgArgs: msgArgs,
        delay: 4000
      });
    }

    function onUpdate(setId, setName, addedCount) {
      showAlert(
        setId,
        setName,
        addedCount,
        'sets.set.variables-added',
        'sets.set.no-variable-added',
        ngObibaMicaUrl.getUrl('SetsPage')
      );

      initSets();
    }

    function onPaginate(type, from) {
      if ($scope.selectedSet) {
        SetService.getSetDocuments($scope.selectedSet.id, type, from, limit).then(onDocuments);
      }
    }

    function getCheckedIds(tabName) {
      return Object.keys($scope.checked[tabName]).filter((item) => $scope.checked[tabName][item]);
    }

    function canDeleteChecked(tabName) {
      return $scope.checked[tabName] && getCheckedIds(tabName).length > 0;
    }

    function onDeleteConfirm(event, tabName) {
      getCheckedIds(tabName).reduce((acc, id) => {
        if (acc === undefined || acc === null) {
          return SetResource.delete({id: id, type: targetToType(tabName)}).$promise;
        }

        return acc.then(() => {
          return SetResource.delete({id: id, type: targetToType(tabName)}).$promise;
        });
      }, null).then(() => {
        initCheckBoxes(tabName);
        initSets();
      });

      $scope.onDeleteConfirmed();
    }

    function deleteChecked(tabName) {
      $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
        {
          titleKey: 'sets.delete-dialog.title',
          messageKey: 'sets.delete-dialog.message'
        }, tabName
      );

      $scope.onDeleteConfirmed = $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirm);
    }

    function check(tabName) {
      $scope.canDelete[tabName] = canDeleteChecked(tabName);
    }

    function initCheckBoxes(tabName) {
      $scope.checked[tabName] = {};
      $scope.documents = { total: 0 };
      check(tabName);
    }

    initSets();
    $scope.check = check;
    $scope.deleteChecked = deleteChecked;
    $scope.canDeleteChecked = canDeleteChecked;
    $scope.onUpdate = onUpdate;
    $scope.onPaginate = onPaginate;
    $scope.selectSet = selectSet;
  }]);
})();
