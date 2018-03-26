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
    function($scope, $location, $translate, $cookies, SetService, ngObibaMicaSetsTemplateUrl) {
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
      
      $scope.$on('cart-cleared', function(event, type) {
        $scope.loading = true;
        SetService.getCartDocuments(type, 0, limit).then(onDocuments);
      });

      $scope.onPaginate = function(type, from) {
        SetService.getCartDocuments(type, from, limit).then(onDocuments);
      };
    }])

  .controller('VariableToCartController', [
    '$scope',
    'SetService',
    'AlertService',
    function($scope, SetService, AlertService) {
      $scope.canBeAdded = false;
      $scope.canBeRemoved = false;
      $scope.loading = true;

      $scope.onInit = function(id) {
        SetService.isDocumentInCart('variables', id)
          .then(function() {
            $scope.loading = false;
            $scope.canBeRemoved = true;
          })
          .catch(function() {
            $scope.loading = false;
            $scope.canBeAdded = true;
          });
      };

      $scope.onAdd = function(id) {
        $scope.loading = true;
        var beforeCart = SetService.getCartSet('variables');
        SetService.addDocumentToCart('variables', id)
          .then(function(set) {
            $scope.loading = false;
            var addedCount = set.count - (beforeCart ? beforeCart.count : 0);
            var msgKey = addedCount === 0 ? 'sets.cart.no-variable-added' : 'sets.cart.variable-added';
            $scope.canBeRemoved = addedCount > 0;
            $scope.canBeAdded = !$scope.canBeRemoved;
            AlertService.growl({
              id: 'VariableToCartControllerGrowl',
              type: 'info',
              msgKey: msgKey,
              msgArgs: [],
              delay: 3000
            });
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
            var msgKey = removedCount > 0 ? 'sets.cart.variable-removed' : 'sets.cart.no-variable-removed';
            $scope.canBeAdded = removedCount > 0;
            $scope.canBeRemoved = !$scope.canBeAdded;
            AlertService.growl({
              id: 'VariableToCartControllerGrowl',
              type: 'info',
              msgKey: msgKey,
              msgArgs: [],
              delay: 3000
            });
         })
         .catch(function() {
           $scope.loading = false;
         });
      };

    }]);
})();
