/*!
 * ng-obiba-mica - v3.4.0
 * https://github.com/obiba/ng-obiba-mica
 *
 * License: GNU Public License version 3
 * Date: 2018-07-23
 */
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
var ngObibaMica;
/* exported NgObibaMicaTemplateUrlFactory */
function NgObibaMicaTemplateUrlFactory() {
    var templates = {
        'searchStudiesResultTable': 'search/components/result/studies-result-table/component.html',
        'searchNetworksResultTable': 'search/components/result/networks-result-table/component.html',
        'searchDatasetsResultTable': 'search/components/result/datasets-result-table/component.html',
        'searchCriteriaRegionTemplate': 'search/components/criteria/item-region/region/component.html',
        'vocabularyFilterDetailHeading': 'search/components/vocabulary-filter-detail-heading/component.html',
        'CriterionDropdownTemplate': 'search/components/criteria/item-region/dropdown/component.html',
        'searchResultList': 'search/components/result/search-result/list.html',
        'searchInputList': 'lists/views/input-search-widget/input-search-widget-template.html',
        'searchResultCoverage': 'search/components/result/search-result/coverage.html',
        'searchResultGraphics': 'search/components/result/search-result/graphics.html',
        'variableCrosstab': 'analysis/crosstab/views/crosstab-variable-crosstab.html',
        'variableFrequencies': 'analysis/crosstab/views/crosstab-variable-frequencies.html',
        'variableFrequenciesEmpty': 'analysis/crosstab/views/crosstab-variable-frequencies-empty.html',
        'variableStatistics': 'analysis/crosstab/views/crosstab-variable-statistics.html',
        'variableStatisticsEmpty': 'analysis/crosstab/views/crosstab-variable-statistics-empty.html',
        'searchCellStatValue': 'search/components/result/cell-stat-value/component.html'
    };
    var factory = { registry: null };
    function TemplateUrlProvider(registry) {
        var urlRegistry = registry;
        this.getHeaderUrl = function (key) {
            if (key in urlRegistry) {
                return urlRegistry[key].header;
            }
            return null;
        };
        this.getFooterUrl = function (key) {
            if (key in urlRegistry) {
                return urlRegistry[key].footer;
            }
            return null;
        };
        this.getTemplateUrl = function (key) {
            if (key in urlRegistry) {
                return urlRegistry[key].template ? urlRegistry[key].template : templates[key];
            }
            return null;
        };
    }
    factory.setTemplateUrl = function (key, url) {
        if (key in this.registry) {
            this.registry[key].template = url;
        }
    };
    factory.setHeaderUrl = function (key, url) {
        if (key in this.registry) {
            this.registry[key].header = url;
        }
    };
    factory.setFooterUrl = function (key, url) {
        if (key in this.registry) {
            this.registry[key].footer = url;
        }
    };
    factory.$get = function () {
        return new TemplateUrlProvider(this.registry);
    };
    this.create = function (inputRegistry) {
        factory.registry = inputRegistry;
        return factory;
    };
}
(function () {
    ngObibaMica = angular.module('ngObibaMica', [
        'schemaForm',
        'ngCookies',
        'obiba.mica.utils',
        'obiba.mica.file',
        'obiba.mica.attachment',
        'obiba.mica.access',
        'obiba.mica.search',
        'obiba.mica.analysis',
        'obiba.mica.graphics',
        'obiba.mica.localized',
        'obiba.mica.fileBrowser',
        'angularUtils.directives.dirPagination'
    ]);
    function ServerConfigResourceProvider() {
        var provider = this;
        function setFactory(value) {
            provider.$get = value;
        }
        /**
         * Default
         */
        provider.$get = function () {
            throw new Error('The provider factory method $get() must be overridden by client code.');
        };
        /**
         * Clients can override the $get() method to provide their MicaConfigResource object.
         * @type {setFactory}
         */
        provider.setFactory = setFactory;
    }
    function NgObibaMicaUrlProvider() {
        var registry = {
            'DataAccessClientDetailPath': '',
            'DataAccessClientListPath': '',
            'DataAccessFormConfigResource': 'ws/config/data-access-form',
            'DataAccessAmendmentFormConfigResource': 'ws/config/data-access-amendment-form',
            'DataAccessRequestsResource': 'ws/data-access-requests',
            'DataAccessAmendmentsResource': 'ws/data-access-request/:parentId/amendments',
            'DataAccessAmendmentResource': 'ws/data-access-request/:parentId/amendment/:id',
            'DataAccessRequestsExportHistoryResource': 'ws/data-access-requests/_history?lang=:lang',
            'DataAccessRequestsExportCsvResource': 'ws/data-access-requests/csv?lang=:lang',
            'DataAccessRequestResource': 'ws/data-access-request/:id',
            'DataAccessRequestActionLogsResource': 'ws/data-access-request/:id/_log-actions',
            'DataAccessAmendmentsLogHistoryResource': '/ws/data-access-request/:id/amendments/_history',
            'DataAccessRequestAttachmentsUpdateResource': '/ws/data-access-request/:id/_attachments',
            'DataAccessRequestAttachmentDownloadResource': '/ws/data-access-request/:id/attachments/:attachmentId/_download',
            'SchemaFormAttachmentDownloadResource': '/ws/:path/form/attachments/:attachmentName/:attachmentId/_download',
            'DataAccessRequestDownloadPdfResource': '/ws/data-access-request/:id/_pdf',
            'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments?admin=:admin',
            'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
            'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
            'DataAccessAmendmentStatusResource': 'ws/data-access-request/:parentId/amendment/:id/_status?to=:status',
            'TempFileUploadResource': 'ws/files/temp',
            'TempFileResource': 'ws/files/temp/:id',
            'TaxonomiesSearchResource': 'ws/taxonomies/_search',
            'TaxonomiesResource': 'ws/taxonomies/_filter',
            'TaxonomyResource': 'ws/taxonomy/:taxonomy/_filter',
            'VocabularyResource': 'ws/taxonomy/:taxonomy/vocabulary/:vocabulary/_filter',
            'VariableResource': 'ws/variable/:id',
            'VariableSummaryResource': 'ws/variable/:id/summary',
            'SetsResource': 'ws/:type/sets',
            'SetsImportResource': 'ws/:type/sets/_import',
            'SetResource': 'ws/:type/set/:id',
            'SetClearResource': 'ws/:type/set/:id/documents',
            'SetDocumentsResource': 'ws/:type/set/:id/documents?from=:from&limit=:limit',
            'SetExistsResource': 'ws/:type/set/:id/document/:did/_exists',
            'SetImportResource': 'ws/:type/set/:id/documents/_import',
            'SetImportQueryResource': 'ws/:type/set/:id/documents/_rql',
            'SetRemoveResource': 'ws/:type/set/:id/documents/_delete',
            'JoinQuerySearchResource': 'ws/:type/_rql',
            'JoinQuerySearchCsvResource': 'ws/:type/_rql_csv?query=:query',
            'JoinQuerySearchCsvReportResource': 'ws/:type/_report?query=:query',
            'JoinQuerySearchCsvReportByNetworkResource': 'ws/:type/_report_by_network?networkId=:networkId&locale=:locale',
            'JoinQueryCoverageResource': 'ws/variables/_coverage',
            'JoinQueryCoverageDownloadResource': 'ws/variables/_coverage_download?query=:query',
            'VariablePage': '',
            'NetworkPage': '#/network/:network',
            'StudyPage': '#/:type/:study',
            'StudyPopulationsPage': '#/:type/:study',
            'DatasetPage': '#/:type/:dataset',
            'BaseUrl': '/',
            'FileBrowserFileResource': 'ws/file/:path/',
            'FileBrowserSearchResource': 'ws/files-search/:path',
            'FileBrowserDownloadUrl': 'ws/draft/file-dl/:path?inline=:inline',
            'SearchBaseUrl': '#/search',
            'DocumentSuggestion': 'ws/:documentType/_suggest',
            'EntitiesCountResource': 'ws/datasets/entities/_count?query=:query',
            'EntitiesCountBaseUrl': '#/entities-count',
            'DatasetCategoricalVariablesResource': 'ws/:dsType/:dsId/variables/:query/categorical',
            'DatasetVariablesResource': 'ws/:dsType/:dsId/variables/:query',
            'DatasetVariableResource': 'ws/variable/:varId',
            'DatasetVariablesCrosstabResource': 'ws/:dsType/:dsId/variables/cross/:v1/by/:v2',
            'DatasetResource': 'ws/dataset/:dsType/:dsId',
        };
        function UrlProvider(registry) {
            var urlRegistry = registry;
            this.getUrl = function (resource) {
                if (resource in urlRegistry) {
                    return urlRegistry[resource];
                }
                return null;
            };
        }
        this.setUrl = function (key, url) {
            if (key in registry) {
                registry[key] = url;
            }
        };
        this.$get = function () {
            return new UrlProvider(registry);
        };
    }
    ngObibaMica
        .constant('USER_ROLES', {
        all: '*',
        admin: 'mica-administrator',
        reviewer: 'mica-reviewer',
        editor: 'mica-editor',
        user: 'mica-user',
        dao: 'mica-data-access-officer'
    })
        .config(['$provide', 'paginationTemplateProvider', function ($provide, paginationTemplateProvider) {
            $provide.provider('ngObibaMicaUrl', NgObibaMicaUrlProvider);
            $provide.provider('ObibaServerConfigResource', ServerConfigResourceProvider);
            paginationTemplateProvider.setPath('views/pagination-template.html');
        }]);
})();
//# sourceMappingURL=ng-obiba-mica.js.map
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
(function () {
    ngObibaMica.utils = angular.module('obiba.mica.utils', ['schemaForm', 'LocalStorageModule']);
    ngObibaMica.utils
        .factory('urlEncode', function () {
        return function (input) {
            return window.encodeURIComponent(input);
        };
    })
        .service('GraphicChartsConfigurations', function () {
        this.getClientConfig = function () {
            return true;
        };
        this.setClientConfig = function () {
            return true;
        };
    })
        .directive('fixedHeader', ['$timeout', '$window', function ($timeout, $window) {
            return {
                restrict: 'A',
                scope: {
                    tableMaxHeight: '@',
                    trigger: '=fixedHeader'
                },
                link: function ($scope, $elem) {
                    var elem = $elem[0];
                    function isVisible(el) {
                        var style = $window.getComputedStyle(el);
                        return (style.display !== 'none' && el.offsetWidth !== 0);
                    }
                    function isTableReady() {
                        return isVisible(elem.querySelector('tbody')) && elem.querySelector('tbody tr:first-child') !== null;
                    }
                    $scope.redraw = false;
                    // wait for content to load into table and to have at least one row, tdElems could be empty at the time of execution if td are created asynchronously (eg ng-repeat with promise)
                    function redrawTable() {
                        if ($scope.redraw) {
                            return;
                        }
                        // reset display styles so column widths are correct when measured below
                        angular.element(elem.querySelectorAll('thead, tbody, tfoot')).css('display', '');
                        // wrap in $timeout to give table a chance to finish rendering
                        $timeout(function () {
                            $scope.redraw = true;
                            // set widths of columns
                            var totalColumnWidth = 0;
                            angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {
                                var tdElems = elem.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
                                var tfElems = elem.querySelector('tfoot tr:first-child td:nth-child(' + (i + 1) + ')');
                                var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;
                                if (tdElems) {
                                    tdElems.style.width = columnWidth + 'px';
                                }
                                if (thElem) {
                                    thElem.style.width = columnWidth + 'px';
                                }
                                if (tfElems) {
                                    tfElems.style.width = columnWidth + 'px';
                                }
                                totalColumnWidth = totalColumnWidth + columnWidth;
                            });
                            // set css styles on thead and tbody
                            angular.element(elem.querySelectorAll('thead, tfoot')).css('display', 'block');
                            angular.element(elem.querySelectorAll('tbody')).css({
                                'display': 'block',
                                'max-height': $scope.tableMaxHeight || 'inherit',
                                'overflow': 'auto'
                            });
                            // add missing width to fill the table
                            if (totalColumnWidth < elem.offsetWidth) {
                                var last = elem.querySelector('tbody tr:first-child td:last-child');
                                if (last) {
                                    last.style.width = (last.offsetWidth + elem.offsetWidth - totalColumnWidth) + 'px';
                                    last = elem.querySelector('thead tr:first-child th:last-child');
                                    last.style.width = (last.offsetWidth + elem.offsetWidth - totalColumnWidth) + 'px';
                                }
                            }
                            // reduce width of last column by width of scrollbar
                            var tbody = elem.querySelector('tbody');
                            var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
                            if (scrollBarWidth > 0) {
                                var lastColumn = elem.querySelector('tbody tr:first-child td:last-child');
                                lastColumn.style.width = (parseInt(lastColumn.style.width.replace('px', '')) - scrollBarWidth) + 'px';
                            }
                            $scope.redraw = false;
                        });
                    }
                    // watch table content change
                    $scope.$watchGroup(['trigger', isTableReady], function (newValue) {
                        if (newValue[1] === true) {
                            redrawTable();
                        }
                    });
                    // watch table resize
                    $scope.$watch(function () {
                        return elem.offsetWidth;
                    }, function () {
                        redrawTable();
                    });
                }
            };
        }])
        .directive('routeChecker', ['$route', function ($route) {
            return {
                restrict: 'A',
                scope: {
                    routeCheckerHidesParent: '='
                },
                link: function (scope, elem, attrs) {
                    // remove the '#' character
                    var routeToCheck = attrs.ngHref.substr(1, attrs.ngHref.length - 1);
                    var found = Object.keys($route.routes).filter(function (route) {
                        var regexp = $route.routes[route].regexp;
                        return regexp ? regexp.test(routeToCheck) : false;
                    }).pop();
                    if (!found) {
                        if (scope.routeCheckerHidesParent) {
                            elem.parent().hide();
                        }
                        else {
                            elem.hide();
                        }
                    }
                }
            };
        }])
        .factory('FormDirtyStateObserver', ['$uibModal', '$location',
        function ($uibModal, $location) {
            var onLocationChangeOff;
            return {
                observe: function (scope) {
                    if (onLocationChangeOff) {
                        onLocationChangeOff();
                    }
                    onLocationChangeOff = scope.$on('$locationChangeStart', function (event, newUrl) {
                        if (scope.form && scope.form.$dirty) {
                            $uibModal.open({
                                backdrop: 'static',
                                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                        $scope.ok = function () {
                                            $uibModalInstance.close(true);
                                        };
                                        $scope.cancel = function () {
                                            $uibModalInstance.dismiss('cancel');
                                        };
                                    }],
                                templateUrl: 'utils/views/unsaved-modal.html'
                            }).result.then(function (answer) {
                                if (answer === true) {
                                    onLocationChangeOff();
                                    $location.path(angular.copy($location).url(newUrl).hash());
                                }
                            });
                            event.preventDefault();
                            return;
                        }
                        onLocationChangeOff();
                    });
                },
                unobserve: function () {
                    if (onLocationChangeOff) {
                        onLocationChangeOff();
                    }
                }
            };
        }])
        .service('SfOptionsService', ['$translate', '$q',
        function ($translate, $q) {
            var validationMessages = [
                'required',
                'errors.does-not-validate',
                'errors.localized.completed'
            ];
            this.transform = function () {
                var deferred = $q.defer();
                $translate(validationMessages).then(function (result) {
                    deferred.resolve({
                        validationMessage: {
                            302: result.required,
                            'default': result['errors.does-not-validate'],
                            'completed': result['errors.localized.completed']
                        }
                    });
                });
                return deferred.promise;
            };
        }])
        .config(['schemaFormProvider',
        function (schemaFormProvider) {
            schemaFormProvider.postProcess(function (form) {
                form.filter(function (e) {
                    return e.hasOwnProperty('wordLimit');
                }).forEach(function (e) {
                    e.$validators = {
                        wordLimitError: function (value) {
                            if (angular.isDefined(value) && value !== null) {
                                var wordCount = (value.match(/\S+/g) || []).length;
                                if (wordCount > parseInt(e.wordLimit)) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    };
                });
                return form;
            });
        }])
        .config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('mica')
                .setStorageType('localStorage');
        }]);
})();
//# sourceMappingURL=utils.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var UserProfileModalService = /** @class */ (function () {
    function UserProfileModalService($uibModal, UserProfileService) {
        this.$uibModal = $uibModal;
        this.UserProfileService = UserProfileService;
    }
    UserProfileModalService.prototype.show = function (profile) {
        var applicant = {
            email: this.UserProfileService.getEmail(profile),
            fullName: this.UserProfileService.getFullName(profile),
            profile: profile,
        };
        this.$uibModal.open({
            controller: ["$scope", function ($scope) { return $scope.applicant = applicant; }],
            templateUrl: "utils/services/user-profile-modal/service.html",
        });
    };
    UserProfileModalService.$inject = ["$uibModal", "UserProfileService"];
    return UserProfileModalService;
}());
ngObibaMica.utils.service("UserProfileModalService", UserProfileModalService);
//# sourceMappingURL=service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var UserProfileService = /** @class */ (function () {
    function UserProfileService() {
    }
    UserProfileService.prototype.getAttribute = function (attributes, key) {
        return this.getAttibuteValue(attributes, key);
    };
    UserProfileService.prototype.getFullName = function (profile) {
        var firstName = this.getProfileAttributeValue(profile, "firstName");
        var lastName = this.getProfileAttributeValue(profile, "lastName");
        return firstName && lastName ? firstName + " " + lastName : null;
    };
    UserProfileService.prototype.getEmail = function (profile) {
        return this.getProfileAttributeValue(profile, "email");
    };
    UserProfileService.prototype.getProfileAttributeValue = function (profile, key) {
        if (profile) {
            return this.getAttibuteValue(profile.attributes, key);
        }
        return null;
    };
    UserProfileService.prototype.getAttibuteValue = function (attributes, key) {
        if (attributes) {
            var result = attributes.filter(function (attribute) {
                return attribute.key === key;
            });
            return result && result.length > 0 ? result[0].value : null;
        }
        return null;
    };
    return UserProfileService;
}());
ngObibaMica.utils.service("UserProfileService", UserProfileService);
//# sourceMappingURL=user-profile-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CustomWatchDomElementService = /** @class */ (function () {
    function CustomWatchDomElementService() {
        this.attributes = [];
        var that = this;
    }
    CustomWatchDomElementService.prototype.configWatch = function (node, attributes) {
        this.node = node;
        this.attributes = attributes;
        this.config = { attributeFilter: this.attributes };
        return this;
    };
    CustomWatchDomElementService.prototype.customWatch = function (callback) {
        var observable = function (mutationsList) {
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.type === "attributes") {
                    callback();
                }
            }
        };
        var observer = new MutationObserver(observable);
        observer.observe(this.node, this.config);
    };
    return CustomWatchDomElementService;
}());
ngObibaMica.utils.service("CustomWatchDomElementService", [CustomWatchDomElementService]);
//# sourceMappingURL=custom-watch-dom-element-service.js.map
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
(function () {
    function Controller($rootScope, $timeout, LocalizedSchemaFormService, SfOptionsService, JsonUtils) {
        var ctrl = this, scope = $rootScope.$new();
        ctrl.form = {};
        ctrl.sfOptions = {};
        function broadcastSchemaFormRedraw() {
            $timeout(function () {
                ctrl.form = angular.copy(ctrl.form);
                scope.$broadcast('schemaFormRedraw');
                callOnRedraw(true);
            }, 250);
        }
        function validateSchemaParsing(schema, parseErrorCallback) {
            if (Object.getOwnPropertyNames(schema).length === 0) {
                schema = {};
                if (typeof parseErrorCallback === 'function') {
                    parseErrorCallback();
                }
            }
            return schema;
        }
        function validateDefinitionParsing(definition, parseErrorCallback) {
            if (definition.length === 0) {
                definition = [];
                if (typeof parseErrorCallback === 'function') {
                    parseErrorCallback();
                }
            }
            return definition;
        }
        function getParsingErrorCallback(type) {
            if (typeof ctrl.parsingErrorCallbacks !== 'object') {
                return function () { console.error('Error parsing ', type, ctrl.schemaForm); };
            }
            return ctrl.parsingErrorCallbacks[type];
        }
        function callOnRedraw(value) {
            if (typeof ctrl.onRedraw === 'function') {
                ctrl.onRedraw(value);
            }
        }
        function onChanges(changes) {
            if (changes && changes.schemaForm && changes.schemaForm.currentValue) {
                callOnRedraw(false);
                var form = changes.schemaForm.currentValue;
                ctrl.form.definition = validateDefinitionParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.definition, [])), getParsingErrorCallback('definition'));
                ctrl.form.schema = validateSchemaParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.schema, {})), getParsingErrorCallback('schema'));
                ctrl.form.downloadTemplate = form.pdfDownloadType === 'Template';
                ctrl.form.schema.readonly = ctrl.readOnly;
            }
            broadcastSchemaFormRedraw();
        }
        SfOptionsService.transform().then(function (options) {
            ctrl.sfOptions = options;
            ctrl.sfOptions.pristine = { errors: true, success: false };
        });
        ctrl.$onChanges = onChanges;
    }
    angular.module('obiba.mica.utils').component('obibaSchemaFormRenderer', {
        bindings: {
            schemaForm: '<',
            model: '<',
            readOnly: '<',
            parsingErrorCallbacks: '<',
            onRedraw: '<'
        },
        templateUrl: 'utils/components/entity-schema-form/component.html',
        controller: ['$rootScope', '$timeout', 'LocalizedSchemaFormService', 'SfOptionsService', 'JsonUtils', Controller]
    });
})();
//# sourceMappingURL=component.js.map
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
ngObibaMica.file = angular.module('obiba.mica.file', ['ngResource']);
//# sourceMappingURL=file.js.map
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
ngObibaMica.file
    .filter('bytes', function () {
    return function (bytes) {
        return bytes === null || typeof bytes === 'undefined' ? '' : filesize(bytes);
    };
});
//# sourceMappingURL=file-filter.js.map
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
ngObibaMica.file
    .factory('TempFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('TempFileResource'), {}, {
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }]);
//# sourceMappingURL=file-service.js.map
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
ngObibaMica.attachment = angular.module('obiba.mica.attachment', [
    'obiba.mica.file',
    'ui',
    'ui.bootstrap',
    'ngFileUpload',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=attachment.js.map
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
ngObibaMica.attachment
    .directive('attachmentList', [function () {
        return {
            restrict: 'E',
            scope: {
                hrefBuilder: '=',
                files: '=',
                emptyMessage: '='
            },
            templateUrl: 'attachment/attachment-list-template.html',
            link: function (scope) {
                scope.attachments = [];
                scope.hrefBuilder = scope.hrefBuilder || function (a) { return a.id; };
                scope.hasAttachments = false;
                scope.$watch('files', function (val) {
                    if (val) {
                        scope.hasAttachments = val.length > 0;
                        scope.attachments = val.map(function (a) {
                            var temp = angular.copy(a);
                            temp.href = scope.hrefBuilder(a);
                            return temp;
                        });
                    }
                }, true);
            }
        };
    }])
    .directive('attachmentInput', [function () {
        return {
            restrict: 'E',
            require: '^form',
            scope: {
                multiple: '=',
                accept: '@',
                files: '=',
                disabled: '=',
                onError: '=',
                deleteAttachments: '<'
            },
            templateUrl: 'attachment/attachment-input-template.html',
            controller: 'AttachmentCtrl'
        };
    }])
    .controller('AttachmentCtrl', ['$scope', '$timeout', '$log', 'Upload', 'TempFileResource', 'ngObibaMicaUrl',
    function ($scope, $timeout, $log, Upload, TempFileResource, ngObibaMicaUrl) {
        if ($scope.deleteAttachments === undefined || $scope.deleteAttachments === null) {
            $scope.deleteAttachments = true;
        }
        var uploadFile = function (file) {
            $scope.files = $scope.files || [];
            var attachment = {
                showProgressBar: true,
                lang: 'en',
                progress: 0,
                fileName: file.name,
                size: file.size
            };
            if ($scope.multiple) {
                $scope.files.push(attachment);
            }
            else {
                $scope.files.splice(0, $scope.files.length);
                $scope.files.push(attachment);
            }
            $scope.upload = Upload
                .upload({
                url: ngObibaMicaUrl.getUrl('TempFileUploadResource'),
                method: 'POST',
                file: file
            })
                .progress(function (evt) {
                attachment.progress = parseInt(100.0 * evt.loaded / evt.total);
            })
                .success(function (data, status, getResponseHeaders) {
                var parts = getResponseHeaders().location.split('/');
                var fileId = parts[parts.length - 1];
                TempFileResource.get({ id: fileId }, function (tempFile) {
                    $log.debug('tempFile', tempFile);
                    attachment.id = tempFile.id;
                    attachment.md5 = tempFile.md5;
                    attachment.justUploaded = true;
                    attachment.timestamps = { created: new Date() };
                    // wait for 1 second before hiding progress bar
                    $timeout(function () { attachment.showProgressBar = false; }, 1000);
                });
            })
                .error(function (response) {
                $log.error('File upload failed: ', JSON.stringify(response, null, 2));
                var index = $scope.files.indexOf(attachment);
                if (index !== -1) {
                    $scope.files.splice(index, 1);
                }
                if ($scope.onError) {
                    $scope.onError(attachment);
                }
            });
        };
        $scope.onFileSelect = function (file) {
            $scope.uploadedFiles = file;
            $scope.uploadedFiles.forEach(function (f) {
                uploadFile(f);
            });
        };
        $scope.deleteTempFile = function (tempFileId) {
            TempFileResource.delete({ id: tempFileId }, function () {
                for (var i = $scope.files.length; i--;) {
                    var attachment = $scope.files[i];
                    if (attachment.justUploaded && attachment.id === tempFileId) {
                        $scope.files.splice(i, 1);
                    }
                }
            });
        };
        $scope.deleteFile = function (fileId) {
            for (var i = $scope.files.length; i--;) {
                if ($scope.files[i].id === fileId) {
                    $scope.files.splice(i, 1);
                }
            }
        };
    }
]);
//# sourceMappingURL=attachment-directives.js.map
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
/* global NgObibaMicaTemplateUrlFactory */
ngObibaMica.access = angular.module('obiba.mica.access', [
    'pascalprecht.translate',
    'ui.bootstrap',
    'obiba.alert',
    'obiba.comments',
    'obiba.mica.attachment',
    'obiba.utils',
    'angularMoment',
    'templates-ngObibaMica'
]);
ngObibaMica.access
    .config(['$provide', function ($provide) {
        $provide.provider('ngObibaMicaAccessTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
            list: { header: null, footer: null },
            view: { header: null, footer: null },
            form: { header: null, footer: null },
            amendmentView: { header: null, footer: null },
            amendmentForm: { header: null, footer: null }
        }));
    }]);
//# sourceMappingURL=data-access-request.js.map
'use strict';
(function () {
    function ActionLogEditorController(SessionProxy, $filter) {
        var ctrl = this;
        ctrl.filterOutItemFromCollection = function (item, collection) {
            return (collection || []).filter(function (element) {
                return element.action !== item.action || element.author !== item.author || element.changedOn !== item.changedOn;
            });
        };
        ctrl.sourceCollectionWithout = function (item) {
            return ctrl.filterOutItemFromCollection(item, ctrl.sourceCollection);
        };
        ctrl.replaceActionNameByTranslationKey = function (item) {
            // replace action translation with key if applicable
            var index = (ctrl.predefinedActionNames || []).indexOf(item.action);
            if (index > -1) {
                item.action = ctrl.predefinedActions[index];
            }
        };
        ctrl.add = function (item) {
            ctrl.showError = false;
            if (item && item.action && item.changedOn) {
                ctrl.replaceActionNameByTranslationKey(item);
                item.changedOn = item.changedOn.toISOString();
                if (!item.author) {
                    item.author = SessionProxy.login();
                }
                var result = ctrl.sourceCollectionWithout(item);
                result.push(item);
                if (ctrl.update && typeof ctrl.update === 'function') {
                    ctrl.update({ logs: result });
                    ctrl.item = {};
                    ctrl.changedOn = null;
                }
                else {
                    console.error('Did not create', item);
                }
            }
            else {
                ctrl.showError = true;
            }
        };
        ctrl.predefinedActionsChanged = function (changes) {
            if (changes.predefinedActions && changes.predefinedActions.currentValue) {
                ctrl.predefinedActionNames = ctrl.predefinedActions.map(function (actionKey) {
                    return $filter('translate')(actionKey);
                });
            }
        };
        ctrl.$onChanges = function (changes) {
            ctrl.predefinedActionsChanged(changes);
        };
    }
    function ActionLogItemEditorController(SessionProxy, $uibModal, $filter) {
        var ctrl = this;
        ActionLogEditorController.call(ctrl, SessionProxy, $filter);
        function isAnActionLog(item) {
            return item && item.hasOwnProperty('action') && item.hasOwnProperty('author') && item.hasOwnProperty('changedOn');
        }
        ctrl.remove = function (item) {
            $uibModal.open({
                templateUrl: 'access/components/action-log/item/delete-modal.html',
                controller: ['$uibModalInstance', 'actionLogItem', function ($uibModalInstance, actionLogItem) { this.item = actionLogItem; }],
                controllerAs: '$modal',
                resolve: {
                    actionLogItem: function () {
                        return { action: $filter('translate')(item.action), author: item.author, changedOn: moment(item.changedOn).calendar() };
                    }
                }
            }).result.then(function () {
                var result = ctrl.sourceCollectionWithout(item);
                if (result.length < ctrl.sourceCollection.length && (ctrl.update && typeof ctrl.update === 'function')) {
                    ctrl.update({ logs: result });
                }
                else {
                    console.error('Did not remove', item);
                }
            });
        };
        ctrl.edit = function (item) {
            $uibModal.open({
                templateUrl: 'access/components/action-log/item/edit-modal.html',
                controller: ['$uibModalInstance', 'actionLogItem', 'predefinedActionNames',
                    function ($uibModalInstance, actionLogItem, predefinedActionNames) {
                        this.item = actionLogItem;
                        this.predefinedActionNames = predefinedActionNames;
                    }],
                controllerAs: '$modal',
                size: 'sm',
                resolve: {
                    actionLogItem: function () {
                        return { action: $filter('translate')(item.action), author: item.author, changedOn: new Date(item.changedOn) };
                    },
                    predefinedActionNames: function () {
                        return ctrl.predefinedActionNames;
                    }
                }
            }).result.then(function (editionResult) {
                ctrl.replaceActionNameByTranslationKey(editionResult);
                editionResult.changedOn = editionResult.changedOn.toISOString();
                if (ctrl.update && typeof ctrl.update === 'function') {
                    var result = ctrl.sourceCollectionWithout(item);
                    result = ctrl.filterOutItemFromCollection(editionResult, result);
                    result.push(editionResult);
                    ctrl.update({ logs: result });
                }
                else {
                    console.error('Did not update', item);
                }
            });
        };
        ctrl.$onChanges = function (changes) {
            ctrl.predefinedActionsChanged(changes);
            ctrl.showButtons = ctrl.item && isAnActionLog(ctrl.item);
        };
    }
    angular.module('obiba.mica.access').component('actionLogEditor', {
        bindings: {
            sourceCollection: '<',
            predefinedActions: '<',
            update: '&'
        },
        templateUrl: 'access/components/action-log/component.html',
        controller: ['SessionProxy', '$filter', ActionLogEditorController]
    });
    angular.module('obiba.mica.access').component('actionLogItemEditor', {
        bindings: {
            item: '<',
            sourceCollection: '<',
            predefinedActions: '<',
            update: '&'
        },
        templateUrl: 'access/components/action-log/item/component.html',
        controller: ['SessionProxy', '$uibModal', '$filter', ActionLogItemEditorController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function Controller($rootScope, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS, SessionProxy, USER_ROLES, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, ngObibaMicaUrl, $translate, UserProfileService, UserProfileModalService) {
        var ctrl = this;
        function initializeAddButtonCaption() {
            return ctrl.parentId === null ?
                ctrl.config.newRequestButtonCaption || 'data-access-request.add' :
                'data-access-amendment.add';
        }
        function initializeNoneCaption() {
            return ctrl.parentId === null ? 'data-access-request.none' : 'data-access-amendment.none';
        }
        function onInit() {
            ctrl.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
            ctrl.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
            ctrl.config = DataAccessRequestConfig.getOptions();
            ctrl.searchStatus = {};
            ctrl.loading = true;
            ctrl.addButtonCaption = initializeAddButtonCaption();
            ctrl.noneCaption = initializeNoneCaption();
            ctrl.actions = DataAccessEntityService.actions;
            ctrl.showApplicant = SessionProxy.roles().filter(function (role) {
                return [USER_ROLES.dao, USER_ROLES.admin].indexOf(role) > -1;
            }).length > 0;
            var emitter = $rootScope.$new();
            ctrl.$on = angular.bind(emitter, emitter.$on);
            ctrl.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onConfirmDelete);
            DataAccessEntityService.getStatusFilterData(function (translated) {
                ctrl.REQUEST_STATUS = translated;
            });
        }
        function onSuccess(reqs) {
            for (var i = 0; i < reqs.length; i++) {
                var req = reqs[i];
                if (req.status !== 'OPENED') {
                    for (var j = 0; j < req.statusChangeHistory.length; j++) {
                        var change = req.statusChangeHistory[j];
                        if (change.from === 'OPENED' && change.to === 'SUBMITTED') {
                            req.submissionDate = change.changedOn;
                        }
                    }
                }
            }
            ctrl.requests = reqs;
            ctrl.loading = false;
        }
        var onError = function () {
            ctrl.loading = false;
        };
        function onChanges(changed) {
            if (changed.parentId && changed.parentId.currentValue !== undefined) {
                if (changed.parentId.currentValue === null) {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessRequestsUrl();
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessRequestBaseUrl();
                }
                else {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessAmendmentsUrl(ctrl.parentId);
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessAmendmentBaseUrl(ctrl.parentId);
                }
                DataAccessEntityResource.list(ctrl.listUrl).$promise.then(onSuccess, onError);
            }
        }
        function deleteRequest(request) {
            ctrl.requestToDelete = request.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.delete-dialog.title',
                messageKey: 'data-access-request.delete-dialog.message',
                messageArgs: [request.title, request.applicant]
            }, request.id);
        }
        function getCsvExportHref() {
            return ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource').replace(':lang', $translate.use());
        }
        function getHistoryExportHref() {
            return ngObibaMicaUrl.getUrl('DataAccessRequestsExportHistoryResource').replace(':lang', $translate.use());
        }
        function getDataAccessRequestPageUrl() {
            var DataAccessClientDetailPath = ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
            if (DataAccessClientDetailPath) {
                return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
            }
            else {
                return null;
            }
        }
        function onConfirmDelete(event, id) {
            if (ctrl.requestToDelete === id) {
                DataAccessEntityResource.delete(ctrl.entityBaseUrl, ctrl.requestToDelete).$promise.then(function () {
                    ctrl.loading = true;
                    DataAccessEntityResource.list(ctrl.listUrl).$promise.then(onSuccess, onError);
                }, onError);
                delete ctrl.requestToDelete;
            }
        }
        ctrl.getHistoryExportHref = getHistoryExportHref;
        ctrl.getCsvExportHref = getCsvExportHref;
        ctrl.getDataAccessRequestPageUrl = getDataAccessRequestPageUrl;
        ctrl.deleteRequest = deleteRequest;
        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;
        ctrl.UserProfileService = UserProfileService;
        ctrl.UserProfileModalService = UserProfileModalService;
    }
    ngObibaMica.access
        .component('entityList', {
        bindings: {
            parentId: '<',
            canAdd: '<'
        },
        templateUrl: 'access/components/entity-list/component.html',
        controller: ['$rootScope',
            'DataAccessEntityUrls',
            'DataAccessEntityResource',
            'DataAccessEntityService',
            'NOTIFICATION_EVENTS',
            'SessionProxy',
            'USER_ROLES',
            'ngObibaMicaAccessTemplateUrl',
            'DataAccessRequestConfig',
            'ngObibaMicaUrl',
            '$translate',
            'UserProfileService',
            'UserProfileModalService', Controller]
    });
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var PrintFriendlyController = /** @class */ (function () {
    function PrintFriendlyController() {
    }
    return PrintFriendlyController;
}());
var PrintFriendlyComponent = /** @class */ (function () {
    function PrintFriendlyComponent() {
        this.transclude = true;
        this.bindings = {
            accessForm: "<",
            lastSubmittedDate: "<",
            model: "<",
            project: "<",
            validForm: "<",
        };
        this.controller = PrintFriendlyController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "access/components/print-friendly-view/component.html";
    }
    return PrintFriendlyComponent;
}());
ngObibaMica.access.component("printFriendlyView", new PrintFriendlyComponent());
//# sourceMappingURL=component.js.map
'use strict';
(function () {
    function Service($rootScope, $filter, $location, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS) {
        this.for = function (scope, accessEntity, successCallback, errorCallback) {
            var self = {};
            var parentId = accessEntity['obiba.mica.DataAccessAmendmentDto.amendment'].parentId;
            var entityRootpath = parentId ? DataAccessEntityUrls.getDataAccessAmendmentUrl(parentId, accessEntity.id) :
                DataAccessEntityUrls.getDataAccessRequestUrl(accessEntity.id);
            var prefix = parentId ? 'data-access-amendment' : 'data-access-request';
            function confirmStatusChange(status, messageKey, statusName) {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + '.status-change-confirmation.title',
                    messageKey: messageKey !== null ? messageKey : prefix + '.status-change-confirmation.message',
                    messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
                }, status);
            }
            function statusChangedConfirmed(status, expectedStatus) {
                if (status === expectedStatus) {
                    DataAccessEntityResource.updateStatus(entityRootpath, accessEntity.id, status).$promise.then(successCallback, errorCallback);
                }
            }
            function onDeleteConfirmed(event, id) {
                if (accessEntity.id === id) {
                    DataAccessEntityResource.delete(entityRootpath, id).$promise.then(function () {
                        $location.path(parentId ? '/data-access-request/' + parentId : '/data-access-requests').replace();
                    });
                }
            }
            self.reopen = function () {
                confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
            };
            self.review = function () {
                confirmStatusChange(DataAccessEntityService.status.REVIEWED, prefix + '.status-change-confirmation.message-review', null);
            };
            self.approve = function () {
                confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
            };
            self.reject = function () {
                confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
            };
            self.conditionallyApprove = function () {
                confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
            };
            self.delete = function () {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + '.delete-dialog.title',
                    messageKey: prefix + '.delete-dialog.message',
                    messageArgs: [accessEntity.title, accessEntity.applicant]
                }, accessEntity.id);
            };
            self.printForm = function () {
                setTimeout(function () { window.print(); }, 250);
            };
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
            });
            return self;
        };
    }
    angular.module('obiba.mica.access').service('DataAccessEntityFormService', ['$rootScope', '$filter', '$location', 'DataAccessEntityUrls', 'DataAccessEntityResource', 'DataAccessEntityService', 'NOTIFICATION_EVENTS', Service]);
})();
//# sourceMappingURL=data-access-entity-form-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var DataAccessEntityResource = /** @class */ (function () {
    function DataAccessEntityResource(DataAccessRequestsResource, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessAmendmentResource, DataAccessRequestStatusResource, DataAccessAmendmentStatusResource) {
        this.DataAccessRequestsResource = DataAccessRequestsResource;
        this.DataAccessRequestResource = DataAccessRequestResource;
        this.DataAccessAmendmentsResource = DataAccessAmendmentsResource;
        this.DataAccessAmendmentResource = DataAccessAmendmentResource;
        this.DataAccessRequestStatusResource = DataAccessRequestStatusResource;
        this.DataAccessAmendmentStatusResource = DataAccessAmendmentStatusResource;
    }
    DataAccessEntityResource.prototype.list = function (listUrl) {
        var parentId = this.getParentId(listUrl);
        return parentId ?
            this.DataAccessAmendmentsResource.query({ parentId: parentId }) :
            this.DataAccessRequestsResource.query();
    };
    DataAccessEntityResource.prototype.create = function (listUrl, data, successCallback, errorCallback) {
        var parentId = this.getParentId(listUrl);
        return parentId ?
            this.DataAccessAmendmentsResource.save(data, successCallback, errorCallback) :
            this.DataAccessRequestsResource.save(data, successCallback, errorCallback);
    };
    DataAccessEntityResource.prototype.update = function (entityRootPath, data) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.save(data) :
            this.DataAccessRequestResource.save(data);
    };
    DataAccessEntityResource.prototype.get = function (entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.get({ parentId: parentId, id: id }) :
            this.DataAccessRequestResource.get({ id: id });
    };
    DataAccessEntityResource.prototype.delete = function (entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.delete({ parentId: parentId, id: id }) :
            this.DataAccessRequestResource.delete({ id: id });
    };
    DataAccessEntityResource.prototype.updateStatus = function (entityRootPath, id, status) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentStatusResource.update({ parentId: parentId, id: id, status: status }) :
            this.DataAccessRequestStatusResource.update({ id: id, status: status });
    };
    DataAccessEntityResource.prototype.getParentId = function (url) {
        var parentId = /data-access-request\/(\w+)(?:\/amendment)?/.exec(url);
        return parentId && parentId.length === 2 ? parentId[parentId.index] : null;
    };
    DataAccessEntityResource.$inject = [
        "DataAccessRequestsResource",
        "DataAccessRequestResource",
        "DataAccessAmendmentsResource",
        "DataAccessAmendmentResource",
        "DataAccessRequestStatusResource",
        "DataAccessAmendmentStatusResource",
    ];
    return DataAccessEntityResource;
}());
ngObibaMica.access.service("DataAccessEntityResource", DataAccessEntityResource);
//# sourceMappingURL=data-access-entity-resource.js.map
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
(function () {
    function DataAccessEntityService($translate, SessionProxy, USER_ROLES, ngObibaMicaUrl) {
        var statusList = {
            OPENED: 'OPENED',
            SUBMITTED: 'SUBMITTED',
            REVIEWED: 'REVIEWED',
            CONDITIONALLY_APPROVED: 'CONDITIONALLY_APPROVED',
            APPROVED: 'APPROVED',
            REJECTED: 'REJECTED'
        };
        var actions = {
            canViewProfile: function (role) {
                var found = false;
                var currentUserRoles = SessionProxy.roles();
                angular.forEach(currentUserRoles, function (value) {
                    if (value === role || value === USER_ROLES.admin) {
                        found = true;
                    }
                });
                return found;
            },
            canView: function (request) {
                return canDoAction(request, 'VIEW');
            },
            canEdit: function (request) {
                return canDoAction(request, 'EDIT');
            },
            canEditStatus: function (request) {
                return canDoAction(request, 'EDIT_STATUS');
            },
            canDelete: function (request) {
                return canDoAction(request, 'DELETE');
            },
            canEditAttachments: function (request) {
                return canDoAction(request, 'EDIT_ATTACHMENTS');
            },
            canDeleteAttachments: function (request) {
                return canDoAction(request, 'DELETE_ATTACHMENTS');
            },
            canAddAmendments: function (request) {
                return request['obiba.mica.DataAccessAmendmentDto.amendment'] ? true : canDoAction(request, 'ADD_AMENDMENTS');
            },
            canEditActionLogs: function (request) {
                return canDoAction(request, 'EDIT_ACTION_LOGS');
            },
            canViewPrivateComments: function (request) {
                return canDoAction(request, 'VIEW_PRIVATE_COMMENTS');
            },
            canAddPrivateComments: function (request) {
                return canDoAction(request, 'ADD_PRIVATE_COMMENTS');
            }
        };
        var nextStatus = {
            canSubmit: function (request) {
                return canChangeStatus(request, 'SUBMITTED');
            },
            canReopen: function (request) {
                return canChangeStatus(request, 'OPENED');
            },
            canReview: function (request) {
                return canChangeStatus(request, 'REVIEWED');
            },
            canConditionallyApprove: function (request) {
                return canChangeStatus(request, 'CONDITIONALLY_APPROVED');
            },
            canApprove: function (request) {
                return canChangeStatus(request, 'APPROVED');
            },
            canReject: function (request) {
                return canChangeStatus(request, 'REJECTED');
            }
        };
        function getStatusFilterData(userCallback) {
            if (userCallback) {
                $translate(Object.keys(statusList)).then(function (translation) {
                    userCallback(Object.keys(translation).map(function (key) {
                        return { key: key, translation: translation[key] };
                    }));
                });
            }
        }
        function canDoAction(request, action) {
            return request.actions ? request.actions.indexOf(action) !== -1 : false;
        }
        function canChangeStatus(request, to) {
            return request.nextStatus ? request.nextStatus.indexOf(to) !== -1 : null;
        }
        function getHistoryLogId(log) {
            var id = 'opened';
            if (log.action) {
                id = 'action';
            }
            else if (log.from !== 'OPENED' || log.from !== log.to) {
                switch (log.to) {
                    case 'OPENED':
                        id = 'reopened';
                        break;
                    case 'SUBMITTED':
                        id = 'submitted';
                        break;
                    case 'REVIEWED':
                        id = 'reviewed';
                        break;
                    case 'CONDITIONALLY_APPROVED':
                        id = 'conditionallyApproved';
                        break;
                    case 'APPROVED':
                        id = 'approved';
                        break;
                    case 'REJECTED':
                        id = 'rejected';
                        break;
                }
            }
            return id;
        }
        function processLogsHistory(logs) {
            return (logs || []).map(function (log) {
                switch (getHistoryLogId(log)) {
                    case 'opened':
                        log.msg = 'data-access-request.histories.opened';
                        log.icon = 'glyphicon glyphicon-saved';
                        break;
                    case 'reopened':
                        log.msg = 'data-access-request.histories.reopened';
                        log.icon = 'glyphicon glyphicon-saved';
                        break;
                    case 'submitted':
                        log.msg = 'data-access-request.histories.submitted';
                        log.icon = 'glyphicon glyphicon-export';
                        break;
                    case 'reviewed':
                        log.msg = 'data-access-request.histories.reviewed';
                        log.icon = 'glyphicon glyphicon-check';
                        break;
                    case 'conditionallyApproved':
                        log.msg = 'data-access-request.histories.conditionallyApproved';
                        log.icon = 'glyphicon glyphicon-unchecked';
                        break;
                    case 'approved':
                        log.msg = 'data-access-request.histories.approved';
                        log.icon = 'glyphicon glyphicon-ok';
                        break;
                    case 'rejected':
                        log.msg = 'data-access-request.histories.rejected';
                        log.icon = 'glyphicon glyphicon-remove';
                        break;
                    case 'action':
                        log.msg = log.action;
                        log.icon = 'glyphicon glyphicon-play-circle';
                        log.changedOn = new Date(log.changedOn).toISOString();
                        break;
                }
                return log;
            });
        }
        function getListDataAccessRequestPageUrl() {
            var DataAccessClientListPath = ngObibaMicaUrl.getUrl('DataAccessClientListPath');
            if (DataAccessClientListPath) {
                return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientListPath');
            }
            else {
                return null;
            }
        }
        this.status = statusList;
        this.actions = actions;
        this.nextStatus = nextStatus;
        this.getStatusFilterData = getStatusFilterData;
        this.processLogsHistory = processLogsHistory;
        this.getListDataAccessRequestPageUrl = getListDataAccessRequestPageUrl;
        return this;
    }
    ngObibaMica.access.service('DataAccessEntityService', ['$translate', 'SessionProxy', 'USER_ROLES', 'ngObibaMicaUrl', DataAccessEntityService]);
})();
//# sourceMappingURL=data-access-entity-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var DataAccessEntityUrls = /** @class */ (function () {
    function DataAccessEntityUrls() {
    }
    DataAccessEntityUrls.prototype.getDataAccessRequestsUrl = function () {
        return "/data-access-requests";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestBaseUrl = function () {
        return "/data-access-request";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestUrl = function (id) {
        return this.getDataAccessRequestBaseUrl() + "/" + id;
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentsUrl = function (parentId) {
        return "/data-access-request/" + parentId + "/amendments";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentBaseUrl = function (parentId) {
        return "/data-access-request/" + parentId + "/amendment";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentUrl = function (parentId, id) {
        return this.getDataAccessAmendmentBaseUrl(parentId) + "/" + id;
    };
    return DataAccessEntityUrls;
}());
ngObibaMica.access.service("DataAccessEntityUrls", DataAccessEntityUrls);
//# sourceMappingURL=data-access-entity-urls.js.map
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
ngObibaMica.access
    .controller('DataAccessRequestListController', [
    '$scope',
    'ngObibaMicaAccessTemplateUrl',
    function ($scope, ngObibaMicaAccessTemplateUrl) {
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
    }
])
    .controller('DataAccessRequestViewController', ['$rootScope',
    '$scope',
    '$q',
    '$location',
    '$uibModal',
    '$routeParams',
    '$filter',
    '$translate',
    'DataAccessRequestResource',
    'DataAccessAmendmentsResource',
    'DataAccessEntityService',
    'DataAccessRequestStatusResource',
    'DataAccessFormConfigResource',
    'DataAccessRequestAttachmentsUpdateResource',
    'DataAccessRequestCommentsResource',
    'DataAccessRequestCommentResource',
    'ngObibaMicaUrl',
    'ngObibaMicaAccessTemplateUrl',
    'AlertService',
    'ServerErrorUtils',
    'NOTIFICATION_EVENTS',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'moment',
    'UserProfileService',
    function ($rootScope, $scope, $q, $location, $uibModal, $routeParams, $filter, $translate, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessEntityService, DataAccessRequestStatusResource, DataAccessFormConfigResource, DataAccessRequestAttachmentsUpdateResource, DataAccessRequestCommentsResource, DataAccessRequestCommentResource, ngObibaMicaUrl, ngObibaMicaAccessTemplateUrl, AlertService, ServerErrorUtils, NOTIFICATION_EVENTS, DataAccessRequestConfig, SfOptionsService, moment, UserProfileService) {
        var TAB_NAMES = Object.freeze({
            form: 0,
            amendments: 1,
            documents: 2,
            comments: 3,
            privateComments: 4,
            history: 5
        });
        function onError(response) {
            AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        }
        function onAttachmentError(attachment) {
            AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'server.error.file.upload',
                msgArgs: [attachment.fileName]
            });
        }
        function retrieveComments() {
            DataAccessRequestCommentsResource.query({ id: $routeParams.id, admin: ($scope.privateComments === true) ? true : '' }, function (comments) {
                $scope.form.comments = comments || [];
            });
        }
        function selectTab(tab) {
            switch (tab) {
                case TAB_NAMES.form:
                case TAB_NAMES.history:
                case TAB_NAMES.documents:
                    break;
                case TAB_NAMES.comments:
                    $scope.privateComments = false;
                    if ($scope.parentId === undefined) {
                        retrieveComments();
                    }
                    break;
                case TAB_NAMES.privateComments:
                    if ($scope.parentId === undefined) {
                        $scope.privateComments = true;
                        retrieveComments();
                    }
                    break;
                case TAB_NAMES.amendments:
                    $scope.parentId = $routeParams.id;
                    break;
            }
        }
        function submitComment(comment) {
            DataAccessRequestCommentsResource.save({ id: $routeParams.id, admin: $scope.privateComments === true }, comment.message, retrieveComments, onError);
        }
        function updateComment(comment) {
            DataAccessRequestCommentResource.update({ id: $routeParams.id, commentId: comment.id }, comment.message, retrieveComments, onError);
        }
        function deleteComment(comment) {
            $scope.commentToDelete = comment.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'comment.delete-dialog.title',
                messageKey: 'comment.delete-dialog.message',
                messageArgs: [comment.createdBy]
            }, comment.id);
        }
        function toggleAttachmentsForm(show) {
            if (show) {
                $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
            }
            $scope.showAttachmentsForm = show;
        }
        function getRequest() {
            $q.all([DataAccessRequestResource.get({ id: $routeParams.id }).$promise, DataAccessAmendmentsResource.getLogHistory({ id: $routeParams.id }).$promise]).then(function (values) {
                var dataAccessRequest = values[0], amendmentsLogHistory = values[1];
                try {
                    $scope.dataAccessRequest = dataAccessRequest;
                    $scope.form.model = dataAccessRequest.content ? JSON.parse(dataAccessRequest.content) : {};
                    var requestDownloadUrlPdf = ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
                    $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=') !== -1) ? '&' : '?') + 'lang=' + $translate.use();
                    $scope.attachments = dataAccessRequest.attachments || [];
                    $scope.lastSubmittedDate = findLastSubmittedDate();
                    $scope.logsHistory =
                        DataAccessEntityService.processLogsHistory([].concat((dataAccessRequest.statusChangeHistory), (dataAccessRequest.actionLogHistory || []), (amendmentsLogHistory || []))
                            .sort(function (a, b) {
                            return a.changedOn.localeCompare(b.changedOn);
                        }));
                }
                catch (e) {
                    $scope.validForm = false;
                    $scope.form.model = {};
                    AlertService.alert({
                        id: 'DataAccessRequestViewController',
                        type: 'danger',
                        msgKey: 'data-access-request.parse-error'
                    });
                }
                $scope.loading = false;
            }, onError);
        }
        function updateAttachments() {
            var request = angular.copy($scope.dataAccessRequest);
            request.attachments = $scope.attachments;
            DataAccessRequestAttachmentsUpdateResource.save(request, function () {
                toggleAttachmentsForm(false);
                getRequest();
            });
        }
        function initializeForm() {
            SfOptionsService.transform().then(function (options) {
                $scope.sfOptions = options;
                $scope.sfOptions.pristine = { errors: true, success: false };
            });
            // Retrieve form data
            DataAccessFormConfigResource.get(function onSuccess(dataAccessForm) {
                $scope.dataAccessForm = dataAccessForm;
            }, onError);
        }
        function findLastSubmittedDate() {
            var history = $scope.dataAccessRequest.logsHistory || [];
            return history.filter(function (item) {
                return item.to === DataAccessEntityService.status.SUBMITTED;
            }).sort(function (a, b) {
                if (moment(a).isBefore(b)) {
                    return -1;
                }
                if (moment(a).isSame(b)) {
                    return 0;
                }
                if (moment(a).isAfter(b)) {
                    return 1;
                }
            }).pop();
        }
        function deleteEntity() {
            $scope.requestToDelete = $scope.dataAccessRequest.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.delete-dialog.title',
                messageKey: 'data-access-request.delete-dialog.message',
                messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
            }, $scope.requestToDelete);
        }
        function getDownloadHref(attachment) {
            return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
                .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
        }
        function onDeleteConfirmed(event, id) {
            if ($scope.requestToDelete === id) {
                DataAccessRequestResource.delete({ id: $scope.requestToDelete }, function () {
                    $location.path('/data-access-requests').replace();
                });
                delete $scope.requestToDelete;
            }
        }
        function onUpdatStatusSuccess() {
            setTimeout(function () {
                getRequest();
            });
        }
        function confirmStatusChange(status, messageKey, statusName) {
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.status-change-confirmation.title',
                messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
                messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
            }, status);
        }
        function statusChangedConfirmed(status, expectedStatus) {
            if (status === expectedStatus) {
                DataAccessRequestStatusResource.update({
                    id: $scope.dataAccessRequest.id,
                    status: status
                }, onUpdatStatusSuccess, onError);
            }
        }
        function printForm() {
            // let angular digest!
            setTimeout(function () { window.print(); }, 250);
        }
        function submitForm() {
            $scope.$broadcast('schemaFormValidate');
            if ($scope.forms.requestForm.$valid) {
                DataAccessRequestStatusResource.update({
                    id: $scope.dataAccessRequest.id,
                    status: DataAccessEntityService.status.SUBMITTED
                }, function onSubmitted() {
                    $uibModal.open({
                        scope: $scope,
                        templateUrl: 'access/views/data-access-request-submitted-modal.html'
                    }).result.then(function () {
                        onUpdatStatusSuccess();
                    });
                }, onError);
            }
            else {
                AlertService.alert({
                    id: 'DataAccessRequestViewController',
                    type: 'danger',
                    msgKey: 'data-access-request.submit.invalid'
                });
            }
        }
        function onDeleteCommentConfirmed(event, id) {
            if ($scope.commentToDelete === id) {
                DataAccessRequestCommentResource.delete({ id: $routeParams.id, commentId: id }, {}, retrieveComments, onError);
            }
        }
        function updateActionLogs(actionLogs) {
            if (Array.isArray(actionLogs)) {
                $scope.loading = true;
                $scope.dataAccessRequest.actionLogHistory = actionLogs;
                DataAccessRequestResource.editActionLogs($scope.dataAccessRequest, function () {
                    onUpdatStatusSuccess();
                });
            }
        }
        function reOpen() {
            confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
        }
        function review() {
            confirmStatusChange(DataAccessEntityService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
        }
        function approve() {
            confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
        }
        function reject() {
            confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
        }
        function conditionallyApprove() {
            confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
        }
        function onStatusOpened(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
        }
        function onStatusReviewed(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
        }
        function onStatusConditionallyApproved(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
        }
        function onStatusApproved(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
        }
        function onStatusRejected(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
        }
        function getFullName(profile) {
            return UserProfileService.getFullName(profile);
        }
        $scope.logsHistory = [];
        $scope.parentId = undefined;
        $scope.loading = false;
        $scope.validForm = true;
        $scope.config = DataAccessRequestConfig.getOptions();
        $scope.actions = DataAccessEntityService.actions;
        $scope.nextStatus = DataAccessEntityService.nextStatus;
        $scope.showAttachmentsForm = false;
        $scope.selectTab = selectTab;
        $scope.delete = deleteEntity;
        $scope.submitComment = submitComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;
        $scope.getDownloadHref = getDownloadHref;
        $scope.updateAttachments = updateAttachments;
        $scope.cancelAttachments = function () { toggleAttachmentsForm(false); };
        $scope.editAttachments = function () { toggleAttachmentsForm(true); };
        $scope.updateActionLogs = updateActionLogs;
        $scope.onAttachmentError = onAttachmentError;
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
        $scope.submit = submitForm;
        $scope.reopen = reOpen;
        $scope.review = review;
        $scope.approve = approve;
        $scope.reject = reject;
        $scope.conditionallyApprove = conditionallyApprove;
        $scope.UserProfileService = UserProfileService;
        $scope.userProfile = function (profile) {
            $scope.applicant = profile;
            $uibModal.open({
                scope: $scope,
                templateUrl: 'access/views/data-access-request-profile-user-modal.html'
            });
        };
        $scope.dataAccessRequest = {};
        $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
        $scope.printForm = printForm;
        $scope.getFullName = getFullName;
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteCommentConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusOpened);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusReviewed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusConditionallyApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusRejected);
        $rootScope.$on('$translateChangeSuccess', initializeForm);
        $scope.tabs = { activeTab: 0 };
        $scope.TAB_NAMES = TAB_NAMES;
        $scope.forms = {};
        $scope.form = {
            schema: null,
            definition: null,
            model: {},
            comments: null
        };
        if ($routeParams.id) {
            initializeForm();
            getRequest();
        }
    }])
    .controller('DataAccessRequestEditController', ['$rootScope',
    '$log',
    '$scope',
    '$routeParams',
    '$location',
    '$uibModal', 'LocalizedSchemaFormService',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessFormConfigResource',
    'JsonUtils',
    'AlertService',
    'ServerErrorUtils',
    'SessionProxy',
    'DataAccessEntityService',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'FormDirtyStateObserver',
    'DataAccessRequestDirtyStateService',
    '$timeout',
    function ($rootScope, $log, $scope, $routeParams, $location, $uibModal, LocalizedSchemaFormService, DataAccessRequestsResource, DataAccessRequestResource, DataAccessFormConfigResource, JsonUtils, AlertService, ServerErrorUtils, SessionProxy, DataAccessEntityService, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, SfOptionsService, FormDirtyStateObserver, DataAccessRequestDirtyStateService, $timeout) {
        var onSuccess = function (response, getResponseHeaders) {
            FormDirtyStateObserver.unobserve();
            var parts = getResponseHeaders().location.split('/');
            $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
        };
        var onError = function (response) {
            AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        };
        function onAttachmentError(attachment) {
            AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'server.error.file.upload',
                msgArgs: [attachment.fileName]
            });
        }
        $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
        var validate = function (form) {
            $scope.$broadcast('schemaFormValidate');
            $uibModal.open({
                resolve: {
                    isValid: form.$valid
                },
                templateUrl: 'access/views/data-access-request-validation-modal.html',
                controller: ['$scope', 'isValid', function ($scope, isValid) {
                        $scope.isValid = isValid;
                    }]
            });
        };
        var cancel = function () {
            $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
        };
        var save = function () {
            $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);
            if ($scope.newRequest) {
                DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
            }
            else {
                DataAccessRequestResource.save($scope.dataAccessRequest, function () {
                    FormDirtyStateObserver.unobserve();
                    $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
                }, onError);
            }
        };
        function initializeForm() {
            // Retrieve form data
            SfOptionsService.transform().then(function (options) {
                $scope.sfOptions = options;
                $scope.sfOptions.onError = onAttachmentError;
            });
            DataAccessFormConfigResource.get(function onSuccess(dataAccessForm) {
                $scope.sfForm.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
                $scope.sfForm.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
                if ($scope.sfForm.definition.length === 0) {
                    $scope.sfForm.definition = [];
                    $scope.validForm = false;
                    AlertService.alert({
                        id: 'DataAccessRequestEditController',
                        type: 'danger',
                        msgKey: 'data-access-config.parse-error.definition'
                    });
                }
                if (Object.getOwnPropertyNames($scope.sfForm.schema).length === 0) {
                    $scope.sfForm.schema = {};
                    $scope.validForm = false;
                    AlertService.alert({
                        id: 'DataAccessRequestEditController',
                        type: 'danger',
                        msgKey: 'data-access-config.parse-error.schema'
                    });
                }
                if ($scope.validForm) {
                    $scope.dataAccessRequest = $routeParams.id ?
                        DataAccessRequestResource.get({ id: $routeParams.id }, function onSuccess(request) {
                            try {
                                $scope.sfForm.model = request.content ? JSON.parse(request.content) : {};
                            }
                            catch (e) {
                                $scope.sfForm.model = {};
                                AlertService.alert({
                                    id: 'DataAccessRequestEditController',
                                    type: 'danger',
                                    msgKey: 'data-access-request.parse-error'
                                });
                            }
                            $scope.canEdit = DataAccessEntityService.actions.canEdit(request);
                            $scope.sfForm.schema.readonly = !$scope.canEdit;
                            $scope.$broadcast('schemaFormRedraw');
                            request.attachments = request.attachments || [];
                            return request;
                        }) : {
                        applicant: SessionProxy.login(),
                        status: DataAccessEntityService.status.OPENED,
                        attachments: []
                    };
                }
                $timeout(function () {
                    $scope.sfForm = angular.copy($scope.sfForm);
                    $scope.loaded = true;
                }, 250);
            }, onError);
        }
        $rootScope.$on('$translateChangeSuccess', function () {
            initializeForm();
        });
        initializeForm();
        $scope.loaded = false;
        $scope.config = DataAccessRequestConfig.getOptions();
        $scope.validForm = true;
        $scope.requestId = $routeParams.id;
        $scope.newRequest = $routeParams.id ? false : true;
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.editable = true;
        $scope.validate = validate;
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('form');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('form');
        $scope.sfForm = {
            schema: null,
            definition: null,
            model: {}
        };
        FormDirtyStateObserver.observe($scope);
        DataAccessRequestDirtyStateService.setForm($scope.form);
        $scope.$on('$destroy', function () {
            DataAccessRequestDirtyStateService.setForm(null);
        });
    }]);
//# sourceMappingURL=data-access-request-controller.js.map
'use strict';
(function () {
    function Controller($scope, $location, $q, $routeParams, $uibModal, DataAccessEntityResource, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, DataAccessEntityService, ServerErrorUtils, AlertService, DataAccessRequestDirtyStateService, FormDirtyStateObserver, SessionProxy, ngObibaMicaAccessTemplateUrl) {
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function onSuccess(response, headersFunction) {
            FormDirtyStateObserver.unobserve();
            var parts = headersFunction().location.split('/');
            $location.path($scope.entityUrl + '/amendment/' + parts[parts.length - 1]).replace();
        }
        function onError(response) {
            AlertService.alert({
                id: 'DataAccessAmendmentEditController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        }
        function destroyFormObserver() {
            FormDirtyStateObserver.unobserve();
            DataAccessRequestDirtyStateService.setForm(null);
        }
        $scope.entityUrl = $routeParams.id ? DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id) : DataAccessEntityUrls.getDataAccessRequestUrl($routeParams.parentId);
        $scope.read = false;
        $scope.formDrawn = false;
        var amendment = $routeParams.id ?
            DataAccessEntityResource.get($scope.entityUrl, $routeParams.id) :
            {
                'obiba.mica.DataAccessAmendmentDto.amendment': { parentId: $routeParams.parentId },
                $promise: new Promise(function (resolve) { setTimeout(resolve, 0, {}); }),
                status: DataAccessEntityService.status.OPENED
            };
        var model = amendment.$promise.then(getDataContent);
        var dataAccessForm = DataAccessAmendmentFormConfigResource.get();
        $q.all([amendment, model, dataAccessForm.$promise]).then(function (values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            return values;
        }, function (reason) {
            console.error('Failed to resolve amendment promises because', reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('amendmentForm');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('amendmentForm');
        FormDirtyStateObserver.observe($scope);
        DataAccessRequestDirtyStateService.setForm($scope.form);
        $scope.$on('$destroy', destroyFormObserver);
        $scope.cancel = function () {
            destroyFormObserver();
            $location.path($scope.entityUrl).replace();
        };
        $scope.save = function () {
            $scope.requestEntity.content = angular.toJson($scope.model);
            $scope.requestEntity.parentId = $routeParams.parentId;
            delete $scope.requestEntity.$promise;
            if (!$scope.requestEntity.applicant) {
                $scope.requestEntity.applicant = SessionProxy.login();
            }
            if (!$routeParams.id) {
                DataAccessEntityResource.create($scope.entityUrl, $scope.requestEntity, onSuccess, onError);
            }
            else {
                DataAccessEntityResource.update($scope.entityUrl, $scope.requestEntity).$promise.then(function () {
                    FormDirtyStateObserver.unobserve();
                    $location.path($scope.entityUrl).replace();
                }, onError);
            }
        };
        $scope.validate = function (form) {
            $scope.$broadcast('schemaFormValidate');
            $uibModal.open({
                resolve: {
                    isValid: form.$valid
                },
                templateUrl: 'access/views/data-access-request-validation-modal.html',
                controller: ['$scope', 'isValid', function ($scope, isValid) {
                        $scope.isValid = isValid;
                    }]
            });
        };
        $scope.toggleFormDrawnStatus = function (value) {
            $scope.formDrawn = value;
        };
    }
    angular.module('obiba.mica.access')
        .controller('DataAccessAmendmentEditController', ['$scope',
        '$location',
        '$q',
        '$routeParams',
        '$uibModal',
        'DataAccessEntityResource',
        'DataAccessAmendmentFormConfigResource',
        'DataAccessEntityUrls',
        'DataAccessEntityService',
        'ServerErrorUtils',
        'AlertService',
        'DataAccessRequestDirtyStateService',
        'FormDirtyStateObserver',
        'SessionProxy',
        'ngObibaMicaAccessTemplateUrl',
        Controller
    ]);
})();
//# sourceMappingURL=data-access-amendment-edit-controller.js.map
'use strict';
(function () {
    function Controller($scope, $routeParams, $q, $uibModal, DataAccessEntityResource, DataAccessEntityService, DataAccessEntityFormService, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, AlertService, ngObibaMicaAccessTemplateUrl) {
        // Begin profileService
        function getAttributeValue(attributes, key) {
            var result = attributes.filter(function (attribute) {
                return attribute.key === key;
            });
            return result && result.length > 0 ? result[0].value : null;
        }
        $scope.userProfile = function (profile) {
            $scope.applicant = profile;
            $uibModal.open({
                scope: $scope,
                templateUrl: 'access/views/data-access-request-profile-user-modal.html'
            });
        };
        $scope.getFullName = function (profile) {
            if (profile) {
                if (profile.attributes) {
                    return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
                }
                return profile.username;
            }
            return null;
        };
        $scope.getProfileEmail = function (profile) {
            if (profile) {
                if (profile.attributes) {
                    return getAttributeValue(profile.attributes, 'email');
                }
            }
            return null;
        };
        // End profileService
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function resetRequestEntity() {
            var entity = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
            $q.all([entity, entity.$promise.then(getDataContent)])
                .then(function (values) {
                $scope.requestEntity = values[0];
                $scope.model = values[1];
            });
        }
        $scope.entityUrl = DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id);
        $scope.read = true;
        $scope.formDrawn = false;
        var amendment = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
        var model = amendment.$promise.then(getDataContent);
        var dataAccessForm = DataAccessAmendmentFormConfigResource.get();
        $q.all([amendment, model, dataAccessForm.$promise]).then(function (values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            $scope.actions = DataAccessEntityService.actions;
            $scope.nextStatus = DataAccessEntityService.nextStatus;
            Object.assign($scope, DataAccessEntityFormService.for($scope, $scope.requestEntity, resetRequestEntity));
            return values;
        }, function (reason) {
            console.error('Failed to resolve amendment promises because', reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('amendmentView');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('amendmentView');
        $scope.submit = function () {
            $scope.$broadcast('schemaFormValidate');
            if ($scope.forms.requestForm.$valid) {
                DataAccessEntityResource.updateStatus($scope.entityUrl, $routeParams.id, DataAccessEntityService.status.SUBMITTED).$promise
                    .then(function () {
                    $uibModal.open({
                        scope: $scope,
                        templateUrl: 'access/views/data-access-request-submitted-modal.html'
                    }).result.then(function () {
                        resetRequestEntity();
                    });
                });
            }
            else {
                AlertService.alert({
                    id: 'DataAccessAmendmentViewController',
                    type: 'danger',
                    msgKey: 'data-access-request.submit.invalid'
                });
            }
        };
        $scope.toggleFormDrawnStatus = function (value) {
            $scope.formDrawn = value;
        };
    }
    angular.module('obiba.mica.access').controller('DataAccessAmendmentViewController', [
        '$scope',
        '$routeParams',
        '$q',
        '$uibModal',
        'DataAccessEntityResource',
        'DataAccessEntityService',
        'DataAccessEntityFormService',
        'DataAccessAmendmentFormConfigResource',
        'DataAccessEntityUrls',
        'AlertService',
        'ngObibaMicaAccessTemplateUrl',
        Controller
    ]);
})();
//# sourceMappingURL=data-access-amendment-view-controller.js.map
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
ngObibaMica.access
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/data-access-requests', {
            templateUrl: 'access/views/data-access-request-list.html',
            controller: 'DataAccessRequestListController'
        })
            .when('/data-access-request/new', {
            templateUrl: 'access/views/data-access-request-form.html',
            controller: 'DataAccessRequestEditController'
        })
            .when('/data-access-request/:id/edit', {
            templateUrl: 'access/views/data-access-request-form.html',
            controller: 'DataAccessRequestEditController'
        })
            .when('/data-access-request/:id', {
            templateUrl: 'access/views/data-access-request-view.html',
            controller: 'DataAccessRequestViewController'
        })
            .when('/data-access-request/:parentId/amendment/new', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentEditController'
        })
            .when('/data-access-request/:parentId/amendment/:id/edit', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentEditController'
        })
            .when('/data-access-request/:parentId/amendment/:id', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentViewController'
        });
    }]);
//# sourceMappingURL=data-access-request-router.js.map
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
ngObibaMica.access
    .factory('DataAccessFormConfigResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessFormConfigResource'), {}, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('DataAccessAmendmentFormConfigResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentFormConfigResource'), {}, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('DataAccessRequestsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsResource'), {}, {
            'save': { method: 'POST', errorHandler: true },
            'get': { method: 'GET' }
        });
    }])
    .factory('DataAccessRequestsExportCsvResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource'), {}, {
            'get': { method: 'GET' }
        });
    }])
    .factory('DataAccessRequestResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestResource'), {}, {
            'save': { method: 'PUT', params: { id: '@id' }, errorHandler: true },
            'editActionLogs': { method: 'PUT', params: { id: '@id' }, url: ngObibaMicaUrl.getUrl('DataAccessRequestActionLogsResource'), errorHandler: true },
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }])
    .factory('DataAccessAmendmentsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentsResource'), {}, {
            'save': { method: 'POST', params: { parentId: '@parentId' }, errorHandler: true },
            'get': { method: 'GET', params: { parentId: '@parentId' } },
            'getLogHistory': { method: 'GET', isArray: true, url: ngObibaMicaUrl.getUrl('DataAccessAmendmentsLogHistoryResource') }
        });
    }])
    .factory('DataAccessAmendmentResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentResource'), {}, {
            'save': { method: 'PUT', params: { parentId: '@parentId', id: '@id' }, errorHandler: true },
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }])
    .factory('DataAccessRequestAttachmentsUpdateResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentsUpdateResource'), {}, {
            'save': { method: 'PUT', params: { id: '@id' }, errorHandler: true }
        });
    }])
    .factory('DataAccessRequestCommentsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentsResource'), {}, {
            'save': {
                method: 'POST',
                params: { id: '@id', admin: '@admin' },
                headers: { 'Content-Type': 'text/plain' },
                errorHandler: true
            },
            'get': { method: 'GET', params: { id: '@id', admin: '@admin' }, errorHandler: true }
        });
    }])
    .factory('DataAccessRequestCommentResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentResource'), {}, {
            'delete': {
                method: 'DELETE',
                params: { id: '@id', commentId: '@commentId' },
                errorHandler: true
            },
            'update': {
                method: 'PUT',
                params: { id: '@id', commentId: '@commentId' },
                headers: { 'Content-Type': 'text/plain' },
                errorHandler: true
            }
        });
    }])
    .factory('DataAccessRequestStatusResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestStatusResource'), {}, {
            'update': {
                method: 'PUT',
                params: { id: '@id', status: '@status' },
                errorHandler: true
            }
        });
    }])
    .factory('DataAccessAmendmentStatusResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentStatusResource'), {}, {
            'update': {
                method: 'PUT',
                params: { id: '@id', parentId: '@parentId', status: '@status' },
                errorHandler: true
            }
        });
    }])
    .service('DataAccessRequestConfig', function () {
    var options = {
        newRequestButtonCaption: null,
        documentsSectionTitle: null,
        documentsSectionHelpText: null,
        downloadButtonCaption: null,
        commentsEnabled: true,
        userListPageTitle: null,
        newRequestButtonHelpText: null
    };
    this.setOptions = function (newOptions) {
        if (typeof (newOptions) === 'object') {
            Object.keys(newOptions).forEach(function (option) {
                if (option in options) {
                    options[option] = newOptions[option];
                }
            });
        }
    };
    this.getOptions = function () {
        return angular.copy(options);
    };
})
    .service('DataAccessRequestDirtyStateService', [
    function () {
        var form = null;
        this.setForm = function (f) {
            form = f;
        };
        this.isDirty = function () {
            return form && form.$dirty;
        };
    }
])
    .filter('filterProfileAttributes', function () {
    return function (attributes) {
        var exclude = ['email', 'firstName', 'lastName', 'createdDate', 'lastLogin', 'username'];
        return attributes.filter(function (attribute) {
            return exclude.indexOf(attribute.key) === -1;
        });
    };
})
    .filter('capitalizeFirstLetter', ['StringUtils', function (StringUtils) {
        return function (text) {
            return StringUtils.capitaliseFirstLetter(text);
        };
    }]);
//# sourceMappingURL=data-access-request-service.js.map
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
ngObibaMica.sets = angular.module('obiba.mica.sets', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica',
    'LocalStorageModule'
]);
//# sourceMappingURL=sets.js.map
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
/* global NgObibaMicaTemplateUrlFactory */
(function () {
    ngObibaMica.sets
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaSetsTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
                cart: { header: null, footer: null }
            }));
        }]);
})();
//# sourceMappingURL=sets-template-url-provider.js.map
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
(function () {
    ngObibaMica.sets
        .factory('SetResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetDocumentsResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetDocumentsResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id', from: '@from', limit: '@limit' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetClearResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetClearResource');
            return $resource(url, {}, {
                'clear': {
                    method: 'DELETE',
                    params: { type: '@type', id: '@id' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetExistsResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetExistsResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id', did: '@did' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetImportResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetImportResource');
            return $resource(url, {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetImportQueryResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetImportQueryResource');
            var requestTransformer = function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            };
            return $resource(url, {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    errorHandler: true,
                    transformRequest: requestTransformer
                }
            });
        }])
        .factory('SetRemoveResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetRemoveResource');
            return $resource(url, {}, {
                'delete': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=set-resources.js.map
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
(function () {
    ngObibaMica.sets
        .factory('SetsResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('SetsResource'), {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetsImportResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('SetsImportResource'), {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=sets-resources.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var SetService = /** @class */ (function () {
    function SetService($location, $window, $log, $translate, localStorageService, PageUrlService, AlertService, SetsImportResource, SetResource, SetDocumentsResource, SetClearResource, SetExistsResource, SetImportResource, SetImportQueryResource, SetRemoveResource, ObibaServerConfigResource) {
        this.$location = $location;
        this.$window = $window;
        this.$log = $log;
        this.$translate = $translate;
        this.localStorageService = localStorageService;
        this.PageUrlService = PageUrlService;
        this.AlertService = AlertService;
        this.SetsImportResource = SetsImportResource;
        this.SetResource = SetResource;
        this.SetDocumentsResource = SetDocumentsResource;
        this.SetClearResource = SetClearResource;
        this.SetExistsResource = SetExistsResource;
        this.SetImportResource = SetImportResource;
        this.SetImportQueryResource = SetImportQueryResource;
        this.SetRemoveResource = SetRemoveResource;
        this.ObibaServerConfigResource = ObibaServerConfigResource;
        var that = this;
        ObibaServerConfigResource.get(function (micaConfig) {
            that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
            that.hasHarmonization = micaConfig.isHarmonizedDatasetEnabled;
        });
    }
    SetService.prototype.isSingleStudy = function () {
        return !this.hasMultipleStudies;
    };
    SetService.prototype.hasHarmonizedDatasets = function () {
        return this.hasHarmonization;
    };
    /**
     * Get the documents in the cart. Create the cart's set if missing.
     * Return a promise on the documents.
     * @param documentType the document type
     * @param fromIdx from position
     * @param limitIdx maximum number of documents taht are fetched
     */
    SetService.prototype.getCartDocuments = function (documentType, fromIdx, limitIdx) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetDocumentsResource.get({
                from: fromIdx,
                id: set.id,
                limit: limitIdx,
                type: documentType,
            }).$promise;
        });
    };
    /**
     * Check if document is in the cart.
     * Return a promise on the response.
     * @param documentType the document type
     * @param documentId the document ID
     */
    SetService.prototype.isDocumentInCart = function (documentType, documentId) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetExistsResource.get({ type: documentType, id: set.id, did: documentId }).$promise;
        });
    };
    /**
     * Add one or more documents to the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param documentId the document ID or an array of document IDs
     */
    SetService.prototype.addDocumentToCart = function (documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetImportResource.save({ type: documentType, id: set.id }, did).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Add documents matching the query to the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param rqlQuery the documents join query
     */
    SetService.prototype.addDocumentQueryToCart = function (documentType, rqlQuery) {
        var _this = this;
        this.$log.info("query=" + rqlQuery);
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetImportQueryResource.save({ type: documentType, id: set.id, query: rqlQuery }).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Remove one or more documents from the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param documentId the document ID or an array of document IDs
     */
    SetService.prototype.removeDocumentFromCart = function (documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetRemoveResource.delete({ type: documentType, id: set.id }, did).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Clear the documents list of the cart.
     * @param documentType the document type
     * @param documentId one or more documents to be removed from the cart (optional)
     */
    SetService.prototype.clearCart = function (documentType) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetClearResource.clear({ type: documentType, id: set.id }).$promise;
        }).then(function () {
            _this.notifyCartChanged(documentType);
            return _this.getOrCreateCart(documentType);
        });
    };
    /**
     * Go to the entities count page for the variables belonging to the provided set.
     * Note that the number of variables for this type of analysis is limited to 20.
     * @param setId the set ID, if undefined, the cart set ID is used
     * @param documentId one or more document id (optional)
     */
    SetService.prototype.gotoSetEntitiesCount = function (setId, documentId) {
        var _this = this;
        var max = 20;
        var sid = setId;
        if (!sid) {
            var cartSet = this.getCartSet("variables");
            if (cartSet) {
                sid = cartSet.id;
            }
        }
        // TODO make a search query instead to force variable type to Collected
        if (!documentId) {
            this.SetDocumentsResource.get({ type: "variables", id: sid, from: 0, limit: max }).$promise
                .then(function (documents) {
                _this.gotoEntitiesCount(documents.variables.map(function (doc) { return doc.id; }));
            });
        }
        else {
            var ids = Array.isArray(documentId) ? documentId : [documentId];
            this.gotoEntitiesCount(ids.slice(0, max));
        }
    };
    /**
     * Go to the entities count page with the provided identifiers.
     * @param ids the selected identifiers
     */
    SetService.prototype.gotoEntitiesCount = function (ids) {
        if (ids) {
            var queryStr = ids.map(function (id) {
                return "all(" + id + ")";
            }).join(",");
            this.$window.location.href = this.PageUrlService.entitiesCountPage(queryStr);
        }
    };
    SetService.prototype.getDownloadUrl = function (documentType, setId) {
        var id = setId;
        if (!id) {
            var cartSet = this.getCartSet(documentType);
            if (cartSet) {
                id = cartSet.id;
            }
        }
        if (id) {
            var queryStr = "variable(in(Mica_variable.sets," + id + "),limit(0,20000)"
                + ",fields((attributes.label.*,variableType,datasetId,datasetAcronym))"
                + ",sort(variableType,containerId,populationWeight,dataCollectionEventWeight,datasetId,index,name))"
                + ",locale(" + this.$translate.use() + ")";
            return this.PageUrlService.downloadList(documentType, queryStr);
        }
        return null;
    };
    /**
     * Go to search page with documents filtered by the set they belong to.
     * @param documentType the document type
     * @param setId the set ID, if undefined, the cart set ID is used
     */
    SetService.prototype.gotoSearch = function (documentType, setId) {
        var id = setId;
        if (!id) {
            var cartSet = this.getCartSet(documentType);
            if (cartSet) {
                id = cartSet.id;
            }
        }
        if (id) {
            var queryStr = "variable(in(Mica_variable.sets," + id + "))";
            this.$window.location.href = this.PageUrlService.searchPage(queryStr);
        }
    };
    /**
     * Get the cart set if it exists.
     * @param documentType the document type
     */
    SetService.prototype.getCartSet = function (documentType) {
        return this.localStorageService.get(this.getCartKey(documentType));
    };
    /**
     * Always get the cart set in case of the set was deleted from the server. If unknown or not found, create it.
     * Return a promise on the cart's set.
     * @param documentType the document type
     */
    SetService.prototype.getOrCreateCart = function (documentType) {
        var _this = this;
        var cartSet = this.localStorageService.get(this.getCartKey(documentType));
        if (cartSet) {
            return this.SetResource.get({ type: documentType, id: cartSet.id }).$promise
                .then(function (set) {
                return _this.saveCart(documentType, set);
            })
                .catch(function () {
                return _this.createCart(documentType, "");
            });
        }
        else {
            return this.createCart(documentType, "");
        }
    };
    /**
     * Create a cart and returns a promise on the created set.
     * @param documentType the document type
     * @param documentId the document ID to be added to the cart (can be empty)
     */
    SetService.prototype.createCart = function (documentType, documentId) {
        var _this = this;
        return this.SetsImportResource.save({ type: documentType }, documentId).$promise
            .then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.saveCart = function (documentType, set) {
        if (set && set.id) {
            this.localStorageService.set(this.getCartKey(documentType), set);
            this.notifyCartChanged(documentType);
            return set;
        }
        return undefined;
    };
    /**
     * Get the local storage key for the cart.
     * @param documentType the document type
     */
    SetService.prototype.getCartKey = function (documentType) {
        return "cart." + documentType;
    };
    /**
     * Notify at document level that the cart set was updated.
     * @param documentType the document type
     */
    SetService.prototype.notifyCartChanged = function (documentType) {
        var event;
        try {
            // For modern browsers except IE:
            event = new CustomEvent("cart-updated", { detail: documentType });
        }
        catch (err) {
            // If IE 11 (or 10 or 9...?) do it this way:
            // Create the event.
            event = document.createEvent("Event");
            // Define that the event name is 'build'.
            event.initEvent("cart-updated", true, true);
            event.detail = documentType;
        }
        // Dispatch/Trigger/Fire the event
        document.dispatchEvent(event);
    };
    SetService.$inject = ["$location", "$window", "$log", "$translate",
        "localStorageService", "PageUrlService", "AlertService",
        "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource",
        "SetImportResource", "SetImportQueryResource", "SetRemoveResource", "ObibaServerConfigResource"];
    return SetService;
}());
ngObibaMica.sets.service("SetService", ["$location", "$window", "$log", "$translate", "localStorageService",
    "PageUrlService", "AlertService",
    "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource",
    "SetImportResource", "SetImportQueryResource", "SetRemoveResource", "ObibaServerConfigResource", SetService]);
//# sourceMappingURL=set-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CartDocumentsTableController = /** @class */ (function () {
    function CartDocumentsTableController(PageUrlService, LocalizedValues, SetService, AnalysisConfigService, $translate, $log, $scope, $location, $window) {
        this.PageUrlService = PageUrlService;
        this.LocalizedValues = LocalizedValues;
        this.SetService = SetService;
        this.AnalysisConfigService = AnalysisConfigService;
        this.$translate = $translate;
        this.$log = $log;
        this.$scope = $scope;
        this.$location = $location;
        this.$window = $window;
        this.allSelected = false;
        this.selections = {};
        this.documents = {
            from: 0,
            limit: 0,
            total: 0,
        };
        this.pagination = {
            currentPage: 1,
            from: 0,
            itemsPerPage: 10,
            maxSize: 10,
            to: 0,
            totalHits: 0,
        };
    }
    CartDocumentsTableController.prototype.updateAllSelected = function () {
        var _this = this;
        this.$log.info("ALL=" + this.allSelected);
        if (this.allSelected) {
            if (this.documents && this.documents[this.type]) {
                this.documents[this.type].forEach(function (doc) {
                    _this.selections[doc.id] = true;
                });
            }
        }
        else {
            this.selections = {};
        }
    };
    CartDocumentsTableController.prototype.updateSelection = function (documentId) {
        if (!this.selections[documentId]) {
            this.allSelected = false;
        }
    };
    CartDocumentsTableController.prototype.showAnalysis = function () {
        return this.AnalysisConfigService.showAnalysis();
    };
    CartDocumentsTableController.prototype.showStudies = function () {
        return !this.SetService.isSingleStudy();
    };
    CartDocumentsTableController.prototype.showVariableType = function () {
        return this.SetService.hasHarmonizedDatasets();
    };
    CartDocumentsTableController.prototype.entitiesCount = function () {
        if (this.pagination.totalHits) {
            var sels = this.getSelectedDocumentIds();
            this.SetService.gotoSetEntitiesCount(undefined, (sels && sels.length > 0 ? sels : undefined));
        }
    };
    CartDocumentsTableController.prototype.download = function () {
        return this.SetService.getDownloadUrl(this.type);
    };
    CartDocumentsTableController.prototype.search = function () {
        this.SetService.gotoSearch(this.type);
    };
    CartDocumentsTableController.prototype.clearSet = function () {
        var _this = this;
        var sels = this.getSelectedDocumentIds();
        if (sels && sels.length > 0) {
            this.SetService.removeDocumentFromCart(this.type, sels)
                .then(function () {
                _this.allSelected = false;
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        }
        else {
            this.SetService.clearCart(this.type)
                .then(function () {
                _this.allSelected = false;
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        }
    };
    CartDocumentsTableController.prototype.pageChanged = function () {
        var from = (this.pagination.currentPage - 1) * this.documents.limit;
        this.onPageChange(this.type, from);
    };
    CartDocumentsTableController.prototype.$onInit = function () {
        this.table = {
            rows: new Array(),
        };
    };
    CartDocumentsTableController.prototype.$onChanges = function () {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues
            .formatNumber((this.documents && this.documents.total) ? this.documents.total : 0);
    };
    CartDocumentsTableController.prototype.getSelectedDocumentIds = function () {
        var _this = this;
        return Object.keys(this.selections).filter(function (id) { return _this.selections[id]; });
    };
    CartDocumentsTableController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    CartDocumentsTableController.prototype.asTable = function () {
        var _this = this;
        var table = {
            rows: new Array(),
        };
        this.pagination.totalHits = this.documents ? this.documents.total : 0;
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
        this.pagination.from = this.documents ? this.documents.from + 1 : 0;
        var documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
        this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
        if (documentCounts) {
            this.documents[this.type].forEach(function (doc) {
                if (_this.allSelected) {
                    _this.selections[doc.id] = true;
                }
                var studyAcronym = _this.localize(doc.studySummary.acronym);
                var studyName = _this.localize(doc.studySummary.name);
                var studyType = doc.variableType === "Dataschema" ? "harmonization" : "individual";
                var studyLink = _this.PageUrlService.studyPage(doc.studyId, studyType);
                var datasetName = _this.localize(doc.datasetName);
                var datasetLink = _this.PageUrlService.datasetPage(doc.datasetId, doc.variableType);
                var variableLink = _this.PageUrlService.variablePage(doc.id);
                var attrLabel = doc.attributes.filter(function (attr) { return attr.name === "label"; });
                var variableLabel = attrLabel && attrLabel.length > 0 ? _this.localize(attrLabel[0].values) : "";
                var row = new Array({
                    link: undefined,
                    value: doc.id,
                }, {
                    link: variableLink ? variableLink : datasetLink,
                    value: doc.name,
                }, {
                    link: undefined,
                    value: variableLabel,
                }, {
                    link: undefined,
                    value: doc.variableType,
                }, {
                    link: studyLink,
                    value: studyAcronym,
                }, {
                    link: datasetLink,
                    value: datasetName,
                });
                table.rows.push(row);
            });
        }
        return table;
    };
    CartDocumentsTableController.$inject = ["PageUrlService", "LocalizedValues", "SetService", "AnalysisConfigService",
        "$translate", "$log", "$scope", "$location", "$window"];
    return CartDocumentsTableController;
}());
var CartDocumentsTableComponent = /** @class */ (function () {
    function CartDocumentsTableComponent() {
        this.transclude = true;
        this.bindings = {
            documents: "<",
            onPageChange: "<",
            type: "<",
        };
        this.controller = CartDocumentsTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "sets/components/cart-documents-table/component.html";
    }
    return CartDocumentsTableComponent;
}());
ngObibaMica.sets
    .component("cartDocumentsTable", new CartDocumentsTableComponent());
//# sourceMappingURL=component.js.map
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
(function () {
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
        function ($scope, $location, $translate, $cookies, SetService, ngObibaMicaSetsTemplateUrl) {
            $scope.options = {};
            manageCartHelpText($scope, $translate, $cookies);
            $scope.cartHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('cart');
            $scope.loading = true;
            var limit = 100;
            var onDocuments = function (variables) {
                $scope.loading = false;
                $scope.variables = variables;
            };
            var promisedDocs = SetService.getCartDocuments('variables', 0, limit);
            if (promisedDocs) {
                promisedDocs.then(onDocuments);
            }
            else {
                $scope.variables = { total: 0 };
            }
            $scope.$on('cart-cleared', function (event, type) {
                $scope.loading = true;
                SetService.getCartDocuments(type, 0, limit).then(onDocuments);
            });
            $scope.onPaginate = function (type, from) {
                SetService.getCartDocuments(type, from, limit).then(onDocuments);
            };
        }
    ])
        .controller('VariableToCartController', [
        '$scope',
        'SetService',
        'AlertService',
        function ($scope, SetService, AlertService) {
            $scope.canBeAdded = false;
            $scope.canBeRemoved = false;
            $scope.loading = true;
            $scope.onInit = function (id) {
                SetService.isDocumentInCart('variables', id)
                    .then(function () {
                    $scope.loading = false;
                    $scope.canBeRemoved = true;
                })
                    .catch(function () {
                    $scope.loading = false;
                    $scope.canBeAdded = true;
                });
            };
            $scope.onAdd = function (id) {
                $scope.loading = true;
                var beforeCart = SetService.getCartSet('variables');
                SetService.addDocumentToCart('variables', id)
                    .then(function (set) {
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
                    .catch(function () {
                    $scope.loading = false;
                });
            };
            $scope.onRemove = function (id) {
                $scope.loading = true;
                var beforeCart = SetService.getCartSet('variables');
                SetService.removeDocumentFromCart('variables', id)
                    .then(function (set) {
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
                    .catch(function () {
                    $scope.loading = false;
                });
            };
        }
    ]);
})();
//# sourceMappingURL=sets-controller.js.map
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
ngObibaMica.sets
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/cart', {
            templateUrl: 'sets/views/cart.html',
            controller: 'CartController',
            reloadOnSearch: false
        });
    }]);
//# sourceMappingURL=sets-router.js.map
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
/* exported DISPLAY_TYPES */
var DISPLAY_TYPES = {
    LIST: 'list',
    COVERAGE: 'coverage',
    GRAPHICS: 'graphics'
};
ngObibaMica.search = angular.module('obiba.mica.search', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngclipboard',
    'templates-ngObibaMica',
    'obiba.mica.sets'
]);
(function () {
    ngObibaMica.search
        .run(['GraphicChartsConfigurations',
        function (GraphicChartsConfigurations) {
            GraphicChartsConfigurations.setClientConfig();
        }]);
})();
//# sourceMappingURL=search.js.map
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
/* global QUERY_TARGETS */
/* global DISPLAY_TYPES */
(function () {
    var FIELDS_TO_FILTER = ['name', 'title', 'description', 'keywords'];
    function NgObibaMicaSearchOptionsWrapper() {
        var options = {
            searchLayout: 'layout2',
            taxonomyPanelOptions: {
                network: {
                    taxonomies: { 'Mica_network': { trKey: 'properties' } }
                },
                study: {
                    taxonomies: { 'Mica_study': { trKey: 'properties' } }
                },
                dataset: {
                    taxonomies: { 'Mica_dataset': { trKey: 'properties' } }
                },
                variable: {
                    taxonomies: {
                        'Mica_variable': { trKey: 'properties' }
                    }
                },
                fieldsToFilter: FIELDS_TO_FILTER
            },
            obibaListOptions: {
                countCaption: true,
                searchForm: true,
                supplInfoDetails: true,
                trimmedDescription: true
            },
            targetTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
            searchTabsOrder: [DISPLAY_TYPES.LIST, DISPLAY_TYPES.COVERAGE, DISPLAY_TYPES.GRAPHICS],
            resultTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
            showAllFacetedTaxonomies: true,
            showFacetTermsWithZeroCount: false,
            showSearchBox: true,
            showSearchBrowser: true,
            showSearchRefreshButton: false,
            variableTaxonomiesOrder: [],
            studyTaxonomiesOrder: [],
            datasetTaxonomiesOrder: [],
            networkTaxonomiesOrder: [],
            hideNavigate: [],
            hideSearch: ['studyId', 'dceId', 'datasetId', 'networkId'],
            variables: {
                showSearchTab: true,
                listPageSize: 20,
                variablesColumn: {
                    showVariablesTypeColumn: true,
                    showVariablesStudiesColumn: true,
                    showVariablesDatasetsColumn: true,
                    showDatasetsStudiesColumn: true,
                    showDatasetsVariablesColumn: true
                },
                showCart: true
            },
            datasets: {
                showSearchTab: true,
                listPageSize: 20,
                showDatasetsSearchFilter: true,
                datasetsColumn: {
                    showDatasetsAcronymColumn: true,
                    showDatasetsTypeColumn: true,
                    showDatasetsNetworkColumn: true,
                    showDatasetsStudiesColumn: true,
                    showDatasetsVariablesColumn: true
                },
                fields: [
                    'acronym.*',
                    'name.*',
                    'variableType',
                    'studyTable.studyId',
                    'studyTable.project',
                    'studyTable.table',
                    'studyTable.populationId',
                    'studyTable.dataCollectionEventId',
                    'harmonizationTable.studyId',
                    'harmonizationTable.project',
                    'harmonizationTable.table',
                    'harmonizationTable.populationId'
                ]
            },
            studies: {
                showSearchTab: true,
                listPageSize: 20,
                showStudiesSearchFilter: true,
                studiesColumn: {
                    showStudiesTypeColumn: true,
                    showStudiesDesignColumn: true,
                    showStudiesQuestionnaireColumn: true,
                    showStudiesPmColumn: true,
                    showStudiesBioColumn: true,
                    showStudiesOtherColumn: true,
                    showStudiesParticipantsColumn: true,
                    showStudiesNetworksColumn: true,
                    showStudiesStudyDatasetsColumn: true,
                    showStudiesHarmonizationDatasetsColumn: true,
                    showStudiesVariablesColumn: false,
                    showStudiesStudyVariablesColumn: true,
                    showStudiesDataschemaVariablesColumn: true
                },
                fields: [
                    'acronym.*',
                    'name.*',
                    'model.methods.design',
                    'populations.dataCollectionEvents.model.dataSources',
                    'model.numberOfParticipants.participant'
                ]
            },
            networks: {
                showSearchTab: true,
                listPageSize: 20,
                networksColumn: {
                    showNetworksStudiesColumn: true,
                    showNetworksStudyDatasetColumn: true,
                    showNetworksHarmonizationDatasetColumn: true,
                    showNetworksVariablesColumn: false,
                    showNetworksStudyVariablesColumn: true,
                    showNetworksDataschemaVariablesColumn: true
                },
                fields: [
                    'acronym.*',
                    'name.*',
                    'studyIds'
                ]
            },
            coverage: {
                groupBy: {
                    study: true,
                    dce: true,
                    dataset: true
                }
            }
        };
        function sanitizeFieldsToFilter(valueFieldsToFilter) {
            if (valueFieldsToFilter) {
                return valueFieldsToFilter.filter(function (valueField) {
                    return FIELDS_TO_FILTER.indexOf(valueField) > -1;
                });
            }
            return null;
        }
        function normalizeOptions() {
            function removeItemByValue(array, value) {
                var index = array.indexOf(value);
                if (index > -1) {
                    array.splice(index, 1);
                }
                return array;
            }
            options.coverage.groupBy.dce = options.coverage.groupBy.study && options.coverage.groupBy.dce;
            var canShowCoverage = Object.keys(options.coverage.groupBy).filter(function (canShow) {
                return options.coverage.groupBy[canShow];
            }).length > 0;
            if (!canShowCoverage) {
                removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.COVERAGE);
            }
            if (!options.networks.showSearchTab) {
                removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.NETWORK);
                removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.NETWORK);
            }
            if (!options.studies.showSearchTab) {
                removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.GRAPHICS);
                removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.STUDY);
                removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.STUDY);
            }
        }
        function setOptions(value) {
            options = angular.merge(options, value);
            //NOTICE: angular.merge merges arrays by position. Overriding manually.
            options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
            options.searchTabsOrder = value.searchTabsOrder || options.searchTabsOrder;
            options.resultTabsOrder = value.resultTabsOrder || options.resultTabsOrder;
            options.variableTaxonomiesOrder = value.variableTaxonomiesOrder || options.variableTaxonomiesOrder;
            options.studyTaxonomiesOrder = value.studyTaxonomiesOrder || options.studyTaxonomiesOrder;
            options.datasetTaxonomiesOrder = value.datasetTaxonomiesOrder || options.datasetTaxonomiesOrder;
            options.networkTaxonomiesOrder = value.networkTaxonomiesOrder || options.networkTaxonomiesOrder;
            options.hideNavigate = value.hideNavigate || options.hideNavigate;
            options.hideSearch = value.hideSearch || options.hideSearch;
            //TODO: Needs a better mechanism for setting options
            options.studies.fields = value.studies && value.studies.fields || options.studies.fields;
            options.networks.fields = value.networks && value.networks.fields || options.networks.fields;
            options.datasets.fields = value.datasets && value.datasets.fields || options.datasets.fields;
            if (value.taxonomyPanelOptions) {
                options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
            }
            if (value.studies && value.studies.obibaListOptions) {
                options.obibaListOptions.countCaption = value.studies.obibaListOptions.studiesCountCaption === 0 ? value.studies.obibaListOptions.studiesCountCaption : true;
                options.obibaListOptions.searchForm = value.studies.obibaListOptions.studiesSearchForm === 0 ? value.studies.obibaListOptions.studiesSearchForm : true;
                options.obibaListOptions.supplInfoDetails = value.studies.obibaListOptions.studiesSupplInfoDetails === 0 ? value.studies.obibaListOptions.studiesSupplInfoDetails : true;
                options.obibaListOptions.trimmedDescription = value.studies.obibaListOptions.studiesTrimmedDescription === 0 ? value.studies.obibaListOptions.studiesTrimmedDescription : true;
                options.searchLayout = value.searchLayout ? value.searchLayout : options.searchLayout;
            }
            normalizeOptions();
        }
        function getOptions() {
            return angular.copy(options);
        }
        this.setOptions = setOptions;
        this.getOptions = getOptions;
    }
    /**
      * The Options service class.
      *
      * @param $q
      * @param $translate
      * @param optionsWrapper
      * @param ObibaServerConfigResource
      * @returns {{getLocale: getLocale, getOptionsAsyn: getOptionsAsyn, getOptions: getOptions, getDefaultListPageSize: getDefaultListPageSize}}
      * @constructor
      */
    function ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource) {
        var deferred = $q.defer();
        var resolved = false;
        /**
         * Resolves the option by retrieving the server config and overriding the corresponding options.
         * @returns {*}
         */
        function resolveOptions() {
            var ngClientOptions = optionsWrapper.getOptions();
            if (resolved) {
                // in case the getOptionsAsyn() is already called.
                return $q.when(optionsWrapper.getOptions());
            }
            else {
                ObibaServerConfigResource.get(function (micaConfig) {
                    var hasMultipleNetworks = micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled;
                    var hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
                    var hasMultipleDatasets = micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
                    var updatedOptions = {
                        searchLayout: micaConfig.searchLayout,
                        locale: micaConfig.languages || $translate.use(),
                        showSearchRefreshButton: true,
                        networks: {
                            showSearchTab: hasMultipleNetworks
                        },
                        studies: {
                            showSearchTab: hasMultipleStudies,
                            studiesColumn: {
                                showStudiesTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
                                showStudiesNetworksColumn: hasMultipleNetworks && ngClientOptions.studies.studiesColumn.showStudiesNetworksColumn,
                                showStudiesVariablesColumn: hasMultipleDatasets && ngClientOptions.studies.studiesColumn.showStudiesVariablesColumn,
                                showStudiesStudyDatasetsColumn: (hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled) === false ? false : ngClientOptions.studies.studiesColumn.showStudiesStudyDatasetsColumn,
                                showStudiesStudyVariablesColumn: (hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled) === false ? false : ngClientOptions.studies.studiesColumn.showStudiesStudyVariablesColumn,
                                showStudiesHarmonizationDatasetsColumn: (hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled) === false ? false : ngClientOptions.studies.studiesColumn.showStudiesHarmonizationDatasetsColumn,
                                showStudiesDataschemaVariablesColumn: (hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled) === false ? false : ngClientOptions.studies.studiesColumn.showStudiesDataschemaVariablesColumn
                            }
                        },
                        datasets: {
                            showSearchTab: hasMultipleDatasets,
                            datasetsColumn: {
                                showDatasetsTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
                                showDatasetsNetworkColumn: hasMultipleNetworks && ngClientOptions.datasets.datasetsColumn.showDatasetsNetworkColumn,
                                showDatasetsStudiesColumn: hasMultipleStudies && ngClientOptions.datasets.datasetsColumn.showDatasetsStudiesColumn,
                                showDatasetsVariablesColumn: ngClientOptions.datasets.datasetsColumn.showDatasetsVariablesColumn
                            }
                        },
                        variables: {
                            showSearchTab: hasMultipleDatasets,
                            variablesColumn: {
                                showVariablesTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
                                showVariablesStudiesColumn: hasMultipleStudies
                            }
                        }
                    };
                    optionsWrapper.setOptions(updatedOptions);
                    deferred.resolve(optionsWrapper.getOptions());
                    resolved = true;
                });
                return deferred.promise;
            }
        }
        return {
            /**
             * This is the actual method to be called as it will override the defaults by server settings such as single Study
             * or Network configs.
             * @returns A promise that the client can use to retrieve the resolved options.
             */
            getOptionsAsyn: function () {
                return resolveOptions();
            },
            /**
             * Returns the options and if getOptionsAsyn() has never been called, the default options will be returned.
             * @returns {*}
             */
            getOptions: function () {
                return optionsWrapper.getOptions();
            },
            getDefaultListPageSize: function (target) {
                var options = optionsWrapper.getOptions();
                switch (target) {
                    case QUERY_TARGETS.VARIABLE:
                        return options.variables.listPageSize;
                    case QUERY_TARGETS.DATASET:
                        return options.datasets.listPageSize;
                    case QUERY_TARGETS.STUDY:
                        return options.studies.listPageSize;
                    case QUERY_TARGETS.NETWORK:
                        return options.networks.listPageSize;
                }
                return 20;
            }
        };
    }
    ngObibaMica.search
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaSearch', function () {
                var optionsWrapper = new NgObibaMicaSearchOptionsWrapper();
                function initialize(options) {
                    optionsWrapper.setOptions(options);
                }
                this.initialize = initialize;
                this.$get = ['$q', '$translate', 'ObibaServerConfigResource',
                    function ($q, $translate, ObibaServerConfigResource) {
                        return new ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
                    }];
            });
        }]);
})();
//# sourceMappingURL=search-options-provider.js.map
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
/* global NgObibaMicaTemplateUrlFactory */
(function () {
    ngObibaMica.search
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaSearchTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
                search: { header: null, footer: null },
                searchStudiesResultTable: { template: null },
                searchNetworksResultTable: { template: null },
                searchDatasetsResultTable: { template: null },
                searchCriteriaRegionTemplate: { template: null },
                vocabularyFilterDetailHeading: { template: null },
                CriterionDropdownTemplate: { template: null },
                searchResultList: { template: null },
                searchInputList: { template: null },
                searchResultCoverage: { template: null },
                searchResultGraphics: { template: null },
                classifications: { header: null, footer: null },
                searchCellStatValue: { template: null },
            }));
        }]);
})();
//# sourceMappingURL=search-template-url-provider.js.map
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
/* global RepeatableCriteriaItem */
/* global CriteriaItemBuilder */
/**
 * Class for all criteria builders
 * @param rootRql
 * @param rootItem
 * @param taxonomies
 * @param LocalizedValues
 * @param lang
 * @param SetService
 * @constructor
 */
function CriteriaBuilder(rootRql, rootItem, taxonomies, LocalizedValues, lang, SetService) {
    /**
     * Helper to get a builder
     * @returns {CriteriaItemBuilder}
     */
    this.newCriteriaItemBuilder = function () {
        return new CriteriaItemBuilder(LocalizedValues, lang, SetService);
    };
    this.initialize = function (target) {
        this.leafItemMap = {};
        this.target = target;
        this.rootRql = rootRql;
        this.taxonomies = taxonomies;
        this.LocalizedValues = LocalizedValues;
        this.lang = lang;
        this.SetService = SetService;
        this.rootItem = this.newCriteriaItemBuilder()
            .parent(rootItem)
            .type(this.target)
            .rqlQuery(this.rootRql)
            .target(this.target)
            .build();
    };
    /**
     * Called by the leaf visitor to create a criteria
     * @param targetTaxonomy
     * @param targetVocabulary
     * @param targetTerms
     * @param node
     */
    this.buildLeafItem = function (targetTaxonomy, targetVocabulary, targetTerms, node, parentItem) {
        var self = this;
        var builder = new CriteriaItemBuilder(self.LocalizedValues, self.lang, self.SetService)
            .type(node.name)
            .target(self.target)
            .taxonomy(targetTaxonomy)
            .vocabulary(targetVocabulary)
            .rqlQuery(node)
            .parent(parentItem);
        builder.selectedTerms(targetTerms).build();
        return builder.build();
    };
}
/**
 * Search for the taxonomy vocabulary corresponding to the provided field name. Can be defined either in the
 * vocabulary field attribute or be the vocabulary name.
 * @param field
 * @returns {{taxonomy: null, vocabulary: null}}
 */
CriteriaBuilder.prototype.fieldToVocabulary = function (field) {
    var found = {
        taxonomy: null,
        vocabulary: null
    };
    var normalizedField = field;
    if (field.indexOf('.') < 0) {
        normalizedField = 'Mica_' + this.target + '.' + field;
    }
    var parts = normalizedField.split('.', 2);
    var targetTaxonomy = parts[0];
    var targetVocabulary = parts[1];
    var foundTaxonomy = this.taxonomies.filter(function (taxonomy) {
        return targetTaxonomy === taxonomy.name;
    });
    if (foundTaxonomy.length === 0) {
        throw new Error('Could not find taxonomy:', targetTaxonomy);
    }
    found.taxonomy = foundTaxonomy[0];
    var foundVocabulary = found.taxonomy.vocabularies.filter(function (vocabulary) {
        return targetVocabulary === vocabulary.name;
    });
    if (foundVocabulary.length === 0) {
        throw new Error('Could not find vocabulary:', targetVocabulary);
    }
    found.vocabulary = foundVocabulary[0];
    return found;
};
/**
 * This method is where a criteria gets created
 */
CriteriaBuilder.prototype.visitLeaf = function (node, parentItem) {
    var match = RQL_NODE.MATCH === node.name;
    var field = node.args[match ? 1 : 0];
    var values = node.args[match ? 0 : 1];
    var searchInfo = this.fieldToVocabulary(field);
    var item = this.buildLeafItem(searchInfo.taxonomy, searchInfo.vocabulary, values instanceof Array ? values : [values], node, parentItem);
    var current = this.leafItemMap[item.id];
    if (current) {
        if (current.isRepeatable()) {
            current.addItem(item);
        }
        else {
            console.error('Non-repeatable criteria items must be unique,', current.id, 'will be overwritten.');
            current = item;
        }
    }
    else {
        current = item.vocabulary.repeatable ? new RepeatableCriteriaItem().addItem(item) : item;
    }
    this.leafItemMap[item.id] = current;
    parentItem.children.push(item);
};
/**
 * Returns all the criterias found
 * @returns {Array}
 */
CriteriaBuilder.prototype.getRootItem = function () {
    return this.rootItem;
};
/**
 * Returns the leaf criteria item map needed for finding duplicates
 * @returns {Array}
 */
CriteriaBuilder.prototype.getLeafItemMap = function () {
    return this.leafItemMap;
};
/**
 * Node condition visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visitCondition = function (node, parentItem) {
    var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
    parentItem.children.push(item);
    this.visit(node.args[0], item);
    this.visit(node.args[1], item);
};
/**
 * Node not visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visitNot = function (node, parentItem) {
    var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
    parentItem.children.push(item);
    this.visit(node.args[0], item);
};
/**
 * General purpose node visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visit = function (node, parentItem) {
    // TODO needs to add more types
    switch (node.name) {
        case RQL_NODE.NOT:
            this.visitNot(node, parentItem);
            break;
        case RQL_NODE.AND:
        case RQL_NODE.NAND:
        case RQL_NODE.OR:
        case RQL_NODE.NOR:
            this.visitCondition(node, parentItem);
            break;
        case RQL_NODE.CONTAINS:
        case RQL_NODE.IN:
        case RQL_NODE.OUT:
        case RQL_NODE.EQ:
        case RQL_NODE.LE:
        case RQL_NODE.LT:
        case RQL_NODE.GE:
        case RQL_NODE.GT:
        case RQL_NODE.BETWEEN:
        case RQL_NODE.EXISTS:
        case RQL_NODE.MISSING:
        case RQL_NODE.MATCH:
            this.visitLeaf(node, parentItem);
            break;
        case RQL_NODE.FILTER:
            break;
        default:
    }
};
/**
 * Builds a criteria list for this target
 */
CriteriaBuilder.prototype.build = function () {
    var self = this;
    this.rootRql.args.forEach(function (node) {
        self.visit(node, self.rootItem);
    });
};
//# sourceMappingURL=criteria-builder.js.map
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
/* exported CriteriaIdGenerator */
function CriteriaIdGenerator() { }
CriteriaIdGenerator.generate = function (taxonomy, vocabulary, term) {
    return taxonomy && vocabulary ?
        taxonomy.name + '.' + vocabulary.name + (term ? '.' + term.name : '') :
        undefined;
};
//# sourceMappingURL=criteria-id-generator.js.map
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
/**
 * Criteria Item builder
 */
/* global CriteriaIdGenerator */
/* global CriteriaItem */
/* exported CriteriaItemBuilder */
function CriteriaItemBuilder(LocalizedValues, useLang, SetService) {
    var criteria = {
        type: null,
        rqlQuery: null,
        lang: useLang || 'en',
        parent: null,
        children: []
    };
    var builder = this;
    this.type = function (value) {
        if (!RQL_NODE[value.toUpperCase()]) {
            throw new Error('Invalid node type:', value);
        }
        criteria.type = value;
        return this;
    };
    this.target = function (value) {
        criteria.target = value;
        return this;
    };
    this.parent = function (value) {
        criteria.parent = value;
        return this;
    };
    this.taxonomy = function (value) {
        criteria.taxonomy = value;
        return this;
    };
    this.vocabulary = function (value) {
        criteria.vocabulary = value;
        // decorate 'sets' vocabulary with local sets info
        if (criteria.vocabulary.name === 'sets') {
            switch (criteria.taxonomy.name) {
                case 'Mica_variable':
                    appendSetTerms(criteria, 'variables');
                    break;
                case 'Mica_dataset':
                    appendSetTerms(criteria, 'datasets');
                    break;
                case 'Mica_study':
                    appendSetTerms(criteria, 'studies');
                    break;
                case 'Mica_network':
                    appendSetTerms(criteria, 'networks');
                    break;
            }
        }
        return this;
    };
    this.term = function (value) {
        if (Array.isArray(value)) {
            return builder.selectedTerms(value);
        }
        else {
            criteria.term = value;
            return this;
        }
    };
    this.rqlQuery = function (value) {
        criteria.rqlQuery = value;
        return this;
    };
    this.selectedTerm = function (term) {
        if (!criteria.selectedTerms) {
            criteria.selectedTerms = [];
        }
        criteria.selectedTerms.push(typeof term === 'string' || typeof term === 'number' ? term : term.name);
        return this;
    };
    this.selectedTerms = function (terms) {
        criteria.selectedTerms = terms.filter(function (term) {
            return term;
        }).map(function (term) {
            if (typeof term === 'string' || typeof term === 'number') {
                return term;
            }
            else {
                return term.name;
            }
        });
        return this;
    };
    /**
     * This is
     */
    function prepareForLeaf() {
        if (criteria.term) {
            criteria.itemTitle = LocalizedValues.forLocale(criteria.term.title, criteria.lang);
            criteria.itemDescription = LocalizedValues.forLocale(criteria.term.description, criteria.lang);
            criteria.itemParentTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
            criteria.itemParentDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
            if (!criteria.itemTitle) {
                criteria.itemTitle = criteria.term.name;
            }
            if (!criteria.itemParentTitle) {
                criteria.itemParentTitle = criteria.vocabulary.name;
            }
        }
        else {
            criteria.itemTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
            criteria.itemDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
            criteria.itemParentTitle = LocalizedValues.forLocale(criteria.taxonomy.title, criteria.lang);
            criteria.itemParentDescription = LocalizedValues.forLocale(criteria.taxonomy.description, criteria.lang);
            if (!criteria.itemTitle) {
                criteria.itemTitle = criteria.vocabulary.name;
            }
            if (!criteria.itemParentTitle) {
                criteria.itemParentTitle = criteria.taxonomy.name;
            }
        }
        criteria.id = CriteriaIdGenerator.generate(criteria.taxonomy, criteria.vocabulary, criteria.term);
    }
    /**
     * Decorate the 'sets' vocabulary with the sets that are living in the browser local storage.
     * @param criteria the criteria that holds the 'sets' vocabulary
     * @param documentType the document type
     */
    function appendSetTerms(criteria, documentType) {
        // note: for now there is only a cart set
        var cartSet = SetService.getCartSet(documentType);
        if (cartSet) {
            var cartTerm;
            if (criteria.vocabulary.terms) {
                // look for a placeholder to get alternate translations
                var cTerm = criteria.vocabulary.terms.filter(function (term) {
                    return term.name === 'cart';
                });
                if (cTerm.length > 0) {
                    cartTerm = cTerm[0];
                }
            }
            if (!cartTerm) {
                // create default title, if not found reference term was not found
                cartTerm = {
                    title: [
                        { locale: 'en', text: 'Cart' },
                        { locale: 'fr', text: 'Panier' }
                    ]
                };
            }
            cartTerm.name = cartSet.id;
            criteria.vocabulary.terms = [cartTerm];
        }
        else {
            criteria.vocabulary.terms = [];
        }
    }
    this.build = function () {
        if (criteria.taxonomy && criteria.vocabulary) {
            prepareForLeaf();
        }
        return new CriteriaItem(criteria);
    };
}
//# sourceMappingURL=criteria-item-builder.js.map
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
/* exported CriteriaItem */
function CriteriaItem(model) {
    var self = this;
    Object.keys(model).forEach(function (k) {
        self[k] = model[k];
    });
}
CriteriaItem.prototype.isRepeatable = function () {
    return false;
};
CriteriaItem.prototype.getTarget = function () {
    return this.target || null;
};
CriteriaItem.prototype.getRangeTerms = function () {
    var range = { from: null, to: null };
    if (this.type === RQL_NODE.BETWEEN) {
        range.from = this.selectedTerms[0];
        range.to = this.selectedTerms[1];
    }
    else if (this.type === RQL_NODE.GE) {
        range.from = this.selectedTerms[0];
        range.to = null;
    }
    else if (this.type === RQL_NODE.LE) {
        range.from = null;
        range.to = this.selectedTerms[0];
    }
    return range;
};
//# sourceMappingURL=criteria-item.js.map
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
(function () {
    function CriteriaReducer() { }
    /**
     * Reduce the current query such that all irrelevant criteria is removed but the criterion. The exceptions are
     * when the criterion is inside an AND, in this case this latter is reduced.
     *
     * @param parentItem
     * @param criteriaItem
     */
    CriteriaReducer.reduce = function (parentItem, criteriaItem) {
        if (parentItem.type === RQL_NODE.OR) {
            var grandParentItem = parentItem.parent;
            var parentItemIndex = grandParentItem.children.indexOf(parentItem);
            grandParentItem.children[parentItemIndex] = criteriaItem;
            var parentRql = parentItem.rqlQuery;
            var grandParentRql = grandParentItem.rqlQuery;
            var parentRqlIndex = grandParentRql.args.indexOf(parentRql);
            grandParentRql.args[parentRqlIndex] = criteriaItem.rqlQuery;
            if (grandParentItem.type !== QUERY_TARGETS.VARIABLE) {
                CriteriaReducer.reduce(grandParentItem, criteriaItem);
            }
        }
        else if (criteriaItem.type !== RQL_NODE.VARIABLE && parentItem.type === RQL_NODE.AND) {
            // Reduce until parent is Variable node or another AND node
            CriteriaReducer.reduce(parentItem.parent, parentItem);
        }
    };
    ngObibaMica.search.CriteriaReducer = CriteriaReducer;
})();
//# sourceMappingURL=criteria-reducer.js.map
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
/* global CriteriaItem */
/* exported RepeatableCriteriaItem */
function RepeatableCriteriaItem() {
    CriteriaItem.call(this, {});
    this.list = [];
}
RepeatableCriteriaItem.prototype = Object.create(CriteriaItem.prototype);
RepeatableCriteriaItem.prototype.isRepeatable = function () {
    return true;
};
RepeatableCriteriaItem.prototype.addItem = function (item) {
    this.list.push(item);
    return this;
};
RepeatableCriteriaItem.prototype.items = function () {
    return this.list;
};
RepeatableCriteriaItem.prototype.first = function () {
    return this.list[0];
};
RepeatableCriteriaItem.prototype.getTarget = function () {
    return this.list.length > 0 ? this.list[0].getTarget() : null;
};
//# sourceMappingURL=repeatable-criteria-item.js.map
'use strict';
(function () {
    function SearchControllerFacetHelperService(MetaTaxonomyService, ngObibaMicaSearch) {
        var metaTaxonomiesPromise = MetaTaxonomyService.getMetaTaxonomiesPromise(), options = ngObibaMicaSearch.getOptions(), taxonomyNav, tabOrderTodisplay, facetedTaxonomies, hasFacetedTaxonomies;
        function flattenTaxonomies(terms) {
            function termsReducer(accumulator, termsArray) {
                return termsArray.reduce(function (acc, val) {
                    if (!Array.isArray(val.terms)) {
                        acc.push(val);
                        return acc;
                    }
                    else {
                        return termsReducer(acc, val.terms);
                    }
                }, accumulator || []);
            }
            return termsReducer([], terms);
        }
        function doTabOrderToDisplay(targetTabsOrder, lang) {
            return metaTaxonomiesPromise.then(function (metaTaxonomy) {
                taxonomyNav = [];
                tabOrderTodisplay = [];
                targetTabsOrder.forEach(function (target) {
                    var targetVocabulary = metaTaxonomy.vocabularies.filter(function (vocabulary) {
                        if (vocabulary.name === target) {
                            tabOrderTodisplay.push(target);
                            return true;
                        }
                    }).pop();
                    if (targetVocabulary && targetVocabulary.terms) {
                        targetVocabulary.terms.forEach(function (term) {
                            term.target = target;
                            var title = term.title.filter(function (t) {
                                return t.locale === lang;
                            })[0];
                            var description = term.description ? term.description.filter(function (t) {
                                return t.locale === lang;
                            })[0] : undefined;
                            term.locale = {
                                title: title,
                                description: description
                            };
                            if (term.terms) {
                                term.terms.forEach(function (trm) {
                                    var title = trm.title.filter(function (t) {
                                        return t.locale === lang;
                                    })[0];
                                    var description = trm.description ? trm.description.filter(function (t) {
                                        return t.locale === lang;
                                    })[0] : undefined;
                                    trm.locale = {
                                        title: title,
                                        description: description
                                    };
                                });
                            }
                            taxonomyNav.push(term);
                        });
                    }
                });
            });
        }
        function doFacetedTaxonomies() {
            return metaTaxonomiesPromise.then(function (metaTaxonomy) {
                facetedTaxonomies = {};
                hasFacetedTaxonomies = false;
                metaTaxonomy.vocabularies.reduce(function (accumulator, target) {
                    var taxonomies = flattenTaxonomies(target.terms);
                    function getTaxonomy(taxonomyName) {
                        return taxonomies.filter(function (taxonomy) {
                            return taxonomy.name === taxonomyName;
                        })[0];
                    }
                    function notNull(value) {
                        return value !== null && value !== undefined;
                    }
                    if (options.showAllFacetedTaxonomies) {
                        accumulator[target.name] = taxonomies.filter(function (taxonomy) {
                            return taxonomy.attributes && taxonomy.attributes.some(function (attribute) {
                                return attribute.key === 'showFacetedNavigation' && attribute.value.toString() === 'true';
                            });
                        });
                    }
                    else {
                        accumulator[target.name] = (options[target.name + 'TaxonomiesOrder'] || []).map(getTaxonomy).filter(notNull);
                    }
                    hasFacetedTaxonomies = hasFacetedTaxonomies || accumulator[target.name].length;
                    return accumulator;
                }, facetedTaxonomies);
            });
        }
        function getTaxonomyNav() {
            return taxonomyNav;
        }
        function getFacetedTaxonomies() {
            return facetedTaxonomies;
        }
        function getTabOrderTodisplay() {
            return tabOrderTodisplay;
        }
        function getHasFacetedTaxonomies() {
            return hasFacetedTaxonomies;
        }
        function help(targetTabsOrder, lang) {
            return Promise.all([doFacetedTaxonomies(), doTabOrderToDisplay(targetTabsOrder, lang)]).then(function () {
                return {
                    getTaxonomyNav: getTaxonomyNav,
                    getFacetedTaxonomies: getFacetedTaxonomies,
                    getTabOrderTodisplay: getTabOrderTodisplay,
                    getHasFacetedTaxonomies: getHasFacetedTaxonomies
                };
            });
        }
        this.help = help;
    }
    ngObibaMica.search.service('SearchControllerFacetHelperService', ['MetaTaxonomyService', 'ngObibaMicaSearch', SearchControllerFacetHelperService]);
})();
//# sourceMappingURL=search-controller-facet-helper-service.js.map
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
(function () {
    var pageSizes = [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
    ];
    ngObibaMica.search.PaginationState = function (target, defaultPageSize) {
        this.target = target;
        this.initialPageSize = defaultPageSize;
        this.currentPage = 1;
        this.from = 0;
        this.to = 0;
        this.selected = this.findPageSize(defaultPageSize);
        this.totalHits = null;
        this.pageCount = 0;
        this.maxSize = 3;
    };
    ngObibaMica.search.PaginationState.prototype.updateRange = function () {
        var pageSize = this.selected.value;
        var current = this.currentPage;
        this.from = pageSize * (current - 1) + 1;
        this.to = Math.min(this.totalHits, pageSize * current);
    };
    ngObibaMica.search.PaginationState.prototype.initializeCurrentPage = function (pagination) {
        if (pagination && pagination.hasOwnProperty('from')) {
            this.selected = this.findPageSize(pagination.size);
            this.currentPage = 1 + pagination.from / this.selected.value;
        }
        else {
            this.selected = this.findPageSize(this.initialPageSize);
            this.currentPage = 1;
        }
    };
    ngObibaMica.search.PaginationState.prototype.update = function (pagination, hits) {
        this.totalHits = hits || null;
        this.initializeCurrentPage(pagination);
        this.updateRange();
        this.updatePageCount();
        this.updateMaxSize();
    };
    ngObibaMica.search.PaginationState.prototype.findPageSize = function (pageSize) {
        var result = pageSizes.filter(function (p) {
            return p.value === pageSize;
        }).pop();
        return result ? result : pageSizes[0];
    };
    ngObibaMica.search.PaginationState.prototype.totalHitsChanged = function (hits) {
        return null !== this.totalHits && this.totalHits !== hits;
    };
    ngObibaMica.search.PaginationState.prototype.updatePageCount = function () {
        this.pageCount = Math.ceil(this.totalHits / this.selected.value);
    };
    ngObibaMica.search.PaginationState.prototype.updateMaxSize = function () {
        this.maxSize = Math.min(3, this.pageCount);
    };
    ngObibaMica.search.PaginationState.prototype.data = function () {
        return {
            target: this.target,
            initialPageSize: this.initialPageSize,
            currentPage: this.currentPage,
            from: this.from,
            to: this.to,
            selected: this.selected,
            totalHits: this.totalHits,
            maxSize: this.maxSize,
            pageCount: this.pageCount,
            pageSizes: pageSizes
        };
    };
})();
//# sourceMappingURL=pagination-state.js.map
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
(function () {
    function getTaxonomyWeightAttribute(taxonomy) {
        var defaultWeight = 0;
        if (taxonomy.attributes) {
            var weightAttribute = taxonomy.attributes.filter(function (attribute) { return 'weight' === attribute.key; })[0];
            defaultWeight = weightAttribute ? parseInt(weightAttribute.value) || 0 : 0;
        }
        return defaultWeight;
    }
    /**
     * Parses each metaTaxonomies taxonomy and returns a list of :
     * [
     *  {
     *    info: {
     *      name: name,
     *      title: title
     *     },
     *    taxonomies: [taxos]
     *   }
     * ]
     * @constructor
     */
    ngObibaMica.search.MetaTaxonomyParser = function (config) {
        function parseTerms(targetConfig, terms) {
            return terms.map(function (taxonomy, index) {
                var result = {
                    state: new ngObibaMica.search.PanelTaxonomyState(index + ''),
                    info: { name: taxonomy.name || '', title: taxonomy.title || '', description: taxonomy.description || '',
                        weight: getTaxonomyWeightAttribute(taxonomy) },
                    taxonomies: [taxonomy]
                };
                var taxonomyConfig = targetConfig.taxonomies[taxonomy.name];
                if (taxonomyConfig && taxonomyConfig.hasOwnProperty('trKey')) {
                    result.info.trKey = taxonomyConfig.trKey;
                }
                return result;
            });
        }
        function createResultObject(metaVocabulary, taxonomies) {
            return {
                name: metaVocabulary.name,
                title: metaVocabulary.title,
                taxonomies: taxonomies
            };
        }
        function sortTaxonomies(taxonomies) {
            taxonomies.sort(function (a, b) {
                return a.info.weight - b.info.weight;
            });
        }
        this.config = config;
        this.parseTerms = parseTerms;
        this.createResultObject = createResultObject;
        this.sortTaxonomies = sortTaxonomies;
    };
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function (metaVocabulary) {
        return this.createResultObject(metaVocabulary, this.parseTerms(this.config[metaVocabulary.name], metaVocabulary.terms || []));
    };
    /**
     * Variable meta taxonomies need to be massaged a little more:
     * - extract Variable characteristics
     * - extract Scales as one taxonomy (there are four related taxonomies) into one
     * - sort them and return the list to the client code
     * @param metaVocabulary
     * @returns {{name, title, taxonomies}|*}
     */
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function (metaVocabulary) {
        var metaTaxonomies = metaVocabulary.terms.filter(function (term) {
            return ['Variable_chars', 'Scales'].indexOf(term.name) > -1;
        }).reduce(function (acc, term) {
            var key = new obiba.utils.NgObibaStringUtils().camelize(term.name);
            acc[key] = term;
            return acc;
        }, {});
        var taxonomies = this.parseTerms(this.config[QUERY_TARGETS.VARIABLE], metaTaxonomies.variableChars.terms);
        var scales = metaTaxonomies.scales;
        if (scales && scales.terms) {
            taxonomies.push({
                state: new ngObibaMica.search.PanelTaxonomyState(),
                info: {
                    name: scales.name,
                    names: scales.terms.map(function (t) { return t.name; }),
                    title: scales.title,
                    description: scales.description || '',
                    weight: getTaxonomyWeightAttribute(scales)
                },
                taxonomies: scales.terms
            });
        }
        this.sortTaxonomies(taxonomies);
        return this.createResultObject(metaVocabulary, taxonomies);
    };
})();
//# sourceMappingURL=meta-taxonomy-parser.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function () {
    'use strict';
    ngObibaMica.search.PanelTaxonomyState = function (id) {
        var STATES = {
            NONE: 0,
            ACTIVE: 1,
            LOADING: 2
        };
        this.id = id;
        this.STATES = STATES;
        this.state = STATES.NONE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isLoading = function () {
        return this.STATES.LOADING === (this.state & this.STATES.LOADING);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isActive = function () {
        return this.STATES.ACTIVE === (this.state & this.STATES.ACTIVE);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.active = function () {
        this.state = this.state | this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.inactive = function () {
        this.state = this.state & ~this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loading = function () {
        this.state = this.state | this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loaded = function () {
        this.state = this.state & ~this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.none = function () {
        this.state = this.STATES.NONE;
    };
})();
//# sourceMappingURL=panel-taxonomy-state.js.map
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
(function () {
    ngObibaMica.search
        .factory('DocumentSuggestionResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DocumentSuggestion'), {}, {
                'query': {
                    method: 'GET',
                    errorHandler: true,
                    isArray: true
                }
            });
        }]);
})();
//# sourceMappingURL=document-suggestion-resource.js.map
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
(function () {
    ngObibaMica.search.factory('JoinQueryCoverageResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var resourceUrl = ngObibaMicaUrl.getUrl('JoinQueryCoverageResource');
            var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
            var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
            var requestTransformer = function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            };
            return $resource(resourceUrl, {}, {
                'get': {
                    method: method,
                    headers: {
                        'Content-Type': contentType
                    },
                    transformRequest: requestTransformer,
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=join-query-coverage-resource.js.map
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
(function () {
    ngObibaMica.search.factory('JoinQuerySearchResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
            var actionFactory = function (type) {
                var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
                var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
                var requestTransformer = function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                };
                return {
                    method: method,
                    headers: {
                        'Content-Type': contentType
                    },
                    errorHandler: true,
                    params: { type: type },
                    transformRequest: requestTransformer
                };
            };
            return $resource(resourceUrl, {}, {
                'variables': actionFactory('variables'),
                'studies': actionFactory('studies'),
                'networks': actionFactory('networks'),
                'datasets': actionFactory('datasets')
            });
        }]);
})();
//# sourceMappingURL=join-query-search-resource.js.map
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
(function () {
    ngObibaMica.search
        .factory('TaxonomiesResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('TaxonomiesResource'), {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    errorHandler: true,
                    cache: $cacheFactory('taxonomiesResource')
                }
            });
        }]);
})();
//# sourceMappingURL=taxonomies-resource.js.map
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
(function () {
    ngObibaMica.search
        .factory('TaxonomiesSearchResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('TaxonomiesSearchResource'), {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=taxonomies-search-resource.js.map
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
(function () {
    ngObibaMica.search
        .factory('TaxonomyResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('TaxonomyResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    cache: $cacheFactory('taxonomyResource')
                }
            });
        }]);
})();
//# sourceMappingURL=taxonomy-resource.js.map
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
(function () {
    ngObibaMica.search.factory('VocabularyResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('VocabularyResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=vocabulary-resource.js.map
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
/* global QUERY_TARGETS */
/* global QUERY_TYPES */
/* global BUCKET_TYPES */
/* global RQL_NODE */
/* global DISPLAY_TYPES */
/* global CriteriaIdGenerator */
/* global SORT_FIELDS */
(function () {
    function manageSearchHelpText($scope, $translate, $cookies) {
        var cookiesSearchHelp = 'micaHideSearchHelpText';
        var cookiesClassificationHelp = 'micaHideClassificationHelpBox';
        $translate(['search.help', 'search.coverage-help'])
            .then(function (translation) {
            if (!$scope.options.SearchHelpText && !$cookies.get(cookiesSearchHelp)) {
                $scope.options.SearchHelpText = translation['search.help'];
            }
            if (!$scope.options.ClassificationHelpText && !$cookies.get(cookiesClassificationHelp)) {
                $scope.options.ClassificationHelpText = translation['classifications.help'];
            }
        });
        // Close the Help search box and set the local cookies
        $scope.closeHelpBox = function () {
            $cookies.put(cookiesSearchHelp, true);
            $scope.options.SearchHelpText = null;
        };
        // Close the Help classification box and set the local cookies
        $scope.closeClassificationHelpBox = function () {
            $cookies.put(cookiesClassificationHelp, true);
            $scope.options.ClassificationHelpText = null;
        };
        // Retrieve from local cookies if user has disabled the Help Search Box and hide the box if true
        if ($cookies.get(cookiesSearchHelp)) {
            $scope.options.SearchHelpText = null;
        }
        // Retrieve from local cookies if user has disabled the Help Classification Box and hide the box if true
        if ($cookies.get(cookiesClassificationHelp)) {
            $scope.options.ClassificationHelpText = null;
        }
    }
    ngObibaMica.search
        .controller('SearchController', ['$timeout',
        '$scope',
        '$rootScope',
        '$location',
        '$translate',
        '$filter',
        '$cookies',
        'ngObibaMicaSearchTemplateUrl',
        'ObibaServerConfigResource',
        'JoinQuerySearchResource',
        'JoinQueryCoverageResource',
        'AlertService',
        'ServerErrorUtils',
        'LocalizedValues',
        'RqlQueryService',
        'RqlQueryUtils',
        'SearchContext',
        'CoverageGroupByService',
        'VocabularyService',
        'EntitySuggestionRqlUtilityService',
        'SearchControllerFacetHelperService',
        'options',
        'PaginationService',
        function ($timeout, $scope, $rootScope, $location, $translate, $filter, $cookies, ngObibaMicaSearchTemplateUrl, ObibaServerConfigResource, JoinQuerySearchResource, JoinQueryCoverageResource, AlertService, ServerErrorUtils, LocalizedValues, RqlQueryService, RqlQueryUtils, SearchContext, CoverageGroupByService, VocabularyService, EntitySuggestionRqlUtilityService, SearchControllerFacetHelperService, options, PaginationService) {
            $scope.options = options;
            manageSearchHelpText($scope, $translate, $cookies);
            $scope.taxonomyTypeMap = {
                variable: 'variables',
                study: 'studies',
                network: 'networks',
                dataset: 'datasets'
            };
            $translate(['search.classifications-title', 'search.classifications-link', 'search.faceted-navigation-help'])
                .then(function (translation) {
                $scope.hasClassificationsTitle = translation['search.classifications-title'];
                $scope.hasClassificationsLinkLabel = translation['search.classifications-link'];
                $scope.hasFacetedNavigationHelp = translation['search.faceted-navigation-help'];
            });
            var searchTaxonomyDisplay = {
                variable: $scope.options.variables.showSearchTab,
                dataset: $scope.options.datasets.showSearchTab,
                study: $scope.options.studies.showSearchTab,
                network: $scope.options.networks.showSearchTab
            };
            var taxonomyTypeInverseMap = Object.keys($scope.taxonomyTypeMap).reduce(function (prev, k) {
                prev[$scope.taxonomyTypeMap[k]] = k;
                return prev;
            }, {});
            $scope.targets = [];
            $scope.lang = $translate.use();
            function initSearchTabs() {
                function getTabsOrderParam(arg) {
                    var value = $location.search()[arg];
                    return value && value.split(',')
                        .filter(function (t) {
                        return t;
                    })
                        .map(function (t) {
                        return t.trim();
                    });
                }
                var targetTabsOrderParam = getTabsOrderParam('targetTabsOrder');
                $scope.targetTabsOrder = (targetTabsOrderParam || $scope.options.targetTabsOrder).filter(function (t) {
                    return searchTaxonomyDisplay[t];
                });
                var searchTabsOrderParam = getTabsOrderParam('searchTabsOrder');
                $scope.searchTabsOrder = searchTabsOrderParam || $scope.options.searchTabsOrder;
                var resultTabsOrderParam = getTabsOrderParam('resultTabsOrder');
                $scope.resultTabsOrder = (resultTabsOrderParam || $scope.options.resultTabsOrder).filter(function (t) {
                    return searchTaxonomyDisplay[t];
                });
                if ($location.search().target) {
                    $scope.target = $location.search().target;
                }
                else if (!$scope.target) {
                    $scope.target = $scope.targetTabsOrder[0];
                }
            }
            function onError(response) {
                $scope.search.result = {};
                $scope.search.loading = false;
                AlertService.alert({
                    id: 'SearchController',
                    type: 'danger',
                    msg: ServerErrorUtils.buildMessage(response),
                    delay: 5000
                });
            }
            function canExecuteWithEmptyQuery() {
                return $scope.search.layout === 'layout2' || $scope.search.query;
            }
            function validateType(type) {
                if (!type || !QUERY_TYPES[type.toUpperCase()]) {
                    throw new Error('Invalid type: ' + type);
                }
            }
            function validateBucket(bucket) {
                if (bucket &&
                    (!BUCKET_TYPES[bucket.replace('-', '_').toUpperCase()] || !CoverageGroupByService.canGroupBy(bucket))) {
                    throw new Error('Invalid bucket ' + bucket);
                }
            }
            function validateDisplay(display) {
                if (!display || !DISPLAY_TYPES[display.toUpperCase()]) {
                    throw new Error('Invalid display: ' + display);
                }
            }
            function getDefaultQueryType() {
                return $scope.taxonomyTypeMap[$scope.resultTabsOrder[0]];
            }
            function getDefaultDisplayType() {
                return $scope.searchTabsOrder[0] || DISPLAY_TYPES.LIST;
            }
            function resolveLayout(resolvedOptions) {
                return resolvedOptions.listLayout ? resolvedOptions.listLayout :
                    resolvedOptions.searchLayout ? resolvedOptions.searchLayout : 'layout2';
            }
            function validateQueryData() {
                try {
                    var search = $location.search();
                    var type = $scope.resultTabsOrder.indexOf(taxonomyTypeInverseMap[search.type]) > -1 ? search.type : getDefaultQueryType();
                    var bucket = search.bucket && CoverageGroupByService.canGroupBy(search.bucket) ? search.bucket : CoverageGroupByService.defaultBucket();
                    var display = $scope.searchTabsOrder.indexOf(search.display) > -1 ? search.display : getDefaultDisplayType();
                    var query = search.query || '';
                    validateType(type);
                    validateBucket(bucket);
                    validateDisplay(display);
                    $scope.search.type = type;
                    $scope.search.bucket = bucket;
                    $scope.search.display = display;
                    $scope.search.query = query;
                    $scope.search.rqlQuery = RqlQueryService.parseQuery(query);
                    $scope.search.layout = setLayout(search.layout ? search.layout : resolveLayout($scope.options));
                    return true;
                }
                catch (e) {
                    AlertService.alert({
                        id: 'SearchController',
                        type: 'danger',
                        msg: e.message,
                        delay: 5000
                    });
                }
                return false;
            }
            function setLayout(layout) {
                return layout ? (['layout1', 'layout2'].indexOf(layout) > -1 ? layout : 'layout2') : 'layout2';
            }
            var clearSearchQuery = function () {
                var search = $location.search();
                delete search.query;
                $location.search(search);
            };
            var toggleSearchQuery = function () {
                $scope.search.advanced = !$scope.search.advanced;
            };
            var showAdvanced = function () {
                var children = $scope.search.criteria.children || [];
                for (var i = children.length; i--;) {
                    var vocabularyChildren = children[i].children || [];
                    for (var j = vocabularyChildren.length; j--;) {
                        if (vocabularyChildren[j].type === RQL_NODE.OR || vocabularyChildren[j].type === RQL_NODE.AND) {
                            return true;
                        }
                    }
                }
            };
            function sortCriteriaItems(items) {
                items.sort(function (a, b) {
                    if (a.target === 'network' || b.target === 'variable') {
                        return -1;
                    }
                    if (a.target === 'variable' || b.target === 'network') {
                        return 1;
                    }
                    if (a.target < b.target) {
                        return 1;
                    }
                    if (a.target > b.target) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
            function loadResults() {
                // execute search only when results are to be shown
                if ($location.path() !== '/search') {
                    return;
                }
                function updateSortByType() {
                    var rqlSort = RqlQueryService.getTargetQuerySort($scope.search.type, $scope.search.rqlQuery);
                    var sort = rqlSort && rqlSort.args ? rqlSort.args : null;
                    if (!sort) {
                        sort = $scope.search.type === QUERY_TYPES.VARIABLES ? SORT_FIELDS.NAME : SORT_FIELDS.ACRONYM;
                        if ($scope.search.type === QUERY_TYPES.VARIABLES) {
                            sort = [SORT_FIELDS.VARIABLE_TYPE, SORT_FIELDS.CONTAINER_ID, SORT_FIELDS.POPULATION_WEIGHT, SORT_FIELDS.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.DATASET_ID, SORT_FIELDS.INDEX, SORT_FIELDS.NAME];
                        }
                        else if ($scope.search.type === QUERY_TYPES.DATASETS) {
                            sort = [SORT_FIELDS.STUDY_TABLE.STUDY_ID, SORT_FIELDS.STUDY_TABLE.POPULATION_WEIGHT, SORT_FIELDS.STUDY_TABLE.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.ACRONYM];
                        }
                    }
                    return sort;
                }
                var localizedQuery = RqlQueryService.prepareSearchQueryAndSerialize($scope.search.display, $scope.search.type, $scope.search.rqlQuery, $scope.lang, updateSortByType());
                function getCountResultFromJoinQuerySearchResponse(response) {
                    return {
                        studyTotalCount: {
                            total: response.studyResultDto.totalCount,
                            hits: response.studyResultDto.totalHits
                        },
                        datasetTotalCount: {
                            total: response.datasetResultDto.totalCount,
                            hits: response.datasetResultDto.totalHits
                        },
                        variableTotalCount: {
                            total: response.variableResultDto.totalCount,
                            hits: response.variableResultDto.totalHits
                        },
                        networkTotalCount: {
                            total: response.networkResultDto.totalCount,
                            hits: response.networkResultDto.totalHits
                        }
                    };
                }
                switch ($scope.search.display) {
                    case DISPLAY_TYPES.LIST:
                        $scope.search.loading = true;
                        $scope.search.executedQuery = localizedQuery;
                        JoinQuerySearchResource[$scope.search.type]({ query: localizedQuery }, function onSuccess(response) {
                            $scope.search.result.list = response;
                            $scope.search.loading = false;
                            $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
                            $timeout(function () {
                                var pagination = RqlQueryService.getQueryPaginations($scope.search.rqlQuery);
                                PaginationService.update(pagination, $scope.search.countResult);
                            });
                        }, onError);
                        break;
                    case DISPLAY_TYPES.COVERAGE:
                        var hasVariableCriteria = Object.keys($scope.search.criteriaItemMap).map(function (k) {
                            return $scope.search.criteriaItemMap[k];
                        }).filter(function (item) {
                            return QUERY_TARGETS.VARIABLE === item.getTarget() && item.taxonomy.name !== 'Mica_variable';
                        }).length > 0;
                        if (hasVariableCriteria) {
                            $scope.search.loading = true;
                            $scope.search.executedQuery = RqlQueryService.prepareCoverageQuery(localizedQuery, $scope.search.bucket);
                            JoinQueryCoverageResource.get({ query: $scope.search.executedQuery }, function onSuccess(response) {
                                $scope.search.result.coverage = response;
                                $scope.search.loading = false;
                                $scope.search.countResult = response.totalCounts;
                            }, onError);
                        }
                        else {
                            $scope.search.result = {};
                        }
                        break;
                    case DISPLAY_TYPES.GRAPHICS:
                        $scope.search.loading = true;
                        $scope.search.executedQuery = RqlQueryService.prepareGraphicsQuery(localizedQuery, ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'], ['Mica_study.methods-design']);
                        JoinQuerySearchResource.studies({ query: $scope.search.executedQuery }, function onSuccess(response) {
                            $scope.search.result.graphics = response;
                            $scope.search.loading = false;
                            $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
                        }, onError);
                        break;
                }
            }
            function findAndSetCriteriaItemForTaxonomyVocabularies(target, taxonomy) {
                if (Array.isArray(taxonomy)) {
                    taxonomy.forEach(function (subTaxonomy) {
                        subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                            taxonomyVocabulary.existingItem =
                                RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(subTaxonomy, taxonomyVocabulary), $scope.search.criteria, true);
                        });
                    });
                }
                else {
                    taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                        taxonomyVocabulary.existingItem =
                            RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
                    });
                }
            }
            function executeSearchQuery() {
                if (validateQueryData()) {
                    // build the criteria UI
                    RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function (result) {
                        // criteria UI is updated here
                        $scope.search.criteria = result.root;
                        if ($scope.search.criteria && $scope.search.criteria.children) {
                            sortCriteriaItems($scope.search.criteria.children);
                        }
                        $scope.search.criteriaItemMap = result.map;
                        if (canExecuteWithEmptyQuery()) {
                            loadResults();
                        }
                        if ($scope.search.selectedTarget && $scope.search.selectedTaxonomy) {
                            findAndSetCriteriaItemForTaxonomyVocabularies($scope.search.selectedTarget, $scope.search.selectedTaxonomy);
                        }
                        $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.search.criteria);
                    });
                }
            }
            function processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary) {
                function processExistingItem(existingItem) {
                    if (existingItem) {
                        if (VocabularyService.isNumericVocabulary(taxonomyVocabulary)) {
                            taxonomyVocabulary.rangeTerms = existingItem.getRangeTerms();
                        }
                        if (VocabularyService.isMatchVocabulary(taxonomyVocabulary)) {
                            taxonomyVocabulary.matchString = existingItem.selectedTerms.join('');
                        }
                        // when vocabulary has terms
                        taxonomyVocabulary.wholeVocabularyIsSelected = ['exists', 'match'].indexOf(existingItem.type) > -1;
                        (taxonomyVocabulary.terms || []).forEach(function (term) {
                            term.selected = existingItem.type === 'exists' || existingItem.selectedTerms.indexOf(term.name) > -1;
                        });
                    }
                    else {
                        taxonomyVocabulary.rangeTerms = {};
                        taxonomyVocabulary.matchString = null;
                        // when vocabulary has terms
                        taxonomyVocabulary.wholeVocabularyIsSelected = false;
                        (taxonomyVocabulary.terms || []).forEach(function (term) {
                            term.selected = false;
                        });
                    }
                    taxonomyVocabulary._existingItem = existingItem;
                }
                taxonomyVocabulary.__defineSetter__('existingItem', processExistingItem);
                taxonomyVocabulary.__defineGetter__('existingItem', function () { return taxonomyVocabulary._existingItem; });
                taxonomyVocabulary.existingItem =
                    RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
            }
            function onTaxonomyFilterPanelToggleVisibility(target, taxonomy) {
                if (target && taxonomy) {
                    if (Array.isArray(taxonomy)) {
                        taxonomy.forEach(function (subTaxonomy) {
                            subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                                processTaxonomyVocabulary(target, subTaxonomy, taxonomyVocabulary);
                            });
                        });
                    }
                    else {
                        taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                            processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary);
                        });
                    }
                }
                $scope.search.selectedTarget = target;
                $scope.search.selectedTaxonomy = taxonomy;
                $scope.search.showTaxonomyPanel = taxonomy !== null;
                // QUICKFIX for MK-1772 - there is a digest desync and UI misses info, resend the request upon closing
                // A good solution may be a RequestQueue.
                if (!$scope.search.showTaxonomyPanel) {
                    loadResults();
                }
            }
            $rootScope.$on('$translateChangeSuccess', function (event, value) {
                if (value.language !== SearchContext.currentLocale()) {
                    $scope.lang = $translate.use();
                    SearchContext.setLocale($scope.lang);
                    executeSearchQuery();
                }
            });
            var searchQueryBuilder = function (rqlQuery) {
                var query;
                if (!rqlQuery) {
                    query = new RqlQuery().serializeArgs($scope.search.rqlQuery.args);
                }
                else {
                    query = new RqlQuery().serializeArgs(rqlQuery.args);
                }
                var search = $location.search();
                if ('' === query) {
                    delete search.query;
                }
                else {
                    search.query = query;
                }
                return search;
            };
            /**
             * Updates the URL location triggering a query execution
             */
            var refreshQuery = function () {
                $location.search(searchQueryBuilder());
            };
            /**
             * Updates the URL location without triggering a query execution
             */
            var replaceQuery = function () {
                $location.search(searchQueryBuilder()).replace();
            };
            /**
             * Removes the item from the criteria tree
             * @param item
             */
            var removeCriteriaItem = function (item) {
                RqlQueryService.removeCriteriaItem(item);
                refreshQuery();
            };
            var updateCriteriaRequestHandler = function (item, logicalOp, replace, showNotification, fullCoverage, doRequest) {
                if (angular.isUndefined(showNotification) && doRequest) {
                    showNotification = true;
                }
                var rqlQuery;
                if (!doRequest) {
                    rqlQuery = angular.copy($scope.search.rqlQuery);
                }
                else {
                    rqlQuery = $scope.search.rqlQuery;
                }
                if (item.id) {
                    var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
                    var existingItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
                    var growlMsgKey;
                    if (doRequest) {
                    }
                    if (existingItem && id.indexOf('dceId') !== -1 && fullCoverage) {
                        removeCriteriaItem(existingItem);
                        growlMsgKey = doRequest ? 'search.criterion.updated' : null;
                        RqlQueryService.addCriteriaItem(rqlQuery, item, logicalOp);
                    }
                    else if (existingItem) {
                        growlMsgKey = doRequest ? 'search.criterion.updated' : null;
                        RqlQueryService.updateCriteriaItem(existingItem, item, replace);
                    }
                    else {
                        growlMsgKey = doRequest ? 'search.criterion.created' : null;
                        RqlQueryService.addCriteriaItem(rqlQuery, item, logicalOp);
                    }
                    if (showNotification && doRequest) {
                        $scope.search.rqlQuery = rqlQuery;
                        AlertService.growl({
                            id: 'SearchControllerGrowl',
                            type: 'info',
                            msgKey: growlMsgKey,
                            msgArgs: [LocalizedValues.forLocale(item.vocabulary.title, $scope.lang), $filter('translate')('taxonomy.target.' + item.target)],
                            delay: 3000
                        });
                        refreshQuery();
                    }
                    else {
                        return searchQueryBuilder(rqlQuery);
                    }
                }
            };
            /**
             * Propagates a Scope change that results in criteria panel update
             * @param item
             */
            var urlSelectCriteria = function (item, logicalOp, type) {
                var urlQuery = updateCriteriaRequestHandler(item, logicalOp);
                urlQuery.type = type;
                return urlQuery;
            };
            /**
             * Propagates a Scope change that results in criteria panel update
             * @param item
             */
            var selectCriteria = function (item, logicalOp, replace, showNotification, fullCoverage) {
                updateCriteriaRequestHandler(item, logicalOp, replace, showNotification, fullCoverage, true);
            };
            var onTypeChanged = function (type) {
                if (type) {
                    validateType(type);
                    var search = $location.search();
                    search.type = type;
                    search.display = DISPLAY_TYPES.LIST;
                    $location.search(search);
                }
            };
            var onBucketChanged = function (bucket) {
                if (bucket) {
                    validateBucket(bucket);
                    var search = $location.search();
                    search.bucket = bucket;
                    $location.search(search);
                }
            };
            function onLocationChange(event, newLocation, oldLocation) {
                if (newLocation !== oldLocation) {
                    try {
                        validateBucket($location.search().bucket);
                        executeSearchQuery();
                    }
                    catch (error) {
                        var defaultBucket = CoverageGroupByService.defaultBucket();
                        $location.search('bucket', defaultBucket).replace();
                    }
                }
            }
            var onPaginate = function (target, from, size, replace) {
                $scope.search.rqlQuery = $scope.search.rqlQuery || new RqlQueryUtils(RQL_NODE.AND);
                RqlQueryService.prepareQueryPagination($scope.search.rqlQuery, target, from, size);
                if (replace) {
                    replaceQuery();
                }
                else {
                    refreshQuery();
                }
            };
            var onDisplayChanged = function (display) {
                if (display) {
                    validateDisplay(display);
                    var search = $location.search();
                    search.display = display;
                    $location.search(search);
                }
            };
            var onUpdateCriteria = function (item, type, useCurrentDisplay, replaceTarget, showNotification, fullCoverage, isLink) {
                if (!isLink) {
                    if (type) {
                        onTypeChanged(type);
                    }
                    if (replaceTarget) {
                        var criteriaItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
                        if (criteriaItem) {
                            ngObibaMica.search.CriteriaReducer.reduce(criteriaItem.parent, criteriaItem);
                        }
                    }
                    onDisplayChanged(useCurrentDisplay && $scope.search.display ? $scope.search.display : DISPLAY_TYPES.LIST);
                    selectCriteria(item, RQL_NODE.AND, true, showNotification, fullCoverage);
                }
                else {
                    var url = urlSelectCriteria(item, RQL_NODE.AND, type);
                    return url;
                }
            };
            var onRemoveCriteria = function (item) {
                var found = RqlQueryService.findCriterion($scope.search.criteria, item.id);
                removeCriteriaItem(found);
            };
            var onSelectTerm = function (target, taxonomy, vocabulary, args) {
                args = args || {};
                if (args.text) {
                    args.text = args.text.replace(/[^a-zA-Z0-9" _-]/g, '');
                }
                if (angular.isString(args)) {
                    args = { term: args };
                }
                if (vocabulary) {
                    var item;
                    if (VocabularyService.isNumericVocabulary(vocabulary)) {
                        item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                        item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
                        RqlQueryUtils.updateRangeQuery(item.rqlQuery, args.from, args.to);
                        selectCriteria(item, null, true);
                        return;
                    }
                    else if (VocabularyService.isMatchVocabulary(vocabulary)) {
                        item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                        item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
                        RqlQueryUtils.updateMatchQuery(item.rqlQuery, args.text);
                        selectCriteria(item, null, true);
                        return;
                    }
                }
                if (options.searchLayout === 'layout1') {
                    selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang));
                }
                else {
                    // TODO externalize TermsVocabularyFacetController.selectTerm and use it for terms case
                    var selected = vocabulary.terms.filter(function (t) { return t.selected; }).map(function (t) { return t.name; }), criterion = RqlQueryService.findCriterion($scope.search.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));
                    if (criterion && args.term) {
                        criterion.rqlQuery.name = RQL_NODE.IN;
                        if (args.term.selected) {
                            criterion.rqlQuery = RqlQueryUtils.mergeInQueryArgValues(criterion.rqlQuery, [args.term.name]);
                        }
                        else {
                            var currentTerms = criterion.rqlQuery.args[1] || [];
                            if (criterion.type === RQL_NODE.EXISTS) {
                                currentTerms = criterion.vocabulary.terms.map(function (term) {
                                    return term.name;
                                });
                            }
                            var index = currentTerms.indexOf(args.term.name);
                            currentTerms = Array.isArray(currentTerms) ? currentTerms : [currentTerms];
                            if (index > -1) {
                                currentTerms.splice(index, 1);
                                if (currentTerms.length === 0) {
                                    criterion.rqlQuery.name = RQL_NODE.EXISTS;
                                }
                            }
                            else {
                                currentTerms.push(args.term.name);
                            }
                            criterion.rqlQuery = RqlQueryUtils.mergeInQueryArgValues(criterion.rqlQuery, currentTerms);
                        }
                        if (vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length) {
                            criterion.rqlQuery.name = RQL_NODE.EXISTS;
                            criterion.rqlQuery.args.pop();
                        }
                        $scope.refreshQuery();
                    }
                    else {
                        var setExists = vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length;
                        selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, !setExists && (args && args.term), $scope.lang));
                    }
                }
            };
            var VIEW_MODES = {
                SEARCH: 'search',
                CLASSIFICATION: 'classification'
            };
            var SUGGESTION_FIELDS_MAP = new Map([
                [QUERY_TARGETS.NETWORK, ['acronym', 'name']],
                [QUERY_TARGETS.STUDY, ['acronym', 'name']],
                [QUERY_TARGETS.DATASET, ['acronym', 'name']],
                [QUERY_TARGETS.VARIABLE, ['name', 'label']]
            ]);
            function searchSuggestion(target, suggestion, withSpecificFields) {
                var rqlQuery = $scope.search.rqlQuery;
                var targetQuery = RqlQueryService.findTargetQuery(target, rqlQuery);
                if (!targetQuery) {
                    targetQuery = new RqlQuery(target);
                    rqlQuery.push(targetQuery);
                }
                // get filter fields
                var filterFields;
                if (withSpecificFields) {
                    filterFields = SUGGESTION_FIELDS_MAP.get(target);
                }
                var matchQuery = EntitySuggestionRqlUtilityService.createMatchQuery(suggestion, filterFields);
                if (!matchQuery) {
                    EntitySuggestionRqlUtilityService.removeFilteredMatchQueryFromTargetQuery(targetQuery);
                }
                else {
                    var filterQuery = EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery);
                    if (!filterQuery) {
                        targetQuery.push(new RqlQuery(RQL_NODE.FILTER).push(matchQuery));
                    }
                    else {
                        var currentMatchQuery = EntitySuggestionRqlUtilityService.givenFilterQueryGetMatchQuery(filterQuery);
                        if (currentMatchQuery) {
                            currentMatchQuery.args = matchQuery.args;
                        }
                        else {
                            filterQuery.push(matchQuery);
                        }
                    }
                }
                refreshQuery();
            }
            $scope.searchSuggestion = searchSuggestion;
            $scope.goToSearch = function () {
                $scope.viewMode = VIEW_MODES.SEARCH;
                $location.search('taxonomy', null);
                $location.search('vocabulary', null);
                $location.search('target', null);
                $location.path('/search');
            };
            $scope.goToClassifications = function () {
                $scope.viewMode = VIEW_MODES.CLASSIFICATION;
                $location.path('/classifications');
                $location.search('target', $scope.targetTabsOrder[0]);
            };
            $scope.navigateToTarget = function (target) {
                $location.search('target', target);
                $location.search('taxonomy', null);
                $location.search('vocabulary', null);
                $scope.target = target;
            };
            $scope.QUERY_TYPES = QUERY_TYPES;
            $scope.BUCKET_TYPES = BUCKET_TYPES;
            $scope.search = {
                layout: 'layout2',
                query: null,
                advanced: false,
                rqlQuery: new RqlQuery(),
                executedQuery: null,
                type: null,
                bucket: null,
                result: {
                    list: null,
                    coverage: null,
                    graphics: null
                },
                criteria: [],
                criteriaItemMap: {},
                loading: false
            };
            $scope.viewMode = VIEW_MODES.SEARCH;
            $scope.searchHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('search');
            $scope.classificationsHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('classifications');
            $scope.onTaxonomyFilterPanelToggleVisibility = onTaxonomyFilterPanelToggleVisibility;
            $scope.selectDisplay = onDisplayChanged;
            $scope.selectCriteria = selectCriteria;
            $scope.removeCriteriaItem = removeCriteriaItem;
            $scope.refreshQuery = refreshQuery;
            $scope.clearSearchQuery = clearSearchQuery;
            $scope.toggleSearchQuery = toggleSearchQuery;
            $scope.showAdvanced = showAdvanced;
            $scope.onTypeChanged = onTypeChanged;
            $scope.onBucketChanged = onBucketChanged;
            $scope.onDisplayChanged = onDisplayChanged;
            $scope.onUpdateCriteria = onUpdateCriteria;
            $scope.onRemoveCriteria = onRemoveCriteria;
            $scope.onSelectTerm = onSelectTerm;
            $scope.QUERY_TARGETS = QUERY_TARGETS;
            $scope.onPaginate = onPaginate;
            $scope.canExecuteWithEmptyQuery = canExecuteWithEmptyQuery;
            $scope.inSearchMode = function () {
                return $scope.viewMode === VIEW_MODES.SEARCH;
            };
            $scope.toggleFullscreen = function () {
                $scope.isFullscreen = !$scope.isFullscreen;
            };
            $scope.isSearchAvailable = true;
            ObibaServerConfigResource.get(function (micaConfig) {
                $scope.isSearchAvailable = !micaConfig.isSingleStudyEnabled ||
                    (micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled) ||
                    micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
            });
            $scope.unbindLocationChange = $scope.$on('$locationChangeSuccess', onLocationChange);
            $rootScope.$on('ngObibaMicaSearch.fullscreenChange', function (obj, isEnabled) {
                $scope.isFullscreen = isEnabled;
            });
            $rootScope.$on('ngObibaMicaSearch.sortChange', function (obj, sort) {
                $scope.search.rqlQuery = RqlQueryService.prepareSearchQueryNoFields($scope.search.display, $scope.search.type, $scope.search.rqlQuery, $scope.lang, sort);
                refreshQuery();
            });
            $rootScope.$on('ngObibaMicaSearch.searchSuggestion', function (event, suggestion, target, withSpecificFields) {
                searchSuggestion(target, suggestion, withSpecificFields);
            });
            function init() {
                $scope.taxonomyNav = [];
                $scope.lang = $translate.use();
                SearchContext.setLocale($scope.lang);
                initSearchTabs();
                SearchControllerFacetHelperService.help($scope.targetTabsOrder, $scope.lang).then(function (data) {
                    $scope.facetedTaxonomies = data.getFacetedTaxonomies();
                    $scope.hasFacetedTaxonomies = data.getHasFacetedTaxonomies();
                    $scope.targetTabsOrder = data.getTabOrderTodisplay();
                    $scope.taxonomyNav = data.getTaxonomyNav();
                });
                executeSearchQuery();
            }
            init();
        }])
        .controller('ResultTabsOrderCountController', [function () {
        }]);
})();
//# sourceMappingURL=search-controller.js.map
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
ngObibaMica.search
    .config(['$routeProvider',
    function ($routeProvider) {
        // This will be used to delay the loading of the search config until the options are all resolved; the result is
        // injected to the SearchController.
        var optionsResolve = ['ngObibaMicaSearch', function (ngObibaMicaSearch) {
                return ngObibaMicaSearch.getOptionsAsyn();
            }];
        $routeProvider
            .when('/search', {
            templateUrl: 'search/views/search-layout.html',
            controller: 'SearchController',
            reloadOnSearch: false,
            resolve: {
                options: optionsResolve
            }
        })
            .when('/classifications', {
            templateUrl: 'search/views/classifications.html',
            controller: 'SearchController',
            reloadOnSearch: false,
            resolve: {
                options: optionsResolve
            }
        });
    }]);
//# sourceMappingURL=search-router.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
/* global BUCKET_TYPES  */
var CoverageGroupByService = /** @class */ (function () {
    function CoverageGroupByService(ngObibaMicaSearch) {
        this.options = ngObibaMicaSearch.getOptions();
        this.groupByOptions = this.options.coverage.groupBy;
    }
    CoverageGroupByService.prototype.isSingleStudy = function () {
        // coverage => there are datasets and at least one study
        // not showing study means that there is only one
        return !this.options.studies.showSearchTab;
    };
    CoverageGroupByService.prototype.canShowStudyType = function () {
        // showing study type column means that there are several
        return this.options.studies.studiesColumn.showStudiesTypeColumn;
    };
    CoverageGroupByService.prototype.canShowStudy = function () {
        return this.groupByOptions.study || this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDce = function (bucket) {
        return (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1)
            && this.groupByOptions.study && this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDataset = function () {
        return this.groupByOptions.dataset;
    };
    CoverageGroupByService.prototype.canShowVariableTypeFilter = function (bucket) {
        var forStudy = (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1) && (this.groupByOptions.study);
        var forDataset = bucket.indexOf("dataset") > -1 && this.groupByOptions.dataset;
        return forStudy || forDataset;
    };
    CoverageGroupByService.prototype.studyTitle = function () {
        return "search.coverage-buckets.study";
    };
    CoverageGroupByService.prototype.studyBucket = function () {
        return BUCKET_TYPES.STUDY;
    };
    CoverageGroupByService.prototype.dceBucket = function () {
        if (this.groupByOptions.study && this.groupByOptions.dce) {
            return BUCKET_TYPES.DCE;
        }
        else {
            return this.studyBucket();
        }
    };
    CoverageGroupByService.prototype.datasetTitle = function () {
        return "search.coverage-buckets.dataset";
    };
    CoverageGroupByService.prototype.datasetBucket = function () {
        return BUCKET_TYPES.DATASET;
    };
    CoverageGroupByService.prototype.canGroupBy = function (bucket) {
        var isAllowed = false;
        switch (bucket) {
            case BUCKET_TYPES.STUDY:
            case BUCKET_TYPES.STUDY_INDIVIDUAL:
            case BUCKET_TYPES.STUDY_HARMONIZATION:
                isAllowed = this.groupByOptions.study;
                break;
            case BUCKET_TYPES.DCE:
            case BUCKET_TYPES.DCE_INDIVIDUAL:
            case BUCKET_TYPES.DCE_HARMONIZATION:
                isAllowed = this.groupByOptions.dce;
                break;
            case BUCKET_TYPES.DATASET:
            case BUCKET_TYPES.DATASET_COLLECTED:
            case BUCKET_TYPES.DATASCHEMA:
            case BUCKET_TYPES.DATASET_HARMONIZED:
                isAllowed = this.groupByOptions.dataset;
        }
        return isAllowed;
    };
    CoverageGroupByService.prototype.defaultBucket = function () {
        if (this.groupByOptions.study) {
            if (this.options.studies.showSearchTab) {
                return this.studyBucket();
            }
            else {
                return this.dceBucket();
            }
        }
        else if (this.groupByOptions.dataset) {
            return this.datasetBucket();
        }
        return "";
    };
    return CoverageGroupByService;
}());
ngObibaMica.search.service("CoverageGroupByService", ["ngObibaMicaSearch", CoverageGroupByService]);
//# sourceMappingURL=coverage-group-by-service.js.map
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
(function () {
    function CriteriaNodeCompileService($templateCache, $compile) {
        return {
            compile: function (scope, element, templateUrl) {
                var template = '';
                if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
                    template = angular.element($templateCache.get(templateUrl));
                }
                else {
                    template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
                }
                if (scope.item.rqlQuery.args) {
                    $compile(template)(scope, function (cloned) {
                        element.replaceWith(cloned);
                    });
                }
            }
        };
    }
    ngObibaMica.search.factory('CriteriaNodeCompileService', ['$templateCache', '$compile', CriteriaNodeCompileService]);
})();
//# sourceMappingURL=criteria-node-compile-service.js.map
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
(function () {
    function EntitySuggestionService($rootScope, $location, $translate, DocumentSuggestionResource, RqlQueryService, EntitySuggestionRqlUtilityService, AlertService, ServerErrorUtils) {
        function suggest(entityType, query) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanQuery = obibaUtils.cleanDoubleQuotesLeftUnclosed(query);
            cleanQuery = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanQuery);
            cleanQuery = obibaUtils.cleanSpecialLuceneCharacters(cleanQuery);
            if (entityType && query && cleanQuery.length > 1) {
                return DocumentSuggestionResource.query({ locale: $translate.use(), documentType: entityType, query: cleanQuery })
                    .$promise
                    .then(function (response) {
                    var parsedResponse = Array.isArray(response) ? response : [];
                    for (var i = 0; i < parsedResponse.length; i++) {
                        parsedResponse[i] = obibaUtils.quoteQuery(parsedResponse[i].replace(/\/.*/, ''));
                    }
                    return parsedResponse;
                }, function (response) {
                    AlertService.alert({
                        id: 'SearchController',
                        type: 'danger',
                        msg: ServerErrorUtils.buildMessage(response),
                        delay: 5000
                    });
                });
            }
            else {
                return [];
            }
        }
        function suggestForTargetQuery(entityType, query) {
            var rql = RqlQueryService.parseQuery($location.search().query);
            var targetQuery = RqlQueryService.findTargetQuery(typeToTarget(entityType), rql);
            var classNameQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className');
            if (classNameQuery) {
                query = 'className:' + classNameQuery.args[1] + ' AND (' + query.replace(/\/.*/, '') + ')';
            }
            return suggest(entityType, query);
        }
        function getCurrentSuggestion(target, query) {
            if (query) {
                var targetQuery = RqlQueryService.findTargetQuery(target, query);
                if (targetQuery) {
                    var matchQuery = EntitySuggestionRqlUtilityService
                        .givenFilterQueryGetMatchQuery(EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery));
                    if (matchQuery && matchQuery.args) {
                        if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length === 1) {
                            return matchQuery.args[0][0];
                        }
                        else if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length > 1) {
                            return matchQuery.args[0].join(',');
                        }
                        return matchQuery.args[0].length ? matchQuery.args[0][0] : '';
                    }
                    else {
                        return '';
                    }
                }
            }
            return '';
        }
        function selectSuggestion(target, suggestion, withSpecificFields) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanSuggestion = obibaUtils.cleanDoubleQuotesLeftUnclosed(suggestion);
            cleanSuggestion = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanSuggestion);
            cleanSuggestion = obibaUtils.cleanSpecialLuceneCharacters(cleanSuggestion);
            $rootScope.$new().$emit('ngObibaMicaSearch.searchSuggestion', cleanSuggestion, target, withSpecificFields);
        }
        this.getCurrentSuggestion = getCurrentSuggestion;
        this.suggest = suggest;
        this.selectSuggestion = selectSuggestion;
        this.suggestForTargetQuery = suggestForTargetQuery;
    }
    function EntitySuggestionRqlUtilityService() {
        function createMatchQueryArgs(suggestion, filterFields) {
            var args = [];
            args.push([suggestion]);
            // add filterFields
            if (Array.isArray(filterFields)) {
                args.push(filterFields);
            }
            else if (filterFields) {
                args.push([filterFields]);
            }
            return args;
        }
        function createMatchQuery(suggestion, filterFields) {
            var matchQuery = null;
            var trimmedSuggestion = suggestion.trim();
            if (trimmedSuggestion.length) {
                // add filter as match criteria
                matchQuery = new RqlQuery(RQL_NODE.MATCH);
                matchQuery.args = createMatchQueryArgs(trimmedSuggestion, filterFields);
            }
            return matchQuery;
        }
        function givenTargetQueryGetFilterQuery(targetQuery) {
            if (!targetQuery) {
                return null;
            }
            return targetQuery.args.filter(function (arg) { return arg.name === RQL_NODE.FILTER; }).pop();
        }
        function givenFilterQueryGetMatchQuery(filterQuery) {
            if (!filterQuery) {
                return null;
            }
            return filterQuery.args.filter(function (arg) { return arg.name === RQL_NODE.MATCH; }).pop();
        }
        // use when suggestion is empty or null
        function removeFilteredMatchQueryFromTargetQuery(targetQuery) {
            var filterQuery = givenTargetQueryGetFilterQuery(targetQuery);
            if (!filterQuery) {
                return;
            }
            if (filterQuery.args.length === 1 && filterQuery.args[0].name === RQL_NODE.MATCH) {
                targetQuery.args = targetQuery.args.filter(function (arg) {
                    return arg.name !== RQL_NODE.FILTER;
                });
            }
            else {
                filterQuery.args = filterQuery.args.filter(function (arg) {
                    return arg.name !== RQL_NODE.MATCH;
                });
            }
        }
        this.createMatchQuery = createMatchQuery;
        this.givenTargetQueryGetFilterQuery = givenTargetQueryGetFilterQuery;
        this.givenFilterQueryGetMatchQuery = givenFilterQueryGetMatchQuery;
        this.removeFilteredMatchQueryFromTargetQuery = removeFilteredMatchQueryFromTargetQuery;
    }
    ngObibaMica.search.service('EntitySuggestionRqlUtilityService', EntitySuggestionRqlUtilityService);
    ngObibaMica.search
        .service('EntitySuggestionService', [
        '$rootScope',
        '$location',
        '$translate',
        'DocumentSuggestionResource',
        'RqlQueryService', 'EntitySuggestionRqlUtilityService',
        'AlertService',
        'ServerErrorUtils',
        EntitySuggestionService
    ]);
})();
//# sourceMappingURL=entity-suggestion-service.js.map
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
(function () {
    function FullScreenService($document, $window, $rootScope) {
        // based on: https://github.com/fabiobiondi/angular-fullscreen
        var document = $document[0];
        var isKeyboardAvailbleOnFullScreen = (typeof $window.Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in $window.Element) && $window.Element.ALLOW_KEYBOARD_INPUT;
        var emitter = $rootScope.$new();
        var serviceInstance = {
            $on: angular.bind(emitter, emitter.$on),
            enable: function (element) {
                if (element.requestFullScreen) {
                    element.requestFullScreen();
                }
                else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                }
                else if (element.webkitRequestFullscreen) {
                    // Safari temporary fix
                    if (/Version\/[\d]{1,2}(\.[\d]{1,2}){1}(\.(\d){1,2}){0,1} Safari/.test($window.navigator.userAgent)) {
                        element.webkitRequestFullscreen();
                    }
                    else {
                        element.webkitRequestFullscreen(isKeyboardAvailbleOnFullScreen);
                    }
                }
                else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            },
            cancel: function () {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },
            isEnabled: function () {
                var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                return fullscreenElement ? true : false;
            }
        };
        $document.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function () {
            emitter.$emit('ngObibaMicaSearch.fullscreenChange', serviceInstance.isEnabled());
        });
        return serviceInstance;
    }
    ngObibaMica.search.factory('FullScreenService', ['$document', '$window', '$rootScope', FullScreenService]);
})();
//# sourceMappingURL=full-screen-service.js.map
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
(function () {
    function MetaTaxonomyService($q, $translate, TaxonomyResource, ngObibaMicaSearch) {
        var taxonomyPanelOptions = ngObibaMicaSearch.getOptions().taxonomyPanelOptions, parser = new ngObibaMica.search.MetaTaxonomyParser(taxonomyPanelOptions);
        /**
         * Returns the taxonomy of taxonomy
         * @returns {*}
         */
        function getMetaTaxonomies() {
            return TaxonomyResource.get({
                target: QUERY_TARGETS.TAXONOMY,
                taxonomy: 'Mica_taxonomy'
            }).$promise;
        }
        /**
         * @param targets [variable, study, ...]
         * @returns parsed list of taxonomies each item having an info object and a list of taxonomies
         */
        function getMetaTaxonomyForTargets(targets) {
            var deferred = $q.defer();
            getMetaTaxonomies().then(function (metaTaxonomy) {
                var metaVocabularies = (metaTaxonomy.vocabularies || []).filter(function (vocabulary) {
                    return targets.indexOf(vocabulary.name) > -1;
                });
                var taxonomies = metaVocabularies.map(function (vocabulary) {
                    switch (vocabulary.name) {
                        case QUERY_TARGETS.VARIABLE:
                            return parser.parseVariableTaxonomies(vocabulary);
                        case QUERY_TARGETS.NETWORK:
                        case QUERY_TARGETS.STUDY:
                        case QUERY_TARGETS.DATASET:
                            return parser.parseEntityTaxonomies(vocabulary);
                    }
                });
                taxonomies.sort(function (a, b) {
                    return targets.indexOf(a.name) - targets.indexOf(b.name);
                });
                deferred.resolve(taxonomies || []);
            });
            return deferred.promise;
        }
        /**
         * Return taxonomy panel options
         * @returns {taxonomyPanelOptions|{network, study, dataset, variable}}
         */
        function getTaxonomyPanelOptions() {
            return taxonomyPanelOptions;
        }
        // exported functions
        this.getTaxonomyPanelOptions = getTaxonomyPanelOptions;
        this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
        this.getMetaTaxonomiesPromise = getMetaTaxonomies;
    }
    ngObibaMica.search
        .service('MetaTaxonomyService', [
        '$q',
        '$translate',
        'TaxonomyResource',
        'ngObibaMicaSearch',
        MetaTaxonomyService
    ]);
})();
//# sourceMappingURL=meta-taxonomy-service.js.map
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
(function () {
    function ObibaSearchConfig() {
        var options = {
            networks: {
                showSearchTab: 1
            },
            studies: {
                showSearchTab: 1
            },
            datasets: {
                showSearchTab: 1
            },
            variables: {
                showSearchTab: 1
            }
        };
        this.setOptions = function (newOptions) {
            if (typeof (newOptions) === 'object') {
                Object.keys(newOptions).forEach(function (option) {
                    if (option in options) {
                        options[option] = newOptions[option];
                    }
                });
            }
        };
        this.getOptions = function () {
            return angular.copy(options);
        };
    }
    ngObibaMica.search.service('ObibaSearchConfig', ObibaSearchConfig);
})();
//# sourceMappingURL=obiba-search-config.js.map
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
(function () {
    function PageUrlService(ngObibaMicaUrl, StringUtils, urlEncode) {
        this.studyPage = function (id, type) {
            var sType = (type.toLowerCase().indexOf('individual') > -1 ? 'individual' : 'harmonization') + '-study';
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPage'), { ':type': urlEncode(sType), ':study': urlEncode(id) }) : '';
        };
        this.studyPopulationPage = function (id, type, populationId) {
            var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPopulationsPage'), { ':type': urlEncode(sType), ':study': urlEncode(id), ':population': urlEncode(populationId) }) : '';
        };
        this.networkPage = function (id) {
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('NetworkPage'), { ':network': urlEncode(id) }) : '';
        };
        this.datasetPage = function (id, type) {
            var dsType = (type.toLowerCase() === 'collected' ? 'collected' : 'harmonized') + '-dataset';
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('DatasetPage'), { ':type': urlEncode(dsType), ':dataset': urlEncode(id) }) : '';
        };
        this.variablePage = function (id) {
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('VariablePage'), { ':variable': urlEncode(id) }) : '';
        };
        this.downloadList = function (type, query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQuerySearchCsvResource'), { ':type': type, ':query': query });
        };
        this.downloadCoverage = function (query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQueryCoverageDownloadResource'), { ':query': query });
        };
        this.entitiesCountPage = function (query) {
            var url = ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('EntitiesCountBaseUrl');
            if (query) {
                url = url + '?query=' + urlEncode(query);
            }
            return url;
        };
        this.searchPage = function (query) {
            var url = ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('SearchBaseUrl');
            if (query) {
                url = url + '?query=' + urlEncode(query);
            }
            return url;
        };
        return this;
    }
    ngObibaMica.search.service('PageUrlService', ['ngObibaMicaUrl', 'StringUtils', 'urlEncode', PageUrlService]);
})();
//# sourceMappingURL=page-url-service.js.map
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
(function () {
    function PaginationService(ngObibaMicaSearch) {
        var listeners = {};
        var states = Object.keys(QUERY_TARGETS).reduce(function (acc, key) {
            if (null === /TAXONOMY/.exec(key)) {
                var target = QUERY_TARGETS[key];
                acc[target] = new ngObibaMica.search.PaginationState(target, ngObibaMicaSearch.getDefaultListPageSize(target));
            }
            return acc;
        }, {});
        function update(pagination, results) {
            var preventPaginationEvent = false;
            var target;
            for (target in states) {
                var state = states[target];
                var hits = results[target + 'TotalCount'].hits || 0;
                var targetPagination = pagination[target];
                var totalHitsChanged = state.totalHitsChanged(hits);
                preventPaginationEvent = preventPaginationEvent || totalHitsChanged;
                state.update(targetPagination, hits);
            }
            for (target in states) {
                if (listeners[target]) {
                    listeners[target].onUpdate(states[target].data(), preventPaginationEvent);
                }
            }
        }
        function registerListener(target, listener) {
            if (listener) {
                if (!listener.onUpdate) {
                    throw new Error('PaginationService::registerListener() - listener must implement onUpdate()');
                }
                listeners[target] = listener;
            }
        }
        this.registerListener = registerListener;
        this.update = update;
    }
    ngObibaMica.search.service('PaginationService', ['ngObibaMicaSearch', PaginationService]);
})();
//# sourceMappingURL=pagination-service.js.map
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
/* global DISPLAY_TYPES */
/* global CriteriaItem */
/* global CriteriaItemBuilder */
/* global CriteriaBuilder */
/* exported QUERY_TYPES */
var QUERY_TYPES = {
    NETWORKS: 'networks',
    STUDIES: 'studies',
    DATASETS: 'datasets',
    VARIABLES: 'variables'
};
/* exported QUERY_TARGETS */
var QUERY_TARGETS = {
    NETWORK: 'network',
    STUDY: 'study',
    DATASET: 'dataset',
    VARIABLE: 'variable',
    TAXONOMY: 'taxonomy'
};
/* exported BUCKET_TYPES */
var BUCKET_TYPES = {
    NETWORK: 'network',
    STUDY: 'study',
    STUDY_INDIVIDUAL: 'study-individual',
    STUDY_HARMONIZATION: 'study-harmonization',
    DCE: 'dce',
    DCE_INDIVIDUAL: 'dce-individual',
    DCE_HARMONIZATION: 'dce-harmonization',
    DATASET: 'dataset',
    DATASET_COLLECTED: 'dataset-collected',
    DATASET_HARMONIZED: 'dataset-harmonized',
    DATASCHEMA: 'dataschema'
};
/* exported RQL_NODE */
var RQL_NODE = {
    // target nodes
    VARIABLE: 'variable',
    DATASET: 'dataset',
    STUDY: 'study',
    NETWORK: 'network',
    /* target children */
    LIMIT: 'limit',
    SORT: 'sort',
    AND: 'and',
    NAND: 'nand',
    OR: 'or',
    NOR: 'nor',
    NOT: 'not',
    FACET: 'facet',
    LOCALE: 'locale',
    AGGREGATE: 'aggregate',
    BUCKET: 'bucket',
    FIELDS: 'fields',
    FILTER: 'filter',
    /* leaf criteria nodes */
    CONTAINS: 'contains',
    IN: 'in',
    OUT: 'out',
    EQ: 'eq',
    GT: 'gt',
    GE: 'ge',
    LT: 'lt',
    LE: 'le',
    BETWEEN: 'between',
    MATCH: 'match',
    EXISTS: 'exists',
    MISSING: 'missing'
};
/* exported SORT_FIELDS */
var SORT_FIELDS = {
    ACRONYM: 'acronym',
    NAME: 'name',
    CONTAINER_ID: 'containerId',
    POPULATION_WEIGHT: 'populationWeight',
    DATA_COLLECTION_EVENT_WEIGHT: 'dataCollectionEventWeight',
    POPULATION_ID: 'populationId',
    DATASET_ID: 'datasetId',
    VARIABLE_TYPE: 'variableType',
    INDEX: 'index',
    STUDY_TABLE: {
        POPULATION_WEIGHT: 'studyTable.populationWeight',
        DATA_COLLECTION_EVENT_WEIGHT: 'studyTable.dataCollectionEventWeight',
        STUDY_ID: 'studyTable.studyId',
        POPULATION_ID: 'studyTable.populationId'
    }
};
/* exported targetToType */
function targetToType(target) {
    switch (target.toLocaleString()) {
        case QUERY_TARGETS.NETWORK:
            return QUERY_TYPES.NETWORKS;
        case QUERY_TARGETS.STUDY:
            return QUERY_TYPES.STUDIES;
        case QUERY_TARGETS.DATASET:
            return QUERY_TYPES.DATASETS;
        case QUERY_TARGETS.VARIABLE:
            return QUERY_TYPES.VARIABLES;
    }
    throw new Error('Invalid target: ' + target);
}
/* exported targetToType */
function typeToTarget(type) {
    switch (type.toLocaleString()) {
        case QUERY_TYPES.NETWORKS:
            return QUERY_TARGETS.NETWORK;
        case QUERY_TYPES.STUDIES:
            return QUERY_TARGETS.STUDY;
        case QUERY_TYPES.DATASETS:
            return QUERY_TARGETS.DATASET;
        case QUERY_TYPES.VARIABLES:
            return QUERY_TARGETS.VARIABLE;
    }
    throw new Error('Invalid type: ' + type);
}
(function () {
    function RqlQueryService($q, $log, TaxonomiesResource, TaxonomyResource, LocalizedValues, VocabularyService, RqlQueryUtils, ngObibaMicaSearch, SetService) {
        var taxonomiesCache = {
            variable: null,
            dataset: null,
            study: null,
            network: null
        };
        var self = this;
        var searchOptions = ngObibaMicaSearch.getOptions();
        this.findItemNodeById = function (root, targetId, result, strict) {
            var splitTagetId = targetId.split('.');
            if (root && root.children && result) {
                return root.children.some(function (child) {
                    if (strict ? targetId === child.id : (child.id && child.id.split('.').reduce(function (acc, val) { return acc && splitTagetId.indexOf(val) > -1; }, true))) {
                        result.item = child;
                        return true;
                    }
                    return self.findItemNodeById(child, targetId, result, strict);
                });
            }
            return false;
        };
        this.findItemNode = function (root, item, result) {
            return self.findItemNodeById(root, item.id, result);
        };
        function findTargetCriteria(target, rootCriteria) {
            return rootCriteria.children.filter(function (child) {
                return child.target === target;
            }).pop();
        }
        function findCriteriaItemFromTreeById(target, targetId, rootCriteria, strict) {
            var targetItem = findTargetCriteria(target, rootCriteria);
            var result = {};
            if (self.findItemNodeById(targetItem, targetId, result, strict)) {
                return result.item;
            }
            return null;
        }
        function findCriteriaItemFromTree(item, rootCriteria) {
            var targetItem = findTargetCriteria(item.target, rootCriteria);
            var result = {};
            if (self.findItemNode(targetItem, item, result)) {
                return result.item;
            }
            return null;
        }
        function findTargetQuery(target, query) {
            return query.args.filter(function (arg) {
                return arg.name === target;
            }).pop();
        }
        function findQueryInTargetByTaxonomyVocabulary(target, taxonomy, vocabulary) {
            if (!target) {
                return null;
            }
            function search(parent, rx, result) {
                return parent.args.some(function (arg) {
                    if (null !== rx.exec(arg)) {
                        result.parent = parent;
                        return true;
                    }
                    if (arg instanceof RqlQuery) {
                        return search(arg, rx, result);
                    }
                    return false;
                });
            }
            var result = {};
            search(target, new RegExp((taxonomy ? taxonomy : '') + '\\.' + vocabulary + '$'), result);
            return result.parent;
        }
        function findQueryInTargetByVocabulary(target, vocabulary) {
            return findQueryInTargetByTaxonomyVocabulary(target, null, vocabulary);
        }
        function getSourceFields(context, target) {
            switch (context) {
                case DISPLAY_TYPES.LIST:
                    switch (target) {
                        case QUERY_TARGETS.STUDY:
                            return RqlQueryUtils.fields(searchOptions.studies.fields);
                        case QUERY_TARGETS.VARIABLE:
                            return RqlQueryUtils.fields([
                                'attributes.label.*',
                                'variableType',
                                'datasetId',
                                'datasetAcronym'
                            ]);
                        case QUERY_TARGETS.DATASET:
                            return RqlQueryUtils.fields(searchOptions.datasets.fields);
                        case QUERY_TARGETS.NETWORK:
                            return RqlQueryUtils.fields(searchOptions.networks.fields);
                    }
                    break;
            }
            return null;
        }
        function isOperator(name) {
            switch (name) {
                case RQL_NODE.AND:
                case RQL_NODE.NAND:
                case RQL_NODE.OR:
                case RQL_NODE.NOR:
                    return true;
            }
            return false;
        }
        function isTarget(name) {
            switch (name) {
                case RQL_NODE.VARIABLE:
                case RQL_NODE.DATASET:
                case RQL_NODE.NETWORK:
                case RQL_NODE.STUDY:
                    return true;
            }
            return false;
        }
        function isLeaf(name) {
            switch (name) {
                case RQL_NODE.CONTAINS:
                case RQL_NODE.IN:
                case RQL_NODE.OUT:
                case RQL_NODE.EQ:
                case RQL_NODE.GT:
                case RQL_NODE.GE:
                case RQL_NODE.LT:
                case RQL_NODE.LE:
                case RQL_NODE.BETWEEN:
                case RQL_NODE.MATCH:
                case RQL_NODE.EXISTS:
                case RQL_NODE.MISSING:
                    return true;
            }
            return false;
        }
        function isLeafCriteria(item) {
            return isLeaf(item.type);
        }
        function deleteNode(item) {
            var parent = item.parent;
            var query = item.rqlQuery;
            var queryArgs = query.args;
            var parentQuery = item.parent.rqlQuery;
            var index = parentQuery.args.indexOf(query);
            var indexChild = parent.children.indexOf(item);
            if (index === -1 || indexChild === -1) {
                throw new Error('Criteria node not found: ' + item);
            }
            parent.children.splice(indexChild, 1);
            item.children.forEach(function (c) {
                c.parent = parent;
            });
            parent.children.splice.apply(parent.children, [indexChild, 0].concat(item.children));
            parentQuery.args.splice(index, 1);
            if (queryArgs) {
                if (queryArgs instanceof Array) {
                    parentQuery.args.splice.apply(parentQuery.args, [index, 0].concat(queryArgs));
                }
                else {
                    parentQuery.args.splice(index, 0, queryArgs);
                }
            }
            if (parent.parent !== null && parentQuery.args.length === 0) {
                deleteNode(parent);
            }
        }
        function deleteNodeCriteriaWithOrphans(item) {
            var parent = item.parent;
            var query = item.rqlQuery;
            var queryArgs = query.args;
            var parentQuery = item.parent.rqlQuery;
            var index = parentQuery.args.indexOf(query);
            var indexChild = parent.children.indexOf(item);
            if (index === -1 || indexChild === -1) {
                throw new Error('Criteria node not found: ' + item);
            }
            parent.children.splice(indexChild, 1);
            item.children.forEach(function (c) {
                c.parent = parent;
            });
            parent.children.splice.apply(parent.children, [indexChild, 0].concat(item.children));
            parentQuery.args.splice(index, 1);
            if (queryArgs) {
                if (queryArgs instanceof Array) {
                    parentQuery.args.splice.apply(parentQuery.args, [index, 0].concat(queryArgs));
                }
                else {
                    parentQuery.args.splice(index, 0, queryArgs);
                }
            }
            if (parentQuery.args.length === 0) {
                deleteNode(parent);
            }
        }
        function deleteLeafCriteria(item) {
            var parent = item.parent;
            if (!parent) {
                throw new Error('Cannot remove criteria when parent is NULL');
            }
            var query = item.rqlQuery;
            var parentQuery = item.parent.rqlQuery;
            var index = parentQuery.args.indexOf(query);
            if (index === -1) {
                throw new Error('Criteria node not found: ' + item);
            }
            parentQuery.args.splice(index, 1);
            if ([RQL_NODE.OR, RQL_NODE.AND, RQL_NODE.NAND, RQL_NODE.NOR].indexOf(parent.type) !== -1) {
                deleteNodeCriteriaWithOrphans(parent);
            }
            else if (parentQuery.args.length === 0) {
                deleteNode(parent);
            }
        }
        /**
         * NOTE: once the FreeTextMatch has a UI this is no longer needed.
         *
         * @param query
         * @returns boolean if target has more than a FreeTextMatch
         */
        function queryHasCriteria(query) {
            if (query && query.args) {
                var leafQueries = query.args.filter(function (arg) {
                    return isLeaf(arg.name) || isOperator(arg.name);
                });
                if (leafQueries.length === 1 && RqlQueryUtils.isFreeTextMatch(leafQueries[0])) {
                    return false;
                }
                return leafQueries.length > 0;
            }
            return false;
        }
        function getRenderableTargetCriteria(targets) {
            return (targets || []).filter(function (target) {
                return queryHasCriteria(target.rqlQuery);
            });
        }
        function getRenderableTargetCriteriaFromRoot(rootCriteria) {
            return rootCriteria ?
                getRenderableTargetCriteria(rootCriteria.children) :
                [];
        }
        this.getRenderableTargetCriteria = getRenderableTargetCriteria;
        this.getRenderableTargetCriteriaFromRoot = getRenderableTargetCriteriaFromRoot;
        this.parseQuery = function (query) {
            try {
                return new RqlParser().parse(query);
            }
            catch (e) {
                $log.error(e.message);
            }
            return new RqlQuery();
        };
        /**
         * Removes the item from criteria item tree. This should be from a leaf.
         * @param item
         */
        this.removeCriteriaItem = function (item) {
            if (isLeafCriteria(item)) {
                deleteLeafCriteria(item);
            }
            else {
                deleteNode(item);
            }
        };
        /**
         * Creates a criteria item
         * @param target
         * @param taxonomy
         * @param vocabulary
         * @param term
         * @param lang
         * @returns A criteria item
         */
        this.createCriteriaItem = function (target, taxonomy, vocabulary, term, lang) {
            function createBuilder(taxonomy, vocabulary, term) {
                return new CriteriaItemBuilder(LocalizedValues, lang, SetService)
                    .target(target)
                    .taxonomy(taxonomy)
                    .vocabulary(vocabulary)
                    .term(term);
            }
            if (angular.isString(taxonomy)) {
                return TaxonomyResource.get({
                    target: target,
                    taxonomy: taxonomy
                }).$promise.then(function (taxonomy) {
                    vocabulary = taxonomy.vocabularies.filter(function (v) {
                        return v.name === vocabulary || VocabularyService.vocabularyAlias(v) === vocabulary;
                    })[0];
                    term = vocabulary && vocabulary.terms ?
                        vocabulary.terms.filter(function (t) { return t.name === term; })[0] :
                        null;
                    return createBuilder(taxonomy, vocabulary, term).build();
                });
            }
            return createBuilder(taxonomy, vocabulary, term).build();
        };
        /**
         * Adds new item to the item tree
         *
         * @param rootItem
         * @param item
         */
        this.addCriteriaItem = function (rootRql, newItem, logicalOp) {
            var target = rootRql.args.filter(function (query) {
                return newItem.target === query.name;
            }).pop();
            if (!target) {
                target = new RqlQuery(RQL_NODE[newItem.target.toUpperCase()]);
                rootRql.args.push(target);
            }
            var rqlQuery = newItem.rqlQuery ? newItem.rqlQuery : RqlQueryUtils.buildRqlQuery(newItem);
            return RqlQueryUtils.addQuery(target, rqlQuery, logicalOp);
        };
        /**
         * Update an existing item to the item tree
         *
         * @param rootItem
         * @param item
         */
        this.updateCriteriaItem = function (existingItem, newItem, replace) {
            var newTerms;
            var isRepeatable = existingItem.isRepeatable();
            var isMatchNode = !isRepeatable && existingItem.rqlQuery.name === RQL_NODE.MATCH;
            function updateItemForExistsQuery() {
                existingItem = isRepeatable ? existingItem.first() : existingItem;
                existingItem.rqlQuery.name = RQL_NODE.EXISTS;
                existingItem.rqlQuery.args.splice(1, 1);
            }
            if (newItem.rqlQuery && RQL_NODE.EXISTS === newItem.rqlQuery.name) {
                updateItemForExistsQuery();
            }
            else {
                if (replace && newItem.rqlQuery) {
                    existingItem.rqlQuery.name = newItem.rqlQuery.name;
                }
                if (newItem.rqlQuery) {
                    newTerms = newItem.rqlQuery.args[isMatchNode ? 0 : 1];
                }
                else if (newItem.term) {
                    newTerms = [newItem.term.name];
                }
                else {
                    updateItemForExistsQuery();
                }
                if (newTerms) {
                    if (isRepeatable) {
                        RqlQueryUtils.updateRepeatableQueryArgValues(existingItem, newTerms);
                    }
                    else {
                        RqlQueryUtils.updateQueryArgValues(existingItem.rqlQuery, newTerms, replace);
                    }
                }
            }
        };
        this.getTaxonomyByTarget = function (target) {
            var deferred = $q.defer();
            var taxonomy = taxonomiesCache[target];
            if (taxonomy) {
                deferred.resolve(taxonomy);
            }
            else {
                TaxonomiesResource.get({
                    target: target
                }).$promise.then(function (response) {
                    taxonomiesCache[target] = response;
                    deferred.resolve(response);
                });
            }
            return deferred.promise;
        };
        /**
         * Builders registry
         *
         * @type {{variable: builders.variable, study: builders.study}}
         */
        this.builders = function (target, rootRql, rootItem, lang) {
            var deferred = $q.defer();
            function build(rootRql, rootItem) {
                var builder = new CriteriaBuilder(rootRql, rootItem, taxonomiesCache[target], LocalizedValues, lang, SetService);
                builder.initialize(target);
                builder.build();
                deferred.resolve({ root: builder.getRootItem(), map: builder.getLeafItemMap() });
            }
            self.getTaxonomyByTarget(target).then(function () {
                build(rootRql, rootItem);
            });
            return deferred.promise;
        };
        /**
         * Builds the criteria tree
         *
         * @param rootRql
         * @param lang
         * @returns {*}
         */
        this.createCriteria = function (rootRql, lang) {
            var deferred = $q.defer();
            var rootItem = new CriteriaItemBuilder().type(RQL_NODE.AND).rqlQuery(rootRql).build();
            var leafItemMap = {};
            if (!RqlQueryUtils.hasTargetQuery(rootRql)) {
                deferred.resolve({ root: rootItem, map: leafItemMap });
                return deferred.promise;
            }
            var queries = [];
            var self = this;
            var resolvedCount = 0;
            rootRql.args.forEach(function (node) {
                if (QUERY_TARGETS[node.name.toUpperCase()]) {
                    queries.push(node);
                }
            });
            queries.forEach(function (node) {
                self.builders(node.name, node, rootItem, lang).then(function (result) {
                    rootItem.children.push(result.root);
                    leafItemMap = angular.extend(leafItemMap, result.map);
                    resolvedCount++;
                    if (resolvedCount === queries.length) {
                        deferred.resolve({ root: rootItem, map: leafItemMap });
                    }
                });
            });
            return deferred.promise;
        };
        /**
         * Append the aggregate and facet for criteria term listing.
         *
         * @param query
         * @param item
         * @param lang
         * @returns the new query
         */
        this.prepareCriteriaTermsQuery = function (query, item, lang) {
            function iterReplaceQuery(query, criteriaId, newQuery) {
                if (!query || !query.args) {
                    return null;
                }
                if ((query.name === RQL_NODE.IN || query.name === RQL_NODE.MISSING || query.name === RQL_NODE.CONTAINS) && query.args[0] === criteriaId) {
                    return query;
                }
                for (var i = query.args.length; i--;) {
                    var res = iterReplaceQuery(query.args[i], criteriaId, newQuery);
                    if (res) {
                        query.args[i] = newQuery;
                    }
                }
            }
            var parsedQuery = this.parseQuery(query);
            var targetQuery = parsedQuery.args.filter(function (node) {
                return node.name === item.target;
            }).pop();
            if (targetQuery) {
                var anyQuery = new RqlQuery(RQL_NODE.EXISTS), criteriaId = RqlQueryUtils.criteriaId(item.taxonomy, item.vocabulary);
                anyQuery.args.push(criteriaId);
                iterReplaceQuery(targetQuery, criteriaId, anyQuery);
                targetQuery.args.push(RqlQueryUtils.aggregate([criteriaId]));
                targetQuery.args.push(RqlQueryUtils.limit(0, 0));
            }
            parsedQuery.args.push(new RqlQuery(RQL_NODE.FACET));
            if (lang) {
                RqlQueryUtils.addLocaleQuery(parsedQuery, lang);
            }
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.getTargetQuerySort = function (type, query) {
            var target = typeToTarget(type);
            var targetQuery = findTargetQuery(target, query);
            var sort = null;
            if (targetQuery) {
                sort = targetQuery.args.filter(function (arg) {
                    return arg.name === RQL_NODE.SORT;
                }).pop();
            }
            return sort;
        };
        function prepareSearchQueryInternal(context, type, query, lang, sort, addFieldsQuery) {
            var rqlQuery = angular.copy(query);
            var target = typeToTarget(type);
            RqlQueryUtils.addLocaleQuery(rqlQuery, lang);
            var targetQuery = findTargetQuery(target, rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(target);
                rqlQuery.args.push(targetQuery);
            }
            var limitQuery = RqlQueryUtils.getLimitQuery(targetQuery);
            if (!limitQuery) {
                RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, ngObibaMicaSearch.getDefaultListPageSize(target)));
            }
            if (addFieldsQuery) {
                var fieldsQuery = getSourceFields(context, target);
                if (fieldsQuery) {
                    RqlQueryUtils.addFields(targetQuery, fieldsQuery);
                }
            }
            if (sort) {
                RqlQueryUtils.addSort(targetQuery, sort);
            }
            return rqlQuery;
        }
        function prepareQueryPagination(rqlQuery, target, from, size) {
            var targetQuery = findTargetQuery(target, rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(target);
                rqlQuery.args.push(targetQuery);
            }
            RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(from, size));
        }
        function getQueryPaginations(rqlQuery) {
            if (!rqlQuery || rqlQuery.args.length === 0) {
                return {};
            }
            return rqlQuery.args.reduce(function (acc, query) {
                if (isTarget(query.name)) {
                    var limitQuery = RqlQueryUtils.getLimitQuery(query);
                    if (limitQuery) {
                        acc[query.name] = { from: limitQuery.args[0], size: limitQuery.args[1] };
                    }
                }
                return acc;
            }, {});
        }
        this.isOperator = isOperator;
        this.isLeaf = isLeaf;
        this.getQueryPaginations = getQueryPaginations;
        this.prepareQueryPagination = prepareQueryPagination;
        this.findCriteriaItemFromTreeById = findCriteriaItemFromTreeById;
        this.findCriteriaItemFromTree = findCriteriaItemFromTree;
        this.findTargetCriteria = findTargetCriteria;
        this.findTargetQuery = findTargetQuery;
        this.findQueryInTargetByVocabulary = findQueryInTargetByVocabulary;
        this.findQueryInTargetByTaxonomyVocabulary = findQueryInTargetByTaxonomyVocabulary;
        this.prepareSearchQuery = function (context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, true);
        };
        this.prepareSearchQueryNoFields = function (context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, false);
        };
        this.prepareSearchQueryAndSerialize = function (context, type, query, lang, sort) {
            return new RqlQuery().serializeArgs(self.prepareSearchQuery(context, type, query, lang, sort).args);
        };
        /**
         * Append the aggregate and bucket operations to the variable.
         *
         * @param query
         * @param bucketArg
         * @returns the new query
         */
        this.prepareCoverageQuery = function (query, bucketArg) {
            var parsedQuery = this.parseQuery(query);
            var aggregate = new RqlQuery('aggregate');
            var bucketField;
            var parts = bucketArg.split('-');
            var groupBy = parts[0];
            var filterBy = parts.length > 1 ? parts[1] : undefined;
            switch (groupBy) {
                case BUCKET_TYPES.NETWORK:
                    bucketField = 'networkId';
                    break;
                case BUCKET_TYPES.STUDY:
                case BUCKET_TYPES.STUDY_INDIVIDUAL:
                case BUCKET_TYPES.STUDY_HARMONIZATION:
                    bucketField = 'studyId';
                    break;
                case BUCKET_TYPES.DCE:
                case BUCKET_TYPES.DCE_INDIVIDUAL:
                    bucketField = 'dceId';
                    break;
                case BUCKET_TYPES.DATASCHEMA:
                case BUCKET_TYPES.DATASET:
                case BUCKET_TYPES.DATASET_COLLECTED:
                case BUCKET_TYPES.DATASET_HARMONIZED:
                    bucketField = 'datasetId';
                    break;
            }
            var bucket = new RqlQuery('bucket');
            bucket.args.push(bucketField);
            aggregate.args.push(bucket);
            // variable RQL
            var variable;
            parsedQuery.args.forEach(function (arg) {
                if (!variable && arg.name === 'variable') {
                    variable = arg;
                }
            });
            if (!variable) {
                variable = new RqlQuery('variable');
                parsedQuery.args.push(variable);
            }
            if (variable.args.length > 0 && variable.args[0].name !== 'limit') {
                var variableType = new RqlQuery('in');
                variableType.args.push('Mica_variable.variableType');
                if (filterBy === undefined) {
                    if (bucketArg === BUCKET_TYPES.DATASET_HARMONIZED || bucketArg === BUCKET_TYPES.DATASCHEMA) {
                        variableType.args.push('Dataschema');
                    }
                    else {
                        variableType.args.push(['Collected', 'Dataschema']);
                    }
                }
                else if (['individual', 'collected'].indexOf(filterBy) > -1) {
                    variableType.args.push('Collected');
                }
                else if (['harmonization', 'harmonized'].indexOf(filterBy) > -1) {
                    variableType.args.push('Dataschema');
                }
                var andVariableType = new RqlQuery('and');
                andVariableType.args.push(variableType);
                andVariableType.args.push(variable.args[0]);
                variable.args[0] = andVariableType;
            }
            variable.args.push(aggregate);
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.prepareGraphicsQuery = function (query, aggregateArgs, bucketArgs) {
            var parsedQuery = this.parseQuery(query);
            // aggregate
            var aggregate = new RqlQuery(RQL_NODE.AGGREGATE);
            aggregateArgs.forEach(function (a) {
                aggregate.args.push(a);
            });
            //bucket
            if (bucketArgs && bucketArgs.length > 0) {
                var bucket = new RqlQuery(RQL_NODE.BUCKET);
                bucketArgs.forEach(function (b) {
                    bucket.args.push(b);
                });
                aggregate.args.push(bucket);
            }
            // study
            var study;
            var hasQuery = false;
            var hasStudyTarget = false;
            parsedQuery.args.forEach(function (arg) {
                if (arg.name === 'study') {
                    hasStudyTarget = true;
                    var limitIndex = null;
                    hasQuery = arg.args.filter(function (requestArg, index) {
                        if (requestArg.name === 'limit') {
                            limitIndex = index;
                        }
                        return ['limit', 'sort', 'aggregate'].indexOf(requestArg.name) < 0;
                    }).length;
                    if (limitIndex !== null) {
                        arg.args.splice(limitIndex, 1);
                    }
                    study = arg;
                }
            });
            // Study match all if no study query.
            if (!hasStudyTarget) {
                study = new RqlQuery('study');
                parsedQuery.args.push(study);
            }
            if (!hasQuery) {
                study.args.push(new RqlQuery(RQL_NODE.MATCH));
            }
            study.args.push(aggregate);
            // facet
            parsedQuery.args.push(new RqlQuery('facet'));
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.getTargetAggregations = function (joinQueryResponse, criterion, lang) {
            /**
             * Helper to merge the terms that are not in the aggregation list
             *
             * @param aggs
             * @param vocabulary
             * @returns Array of aggs
             */
            function addMissingTerms(aggs, vocabulary) {
                var terms = vocabulary.terms;
                if (terms && terms.length > 0) {
                    var keys = aggs && aggs.map(function (agg) {
                        return agg.key;
                    }) || [];
                    if (aggs) {
                        // Add the missing terms not present in the aggs list
                        var missingTerms = [];
                        terms.forEach(function (term) {
                            if (keys.length === 0 || keys.indexOf(term.name) === -1) {
                                missingTerms.push({
                                    count: 0,
                                    default: 0,
                                    description: LocalizedValues.forLocale(term.description, lang),
                                    key: term.name,
                                    title: LocalizedValues.forLocale(term.title, lang)
                                });
                            }
                        });
                        return aggs.concat(missingTerms);
                    }
                    // The query didn't have any match, return default empty aggs based on the vocabulary terms
                    return terms.map(function (term) {
                        return {
                            count: 0,
                            default: 0,
                            description: LocalizedValues.forLocale(term.description, lang),
                            key: term.name,
                            title: LocalizedValues.forLocale(term.title, lang)
                        };
                    });
                }
                return aggs;
            }
            function getChildAggragations(parentAgg, aggKey) {
                if (parentAgg.children) {
                    var child = parentAgg.children.filter(function (child) {
                        return child.hasOwnProperty(aggKey);
                    }).pop();
                    if (child) {
                        return child[aggKey];
                    }
                }
                return null;
            }
            var alias = VocabularyService.vocabularyAlias(criterion.vocabulary);
            var targetResponse = joinQueryResponse[criterion.target + 'ResultDto'];
            if (targetResponse && targetResponse.aggs) {
                var isProperty = criterion.taxonomy.name.startsWith('Mica_');
                var filter = isProperty ? alias : criterion.taxonomy.name;
                var filteredAgg = targetResponse.aggs.filter(function (agg) {
                    return agg.aggregation === filter;
                }).pop();
                if (filteredAgg) {
                    if (isProperty) {
                        if (VocabularyService.isNumericVocabulary(criterion.vocabulary)) {
                            return filteredAgg['obiba.mica.StatsAggregationResultDto.stats'];
                        }
                        else {
                            return VocabularyService.isRangeVocabulary(criterion.vocabulary) ?
                                addMissingTerms(filteredAgg['obiba.mica.RangeAggregationResultDto.ranges'], criterion.vocabulary) :
                                addMissingTerms(filteredAgg['obiba.mica.TermsAggregationResultDto.terms'], criterion.vocabulary);
                        }
                    }
                    else {
                        var vocabularyAgg = filteredAgg.children.filter(function (agg) {
                            return agg.aggregation === alias;
                        }).pop();
                        if (vocabularyAgg) {
                            return VocabularyService.isRangeVocabulary(criterion.vocabulary) ?
                                addMissingTerms(getChildAggragations(filteredAgg, 'obiba.mica.RangeAggregationResultDto.ranges'), criterion.vocabulary) :
                                addMissingTerms(getChildAggragations(filteredAgg, 'obiba.mica.TermsAggregationResultDto.terms'), criterion.vocabulary);
                        }
                    }
                }
            }
            return addMissingTerms([], criterion.vocabulary);
        };
        this.findCriterion = function (criteria, id) {
            function inner(criteria, id) {
                var result;
                if (criteria.id === id) {
                    return criteria;
                }
                var children = criteria.children.filter(function (childCriterion) { return childCriterion instanceof CriteriaItem; });
                for (var i = children.length; i--;) {
                    result = inner(children[i], id);
                    if (result) {
                        return result;
                    }
                }
            }
            return inner(criteria, id);
        };
        /**
         * Clean a RQL query node from limit, sort, fields, locale nodes.
         *
         * @param rqlRuery The RQL query root node
         * @returns the new query
         */
        this.cleanQuery = function (rqlQuery) {
            var query = angular.copy(rqlQuery);
            if (query.args) {
                // remove limit or sort statements as these will be handled by other clients
                angular.forEach(query.args, function (arg) {
                    if (arg.args) {
                        var i = arg.args.length;
                        while (i--) {
                            if (arg.args[i].name === 'limit' || arg.args[i].name === 'sort' || arg.args[i].name === 'fields') {
                                arg.args.splice(i, 1);
                            }
                        }
                    }
                });
                // remove empty RQL nodes and locale node
                var i = query.args.length;
                while (i--) {
                    if (query.args[i].name === 'locale' || !query.args[i].args || query.args[i].args.length === 0) {
                        query.args.splice(i, 1);
                    }
                }
            }
            return query;
        };
    }
    ngObibaMica.search.service('RqlQueryService', ['$q',
        '$log',
        'TaxonomiesResource',
        'TaxonomyResource',
        'LocalizedValues',
        'VocabularyService',
        'RqlQueryUtils',
        'ngObibaMicaSearch',
        'SetService',
        RqlQueryService]);
})();
//# sourceMappingURL=rql-query-service.js.map
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
(function () {
    function RqlQueryUtils(VocabularyService) {
        /**
         * Finds the parent node to which new queries can be added
         *
         * @param targetNode
         * @returns {*}
         */
        function findValidParentNode(targetNode) {
            var target = targetNode.args.filter(function (query) {
                switch (query.name) {
                    case RQL_NODE.AND:
                    case RQL_NODE.NAND:
                    case RQL_NODE.OR:
                    case RQL_NODE.NOR:
                    case RQL_NODE.NOT:
                    case RQL_NODE.CONTAINS:
                    case RQL_NODE.IN:
                    case RQL_NODE.OUT:
                    case RQL_NODE.EQ:
                    case RQL_NODE.GT:
                    case RQL_NODE.GE:
                    case RQL_NODE.LT:
                    case RQL_NODE.LE:
                    case RQL_NODE.BETWEEN:
                    case RQL_NODE.EXISTS:
                    case RQL_NODE.MISSING:
                        return true;
                    case RQL_NODE.MATCH:
                        return query.args.length > 1;
                }
                return false;
            }).pop();
            if (target) {
                return targetNode.args.findIndex(function (arg) {
                    return arg.name === target.name;
                });
            }
            return -1;
        }
        function vocabularyTermNames(vocabulary) {
            return vocabulary && vocabulary.terms ? vocabulary.terms.map(function (term) {
                return term.name;
            }) : [];
        }
        function hasTargetQuery(rootRql, target) {
            return rootRql.args.filter(function (query) {
                switch (query.name) {
                    case RQL_NODE.VARIABLE:
                    case RQL_NODE.DATASET:
                    case RQL_NODE.STUDY:
                    case RQL_NODE.NETWORK:
                        return target ? target === query.name : true;
                    default:
                        return false;
                }
            }).length > 0;
        }
        function variableQuery() {
            return new RqlQuery(QUERY_TARGETS.VARIABLE);
        }
        function eqQuery(field, term) {
            var query = new RqlQuery(RQL_NODE.EQ);
            query.args.push(term);
            return query;
        }
        function orQuery(left, right) {
            var query = new RqlQuery(RQL_NODE.OR);
            query.args = [left, right];
            return query;
        }
        function aggregate(fields) {
            var query = new RqlQuery(RQL_NODE.AGGREGATE);
            fields.forEach(function (field) {
                query.args.push(field);
            });
            return query;
        }
        function fields(fields) {
            var query = new RqlQuery(RQL_NODE.FIELDS);
            query.args.push(fields);
            return query;
        }
        function limit(from, size) {
            var query = new RqlQuery(RQL_NODE.LIMIT);
            query.args.push(from);
            query.args.push(size);
            return query;
        }
        function fieldQuery(name, field, terms) {
            var query = new RqlQuery(name);
            query.args.push(field);
            if (terms && terms.length > 0) {
                query.args.push(terms);
            }
            return query;
        }
        function inQuery(field, terms) {
            var hasValues = terms && terms.length > 0;
            var name = hasValues ? RQL_NODE.IN : RQL_NODE.EXISTS;
            return fieldQuery(name, field, terms);
        }
        function matchQuery(field, queryString) {
            var query = new RqlQuery(RQL_NODE.MATCH);
            query.args.push(queryString || '*');
            query.args.push(field);
            return query;
        }
        function isFreeTextMatch(query) {
            return query.name === RQL_NODE.MATCH && query.args.length === 1;
        }
        function updateMatchQuery(query, queryString) {
            query.args[0] = queryString || '*';
            return query;
        }
        function rangeQuery(field, from, to) {
            var query = new RqlQuery(RQL_NODE.BETWEEN);
            query.args.push(field);
            updateRangeQuery(query, from, to);
            return query;
        }
        function updateQueryInternal(query, terms) {
            var hasValues = terms && terms.length > 0;
            if (hasValues) {
                query.args[1] = terms;
            }
            else {
                query.args.splice(1, 1);
            }
            return query;
        }
        function mergeInQueryArgValues(query, terms, replace) {
            var hasValues = terms && terms.length > 0;
            if (hasValues) {
                var current = query.args[1];
                if (!current || replace) {
                    query.args[1] = terms;
                }
                else {
                    if (!(current instanceof Array)) {
                        current = [current];
                    }
                    var unique = terms.filter(function (term) {
                        return current.indexOf(term) === -1;
                    });
                    query.args[1] = current.concat(unique);
                }
            }
            else {
                query.args.splice(1, 1);
            }
            return query;
        }
        function updateRangeQuery(query, from, to, missing) {
            if (missing) {
                query.name = RQL_NODE.MISSING;
                query.args.splice(1, 1);
            }
            else if (angular.isDefined(from) && from !== null && angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.BETWEEN;
                query.args[1] = [from, to];
            }
            else if (angular.isDefined(from) && from !== null) {
                query.name = RQL_NODE.GE;
                query.args[1] = from;
            }
            else if (angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.LE;
                query.args[1] = to;
            }
            else {
                query.name = RQL_NODE.EXISTS;
                query.args.splice(1, 1);
            }
        }
        /**
         * Creates a RqlQuery from an item
         *
         * @param item
         * @returns {RqlQuery}
         */
        function buildRqlQuery(item) {
            if (VocabularyService.isNumericVocabulary(item.vocabulary)) {
                return rangeQuery(criteriaId(item.taxonomy, item.vocabulary), null, null);
            }
            else if (VocabularyService.isMatchVocabulary(item.vocabulary)) {
                return matchQuery(criteriaId(item.taxonomy, item.vocabulary), null);
            }
            else {
                var args;
                if (Array.isArray(item.selectedTerms) && item.selectedTerms.length > 0) {
                    args = item.selectedTerms;
                }
                else if (item.term) {
                    args = item.term.name;
                }
                return inQuery(criteriaId(item.taxonomy, item.vocabulary), args);
            }
        }
        /**
         * Adds a new query to the parent query node
         *
         * @param parentQuery
         * @param query
         * @returns {*}
         */
        function addQuery(parentQuery, query, logicalOp) {
            if (parentQuery.args.length === 0) {
                parentQuery.args.push(query);
            }
            else {
                var parentIndex = findValidParentNode(parentQuery);
                if (parentIndex === -1) {
                    parentQuery.args.push(query);
                }
                else {
                    var oldArg = parentQuery.args.splice(parentIndex, 1).pop();
                    // check if the field is from the target's taxonomy, in which case the criteria is
                    // added with a AND operator otherwise it is a OR
                    if (!logicalOp && query.args && query.args.length > 0) {
                        var targetTaxo = 'Mica_' + parentQuery.name;
                        if (!isFreeTextMatch(query)) {
                            var criteriaVocabulary = query.name === 'match' ? query.args[1] : query.args[0];
                            logicalOp = criteriaVocabulary.startsWith(targetTaxo + '.') ? RQL_NODE.AND : RQL_NODE.OR;
                        }
                    }
                    var orQuery = new RqlQuery(logicalOp || RQL_NODE.AND);
                    orQuery.args.push(oldArg, query);
                    parentQuery.args.push(orQuery);
                }
            }
            return parentQuery;
        }
        /**
         * Update repeatable vocabularies as follows:
         *
         * IN(q, [a,b]) OR [c] => CONTAINS(q, [a,c]) OR CONTAINS(q, [b,c])
         * CONTAINS(q, [a,b]) OR [c] => CONTAINS(q, [a,b,c])
         * EXISTS(q) OR [c] => CONTAINS(q, [c])
         *
         * @param existingItemWrapper
         * @param terms
         */
        function updateRepeatableQueryArgValues(existingItem, terms) {
            existingItem.items().forEach(function (item) {
                var query = item.rqlQuery;
                switch (query.name) {
                    case RQL_NODE.EXISTS:
                        query.name = RQL_NODE.CONTAINS;
                        mergeInQueryArgValues(query, terms, false);
                        break;
                    case RQL_NODE.CONTAINS:
                        mergeInQueryArgValues(query, terms, false);
                        break;
                    case RQL_NODE.IN:
                        var values = query.args[1] ? [].concat(query.args[1]) : [];
                        if (values.length === 1) {
                            query.name = RQL_NODE.CONTAINS;
                            mergeInQueryArgValues(query, terms, false);
                            break;
                        }
                        var field = query.args[0];
                        var contains = values.filter(function (value) {
                            // remove duplicates (e.g. CONTAINS(q, [a,a])
                            return terms.indexOf(value) < 0;
                        }).map(function (value) {
                            return fieldQuery(RQL_NODE.CONTAINS, field, [].concat(value, terms));
                        });
                        var orRql;
                        if (contains.length > 1) {
                            var firstTwo = contains.splice(0, 2);
                            orRql = orQuery(firstTwo[0], firstTwo[1]);
                            contains.forEach(function (value) {
                                orRql = orQuery(value, orRql);
                            });
                            query.name = orRql.name;
                            query.args = orRql.args;
                        }
                        else {
                            query.name = RQL_NODE.CONTAINS;
                            query.args = contains[0].args;
                        }
                }
            });
        }
        function updateQueryArgValues(query, terms, replace) {
            switch (query.name) {
                case RQL_NODE.EXISTS:
                case RQL_NODE.MISSING:
                    query.name = RQL_NODE.IN;
                    mergeInQueryArgValues(query, terms, replace);
                    break;
                case RQL_NODE.CONTAINS:
                case RQL_NODE.IN:
                    mergeInQueryArgValues(query, terms, replace);
                    break;
                case RQL_NODE.BETWEEN:
                case RQL_NODE.GE:
                case RQL_NODE.LE:
                    query.args[1] = terms;
                    break;
                case RQL_NODE.MATCH:
                    query.args[0] = terms;
                    break;
            }
        }
        function updateQuery(query, values) {
            switch (query.name) {
                case RQL_NODE.CONTAINS:
                case RQL_NODE.IN:
                case RQL_NODE.OUT:
                case RQL_NODE.EXISTS:
                case RQL_NODE.MISSING:
                    updateQueryInternal(query, values);
                    break;
            }
        }
        function addLocaleQuery(rqlQuery, locale) {
            var found = rqlQuery.args.filter(function (arg) {
                return arg.name === RQL_NODE.LOCALE;
            }).pop();
            if (!found) {
                var localeQuery = new RqlQuery('locale');
                localeQuery.args.push(locale);
                rqlQuery.args.push(localeQuery);
            }
        }
        function addFields(targetQuery, fieldsQuery) {
            if (targetQuery && targetQuery.args) {
                var found = targetQuery.args.filter(function (arg) {
                    return arg.name === RQL_NODE.FIELDS;
                }).pop();
                if (found) {
                    found.args = fieldsQuery.args;
                }
                else {
                    targetQuery.args.push(fieldsQuery);
                }
            }
        }
        function getLimitQuery(targetQuery) {
            if (targetQuery && targetQuery.args) {
                return targetQuery.args.filter(function (arg) {
                    return arg.name === RQL_NODE.LIMIT;
                }).pop();
            }
            return null;
        }
        function addLimit(targetQuery, limitQuery) {
            if (targetQuery && targetQuery.args) {
                var found = getLimitQuery(targetQuery);
                if (found) {
                    found.args = limitQuery.args;
                }
                else {
                    targetQuery.args.push(limitQuery);
                }
            }
        }
        /**
         * Adds a sort criteria on given fields
         *
         * @param targetQuery
         * @param sort field name or an array of field names
         */
        function addSort(targetQuery, sort) {
            var sortQuery = targetQuery.args.filter(function (arg) {
                return arg.name === RQL_NODE.SORT;
            }).pop();
            if (!sortQuery) {
                sortQuery = new RqlQuery('sort');
                targetQuery.args.push(sortQuery);
            }
            sortQuery.args = Array.isArray(sort) ? sort : [sort];
        }
        /**
         * Helper finding the vocabulary field, return name if none was found
         *
         * @param taxonomy
         * @param vocabulary
         * @returns {*}
         */
        function criteriaId(taxonomy, vocabulary) {
            return taxonomy.name + '.' + vocabulary.name;
        }
        // exports
        this.vocabularyTermNames = vocabularyTermNames;
        this.hasTargetQuery = hasTargetQuery;
        this.variableQuery = variableQuery;
        this.eqQuery = eqQuery;
        this.orQuery = orQuery;
        this.aggregate = aggregate;
        this.fields = fields;
        this.limit = limit;
        this.fieldQuery = fieldQuery;
        this.inQuery = inQuery;
        this.matchQuery = matchQuery;
        this.isFreeTextMatch = isFreeTextMatch;
        this.updateMatchQuery = updateMatchQuery;
        this.rangeQuery = rangeQuery;
        this.updateQueryInternal = updateQueryInternal;
        this.mergeInQueryArgValues = mergeInQueryArgValues;
        this.updateRangeQuery = updateRangeQuery;
        this.buildRqlQuery = buildRqlQuery;
        this.addQuery = addQuery;
        this.updateRepeatableQueryArgValues = updateRepeatableQueryArgValues;
        this.updateQueryArgValues = updateQueryArgValues;
        this.updateQuery = updateQuery;
        this.addLocaleQuery = addLocaleQuery;
        this.addFields = addFields;
        this.getLimitQuery = getLimitQuery;
        this.addLimit = addLimit;
        this.addSort = addSort;
        this.criteriaId = criteriaId;
    }
    ngObibaMica.search.service('RqlQueryUtils', ['VocabularyService', RqlQueryUtils]);
})();
//# sourceMappingURL=rql-query-utils.js.map
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
(function () {
    function SearchContext() {
        var selectedLocale = null;
        this.setLocale = function (locale) {
            selectedLocale = locale;
        };
        this.currentLocale = function () {
            return selectedLocale;
        };
    }
    ngObibaMica.search.service('SearchContext', SearchContext);
})();
//# sourceMappingURL=search-context.js.map
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
(function () {
    function StudyFilterShortcutService($location, RqlQueryService) {
        function getCurrentClassName(rqlQuery) {
            rqlQuery = rqlQuery || RqlQueryService.parseQuery($location.search().query);
            var targetQuery = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, rqlQuery);
            var className;
            if (targetQuery) {
                className = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className');
            }
            return className;
        }
        function classNameQueryHasArgValue(className, argValue) {
            return !className ||
                (Array.isArray(className.args[1]) ? className.args[1].indexOf(argValue) > -1 : className.args[1] === argValue);
        }
        function classNameQueryHasStudyArg(className) {
            return classNameQueryHasArgValue(className, 'Study');
        }
        function classNameQueryHasHarmonizationStudyArg(className) {
            return classNameQueryHasArgValue(className, 'HarmonizationStudy');
        }
        function classNameQueryIsExists(className) {
            return !className ||
                className.name === RQL_NODE.EXISTS ||
                (classNameQueryHasStudyArg(className) && classNameQueryHasHarmonizationStudyArg(className));
        }
        this.filter = function (choice) {
            var parsedQuery = RqlQueryService.parseQuery($location.search().query);
            var foundStudyClassNameQuery = getCurrentClassName(parsedQuery);
            var studyClassNameQuery;
            if (foundStudyClassNameQuery) {
                studyClassNameQuery = foundStudyClassNameQuery;
                if (studyClassNameQuery.name === RQL_NODE.EXISTS) {
                    studyClassNameQuery.name = RQL_NODE.IN;
                }
            }
            else {
                studyClassNameQuery = new RqlQuery(RQL_NODE.IN);
            }
            studyClassNameQuery.args = ['Mica_study.className'];
            switch (choice) {
                case ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES:
                    studyClassNameQuery.args.push('Study');
                    break;
                case ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES:
                    studyClassNameQuery.args.push('HarmonizationStudy');
                    break;
                case ngObibaMica.search.STUDY_FILTER_CHOICES.ALL_STUDIES:
                    studyClassNameQuery.args.push(['Study', 'HarmonizationStudy']);
                    break;
            }
            if (!foundStudyClassNameQuery) {
                var study = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, parsedQuery);
                if (!study) {
                    study = new RqlQuery(QUERY_TARGETS.STUDY);
                    parsedQuery.args.push(study);
                }
                if (study.args.length > 0) {
                    var replace = study.args.filter(function (arg) {
                        return RqlQueryService.isLeaf(arg.name) || RqlQueryService.isOperator(arg.name);
                    }).pop();
                    if (replace) {
                        // replaceable args are operators or leaf nodes
                        var andStudyClassName = new RqlQuery(RQL_NODE.AND);
                        var index = study.args.indexOf(replace);
                        andStudyClassName.args.push(studyClassNameQuery, replace);
                        study.args[index] = andStudyClassName;
                    }
                    else {
                        study.args.push(studyClassNameQuery);
                    }
                }
                else {
                    study.args = [studyClassNameQuery];
                }
            }
            $location.search('query', new RqlQuery().serializeArgs(parsedQuery.args));
        };
        this.getStudyClassNameChoices = function () {
            return {
                choseAll: classNameQueryIsExists(getCurrentClassName()),
                choseIndividual: classNameQueryHasStudyArg(getCurrentClassName()),
                choseHarmonization: classNameQueryHasHarmonizationStudyArg(getCurrentClassName())
            };
        };
    }
    ngObibaMica.search.service('StudyFilterShortcutService', ['$location', 'RqlQueryService', StudyFilterShortcutService]);
})();
//# sourceMappingURL=study-filter-shortcut-service.js.map
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
(function () {
    function TaxonomyService($q, TaxonomiesResource, TaxonomyResource, VocabularyService) {
        /**
         * @returns Returns a taxonomy
         */
        function getTaxonomy(target, taxonomyName) {
            return TaxonomyResource.get({
                target: target,
                taxonomy: taxonomyName
            }).$promise;
        }
        function getTaxonomiesInternal(target, taxonomyNames) {
            return TaxonomiesResource.get({
                target: target,
                query: 'taxonomyName:' + taxonomyNames.join(' OR taxonomyName:')
            }).$promise;
        }
        function sortTaxonomies(order, taxonomies) {
            taxonomies.sort(function (a, b) {
                return order.indexOf(a.name) - order.indexOf(b.name);
            });
        }
        function findVocabularyInTaxonomy(target, taxonomyName, vocabularyName) {
            var deferred = $q.defer();
            var foundVocabulary = null;
            TaxonomyResource.get({
                target: target,
                taxonomy: taxonomyName
            }).$promise.then(function (taxonomy) {
                taxonomy.vocabularies.some(function (v) {
                    if (v.name === vocabularyName || VocabularyService.vocabularyAlias(v) === vocabularyName) {
                        foundVocabulary = v;
                        return true;
                    }
                });
                deferred.resolve(foundVocabulary);
            });
            return deferred.promise;
        }
        /**
         * @returns Returns a taxonomy for several names
         */
        function getTaxonomies(target, taxonomyNames) {
            var deferred = $q.defer();
            if (Array.isArray(taxonomyNames)) {
                getTaxonomiesInternal(target, taxonomyNames).then(function (taxonomies) {
                    taxonomies.forEach(function (taxonomy) {
                        taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
                    });
                    sortTaxonomies(taxonomyNames, taxonomies);
                    deferred.resolve(taxonomies);
                });
            }
            else {
                getTaxonomy(target, taxonomyNames).then(function (taxonomy) {
                    taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
                    deferred.resolve(taxonomy);
                });
            }
            return deferred.promise;
        }
        this.findVocabularyInTaxonomy = findVocabularyInTaxonomy;
        this.getTaxonomy = getTaxonomy;
        this.getTaxonomies = getTaxonomies;
    }
    ngObibaMica.search
        .service('TaxonomyService', ['$q', 'TaxonomiesResource', 'TaxonomyResource', 'VocabularyService', TaxonomyService]);
})();
//# sourceMappingURL=taxonomy-service.js.map
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
(function () {
    function VocabularyService($translate, LocalizedValues, MetaTaxonomyService) {
        var TOKEN_LENGTH = 1;
        var VOCABULARY_TYPES = {
            STRING: 'string',
            INTEGER: 'integer',
            DECIMAL: 'decimal'
        };
        function translateField(title) {
            return LocalizedValues.forLocale(title, $translate.use());
        }
        function asciiFold(text) {
            return text.normalize('NFD').replace(/\//g, ' ').replace(/[^\w|^\s|^-]/g, '');
        }
        /**
         * Filters the list of vocabularies based on a query string. A leading '-' will negate the filter result.
         *
         * @param vocabularies
         * @param queryString
         * @returns filtered vocabularies
         */
        function filter(vocabularies, queryString) {
            if (queryString) {
                var tokens = asciiFold(queryString).toLowerCase().split(' ').filter(function (token) {
                    return token.length > TOKEN_LENGTH;
                });
                var vocabulariesToFilter = Array.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;
                var fieldsToFilter = MetaTaxonomyService.getTaxonomyPanelOptions().fieldsToFilter;
                return (vocabulariesToFilter || []).filter(function (vocabulary) {
                    vocabulary.filteredTerms = (vocabulary.terms || []).filter(function (term) {
                        // Filter on configurable field
                        var toMatchField = fieldsToFilter.reduce(function (toMatchField, field) {
                            return toMatchField + ' ' + translateField(term[field]);
                        }, fieldsToFilter[0]);
                        // term is selected when each of the token is included
                        var toMatch = asciiFold(toMatchField).trim().toLowerCase();
                        return tokens.map(function (token) {
                            if (token.startsWith('-')) {
                                var ntoken = token.substr(1);
                                if (ntoken.length <= TOKEN_LENGTH) {
                                    return true;
                                }
                                return toMatch.indexOf(ntoken) === -1;
                            }
                            return toMatch.indexOf(token) >= 0;
                        }).reduce(function (acc, val) {
                            return acc && val;
                        }, true);
                    });
                    return vocabulary.terms ? vocabulary.filteredTerms.length > 0 : true;
                });
            }
        }
        function isVocabularyVisible(vocabulary) {
            if (!vocabulary) {
                return false;
            }
            var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function (a) {
                return a.key === 'hidden';
            }).pop() : null;
            return !hidden || hidden.value === 'false';
        }
        function isFacetVocabularyVisible(vocabulary) {
            if (!vocabulary || !vocabulary.attributes) {
                return false;
            }
            var result = vocabulary.attributes.filter(function (attribute) {
                return ['hidden', 'facet'].indexOf(attribute.key) > -1;
            }).reduce(function (a, i) {
                a[i.key] = i.value;
                return a;
            }, {});
            return 'true' === result.facet && (!result.hidden || 'false' === result.hidden);
        }
        function findVocabularyAttributes(vocabulary, pattern) {
            return (vocabulary.attributes || []).filter(function (attribute) {
                return attribute.key.search(pattern) > -1;
            }).reduce(function (a, i) {
                a[i.key] = i.value;
                return a;
            }, {});
        }
        function vocabularyAttributeValue(vocabulary, key, defaultValue) {
            var value = defaultValue;
            if (vocabulary.attributes) {
                vocabulary.attributes.some(function (attribute) {
                    if (attribute.key === key) {
                        value = attribute.value;
                        return true;
                    }
                    return false;
                });
            }
            return value;
        }
        function visibleVocabularies(vocabularies) {
            return (vocabularies || []).filter(isVocabularyVisible);
        }
        function visibleFacetVocabularies(vocabularies) {
            return (vocabularies || []).filter(isFacetVocabularyVisible);
        }
        function vocabularyType(vocabulary) {
            return vocabularyAttributeValue(vocabulary, 'type', VOCABULARY_TYPES.STRING);
        }
        function vocabularyField(vocabulary) {
            return vocabularyAttributeValue(vocabulary, 'field', vocabulary.name);
        }
        function vocabularyAlias(vocabulary) {
            return vocabularyAttributeValue(vocabulary, 'alias', vocabulary.name);
        }
        function vocabularyTermsSortKey(vocabulary) {
            return vocabularyAttributeValue(vocabulary, 'termsSortKey', null);
        }
        function isTermsVocabulary(vocabulary) {
            return vocabularyType(vocabulary) === VOCABULARY_TYPES.STRING && vocabulary.terms;
        }
        function isMatchVocabulary(vocabulary) {
            return vocabularyType(vocabulary) === VOCABULARY_TYPES.STRING && !vocabulary.terms;
        }
        function isNumericVocabulary(vocabulary) {
            return !vocabulary.terms && (vocabularyType(vocabulary) === VOCABULARY_TYPES.INTEGER || vocabularyType(vocabulary) === VOCABULARY_TYPES.DECIMAL);
        }
        function isRangeVocabulary(vocabulary) {
            return vocabulary.terms && (vocabularyType(vocabulary) === VOCABULARY_TYPES.INTEGER || vocabularyType(vocabulary) === VOCABULARY_TYPES.DECIMAL);
        }
        function isFacettedVocabulary(vocabulary) {
            return 'true' === vocabularyAttributeValue(vocabulary, 'facet', 'false');
        }
        function sortFilteredVocabularyTerms(vocabulary, terms, locale) {
            var termsSortKey = vocabularyTermsSortKey(vocabulary);
            if (termsSortKey && terms && terms.length > 0) {
                switch (termsSortKey) {
                    case 'name':
                        terms.sort(function (a, b) {
                            return a[termsSortKey].localeCompare(b[termsSortKey]);
                        });
                        break;
                    case 'title':
                        terms.sort(function (a, b) {
                            var titleA = LocalizedValues.forLocale(a[termsSortKey], locale);
                            var titleB = LocalizedValues.forLocale(b[termsSortKey], locale);
                            return titleA.localeCompare(titleB);
                        });
                        break;
                }
            }
        }
        function sortVocabularyTerms(vocabulary, locale) {
            sortFilteredVocabularyTerms(vocabulary, vocabulary.terms, locale ? locale : $translate.$use());
        }
        this.filter = filter;
        this.isVisibleVocabulary = isVocabularyVisible;
        this.findVocabularyAttributes = findVocabularyAttributes;
        this.visibleVocabularies = visibleVocabularies;
        this.visibleFacetVocabularies = visibleFacetVocabularies;
        this.isRangeVocabulary = isRangeVocabulary;
        this.isTermsVocabulary = isTermsVocabulary;
        this.isMatchVocabulary = isMatchVocabulary;
        this.isNumericVocabulary = isNumericVocabulary;
        this.isFacettedVocabulary = isFacettedVocabulary;
        this.sortVocabularyTerms = sortVocabularyTerms;
        this.sortFilteredVocabularyTerms = sortFilteredVocabularyTerms;
        this.vocabularyAlias = vocabularyAlias;
        this.vocabularyField = vocabularyField;
        return this;
    }
    ngObibaMica.search.service('VocabularyService', ['$translate', 'LocalizedValues', 'MetaTaxonomyService', VocabularyService]);
})();
//# sourceMappingURL=vocabulary-service.js.map
'use strict';
ngObibaMica.search
    .filter('dceDescription', function () {
    return function (input) {
        return input.split(':<p>').map(function (d) {
            return '<p>' + d;
        })[2];
    };
});
//# sourceMappingURL=dce-description.js.map
'use strict';
ngObibaMica.search
    .filter('orderBySelection', function () {
    return function (elements, selections) {
        if (!elements) {
            return [];
        }
        var selected = [];
        var unselected = [];
        elements.forEach(function (element) {
            if (selections[element.key]) {
                selected.push(element);
            }
            else {
                unselected.push(element);
            }
        });
        return selected.concat(unselected);
    };
});
//# sourceMappingURL=order-by-selection.js.map
'use strict';
ngObibaMica.search
    .filter('regex', function () {
    return function (elements, regex, fields, lang) {
        var out = [];
        try {
            var pattern = new RegExp(regex, 'i');
            out = elements.filter(function (element) {
                return fields.some(function (field) {
                    var value = element[field];
                    if (angular.isArray(value) && lang) {
                        return value.filter(function (item) {
                            return item.locale === lang;
                        }).some(function (item) {
                            return pattern.test(item.text);
                        });
                    }
                    return pattern.test(value);
                });
            });
        }
        catch (e) {
        }
        return out;
    };
});
//# sourceMappingURL=regex.js.map
'use strict';
ngObibaMica.search
    .filter('renderableTargets', ['RqlQueryService', function (RqlQueryService) {
        return function (targets) {
            return RqlQueryService.getRenderableTargetCriteria(targets);
        };
    }]);
//# sourceMappingURL=renderable-targets.js.map
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
(function () {
    ngObibaMica.search.STUDY_FILTER_CHOICES = {
        ALL_STUDIES: 'all',
        INDIVIDUAL_STUDIES: 'individual',
        HARMONIZATION_STUDIES: 'harmonization'
    };
})();
//# sourceMappingURL=study-filter-choices.js.map
'use strict';
ngObibaMica.search
    .filter('visibleVocabularies', ['VocabularyService', function (VocabularyService) {
        return function (vocabularies) {
            return VocabularyService.visibleVocabularies(vocabularies);
        };
    }]);
//# sourceMappingURL=visible-vocabularies.js.map
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
(function () {
    ngObibaMica.search.SortVocabularyTerms = function (VocabularyService) {
        return function (terms, vocabulary) {
            VocabularyService.sortFilteredVocabularyTerms(vocabulary, terms);
            return terms;
        };
    };
    ngObibaMica.search.filter('sortTerms', ['VocabularyService', ngObibaMica.search.SortVocabularyTerms]);
})();
//# sourceMappingURL=vocabulary-filters.js.map
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
/* exported CRITERIA_ITEM_EVENT */
var CRITERIA_ITEM_EVENT = {
    deleted: 'event:delete-criteria-item',
    refresh: 'event:refresh-criteria-item'
};
(function () {
    function CriteriaRootDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                item: '=',
                query: '=',
                advanced: '=',
                onRemove: '=',
                onRefresh: '=',
                isFacetted: '='
            },
            templateUrl: 'search/components/criteria/criteria-root/component.html',
            link: function ($scope) {
                $scope.$on(CRITERIA_ITEM_EVENT.deleted, function (event, item) {
                    $scope.onRemove(item);
                });
                $scope.$on(CRITERIA_ITEM_EVENT.refresh, function () {
                    $scope.onRefresh();
                });
            }
        };
    }
    ngObibaMica.search.directive('criteriaRoot', CriteriaRootDirective);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function CriteriaTargetDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                item: '=',
                query: '=',
                advanced: '='
            },
            templateUrl: 'search/components/criteria/criteria-target/component.html'
        };
    }
    ngObibaMica.search.directive('criteriaTarget', CriteriaTargetDirective);
})();
//# sourceMappingURL=component.js.map
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
/* global CRITERIA_ITEM_EVENT */
(function () {
    /**
     * State shared between Criterion DropDown and its content directives
     *
     * @constructor
     */
    function CriterionState() {
        var onOpenCallbacks = [];
        var onCloseCallbacks = [];
        this.dirty = false;
        this.open = false;
        this.loading = true;
        this.addOnOpen = function (callback) {
            onOpenCallbacks.push(callback);
        };
        this.addOnClose = function (callback) {
            onCloseCallbacks.push(callback);
        };
        this.onOpen = function () {
            onOpenCallbacks.forEach(function (callback) {
                callback();
            });
        };
        this.onClose = function () {
            onCloseCallbacks.forEach(function (callback) {
                callback();
            });
        };
    }
    function CriterionDropdownController($scope, $filter, LocalizedValues, VocabularyService, StringUtils) {
        var closeDropdown = function () {
            if (!$scope.state.open) {
                return;
            }
            $scope.state.onClose();
            var wasDirty = $scope.state.dirty;
            $scope.state.open = false;
            $scope.state.dirty = false;
            if (wasDirty) {
                // trigger a query update
                $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
            }
        };
        var openDropdown = function () {
            if ($scope.state.open) {
                closeDropdown();
                return;
            }
            $scope.state.open = true;
            $scope.state.onOpen();
        };
        var remove = function () {
            $scope.$emit(CRITERIA_ITEM_EVENT.deleted, $scope.criterion);
        };
        var onKeyup = function (event) {
            if (event.keyCode === 13) {
                closeDropdown();
            }
        };
        $scope.state = new CriterionState();
        $scope.timestamp = new Date().getTime();
        $scope.localize = function (values) {
            return LocalizedValues.forLocale(values, $scope.criterion.lang);
        };
        $scope.localizeCriterion = function () {
            var rqlQuery = $scope.criterion.rqlQuery;
            if ((rqlQuery.name === RQL_NODE.IN ||
                rqlQuery.name === RQL_NODE.OUT ||
                rqlQuery.name === RQL_NODE.CONTAINS) &&
                $scope.criterion.selectedTerms &&
                $scope.criterion.selectedTerms.length > 0) {
                var sep = rqlQuery.name === RQL_NODE.IN ? ' | ' : ' ';
                var prefix = rqlQuery.name === RQL_NODE.OUT ? '-' : '';
                return $scope.criterion.selectedTerms.map(function (t) {
                    if (!$scope.criterion.vocabulary.terms) {
                        return t;
                    }
                    var found = $scope.criterion.vocabulary.terms.filter(function (arg) {
                        return arg.name === t;
                    }).pop();
                    return prefix + (found ? LocalizedValues.forLocale(found.title, $scope.criterion.lang) : t);
                }).join(sep);
            }
            var operation = rqlQuery.name;
            switch (rqlQuery.name) {
                case RQL_NODE.EXISTS:
                    operation = ':' + $filter('translate')('any');
                    break;
                case RQL_NODE.MISSING:
                    operation = ':' + $filter('translate')('none');
                    break;
                case RQL_NODE.EQ:
                    operation = '=' + rqlQuery.args[1];
                    break;
                case RQL_NODE.GE:
                    operation = '>' + rqlQuery.args[1];
                    break;
                case RQL_NODE.LE:
                    operation = '<' + rqlQuery.args[1];
                    break;
                case RQL_NODE.BETWEEN:
                    operation = ':[' + rqlQuery.args[1] + ')';
                    break;
                case RQL_NODE.IN:
                case RQL_NODE.CONTAINS:
                    operation = '';
                    break;
                case RQL_NODE.MATCH:
                    operation = ':match(' + rqlQuery.args[0] + ')';
                    break;
            }
            return LocalizedValues.forLocale($scope.criterion.vocabulary.title, $scope.criterion.lang) + operation;
        };
        $scope.vocabularyType = VocabularyService.vocabularyType;
        $scope.onKeyup = onKeyup;
        $scope.truncate = StringUtils.truncate;
        $scope.remove = remove;
        $scope.openDropdown = openDropdown;
        $scope.closeDropdown = closeDropdown;
        $scope.VocabularyService = VocabularyService;
    }
    function CriterionDropdown($document, $timeout, ngObibaMicaSearchTemplateUrl) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                criterion: '=',
                query: '='
            },
            controller: [
                '$scope',
                '$filter',
                'LocalizedValues',
                'VocabularyService',
                'StringUtils',
                CriterionDropdownController
            ],
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('CriterionDropdownTemplate'),
            link: function ($scope, $element) {
                var onDocumentClick = function (event) {
                    var isChild = document.querySelector('#' + $scope.criterion.id.replace('.', '-') + '-dropdown-' + $scope.timestamp)
                        .contains(event.target);
                    if (!isChild) {
                        $timeout(function () {
                            $scope.$apply('closeDropdown()');
                        });
                    }
                };
                $document.on('click', onDocumentClick);
                $element.on('$destroy', function () {
                    $document.off('click', onDocumentClick);
                });
            }
        };
    }
    /**
     * This directive serves as the container for each time of criterion based on a vocabulary type.
     * Specialize contents types as directives and share the state with this container.
     */
    ngObibaMica.search.directive('criterionDropdown', ['$document', '$timeout', 'ngObibaMicaSearchTemplateUrl', CriterionDropdown]);
})();
//# sourceMappingURL=component.js.map
'use strict';
/* global CRITERIA_ITEM_EVENT */
(function () {
    var TEMPLATE_URL = 'search/components/criteria/item-region/item-node/component.html';
    ngObibaMica.search
        .controller('CriterionLogicalController', [
        '$scope',
        function ($scope) {
            $scope.updateLogical = function (operator) {
                $scope.item.rqlQuery.name = operator;
                $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
            };
        }
    ])
        .directive('criteriaNode', [function () {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    item: '=',
                    query: '=',
                    advanced: '='
                },
                controller: 'CriterionLogicalController',
                templateUrl: TEMPLATE_URL
            };
        }])
        .directive('criteriaLeaf', ['CriteriaNodeCompileService', function (CriteriaNodeCompileService) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    item: '=',
                    query: '=',
                    advanced: '='
                },
                controller: 'CriterionLogicalController',
                link: function (scope, element) {
                    CriteriaNodeCompileService.compile(scope, element, TEMPLATE_URL);
                }
            };
        }]);
})();
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('MatchCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
        $scope.lang = SearchContext.currentLocale();
        var update = function () {
            $scope.state.dirty = true;
            RqlQueryUtils.updateMatchQuery($scope.criterion.rqlQuery, $scope.match);
        };
        var queryString = $scope.criterion.rqlQuery.args[0];
        $scope.match = queryString === '*' ? '' : queryString;
        $scope.update = update;
        $scope.localize = function (values) {
            return LocalizedValues.forLocale(values, $scope.criterion.lang);
        };
    }
])
    .directive('matchCriterion', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                criterion: '=',
                query: '=',
                state: '='
            },
            controller: 'MatchCriterionTermsController',
            templateUrl: 'search/components/criteria/item-region/match/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('NumericCriterionController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
        $scope.lang = SearchContext.currentLocale();
        var range = $scope.criterion.rqlQuery.args[1];
        if (angular.isArray(range)) {
            $scope.from = $scope.criterion.rqlQuery.args[1][0];
            $scope.to = $scope.criterion.rqlQuery.args[1][1];
        }
        else {
            $scope.from = $scope.criterion.rqlQuery.name === RQL_NODE.GE ? range : null;
            $scope.to = $scope.criterion.rqlQuery.name === RQL_NODE.LE ? range : null;
        }
        var updateLimits = function () {
            var target = $scope.criterion.target, joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion);
            JoinQuerySearchResource[targetToType(target)]({ query: joinQuery }).$promise.then(function (joinQueryResponse) {
                var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);
                if (stats && stats.default) {
                    $scope.min = stats.default.min;
                    $scope.max = stats.default.max;
                }
            });
        };
        var onOpen = function () {
            updateLimits();
        };
        var onClose = function () {
            $scope.updateSelection();
        };
        $scope.updateSelection = function () {
            RqlQueryUtils.updateRangeQuery($scope.criterion.rqlQuery, $scope.from, $scope.to, $scope.selectMissing);
            $scope.state.dirty = true;
        };
        $scope.selectMissing = $scope.criterion.rqlQuery.name === RQL_NODE.MISSING;
        $scope.state.addOnClose(onClose);
        $scope.state.addOnOpen(onOpen);
        $scope.localize = function (values) {
            return LocalizedValues.forLocale(values, $scope.criterion.lang);
        };
    }
])
    .directive('numericCriterion', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                criterion: '=',
                query: '=',
                state: '='
            },
            controller: 'NumericCriterionController',
            templateUrl: 'search/components/criteria/item-region/numeric/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('searchCriteriaRegionController', ['$scope', 'RqlQueryService', '$timeout', function ($scope, RqlQueryService, $timeout) {
        var canShow = false;
        $scope.$watchCollection('search.criteria', function () {
            $scope.renderableTargets = RqlQueryService.getRenderableTargetCriteriaFromRoot($scope.search.criteria);
        });
        $scope.$watchCollection('search.criteriaItemMap', function () {
            if ($scope.search.criteriaItemMap) {
                canShow = Object.keys($scope.search.criteriaItemMap).length > 1;
            }
        });
        $scope.$watchCollection('search.rqlQuery', function () {
            var rqlQuery = RqlQueryService.cleanQuery(angular.copy($scope.search.rqlQuery));
            $scope.query = new RqlQuery().serializeArgs(rqlQuery.args);
        });
        var canShowCriteriaRegion = function () {
            return ($scope.options.studyTaxonomiesOrder.length || $scope.options.datasetTaxonomiesOrder.length || $scope.options.networkTaxonomiesOrder.length) && canShow;
        };
        $scope.showCopiedQueryTooltipStatus = false;
        var showCopiedQueryTooltip = function () {
            $scope.showCopiedQueryTooltipStatus = true;
            $timeout(function () {
                $scope.showCopiedQueryTooltipStatus = false;
            }, 1000);
        };
        $scope.showCopiedQueryTooltip = showCopiedQueryTooltip;
        $scope.canShowCriteriaRegion = canShowCriteriaRegion;
    }])
    .directive('searchCriteriaRegion', ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                options: '=',
                search: '='
            },
            controller: 'searchCriteriaRegionController',
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchCriteriaRegionTemplate')
        };
    }]);
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('StringCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'StringUtils',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    '$filter',
    function ($scope, RqlQueryService, LocalizedValues, StringUtils, JoinQuerySearchResource, RqlQueryUtils, SearchContext, $filter) {
        $scope.lang = SearchContext.currentLocale();
        var isSelected = function (name) {
            return $scope.checkboxTerms.indexOf(name) !== -1;
        };
        var updateSelection = function () {
            $scope.state.dirty = true;
            $scope.criterion.rqlQuery.name = $scope.selectedFilter;
            var selected = [];
            if ($scope.selectedFilter !== RQL_NODE.MISSING && $scope.selectedFilter !== RQL_NODE.EXISTS) {
                Object.keys($scope.checkboxTerms).forEach(function (key) {
                    if ($scope.checkboxTerms[key]) {
                        selected.push(key);
                    }
                });
            }
            if (selected.length === 0 && $scope.selectedFilter !== RQL_NODE.MISSING) {
                $scope.criterion.rqlQuery.name = RQL_NODE.EXISTS;
            }
            RqlQueryUtils.updateQuery($scope.criterion.rqlQuery, selected);
        };
        var updateFilter = function () {
            updateSelection();
        };
        var isInOutFilter = function () {
            return $scope.selectedFilter === RQL_NODE.IN || $scope.selectedFilter === RQL_NODE.OUT;
        };
        var isContainsFilter = function () {
            return $scope.selectedFilter === RQL_NODE.CONTAINS;
        };
        var onOpen = function () {
            $scope.state.loading = true;
            var target = $scope.criterion.target;
            var joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion, $scope.lang);
            JoinQuerySearchResource[targetToType(target)]({ query: joinQuery }).$promise.then(function (joinQueryResponse) {
                $scope.state.loading = false;
                $scope.terms = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);
                if ($scope.terms) {
                    if ($scope.criterion.taxonomy.name.startsWith('Mica_') && $scope.criterion.vocabulary.name === 'sets') {
                        var vocTerms = $scope.criterion.vocabulary.terms;
                        // ensure terms are local sets + titles from server are not correct
                        $scope.terms = $scope.terms.filter(function (term) {
                            var filteredVocTerms = vocTerms.filter(function (vocTerm) {
                                if (vocTerm.name === term.key) {
                                    term.title = $scope.localize(vocTerm.title);
                                    return true;
                                }
                                return false;
                            });
                            return filteredVocTerms.length > 0;
                        });
                    }
                    $scope.terms.forEach(function (term) {
                        $scope.checkboxTerms[term.key] = $scope.isSelectedTerm(term);
                    });
                    $scope.terms = $filter('orderBySelection')($scope.terms, $scope.checkboxTerms);
                }
            });
        };
        $scope.isSelectedTerm = function (term) {
            return $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.indexOf(term.key) !== -1;
        };
        $scope.state.addOnOpen(onOpen);
        $scope.checkboxTerms = {};
        $scope.RQL_NODE = RQL_NODE;
        $scope.selectedFilter = $scope.criterion.type;
        $scope.isSelected = isSelected;
        $scope.updateFilter = updateFilter;
        $scope.localize = function (values) {
            return LocalizedValues.forLocale(values, $scope.criterion.lang);
        };
        $scope.truncate = StringUtils.truncate;
        $scope.isInOutFilter = isInOutFilter;
        $scope.isContainsFilter = isContainsFilter;
        $scope.updateSelection = updateSelection;
    }
])
    .directive('stringCriterionTerms', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                criterion: '=',
                query: '=',
                state: '='
            },
            controller: 'StringCriterionTermsController',
            templateUrl: 'search/components/criteria/item-region/string-terms/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
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
(function () {
    function MatchVocabularyFilterDetailController() {
        var ctrl = this;
        function enterText(keyUpEvent) {
            var input = new obiba.utils.NgObibaStringUtils().cleanDoubleQuotesLeftUnclosed(keyUpEvent.target.value);
            var args = { text: input || '*' };
            if (keyUpEvent.keyCode === 13) {
                ctrl.onSelectArgs({ vocabulary: ctrl.vocabulary, args: args });
            }
        }
        ctrl.enterText = enterText;
    }
    ngObibaMica.search
        .component('matchVocabularyFilterDetail', {
        transclude: true,
        bindings: {
            vocabulary: '<',
            onSelectArgs: '&'
        },
        templateUrl: 'search/components/criteria/match-vocabulary-filter-detail/component.html',
        controller: [MatchVocabularyFilterDetailController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function NumericVocabularyFilterDetailController() {
        var ctrl = this;
        function setRangeValue(submitEvent) {
            var from = submitEvent.target[0].value;
            var to = submitEvent.target[1].value;
            var args = {};
            if (from) {
                args.from = parseInt(from, 10);
            }
            if (to) {
                args.to = parseInt(to, 10);
            }
            ctrl.onSelectArgs({ vocabulary: ctrl.vocabulary, args: args });
        }
        ctrl.setRangeValue = setRangeValue;
    }
    ngObibaMica.search
        .component('numericVocabularyFilterDetail', {
        transclude: true,
        bindings: {
            vocabulary: '<',
            onSelectArgs: '&'
        },
        templateUrl: 'search/components/criteria/numeric-vocabulary-filter-detail/component.html',
        controller: [NumericVocabularyFilterDetailController]
    });
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var TermsVocabularyFilterDetailController = /** @class */ (function () {
    function TermsVocabularyFilterDetailController() {
        this.constantLimitNumber = 12;
        this.limitNumber = this.constantLimitNumber;
    }
    TermsVocabularyFilterDetailController.prototype.clickCheckbox = function (input) {
        var args = { term: input };
        this.onSelectArgs({ vocabulary: this.vocabulary, args: args });
    };
    return TermsVocabularyFilterDetailController;
}());
var TermsVocabularyFilterDetailComponent = /** @class */ (function () {
    function TermsVocabularyFilterDetailComponent() {
        this.transclude = true;
        this.bindings = {
            onSelectArgs: "&",
            vocabulary: "<",
        };
        this.controller = TermsVocabularyFilterDetailController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "search/components/criteria/terms-vocabulary-filter-detail/component.html";
    }
    return TermsVocabularyFilterDetailComponent;
}());
ngObibaMica.search
    .component("termsVocabularyFilterDetail", new TermsVocabularyFilterDetailComponent());
//# sourceMappingURL=component.js.map
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
(function () {
    function EntityCountsController() {
        var ctrl = this;
        function getTotalHits(entity) {
            if (!ctrl.result || !ctrl.result[entity + 'TotalCount']) {
                return '';
            }
            return ctrl.result[entity + 'TotalCount'].hits;
        }
        function selectType(entity) {
            ctrl.onSelectType({ type: targetToType(entity) });
        }
        ctrl.getTotalHits = getTotalHits;
        ctrl.selectType = selectType;
    }
    ngObibaMica.search
        .component('entityCounts', {
        transclude: true,
        bindings: {
            result: '<',
            target: '<',
            onSelectType: '&',
            resultTabsOrder: '<',
            taxonomyTypeMap: '<'
        },
        templateUrl: 'search/components/entity-counts/component.html',
        controller: [EntityCountsController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function Controller(EntitySuggestionService) {
        var ctrl = this;
        function init() {
            ctrl.model = EntitySuggestionService.getCurrentSuggestion(ctrl.target, ctrl.rqlQuery) || '';
        }
        function suggest(query) {
            return EntitySuggestionService.suggest(ctrl.entityType, query);
        }
        function select(suggestion) {
            EntitySuggestionService.selectSuggestion(ctrl.target, suggestion, ctrl.withSpecificFields === 'true');
        }
        function onKeyUp(event) {
            if (event.keyCode === 13) {
                select(ctrl.model);
            }
        }
        function clear() {
            ctrl.model = '';
            select('');
        }
        function onChanges(changedObjects) {
            if (changedObjects.rqlQuery.currentValue) {
                init();
            }
        }
        ctrl.model = '';
        ctrl.suggest = suggest;
        ctrl.select = select;
        ctrl.clear = clear;
        ctrl.onKeyUp = onKeyUp;
        ctrl.$onChanges = onChanges;
    }
    ngObibaMica.search
        .component('entitySearchTypeahead', {
        bindings: {
            target: '<',
            entityType: '<',
            rqlQuery: '<',
            withSpecificFields: '@',
            placeholderText: '@',
            showButton: '@'
        },
        templateUrl: 'search/components/entity-search-typeahead/component.html',
        controller: ['EntitySuggestionService', Controller]
    });
})();
//# sourceMappingURL=component.js.map
'use strict';
/* global CriteriaIdGenerator */
ngObibaMica.search
    .controller('MatchVocabularyFacetController', ['$scope', 'RqlQueryService', function ($scope, RqlQueryService) {
        function updateMatch(criteria, vocabulary) {
            var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));
            if (criterion && criterion.rqlQuery && criterion.rqlQuery.args[1]) {
                $scope.text = criterion.rqlQuery.args[0];
            }
            else {
                $scope.text = null;
            }
        }
        function updateCriteria() {
            $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, { text: $scope.text || '*' });
        }
        $scope.onKeypress = function (ev) {
            if (ev.keyCode === 13 || ev.type === 'click') {
                updateCriteria();
            }
        };
        $scope.$on('ngObibaMicaQueryUpdated', function (ev, criteria) {
            if ($scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
                updateMatch(criteria, $scope.vocabulary);
            }
        });
        $scope.$on('ngObibaMicaLoadVocabulary', function (ev, taxonomy, vocabulary) {
            if (vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
                updateMatch($scope.criteria, vocabulary);
            }
        });
    }]);
//# sourceMappingURL=component.js.map
'use strict';
/* global CriteriaIdGenerator */
ngObibaMica.search
    .controller('NumericVocabularyFacetController', ['$scope', 'JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils', function ($scope, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
        function updateLimits(criteria, vocabulary) {
            function createExistsQuery(criteria, criterion) {
                var rootQuery = angular.copy(criteria.rqlQuery);
                criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
                RqlQueryService.addCriteriaItem(rootQuery, criterion);
                return rootQuery;
            }
            var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));
            if (!criterion) {
                criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
            }
            if (criterion.rqlQuery && criterion.rqlQuery.args[1]) {
                if (angular.isArray(criterion.rqlQuery.args[1])) {
                    $scope.from = criterion.rqlQuery.args[1][0];
                    $scope.to = criterion.rqlQuery.args[1][1];
                }
                else {
                    if (criterion.rqlQuery.name === RQL_NODE.GE) {
                        $scope.from = criterion.rqlQuery.args[1];
                    }
                    else {
                        $scope.to = criterion.rqlQuery.args[1];
                    }
                }
            }
            else {
                $scope.from = null;
                $scope.to = null;
                $scope.min = null;
                $scope.max = null;
            }
            var query = RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target) ? angular.copy(criteria.rqlQuery) : createExistsQuery(criteria, criterion);
            var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion);
            JoinQuerySearchResource[targetToType($scope.target)]({ query: joinQuery }).$promise.then(function (joinQueryResponse) {
                var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, $scope.lang);
                if (stats && stats.default) {
                    $scope.min = stats.default.min;
                    $scope.max = stats.default.max;
                }
            });
        }
        function updateCriteria() {
            $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, { from: $scope.from, to: $scope.to });
        }
        $scope.onKeypress = function (ev) {
            if (ev.keyCode === 13 || ev.type === 'click') {
                updateCriteria();
            }
        };
        $scope.$on('ngObibaMicaQueryUpdated', function (ev, criteria) {
            if ($scope.vocabulary.isNumeric && $scope.vocabulary.isOpen) {
                updateLimits(criteria, $scope.vocabulary);
            }
        });
        $scope.$on('ngObibaMicaLoadVocabulary', function (ev, taxonomy, vocabulary) {
            if ($scope.vocabulary.isNumeric &&
                vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
                updateLimits($scope.criteria, vocabulary);
            }
        });
    }]);
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('TaxonomiesFacetsController', ['$scope',
    '$timeout',
    'TaxonomyResource',
    'TaxonomiesResource',
    'LocalizedValues',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    'VocabularyService',
    function ($scope, $timeout, TaxonomyResource, TaxonomiesResource, LocalizedValues, ngObibaMicaSearch, RqlQueryUtils, VocabularyService) {
        $scope.options = ngObibaMicaSearch.getOptions();
        $scope.taxonomies = {};
        $scope.targets = [];
        $scope.RqlQueryUtils = RqlQueryUtils;
        $scope.$watch('facetedTaxonomies', function (facetedTaxonomies) {
            if (facetedTaxonomies) {
                $scope.targets = $scope.options.targetTabsOrder.filter(function (t) {
                    if (facetedTaxonomies[t]) {
                        return facetedTaxonomies[t].length;
                    }
                });
                $scope.target = $scope.targets[0];
                init($scope.target);
            }
        });
        $scope.selectTerm = function (target, taxonomy, vocabulary, args) {
            $scope.onSelectTerm(target, taxonomy, vocabulary, args);
        };
        $scope.setTarget = function (target) {
            $scope.target = target;
            init(target);
        };
        $scope.loadVocabulary = function (taxonomy, vocabulary) {
            $scope.$broadcast('ngObibaMicaLoadVocabulary', taxonomy, vocabulary);
        };
        $scope.localize = function (values) {
            return LocalizedValues.forLocale(values, $scope.lang);
        };
        function init(target) {
            if ($scope.taxonomies[target]) {
                return;
            }
            TaxonomiesResource.get({
                target: target
            }, function onSuccess(taxonomies) {
                $scope.taxonomies[target] = $scope.facetedTaxonomies[target].map(function (f) {
                    return taxonomies.filter(function (t) {
                        return f.name === t.name;
                    })[0];
                }).filter(function (t) { return t; }).map(function (t) {
                    t.isOpen = false;
                    t.vocabularies = 'Maelstrom Research' === t.author ?
                        t.vocabularies :
                        VocabularyService.visibleFacetVocabularies(t.vocabularies);
                    t.vocabularies.map(function (v) {
                        var facetAttributes = VocabularyService.findVocabularyAttributes(v, /^facet/i);
                        v.isOpen = 'true' === facetAttributes.facetExpanded;
                        v.position = parseInt(facetAttributes.facetPosition);
                        v.limit = 10;
                        v.isMatch = VocabularyService.isMatchVocabulary(v);
                        v.isNumeric = VocabularyService.isNumericVocabulary(v);
                        t.isOpen = t.isOpen || v.isOpen;
                    });
                    return t;
                });
                if ($scope.taxonomies[target].length === 1) {
                    $scope.taxonomies[target][0].isOpen = 1;
                }
                if ($scope.criteria) {
                    $timeout(function () {
                        $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.criteria);
                    });
                }
            });
        }
        $scope.$on('ngObibaMicaQueryUpdated', function (ev, criteria) {
            $scope.criteria = criteria;
        });
    }
])
    .directive('taxonomiesFacetsPanel', [function () {
        return {
            restrict: 'EA',
            scope: {
                facetedTaxonomies: '=',
                onRefresh: '=',
                onSelectTerm: '=',
                lang: '=',
                criteria: '='
            },
            controller: 'TaxonomiesFacetsController',
            templateUrl: 'search/components/facets/taxonomy/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
'use strict';
/* global CriteriaIdGenerator */
ngObibaMica.search
    .controller('TermsVocabularyFacetController', ['$scope', '$filter', 'JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils',
    function ($scope, $filter, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
        function isSelectedTerm(criterion, term) {
            return criterion.selectedTerms && (criterion.rqlQuery.name === RQL_NODE.EXISTS || criterion.selectedTerms.indexOf(term.key) !== -1);
        }
        $scope.loading = false;
        $scope.selectTerm = function (target, taxonomy, vocabulary, args) {
            var selected = vocabulary.terms.filter(function (t) { return t.selected; }).map(function (t) { return t.name; }), criterion = RqlQueryService.findCriterion($scope.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));
            if (criterion) {
                if (selected.length === 0) {
                    RqlQueryService.removeCriteriaItem(criterion);
                }
                else {
                    criterion.rqlQuery.name = RQL_NODE.IN;
                    RqlQueryUtils.updateQuery(criterion.rqlQuery, selected);
                }
                $scope.onRefresh();
            }
            else {
                $scope.onSelectTerm(target, taxonomy, vocabulary, args);
            }
        };
        function updateCounts(criteria, vocabulary) {
            var query = null, isCriterionPresent = false;
            $scope.loading = true;
            function createExistsQuery(criteria, criterion) {
                var rootQuery = angular.copy(criteria.rqlQuery);
                criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
                RqlQueryService.addCriteriaItem(rootQuery, criterion);
                return rootQuery;
            }
            var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));
            if (criterion) {
                isCriterionPresent = true;
            }
            else {
                criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
            }
            if (RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target)) {
                query = angular.copy(criteria.rqlQuery);
                if (!isCriterionPresent) {
                    var operator = criterion.target === QUERY_TARGETS.VARIABLE && criterion.taxonomy.name !== 'Mica_variable' ?
                        RQL_NODE.OR :
                        RQL_NODE.AND;
                    RqlQueryService.addCriteriaItem(query, criterion, operator);
                }
            }
            else {
                query = createExistsQuery(criteria, criterion);
            }
            var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion, criterion.lang);
            JoinQuerySearchResource[targetToType($scope.target)]({ query: joinQuery }).$promise.then(function (joinQueryResponse) {
                $scope.vocabulary.visibleTerms = 0;
                RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, criterion.lang).forEach(function (term) {
                    $scope.vocabulary.terms.some(function (t) {
                        if (t.name === term.key) {
                            t.selected = isSelectedTerm(criterion, term);
                            t.count = term.count;
                            t.isVisible = $scope.options.showFacetTermsWithZeroCount || term.count > 0;
                            $scope.vocabulary.visibleTerms += t.isVisible;
                            return true;
                        }
                    });
                });
                $scope.loading = false;
            });
        }
        $scope.$on('ngObibaMicaQueryUpdated', function (ev, criteria) {
            if (!$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
                updateCounts(criteria, $scope.vocabulary);
            }
        });
        $scope.$on('ngObibaMicaLoadVocabulary', function (ev, taxonomy, vocabulary) {
            if (vocabulary.name === $scope.vocabulary.name && !$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch &&
                !vocabulary.isOpen) {
                updateCounts($scope.criteria, vocabulary);
            }
        });
    }]);
//# sourceMappingURL=component.js.map
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
(function () {
    function FullScreen(FullScreenService) {
        return {
            link: function ($scope, $element, $attrs) {
                if ($attrs.fullscreen) {
                    $scope.$watch($attrs.fullscreen, function (value) {
                        var isEnabled = FullScreenService.isEnabled();
                        if (value && !isEnabled) {
                            FullScreenService.enable($element[0]);
                            $element.addClass('isInFullScreen');
                        }
                        else if (!value && isEnabled) {
                            FullScreenService.cancel();
                            $element.removeClass('isInFullScreen');
                        }
                    });
                }
            }
        };
    }
    ngObibaMica.search.directive('fullscreen', ['FullScreenService', FullScreen]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function IncludeReplace() {
        return {
            require: 'ngInclude',
            link: function (scope, el) {
                el.replaceWith(el.children());
            }
        };
    }
    ngObibaMica.search.directive('includeReplace', IncludeReplace);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function InputSearchFilterController() {
        var ctrl = this;
        function change() {
            ctrl.onFilterChange({ queryString: ctrl.queryString });
        }
        function clear() {
            ctrl.queryString = '';
            change();
        }
        function onChanges(changesObj) {
            if (changesObj.taxonomyName) {
                var updateQueryString = false;
                ctrl.taxonomiesQuery.forEach(function (taxonomy) {
                    if (taxonomy.name === ctrl.taxonomyName && taxonomy.queryString) {
                        ctrl.queryString = taxonomy.queryString;
                        updateQueryString = true;
                    }
                });
                if (!updateQueryString) {
                    ctrl.queryString = '';
                }
            }
        }
        ctrl.$onChanges = onChanges;
        ctrl.change = change;
        ctrl.clear = clear;
    }
    ngObibaMica.search
        .component('inputSearchFilter', {
        transclude: true,
        bindings: {
            taxonomiesQuery: '<',
            taxonomyName: '<',
            queryString: '<',
            onFilterChange: '&'
        },
        templateUrl: 'search/components/input-search-filter/component.html',
        controller: [InputSearchFilterController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function Controller() {
        var ctrl = this;
        function selectTaxonomy(taxonomy) {
            ctrl.onSelectTaxonomy({ target: ctrl.metaTaxonomy.name, taxonomy: taxonomy });
        }
        function getEntityType() {
            return targetToType(ctrl.metaTaxonomy.name);
        }
        function init() {
            ctrl.entityType = getEntityType();
        }
        ctrl.status = { isFirstOpen: true };
        ctrl.selectTaxonomy = selectTaxonomy;
        ctrl.$onInit = init;
    }
    ngObibaMica.search
        .component('metaTaxonomyFilterList', {
        transclude: true,
        bindings: {
            metaTaxonomy: '<',
            showTaxonomyPanel: '<',
            rqlQuery: '<',
            onSelectTaxonomy: '&'
        },
        templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html',
        controller: Controller
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function Controller(MetaTaxonomyService, TaxonomyService) {
        var ctrl = this;
        /**
         * Retrieves all meta taxonomies
         */
        function init() {
            MetaTaxonomyService.getMetaTaxonomyForTargets(ctrl.tabs).then(function (metaTaxonomies) {
                ctrl.metaTaxonomies = metaTaxonomies;
            });
        }
        function onSelectTaxonomy(target, selectedTaxonomy) {
            if (ctrl.selectedTaxonomy !== selectedTaxonomy) {
                if (ctrl.selectedTaxonomy) {
                    ctrl.selectedTaxonomy.state.inactive();
                }
                ctrl.selectedTaxonomy = selectedTaxonomy;
                ctrl.selectedTaxonomy.state.active();
                ctrl.selectedTaxonomy.state.loading();
                // enough delay for UI rendering
                setTimeout(function () {
                    TaxonomyService.getTaxonomies(target, selectedTaxonomy.info.names || selectedTaxonomy.info.name)
                        .then(function (taxonomy) {
                        ctrl.selectedTaxonomy.state.loaded();
                        ctrl.onToggle({ target: target, taxonomy: taxonomy });
                    });
                });
            }
            else {
                ctrl.selectedTaxonomy.state.none();
                ctrl.selectedTaxonomy = null;
                ctrl.onToggle({ target: target, taxonomy: ctrl.selectedTaxonomy });
            }
        }
        function onChanges(changed) {
            if (ctrl.selectedTaxonomy && changed.showTaxonomyPanel && changed.showTaxonomyPanel.currentValue !== true) {
                ctrl.selectedTaxonomy.state.none();
                ctrl.selectedTaxonomy = null;
            }
        }
        ctrl.selectedTaxonomy = null;
        ctrl.onSelectTaxonomy = onSelectTaxonomy;
        ctrl.$onChanges = onChanges;
        ctrl.$onInit = init;
    }
    ngObibaMica.search
        .component('metaTaxonomyFilterPanel', {
        bindings: {
            tabs: '<',
            showTaxonomyPanel: '<',
            onToggle: '&',
            rqlQuery: '<'
        },
        templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html',
        controller: ['MetaTaxonomyService', 'TaxonomyService', Controller]
    });
})();
//# sourceMappingURL=component.js.map
'use strict';
/**
   * Base controller for taxonomies and classification panels.
   *
   * @param $scope
   * @param $location
   * @param TaxonomyResource
   * @param TaxonomiesResource
   * @param ngObibaMicaSearch
   * @constructor
   */
/* exported BaseTaxonomiesController */
function BaseTaxonomiesController($rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, VocabularyService) {
    $scope.options = ngObibaMicaSearch.getOptions();
    $scope.RqlQueryUtils = RqlQueryUtils;
    $scope.metaTaxonomy = TaxonomyResource.get({
        target: 'taxonomy',
        taxonomy: 'Mica_taxonomy'
    });
    $scope.taxonomies = {
        all: [],
        search: {
            text: null,
            active: false
        },
        target: $scope.target || 'variable',
        taxonomy: null,
        vocabulary: null
    };
    $rootScope.$on('$translateChangeSuccess', function () {
        if ($scope.taxonomies && $scope.taxonomies.vocabulary) {
            VocabularyService.sortVocabularyTerms($scope.taxonomies.vocabulary, $translate.use());
        }
    });
    // vocabulary (or term) will appear in navigation iff it doesn't have the 'showNavigate' attribute
    $scope.canNavigate = function (vocabulary) {
        if ($scope.options.hideNavigate.indexOf(vocabulary.name) > -1) {
            return false;
        }
        return (vocabulary.attributes || []).filter(function (attr) { return attr.key === 'showNavigate'; }).length === 0;
    };
    this.navigateTaxonomy = function (taxonomy, vocabulary, term) {
        $scope.taxonomies.term = term;
        if ($scope.isHistoryEnabled) {
            var search = $location.search();
            search.taxonomy = taxonomy ? taxonomy.name : null;
            if (vocabulary && search.vocabulary !== vocabulary.name) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
                search.vocabulary = vocabulary.name;
            }
            else {
                search.vocabulary = null;
            }
            $location.search(search);
        }
        else {
            $scope.taxonomies.taxonomy = taxonomy;
            if (!$scope.taxonomies.vocabulary || $scope.taxonomies.vocabulary.name !== vocabulary.name) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
            }
            $scope.taxonomies.vocabulary = vocabulary;
        }
    };
    this.updateStateFromLocation = function () {
        var search = $location.search();
        var taxonomyName = search.taxonomy, vocabularyName = search.vocabulary, taxonomy = null, vocabulary = null;
        if (!$scope.taxonomies.all) {
            return;
        }
        $scope.taxonomies.all.forEach(function (t) {
            if (t.name === taxonomyName) {
                taxonomy = t;
                t.vocabularies.forEach(function (v) {
                    if (v.name === vocabularyName) {
                        vocabulary = v;
                    }
                });
            }
        });
        if (!angular.equals($scope.taxonomies.taxonomy, taxonomy) || !angular.equals($scope.taxonomies.vocabulary, vocabulary)) {
            $scope.taxonomies.taxonomy = taxonomy;
            if (vocabulary) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
            }
            $scope.taxonomies.vocabulary = vocabulary;
        }
    };
    this.selectTerm = function (target, taxonomy, vocabulary, args) {
        $scope.onSelectTerm(target, taxonomy, vocabulary, args);
    };
    this.clearCache = function () {
        var taxonomyResourceCache = $cacheFactory.get('taxonomyResource');
        if (taxonomyResourceCache) {
            taxonomyResourceCache.removeAll();
        }
    };
    var self = this;
    $scope.$on('$locationChangeSuccess', function () {
        if ($scope.isHistoryEnabled) {
            self.updateStateFromLocation();
        }
    });
    $scope.$watch('taxonomies.vocabulary', function (value) {
        if (RqlQueryUtils && value) {
            $scope.taxonomies.isNumericVocabulary = VocabularyService.isNumericVocabulary($scope.taxonomies.vocabulary);
            $scope.taxonomies.isMatchVocabulary = VocabularyService.isMatchVocabulary($scope.taxonomies.vocabulary);
        }
        else {
            $scope.taxonomies.isNumericVocabulary = null;
            $scope.taxonomies.isMatchVocabulary = null;
        }
    });
    $scope.navigateTaxonomy = this.navigateTaxonomy;
    $scope.selectTerm = this.selectTerm;
    $scope.clearCache = this.clearCache;
}
//# sourceMappingURL=base.js.map
'use strict';
/* global BaseTaxonomiesController */
(function () {
    /**
    * ClassificationPanelController
    *
    * @param $rootScope
    * @param $scope
    * @param $translate
    * @param $location
    * @param TaxonomyResource
    * @param TaxonomiesResource
    * @param ngObibaMicaSearch
    * @param RqlQueryUtils
    * @param $cacheFactory
    * @param VocabularyService
    * @constructor
    */
    function ClassificationPanelController($rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, VocabularyService) {
        BaseTaxonomiesController.call(this, $rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, VocabularyService);
        var groupTaxonomies = function (taxonomies, target) {
            var res = taxonomies.reduce(function (res, t) {
                if (target) {
                    t.vocabularies = VocabularyService.visibleVocabularies(t.vocabularies);
                    res[t.name] = t;
                    return res;
                }
            }, {});
            return $scope.metaTaxonomy.$promise.then(function (metaTaxonomy) {
                var targetVocabulary = metaTaxonomy.vocabularies.filter(function (v) {
                    return v.name === target;
                })[0];
                $scope.taxonomyGroups = targetVocabulary.terms.map(function (v) {
                    if (!v.terms) {
                        var taxonomy = res[v.name];
                        if (!taxonomy) {
                            return null;
                        }
                        taxonomy.title = v.title;
                        taxonomy.description = v.description;
                        return { title: null, taxonomies: [taxonomy] };
                    }
                    var taxonomies = v.terms.map(function (t) {
                        var taxonomy = res[t.name];
                        if (!taxonomy) {
                            return null;
                        }
                        taxonomy.title = t.title;
                        taxonomy.description = t.description;
                        return taxonomy;
                    }).filter(function (t) {
                        return t;
                    });
                    var title = v.title.filter(function (t) {
                        return t.locale === $scope.lang;
                    })[0];
                    var description = v.description ? v.description.filter(function (t) {
                        return t.locale === $scope.lang;
                    })[0] : undefined;
                    return {
                        title: title ? title.text : null,
                        description: description ? description.text : null,
                        taxonomies: taxonomies
                    };
                }).filter(function (t) {
                    return t;
                });
            });
        };
        var self = this;
        function getClassificationTaxonomies() {
            TaxonomiesResource.get({
                target: $scope.taxonomies.target
            }, function onSuccess(taxonomies) {
                $scope.taxonomies.all = taxonomies;
                groupTaxonomies(taxonomies, $scope.taxonomies.target);
                $scope.taxonomies.search.active = false;
                self.updateStateFromLocation();
            });
        }
        $scope.$watch('target', function (newVal) {
            if (newVal) {
                $scope.taxonomies.target = newVal;
                $scope.taxonomies.search.active = true;
                $scope.taxonomies.all = null;
                $scope.taxonomies.taxonomy = null;
                $scope.taxonomies.vocabulary = null;
                $scope.taxonomies.term = null;
                getClassificationTaxonomies();
            }
        });
        this.refreshTaxonomyCache = function () {
            $scope.clearCache();
            getClassificationTaxonomies();
        };
        $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
    }
    ngObibaMica.search
        .controller('ClassificationPanelController', ['$rootScope',
        '$scope',
        '$translate',
        '$location',
        'TaxonomyResource',
        'TaxonomiesResource',
        'ngObibaMicaSearch',
        'RqlQueryUtils',
        '$cacheFactory',
        'VocabularyService',
        ClassificationPanelController])
        .directive('classificationsPanel', [function () {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    target: '=',
                    onSelectTerm: '=',
                    isHistoryEnabled: '=',
                    lang: '='
                },
                controller: 'ClassificationPanelController',
                templateUrl: 'search/components/panel/classification/component.html'
            };
        }]);
})();
//# sourceMappingURL=component.js.map
'use strict';
/* global BaseTaxonomiesController */
(function () {
    /**
    * TaxonomiesPanelController
    *
    * @param $rootScope
    * @param $scope
    * @param $translate
    * @param $location
    * @param TaxonomyResource
    * @param TaxonomiesResource
    * @param ngObibaMicaSearch
    * @param RqlQueryUtils
    * @param $cacheFactory
    * @param AlertService
    * @param ServerErrorUtils
    * @constructor
    */
    function TaxonomiesPanelController($rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, AlertService, ServerErrorUtils, VocabularyService) {
        BaseTaxonomiesController.call(this, $rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, VocabularyService);
        function getPanelTaxonomies(target, taxonomyName) {
            TaxonomyResource.get({
                target: target,
                taxonomy: taxonomyName
            }, function onSuccess(response) {
                $scope.taxonomies.taxonomy = response;
                $scope.taxonomies.vocabulary = null;
                $scope.taxonomies.term = null;
                $scope.taxonomies.search.active = false;
            }, function onError(response) {
                $scope.taxonomies.search.active = false;
                AlertService.alert({
                    id: 'SearchController',
                    type: 'danger',
                    msg: ServerErrorUtils.buildMessage(response),
                    delay: 5000
                });
            });
        }
        $scope.$watchGroup(['taxonomyName', 'target'], function (newVal) {
            if (newVal[0] && newVal[1]) {
                if ($scope.showTaxonomies) {
                    $scope.showTaxonomies();
                }
                $scope.taxonomies.target = newVal[1];
                $scope.taxonomies.search.active = true;
                $scope.taxonomies.all = null;
                $scope.taxonomies.taxonomy = null;
                $scope.taxonomies.vocabulary = null;
                $scope.taxonomies.term = null;
                getPanelTaxonomies(newVal[1], newVal[0]);
            }
        });
        this.refreshTaxonomyCache = function (target, taxonomyName) {
            $scope.clearCache();
            getPanelTaxonomies(target, taxonomyName);
        };
        $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
    }
    ngObibaMica.search
        .controller('TaxonomiesPanelController', ['$rootScope',
        '$scope',
        '$translate',
        '$location',
        'TaxonomyResource',
        'TaxonomiesResource',
        'ngObibaMicaSearch',
        'RqlQueryUtils',
        '$cacheFactory',
        'AlertService',
        'ServerErrorUtils',
        'VocabularyService',
        TaxonomiesPanelController])
        .controller('NumericVocabularyPanelController', ['$scope', function ($scope) {
            $scope.$watch('taxonomies', function () {
                $scope.from = null;
                $scope.to = null;
            }, true);
        }])
        .controller('MatchVocabularyPanelController', ['$scope', function ($scope) {
            $scope.$watch('taxonomies', function () {
                $scope.text = null;
            }, true);
        }])
        .directive('taxonomiesPanel', [function () {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    taxonomyName: '=',
                    target: '=',
                    onClose: '=',
                    onSelectTerm: '=',
                    taxonomiesShown: '=',
                    lang: '='
                },
                controller: 'TaxonomiesPanelController',
                templateUrl: 'search/components/panel/taxonomies-panel/component.html',
                link: function (scope, element) {
                    scope.closeTaxonomies = function () {
                        element.collapse('hide');
                        scope.onClose();
                    };
                    scope.showTaxonomies = function () {
                        element.collapse('show');
                    };
                    element.on('show.bs.collapse', function () {
                        scope.taxonomiesShown = true;
                    });
                    element.on('hide.bs.collapse', function () {
                        scope.taxonomiesShown = false;
                    });
                    scope.$watch('taxonomiesShown', function (value) {
                        if (value) {
                            element.collapse('show');
                        }
                        else {
                            element.collapse('hide');
                        }
                    });
                }
            };
        }]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function TaxonomyPanel() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                taxonomy: '=',
                lang: '=',
                onNavigate: '='
            },
            templateUrl: 'search/components/panel/taxonomy-panel/component.html'
        };
    }
    ngObibaMica.search.directive('taxonomyPanel', [TaxonomyPanel]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function TermPanel() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                target: '=',
                taxonomy: '=',
                vocabulary: '=',
                term: '=',
                lang: '=',
                onSelect: '='
            },
            templateUrl: 'search/components/panel/term-panel/component.html'
        };
    }
    ngObibaMica.search.directive('termPanel', [TermPanel]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    ngObibaMica.search.VocabularyPanel = function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                target: '=',
                taxonomy: '=',
                vocabulary: '=',
                lang: '=',
                onNavigate: '=',
                onSelect: '=',
                onHideSearchNavigate: '=',
                isInHideNavigate: '='
            },
            templateUrl: 'search/components/panel/vocabulary-panel/component.html'
        };
    };
    ngObibaMica.search.directive('vocabularyPanel', [ngObibaMica.search.VocabularyPanel]);
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CellStatValueController = /** @class */ (function () {
    function CellStatValueController($log, $location, $httpParamSerializer) {
        this.$log = $log;
        this.$location = $location;
        this.$httpParamSerializer = $httpParamSerializer;
    }
    CellStatValueController.prototype.urlCriteria = function () {
        var that = this;
        that.href = "";
        if (typeof that.updateCriteria() !== "undefined") {
            that.updateCriteria().then(function (urlHref) {
                urlHref.display = "list";
                that.href = window.location.origin + //
                    window.location.pathname + //
                    "/#/search?" + //
                    that.$httpParamSerializer(urlHref);
            });
        }
    };
    CellStatValueController.prototype.$onInit = function () {
        if (this.resultTabOrder.indexOf(this.destinationTab) < 0) {
            this.disable = true;
        }
        this.urlCriteria();
    };
    CellStatValueController.$inject = ["$log", "$location", "$httpParamSerializer"];
    return CellStatValueController;
}());
var CellStatValueComponent = /** @class */ (function () {
    function CellStatValueComponent() {
        this.transclude = true;
        this.bindings = {
            destinationTab: "@",
            entityCount: "<",
            resultTabOrder: "<",
            updateCriteria: "&",
        };
        this.controller = CellStatValueController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "search/components/result/cell-stat-value/component.html";
    }
    return CellStatValueComponent;
}());
ngObibaMica.search
    .component("cellStatValue", new CellStatValueComponent());
//# sourceMappingURL=component.js.map
'use strict';
/* global BUCKET_TYPES */
/* global DISPLAY_TYPES */
ngObibaMica.search
    .controller('CoverageResultTableController', [
    '$scope',
    '$location',
    '$q',
    '$translate',
    '$filter',
    'LocalizedValues',
    'PageUrlService',
    'RqlQueryUtils',
    'RqlQueryService',
    'CoverageGroupByService',
    'StudyFilterShortcutService',
    'TaxonomyService',
    'AlertService',
    function ($scope, $location, $q, $translate, $filter, LocalizedValues, PageUrlService, RqlQueryUtils, RqlQueryService, CoverageGroupByService, StudyFilterShortcutService, TaxonomyService, AlertService) {
        var targetMap = {}, vocabulariesTermsMap = {};
        targetMap[BUCKET_TYPES.NETWORK] = QUERY_TARGETS.NETWORK;
        targetMap[BUCKET_TYPES.STUDY] = QUERY_TARGETS.STUDY;
        targetMap[BUCKET_TYPES.STUDY_INDIVIDUAL] = QUERY_TARGETS.STUDY;
        targetMap[BUCKET_TYPES.STUDY_HARMONIZATION] = QUERY_TARGETS.STUDY;
        targetMap[BUCKET_TYPES.DCE] = QUERY_TARGETS.VARIABLE;
        targetMap[BUCKET_TYPES.DCE_INDIVIDUAL] = QUERY_TARGETS.VARIABLE;
        targetMap[BUCKET_TYPES.DCE_HARMONIZATION] = QUERY_TARGETS.VARIABLE;
        targetMap[BUCKET_TYPES.DATASCHEMA] = QUERY_TARGETS.DATASET;
        targetMap[BUCKET_TYPES.DATASET] = QUERY_TARGETS.DATASET;
        targetMap[BUCKET_TYPES.DATASET_COLLECTED] = QUERY_TARGETS.DATASET;
        targetMap[BUCKET_TYPES.DATASET_HARMONIZED] = QUERY_TARGETS.DATASET;
        function decorateVocabularyHeaders(headers, vocabularyHeaders) {
            var count = 0, i = 0;
            for (var j = 0; j < vocabularyHeaders.length; j++) {
                if (count >= headers[i].termsCount) {
                    i++;
                    count = 0;
                }
                count += vocabularyHeaders[j].termsCount;
                vocabularyHeaders[j].taxonomyName = headers[i].entity.name;
            }
        }
        function decorateTermHeaders(headers, termHeaders, attr) {
            var idx = 0;
            return headers.reduce(function (result, h) {
                result[h.entity.name] = termHeaders.slice(idx, idx + h.termsCount).map(function (t) {
                    if (h.termsCount > 1 && attr === 'vocabularyName') {
                        t.canRemove = true;
                    }
                    t[attr] = h.entity.name;
                    return t;
                });
                idx += h.termsCount;
                return result;
            }, {});
        }
        function dceUpdateBucket(val) {
            if (val) {
                $scope.selectBucket(BUCKET_TYPES.DCE);
            }
            else if ($scope.bucket.startsWith('dce')) {
                $scope.selectBucket(BUCKET_TYPES.STUDY);
            }
        }
        function onDceUpdateBucket(val, old) {
            if (val === old) {
                return;
            }
            dceUpdateBucket(val);
        }
        function setInitialFilter() {
            var result = StudyFilterShortcutService.getStudyClassNameChoices();
            if (result.choseAll) {
                $scope.bucketSelection._studySelection = ngObibaMica.search.STUDY_FILTER_CHOICES.ALL_STUDIES;
            }
            else if (result.choseIndividual) {
                $scope.bucketSelection._studySelection = ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES;
            }
            else if (result.choseHarmonization) {
                $scope.bucketSelection._studySelection = ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES;
            }
            angular.extend($scope, result);
            var bucket = $location.search().bucket;
            if (bucket === BUCKET_TYPES.STUDY || bucket === BUCKET_TYPES.DCE) {
                $scope.bucketSelection._dceBucketSelected = bucket === BUCKET_TYPES.DCE; // don't trigger the watch callback
            }
        }
        function onLocationChange() {
            var search = $location.search();
            if (search.display && search.display === DISPLAY_TYPES.COVERAGE) {
                $scope.bucket = search.bucket ? search.bucket : CoverageGroupByService.defaultBucket();
                $scope.bucketStartsWithDce = $scope.bucket.startsWith('dce');
                $scope.singleStudy = CoverageGroupByService.isSingleStudy();
                setInitialFilter();
            }
        }
        function updateBucket(groupBy) {
            if ($scope.groupByOptions.canShowVariableTypeFilter(groupBy)) {
                $scope.selectBucket(groupBy);
            }
            else if (BUCKET_TYPES.STUDY !== groupBy) {
                $scope.selectBucket(BUCKET_TYPES.DCE);
            }
        }
        function dsUpdateBucket(groupBy) {
            $scope.selectBucket(groupBy);
        }
        function isStudyBucket() {
            return $scope.bucket.indexOf('study') > -1 || $scope.bucket.indexOf('dce') > -1;
        }
        function isDatasetBucket() {
            return $scope.bucket.indexOf('dataset') > -1;
        }
        function selectTab(tab) {
            if (tab === BUCKET_TYPES.STUDY) {
                updateBucket(($scope.bucketSelection.dceBucketSelected || $scope.groupByOptions.isSingleStudy()) ? BUCKET_TYPES.DCE : BUCKET_TYPES.STUDY);
            }
            else if (tab === BUCKET_TYPES.DATASET) {
                dsUpdateBucket(BUCKET_TYPES.DATASET);
            }
        }
        function getBucketUrl(bucket, id) {
            switch (bucket) {
                case BUCKET_TYPES.STUDY:
                case BUCKET_TYPES.STUDY_INDIVIDUAL:
                case BUCKET_TYPES.DCE:
                case BUCKET_TYPES.DCE_INDIVIDUAL:
                    return PageUrlService.studyPage(id, 'individual');
                case BUCKET_TYPES.STUDY_HARMONIZATION:
                case BUCKET_TYPES.DCE_HARMONIZATION:
                    return PageUrlService.studyPage(id, 'harmonization');
                case BUCKET_TYPES.NETWORK:
                    return PageUrlService.networkPage(id);
                case BUCKET_TYPES.DATASCHEMA:
                case BUCKET_TYPES.DATASET_HARMONIZED:
                    return PageUrlService.datasetPage(id, 'harmonized');
                case BUCKET_TYPES.DATASET:
                case BUCKET_TYPES.DATASET_COLLECTED:
                    return PageUrlService.datasetPage(id, 'collected');
            }
            return '';
        }
        function updateFilterCriteriaInternal(selected) {
            var vocabulary = $scope.bucket.startsWith('dce') ? 'dceId' : 'id';
            var growlMsgKey = 'search.criterion.created';
            var rqlQuery = RqlQueryService.parseQuery($location.search().query);
            var targetQuery = RqlQueryService.findTargetQuery(targetMap[$scope.bucket], rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(targetMap[$scope.bucket]);
                rqlQuery.args.push(targetQuery);
            }
            var foundVocabularyQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, vocabulary);
            var vocabularyQuery;
            if (foundVocabularyQuery) {
                growlMsgKey = 'search.criterion.updated';
                vocabularyQuery = foundVocabularyQuery;
                if (vocabularyQuery.name === RQL_NODE.EXISTS) {
                    vocabularyQuery.name = RQL_NODE.IN;
                }
            }
            else {
                vocabularyQuery = new RqlQuery(RQL_NODE.IN);
            }
            vocabularyQuery.args = ['Mica_' + targetMap[$scope.bucket] + '.' + vocabulary];
            vocabularyQuery.args.push(selected.map(function (selection) { return selection.value; }));
            if (!foundVocabularyQuery) {
                if (targetQuery.args.length > 0) {
                    var andQuery = new RqlQuery(RQL_NODE.AND);
                    targetQuery.args.forEach(function (arg) { andQuery.args.push(arg); });
                    andQuery.args.push(vocabularyQuery);
                    targetQuery.args = [andQuery];
                }
                else {
                    targetQuery.args = [vocabularyQuery];
                }
            }
            $location.search('query', new RqlQuery().serializeArgs(rqlQuery.args));
            TaxonomyService.findVocabularyInTaxonomy(targetMap[$scope.bucket], 'Mica_' + targetMap[$scope.bucket], vocabulary)
                .then(function (foundVocabulary) {
                AlertService.growl({
                    id: 'SearchControllerGrowl',
                    type: 'info',
                    msgKey: growlMsgKey,
                    msgArgs: [foundVocabulary ?
                            LocalizedValues.forLocale(foundVocabulary.title, $translate.use()) :
                            vocabulary, $filter('translate')('taxonomy.target.' + targetMap[$scope.bucket])],
                    delay: 3000
                });
            });
        }
        function splitIds() {
            var cols = {
                colSpan: $scope.bucket.startsWith('dce') ? (CoverageGroupByService.isSingleStudy() ? 2 : 3) : 1,
                ids: {}
            };
            var rowSpans = {};
            function appendRowSpan(id) {
                var rowSpan;
                if (!rowSpans[id]) {
                    rowSpan = 1;
                    rowSpans[id] = 1;
                }
                else {
                    rowSpan = 0;
                    rowSpans[id] = rowSpans[id] + 1;
                }
                return rowSpan;
            }
            var minMax = {};
            function appendMinMax(id, start, end) {
                if (minMax[id]) {
                    if (start < minMax[id][0]) {
                        minMax[id][0] = start;
                    }
                    if (end > minMax[id][1]) {
                        minMax[id][1] = end;
                    }
                }
                else {
                    minMax[id] = [start, end];
                }
            }
            function toTime(yearMonth, start) {
                var res;
                if (yearMonth) {
                    if (yearMonth.indexOf('-') > 0) {
                        var ym = yearMonth.split('-');
                        if (!start) {
                            var m = parseInt(ym[1]);
                            if (m < 12) {
                                ym[1] = m + 1;
                            }
                            else {
                                ym[0] = parseInt(ym[0]) + 1;
                                ym[1] = 1;
                            }
                        }
                        var ymStr = ym[0] + '/' + ym[1] + '/01';
                        res = Date.parse(ymStr);
                    }
                    else {
                        res = start ? Date.parse(yearMonth + '/01/01') : Date.parse(yearMonth + '/12/31');
                    }
                }
                return res;
            }
            var currentYear = new Date().getFullYear();
            var currentMonth = new Date().getMonth() + 1;
            var currentYearMonth = currentYear + '-' + currentMonth;
            var currentDate = toTime(currentYearMonth, true);
            function getProgress(startYearMonth, endYearMonth) {
                var start = toTime(startYearMonth, true);
                var end = endYearMonth ? toTime(endYearMonth, false) : currentDate;
                var current = end < currentDate ? end : currentDate;
                if (end === start) {
                    return 100;
                }
                else {
                    return Math.round(startYearMonth ? 100 * (current - start) / (end - start) : 0);
                }
            }
            var odd = true;
            var groupId;
            $scope.result.rows.forEach(function (row, i) {
                row.hitsTitles = row.hits.map(function (hit) {
                    return LocalizedValues.formatNumber(hit);
                });
                cols.ids[row.value] = [];
                if ($scope.bucket.startsWith('dce')) {
                    var ids = row.value.split(':');
                    var isHarmo = row.className.indexOf('Harmonization') > -1 || ids[2] === '.'; // would work for both HarmonizationDataset and HarmonizationStudy
                    var titles = row.title.split(':');
                    var descriptions = row.description.split(':');
                    var rowSpan;
                    var id;
                    // study
                    id = ids[0];
                    if (!groupId) {
                        groupId = id;
                    }
                    else if (id !== groupId) {
                        odd = !odd;
                        groupId = id;
                    }
                    rowSpan = appendRowSpan(id);
                    appendMinMax(id, row.start || currentYearMonth, row.end || currentYearMonth);
                    cols.ids[row.value].push({
                        id: CoverageGroupByService.isSingleStudy() ? '-' : id,
                        url: PageUrlService.studyPage(id, isHarmo ? 'harmonization' : 'individual'),
                        title: titles[0],
                        description: descriptions[0],
                        rowSpan: rowSpan,
                        index: i++
                    });
                    // population
                    id = ids[0] + ':' + ids[1];
                    rowSpan = appendRowSpan(id);
                    cols.ids[row.value].push({
                        id: id,
                        url: PageUrlService.studyPopulationPage(ids[0], isHarmo ? 'harmonization' : 'individual', ids[1]),
                        title: titles[1],
                        description: descriptions[1],
                        rowSpan: rowSpan,
                        index: i++
                    });
                    // dce
                    cols.ids[row.value].push({
                        id: isHarmo ? '-' : row.value,
                        title: titles[2],
                        description: descriptions[2],
                        start: row.start,
                        current: currentYearMonth,
                        end: row.end,
                        progressClass: odd ? 'info' : 'warning',
                        url: PageUrlService.studyPopulationPage(ids[0], isHarmo ? 'harmonization' : 'individual', ids[1]),
                        rowSpan: 1,
                        index: i++
                    });
                }
                else {
                    var parts = $scope.bucket.split('-');
                    var itemBucket = parts[0];
                    if (itemBucket === BUCKET_TYPES.DATASET) {
                        itemBucket = itemBucket + (row.className.indexOf('Harmonization') > -1 ? '-harmonized' : '-collected');
                    }
                    else {
                        itemBucket = itemBucket + (row.className.indexOf('Harmonization') > -1 ? '-harmonization' : '-individual');
                    }
                    cols.ids[row.value].push({
                        id: row.value,
                        url: getBucketUrl(itemBucket, row.value),
                        title: row.title,
                        description: row.description,
                        min: row.start,
                        start: row.start,
                        current: currentYear,
                        end: row.end,
                        max: row.end,
                        progressStart: 0,
                        progress: getProgress(row.start ? row.start + '-01' : currentYearMonth, row.end ? row.end + '-12' : currentYearMonth),
                        progressClass: odd ? 'info' : 'warning',
                        rowSpan: 1,
                        index: i++
                    });
                    odd = !odd;
                }
            });
            // adjust the rowspans and the progress
            if ($scope.bucket.startsWith('dce')) {
                $scope.result.rows.forEach(function (row, i) {
                    row.hitsTitles = row.hits.map(function (hit) {
                        return LocalizedValues.formatNumber(hit);
                    });
                    if (cols.ids[row.value][0].rowSpan > 0) {
                        cols.ids[row.value][0].rowSpan = rowSpans[cols.ids[row.value][0].id];
                    }
                    if (cols.ids[row.value][1].rowSpan > 0) {
                        cols.ids[row.value][1].rowSpan = rowSpans[cols.ids[row.value][1].id];
                    }
                    var ids = row.value.split(':');
                    if (minMax[ids[0]]) {
                        var min = minMax[ids[0]][0];
                        var max = minMax[ids[0]][1];
                        var start = cols.ids[row.value][2].start || currentYearMonth;
                        var end = cols.ids[row.value][2].end || currentYearMonth;
                        var diff = toTime(max, false) - toTime(min, true);
                        // set the DCE min and max dates of the study
                        cols.ids[row.value][2].min = min;
                        cols.ids[row.value][2].max = max;
                        // compute the progress
                        cols.ids[row.value][2].progressStart = 100 * (toTime(start, true) - toTime(min, true)) / diff;
                        cols.ids[row.value][2].progress = 100 * (toTime(end, false) - toTime(start, true)) / diff;
                        cols.ids[row.value].index = i;
                    }
                });
            }
            return cols;
        }
        function mergeCriteriaItems(criteria) {
            return criteria.reduce(function (prev, item) {
                if (prev) {
                    RqlQueryService.updateCriteriaItem(prev, item);
                    return prev;
                }
                item.rqlQuery = RqlQueryUtils.buildRqlQuery(item); // TODO
                return item;
            }, null);
        }
        function updateStudyClassNameFilter(choice) {
            StudyFilterShortcutService.filter(choice, $scope.lang);
        }
        function init() {
            onLocationChange();
        }
        $scope.showMissing = true;
        $scope.toggleMissing = function (value) {
            $scope.showMissing = value;
        };
        $scope.groupByOptions = CoverageGroupByService;
        $scope.bucketSelection = {
            get studySelection() {
                return this._studySelection;
            },
            set studySelection(value) {
                this._studySelection = value;
                if (!$scope.bucket || ($scope.bucket && ($scope.bucket.indexOf(BUCKET_TYPES.STUDY) > -1 || $scope.bucket.indexOf(BUCKET_TYPES.DCE) > -1))) {
                    updateBucket($scope.bucket.split('-')[0]);
                }
                else if ($scope.bucket && $scope.bucket.indexOf(BUCKET_TYPES.DATASET) > -1) {
                    dsUpdateBucket($scope.bucket.split('-')[0]);
                }
                updateStudyClassNameFilter(value);
            },
            get dceBucketSelected() {
                return this._dceBucketSelected;
            },
            set dceBucketSelected(value) {
                var oldValue = this._dceBucketSelected;
                this._dceBucketSelected = value;
                onDceUpdateBucket(value, oldValue);
            }
        };
        $scope.isStudyBucket = isStudyBucket;
        $scope.isDatasetBucket = isDatasetBucket;
        $scope.selectTab = selectTab;
        $scope.selectBucket = function (bucket) {
            $scope.bucket = bucket;
            $scope.$parent.onBucketChanged(bucket);
        };
        $scope.$on('$locationChangeSuccess', onLocationChange);
        $scope.rowspans = {};
        $scope.getSpan = function (study, population) {
            var length = 0;
            if (population) {
                var prefix = study + ':' + population;
                length = $scope.result.rows.filter(function (row) {
                    return row.title.startsWith(prefix + ':');
                }).length;
                $scope.rowspans[prefix] = length;
                return length;
            }
            else {
                length = $scope.result.rows.filter(function (row) {
                    return row.title.startsWith(study + ':');
                }).length;
                $scope.rowspans[study] = length;
                return length;
            }
        };
        $scope.hasSpan = function (study, population) {
            if (population) {
                return $scope.rowspans[study + ':' + population] > 0;
            }
            else {
                return $scope.rowspans[study] > 0;
            }
        };
        $scope.hasVariableTarget = function () {
            var query = $location.search().query;
            return query && RqlQueryUtils.hasTargetQuery(RqlQueryService.parseQuery(query), RQL_NODE.VARIABLE);
        };
        $scope.hasSelected = function () {
            return $scope.table && $scope.table.rows && $scope.table.rows.filter(function (r) {
                return r.selected;
            }).length;
        };
        $scope.selectAll = function () {
            if ($scope.table && $scope.table.rows) {
                $scope.table.rows.forEach(function (r) {
                    r.selected = true;
                });
            }
        };
        $scope.selectNone = function () {
            if ($scope.table && $scope.table.rows) {
                $scope.table.rows.forEach(function (r) {
                    r.selected = false;
                });
            }
        };
        $scope.selectFull = function () {
            if ($scope.table && $scope.table.rows) {
                $scope.table.rows.forEach(function (r) {
                    if (r.hits) {
                        r.selected = r.hits.filter(function (h) {
                            return h === 0;
                        }).length === 0;
                    }
                    else {
                        r.selected = false;
                    }
                });
            }
        };
        $scope.BUCKET_TYPES = BUCKET_TYPES;
        $scope.downloadUrl = function () {
            return PageUrlService.downloadCoverage($scope.query);
        };
        $scope.$watch('result', function () {
            $scope.table = { cols: [] };
            vocabulariesTermsMap = {};
            if ($scope.result && $scope.result.rows) {
                var tableTmp = $scope.result;
                tableTmp.cols = splitIds();
                $scope.table = tableTmp;
                vocabulariesTermsMap = decorateTermHeaders($scope.table.vocabularyHeaders, $scope.table.termHeaders, 'vocabularyName');
                decorateTermHeaders($scope.table.taxonomyHeaders, $scope.table.termHeaders, 'taxonomyName');
                decorateVocabularyHeaders($scope.table.taxonomyHeaders, $scope.table.vocabularyHeaders);
            }
        });
        $scope.updateCriteria = function (id, term, idx, type) {
            var vocabulary = $scope.bucket.startsWith('dce') ? 'dceId' : 'id';
            var criteria = { varItem: RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, term.taxonomyName, term.vocabularyName, term.entity.name) };
            // if id is null, it is a click on the total count for the term
            if (id) {
                var groupBy = $scope.bucket.split('-')[0];
                if (groupBy === 'dce' && id.endsWith(':.')) {
                    groupBy = 'study';
                    var studyId = id.split(':')[0];
                    criteria.item = RqlQueryService.createCriteriaItem(targetMap[groupBy], 'Mica_' + targetMap[groupBy], 'id', studyId);
                }
                else {
                    criteria.item = RqlQueryService.createCriteriaItem(targetMap[groupBy], 'Mica_' + targetMap[groupBy], vocabulary, id);
                }
            }
            else if ($scope.bucket.endsWith('individual')) {
                criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.STUDY, 'Mica_' + QUERY_TARGETS.STUDY, 'className', 'Study');
            }
            else if ($scope.bucket.endsWith('harmonization')) {
                criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.STUDY, 'Mica_' + QUERY_TARGETS.STUDY, 'className', 'HarmonizationStudy');
            }
            else if ($scope.bucket.endsWith('collected')) {
                criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.DATASET, 'Mica_' + QUERY_TARGETS.DATASET, 'className', 'StudyDataset');
            }
            else if ($scope.bucket.endsWith('harmonized')) {
                criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.DATASET, 'Mica_' + QUERY_TARGETS.DATASET, 'className', 'HarmonizationDataset');
            }
            $q.all(criteria).then(function (criteria) {
                $scope.onUpdateCriteria(criteria.varItem, type, false, true);
                if (criteria.item) {
                    $scope.onUpdateCriteria(criteria.item, type);
                }
                if (criteria.bucketItem) {
                    $scope.onUpdateCriteria(criteria.bucketItem, type);
                }
            });
        };
        $scope.isFullCoverageImpossibleOrCoverageAlreadyFull = function () {
            var rows = $scope.table ? ($scope.table.rows || []) : [];
            var rowsWithZeroHitColumn = 0;
            if (rows.length === 0) {
                return true;
            }
            rows.forEach(function (row) {
                if (row.hits) {
                    if (row.hits.filter(function (hit) { return hit === 0; }).length > 0) {
                        rowsWithZeroHitColumn++;
                    }
                }
            });
            if (rowsWithZeroHitColumn === 0) {
                return true;
            }
            return rows.length === rowsWithZeroHitColumn;
        };
        $scope.selectFullAndFilter = function () {
            var selected = [];
            if ($scope.table && $scope.table.rows) {
                $scope.table.rows.forEach(function (r) {
                    if (r.hits) {
                        if (r.hits.filter(function (h) {
                            return h === 0;
                        }).length === 0) {
                            selected.push(r);
                        }
                    }
                });
            }
            updateFilterCriteriaInternal(selected, true);
        };
        $scope.updateFilterCriteria = function () {
            updateFilterCriteriaInternal($scope.table.rows.filter(function (r) {
                return r.selected;
            }));
        };
        $scope.removeTerm = function (term) {
            var remainingCriteriaItems = vocabulariesTermsMap[term.vocabularyName].filter(function (t) {
                return t.entity.name !== term.entity.name;
            }).map(function (t) {
                return RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, t.taxonomyName, t.vocabularyName, t.entity.name);
            });
            $q.all(remainingCriteriaItems).then(function (criteriaItems) {
                $scope.onUpdateCriteria(mergeCriteriaItems(criteriaItems), null, true, false, false);
            });
        };
        $scope.removeVocabulary = function (vocabulary) {
            RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, vocabulary.taxonomyName, vocabulary.entity.name).then(function (item) {
                $scope.onRemoveCriteria(item);
            });
        };
        init();
    }
])
    .directive('coverageResultTable', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                result: '=',
                loading: '=',
                bucket: '=',
                query: '=',
                criteria: '=',
                onUpdateCriteria: '=',
                onRemoveCriteria: '='
            },
            controller: 'CoverageResultTableController',
            templateUrl: 'search/components/result/coverage-result/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
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
(function () {
    function DatasetsResultTable($log, PageUrlService, ngObibaMicaSearch, TaxonomyResource, RqlQueryService, ngObibaMicaSearchTemplateUrl) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                lang: '=',
                summaries: '=',
                loading: '=',
                onUpdateCriteria: '='
            },
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchDatasetsResultTable'),
            link: function (scope) {
                scope.classNames = {};
                TaxonomyResource.get({
                    target: 'dataset',
                    taxonomy: 'Mica_dataset'
                }).$promise.then(function (taxonomy) {
                    if (taxonomy.vocabularies) {
                        scope.classNames = taxonomy.vocabularies.filter(function (v) {
                            return v.name === 'className';
                        })[0].terms.reduce(function (prev, t) {
                            prev[t.name] = t.title.map(function (t) {
                                return { lang: t.locale, value: t.text };
                            });
                            return prev;
                        }, {});
                    }
                    else {
                        $log.warn('Taxonomy has no vocabularies');
                    }
                });
                scope.updateCriteria = function (id, type) {
                    RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'id', id).then(function (item) {
                        scope.onUpdateCriteria(item, type);
                    });
                };
                var options = ngObibaMicaSearch.getOptions();
                scope.options = options.datasets;
                scope.resultTabOrder = options.resultTabsOrder;
                scope.optionsCols = scope.options.datasetsColumn;
                scope.PageUrlService = PageUrlService;
            }
        };
    }
    ngObibaMica.search.directive('datasetsResultTable', [
        '$log',
        'PageUrlService',
        'ngObibaMicaSearch',
        'TaxonomyResource',
        'RqlQueryService',
        'ngObibaMicaSearchTemplateUrl',
        DatasetsResultTable
    ]);
})();
//# sourceMappingURL=component.js.map
'use strict';
ngObibaMica.search
    .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'RqlQueryService',
    '$filter',
    '$scope',
    'D3GeoConfig',
    'D3ChartConfig',
    function (GraphicChartsConfig, GraphicChartsUtils, RqlQueryService, $filter, $scope, D3GeoConfig, D3ChartConfig) {
        $scope.hasChartObjects = function () {
            return $scope.chartObjects && Object.keys($scope.chartObjects).length > 0;
        };
        var setChartObject = function (vocabulary, dtoObject, header, title, options, isTable) {
            return GraphicChartsUtils.getArrayByAggregation(vocabulary, dtoObject)
                .then(function (entries) {
                var data = entries.map(function (e) {
                    if (e.participantsNbr && isTable) {
                        return [e.title, e.value, e.participantsNbr];
                    }
                    else {
                        return [e.title, e.value];
                    }
                });
                if (data.length > 0) {
                    data.unshift(header);
                    angular.extend(options, { title: title });
                    return {
                        data: data,
                        entries: entries,
                        options: options,
                        vocabulary: vocabulary
                    };
                }
            });
        };
        var charOptions = GraphicChartsConfig.getOptions().ChartsOptions;
        $scope.updateCriteria = function (key, vocabulary) {
            return RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
                var updateCriteriaReturn = $scope.onUpdateCriteria(item, 'studies', false, false, false, false, true);
                return angular.copy(updateCriteriaReturn);
            });
        };
        $scope.$watch('result', function (result) {
            $scope.chartObjects = {};
            $scope.noResults = true;
            if (result && result.studyResultDto.totalHits) {
                $scope.noResults = false;
                setChartObject('populations-model-selectionCriteria-countriesIso', result.studyResultDto, [$filter('translate')(charOptions.geoChartOptions.header[0]), $filter('translate')(charOptions.geoChartOptions.header[1])], $filter('translate')(charOptions.geoChartOptions.title) + ' (N=' + result.studyResultDto.totalHits + ')', charOptions.geoChartOptions.options).then(function (geoStudies) {
                    if (geoStudies) {
                        var d3Config = new D3GeoConfig()
                            .withData(geoStudies.entries)
                            .withTitle($filter('translate')(charOptions.geoChartOptions.title) + ' (N=' + result.studyResultDto.totalHits + ')');
                        d3Config.withColor(charOptions.geoChartOptions.options.colors);
                        var chartObject = {
                            geoChartOptions: {
                                directiveTitle: geoStudies.options.title,
                                headerTitle: $filter('translate')('graphics.geo-charts'),
                                chartObject: {
                                    geoTitle: geoStudies.options.title,
                                    options: geoStudies.options,
                                    type: 'GeoChart',
                                    vocabulary: geoStudies.vocabulary,
                                    data: geoStudies.data,
                                    entries: geoStudies.entries,
                                    d3Config: d3Config
                                }
                            }
                        };
                        chartObject.geoChartOptions.getTable = function () {
                            return chartObject.geoChartOptions.chartObject;
                        };
                        angular.extend($scope.chartObjects, chartObject);
                    }
                });
                // Study design chart.
                setChartObject('model-methods-design', result.studyResultDto, [$filter('translate')(charOptions.studiesDesigns.header[0]),
                    $filter('translate')(charOptions.studiesDesigns.header[1])
                ], $filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')', charOptions.studiesDesigns.options).then(function (methodDesignStudies) {
                    if (methodDesignStudies) {
                        var d3Config = new D3ChartConfig(methodDesignStudies.vocabulary)
                            .withType('multiBarHorizontalChart')
                            .withTitle($filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                            .withData(angular.copy(methodDesignStudies.entries), false, $filter('translate')('graphics.nbr-studies'));
                        d3Config.options.chart.showLegend = false;
                        d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                        var chartObject = {
                            studiesDesigns: {
                                //directiveTitle: methodDesignStudies.options.title ,
                                headerTitle: $filter('translate')('graphics.study-design'),
                                chartObject: {
                                    options: methodDesignStudies.options,
                                    type: 'BarChart',
                                    data: methodDesignStudies.data,
                                    vocabulary: methodDesignStudies.vocabulary,
                                    entries: methodDesignStudies.entries,
                                    d3Config: d3Config
                                }
                            }
                        };
                        angular.extend($scope.chartObjects, chartObject);
                    }
                });
                // Study design table.
                setChartObject('model-methods-design', result.studyResultDto, [$filter('translate')(charOptions.studiesDesigns.header[0]),
                    $filter('translate')(charOptions.studiesDesigns.header[1]),
                    $filter('translate')(charOptions.studiesDesigns.header[2])
                ], $filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')', charOptions.studiesDesigns.options, true).then(function (methodDesignStudies) {
                    if (methodDesignStudies) {
                        var chartObject = {
                            chartObjectTable: {
                                options: methodDesignStudies.options,
                                type: 'BarChart',
                                data: methodDesignStudies.data,
                                vocabulary: methodDesignStudies.vocabulary,
                                entries: methodDesignStudies.entries
                            }
                        };
                        chartObject.getTable = function () {
                            return chartObject.chartObjectTable;
                        };
                        angular.extend($scope.chartObjects.studiesDesigns, chartObject);
                    }
                });
                setChartObject('model-numberOfParticipants-participant-number-range', result.studyResultDto, [$filter('translate')(charOptions.numberParticipants.header[0]), $filter('translate')(charOptions.numberParticipants.header[1])], $filter('translate')(charOptions.numberParticipants.title) + ' (N=' + result.studyResultDto.totalHits + ')', charOptions.numberParticipants.options).then(function (numberParticipant) {
                    if (numberParticipant) {
                        var chartConfig = new D3ChartConfig(numberParticipant.vocabulary)
                            .withType('pieChart')
                            .withTitle($filter('translate')(charOptions.numberParticipants.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                            .withData(angular.copy(numberParticipant.entries), true);
                        chartConfig.options.chart.legendPosition = 'right';
                        chartConfig.options.chart.color = charOptions.numberParticipants.options.colors;
                        var chartObject = {
                            numberParticipants: {
                                headerTitle: $filter('translate')('graphics.number-participants'),
                                chartObject: {
                                    options: numberParticipant.options,
                                    type: 'PieChart',
                                    data: numberParticipant.data,
                                    vocabulary: numberParticipant.vocabulary,
                                    entries: numberParticipant.entries,
                                    d3Config: chartConfig
                                }
                            }
                        };
                        chartObject.numberParticipants.getTable = function () {
                            return chartObject.numberParticipants.chartObject;
                        };
                        angular.extend($scope.chartObjects, chartObject);
                    }
                });
                setChartObject('populations-dataCollectionEvents-model-bioSamples', result.studyResultDto, [$filter('translate')(charOptions.biologicalSamples.header[0]), $filter('translate')(charOptions.biologicalSamples.header[1])], $filter('translate')(charOptions.biologicalSamples.title) + ' (N=' + result.studyResultDto.totalHits + ')', charOptions.biologicalSamples.options).then(function (bioSamplesStudies) {
                    if (bioSamplesStudies) {
                        var d3Config = new D3ChartConfig(bioSamplesStudies.vocabulary)
                            .withType('multiBarHorizontalChart')
                            .withTitle($filter('translate')(charOptions.biologicalSamples.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                            .withData(angular.copy(bioSamplesStudies.entries), false, $filter('translate')('graphics.nbr-studies'));
                        d3Config.options.chart.showLegend = false;
                        d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                        var chartObject = {
                            biologicalSamples: {
                                headerTitle: $filter('translate')('graphics.bio-samples'),
                                chartObject: {
                                    options: bioSamplesStudies.options,
                                    type: 'BarChart',
                                    data: bioSamplesStudies.data,
                                    vocabulary: bioSamplesStudies.vocabulary,
                                    entries: bioSamplesStudies.entries,
                                    d3Config: d3Config
                                }
                            }
                        };
                        chartObject.biologicalSamples.getTable = function () {
                            return chartObject.biologicalSamples.chartObject;
                        };
                        angular.extend($scope.chartObjects, chartObject);
                    }
                });
                $scope.resultTabOrder = $scope.resultTabsOrder;
            }
        });
    }
])
    .directive('graphicsResult', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                resultTabsOrder: '=',
                result: '=',
                loading: '=',
                onUpdateCriteria: '='
            },
            controller: 'GraphicsResultController',
            templateUrl: 'search/components/result/graphics-result/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
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
(function () {
    function NetworksResultTable(PageUrlService, ngObibaMicaSearch, RqlQueryService, StudyFilterShortcutService, ngObibaMicaSearchTemplateUrl) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                lang: '=',
                summaries: '=',
                loading: '=',
                onUpdateCriteria: '='
            },
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchNetworksResultTable'),
            link: function (scope) {
                function setInitialStudyFilterSelection() {
                    var result = StudyFilterShortcutService.getStudyClassNameChoices();
                    angular.extend(scope, result); // adds choseAll, choseIndividual and choseHarmonization functions
                    /* jshint bitwise: false */
                    scope.colSpans = {
                        datasets: (scope.optionsCols.showNetworksStudyDatasetColumn & result.choseIndividual) + (scope.optionsCols.showNetworksHarmonizationDatasetColumn & result.choseHarmonization),
                        variables: (scope.optionsCols.showNetworksStudyVariablesColumn & result.choseIndividual) + (scope.optionsCols.showNetworksDataschemaVariablesColumn & result.choseHarmonization)
                    };
                }
                var options = ngObibaMicaSearch.getOptions();
                scope.options = options.networks;
                scope.resultTabOrder = options.resultTabsOrder;
                scope.optionsCols = scope.options.networksColumn;
                scope.PageUrlService = PageUrlService;
                scope.$on('$locationChangeSuccess', function () {
                    setInitialStudyFilterSelection();
                });
                scope.updateCriteria = function (id, type, destinationType) {
                    var datasetClassName;
                    if (type === 'HarmonizationDataset' || type === 'StudyDataset') {
                        datasetClassName = type;
                        type = 'datasets';
                    }
                    var stuydClassName;
                    if (type === 'HarmonizationStudy' || type === 'Study') {
                        stuydClassName = type;
                        type = 'studies';
                    }
                    var variableType;
                    if (type === 'DataschemaVariable' || type === 'CollectedVariable') {
                        variableType = type.replace('Variable', '');
                        type = 'variables';
                    }
                    type = destinationType ? destinationType : type;
                    RqlQueryService.createCriteriaItem('network', 'Mica_network', 'id', id).then(function (item) {
                        if (datasetClassName) {
                            RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'className', datasetClassName).then(function (datasetItem) {
                                scope.onUpdateCriteria(item, type);
                                scope.onUpdateCriteria(datasetItem, type);
                            });
                        }
                        else if (stuydClassName) {
                            RqlQueryService.createCriteriaItem('study', 'Mica_study', 'className', stuydClassName).then(function (studyItem) {
                                scope.onUpdateCriteria(item, type);
                                scope.onUpdateCriteria(studyItem, type);
                            });
                        }
                        else if (variableType) {
                            RqlQueryService.createCriteriaItem('variable', 'Mica_variable', 'variableType', variableType).then(function (variableItem) {
                                scope.onUpdateCriteria(item, type);
                                scope.onUpdateCriteria(variableItem, type);
                            });
                        }
                        else {
                            scope.onUpdateCriteria(item, type);
                        }
                    });
                };
                setInitialStudyFilterSelection();
            }
        };
    }
    ngObibaMica.search.directive('networksResultTable', [
        'PageUrlService',
        'ngObibaMicaSearch',
        'RqlQueryService',
        'StudyFilterShortcutService',
        'ngObibaMicaSearchTemplateUrl',
        NetworksResultTable
    ]);
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var SearchResultPaginationController = /** @class */ (function () {
    function SearchResultPaginationController(PaginationService) {
        this.PaginationService = PaginationService;
        this.preventPageChangeEvent = false;
    }
    SearchResultPaginationController.prototype.onUpdate = function (state, preventPageChangeEvent) {
        this.preventPageChangeEvent = preventPageChangeEvent;
        this.pagination = state;
        this.showPaginationTotal = this.showTotal === true && this.pagination.pageCount > 1;
    };
    SearchResultPaginationController.prototype.pageChanged = function () {
        this.onChange({
            from: (this.pagination.currentPage - 1) * this.pagination.selected.value,
            replace: true === this.preventPageChangeEvent,
            size: this.pagination.selected.value,
            target: this.target,
        });
    };
    SearchResultPaginationController.prototype.pageSizeChanged = function () {
        this.pageChanged();
    };
    SearchResultPaginationController.prototype.$onInit = function () {
        this.PaginationService.registerListener(this.target, this);
    };
    SearchResultPaginationController.$inject = ["PaginationService"];
    return SearchResultPaginationController;
}());
var SearchResultPaginationComponent = /** @class */ (function () {
    function SearchResultPaginationComponent() {
        this.templateUrl = "search/components/result/pagination/component.html";
        this.transclude = false;
        this.transclude = true;
        this.bindings = {
            onChange: "&",
            showTotal: "<",
            target: "<",
        };
        this.controller = SearchResultPaginationController;
        this.controllerAs = "$ctrl";
    }
    return SearchResultPaginationComponent;
}());
ngObibaMica.search.component("searchResultPagination", new SearchResultPaginationComponent());
//# sourceMappingURL=components.js.map
'use strict';
/* global DISPLAY_TYPES */
/* global QUERY_TYPES */
ngObibaMica.search
    .controller('SearchResultController', [
    '$scope',
    'ngObibaMicaSearch',
    'ngObibaMicaUrl',
    'RqlQueryService',
    'RqlQueryUtils',
    'ngObibaMicaSearchTemplateUrl',
    'AlertService',
    'SetService',
    function ($scope, ngObibaMicaSearch, ngObibaMicaUrl, RqlQueryService, RqlQueryUtils, ngObibaMicaSearchTemplateUrl, AlertService, SetService) {
        function updateType(type) {
            Object.keys($scope.activeTarget).forEach(function (key) {
                $scope.activeTarget[key].active = type === key;
            });
        }
        function rewriteQueryWithLimitAndFields(limit, fields) {
            var parsedQuery = RqlQueryService.parseQuery($scope.query);
            var target = typeToTarget($scope.type);
            var targetQuery = parsedQuery.args.filter(function (query) {
                return query.name === target;
            }).pop();
            RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, limit));
            if (fields) {
                RqlQueryUtils.addFields(targetQuery, RqlQueryUtils.fields(fields));
            }
            return new RqlQuery().serializeArgs(parsedQuery.args);
        }
        $scope.targetTypeMap = $scope.$parent.taxonomyTypeMap;
        $scope.QUERY_TARGETS = QUERY_TARGETS;
        $scope.QUERY_TYPES = QUERY_TYPES;
        $scope.options = ngObibaMicaSearch.getOptions();
        $scope.activeTarget = {};
        $scope.activeTarget[QUERY_TYPES.VARIABLES] = { active: false, name: QUERY_TARGETS.VARIABLE };
        $scope.activeTarget[QUERY_TYPES.DATASETS] = { active: false, name: QUERY_TARGETS.DATASET };
        $scope.activeTarget[QUERY_TYPES.STUDIES] = { active: false, name: QUERY_TARGETS.STUDY };
        $scope.activeTarget[QUERY_TYPES.NETWORKS] = { active: false, name: QUERY_TARGETS.NETWORK };
        $scope.getUrlTemplate = function (tab) {
            switch (tab) {
                case 'list':
                    return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultList');
                case 'coverage':
                    return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultCoverage');
                case 'graphics':
                    return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultGraphics');
            }
        };
        $scope.selectType = function (type) {
            updateType(type);
            $scope.type = type;
            $scope.$parent.onTypeChanged(type);
        };
        $scope.getTotalHits = function (type) {
            if (!$scope.result.list || !$scope.result.list[type + 'ResultDto']) {
                return '...';
            }
            return $scope.result.list[type + 'ResultDto'].totalHits;
        };
        $scope.getReportUrl = function () {
            if ($scope.query === null) {
                return $scope.query;
            }
            var queryWithLimit = rewriteQueryWithLimitAndFields(100000);
            return ngObibaMicaUrl.getUrl('JoinQuerySearchCsvResource').replace(':type', $scope.type).replace(':query', encodeURI(queryWithLimit));
        };
        $scope.addToCart = function () {
            if ($scope.query === null) {
                return $scope.query;
            }
            var beforeCart = SetService.getCartSet('variables');
            var queryWithLimit = rewriteQueryWithLimitAndFields(20000, ['id']);
            SetService.addDocumentQueryToCart('variables', queryWithLimit).then(function (set) {
                var addedCount = set.count - (beforeCart ? beforeCart.count : 0);
                var msgKey = 'sets.cart.variables-added';
                var msgArgs = [addedCount];
                if (addedCount === 0) {
                    msgKey = 'sets.cart.no-variable-added';
                    msgArgs = [];
                }
                AlertService.growl({
                    id: 'SearchControllerGrowl',
                    type: 'info',
                    msgKey: msgKey,
                    msgArgs: msgArgs,
                    delay: 3000
                });
            });
        };
        $scope.getStudySpecificReportUrl = function () {
            if ($scope.query === null) {
                return $scope.query;
            }
            var parsedQuery = RqlQueryService.parseQuery($scope.query);
            var target = typeToTarget($scope.type);
            var targetQuery = parsedQuery.args.filter(function (query) {
                return query.name === target;
            }).pop();
            RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, 100000));
            var queryWithoutLimit = new RqlQuery().serializeArgs(parsedQuery.args);
            return ngObibaMicaUrl.getUrl('JoinQuerySearchCsvReportResource').replace(':type', $scope.type).replace(':query', encodeURI(queryWithoutLimit));
        };
        $scope.$watchCollection('result', function () {
            if ($scope.result.list) {
                $scope.activeTarget[QUERY_TYPES.VARIABLES].totalHits = $scope.result.list.variableResultDto.totalHits;
                $scope.activeTarget[QUERY_TYPES.DATASETS].totalHits = $scope.result.list.datasetResultDto.totalHits;
                $scope.activeTarget[QUERY_TYPES.STUDIES].totalHits = $scope.result.list.studyResultDto.totalHits;
                $scope.activeTarget[QUERY_TYPES.NETWORKS].totalHits = $scope.result.list.networkResultDto.totalHits;
            }
        });
        $scope.$watch('type', function (type) {
            updateType(type);
        });
        $scope.DISPLAY_TYPES = DISPLAY_TYPES;
    }
])
    .directive('resultPanel', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                type: '=',
                bucket: '=',
                query: '=',
                criteria: '=',
                display: '=',
                result: '=',
                lang: '=',
                loading: '=',
                pagination: '<',
                searchTabsOrder: '=',
                resultTabsOrder: '=',
                onTypeChanged: '=',
                onBucketChanged: '=',
                onPaginate: '=',
                onUpdateCriteria: '=',
                onRemoveCriteria: '='
            },
            controller: 'SearchResultController',
            templateUrl: 'search/components/result/search-result/component.html'
        };
    }]);
//# sourceMappingURL=component.js.map
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
(function () {
    function StudiesResultTable($log, $q, $location, PageUrlService, ngObibaMicaSearch, TaxonomyResource, RqlQueryService, LocalizedValues, ngObibaMicaSearchTemplateUrl, StudyFilterShortcutService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                lang: '=',
                summaries: '=',
                loading: '=',
                onUpdateCriteria: '='
            },
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchStudiesResultTable'),
            link: function (scope) {
                $q.all([
                    TaxonomyResource.get({ target: 'study', taxonomy: 'Mica_study' }).$promise
                ]).then(function (data) {
                    var taxonomy = data[0];
                    scope.taxonomy = taxonomy;
                    getDatasourceTitles();
                    if (taxonomy.vocabularies) {
                        scope.designs = taxonomy.vocabularies.filter(function (v) {
                            return v.name === 'methods-design';
                        })[0].terms.reduce(function (prev, t) {
                            prev[t.name] = t.title.map(function (t) {
                                return { lang: t.locale, value: t.text };
                            });
                            return prev;
                        }, {});
                    }
                    else {
                        $log.warn('Taxonomy has no vocabularies');
                    }
                    setInitialStudyFilterSelection();
                });
                scope.taxonomy = {};
                scope.designs = {};
                scope.datasourceTitles = {};
                scope.studyFilterSelection = {
                    get selection() {
                        return this._selection;
                    },
                    set selection(value) {
                        this._selection = value;
                        updateStudyClassNameFilter(value);
                    }
                };
                scope.$on('$locationChangeSuccess', function () {
                    setInitialStudyFilterSelection();
                });
                function updateStudyClassNameFilter(choice) {
                    StudyFilterShortcutService.filter(choice, scope.lang);
                }
                function setInitialStudyFilterSelection() {
                    var result = StudyFilterShortcutService.getStudyClassNameChoices();
                    angular.extend(scope, result); // adds choseAll, choseIndividual and choseHarmonization functions
                }
                function getDatasourceTitles() {
                    if (Object.keys(scope.taxonomy).length < 1 ||
                        !scope.taxonomy.vocabularies ||
                        Object.keys(scope.datasourceTitles).length > 0) {
                        return;
                    }
                    scope.taxonomy.vocabularies.some(function (vocabulary) {
                        if (vocabulary.name === 'populations-dataCollectionEvents-dataSources') {
                            vocabulary.terms.forEach(function (term) {
                                scope.datasourceTitles[term.name] = { title: LocalizedValues.forLocale(term.title, scope.lang) };
                            });
                            return true;
                        }
                        return false;
                    });
                }
                scope.$watch('lang', getDatasourceTitles);
                scope.hasDatasource = function (datasources, id) {
                    return datasources && datasources.indexOf(id) > -1;
                };
                var options = ngObibaMicaSearch.getOptions();
                scope.options = options.studies;
                scope.resultTabOrder = options.resultTabsOrder;
                scope.optionsCols = scope.options.studiesColumn;
                scope.PageUrlService = PageUrlService;
                scope.updateCriteria = function (id, type, destinationType, link) {
                    var datasetClassName;
                    if (type === 'HarmonizationDataset' || type === 'StudyDataset') {
                        datasetClassName = type;
                        type = 'datasets';
                    }
                    var stuydClassName;
                    if (type === 'HarmonizationStudy' || type === 'Study') {
                        stuydClassName = type;
                        type = 'studies';
                    }
                    var variableType;
                    if (type === 'DataschemaVariable' || type === 'CollectedVariable') {
                        variableType = type.replace('Variable', '');
                        type = 'variables';
                    }
                    type = destinationType ? destinationType : type;
                    console.log(link);
                    if (link) {
                        return RqlQueryService.createCriteriaItem('study', 'Mica_study', 'id', id).then(function (item) {
                            var copyItem = angular.copy(scope.onUpdateCriteria(item, type, false, false, false, false, true));
                            return copyItem;
                        });
                    }
                    else {
                        console.log(id);
                        console.log(type);
                        console.log(destinationType);
                        RqlQueryService.createCriteriaItem('study', 'Mica_study', 'id', id).then(function (item) {
                            if (datasetClassName) {
                                return RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'className', datasetClassName).then(function (datasetItem) {
                                    scope.onUpdateCriteria(item, type, false, false, false, false, false);
                                    scope.onUpdateCriteria(datasetItem, type, false, false, false, false, false);
                                });
                            }
                            else if (stuydClassName) {
                                RqlQueryService.createCriteriaItem('study', 'Mica_study', 'className', stuydClassName).then(function (studyItem) {
                                    scope.onUpdateCriteria(item, type, false, false, false, false, false);
                                    scope.onUpdateCriteria(studyItem, type, false, false, false, false, false);
                                });
                            }
                            else if (variableType) {
                                RqlQueryService.createCriteriaItem('variable', 'Mica_variable', 'variableType', variableType).then(function (variableItem) {
                                    scope.onUpdateCriteria(item, type, false, false, false, false, false);
                                    scope.onUpdateCriteria(variableItem, type, false, false, false, false, false);
                                });
                            }
                        });
                    }
                };
            }
        };
    }
    ngObibaMica.search.directive('studiesResultTable', [
        '$log',
        '$q',
        '$location',
        'PageUrlService',
        'ngObibaMicaSearch',
        'TaxonomyResource',
        'RqlQueryService',
        'LocalizedValues',
        'ngObibaMicaSearchTemplateUrl',
        'StudyFilterShortcutService',
        StudiesResultTable
    ]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function ResultTabsOrderCount() {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'ResultTabsOrderCountController',
            templateUrl: 'search/components/result/tabs-order-count/component.html'
        };
    }
    ngObibaMica.search.directive('resultTabsOrderCount', ResultTabsOrderCount);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function VariablesResultTable(PageUrlService, ngObibaMicaSearch) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                lang: '=',
                summaries: '=',
                loading: '='
            },
            templateUrl: 'search/components/result/variables-result-table/component.html',
            link: function (scope) {
                scope.options = ngObibaMicaSearch.getOptions().variables;
                scope.optionsCols = scope.options.variablesColumn;
                scope.PageUrlService = PageUrlService;
            }
        };
    }
    ngObibaMica.search.directive('variablesResultTable', ['PageUrlService', 'ngObibaMicaSearch', VariablesResultTable]);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function ScrollToTop() {
        return {
            restrict: 'A',
            scope: {
                trigger: '=scrollToTop'
            },
            link: function postLink(scope, elem) {
                scope.$watch('trigger', function () {
                    elem[0].scrollTop = 0;
                });
            }
        };
    }
    ngObibaMica.search.directive('scrollToTop', ScrollToTop);
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function Controller($translate, VocabularyService, RqlQueryService, AlertService, StringUtils, LocaleStringUtils, ServerErrorUtils, TaxonomiesSearchResource) {
        var ctrl = this;
        // vocabulary (or term) can be used in search if it doesn't have the 'showSearch' attribute
        function canSearch(taxonomyEntity, hideSearchList) {
            if ((hideSearchList || []).indexOf(taxonomyEntity.name) > -1) {
                return false;
            }
            return (taxonomyEntity.attributes || []).filter(function (attr) { return attr.key === 'showSearch'; }).length === 0;
        }
        function score(query, item) {
            var result = 0;
            var regExp = new RegExp(query, 'ig');
            if (item.itemTitle.match(regExp)) {
                result = 10;
            }
            else if (item.itemDescription && item.itemDescription.match(regExp)) {
                result = 8;
            }
            else if (item.itemParentTitle.match(regExp)) {
                result = 6;
            }
            else if (item.itemParentDescription && item.itemParentDescription.match(regExp)) {
                result = 4;
            }
            return result;
        }
        function processBundle(query, bundle) {
            var results = [];
            var total = 0;
            var target = bundle.target;
            var taxonomy = bundle.taxonomy;
            if (taxonomy.vocabularies) {
                taxonomy.vocabularies.filter(function (vocabulary) {
                    return VocabularyService.isVisibleVocabulary(vocabulary) && canSearch(vocabulary, ctrl.hideSearch);
                }).forEach(function (vocabulary) {
                    if (vocabulary.terms) {
                        vocabulary.terms.filter(function (term) {
                            return canSearch(term, ctrl.hideSearch);
                        }).forEach(function (term) {
                            var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, ctrl.lang);
                            results.push({
                                score: score(query, item),
                                item: item
                            });
                            total++;
                        });
                    }
                    else {
                        var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, ctrl.lang);
                        results.push({
                            score: score(query, item),
                            item: item
                        });
                        total++;
                    }
                });
            }
            return { results: results, total: total };
        }
        function searchCriteria(query) {
            // search for taxonomy terms
            // search for matching variables/studies/... count
            var criteria = TaxonomiesSearchResource.get({
                query: StringUtils.quoteQuery(query.replace(/\/.*/g, '')),
                locale: ctrl.lang,
                target: ctrl.documents.search.target
            }).$promise.then(function (response) {
                if (response) {
                    var results = [];
                    var total = 0;
                    var size = 10;
                    response.forEach(function (bundle) {
                        var rval = processBundle(query, bundle);
                        results.push.apply(results, rval.results);
                        total = total + rval.total;
                    });
                    results.sort(function (a, b) {
                        return b.score - a.score;
                    });
                    results = results.splice(0, size);
                    if (total > results.length) {
                        var note = {
                            query: query,
                            total: total,
                            size: size,
                            message: LocaleStringUtils.translate('search.showing', [size, total]),
                            status: 'has-warning'
                        };
                        results.push({ score: -1, item: note });
                    }
                    return results.map(function (result) {
                        return result.item;
                    });
                }
                else {
                    return [];
                }
            }, function (response) {
                AlertService.alert({
                    id: ctrl.alertId,
                    type: 'danger',
                    msg: ServerErrorUtils.buildMessage(response),
                    delay: 5000
                });
            });
            return criteria;
        }
        function showTaxonomy(target, name) {
            if (ctrl.target === target && ctrl.taxonomyName === name && ctrl.taxonomiesShown) {
                ctrl.taxonomiesShown = false;
                return;
            }
            ctrl.taxonomiesShown = true;
            ctrl.target = target;
            ctrl.taxonomyName = name;
        }
        function clearTaxonomy() {
            ctrl.target = null;
            ctrl.taxonomyName = null;
        }
        function selectSearchTarget(target) {
            ctrl.documents.search.target = target;
        }
        function selectCriteria(item) {
            ctrl.onSelectCriteria({ item: item });
            ctrl.selectedCriteria = null;
        }
        function translateTaxonomyNav(taxonomy, key) {
            var value = taxonomy[key] && taxonomy[key].filter(function (item) {
                return item.locale === $translate.use();
            }).pop();
            return value ? value.text : key;
        }
        function goToClassifications() {
            ctrl.onGotoClassifications({});
        }
        function selectTerm(target, taxonomy, vocabulary, args) {
            ctrl.onSelectTerm({ target: target, taxonomy: taxonomy, vocabulary: vocabulary, args: args });
        }
        ctrl.selectedCriteria = null;
        ctrl.target = null;
        ctrl.documents = {
            search: {
                text: null,
                active: false,
                target: null
            }
        };
        ctrl.selectCriteria = selectCriteria;
        ctrl.searchCriteria = searchCriteria;
        ctrl.selectSearchTarget = selectSearchTarget;
        ctrl.clearTaxonomy = clearTaxonomy;
        ctrl.showTaxonomy = showTaxonomy;
        ctrl.translateTaxonomyNav = translateTaxonomyNav;
        ctrl.goToClassifications = goToClassifications;
        ctrl.selectTerm = selectTerm;
    }
    ngObibaMica.search.component('searchBoxRegion', {
        // transclude: true,
        bindings: {
            targets: '<',
            options: '<',
            alertId: '@',
            lang: '<',
            taxonomyNav: '<',
            onSelectCriteria: '&',
            onGotoClassifications: '&',
            onSelectTerm: '&'
        },
        templateUrl: 'search/components/search-box-region/component.html',
        controller: [
            '$translate',
            'VocabularyService',
            'RqlQueryService',
            'AlertService',
            'StringUtils',
            'LocaleStringUtils',
            'ServerErrorUtils',
            'TaxonomiesSearchResource',
            Controller
        ]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function StudyFilterShortcut($location, $translate, RqlQueryService, StudyFilterShortcutService) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'search/components/study-filter-shortcut/component.html',
            link: function (scope) {
                scope.studyFilterSelection = {
                    get selection() {
                        return this._selection;
                    },
                    set selection(value) {
                        this._selection = value;
                        updateStudyClassNameFilter(value);
                    }
                };
                function updateStudyClassNameFilter(choice) {
                    StudyFilterShortcutService.filter(choice, $translate.use());
                }
                function setChoice() {
                    var result = StudyFilterShortcutService.getStudyClassNameChoices();
                    if (result.choseAll) {
                        scope.studyFilterSelection._selection = ngObibaMica.search.STUDY_FILTER_CHOICES.ALL_STUDIES;
                    }
                    else if (result.choseIndividual) {
                        scope.studyFilterSelection._selection = ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES;
                    }
                    else if (result.choseHarmonization) {
                        scope.studyFilterSelection._selection = ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES;
                    }
                }
                scope.$on('$locationChangeSuccess', function () {
                    setChoice();
                });
                setChoice();
            }
        };
    }
    ngObibaMica.search.directive('studyFilterShortcut', [
        '$location',
        '$translate',
        'RqlQueryService',
        'StudyFilterShortcutService',
        StudyFilterShortcut
    ]);
})();
//# sourceMappingURL=compnent.js.map
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
(function () {
    function TaxonomyFilterDetailController() {
        var ctrl = this;
        function selectVocabularyArgs(vocabulary, args) {
            ctrl.onSelectTaxonomyTerm({ taxonomy: ctrl.taxonomy, vocabulary: vocabulary, args: args });
        }
        function removeCriterion(item) {
            ctrl.onRemoveCriterion({ item: item });
        }
        ctrl.selectVocabularyArgs = selectVocabularyArgs;
        ctrl.removeCriterion = removeCriterion;
    }
    ngObibaMica.search
        .component('taxonomyFilterDetail', {
        bindings: {
            taxonomy: '<',
            vocabularies: '<',
            onSelectTaxonomyTerm: '&',
            onRemoveCriterion: '&'
        },
        templateUrl: 'search/components/taxonomy/taxonomy-filter-detail/component.html',
        controller: [TaxonomyFilterDetailController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function TaxonomyFilterPanelController(VocabularyService, $timeout) {
        var ctrl = this;
        ctrl.taxonomiesQuery = [];
        ctrl.classClose = false;
        function taxonomyArrayName(taxonomy) {
            return taxonomy.reduce(function (name, taxonomyItem) {
                return (name || '').concat(taxonomyItem.name);
            }, '');
        }
        function getStringQueryByTaxonomy(taxonomyName) {
            var taxonomies = ctrl.taxonomiesQuery.filter(function (taxonomy) {
                return taxonomy.name === taxonomyName;
            });
            return taxonomies.length === 1 ? taxonomies[0].queryString : null;
        }
        function updateQueryString(taxonomy, queryString) {
            var updated = false;
            if (taxonomy !== undefined && queryString !== undefined) {
                ctrl.taxonomiesQuery.forEach(function (taxonomyQuery) {
                    if (taxonomyQuery.name === taxonomy && taxonomyQuery.queryString !== undefined) {
                        taxonomyQuery.queryString = queryString;
                        updated = true;
                    }
                });
                if (!updated) {
                    ctrl.taxonomiesQuery.push({ name: taxonomy, queryString: queryString });
                }
            }
            ctrl.taxonomiesQuery.filter(function (taxonomyQuery) {
                return taxonomyQuery.queryString;
            });
        }
        function selectTaxonomyVocabularyArgs(taxonomy, vocabulary, args) {
            ctrl.onSelectTerm({ target: ctrl.target, taxonomy: taxonomy, vocabulary: vocabulary, args: args });
        }
        function onFilterChange(queryString) {
            var taxoName;
            if (!ctrl.taxonomyIsArray) {
                taxoName = ctrl.taxonomy.name;
                filterChangedForSingleTaxonomy(queryString);
            }
            else {
                taxoName = taxonomyArrayName(ctrl.taxonomy);
                filterChangedForMultipleTaxonomies(queryString);
            }
            updateQueryString(taxoName, queryString);
        }
        function filterChangedForSingleTaxonomy(queryString) {
            if (queryString) {
                ctrl.filteredVocabularies = VocabularyService.filter(ctrl.taxonomy.vocabularies, queryString);
            }
            else {
                ctrl.filteredVocabularies = initFilteredVocabularies(ctrl.taxonomy);
            }
        }
        function filterChangedForMultipleTaxonomies(queryString) {
            ctrl.filteredVocabularies = {};
            if (queryString) {
                ctrl.taxonomy.forEach(function (subTaxonomy) {
                    var filtredSubVocabularies = VocabularyService.filter(subTaxonomy, queryString);
                    if (filtredSubVocabularies.length > 0) {
                        ctrl.filteredVocabularies[subTaxonomy.name] = filtredSubVocabularies;
                    }
                });
            }
            else {
                ctrl.taxonomy.forEach(function (subTaxonomy) {
                    ctrl.filteredVocabularies[subTaxonomy.name] = initFilteredVocabularies(subTaxonomy);
                });
            }
        }
        function togglePannel() {
            ctrl.classClose = true;
            $timeout(function () {
                ctrl.onToggle(ctrl.target, null);
            }, 200);
        }
        function initFilteredVocabularies(taxonomy) {
            return taxonomy.vocabularies.map(function (vocabulary) {
                vocabulary.filteredTerms = vocabulary.terms;
                return vocabulary;
            });
        }
        function onChanges(changesObj) {
            ctrl.taxonomyIsArray = Array.isArray(ctrl.taxonomy);
            ctrl.taxonomyName = !ctrl.taxonomyIsArray ? ctrl.taxonomy.name : taxonomyArrayName(ctrl.taxonomy);
            if (changesObj.taxonomy) {
                var queryString = getStringQueryByTaxonomy(ctrl.taxonomyName);
                if (queryString) {
                    onFilterChange(queryString);
                }
                else {
                    onFilterChange();
                }
            }
        }
        function removeCriterion(item) {
            ctrl.onRemoveCriterion({ item: item });
        }
        function selectType(type) {
            togglePannel();
            ctrl.onSelectType({ type: type });
        }
        ctrl.$onChanges = onChanges;
        ctrl.selectTaxonomyVocabularyArgs = selectTaxonomyVocabularyArgs;
        ctrl.selectType = selectType;
        ctrl.onFilterChange = onFilterChange;
        ctrl.togglePannel = togglePannel;
        ctrl.removeCriterion = removeCriterion;
    }
    ngObibaMica.search
        .component('taxonomyFilterPanel', {
        transclude: true,
        bindings: {
            showTaxonomyPanel: '<',
            result: '<',
            resultTabsOrder: '<',
            taxonomyTypeMap: '<',
            target: '<',
            taxonomy: '<',
            onSelectType: '&',
            onSelectTerm: '&',
            onRemoveCriterion: '&',
            onToggle: '<'
        },
        templateUrl: 'search/components/taxonomy/taxonomy-filter-panel/component.html',
        controller: ['VocabularyService', '$timeout', TaxonomyFilterPanelController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function VocabularyFilterDetailHeading() {
        var ctrl = this;
        var bodyElement = document.querySelectorAll('body')[0];
        function selectType(type) {
            return ctrl.onSelectType({ type: type });
        }
        function closePanelWhenClickingOutside(event, callbackOnClose) {
            var keepOpen = event.target.closest('#back-to-top') !== null;
            var nodes = bodyElement.querySelectorAll('.overlay-front-on-box-shodow');
            function isInside(rect) {
                return event.clientX > rect.x && event.clientX < rect.x + rect.width &&
                    event.clientY > rect.y && event.clientY < rect.y + rect.height;
            }
            nodes.forEach(function (node) {
                keepOpen = keepOpen || isInside(node.getBoundingClientRect());
            });
            if (nodes && !keepOpen) {
                event.preventDefault();
                if (callbackOnClose) {
                    callbackOnClose();
                }
            }
        }
        function removeWindowEventHandlers() {
            bodyElement.onkeyup = null;
            bodyElement.onmouseup = null;
        }
        function addWindowEventHandlers() {
            bodyElement.onmouseup = function (event) {
                closePanelWhenClickingOutside(event, ctrl.togglePannel);
            };
            bodyElement.onkeyup = function (event) {
                if (event.keyCode === 27) {
                    removeWindowEventHandlers();
                    ctrl.togglePannel();
                }
            };
        }
        function onFilterChange(queryString) {
            return ctrl.onFilterChange({ queryString: queryString });
        }
        function onDestroy() {
            removeWindowEventHandlers();
        }
        ctrl.selectType = selectType;
        ctrl.filterChange = onFilterChange;
        ctrl.$onDestroy = onDestroy;
        addWindowEventHandlers();
    }
    ngObibaMica.search
        .component('vocabularyFilterDetailHeading', {
        transclude: true,
        bindings: {
            showTaxonomyPanel: '<',
            taxonomyName: '<',
            taxonomiesQuery: '<',
            clearQuery: '<',
            onFilterChange: '&',
            taxonomyTypeMap: '<',
            resultTabsOrder: '<',
            target: '<',
            onSelectType: '&',
            result: '<',
            togglePannel: '&'
        },
        templateUrl: ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
                return ngObibaMicaSearchTemplateUrl.getTemplateUrl('vocabularyFilterDetailHeading');
            }],
        controller: [VocabularyFilterDetailHeading]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    function VocabularyFilterDetailController(VocabularyService) {
        var ctrl = this;
        function checkAndSetCriterionType(vocabulary) {
            if (VocabularyService.isTermsVocabulary(vocabulary) || VocabularyService.isRangeVocabulary(vocabulary)) {
                ctrl.criterionType = 'string-terms';
            }
            else if (VocabularyService.isNumericVocabulary(vocabulary)) {
                ctrl.criterionType = 'numeric';
            }
            else if (VocabularyService.isMatchVocabulary(vocabulary)) {
                ctrl.criterionType = 'match';
            }
        }
        function selectVocabularyArgs(args) {
            if (ctrl.criterionType === 'string-terms' && !args.term.selected) {
                var selectedTerms = ctrl.vocabulary.terms.filter(function (term) {
                    return term.selected;
                });
                if (selectedTerms.length === 0) {
                    ctrl.onRemoveCriterion({ item: ctrl.vocabulary.existingItem });
                }
                else {
                    ctrl.onSelectVocabularyArgs({ vocabulary: ctrl.vocabulary, args: args });
                }
            }
            else {
                ctrl.onSelectVocabularyArgs({ vocabulary: ctrl.vocabulary, args: args });
            }
        }
        function removeCriterion() {
            ctrl.onRemoveCriterion({ item: ctrl.vocabulary.existingItem });
        }
        function selectAllFilteredVocabularyTerms(terms) {
            var processedTerms = terms.map(function (term) {
                term.selected = true;
                return term;
            });
            selectVocabularyArgs({ term: processedTerms });
        }
        function canStillSelectMore(terms) {
            if (!Array.isArray(terms)) {
                return false;
            }
            var selected = terms.filter(function (term) { return term.selected; });
            return selected.length < terms.length;
        }
        function onChanges(changesObj) {
            if (changesObj.vocabulary) {
                checkAndSetCriterionType(ctrl.vocabulary);
            }
        }
        ctrl.$onChanges = onChanges;
        ctrl.canStillSelectMore = canStillSelectMore;
        ctrl.selectAllFilteredVocabularyTerms = selectAllFilteredVocabularyTerms;
        ctrl.selectVocabularyArgs = selectVocabularyArgs;
        ctrl.removeCriterion = removeCriterion;
    }
    ngObibaMica.search
        .component('vocabularyFilterDetail', {
        transclude: true,
        bindings: {
            vocabulary: '<',
            onSelectVocabularyArgs: '&',
            onRemoveCriterion: '&'
        },
        templateUrl: 'search/components/vocabulary/vocabulary-filter-detail/component.html',
        controller: ['VocabularyService', VocabularyFilterDetailController]
    });
})();
//# sourceMappingURL=component.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab = angular.module('obiba.mica.DatasetVariableCrosstab', [
        'ui.bootstrap',
        'obiba.notification',
        'obiba.mica.analysis',
        'schemaForm',
        'schemaForm-datepicker',
        'pascalprecht.translate',
        'angularMoment',
        'ui.bootstrap',
        'ui.select',
        'ui'
    ]);
})();
//# sourceMappingURL=dataset-variable-crosstab.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .controller('DatasetVariableCrosstabController', ['$rootScope',
        '$scope',
        '$routeParams',
        '$log',
        '$location',
        '$route',
        '$translate',
        'DatasetResource',
        'DatasetCategoricalVariablesResource',
        'DatasetVariablesResource',
        'DatasetVariableResource',
        'DatasetVariablesCrosstabResource',
        'ServerErrorAlertService',
        'ContingencyService',
        'LocalizedValues',
        'ChiSquaredCalculator',
        'PageUrlService',
        'ngObibaMicaAnalysisTemplateUrl',
        'AnalysisConfigService',
        function ($rootScope, $scope, $routeParams, $log, $location, $route, $translate, DatasetResource, DatasetCategoricalVariablesResource, DatasetVariablesResource, DatasetVariableResource, DatasetVariablesCrosstabResource, ServerErrorAlertService, ContingencyService, LocalizedValues, ChiSquaredCalculator, PageUrlService, ngObibaMicaAnalysisTemplateUrl, AnalysisConfigService) {
            var analysisOptions = AnalysisConfigService.getOptions();
            function updateLocation(currentPath, param) {
                var original = $location.path;
                $location.path = function (path, reload) {
                    if (reload === false) {
                        var lastRoute = $route.current;
                        var un = $rootScope.$on('$locationChangeSuccess', function () {
                            $route.current = lastRoute;
                            un();
                        });
                    }
                    return original.apply($location, [path]);
                };
                $location.path(currentPath + '/' + param, false);
                $location.path = original;
            }
            var onError = function (response) {
                $scope.serverError = true;
                ServerErrorAlertService.alert('MainController', response);
            };
            var searchCategoricalVariables = function (queryString) {
                if (!queryString || queryString.trim().length < 2) {
                    return;
                }
                DatasetCategoricalVariablesResource.get({
                    dsType: $routeParams.type,
                    dsId: $routeParams.ds,
                    query: queryString.trim() + '*'
                }, function onSuccess(response) {
                    $scope.crosstab.lhs.variables = response.variables;
                }, onError);
            };
            var searchVariables = function (queryString) {
                if (!queryString || queryString.trim().length < 2) {
                    return;
                }
                DatasetVariablesResource.get({
                    dsType: $routeParams.type,
                    dsId: $routeParams.ds,
                    query: queryString.trim() + '*'
                }, function onSuccess(response) {
                    $scope.crosstab.rhs.variables = response.variables;
                }, onError);
            };
            var isStatistical = function (variable) {
                return variable && variable.nature === 'CONTINUOUS';
            };
            var canExchangeVariables = function () {
                return $scope.crosstab.lhs.variable && $scope.crosstab.rhs.variable && !isStatistical($scope.crosstab.rhs.variable);
            };
            /**
             * Submits the crosstab query
             */
            var submit = function () {
                if ($scope.crosstab.lhs.variable && $scope.crosstab.rhs.variable) {
                    $scope.crosstab.lhs.xVariable = $scope.crosstab.lhs.variable;
                    $scope.crosstab.rhs.xVariable = $scope.crosstab.rhs.variable;
                    updateLocation(ContingencyService.removeVariableFromUrl($location.path()), ContingencyService.createVariableUrlPart($scope.crosstab.lhs.xVariable.id, $scope.crosstab.rhs.xVariable.id));
                    $scope.loading = true;
                    DatasetVariablesCrosstabResource.get({
                        dsType: $routeParams.type,
                        dsId: $routeParams.ds,
                        v1: $scope.crosstab.lhs.xVariable.name,
                        v2: $scope.crosstab.rhs.xVariable.name
                    }, function onSuccess(response) {
                        if (Object.keys(response).filter(function (k) {
                            return k[0] !== '$';
                        }).length === 0) {
                            // response with all properties prefixed with '$' filtered out is empty
                            onError({ status: 'crosstab.no-data' });
                        }
                        else {
                            $scope.crosstab.contingencies = normalizeData(response.contingencies ? response.contingencies : [response]);
                            if ($scope.datasetHarmo) {
                                $scope.crosstab.all = normalizeData(response.all ? [response.all] : [])[0];
                            }
                        }
                        $scope.loading = false;
                    }, onError);
                }
            };
            var exchangeVariables = function () {
                if (canExchangeVariables()) {
                    var temp = $scope.crosstab.lhs.variable;
                    $scope.crosstab.lhs.variable = $scope.crosstab.rhs.variable;
                    $scope.crosstab.rhs.variable = temp;
                    submit();
                }
            };
            var initCrosstab = function () {
                $scope.crosstab = {
                    lhs: {
                        variable: null,
                        xVariable: null,
                        variables: []
                    },
                    rhs: {
                        variable: null,
                        xVariable: null,
                        variables: []
                    },
                    all: null,
                    contingencies: null
                };
            };
            var clear = function () {
                initCrosstab();
            };
            function normalizeStatistics(contingency, v1Cats) {
                function createEmptyStatistics() {
                    return {
                        min: '-',
                        max: '-',
                        mean: '-',
                        stdDeviation: '-'
                    };
                }
                contingency.privacyCheck = contingency.aggregations.filter(function (aggregation) {
                    return aggregation.statistics !== null;
                }).length === contingency.aggregations.length;
                var terms = contingency.aggregations.map(function (aggregation) {
                    return aggregation.term;
                });
                if (!contingency.privacyCheck) {
                    // server returns no aggregation, create emptyu ones
                    contingency.aggregations.forEach(function (aggregation) {
                        aggregation.statistics = createEmptyStatistics();
                    });
                    contingency.all.statistics = createEmptyStatistics();
                }
                else {
                    // create the missing category aggregations
                    v1Cats.forEach(function (cat, i) {
                        if (terms.indexOf(cat) === -1) {
                            // create a cat at the same index
                            contingency.aggregations.splice(i, 0, {
                                n: '-',
                                statistics: createEmptyStatistics()
                            });
                        }
                    });
                }
            }
            function normalizeFrequencies(contingency, v2Cats) {
                function percentage(value, total) {
                    return total === 0 ? 0 : value / total * 100;
                }
                function expected(cTotal, rTotal, gt) {
                    return (cTotal * rTotal) / gt;
                }
                function cellChiSquared(value, expected) {
                    return expected === 0 ? 0 : Math.pow(value - expected, 2) / expected;
                }
                function degreeOfFreedom(rows, columns) {
                    return (rows - 1) * (columns - 1);
                }
                /**
                 * Normalized data; accounts for frequencies with no value (ignored by Elasticsearch)
                 * @param aggregation
                 */
                function normalize(aggregation) {
                    if (!aggregation.frequencies) {
                        aggregation.frequencies = [];
                    }
                    var fCats = aggregation.frequencies.map(function (frq) {
                        return frq.value;
                    });
                    v2Cats.forEach(function (cat, i) {
                        if (fCats.indexOf(cat) === -1) {
                            // create a cat at the same index
                            aggregation.frequencies.splice(i, 0, {
                                count: aggregation.privacyCheck ? 0 : '-',
                                value: cat
                            });
                        }
                    });
                }
                /**
                 * Calulates frequency percentages and chi-squared
                 * @param aggregation
                 * @param grandTotal
                 * @param totals
                 * @param chiSquaredInfo
                 */
                function statistics(aggregation, grandTotal, totals, chiSquaredInfo) {
                    if (chiSquaredInfo) {
                        aggregation.percent = percentage(aggregation.n, grandTotal);
                        aggregation.frequencies.forEach(function (frequency, i) {
                            frequency.percent = percentage(frequency.count, totals.frequencies[i].count);
                            frequency.cpercent = percentage(frequency.count, aggregation.n);
                            chiSquaredInfo.sum += cellChiSquared(frequency.count, expected(aggregation.n, totals.frequencies[i].count, grandTotal));
                        });
                    }
                    else {
                        aggregation.frequencies.forEach(function (frequency) {
                            frequency.percent = percentage(frequency.count, grandTotal);
                            frequency.cpercent = percentage(frequency.n, grandTotal);
                        });
                    }
                }
                /**
                 * process contingency
                 */
                var privacyThreshold = contingency.privacyThreshold;
                var grandTotal = contingency.all.total;
                contingency.all.privacyCheck = contingency.all.frequencies && contingency.all.frequencies.length > 0;
                normalize(contingency.all, privacyThreshold);
                statistics(contingency.all, grandTotal, contingency.all);
                if (contingency.aggregations) {
                    contingency.chiSquaredInfo = {
                        pValue: 0,
                        sum: 0,
                        df: degreeOfFreedom($scope.crosstab.rhs.xVariable.categories.length, $scope.crosstab.lhs.xVariable.categories.length)
                    };
                    contingency.privacyCheck = true;
                    contingency.aggregations.forEach(function (aggregation) {
                        aggregation.privacyCheck = aggregation.frequencies ? aggregation.frequencies.length > 0 : false;
                        contingency.privacyCheck = contingency.privacyCheck && aggregation.privacyCheck;
                        normalize(aggregation);
                        statistics(aggregation, grandTotal, contingency.all, contingency.chiSquaredInfo);
                    });
                    if (contingency.privacyCheck) {
                        // no cell has an observation < 5
                        contingency.chiSquaredInfo.pValue = (1 - ChiSquaredCalculator.compute(contingency.chiSquaredInfo));
                    }
                }
            }
            /**
             * Retrieves study table info for the result page
             * @param opalTable
             * @returns {{summary: *, population: *, dce: *, project: *, table: *}}
             */
            var extractSummaryInfo = function (opalTable) {
                var summary = opalTable.studySummary;
                var pop = {};
                var dce = {};
                if (opalTable.studySummary) {
                    var studySummary = opalTable.studySummary;
                    pop = studySummary.populationSummaries ? studySummary.populationSummaries[0] : null;
                    dce = pop && pop.dataCollectionEventSummaries ? pop.dataCollectionEventSummaries.filter(function (dce) {
                        return dce.id === opalTable.dataCollectionEventId;
                    }) : null;
                }
                var currentLanguage = $translate.use();
                return {
                    summary: LocalizedValues.forLang(summary.acronym, currentLanguage),
                    population: pop ? LocalizedValues.forLang(pop.name, currentLanguage) : '',
                    dce: dce ? LocalizedValues.forLang(dce[0].name, currentLanguage) : '',
                    project: opalTable.project,
                    table: opalTable.table,
                    tableName: LocalizedValues.forLang(opalTable.name, currentLanguage)
                };
            };
            /**
             * Normalized data; fills collection with dummy values (statistical or categorical)
             * @param contingencies
             * @returns {*}
             */
            function normalizeData(contingencies) {
                var v2Cats = $scope.crosstab.rhs.xVariable.categories ? $scope.crosstab.rhs.xVariable.categories.map(function (category) {
                    return category.name;
                }) : undefined;
                var v1Cats = $scope.crosstab.lhs.xVariable.categories ? $scope.crosstab.lhs.xVariable.categories.map(function (category) {
                    return category.name;
                }) : undefined;
                if (contingencies) {
                    contingencies.forEach(function (contingency) {
                        // Show the details anyway.
                        contingency.totalPrivacyCheck = contingency.all.n !== -1;
                        if (!contingency.totalPrivacyCheck || contingency.all.n > 0) {
                            if (isStatistical($scope.crosstab.rhs.xVariable)) {
                                normalizeStatistics(contingency, v1Cats);
                            }
                            else {
                                normalizeFrequencies(contingency, v2Cats);
                            }
                        }
                        if (contingency.studyTable) {
                            contingency.info = extractSummaryInfo(contingency.studyTable);
                        }
                    });
                }
                return contingencies;
            }
            var downloadUrl = function (docType) {
                return ContingencyService.getCrossDownloadUrl({
                    ':dsType': $routeParams.type,
                    ':dsId': $routeParams.ds,
                    ':docType': docType,
                    ':v1': $scope.crosstab.lhs.xVariable.name,
                    ':v2': $scope.crosstab.rhs.xVariable.name
                });
            };
            var lhsVariableCategory = function (category) {
                return getVariableCategory($scope.crosstab.lhs.xVariable, category);
            };
            var rhsVariableCategory = function (category) {
                return getVariableCategory($scope.crosstab.rhs.xVariable, category);
            };
            function getVariableCategory(variable, category) {
                var result = null;
                if (variable && variable.categories) {
                    result = variable.categories.filter(function (cat) {
                        return cat.name === category;
                    });
                }
                return result ? result[0] : category;
            }
            var getPrivacyErrorMessage = function (contingency) {
                return !contingency.totalPrivacyCheck ? 'dataset.crosstab.total-privacy-check-failed' : (!contingency.privacyCheck ? 'dataset.crosstab.privacy-check-failed' : '');
            };
            /**
             * Returns the proper template based on total.n
             * @param contingency
             * @returns {string}
             */
            var getTemplatePath = function (contingency) {
                if (!$scope.crosstab.rhs.xVariable) {
                    $log.error('RHS variable is not initialized!');
                    return;
                }
                return isStatistical($scope.crosstab.rhs.xVariable) ?
                    (!contingency.totalPrivacyCheck || contingency.all.n > 0 ?
                        ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableStatistics') : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableStatisticsEmpty')) :
                    (!contingency.totalPrivacyCheck || contingency.all.n > 0 ?
                        ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableFrequencies') : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableFrequenciesEmpty'));
            };
            $scope.crosstabTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableCrosstab');
            $scope.isStatistical = isStatistical;
            $scope.getTemplatePath = getTemplatePath;
            $scope.getPrivacyErrorMessage = getPrivacyErrorMessage;
            $scope.canExchangeVariables = canExchangeVariables;
            $scope.exchangeVariables = exchangeVariables;
            $scope.extractSummaryInfo = extractSummaryInfo;
            $scope.lhsVariableCategory = lhsVariableCategory;
            $scope.rhsVariableCategory = rhsVariableCategory;
            $scope.clear = clear;
            $scope.submit = submit;
            $scope.searchCategoricalVariables = searchCategoricalVariables;
            $scope.searchVariables = searchVariables;
            $scope.PageUrlService = PageUrlService;
            $scope.DocType = { CSV: 'csv', EXCEL: 'excel' };
            $scope.StatType = { CPERCENT: 1, RPERCENT: 2, CHI: 3 };
            $scope.routeParams = $routeParams;
            $scope.options = {
                showDetailedStats: analysisOptions.crosstab.showDetailedStats,
                showDetails: true,
                statistics: $scope.StatType.CPERCENT
            };
            $scope.downloadUrl = downloadUrl;
            initCrosstab();
            DatasetResource.get({
                dsType: $routeParams.type,
                dsId: $routeParams.ds
            }, function onSuccess(response) {
                $scope.dataset = response;
                $scope.dataset.translatedAcronym = LocalizedValues.forLang($scope.dataset.acronym, $translate.use());
                $scope.datasetHarmo = $scope.dataset.hasOwnProperty('obiba.mica.HarmonizedDatasetDto.type');
            }, onError);
            var varCount = 0;
            if ($routeParams.varId) {
                DatasetVariableResource.get({ varId: $routeParams.varId }, function onSuccess(response) {
                    $scope.crosstab.lhs.variable = response;
                    $scope.crosstab.lhs.variables = [response];
                    varCount++;
                    if (varCount > 1) {
                        submit();
                    }
                }, onError);
            }
            if ($routeParams.byId) {
                DatasetVariableResource.get({ varId: $routeParams.byId }, function onSuccess(response) {
                    $scope.crosstab.rhs.variable = response;
                    $scope.crosstab.rhs.variables = [response];
                    varCount++;
                    if (varCount > 1) {
                        submit();
                    }
                }, onError);
            }
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-controller.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .filter('variableCategory', function () {
        return function (categories, category) {
            var result = null;
            if (categories) {
                result = categories.filter(function (cat) {
                    return cat.name === category;
                });
            }
            return result ? result[0] : null;
        };
    })
        .filter('variableLabel', ['AttributeService',
        function (AttributeService) {
            return function (variable) {
                var label = '';
                if (variable) {
                    var attributes = AttributeService.getAttributes(variable, ['label']);
                    if (attributes) {
                        attributes.forEach(function (attribute) {
                            label = AttributeService.getValue(attribute);
                            return false;
                        });
                    }
                    return label;
                }
            };
        }])
        .filter('roundNumber', ['$filter',
        function ($filter) {
            return function (value) {
                return isNaN(value) ? value : $filter('number')(value, 2);
            };
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-filter.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/crosstab/:type/:ds', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            })
                .when('/crosstab/:type/:ds/variable/:varId', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            })
                .when('/crosstab/:type/:ds/variable/:varId/by/:byId', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            });
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-router.js.map
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
ngObibaMica.analysis = angular.module('obiba.mica.analysis', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=analysis.js.map
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
/* global NgObibaMicaTemplateUrlFactory */
(function () {
    ngObibaMica.analysis
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaAnalysisTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
                entities: { header: null, footer: null },
                variableCrosstab: { template: null },
                variableFrequencies: { template: null },
                variableFrequenciesEmpty: { template: null },
                variableStatistics: { template: null },
                variableStatisticsEmpty: { template: null },
            }));
        }]);
})();
//# sourceMappingURL=analysis-template-url-provider.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetCategoricalVariablesResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetCategoricalVariablesResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-categorical-variables-resource.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('DatasetResource');
            return $resource(url, {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-resource.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariableResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariableResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variable-resource.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariablesCrosstabResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariablesCrosstabResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variables-crosstab-resource.js.map
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
(function () {
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariablesResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariablesResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variables-resource.js.map
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
(function () {
    ngObibaMica.search.factory('EntitiesCountResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var resourceUrl = ngObibaMicaUrl.getUrl('EntitiesCountResource');
            var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
            var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
            var requestTransformer = function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            };
            return $resource(resourceUrl, {}, {
                'get': {
                    method: method,
                    headers: {
                        'Content-Type': contentType
                    },
                    transformRequest: requestTransformer,
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=entities-count-analysis-resource.js.map
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
(function () {
    ngObibaMica.search
        .factory('VariableResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('VariableResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    cache: $cacheFactory('variableResource')
                }
            });
        }]);
})();
//# sourceMappingURL=variable-resource.js.map
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
(function () {
    ngObibaMica.search
        .factory('VariableSummaryResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('VariableSummaryResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    cache: $cacheFactory('variableSummaryResource')
                }
            });
        }]);
})();
//# sourceMappingURL=variable-summary-resource.js.map
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
(function () {
    function manageEntitiesCountHelpText($scope, $translate, $cookies) {
        var cookiesHelp = 'micaHideEntitiesCountHelpText';
        $translate(['analysis.entities-count.help'])
            .then(function (translation) {
            if (!$scope.options.EntitiesCountHelpText && !$cookies.get(cookiesHelp)) {
                $scope.options.EntitiesCountHelpText = translation['analysis.entities-count.help'];
            }
        });
        // Close the cart help box and set the local cookies
        $scope.closeHelpBox = function () {
            $cookies.put(cookiesHelp, true);
            $scope.options.EntitiesCountHelpText = null;
        };
        // Retrieve from local cookies if user has disabled the cart help box and hide the box if true
        if ($cookies.get(cookiesHelp)) {
            $scope.options.EntitiesCountHelpText = null;
        }
    }
    ngObibaMica.analysis
        .controller('EntitiesCountController', [
        '$scope',
        '$location',
        '$translate',
        '$cookies',
        'LocalizedValues',
        'AnalysisConfigService',
        'EntitiesCountResource',
        'AlertService',
        'ServerErrorUtils',
        'ngObibaMicaAnalysisTemplateUrl',
        function ($scope, $location, $translate, $cookies, LocalizedValues, AnalysisConfigService, EntitiesCountResource, AlertService, ServerErrorUtils, ngObibaMicaAnalysisTemplateUrl) {
            $scope.options = AnalysisConfigService.getOptions();
            manageEntitiesCountHelpText($scope, $translate, $cookies);
            $scope.entitiesHeaderTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getHeaderUrl('entities');
            $scope.result = {};
            $scope.query = $location.search().query;
            $scope.loading = false;
            function refresh() {
                if ($scope.query) {
                    $scope.loading = true;
                    EntitiesCountResource.get({ query: $scope.query }, function onSuccess(response) {
                        $scope.result = response;
                        $scope.loading = false;
                        $scope.localizedTotal = ($scope.result.belowPrivacyThreshold ? '<' : '') + LocalizedValues.formatNumber($scope.result.total, $translate.use());
                    }, function onError(response) {
                        $scope.result = {};
                        $scope.loading = false;
                        AlertService.alert({
                            id: 'EntitiesCountController',
                            type: 'danger',
                            msg: ServerErrorUtils.buildMessage(response),
                            delay: 5000
                        });
                    });
                }
                else {
                    $scope.result = {};
                }
            }
            refresh();
            $scope.$on('$locationChangeSuccess', function () {
                $scope.query = $location.search().query;
                refresh();
            });
        }
    ]);
})();
//# sourceMappingURL=analysis-controller.js.map
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
ngObibaMica.analysis
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/entities-count', {
            templateUrl: 'analysis/views/analysis-entities-count.html',
            controller: 'EntitiesCountController',
            reloadOnSearch: false
        });
    }]);
//# sourceMappingURL=analysis-router.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var AnalysisConfigService = /** @class */ (function () {
    function AnalysisConfigService() {
        this.options = {
            crosstab: {
                showDetailedStats: true,
            },
            showAnalysis: true,
        };
    }
    AnalysisConfigService.prototype.setOptions = function (newOptions) {
        var _this = this;
        if (typeof (newOptions) === "object") {
            Object.keys(newOptions).forEach(function (option) {
                if (option in _this.options) {
                    _this.options[option] = newOptions[option];
                }
            });
        }
    };
    AnalysisConfigService.prototype.getOptions = function () {
        return angular.copy(this.options);
    };
    AnalysisConfigService.prototype.showAnalysis = function () {
        return this.options.showAnalysis;
    };
    return AnalysisConfigService;
}());
ngObibaMica.analysis.service("AnalysisConfigService", [AnalysisConfigService]);
//# sourceMappingURL=analysis-config-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ChiSquaredCalculator = /** @class */ (function () {
    function ChiSquaredCalculator() {
    }
    ChiSquaredCalculator.prototype.compute = function (chiSquaredInfo) {
        var Chisqcdf = null;
        var Z = chiSquaredInfo.sum;
        var DF = chiSquaredInfo.df;
        if (DF <= 0) {
            // console.log("Degrees of freedom must be positive");
        }
        else {
            Chisqcdf = this.gammacdf(Z / 2, DF / 2);
        }
        Chisqcdf = Math.round(Chisqcdf * 100000) / 100000;
        return Chisqcdf;
    };
    ChiSquaredCalculator.prototype.logGamma = function (Z) {
        var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) +
            0.00120858003 / (Z + 4) - 0.00000536382 / (Z + 5);
        var LG = (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
        return LG;
    };
    // Good for X>A+1.
    ChiSquaredCalculator.prototype.gcf = function (X, A) {
        var A0 = 0;
        var B0 = 1;
        var A1 = 1;
        var B1 = X;
        var AOLD = 0;
        var N = 0;
        while (Math.abs((A1 - AOLD) / A1) > 0.00001) {
            AOLD = A1;
            N = N + 1;
            A0 = A1 + (N - A) * A0;
            B0 = B1 + (N - A) * B0;
            A1 = X * A0 + N * A1;
            B1 = X * B0 + N * B1;
            A0 = A0 / B1;
            B0 = B0 / B1;
            A1 = A1 / B1;
            B1 = 1;
        }
        var Prob = Math.exp(A * Math.log(X) - X - this.logGamma(A)) * A1;
        return 1 - Prob;
    };
    // Good for X<A+1.
    ChiSquaredCalculator.prototype.gser = function (X, A) {
        var T9 = 1 / A;
        var G = T9;
        var I = 1;
        while (T9 > G * 0.00001) {
            T9 = T9 * X / (A + I);
            G = G + T9;
            I = I + 1;
        }
        G = G * Math.exp(A * Math.log(X) - X - this.logGamma(A));
        return G;
    };
    ChiSquaredCalculator.prototype.gammacdf = function (x, a) {
        var GI;
        if (x <= 0) {
            GI = 0;
        }
        else if (x < a + 1) {
            GI = this.gser(x, a);
        }
        else {
            GI = this.gcf(x, a);
        }
        return GI;
    };
    return ChiSquaredCalculator;
}());
ngObibaMica.DatasetVariableCrosstab.service("ChiSquaredCalculator", [ChiSquaredCalculator]);
//# sourceMappingURL=crosstab-chisquared-calculator.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ContingencyService = /** @class */ (function () {
    function ContingencyService() {
    }
    ContingencyService.prototype.removeVariableFromUrl = function (path) {
        return path.replace(/\/variable\/.*/, "");
    };
    ContingencyService.prototype.getCrossDownloadUrl = function (params) {
        return this.searchReplace(":dsType/:dsId/download_:docType/cross/:v1/by/:v2/ws", params);
    };
    ContingencyService.prototype.createVariableUrlPart = function (var1, var2) {
        return this.searchReplace("variable/:var/by/:by", {
            ":by": var2,
            ":var": var1,
        });
    };
    ContingencyService.prototype.searchReplace = function (pattern, params) {
        return pattern.replace(/:\w+/g, function (all) {
            return params[all] || all;
        });
    };
    return ContingencyService;
}());
ngObibaMica.DatasetVariableCrosstab.service("ContingencyService", [ContingencyService]);
//# sourceMappingURL=crosstab-contingency-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var EntitiesCountService = /** @class */ (function () {
    function EntitiesCountService($location, ObibaServerConfigResource) {
        this.$location = $location;
        this.ObibaServerConfigResource = ObibaServerConfigResource;
        var that = this;
        ObibaServerConfigResource.get(function (micaConfig) {
            that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        });
    }
    EntitiesCountService.prototype.isSingleStudy = function () {
        return !this.hasMultipleStudies;
    };
    /**
     * Replace the original query with the new one in the browser location. If new query is empty,
     * the criteria is to be removed.
     * @param originalQuery Query before update
     * @param newQuery Query after update
     */
    EntitiesCountService.prototype.update = function (originalQuery, newQuery) {
        if (originalQuery === newQuery) {
            return;
        }
        var search = this.$location.search();
        search.query = search.query.split(originalQuery).join("").replace(/,,/, ",").replace(/^,/, "").replace(/,$/, "");
        if (newQuery && newQuery.length !== 0) {
            if (search.query && search.query.length > 0) {
                search.query = search.query + "," + newQuery;
            }
            else {
                search.query = newQuery;
            }
        }
        this.$location.search(search);
    };
    EntitiesCountService.$inject = ["$location", "ObibaServerConfigResource"];
    return EntitiesCountService;
}());
ngObibaMica.analysis.service("EntitiesCountService", ["$location", "ObibaServerConfigResource", EntitiesCountService]);
//# sourceMappingURL=entities-count-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CrosstabStudyTableController = /** @class */ (function () {
    function CrosstabStudyTableController(PageUrlService) {
        this.PageUrlService = PageUrlService;
        this.contingency = {};
    }
    CrosstabStudyTableController.prototype.$onChanges = function () {
        if (this.contingency.studyTable) {
            this.studyLink = this.PageUrlService.studyPage(this.contingency.studyTable.studyId, "individual-study");
        }
    };
    CrosstabStudyTableController.$inject = ["PageUrlService"];
    return CrosstabStudyTableController;
}());
var CrosstabStudyTableComponent = /** @class */ (function () {
    function CrosstabStudyTableComponent() {
        this.transclude = true;
        this.bindings = {
            contingency: "<",
        };
        this.controller = CrosstabStudyTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/crosstab-study-table/component.html";
    }
    return CrosstabStudyTableComponent;
}());
ngObibaMica.DatasetVariableCrosstab
    .component("crosstabStudyTable", new CrosstabStudyTableComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var EntitiesCountResultTableController = /** @class */ (function () {
    function EntitiesCountResultTableController(PageUrlService, LocalizedValues, EntitiesCountService, $translate, $log) {
        this.PageUrlService = PageUrlService;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$translate = $translate;
        this.$log = $log;
        this.result = {};
    }
    EntitiesCountResultTableController.prototype.$onInit = function () {
        this.table = {
            rows: new Array(),
        };
    };
    EntitiesCountResultTableController.prototype.$onChanges = function () {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues.formatNumber(this.result.total ? this.result.total : 0);
        if (this.result.belowPrivacyThreshold) {
            this.localizedTotal = "<" + this.localizedTotal;
        }
    };
    EntitiesCountResultTableController.prototype.showStudyColumn = function () {
        return !this.EntitiesCountService.isSingleStudy();
    };
    EntitiesCountResultTableController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    EntitiesCountResultTableController.prototype.asTable = function () {
        var _this = this;
        var table = {
            rows: new Array(),
        };
        this.studyCount = this.result.counts ? this.result.counts.length : 0;
        if (this.studyCount) {
            this.result.counts.forEach(function (studyResult) {
                var studyAcronym = _this.localize(studyResult.study.acronym);
                var studyName = _this.localize(studyResult.study.name);
                if (studyResult.counts) {
                    var studyRowCount_1 = 0;
                    studyResult.counts.forEach(function (datasetResult) {
                        var datasetAcronym = _this.localize(datasetResult.dataset.acronym);
                        var datasetName = _this.localize(datasetResult.dataset.name);
                        if (datasetResult.counts) {
                            datasetResult.counts.forEach(function (variableResult) {
                                var parts = variableResult.variable.id.split(":");
                                var variableName = parts[1];
                                if (variableResult.studyTableName) {
                                    variableName = variableName + " (" + _this.localize(variableResult.studyTableName) + ")";
                                }
                                var variableType = parts[2];
                                var variableLink = _this.PageUrlService.variablePage(variableResult.variable.id);
                                var datasetLink = _this.PageUrlService.datasetPage(datasetResult.dataset.id, variableType);
                                var studyType = variableType === "Dataschema" ? "harmonization" : "individual";
                                var row = new Array({
                                    colspan: 1,
                                    link: _this.PageUrlService.studyPage(studyResult.study.id, studyType),
                                    rowspan: studyRowCount_1 === 0 ? 1 : 0,
                                    title: studyRowCount_1 === 0 ? studyName : "",
                                    value: studyRowCount_1 === 0 ? studyAcronym : "",
                                }, {
                                    colspan: 1,
                                    link: variableLink ? variableLink : datasetLink,
                                    rowspan: 1,
                                    title: _this.localize(variableResult.variable.name),
                                    value: variableName,
                                }, {
                                    colspan: 1,
                                    link: datasetLink,
                                    rowspan: 1,
                                    title: datasetName,
                                    value: datasetAcronym,
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: variableResult.query,
                                    value: variableResult.query,
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: undefined,
                                    value: _this.LocalizedValues.formatNumber(variableResult.count),
                                });
                                table.rows.push(row);
                                studyRowCount_1++;
                            });
                        }
                    });
                    table.rows[table.rows.length - studyRowCount_1][0].rowspan = studyRowCount_1 + 1;
                    table.rows.push(new Array({
                        colspan: 1,
                        rowspan: 0,
                        title: undefined,
                        value: undefined,
                    }, {
                        colspan: 3,
                        rowspan: 1,
                        title: studyResult.query,
                        value: undefined,
                    }, {
                        colspan: 1,
                        rowspan: 1,
                        title: undefined,
                        value: (studyResult.belowPrivacyThreshold ? "<" : "")
                            + _this.LocalizedValues.formatNumber(studyResult.total),
                    }));
                }
            });
        }
        return table;
    };
    EntitiesCountResultTableController.$inject = ["PageUrlService", "LocalizedValues", "EntitiesCountService", "$translate", "$log"];
    return EntitiesCountResultTableController;
}());
var EntitiesCountResultTableComponent = /** @class */ (function () {
    function EntitiesCountResultTableComponent() {
        this.transclude = true;
        this.bindings = {
            result: "<",
        };
        this.controller = EntitiesCountResultTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/entities-count-result-table/component.html";
    }
    return EntitiesCountResultTableComponent;
}());
ngObibaMica.analysis
    .component("entitiesCountResultTable", new EntitiesCountResultTableComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var Operation;
(function (Operation) {
    Operation["All"] = "all";
    Operation["Exists"] = "exists";
    Operation["Empty"] = "empty";
    Operation["In"] = "in";
    Operation["Out"] = "out";
})(Operation || (Operation = {}));
var VariableCriteriaController = /** @class */ (function () {
    function VariableCriteriaController(VariableResource, VariableSummaryResource, LocalizedValues, EntitiesCountService, $log, $translate, $filter) {
        this.VariableResource = VariableResource;
        this.VariableSummaryResource = VariableSummaryResource;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$log = $log;
        this.$translate = $translate;
        this.$filter = $filter;
        this.query = "";
        this.state = { open: false };
        this.categoriesData = [];
        this.selectedCategories = {};
        this.selectedNumericalOperation = "range";
        this.selectedTemporalOperation = "range";
    }
    VariableCriteriaController.prototype.$onInit = function () {
        this.loading = true;
        this.initializeState();
    };
    /**
     * Close on return submit and escape. Submit the update request only on return.
     * @param event event to get the key
     */
    VariableCriteriaController.prototype.onKeyup = function (event) {
        if (event.keyCode === 13) {
            this.closeDropdown(false);
        }
        else if (event.keyCode === 27) {
            this.closeDropdown(true);
        }
    };
    /**
     * Applies the categories filter text: visible categories are the ones which label matches the searched text.
     * @param event ignored
     */
    VariableCriteriaController.prototype.onSearchTextKeyup = function (event) {
        var filter = this.searchText.trim();
        if (this.categoriesData) {
            var regex_1 = new RegExp(filter, "i");
            this.categoriesData.forEach(function (cat) {
                cat.visible = cat.label.match(regex_1) !== null;
            });
        }
    };
    VariableCriteriaController.prototype.onNumericalMinKeyup = function (event) {
        this.selectedMin = this.ensureNumericValue(this.selectedMin + "", " ");
    };
    VariableCriteriaController.prototype.onNumericalMaxKeyup = function (event) {
        this.selectedMax = this.ensureNumericValue(this.selectedMax + "", " ");
    };
    /**
     * Make sure numerical values are space separated numbers.
     * @param event ignored
     */
    VariableCriteriaController.prototype.onNumericalValuesKeyup = function (event) {
        this.selectedNumericalValues = this.ensureNumericValue(this.selectedNumericalValues, " ");
    };
    /**
     * Close the dropdown and submit update request if changes are detected.
     * @param cancel cancel update request if true
     */
    VariableCriteriaController.prototype.closeDropdown = function (cancel) {
        this.state.open = false;
        if (cancel) {
            return;
        }
        this.update(this.makeNewQuery());
    };
    /**
     * Open the dropdown.
     */
    VariableCriteriaController.prototype.openDropdown = function () {
        if (this.state.open) {
            this.closeDropdown(false);
            return;
        }
        this.state.open = true;
    };
    /**
     * Removes the criteria.
     */
    VariableCriteriaController.prototype.onRemove = function () {
        this.update("");
    };
    /**
     * Get a human readable translated label of the criteria query.
     * @param truncated true if the title is to be truncated
     */
    VariableCriteriaController.prototype.getQueryTitle = function (truncated) {
        var _this = this;
        if (!this.rqlQuery) {
            return "?";
        }
        var title = this.getOperationTitle();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (rqlQueryWithArgs.args.length > 1) {
            var items = rqlQueryWithArgs.args[1];
            if (this.getNature() === "CATEGORICAL") {
                items = items.map(function (x) { return _this.localizeCategory(x); });
            }
            if (rqlQueryWithArgs.name === "range") {
                title = title + " [" + items.join(", ") + "]";
            }
            else {
                title = title + " (" + items.join(", ") + ")";
            }
        }
        if (!truncated) {
            return title.length > 50 ? title : "";
        }
        return title.length > 50 ? title.substring(0, 50) + "..." : title;
    };
    /**
     * Check wether there are options for this criteria.
     */
    VariableCriteriaController.prototype.showInOperations = function () {
        return this.getNature() === "CATEGORICAL" || this.isNumerical() || this.isTemporal();
    };
    /**
     * Check whether the categorical options are to be shown.
     */
    VariableCriteriaController.prototype.showCategoricalOptions = function () {
        return this.getNature() === "CATEGORICAL" && this.showOptions();
    };
    /**
     * Check whether the numerical options are to be shown.
     */
    VariableCriteriaController.prototype.showNumericalOptions = function () {
        return this.getNature() === "CONTINUOUS" && this.isNumerical() && this.showOptions();
    };
    /**
     * Check whether the temporal options are to be shown.
     */
    VariableCriteriaController.prototype.showTemporalOptions = function () {
        return this.getNature() === "TEMPORAL" && this.isTemporal() && this.showOptions();
    };
    VariableCriteriaController.prototype.localizeNumber = function (value) {
        return this.LocalizedValues.formatNumber(value);
    };
    /**
     * Parse the query and initialize the component state with variable information.
     */
    VariableCriteriaController.prototype.initializeState = function () {
        this.rqlQuery = this.parseQuery();
        if (this.rqlQuery.args) {
            var rqlQueryWithArgs = this.getQueryWithArgs();
            // get variable from field name
            this.id = rqlQueryWithArgs.args[0].join(":");
            this.VariableResource.get({ id: this.id }, this.onVariable(), this.onError());
        }
    };
    VariableCriteriaController.prototype.getQueryWithArgs = function () {
        return this.isQueryNot() ? this.rqlQuery.args[0] : this.rqlQuery;
    };
    VariableCriteriaController.prototype.isQueryNot = function () {
        return this.rqlQuery.name === "not";
    };
    /**
     * Replace the original query by the new one. If query is empty, the criteria is to be removed.
     * @param newQuery critera query
     */
    VariableCriteriaController.prototype.update = function (newQuery) {
        this.EntitiesCountService.update(this.query, newQuery);
    };
    /**
     * Check if none of the global operations are selected (all, exists, empty).
     */
    VariableCriteriaController.prototype.showOptions = function () {
        return Operation.All !== this.selectedOperation
            && Operation.Exists !== this.selectedOperation
            && Operation.Empty !== this.selectedOperation;
    };
    /**
     * Get the variable's nature.
     */
    VariableCriteriaController.prototype.getNature = function () {
        return this.variable ? this.variable.nature : "?";
    };
    /**
     * Check if the variable has a numerical type (integer or decimal).
     */
    VariableCriteriaController.prototype.isNumerical = function () {
        return this.variable && (this.variable.valueType === "integer" || this.variable.valueType === "decimal");
    };
    /**
     * Check if the variable has a logical type (boolean).
     */
    VariableCriteriaController.prototype.isLogical = function () {
        return this.variable && this.variable.valueType === "boolean";
    };
    /**
     * Check if the variable has a numerical type (integer or decimal).
     */
    VariableCriteriaController.prototype.isTemporal = function () {
        return this.variable && (this.variable.valueType === "date" || this.variable.valueType === "datetime");
    };
    /**
     * Get the translated label of the criteria query operation.
     */
    VariableCriteriaController.prototype.getOperationTitle = function () {
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (this.isNotQuery()) {
            if (rqlQueryWithArgs.name === "exists") {
                return this.$filter("translate")("analysis.empty");
            }
            else {
                return this.$filter("translate")("analysis.out");
            }
        }
        return this.$filter("translate")("analysis." + (rqlQueryWithArgs.name === "range" ? "in" : rqlQueryWithArgs.name));
    };
    /**
     * Get the RQL query node that contains the criteria arguments.
     */
    VariableCriteriaController.prototype.getRqlQueryWithArgs = function () {
        if (this.isNotQuery()) {
            return this.rqlQuery.args[0];
        }
        return this.rqlQuery;
    };
    /**
     * Check if the RQL query node is a 'not' operation.
     */
    VariableCriteriaController.prototype.isNotQuery = function () {
        return this.rqlQuery && this.rqlQuery.name === "not";
    };
    /**
     * Parse the query string as a RQL query node.
     */
    VariableCriteriaController.prototype.parseQuery = function () {
        try {
            return new RqlParser().parse(this.normalize(this.query)).args[0];
        }
        catch (e) {
            this.$log.error(e.message);
        }
        return new RqlQuery();
    };
    /**
     * Variable identifier separator is not valid for the RQL parser: using path separator, the RQL parser will
     * split the variable identifier tokens automatically.
     * @param str variable identifier
     */
    VariableCriteriaController.prototype.normalize = function (str) {
        return str.split(":").join("/");
    };
    /**
     * Get the translated label of a variable category.
     * @param value category name
     */
    VariableCriteriaController.prototype.localizeCategory = function (value) {
        if (!this.variable.categories) {
            return this.isLogical() ? this.$filter("translate")("global." + value) : value;
        }
        var categories = this.variable.categories.filter(function (cat) { return cat.name === value + ""; });
        if (categories.length === 0) {
            return value;
        }
        var category = categories[0];
        if (!category.attributes) {
            return value;
        }
        var labels = category.attributes.filter(function (attr) { return attr.name === "label"; });
        if (labels.length === 0) {
            return value;
        }
        var label = this.localize(labels[0].values);
        return label || value;
    };
    /**
     * Extract the translation for the current language.
     * @param values labels object
     */
    VariableCriteriaController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    /**
     * Extract the categories from the variable object.
     */
    VariableCriteriaController.prototype.prepareCategories = function () {
        var _this = this;
        this.categoriesData = [];
        if (this.getNature() === "CATEGORICAL") {
            var categories = this.variable.categories;
            if (categories) {
                categories.forEach(function (cat) {
                    _this.categoriesData.push({
                        label: _this.localizeCategory(cat.name),
                        name: cat.name,
                        visible: true,
                    });
                });
            }
            else if (this.isLogical()) {
                this.categoriesData.push({
                    label: this.$filter("translate")("global.true"),
                    name: "true",
                    visible: true,
                });
                this.categoriesData.push({
                    label: this.$filter("translate")("global.false"),
                    name: "false",
                    visible: true,
                });
            }
        }
    };
    /**
     * Set the state of the options according to the variable and the query.
     */
    VariableCriteriaController.prototype.prepareOptions = function () {
        var _this = this;
        this.prepareCategories();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        // get categories if any
        if (rqlQueryWithArgs.args.length > 1) {
            if (rqlQueryWithArgs.name === "in") {
                if (this.showCategoricalOptions()) {
                    rqlQueryWithArgs.args[1].forEach(function (value) {
                        _this.selectedCategories[value] = true;
                    });
                }
                else if (this.showNumericalOptions()) {
                    this.selectedNumericalOperation = "in";
                    this.selectedNumericalValues = rqlQueryWithArgs.args[1].filter(function (val) { return !isNaN(val); }).join(" ");
                }
                else if (this.showTemporalOptions()) {
                    this.selectedTemporalOperation = "in";
                    this.selectedTemporalValue = rqlQueryWithArgs.args[1].length > 0 ?
                        new Date(Date.parse(rqlQueryWithArgs.args[1][0])) : undefined;
                }
            }
            else if (rqlQueryWithArgs.name === "range" && rqlQueryWithArgs.args[1].length > 0) {
                var arg1 = rqlQueryWithArgs.args[1][0];
                if (arg1 === "*") {
                    this.selectedMin = undefined;
                    this.selectedFrom = undefined;
                }
                else if (this.showNumericalOptions() && !isNaN(arg1)) {
                    this.selectedMin = arg1;
                }
                else if (this.showTemporalOptions()) {
                    this.selectedFrom = new Date(Date.parse(arg1));
                }
                if (rqlQueryWithArgs.args[1].length >= 2) {
                    var arg2 = rqlQueryWithArgs.args[1][1];
                    if (arg2 === "*") {
                        this.selectedMax = undefined;
                        this.selectedTo = undefined;
                    }
                    else if (this.showNumericalOptions() && !isNaN(arg2)) {
                        this.selectedMax = arg2;
                    }
                    else if (this.showTemporalOptions()) {
                        this.selectedTo = new Date(Date.parse(arg2));
                    }
                }
            }
        }
        this.selectedOperation = this.rqlQuery.name === "range" ? "in" : this.rqlQuery.name;
        if (this.isQueryNot() && (rqlQueryWithArgs.name === "in" || rqlQueryWithArgs.name === "range")) {
            this.selectedOperation = "out";
        }
        if (this.isQueryNot() && rqlQueryWithArgs.name === "exists") {
            this.selectedOperation = "empty";
        }
    };
    VariableCriteriaController.prototype.ensureNumericValue = function (selection, separator) {
        var values = "";
        if (selection) {
            for (var i = 0; i < selection.length; i++) {
                var c = selection.charAt(i);
                if (c === separator
                    || (this.variable.valueType === "decimal" && c === ".")
                    || c === "-"
                    || !isNaN(parseInt(c, 10))) {
                    values = values + c;
                }
            }
        }
        return values;
    };
    /**
     * Get the new query from the selections.
     */
    VariableCriteriaController.prototype.makeNewQuery = function () {
        var _this = this;
        var newQuery = "";
        var args;
        if (this.showCategoricalOptions()) {
            args = Object.keys(this.selectedCategories).filter(function (key) {
                return _this.selectedCategories[key];
            }).map(function (key) { return key; }).join(",");
        }
        if (this.showNumericalOptions()) {
            if (this.selectedNumericalOperation === "range") {
                var min = this.selectedMin && this.selectedMin !== "-" ? this.selectedMin : "*";
                var max = this.selectedMax && this.selectedMax !== "-" ? this.selectedMax : "*";
                args = [min, max].join(",");
            }
            else {
                args = this.selectedNumericalValues.split(" ").join(",");
            }
        }
        if (this.showTemporalOptions()) {
            if (this.selectedTemporalOperation === "range") {
                var min = this.selectedFrom ? this.dateToString(this.selectedFrom) : "*";
                var max = this.selectedTo ? this.dateToString(this.selectedTo) : "*";
                args = [min, max].join(",");
            }
            else {
                args = this.dateToString(this.selectedTemporalValue);
            }
        }
        switch (this.selectedOperation) {
            case Operation.All:
            case Operation.Exists:
                newQuery = this.selectedOperation + "({field})";
                break;
            case Operation.Empty:
                newQuery = "not(exists({field}))";
                break;
            case Operation.In:
                if (args && args.length > 0) {
                    if (this.showCategoricalOptions()
                        || (this.showNumericalOptions() && this.selectedNumericalOperation === "in")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "in")) {
                        newQuery = "in({field},({args}))";
                    }
                    else if ((this.showNumericalOptions() && this.selectedNumericalOperation === "range")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "range")) {
                        newQuery = "range({field},({args}))";
                    }
                }
                else {
                    newQuery = "not(exists({field}))";
                    this.selectedOperation = "empty";
                }
                break;
            case Operation.Out:
                if (args && args.length > 0) {
                    if (this.showCategoricalOptions()
                        || (this.showNumericalOptions() && this.selectedNumericalOperation === "in")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "in")) {
                        newQuery = "not(in({field},({args})))";
                    }
                    else if ((this.showNumericalOptions() && this.selectedNumericalOperation === "range")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "range")) {
                        newQuery = "not(range({field},({args})))";
                    }
                }
                else {
                    newQuery = "exists({field})";
                    this.selectedOperation = "exists";
                }
        }
        newQuery = newQuery.replace("{field}", this.variable.id);
        newQuery = newQuery.replace("{args}", args);
        return newQuery;
    };
    VariableCriteriaController.prototype.dateToString = function (date) {
        if (!date) {
            return "";
        }
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
    };
    /**
     * Variable response processor.
     */
    VariableCriteriaController.prototype.onVariable = function () {
        var that = this;
        return function (response) {
            that.variable = response;
            that.loading = false;
            that.prepareOptions();
            that.VariableSummaryResource.get({ id: response.id }, that.onVariableSummary(), that.onError());
        };
    };
    /**
     * Variable summary response processor.
     */
    VariableCriteriaController.prototype.onVariableSummary = function () {
        var that = this;
        return function (response) {
            that.summary = response;
            if (that.summary["Math.ContinuousSummaryDto.continuous"]) {
                var summary = that.summary["Math.ContinuousSummaryDto.continuous"].summary;
                that.rangeMin = summary.min;
                that.rangeMax = summary.max;
                var frequencies = that.summary["Math.ContinuousSummaryDto.continuous"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function (elem) { return elem.value === "NOT_NULL"; }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                var emptyFreq = frequencies.filter(function (elem) { return elem.value === "N/A"; }).pop();
                that.emptyFrequency = emptyFreq ? emptyFreq.freq : 0;
                that.allFrequency = that.existsFrequency + that.emptyFrequency;
            }
            if (that.summary["Math.CategoricalSummaryDto.categorical"]) {
                var frequencies_1 = that.summary["Math.CategoricalSummaryDto.categorical"].frequencies;
                that.categoriesData.forEach(function (cat) {
                    var freqs = frequencies_1.filter(function (elem) { return elem.value === cat.name; });
                    if (freqs.length > 0) {
                        cat.frequency = freqs[0].freq;
                    }
                });
                that.allFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].n;
                that.existsFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].otherFrequency +
                    frequencies_1.filter(function (elem) { return elem.value !== "N/A"; }).map(function (elem) { return elem.freq; }).reduce(function (acc, curr) { return acc + curr; });
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.TextSummaryDto.textSummary"]) {
                that.allFrequency = that.summary["Math.TextSummaryDto.textSummary"].n;
                var frequencies = that.summary["Math.TextSummaryDto.textSummary"].frequencies;
                if (frequencies) {
                    that.existsFrequency = frequencies.filter(function (elem) { return elem.value !== "N/A"; })
                        .map(function (elem) { return elem.freq; }).reduce(function (acc, curr) { return acc + curr; });
                }
                if (that.summary["Math.TextSummaryDto.textSummary"].otherFrequency) {
                    that.existsFrequency = that.existsFrequency + that.summary["Math.TextSummaryDto.textSummary"].otherFrequency;
                }
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.DefaultSummaryDto.defaultSummary"]) {
                that.allFrequency = that.summary["Math.DefaultSummaryDto.defaultSummary"].n;
                var frequencies = that.summary["Math.DefaultSummaryDto.defaultSummary"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function (elem) { return elem.value === "NOT_NULL"; }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
        };
    };
    /**
     * General error handler (to be improved).
     */
    VariableCriteriaController.prototype.onError = function () {
        var that = this;
        return function (response) {
            that.variable = undefined;
            that.loading = false;
        };
    };
    VariableCriteriaController.$inject = [
        "VariableResource", "VariableSummaryResource", "LocalizedValues", "EntitiesCountService",
        "$log", "$translate", "$filter"
    ];
    return VariableCriteriaController;
}());
var VariableCriteriaComponent = /** @class */ (function () {
    function VariableCriteriaComponent() {
        this.transclude = true;
        this.bindings = {
            query: "<",
        };
        this.controller = VariableCriteriaController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/variable-criteria/component.html";
    }
    return VariableCriteriaComponent;
}());
ngObibaMica.analysis
    .component("variableCriteria", new VariableCriteriaComponent());
//# sourceMappingURL=component.js.map
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
function NgObibaMicaListsOptionsFactory() {
    var defaultOptions = {
        listSearchOptions: {
            network: {
                fields: ['studyIds', 'acronym.*', 'name.*', 'description.*', 'logo']
            },
            study: {
                fields: ['logo', 'objectives.*', 'acronym.*', 'name.*', 'model.methods.design', 'model.numberOfParticipants.participant']
            },
            dataset: {
                fields: ['acronym.*', 'name.*', 'description.*', 'variableType',
                    'studyTable.studyId',
                    'studyTable.project',
                    'studyTable.table',
                    'studyTable.populationId',
                    'studyTable.dataCollectionEventId',
                    'harmonizationTable.studyId',
                    'harmonizationTable.project',
                    'harmonizationTable.table',
                    'harmonizationTable.populationId'
                ]
            }
        },
        listOptions: {
            networkOptions: {
                showStudyBadge: true,
                showDatasetBadge: true,
                showVariableBadge: true
            },
            studyOptions: {
                studiesCountCaption: true,
                studiesSearchForm: true,
                studiesSupplInfoDetails: true,
                studiesTrimmedDescription: true,
                showNetworkBadge: true,
                showDatasetBadge: true,
                showVariableBadge: true
            },
            datasetOptions: {
                showNetworkBadge: true,
                showStudyBadge: true,
                showVariableBadge: true
            }
        }
    };
    function NgObibaMicaListsOptions() {
        this.getOptions = function () {
            return defaultOptions;
        };
    }
    this.$get = function () {
        return new NgObibaMicaListsOptions();
    };
    this.setOptions = function (value) {
        Object.keys(value).forEach(function (option) {
            if (option in defaultOptions) {
                defaultOptions[option] = value[option];
            }
        });
    };
}
function SortWidgetOptionsProvider() {
    var defaultOptions = {
        sortOrderField: {
            options: [
                {
                    value: '-_score',
                    label: 'relevance'
                },
                {
                    value: 'name',
                    label: 'name'
                },
                {
                    value: '-name',
                    label: 'name'
                },
                {
                    value: 'acronym',
                    label: 'acronym'
                },
                {
                    value: '-acronym',
                    label: 'acronym'
                }
            ],
            defaultValue: '-_score'
        }
    };
    var self = this;
    function SortWidgetOptions(defaultOptions) {
        var options = defaultOptions;
        this.getOptions = function () {
            return options;
        };
    }
    this.getDefaultOptions = function () {
        return self.defaultOptions;
    };
    this.$get = function () {
        return new SortWidgetOptions(defaultOptions);
    };
    this.setOptions = function (value) {
        Object.keys(value).forEach(function (optionKey) {
            if (optionKey in defaultOptions) {
                if (value[optionKey].options) {
                    defaultOptions[optionKey].options = defaultOptions[optionKey].options.concat(value[optionKey].options);
                    defaultOptions[optionKey].default = value[optionKey].default;
                }
            }
        });
    };
}
ngObibaMica.lists = angular.module('obiba.mica.lists', ['obiba.mica.search']);
ngObibaMica.lists
    .run()
    .config(['$provide', function ($provide) {
        $provide.provider('ngObibaMicaLists', NgObibaMicaListsOptionsFactory);
    }])
    .config(['ngObibaMicaSearchTemplateUrlProvider',
    function (ngObibaMicaSearchTemplateUrlProvider) {
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchStudiesResultTable', 'lists/views/list/studies-search-result-table-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchNetworksResultTable', 'lists/views/list/networks-search-result-table-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchDatasetsResultTable', 'lists/views/list/datasets-search-result-table-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchResultList', 'lists/views/search-result-list-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchInputList', 'lists/views/input-search-widget/input-search-widget-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchCriteriaRegionTemplate', 'lists/views/region-criteria/search-criteria-region-template.html');
        ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('CriterionDropdownTemplate', 'lists/views/region-criteria/criterion-dropdown-template.html');
    }])
    .config(['$provide', function ($provide) {
        $provide.provider('sortWidgetOptions', SortWidgetOptionsProvider);
    }])
    .filter('getBaseUrl', function () {
    return function (param) {
        return '/mica/' + param;
    };
})
    .filter('doSearchQuery', function () {
    return function (type, query) {
        return '/mica/repository#/search?type=' + type + '&query=' + query + '&display=list';
    };
});
//# sourceMappingURL=lists.js.map
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
/* global targetToType */
ngObibaMica.lists
    .service('sortWidgetService', ['$filter', '$location', 'RqlQueryService', 'sortWidgetOptions', function ($filter, $location, RqlQueryService, sortWidgetOptions) {
        var newOptions = sortWidgetOptions.getOptions();
        var self = this;
        this.getSortOrderOptions = function () {
            newOptions.sortOrderField.options.map(function (option) {
                return $filter('translate')(option.label);
            });
            return {
                options: newOptions.sortOrderField.options
            };
        };
        this.getSortOrderOption = function (value) {
            var selectedOption = null;
            if (!value) {
                value = newOptions.sortOrderField.defaultValue;
            }
            angular.forEach(self.getSortOrderOptions().options, function (option) {
                if (option.value === value) {
                    selectedOption = option;
                }
            });
            return selectedOption ? selectedOption : self.getSortOrderOption(newOptions.sortOrderField.defaultValue);
        };
        this.getSortArg = function () {
            var search = $location.search();
            var rqlQuery = RqlQueryService.parseQuery(search.query);
            if (rqlQuery) {
                var rqlSort = RqlQueryService.getTargetQuerySort(targetToType(rqlQuery.args[0].name), rqlQuery);
                if (rqlSort) {
                    return rqlSort.args[0];
                }
            }
            return newOptions.sortOrderField.defaultValue;
        };
        this.getLabel = function (selectSort, valueSort) {
            var result = null;
            angular.forEach(selectSort.options, function (value) {
                if (value.value === valueSort) {
                    result = value.label;
                }
            });
            return result;
        };
    }]);
//# sourceMappingURL=lists-service.js.map
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
(function () {
    ngObibaMica.lists
        .controller('listSearchWidgetController', ['$scope', '$rootScope', '$location', 'RqlQueryService', 'ngObibaMicaUrl',
        function ($scope, $rootScope, $location, RqlQueryService, ngObibaMicaUrl) {
            function initMatchInput() {
                $scope.query = $location.search().query;
                $scope.target = typeToTarget($scope.type);
                $scope.rqlQuery = RqlQueryService.parseQuery($scope.query);
            }
            /**
             * Removes all other query parts except the ID or className criterion
             *
             * @returns query urk
             */
            $scope.navigateToSearchPage = function () {
                var targetQuery = RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));
                if (targetQuery) {
                    var query = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className') ||
                        RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'id');
                    if (query) {
                        targetQuery.args = [query];
                        var containerQuery = new RqlQuery(RQL_NODE.AND);
                        containerQuery.args.push(targetQuery);
                        return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=' +
                            $scope.type +
                            '&query=' +
                            (new RqlQuery().serializeArgs(containerQuery.args)) +
                            '&display=list';
                    }
                }
                return '';
            };
            $scope.$on('$locationChangeSuccess', function () {
                initMatchInput();
            });
            var emitter = $rootScope.$new();
            $scope.selectSuggestion = function (suggestion) {
                emitter.$emit('ngObibaMicaSearch.searchSuggestion', suggestion);
            };
            $scope.search = function () {
                emitter.$emit('ngObibaMicaSearch.searchSuggestion', $scope.searchFilter.replace(/\/.*/g, ''));
            };
            initMatchInput();
        }])
        .controller('listSortWidgetController', ['$scope', '$rootScope', 'sortWidgetService',
        function ($scope, $rootScope, sortWidgetService) {
            var emitter = $rootScope.$new();
            $scope.selectSortOrder = sortWidgetService.getSortOrderOptions();
            $scope.getLabel = sortWidgetService.getLabel;
            $scope.selected = $scope.selectSortOrder.options.defaultValue;
            initSelectedOptions();
            $scope.$on('$locationChangeSuccess', function () {
                initSelectedOptions();
            });
            $scope.selectSortOrderOption = function (option) {
                $scope.selected = option;
                emitter.$emit('ngObibaMicaSearch.sortChange', option.value);
            };
            function initSelectedOptions() {
                $scope.selected = sortWidgetService.getSortOrderOption(sortWidgetService.getSortArg());
            }
        }]);
})();
//# sourceMappingURL=lists-controller.js.map
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
ngObibaMica.lists
    .directive('listSortWidget', [function () {
        return {
            restrict: 'EA',
            controller: 'listSortWidgetController',
            templateUrl: 'lists/views/sort-widget/sort-widget-template.html'
        };
    }])
    .directive('listSearchWidget', ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
        return {
            restrict: 'EA',
            require: '^^suggestionField',
            transclude: true,
            replace: true,
            scope: {
                type: '='
            },
            controller: 'listSearchWidgetController',
            templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchInputList')
        };
    }])
    .directive('suggestionField', ['$location', 'DocumentSuggestionResource', '$translate', 'RqlQueryService', 'EntitySuggestionService',
    function ($location, DocumentSuggestionResource, $translate, RqlQueryService, EntitySuggestionService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                documentType: '=',
                model: '=',
                placeholderText: '=',
                select: '='
            },
            templateUrl: 'lists/views/input-search-widget/suggestion-field.html',
            link: function (scope) {
                scope.suggest = function (query) {
                    return EntitySuggestionService.suggestForTargetQuery(scope.documentType, query);
                };
            }
        };
    }]);
//# sourceMappingURL=lists-directive.js.map
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
function GraphicChartsDataProvider() {
    function DataProvider(dataResponse) {
        var data = dataResponse;
        this.getData = function (callback) {
            if (callback) {
                data.$promise.then(callback);
            }
        };
    }
    this.$get = ['$log', 'JoinQuerySearchResource', 'ServerErrorUtils', 'AlertService', 'GraphicChartsConfig', 'GraphicChartsQuery',
        function ($log, JoinQuerySearchResource, ServerErrorUtils, AlertService, GraphicChartsConfig, GraphicChartsQuery) {
            var queryDto = GraphicChartsQuery.queryDtoBuilder(GraphicChartsConfig.getOptions().entityIds, GraphicChartsConfig.getOptions().entityType);
            return new DataProvider(JoinQuerySearchResource.studies({
                query: queryDto
            }, function onSuccess(response) {
                return response;
            }, function (response) {
                $log.error('Server error', response);
            }));
        }];
}
ngObibaMica.graphics = angular.module('obiba.mica.graphics', [
    'obiba.graphics',
    'obiba.utils',
    'templates-ngObibaMica'
]);
ngObibaMica.graphics
    .config(['$provide', function ($provide) {
        $provide.provider('GraphicChartsData', GraphicChartsDataProvider);
    }])
    .run(['GraphicChartsConfigurations',
    function (GraphicChartsConfigurations) {
        GraphicChartsConfigurations.setClientConfig();
    }]);
//# sourceMappingURL=graphics.js.map
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
ngObibaMica.graphics
    .directive('obibaChart', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                fieldTransformer: '=',
                chartType: '=',
                chartAggregationName: '=',
                chartEntityDto: '=',
                chartOptionsName: '=',
                chartOptions: '=',
                chartHeader: '=',
                chartTitle: '=',
                chartTitleGraph: '=',
                chartSelectGraphic: '='
            },
            templateUrl: 'graphics/views/charts-directive.html',
            controller: 'GraphicChartsController'
        };
    }])
    .directive('obibaTable', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                fieldTransformer: '=',
                chartType: '@',
                chartAggregationName: '=',
                chartEntityDto: '=',
                chartOptionsName: '=',
                chartOptions: '=',
                chartHeader: '=',
                chartTitle: '=',
                chartTitleGraph: '=',
                chartSelectGraphic: '=',
                chartOrdered: '=',
                chartNotOrdered: '='
            },
            templateUrl: 'graphics/views/tables-directive.html',
            controller: 'GraphicChartsController'
        };
    }]);
//# sourceMappingURL=graphics-directive.js.map
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
ngObibaMica.graphics
    .controller('GraphicChartsController', [
    '$rootScope',
    '$scope',
    '$filter',
    '$window',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    'RqlQueryService',
    'ngObibaMicaUrl',
    'D3GeoConfig', 'D3ChartConfig',
    function ($rootScope, $scope, $filter, $window, GraphicChartsConfig, GraphicChartsUtils, GraphicChartsData, RqlQueryService, ngObibaMicaUrl, D3GeoConfig, D3ChartConfig) {
        function initializeChartData() {
            $scope.chartObject = {};
            GraphicChartsData.getData(function (StudiesData) {
                if (StudiesData) {
                    GraphicChartsUtils.getArrayByAggregation($scope.chartAggregationName, StudiesData[$scope.chartEntityDto])
                        .then(function (entries) {
                        var data = entries.map(function (e) {
                            if (e.participantsNbr) {
                                return [e.title, e.value, e.participantsNbr];
                            }
                            else {
                                return [e.title, e.value];
                            }
                        });
                        $scope.updateCriteria = function (key, vocabulary) {
                            RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
                                var entity = GraphicChartsConfig.getOptions().entityType;
                                var id = GraphicChartsConfig.getOptions().entityIds;
                                var parts = item.id.split('.');
                                var urlRedirect = ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=studies&query=' +
                                    entity + '(in(Mica_' + entity + '.id,' + id + ')),study(in(' + parts[0] + '.' + parts[1] + ',' +
                                    parts[2].replace(':', '%253A') + '))';
                                $window.location.href = ngObibaMicaUrl.getUrl('BaseUrl') + urlRedirect;
                            });
                        };
                        if (data) {
                            if (/^Table-/.exec($scope.chartType) !== null) {
                                $scope.chartObject.ordered = $scope.chartOrdered;
                                $scope.chartObject.notOrdered = $scope.chartNotOrdered;
                                if ($scope.chartHeader.length < 3) {
                                    $scope.chartObject.header = [
                                        $filter('translate')($scope.chartHeader[0]),
                                        $filter('translate')($scope.chartHeader[1])
                                    ];
                                }
                                else {
                                    $scope.chartObject.header = [
                                        $filter('translate')($scope.chartHeader[0]),
                                        $filter('translate')($scope.chartHeader[1]),
                                        $filter('translate')($scope.chartHeader[2])
                                    ];
                                }
                                $scope.chartObject.type = $scope.chartType;
                                $scope.chartObject.data = data;
                                $scope.chartObject.vocabulary = $scope.chartAggregationName;
                                $scope.chartObject.entries = entries;
                                $scope.chartObject.getTable = function () {
                                    return $scope.chartObject;
                                };
                            }
                            else {
                                if ($scope.chartHeader.length < 3) {
                                    data.unshift([$filter('translate')($scope.chartHeader[0]), $filter('translate')($scope.chartHeader[1])]);
                                }
                                else {
                                    data.map(function (item) {
                                        item.pop();
                                        return item;
                                    });
                                    data.unshift([
                                        $filter('translate')($scope.chartHeader[0]),
                                        $filter('translate')($scope.chartHeader[1])
                                    ]);
                                }
                                $scope.chartObject.term = true;
                                $scope.chartObject.type = $scope.chartType;
                                $scope.chartObject.data = data;
                                $scope.chartObject.options = { backgroundColor: { fill: 'transparent' } };
                                angular.extend($scope.chartObject.options, $scope.chartOptions);
                                $scope.chartObject.options.title = $filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')';
                                $scope.$parent.directive = { title: $scope.chartObject.options.title };
                            }
                        }
                        if ($scope.chartType === 'GeoChart') {
                            $scope.chartObject.d3Config = new D3GeoConfig().withData(entries).withTitle($scope.chartObject.options.title);
                            if ($scope.chartObject.options) {
                                $scope.chartObject.d3Config.withColor($scope.chartOptions.colors);
                            }
                        }
                        else {
                            $scope.chartObject.d3Config = new D3ChartConfig($scope.chartAggregationName).withType($scope.chartType === 'PieChart' ? 'pieChart' : 'multiBarHorizontalChart')
                                .withData(entries, $scope.chartType === 'PieChart', $filter('translate')('graphics.nbr-studies'))
                                .withTitle($filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')');
                            if ($scope.chartType !== 'PieChart') {
                                $scope.chartObject.d3Config.options.chart.showLegend = false;
                            }
                            if ($scope.chartObject.options && $scope.chartObject.options.colors) {
                                $scope.chartObject.d3Config.options.chart.color = $scope.chartOptions.colors;
                            }
                            $scope.chartObject.d3Config.options.chart.legendPosition = 'right';
                            $scope.chartObject.d3Config.options.chart.legend = { margin: {
                                    top: 0,
                                    right: 10,
                                    bottom: 0,
                                    left: 0
                                } };
                        }
                    });
                }
            });
        }
        $scope.ready = true;
        $scope.$watch('chartAggregationName', function () {
            if ($scope.chartAggregationName) {
                initializeChartData();
            }
        });
    }
]);
//# sourceMappingURL=graphics-controller.js.map
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
ngObibaMica.graphics
    .factory('GraphicChartsDataResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
        var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
        var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
        var requestTransformer = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
            return str.join('&');
        };
        return $resource(resourceUrl, {}, {
            'studies': {
                method: method,
                headers: {
                    'Content-Type': contentType
                },
                errorHandler: true,
                params: { type: 'studies' },
                transformRequest: requestTransformer
            }
        });
    }])
    .service('GraphicChartsConfig', function () {
    var factory = {
        options: {
            entityIds: 'NaN',
            entityType: null,
            ChartsOptions: {
                geoChartOptions: {
                    header: ['graphics.country', 'graphics.nbr-studies'],
                    title: 'graphics.geo-chart-title',
                    options: {
                        backgroundColor: { fill: 'transparent' },
                        colors: [
                            '#e5edfb',
                            '#cfddf5',
                            '#b8cbed',
                            '#a0b8e2',
                            '#88a4d4'
                        ]
                    }
                },
                studiesDesigns: {
                    header: ['graphics.study-design', 'graphics.nbr-studies', 'graphics.number-participants'],
                    title: 'graphics.study-design-chart-title',
                    options: {
                        bars: 'horizontal',
                        series: {
                            0: { axis: 'nbrStudies' },
                            1: { axis: 'nbrParticipants' } // Bind series 0 to an axis
                        },
                        axes: {
                            x: {
                                nbrStudies: { side: 'top', label: 'Number of Studies' },
                                nbrParticipants: { label: 'Number of Participants' } // Bottom x-axis.
                            }
                        },
                        backgroundColor: { fill: 'transparent' },
                        colors: ['#b8cbed',
                            '#e5edfb',
                            '#cfddf5',
                            '#a0b8e2',
                            '#88a4d4']
                    }
                },
                numberParticipants: {
                    header: ['graphics.number-participants', 'graphics.nbr-studies'],
                    title: 'graphics.number-participants-chart-title',
                    options: {
                        backgroundColor: { fill: 'transparent' },
                        colors: ['#b8cbed',
                            '#e5edfb',
                            '#cfddf5',
                            '#a0b8e2',
                            '#88a4d4'],
                        pieSliceTextStyle: { color: '#000000' }
                    }
                },
                biologicalSamples: {
                    header: ['graphics.bio-samples', 'graphics.nbr-studies'],
                    title: 'graphics.bio-samples-chart-title',
                    options: {
                        bars: 'horizontal',
                        series: {
                            0: { axis: 'nbrStudies' } // Bind series 1 to an axis
                        },
                        axes: {
                            x: {
                                nbrStudies: { side: 'top', label: 'Number of Studies' } // Top x-axis.
                            }
                        },
                        backgroundColor: { fill: 'transparent' },
                        colors: ['#b8cbed',
                            '#e5edfb',
                            '#cfddf5',
                            '#a0b8e2',
                            '#88a4d4']
                    }
                }
            }
        }
    };
    factory.setOptions = function (newOptions) {
        if (typeof (newOptions) === 'object') {
            Object.keys(newOptions).forEach(function (option) {
                if (option in factory.options) {
                    factory.options[option] = newOptions[option];
                }
            });
        }
    };
    factory.getOptions = function () {
        return angular.copy(factory.options);
    };
    return factory;
})
    .service('GraphicChartsUtils', ['LocalizedValues', 'TaxonomyResource', 'VocabularyService', '$q', '$translate',
    function (LocalizedValues, TaxonomyResource, VocabularyService, $q, $translate) {
        var studyTaxonomy = {};
        studyTaxonomy.getTerms = function (aggregationName) {
            var deferred = $q.defer();
            function getTerms() {
                var terms = null;
                if (studyTaxonomy.vocabularies) {
                    angular.forEach(studyTaxonomy.vocabularies, function (vocabulary) {
                        if (VocabularyService.vocabularyAlias(vocabulary) === aggregationName) {
                            terms = vocabulary.terms;
                        }
                    });
                }
                deferred.resolve(terms);
            }
            if (!studyTaxonomy.vocabularies) {
                TaxonomyResource.get({
                    target: 'study',
                    taxonomy: 'Mica_study'
                }).$promise.then(function (taxonomy) {
                    studyTaxonomy.vocabularies = angular.copy(taxonomy.vocabularies);
                    getTerms();
                });
            }
            else {
                getTerms();
            }
            return deferred.promise;
        };
        this.getArrayByAggregation = function (aggregationName, entityDto) {
            var deferred = $q.defer();
            if (!aggregationName || !entityDto) {
                deferred.resolve([]);
            }
            var arrayData = [];
            studyTaxonomy.getTerms(aggregationName).then(function (terms) {
                var sortedTerms = terms;
                var i = 0;
                angular.forEach(entityDto.aggs, function (aggregation) {
                    if (aggregation.aggregation === aggregationName) {
                        if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
                            i = 0;
                            angular.forEach(sortedTerms, function (sortTerm) {
                                angular.forEach(aggregation['obiba.mica.RangeAggregationResultDto.ranges'], function (term) {
                                    if (sortTerm.name === term.key) {
                                        if (term.count) {
                                            arrayData[i] = { title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key };
                                            i++;
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            // MK-924 sort countries by title in the display language
                            if (aggregation.aggregation === 'populations-model-selectionCriteria-countriesIso') {
                                var locale = $translate.use();
                                sortedTerms.sort(function (a, b) {
                                    var textA = LocalizedValues.forLocale(a.title, locale);
                                    var textB = LocalizedValues.forLocale(b.title, locale);
                                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                                });
                            }
                            var numberOfParticipant = 0;
                            i = 0;
                            angular.forEach(sortedTerms, function (sortTerm) {
                                angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                                    if (sortTerm.name === term.key) {
                                        if (term.count) {
                                            if (aggregation.aggregation === 'model-methods-design') {
                                                angular.forEach(term.aggs, function (aggBucket) {
                                                    if (aggBucket.aggregation === 'model-numberOfParticipants-participant-number') {
                                                        var aggregateBucket = aggBucket['obiba.mica.StatsAggregationResultDto.stats'];
                                                        numberOfParticipant = LocalizedValues.formatNumber(aggregateBucket ? aggregateBucket.data.sum : 0);
                                                    }
                                                });
                                                arrayData[i] = {
                                                    title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                                                    value: term.count,
                                                    participantsNbr: numberOfParticipant,
                                                    key: term.key
                                                };
                                            }
                                            else {
                                                arrayData[i] = { title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key };
                                            }
                                            i++;
                                        }
                                    }
                                });
                            });
                        }
                    }
                });
                deferred.resolve(arrayData);
            });
            return deferred.promise;
        };
    }])
    .service('GraphicChartsQuery', ['RqlQueryService', 'RqlQueryUtils', '$translate', function (RqlQueryService, RqlQueryUtils, $translate) {
        this.queryDtoBuilder = function (entityIds, entityType) {
            var query;
            if (!(entityIds) || entityIds === 'NaN') {
                query = 'study(exists(Mica_study.id))';
            }
            if (entityType && entityIds !== 'NaN') {
                query = entityType + '(in(Mica_' + entityType + '.id,(' + entityIds + ')))';
            }
            var localizedRqlQuery = angular.copy(RqlQueryService.parseQuery(query));
            RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $translate.use());
            var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
            return RqlQueryService.prepareGraphicsQuery(localizedQuery, ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'], ['Mica_study.methods-design']);
        };
    }]);
//# sourceMappingURL=graphics-service.js.map
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
ngObibaMica.localized = angular.module('obiba.mica.localized', [
    'obiba.notification',
    'pascalprecht.translate',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=localized.js.map
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
ngObibaMica.localized
    .directive('localized', ['LocalizedValues', function (LocalizedValues) {
        return {
            restrict: 'AE',
            scope: {
                value: '=',
                lang: '=',
                ellipsisSize: '=',
                markdownIt: '=',
                keyLang: '@',
                keyValue: '@'
            },
            templateUrl: 'localized/localized-template.html',
            link: function (scope) {
                scope.keyLang = scope.keyLang || 'lang';
                scope.keyValue = scope.keyValue || 'value';
                scope.LocalizedValues = LocalizedValues;
            }
        };
    }])
    .directive('localizedNumber', ['LocalizedValues', function (LocalizedValues) {
        return {
            restrict: 'E',
            scope: { number: '=value' },
            template: '{{::localizedNumber}}',
            controller: ['$scope', function ($scope) {
                    $scope.localizedNumber = LocalizedValues.formatNumber($scope.number);
                }]
        };
    }])
    .directive('localizedInput', [function () {
        return {
            restrict: 'AE',
            require: '^form',
            scope: {
                name: '@',
                model: '=',
                label: '@',
                required: '@',
                disabled: '=',
                lang: '=',
                help: '@',
                customValidator: '='
            },
            templateUrl: 'localized/localized-input-template.html',
            link: function ($scope, elem, attr, ctrl) {
                if (angular.isUndefined($scope.model) || $scope.model === null) {
                    $scope.model = [
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
                    }
                }, true);
                $scope.fieldName = $scope.name + '-' + $scope.lang;
                $scope.form = ctrl;
            }
        };
    }])
    .directive('localizedInputGroup', [function () {
        return {
            restrict: 'AE',
            require: '^form',
            scope: {
                name: '@',
                model: '=',
                label: '@',
                required: '@',
                disabled: '=',
                lang: '=',
                help: '@',
                remove: '=',
                customValidator: '='
            },
            templateUrl: 'localized/localized-input-group-template.html',
            link: function ($scope, elem, attr, ctrl) {
                if (angular.isUndefined($scope.model) || $scope.model === null) {
                    $scope.model = [
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
                    }
                }, true);
                $scope.fieldName = $scope.name + '-' + $scope.lang;
                $scope.form = ctrl;
            }
        };
    }])
    .directive('localizedTextarea', [function () {
        return {
            restrict: 'AE',
            require: '^form',
            scope: {
                name: '@',
                model: '=',
                label: '@',
                required: '@',
                disabled: '=',
                lang: '=',
                help: '@',
                rows: '@',
                customValidator: '='
            },
            templateUrl: 'localized/localized-textarea-template.html',
            link: function ($scope, elem, attr, ctrl) {
                if (angular.isUndefined($scope.model) || $scope.model === null) {
                    $scope.model = [
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
                    }
                }, true);
                $scope.fieldName = $scope.name + '-' + $scope.lang;
                $scope.form = ctrl;
            }
        };
    }]);
//# sourceMappingURL=localized-directives.js.map
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
ngObibaMica.localized
    .service('LocalizedValues', ['$translate', function ($translate) {
        var self = this;
        this.for = function (values, lang, keyLang, keyValue) {
            if (angular.isArray(values)) {
                var result = values.filter(function (item) {
                    return item[keyLang] === lang;
                });
                if (result && result.length > 0) {
                    return result[0][keyValue];
                }
                else {
                    var langs = values.map(function (value) {
                        return value[keyLang];
                    });
                    if (langs.length > 0) {
                        return self.for(values, langs.length === 1 ? langs[0] : 'en', keyLang, keyValue);
                    }
                }
            }
            else if (angular.isObject(values)) {
                return self.for(Object.keys(values).map(function (k) {
                    return { lang: k, value: values[k] };
                }), lang, keyLang, keyValue);
            }
            return values || '';
        };
        this.forLocale = function (values, lang) {
            var rval = this.for(values, lang, 'locale', 'text');
            if (!rval || rval === '') {
                rval = this.for(values, 'und', 'locale', 'text');
            }
            if (!rval || rval === '') {
                rval = this.for(values, 'en', 'locale', 'text');
            }
            return rval;
        };
        this.forLang = function (values, lang) {
            var rval = this.for(values, lang, 'lang', 'value');
            if (!rval || rval === '') {
                rval = this.for(values, 'und', 'lang', 'value');
            }
            if (!rval || rval === '') {
                rval = this.for(values, 'en', 'lang', 'value');
            }
            return rval;
        };
        this.formatNumber = function (val) {
            return (typeof val === 'undefined' || val === null || typeof val !== 'number') ? val : val.toLocaleString($translate.use());
        };
        this.arrayToObject = function (values) {
            var rval = {};
            if (values) {
                values.forEach(function (entry) {
                    rval[entry.lang] = entry.value;
                });
            }
            return rval;
        };
        this.objectToArray = function (values, languages) {
            var rval = [];
            if (values) {
                var locales = languages ? languages : Object.keys(values);
                if (locales) {
                    locales.forEach(function (lang) {
                        rval.push({
                            lang: lang,
                            value: values[lang]
                        });
                    });
                }
            }
            return rval.length === 0 ? undefined : rval;
        };
    }])
    .service('LocalizedSchemaFormService', ['$filter', function ($filter) {
        this.translate = function (value) {
            if (!value) {
                return value;
            }
            if (typeof value === 'string') {
                return this.translateString(value);
            }
            else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    return this.translateArray(value);
                }
                else {
                    return this.translateObject(value);
                }
            }
            return value;
        };
        this.translateObject = function (object) {
            if (!object) {
                return object;
            }
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (typeof object[prop] === 'string') {
                        object[prop] = this.translateString(object[prop]);
                    }
                    else if (typeof object[prop] === 'object') {
                        if (Array.isArray(object[prop])) {
                            object[prop] = this.translateArray(object[prop]);
                        }
                        else {
                            object[prop] = this.translateObject(object[prop]);
                        }
                    } // else ignore
                }
            }
            return object;
        };
        this.translateArray = function (array) {
            if (!array) {
                return array;
            }
            var that = this;
            array.map(function (item) {
                return that.translate(item);
            });
            return array;
        };
        this.translateString = function (string) {
            if (!string) {
                return string;
            }
            return string.replace(/t\(([^\)]+)\)/g, function (match, p1) {
                return $filter('translate')(p1);
            });
        };
    }]);
//# sourceMappingURL=localized-service.js.map
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
ngObibaMica.localized
    .filter('localizedNumber', ['LocalizedValues', function (LocalizedValues) {
        return function (value) {
            return value === 0 ? 0 : value ? LocalizedValues.formatNumber(value) : '';
        };
    }])
    .filter('localizedString', ['$translate', 'LocalizedValues', function ($translate, LocalizedValues) {
        return function (input) {
            return LocalizedValues.forLocale(input, $translate.use());
        };
    }]);
//# sourceMappingURL=localized-filter.js.map
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
function NgObibaMicaFileBrowserOptionsProvider() {
    var options = {
        locale: 'en',
        downloadInline: true,
        downloadKey: false,
        folders: {
            excludes: ['population']
        },
        documentsTitle: 'file.documents'
    };
    this.addExcludeFolder = function (folder) {
        if (folder) {
            options.folders.excludes.push(folder);
        }
    };
    this.setOptions = function (newOptions) {
        if (typeof (newOptions) === 'object') {
            Object.keys(newOptions).forEach(function (option) {
                if (option in options) {
                    options[option] = newOptions[option];
                }
            });
        }
    };
    this.$get = function () {
        return options;
    };
}
ngObibaMica.fileBrowser = angular.module('obiba.mica.fileBrowser', [
    'pascalprecht.translate',
    'ui.bootstrap',
    'templates-ngObibaMica'
]).config(['$provide', function ($provide) {
        $provide.provider('ngObibaMicaFileBrowserOptions', new NgObibaMicaFileBrowserOptionsProvider());
    }]);
//# sourceMappingURL=file-browser.js.map
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
ngObibaMica.fileBrowser
    .directive('fileBrowser', [function () {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'FileBrowserController',
            scope: {
                docPath: '@',
                docId: '@',
                tokenKey: '@',
                subject: '=',
                refresh: '=',
                showTitle: '@'
            },
            templateUrl: 'file-browser/views/file-browser-template.html',
            link: function (scope, elem) {
                scope.selfNode = elem[0];
            }
        };
    }]);
//# sourceMappingURL=file-browser-directive.js.map
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
ngObibaMica.fileBrowser
    .controller('FileBrowserController', [
    '$rootScope',
    '$scope',
    '$log',
    '$filter',
    'StringUtils',
    'FileBrowserService',
    'BrowserBreadcrumbHelper',
    'AlertService',
    'ServerErrorUtils',
    'FileBrowserFileResource',
    'FileBrowserSearchResource',
    'ngObibaMicaFileBrowserOptions',
    'FileBrowserDownloadService',
    'CustomWatchDomElementService',
    function ($rootScope, $scope, $log, $filter, StringUtils, FileBrowserService, BrowserBreadcrumbHelper, AlertService, ServerErrorUtils, FileBrowserFileResource, FileBrowserSearchResource, ngObibaMicaFileBrowserOptions, FileBrowserDownloadService, CustomWatchDomElementService) {
        var navigateToPath = function (path, keyToken) {
            clearSearchInternal();
            getDocument(path, keyToken);
        };
        var navigateTo = function (event, document, keyToken) {
            event.stopPropagation();
            if (document) {
                navigateToPath(document.path, keyToken);
            }
        };
        var onError = function (response) {
            AlertService.alert({
                id: 'FileSystemController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
            if (response.status !== 403 && $scope.data.document) {
                navigateTo($scope.data.document);
            }
        };
        function clearSearchInternal() {
            $scope.data.search.text = null;
            $scope.data.search.active = false;
        }
        function getDocument(path, keyToken) {
            var fileParam;
            $scope.data.search.active = false;
            if (keyToken) {
                fileParam = { path: path, keyToken: keyToken };
            }
            else {
                fileParam = { path: path };
            }
            FileBrowserFileResource.get(fileParam, function onSuccess(response) {
                if (response.code !== 404) {
                    $scope.pagination.selected = -1;
                    $scope.data.document = $scope.data.details.document = response;
                    if (!$scope.data.document.children) {
                        $scope.data.document.children = [];
                    }
                    if (keyToken) {
                        $scope.data.document.keyToken = keyToken;
                    }
                    if ($scope.data.document.path === $scope.data.rootPath) {
                        $scope.data.document.children = $scope.data.document.children.filter(function (child) {
                            return ngObibaMicaFileBrowserOptions.folders.excludes.indexOf(child.name) < 0;
                        });
                        $scope.data.document.size = $scope.data.document.children.length;
                    }
                    $scope.data.breadcrumbs = BrowserBreadcrumbHelper.toArray(path, $scope.data.rootPath);
                    $scope.data.isFile = FileBrowserService.isFile(response);
                    $scope.data.isRoot = FileBrowserService.isRoot(response);
                    $scope.noDocument = false;
                    if (response.type === 'FOLDER' && response.size < 1) {
                        $scope.noDocument = true;
                    }
                }
                else {
                    $scope.noDocument = true;
                }
            }, onError);
        }
        function navigateToParent(event, document, keyToken) {
            event.stopPropagation();
            var path = document.path;
            if (path.lastIndexOf('/') === 0) {
                path = '/';
            }
            else {
                path = path.substring(0, path.lastIndexOf('/'));
            }
            navigateToPath(path, keyToken);
        }
        function navigateBack() {
            if (!$scope.data.isRoot && $scope.data.document) {
                var parentPath = $scope.data.document.path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
                getDocument(parentPath ? parentPath : '/');
            }
        }
        function hideDetails() {
            $scope.pagination.selected = -1;
            $scope.data.details.show = false;
        }
        function searchDocumentsInternal(path, searchParams) {
            function excludeFolders(query) {
                var excludeQuery = '';
                try {
                    var excludes = [];
                    ngObibaMicaFileBrowserOptions.folders.excludes.forEach(function (exclude) {
                        var q = path.replace(/\//g, '\\/') + '\\/' + exclude.replace(/\s/, '\\ ');
                        excludes.push(q);
                        excludes.push(q + '\\/*');
                    });
                    excludeQuery = excludes.length > 0 ? 'NOT path:(' + excludes.join(' OR ') + ')' : '';
                }
                catch (error) {
                    // just return the input query
                }
                return query ? query + ' AND ' + excludeQuery : excludeQuery;
            }
            searchParams.query = excludeFolders(searchParams.query);
            var urlParams = angular.extend({}, { path: path }, searchParams);
            FileBrowserSearchResource.search(urlParams, function onSuccess(response) {
                var clone = $scope.data.document ? angular.copy($scope.data.document) : {};
                clone.children = response;
                $scope.data.document = clone;
            }, function onError(response) {
                $log.debug('ERROR:', response);
            });
        }
        var searchDocuments = function (query) {
            $scope.data.search.active = true;
            hideDetails();
            var recursively = $scope.data.search.recursively;
            var orderBy = null;
            var sortBy = null;
            var limit = 999;
            $scope.data.search.query = query;
            switch (query) {
                case 'RECENT':
                    query = '';
                    orderBy = 'desc';
                    sortBy = 'lastModifiedDate';
                    limit = 10;
                    break;
            }
            var searchParams = { query: query, recursively: recursively, sort: sortBy, order: orderBy, limit: limit };
            searchDocumentsInternal($scope.data.document.path, searchParams);
        };
        var toggleRecursively = function () {
            $scope.data.search.recursively = !$scope.data.search.recursively;
            if ($scope.data.search.text) {
                searchDocuments($scope.data.search.text);
            }
            else if ($scope.data.search.query) {
                searchDocuments($scope.data.search.query);
            }
        };
        var clearSearch = function () {
            clearSearchInternal();
            getDocument($scope.data.document.path);
        };
        var searchKeyUp = function (event) {
            switch (event.keyCode) {
                case 13:// ENTER
                    if ($scope.data.search.text) {
                        searchDocuments($scope.data.search.text);
                    }
                    else {
                        clearSearch();
                    }
                    break;
                case 27:// ESC
                    if ($scope.data.search.active) {
                        clearSearch();
                    }
                    break;
            }
        };
        var showDetails = function (document, index) {
            $scope.pagination.selected = index;
            $scope.data.details.document = document;
            $scope.data.details.show = true;
        };
        var getTypeParts = function (document) {
            return FileBrowserService.isFile(document) && document.attachment.type ?
                document.attachment.type.split(/,|\s+/) :
                [];
        };
        var getLocalizedValue = function (values) {
            return FileBrowserService.getLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
        };
        var hasLocalizedValue = function (values) {
            return FileBrowserService.hasLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
        };
        var refresh = function (docPath, docId) {
            if (docPath && docId) {
                $scope.docPath = docPath;
                $scope.docId = docId;
            }
            if (($scope.docPath && $scope.docPath !== '/') && $scope.docId) {
                $scope.data.docRootIcon = BrowserBreadcrumbHelper.rootIcon($scope.docPath);
                $scope.data.rootPath = $scope.docPath + ($scope.docId !== 'null' ? '/' + $scope.docId : '');
                if ($scope.tokenKey) {
                    getDocument($scope.data.rootPath, $scope.tokenKey, null);
                }
                else {
                    getDocument($scope.data.rootPath, null);
                }
            }
        };
        $scope.downloadTarget = ngObibaMicaFileBrowserOptions.downloadInline ? '_blank' : '_self';
        $scope.getDownloadUrl = FileBrowserDownloadService.getUrl;
        $scope.screen = $rootScope.screen;
        $scope.truncate = StringUtils.truncate;
        $scope.getDocumentIcon = FileBrowserService.getDocumentIcon;
        $scope.navigateToPath = navigateToPath;
        $scope.navigateTo = navigateTo;
        $scope.navigateBack = navigateBack;
        $scope.navigateToParent = navigateToParent;
        $scope.clearSearch = clearSearch;
        $scope.searchDocuments = searchDocuments;
        $scope.toggleRecursively = toggleRecursively;
        $scope.searchKeyUp = searchKeyUp;
        $scope.isFile = FileBrowserService.isFile;
        $scope.isRoot = FileBrowserService.isRoot;
        $scope.getLocalizedValue = getLocalizedValue;
        $scope.hasLocalizedValue = hasLocalizedValue;
        $scope.hideDetails = hideDetails;
        $scope.showDetails = showDetails;
        $scope.getTypeParts = getTypeParts;
        $scope.documentsTitle = ngObibaMicaFileBrowserOptions.documentsTitle;
        $scope.pagination = {
            selected: -1,
            currentPage: 1,
            itemsPerPage: 20
        };
        $scope.data = {
            keyToken: null,
            details: {
                document: null,
                show: false
            },
            docRootIcon: null,
            rootPath: null,
            document: null,
            accesses: [],
            search: {
                text: null,
                active: false,
                recursively: true
            },
            breadcrumbs: null,
            isFile: false,
            isRoot: false,
            editDescField: false
        };
        $scope.$watchGroup(['docPath', 'docId'], function () {
            refresh();
        });
        $scope.__defineSetter__('selfNode', function (selfNode) {
            if (selfNode) {
                CustomWatchDomElementService.configWatch(selfNode, ['refresh', 'show-title']).customWatch(function () {
                    if (selfNode.attributes[4].value === 'true') {
                        refresh(selfNode.attributes[1].value, selfNode.attributes[2].value);
                        $scope.showTitle = selfNode.attributes[6].value;
                    }
                });
            }
        });
    }
]);
//# sourceMappingURL=file-browser-controller.js.map
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
ngObibaMica.fileBrowser
    .factory('FileBrowserFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl('FileBrowserFileResource');
        return $resource(url, { path: '@path', keyToken: '@keyToken' }, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('FileBrowserSearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('FileBrowserSearchResource'), { path: '@path' }, {
            'search': { method: 'GET', isArray: true, errorHandler: true }
        });
    }])
    .service('FileBrowserDownloadService', ['ngObibaMicaUrl', 'ngObibaMicaFileBrowserOptions',
    function (ngObibaMicaUrl, ngObibaMicaFileBrowserOptions) {
        this.getUrl = function (path, keyToken) {
            var url = ngObibaMicaUrl.getUrl('FileBrowserDownloadUrl')
                .replace(/:path/, path)
                .replace(/:inline/, ngObibaMicaFileBrowserOptions.downloadInline);
            if (keyToken) {
                url = url.replace(/:key/, keyToken);
            }
            else {
                url = url.replace(/:key/, '');
            }
            return url;
        };
        return this;
    }])
    .service('FileBrowserService', [function () {
        this.isFile = function (document) {
            return document && document.type === 'FILE';
        };
        this.isRoot = function (document) {
            return document && document.path === '/';
        };
        this.getLocalizedValue = function (values, lang) {
            if (!values) {
                return null;
            }
            var result = values.filter(function (value) {
                return value.lang === lang;
            });
            return result && result.length > 0 ? result[0].value : null;
        };
        this.hasLocalizedValue = function (values, lang) {
            var value = this.getLocalizedValue(values, lang);
            return value !== null && value.trim().length > 0;
        };
        this.getDocumentIcon = function (document) {
            if (!document) {
                return '';
            }
            if (document.type === 'FOLDER') {
                return 'fa-folder';
            }
            var ext = document.path.match(/\.(\w+)$/);
            if (ext && ext.length > 1) {
                switch (ext[1].toLowerCase()) {
                    case 'doc':
                    case 'docx':
                    case 'odm':
                    case 'gdoc':
                        return 'fa-file-word-o';
                    case 'xls':
                    case 'xlsx':
                        return 'fa-file-excel-o';
                    case 'pdf':
                        return 'fa-file-pdf-o';
                    case 'ppt':
                    case 'odt':
                        return 'fa-file-powerpoint-o';
                    case 'xt':
                        return 'fa-file-text-o';
                }
            }
            return 'fa-file';
        };
    }])
    .service('BrowserBreadcrumbHelper', [function () {
        this.toArray = function (path, exclude) {
            if (path) {
                path = path.replace(exclude, '');
                var a = path.replace(/\/$/, '').split('/').slice(1);
                var parts = [];
                var prev = null;
                a.forEach(function (part) {
                    prev = (prev === null ? exclude : prev) + '/' + part;
                    parts.push({ name: part, path: prev });
                });
                return parts;
            }
            // Should never happen
            return [{ name: '', path: '' }];
        };
        this.rootIcon = function (docPath) {
            var matched = /^\/([^\/]*)/.exec(docPath);
            switch (matched ? matched[1] : '') {
                case 'study':
                    return 'i-obiba-study';
                case 'network':
                    return 'i-obiba-network';
                case 'study-dataset':
                    return 'i-obiba-study-dataset';
                case 'harmonization-dataset':
                    return 'i-obiba-harmo-dataset';
                default:
                    return 'fa fa-hdd-o';
            }
        };
    }]);
//# sourceMappingURL=file-browser-service.js.map
angular.module('templates-ngObibaMica', ['access/components/action-log/component.html', 'access/components/action-log/item/component.html', 'access/components/action-log/item/delete-modal.html', 'access/components/action-log/item/edit-modal.html', 'access/components/entity-list/component.html', 'access/components/print-friendly-view/component.html', 'access/views/data-access-amendment-view.html', 'access/views/data-access-request-documents-view.html', 'access/views/data-access-request-form.html', 'access/views/data-access-request-history-view.html', 'access/views/data-access-request-list.html', 'access/views/data-access-request-profile-user-modal.html', 'access/views/data-access-request-submitted-modal.html', 'access/views/data-access-request-validation-modal.html', 'access/views/data-access-request-view.html', 'analysis/components/crosstab-study-table/component.html', 'analysis/components/entities-count-result-table/component.html', 'analysis/components/variable-criteria/component.html', 'analysis/crosstab/views/crosstab-variable-crosstab.html', 'analysis/crosstab/views/crosstab-variable-frequencies-empty.html', 'analysis/crosstab/views/crosstab-variable-frequencies.html', 'analysis/crosstab/views/crosstab-variable-statistics-empty.html', 'analysis/crosstab/views/crosstab-variable-statistics.html', 'analysis/views/analysis-entities-count.html', 'attachment/attachment-input-template.html', 'attachment/attachment-list-template.html', 'file-browser/views/document-detail-template.html', 'file-browser/views/documents-table-template.html', 'file-browser/views/file-browser-template.html', 'file-browser/views/toolbar-template.html', 'graphics/views/charts-directive.html', 'graphics/views/tables-directive.html', 'lists/views/input-search-widget/input-search-widget-template.html', 'lists/views/list/datasets-search-result-table-template.html', 'lists/views/list/networks-search-result-table-template.html', 'lists/views/list/studies-search-result-table-template.html', 'lists/views/region-criteria/criterion-dropdown-template.html', 'lists/views/region-criteria/search-criteria-region-template.html', 'lists/views/search-result-list-template.html', 'lists/views/sort-widget/sort-widget-template.html', 'localized/localized-input-group-template.html', 'localized/localized-input-template.html', 'localized/localized-template.html', 'localized/localized-textarea-template.html', 'search/components/criteria/criteria-root/component.html', 'search/components/criteria/criteria-target/component.html', 'search/components/criteria/item-region/dropdown/component.html', 'search/components/criteria/item-region/item-node/component.html', 'search/components/criteria/item-region/match/component.html', 'search/components/criteria/item-region/numeric/component.html', 'search/components/criteria/item-region/region/component.html', 'search/components/criteria/item-region/string-terms/component.html', 'search/components/criteria/match-vocabulary-filter-detail/component.html', 'search/components/criteria/numeric-vocabulary-filter-detail/component.html', 'search/components/criteria/terms-vocabulary-filter-detail/component.html', 'search/components/entity-counts/component.html', 'search/components/entity-search-typeahead/component.html', 'search/components/facets/taxonomy/component.html', 'search/components/input-search-filter/component.html', 'search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html', 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html', 'search/components/panel/classification/component.html', 'search/components/panel/taxonomies-panel/component.html', 'search/components/panel/taxonomy-panel/component.html', 'search/components/panel/term-panel/component.html', 'search/components/panel/vocabulary-panel/component.html', 'search/components/result/cell-stat-value/component.html', 'search/components/result/coverage-result/component.html', 'search/components/result/datasets-result-table/component.html', 'search/components/result/graphics-result/component.html', 'search/components/result/networks-result-table/component.html', 'search/components/result/pagination/component.html', 'search/components/result/search-result/component.html', 'search/components/result/search-result/coverage.html', 'search/components/result/search-result/graphics.html', 'search/components/result/search-result/list.html', 'search/components/result/studies-result-table/component.html', 'search/components/result/tabs-order-count/component.html', 'search/components/result/variables-result-table/component.html', 'search/components/search-box-region/component.html', 'search/components/study-filter-shortcut/component.html', 'search/components/taxonomy/taxonomy-filter-detail/component.html', 'search/components/taxonomy/taxonomy-filter-panel/component.html', 'search/components/vocabulary-filter-detail-heading/component.html', 'search/components/vocabulary/vocabulary-filter-detail/component.html', 'search/views/classifications.html', 'search/views/classifications/taxonomy-accordion-group.html', 'search/views/classifications/taxonomy-template.html', 'search/views/classifications/vocabulary-accordion-group.html', 'search/views/criteria/criterion-header-template.html', 'search/views/criteria/target-template.html', 'search/views/list/pagination-template.html', 'search/views/search-layout.html', 'search/views/search-result-graphics-template.html', 'search/views/search-result-list-dataset-template.html', 'search/views/search-result-list-network-template.html', 'search/views/search-result-list-study-template.html', 'search/views/search-result-list-variable-template.html', 'search/views/search.html', 'search/views/search2.html', 'sets/components/cart-documents-table/component.html', 'sets/views/cart.html', 'utils/components/entity-schema-form/component.html', 'utils/services/user-profile-modal/service.html', 'utils/views/unsaved-modal.html', 'views/pagination-template.html']);

angular.module("access/components/action-log/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/component.html",
    "<form class=\"form-inline voffset2\" name=\"actionLogForm\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <input type=\"text\"\n" +
    "           class=\"form-control\"\n" +
    "           ng-model=\"$ctrl.item.action\"\n" +
    "           ng-required=\"true\"\n" +
    "           placeholder=\"{{'data-access-request.action-log.action-placeholder' | translate}}\"\n" +
    "           typeahead-editable=\"true\"\n" +
    "           uib-typeahead=\"value for value in $ctrl.predefinedActionNames | filter:$viewValue | limitTo:8\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"input-group\">\n" +
    "      <input type=\"datetime\"\n" +
    "             class=\"form-control\"\n" +
    "             uib-datepicker-popup=\"dd/MM/yyyy\"\n" +
    "             ng-model=\"$ctrl.item.changedOn\"\n" +
    "             ng-required=\"true\"\n" +
    "             ng-focus=\"$ctrl.open = !$ctrl.item.changedOn\" is-open=\"$ctrl.open\"\n" +
    "             placeholder=\"dd/MM/yyyy\"\n" +
    "             show-button-bar=\"false\">\n" +
    "\n" +
    "      <span class=\"input-group-btn\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.open = !$ctrl.open\">\n" +
    "          <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "        </button>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"$ctrl.add($ctrl.item)\">{{'global.add' | translate}}\n" +
    "    <i class=\"fa fa-plus\"></i>\n" +
    "  </button>\n" +
    "\n" +
    "  <div class=\"form-group has-error\" ng-if=\"$ctrl.showError && (!$ctrl.item.action || !$ctrl.item.changedOn)\">\n" +
    "    <span class=\"control-label\">{{'data-access-request.action-log.required' | translate}}</span>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("access/components/action-log/item/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/component.html",
    "<ul class=\"list-inline\" ng-if=\"$ctrl.showButtons\">\n" +
    "  <li>\n" +
    "    <a ng-click=\"$ctrl.edit($ctrl.item)\">\n" +
    "      <i class=\"fa fa-pencil\"></i>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ng-click=\"$ctrl.remove($ctrl.item)\">\n" +
    "      <i class=\"fa fa-trash-o\"></i>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("access/components/action-log/item/delete-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/delete-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">\n" +
    "    <i class=\"fa fa-exclamation-triangle\"></i>\n" +
    "    {{'data-access-request.action-log.delete.title' | translate}}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  {{'data-access-request.action-log.delete.message' | translate:$modal.item}}\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$dismiss()\" translate>cancel</button>\n" +
    "  <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-click=\"$close()\" translate>ok</button>\n" +
    "</div>");
}]);

angular.module("access/components/action-log/item/edit-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/edit-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">\n" +
    "    {{'data-access-request.action-log.edit.title' | translate}}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"actionLogModalForm\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <input type=\"text\"\n" +
    "             class=\"form-control\"\n" +
    "             ng-model=\"$modal.item.action\"\n" +
    "             ng-required=\"true\"\n" +
    "             placeholder=\"{{'data-access-request.action-log.action-placeholder' | translate}}\"\n" +
    "             typeahead-editable=\"true\"\n" +
    "             uib-typeahead=\"value for value in $modal.predefinedActionNames | filter:$viewValue | limitTo:8\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"datetime\" class=\"form-control\" uib-datepicker-popup=\"dd/MM/yyyy\" ng-model=\"$modal.item.changedOn\" ng-required=\"true\"\n" +
    "          ng-focus=\"$modal.open = !$modal.item.changedOn\" is-open=\"$modal.open\" placeholder=\"dd/MM/yyyy\" show-button-bar=\"false\">\n" +
    "\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$modal.open = !$modal.open\">\n" +
    "            <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$dismiss()\" translate>cancel</button>\n" +
    "  <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-disabled=\"!$modal.item.action || !$modal.item.changedOn\"\n" +
    "    ng-click=\"$close($modal.item)\" translate>ok</button>\n" +
    "</div>");
}]);

angular.module("access/components/entity-list/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/entity-list/component.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <a ng-href=\"#{{$ctrl.entityBaseUrl}}/new\" class=\"btn btn-info\" ng-if=\"$ctrl.canAdd\">\n" +
    "        <i class=\"fa fa-plus\"></i>\n" +
    "        <span>{{$ctrl.addButtonCaption | translate}}</span>\n" +
    "      </a>\n" +
    "\n" +
    "      <span ng-bind-html=\"config.newRequestButtonHelpText\" ng-if=\"$ctrl.canAdd\"></span>\n" +
    "\n" +
    "      <span class=\"pull-right\" ng-if=\"$ctrl.requests.length > 0 && !$ctrl.parentId\">\n" +
    "        <a target=\"_self\" download class=\"btn btn-info\" ng-href=\"{{$ctrl.getCsvExportHref()}}\">\n" +
    "          <i class=\"fa fa-download\"></i> {{'report' | translate}}\n" +
    "        </a>\n" +
    "\n" +
    "        <a target=\"_self\" download class=\"btn btn-info\" ng-href=\"{{$ctrl.getHistoryExportHref()}}\">\n" +
    "          <i class=\"fa fa-download\"></i> {{'history' | translate}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <p class=\"help-block\">\n" +
    "    <span ng-if=\"!$ctrl.canAdd\" translate>data-access-amendment.cannot-add</span>\n" +
    "    <span ng-if=\"$ctrl.canAdd && $ctrl.requests.length == 0 && !loading\">{{$ctrl.noneCaption | translate}}</span>\n" +
    "  </p>\n" +
    "\n" +
    "  <p ng-if=\"$ctrl.loading\" class=\"voffset2 loading\">\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-if=\"$ctrl.requests.length > 0\">\n" +
    "    <div class=\"row voffset2\">\n" +
    "      <div class=\"col-xs-4\">\n" +
    "        <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "          <span class=\"input-group-addon\" id=\"data-access-requests-search\">\n" +
    "            <i class=\"glyphicon glyphicon-search\"></i>\n" +
    "          </span>\n" +
    "          <input ng-model=\"$ctrl.searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"data-access-requests-search\">\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-3\">\n" +
    "        <ui-select id=\"status-select\" theme=\"bootstrap\" ng-model=\"$ctrl.searchStatus.filter\" reset-search-input=\"true\">\n" +
    "          <ui-select-match allow-clear=\"true\" placeholder=\"{{'data-access-request.status-placeholder' | translate}}\">\n" +
    "            <span ng-bind-html=\"$select.selected.translation\"></span>\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices repeat=\"data in $ctrl.REQUEST_STATUS\">\n" +
    "            {{data.translation}}\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <dir-pagination-controls class=\"pull-right\"></dir-pagination-controls>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"table-responsive\">\n" +
    "      <table class=\"table table-bordered table-striped\" obiba-table-sorter=\"$ctrl.requests\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th data-column-name=\"id\">ID</th>\n" +
    "            <th ng-if=\"$ctrl.showApplicant\" data-column-name=\"applicant\">{{\"data-access-request.applicant\" | translate}}</th>\n" +
    "            <th data-column-name=\"title\">{{\"title\" | translate}}</th>\n" +
    "            <th data-column-name=\"timestamps.lastUpdate\">{{\"data-access-request.lastUpdate\" | translate}}</th>\n" +
    "            <th data-column-name=\"submissionDate\">{{\"data-access-request.submissionDate\" | translate}}</th>\n" +
    "            <th data-column-name=\"status\">{{\"data-access-request.status\" | translate}}</th>\n" +
    "            <th translate>actions</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "          <tr dir-paginate=\"request in $ctrl.requests | filter:{status: $ctrl.searchStatus.filter.key} : true | filter:$ctrl.searchText | itemsPerPage: 20\">\n" +
    "            <td>\n" +
    "              <a ng-href=\"#{{$ctrl.entityBaseUrl}}/{{request.id}}\" ng-if=\"$ctrl.actions.canView(request)\" translate>{{request.id}}</a>\n" +
    "              <span ng-if=\"!$ctrl.actions.canView(request)\">{{request.id}}</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"$ctrl.showApplicant\">\n" +
    "              <span ng-if=\"!request.profile.attributes\">\n" +
    "                {{request.applicant}}\n" +
    "              </span>\n" +
    "              <span ng-if=\"request.profile.attributes && $ctrl.actions.canViewProfile('mica-user') && !$ctrl.actions.canViewProfile('mica-data-access-officer')\">\n" +
    "                {{$ctrl.UserProfileService.getFullName(request.profile) || request.applicant}}\n" +
    "              </span>\n" +
    "              <a href ng-click=\"$ctrl.UserProfileModalService.show(request.profile)\" ng-if=\"request.profile.attributes && $ctrl.actions.canViewProfile('mica-data-access-officer')\">\n" +
    "                {{$ctrl.UserProfileService.getFullName(request.profile) || request.applicant}}\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              {{request.title}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <span title=\"{{(request.timestamps.lastUpdate || request.timestamps.created) | amDateFormat: 'lll'}}\">\n" +
    "                {{(request.timestamps.lastUpdate || request.timestamps.created) | amCalendar}}\n" +
    "              </span>\n" +
    "\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <span ng-if=\"request.submissionDate\" title=\"{{ request.submissionDate | amDateFormat: 'lll' }}\">\n" +
    "                {{request.submissionDate | amCalendar}}\n" +
    "              </span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              {{request.status | translate}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <ul class=\"list-inline\">\n" +
    "                <li ng-if=\"$ctrl.actions.canEdit(request)\">\n" +
    "                  <a ng-href=\"#{{$ctrl.entityBaseUrl}}/{{request.id}}/edit\" title=\"{{'edit' | translate}}\">\n" +
    "                    <i class=\"fa fa-pencil\"></i>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-if=\"$ctrl.actions.canDelete(request)\" ng-click=\"$ctrl.deleteRequest(request)\" title=\"{{'delete' | translate}}\">\n" +
    "                    <i class=\"fa fa-trash-o\"></i>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("access/components/print-friendly-view/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/print-friendly-view/component.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<div>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "  <div class=\"voffset2\" ng-if=\"$ctrl.project && $ctrl.project.permissions && $ctrl.project.permissions.view\">\n" +
    "    <div ng-if=\"$ctrl.project\" class=\"pull-right\">\n" +
    "      <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "        <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{$ctrl.project.id}}\">{{$ctrl.project.id}}</a>\n" +
    "      </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "      <obiba-schema-form-renderer model=\"$ctrl.model\" schema-form=\"$ctrl.accessForm\" read-only=\"true\"></obiba-schema-form-renderer>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"$ctrl.lastSubmittedDate\">\n" +
    "    <h3 translate>data-access-request.submissionDate</h3>\n" +
    "    <p>{{$ctrl.lastSubmittedDate.changedOn | amDateFormat:'dddd, MMMM Do YYYY' | capitalizeFirstLetter}}</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-amendment-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-amendment-view.html",
    "<div>\n" +
    "  <print-friendly-view class=\"visible-print\" valid-form=\"true\" model=\"model\" access-form=\"dataAccessForm\" last-submitted-date=\"lastSubmittedDate\">\n" +
    "  </print-friendly-view>\n" +
    "\n" +
    "  <div class=\"hidden-print\">\n" +
    "    <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "    <obiba-alert id=\"DataAccessAmendmentViewController\"></obiba-alert>\n" +
    "\n" +
    "    <p class=\"help-block pull-left\" ng-if=\"requestEntity.applicant\">\n" +
    "      <span translate>created-by</span>\n" +
    "      <span ng-if=\"!actions.canViewProfile('mica-data-access-officer')\">\n" +
    "        {{getFullName(requestEntity.profile) || requestEntity.applicant}},\n" +
    "      </span>\n" +
    "      <span ng-if=\"actions.canViewProfile('mica-data-access-officer')\">\n" +
    "        <a href ng-click=\"userProfile(requestEntity.profile)\">\n" +
    "          {{getFullName(requestEntity.profile) || requestEntity.applicant}}</a>,\n" +
    "      </span>\n" +
    "      <span title=\"{{requestEntity.timestamps.created | amDateFormat: 'lll'}}\">{{requestEntity.timestamps.created | amCalendar}}</span>\n" +
    "      <span class=\"label label-success\">{{requestEntity.status | translate}}</span>\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"pull-right\" ng-if=\"read && formDrawn\">\n" +
    "      <a ng-click=\"submit()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canSubmit(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>submit</a>\n" +
    "\n" +
    "      <a ng-click=\"reopen()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReopen(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>reopen</a>\n" +
    "\n" +
    "      <a ng-click=\"review()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReview(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>review</a>\n" +
    "\n" +
    "      <a ng-click=\"conditionallyApprove()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canConditionallyApprove(requestEntity)\"\n" +
    "        class=\"btn btn-info\" translate>conditionallyApprove</a>\n" +
    "\n" +
    "      <a ng-click=\"approve()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canApprove(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>approve</a>\n" +
    "\n" +
    "      <a ng-click=\"reject()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReject(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>reject</a>\n" +
    "\n" +
    "      <a ng-href=\"#{{entityUrl}}/edit\" ng-if=\"actions.canEdit(requestEntity)\" class=\"btn btn-primary\" title=\"{{'edit' | translate}}\">\n" +
    "        <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "      </a>\n" +
    "\n" +
    "      <a ng-click=\"printForm()\" class=\"btn btn-default\" title=\"{{'global.print' | translate}}\">\n" +
    "        <i class=\"fa fa-print\"></i>\n" +
    "        <span translate>global.print</span>\n" +
    "      </a>\n" +
    "\n" +
    "      <a ng-click=\"delete()\" ng-if=\"actions.canDelete(requestEntity)\" class=\"btn btn-danger\" title=\"{{'delete' | translate}}\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix\"></div>\n" +
    "\n" +
    "    <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "      <div class=\"pull-right\" ng-if=\"!read && formDrawn\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(forms.requestForm)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <obiba-schema-form-renderer model=\"model\" schema-form=\"dataAccessForm\" read-only=\"read\" on-redraw=\"toggleFormDrawnStatus\"></obiba-schema-form-renderer>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div class=\"pull-right\" ng-if=\"!read && formDrawn\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(forms.requestForm)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("access/views/data-access-request-documents-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-documents-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <div class=\"help-block\" ng-bind-html=\"config.documentsSectionHelpText || 'data-access-request.documents-help' | translate\"></div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "\n" +
    "    <div class=\"panel panel-default\" ng-show=\"showAttachmentsForm\">\n" +
    "      <div class=\"panel-body\">\n" +
    "        <attachment-input files=\"attachments\" multiple=\"true\" on-error=\"onAttachmentError\" delete-attachments=\"actions.canDeleteAttachments(dataAccessRequest)\"></attachment-input>\n" +
    "\n" +
    "        <div class=\"voffset2\">\n" +
    "          <a ng-click=\"cancelAttachments()\" type=\"button\" class=\"btn btn-default\">\n" +
    "            <span translate>cancel</span>\n" +
    "          </a>\n" +
    "\n" +
    "          <a ng-click=\"updateAttachments()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "            <span translate>save</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-hide=\"showAttachmentsForm\">\n" +
    "      <p ng-if=\"dataAccessRequest.attachments.length == 0\" class=\"voffset2\" translate>\n" +
    "        data-access-request.no-documents\n" +
    "      </p>\n" +
    "      <attachment-list files=\"dataAccessRequest.attachments\" href-builder=\"getDownloadHref\"></attachment-list>\n" +
    "      <a ng-if=\"actions.canEditAttachments(dataAccessRequest)\" ng-click=\"editAttachments()\" type=\"button\" class=\"btn btn-info\">\n" +
    "        <span>{{actions.canDeleteAttachments(dataAccessRequest) ? 'data-access-request.edit-documents' : 'data-access-request.add-documents' | translate}}</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("access/views/data-access-request-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-form.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "\n" +
    "  <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "  <obiba-alert id=\"DataAccessRequestEditController\"></obiba-alert>\n" +
    "\n" +
    "  <!-- 'ng-if' does not bind the form to controller scope -->\n" +
    "  <div ng-show=\"validForm\">\n" +
    "\n" +
    "    <form name=\"form\" role=\"form\" novalidate class=\"ng-scope ng-invalid ng-invalid-required ng-dirty\">\n" +
    "      <div class=\"pull-right\" ng-if=\"loaded\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(form)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div sf-model=\"sfForm.model\" sf-form=\"sfForm.definition\" sf-schema=\"sfForm.schema\" required=\"true\" sf-options=\"sfOptions\"></div>\n" +
    "\n" +
    "      <div class=\"pull-right\" ng-if=\"loaded\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "      <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "        <span translate>save</span>\n" +
    "      </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(form)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <div class=\"clearfix voffet2\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-history-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-history-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-if=\"actions.canEditActionLogs(dataAccessRequest)\">\n" +
    "  <action-log-editor source-collection=\"dataAccessRequest.actionLogHistory\" predefined-actions=\"dataAccessForm.predefinedActions\"\n" +
    "    update=\"updateActionLogs(logs)\"></action-log-editor>\n" +
    "</div>\n" +
    "<div class=\"table-responsive\">\n" +
    "  <table id=\"data-access-request-history\" class=\"table table-bordered table-striped\" obiba-table-sorter=\"logsHistory\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"status-icon\"></th>\n" +
    "        <th translate>status</th>\n" +
    "        <th translate>changed-by</th>\n" +
    "        <th data-column-name=\"changedOn\" translate>changed-on</th>\n" +
    "        <th class=\"col-xs-1\" ng-if=\"actions.canEditActionLogs(dataAccessRequest)\" translate>actions</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"log in logsHistory track by $index\">\n" +
    "        <td>\n" +
    "          <span>\n" +
    "            <i class=\"{{log.icon}} hoffset\"></i>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span ng-if=\"log.reference\">{{'data-access-amendment.title' | translate}}\n" +
    "            <a ng-href=\"#{{'/data-access-request/' + dataAccessRequest.id + '/amendment/' + log.reference}}\">{{log.reference}}</a>\n" +
    "          </span>\n" +
    "          {{log.msg | translate}}\n" +
    "        </td>\n" +
    "        <td>{{UserProfileService.getFullName(log.profile) || log.author}}</td>\n" +
    "        <td>\n" +
    "          <span title=\"{{log.changedOn | amDateFormat: 'lll'}}\">\n" +
    "            {{log.changedOn | amCalendar}}\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td ng-if=\"actions.canEditActionLogs(dataAccessRequest)\">\n" +
    "          <span ng-if=\"!loading\">\n" +
    "            <action-log-item-editor item=\"log\" source-collection=\"dataAccessRequest.actionLogHistory\" predefined-actions=\"dataAccessForm.predefinedActions\"\n" +
    "              update=\"updateActionLogs(logs)\"></action-log-item-editor>\n" +
    "          </span>\n" +
    "          \n" +
    "          <span class=\"loading\" ng-if=\"loading\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("access/views/data-access-request-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-list.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div id=\"data-access-request-list\">\n" +
    "  <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "  <entity-list parent-id=\"null\" can-add=\"true\"></entity-list>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-profile-user-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-profile-user-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\"\n" +
    "      ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      {{'data-access-request.profile.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.name' | translate}}</th>\n" +
    "        <td>{{getFullName(applicant)}}</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.email' | translate}}</th>\n" +
    "        <td>{{getProfileEmail(applicant)}}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"attribute in applicant.attributes | filterProfileAttributes\">\n" +
    "          <th>{{\n" +
    "              ('userProfile.' + attribute.key | translate) !== ('userProfile.' + attribute.key) ?\n" +
    "              ('userProfile.' + attribute.key | translate) :\n" +
    "              (attribute.key)\n" +
    "              }}\n" +
    "          </th>\n" +
    "          <td>{{attribute.value}}</td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <a class=\"btn btn-default\" ng-if=\"getProfileEmail(applicant)\" href=\"mailto:{{getProfileEmail(applicant)}}\" target=\"_blank\">\n" +
    "      {{'data-access-request.profile.send-email' | translate}}</a>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\"\n" +
    "      ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.close\" translate>close</span>\n" +
    "      {{confirm.close}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-submitted-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-submitted-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$close('OK')\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      <i class=\"fa fa-check fa-lg\"></i>\n" +
    "      {{'data-access-request.submit-confirmation.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <p>{{'data-access-request.submit-confirmation.message' | translate}}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\" ng-click=\"$close('OK')\">\n" +
    "      <span ng-hide=\"confirm.ok\" translate>ok</span>\n" +
    "      {{confirm.ok}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-validation-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-validation-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 ng-if=\"isValid\" class=\"modal-title\">\n" +
    "      <i class=\"fa fa-check fa-lg\"></i>\n" +
    "      {{'data-access-request.validation.title-success' | translate}}\n" +
    "    </h4>\n" +
    "    <h4 ng-if=\"!isValid\" class=\"modal-title\">\n" +
    "      <i class=\"fa fa-times fa-lg\"></i>\n" +
    "      {{'data-access-request.validation.title-error' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <p ng-if=\"isValid\">{{'data-access-request.validation.success' | translate}}</p>\n" +
    "    <p ng-if=\"!isValid\" translate>{{'data-access-request.validation.error' | translate}}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\" ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.ok\" translate>ok</span>\n" +
    "      {{confirm.ok}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <!--<div class=\"visible-print\" print-friendly-view></div>-->\n" +
    "  <print-friendly-view\n" +
    "    class=\"visible-print\"\n" +
    "    project=\"dataAccessRequest.project\"\n" +
    "    valid-form=\"validForm\"\n" +
    "    model=\"form.model\"\n" +
    "    access-form=\"dataAccessForm\"\n" +
    "    last-submitted-date=\"lastSubmittedDate\">\n" +
    "  </print-friendly-view>\n" +
    "  <div class=\"hidden-print\">\n" +
    "    <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "    <obiba-alert id=\"DataAccessRequestViewController\"></obiba-alert>\n" +
    "\n" +
    "    <div ng-if=\"validForm\">\n" +
    "\n" +
    "      <p class=\"help-block pull-left\"><span translate>created-by</span>\n" +
    "        <span ng-if=\"!actions.canViewProfile('mica-data-access-officer')\">\n" +
    "           {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}},\n" +
    "        </span>\n" +
    "        <span ng-if=\"actions.canViewProfile('mica-data-access-officer')\">\n" +
    "          <a href ng-click=\"userProfile(dataAccessRequest.profile)\">\n" +
    "            {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}}</a>,\n" +
    "        </span>\n" +
    "        <span title=\"{{dataAccessRequest.timestamps.created | amDateFormat: 'lll'}}\">{{dataAccessRequest.timestamps.created | amCalendar}}</span>\n" +
    "        <span class=\"label label-success\">{{dataAccessRequest.status | translate}}</span></p>\n" +
    "\n" +
    "      <div class=\"pull-right\">\n" +
    "        <a ng-click=\"submit()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canSubmit(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>submit\n" +
    "        </a>\n" +
    "        <a ng-click=\"reopen()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReopen(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>reopen\n" +
    "        </a>\n" +
    "        <a ng-click=\"review()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReview(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>review\n" +
    "        </a>\n" +
    "        <a ng-click=\"conditionallyApprove()\"\n" +
    "           ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canConditionallyApprove(dataAccessRequest)\"\n" +
    "           class=\"btn btn-info\" translate>conditionallyApprove\n" +
    "        </a>\n" +
    "        <a ng-click=\"approve()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canApprove(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>approve\n" +
    "        </a>\n" +
    "        <a ng-click=\"reject()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReject(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>reject\n" +
    "        </a>\n" +
    "        <a ng-href=\"#/data-access-request/{{dataAccessRequest.id}}/edit\"\n" +
    "          ng-if=\"actions.canEdit(dataAccessRequest)\"\n" +
    "          class=\"btn btn-primary\" title=\"{{'edit' | translate}}\">\n" +
    "          <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "        </a>\n" +
    "        <a ng-if=\"form.downloadTemplate === false\" ng-click=\"printForm()\"\n" +
    "           class=\"btn btn-default\" title=\"{{'global.print' | translate}}\">\n" +
    "          <i class=\"fa fa-print\"></i> <span translate>global.print</span>\n" +
    "        </a>\n" +
    "        <a ng-if=\"form.downloadTemplate === true\" target=\"_self\" href=\"{{requestDownloadUrl}}\" class=\"btn btn-default\">\n" +
    "          <i class=\"fa fa-download\"></i> <span>{{config.downloadButtonCaption || 'download' | translate}}</span>\n" +
    "        </a>\n" +
    "        <a ng-click=\"delete()\"\n" +
    "          ng-if=\"actions.canDelete(dataAccessRequest)\"\n" +
    "          class=\"btn btn-danger\" title=\"{{'delete' | translate}}\">\n" +
    "          <i class=\"fa fa-trash-o\"></i>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div class=\"voffset2\" ng-if=\"dataAccessRequest.project.permissions && dataAccessRequest.project.permissions.view\">\n" +
    "        <div ng-if=\"dataAccessRequest.project\" class=\"pull-right\">\n" +
    "          <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "            <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{dataAccessRequest.project.id}}\">{{dataAccessRequest.project.id}}</a>\n" +
    "          </small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <uib-tabset active=\"tabs.activeTab\" class=\"voffset5\">\n" +
    "        <!--Form-->\n" +
    "        <uib-tab index=\"0\" select=\"selectTab(TAB_NAMES.form)\" heading=\"{{'data-access-request.form' | translate}}\">\n" +
    "          <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "            <obiba-schema-form-renderer model=\"form.model\" schema-form=\"dataAccessForm\" read-only=\"true\"></obiba-schema-form-renderer>\n" +
    "          </form>\n" +
    "        </uib-tab>\n" +
    "        <!--Amendments-->\n" +
    "        <uib-tab index=\"1\" select=\"selectTab(TAB_NAMES.amendments)\">\n" +
    "          <uib-tab-heading>\n" +
    "            {{'data-access-amendments' | translate}}\n" +
    "          </uib-tab-heading>\n" +
    "\n" +
    "          <div ng-show=\"parentId\" class=\"voffset1\">\n" +
    "            <entity-list parent-id=\"parentId\" can-add=\"actions.canAddAmendments(dataAccessRequest)\"></entity-list>\n" +
    "          </div>\n" +
    "        </uib-tab>\n" +
    "        <!--Documents-->\n" +
    "        <uib-tab index=\"2\" select=\"selectTab(TAB_NAMES.documents)\">\n" +
    "          <uib-tab-heading>\n" +
    "            {{config.documentsSectionTitle || 'data-access-request.documents' | translate}}\n" +
    "            <span class=\"badge hoffset1\" ng-show=\"dataAccessRequest.attachments\"><small>{{dataAccessRequest.attachments.length}}</small></span>\n" +
    "          </uib-tab-heading>\n" +
    "          <div ng-include=\"'access/views/data-access-request-documents-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "        <!--Comments-->\n" +
    "        <uib-tab index=\"3\"\n" +
    "                 ng-if=\"config.commentsEnabled\"\n" +
    "                 select=\"selectTab(TAB_NAMES.comments)\"\n" +
    "                 heading=\"{{'data-access-request.comments' | translate}}\">\n" +
    "          <obiba-comments class=\"voffset2\" comments=\"form.comments\"\n" +
    "                          on-update=\"updateComment\" on-delete=\"deleteComment\"\n" +
    "                          name-resolver=\"getFullName(profile)\"\n" +
    "                          edit-action=\"EDIT\" delete-action=\"DELETE\"></obiba-comments>\n" +
    "          <obiba-comment-editor on-submit=\"submitComment\"></obiba-comment-editor>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab index=\"4\"\n" +
    "                 ng-if=\"config.commentsEnabled && actions.canViewPrivateComments(dataAccessRequest)\"\n" +
    "                 select=\"selectTab(TAB_NAMES.privateComments)\"\n" +
    "                 heading=\"{{'data-access-request.private-comments' | translate}}\">\n" +
    "          <obiba-comments class=\"voffset2\" comments=\"form.comments\"\n" +
    "                          on-update=\"updateComment\" on-delete=\"deleteComment\"\n" +
    "                          name-resolver=\"getFullName(profile)\"\n" +
    "                          edit-action=\"EDIT\" delete-action=\"DELETE\"></obiba-comments>\n" +
    "          <obiba-comment-editor on-submit=\"submitComment\"></obiba-comment-editor>\n" +
    "        </uib-tab>\n" +
    "        <!--History-->\n" +
    "        <uib-tab index=\"5\" select=\"selectTab(TAB_NAMES.history)\" heading=\"{{'data-access-request.history' | translate}}\">\n" +
    "          <div ng-include=\"'access/views/data-access-request-history-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "      </uib-tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/components/crosstab-study-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/crosstab-study-table/component.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span title=\"{{$ctrl.contingency.info.population ? $ctrl.contingency.info.population + ':' + $ctrl.contingency.info.dce : ''}}\">\n" +
    "  <span ng-if=\"$ctrl.contingency.studyTable\">\n" +
    "    <a ng-href=\"{{$ctrl.studyLink}}\">{{$ctrl.contingency.info.summary}}</a>\n" +
    "    <span>{{$ctrl.contingency.info.tableName}}</span>\n" +
    "  </span>\n" +
    "</span>");
}]);

angular.module("analysis/components/entities-count-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/entities-count-result-table/component.html",
    "<div>\n" +
    "  <p class=\"help-block\" ng-if=\"$ctrl.result && $ctrl.result.query && (!$ctrl.result.counts || $ctrl.result.counts.length === 0)\" translate>search.no-results</p>\n" +
    "  <table class=\"table table-bordered table-striped\" ng-if=\"$ctrl.result && $ctrl.result.counts && $ctrl.result.counts.length>0\">\n" +
    "    <thead>\n" +
    "      <th ng-if=\"$ctrl.showStudyColumn()\" translate>taxonomy.target.study</th>\n" +
    "      <th translate>taxonomy.target.variable</th>\n" +
    "      <th translate>taxonomy.target.dataset</th>\n" +
    "      <th style=\"width: 400px\" translate>analysis.criteria</th>\n" +
    "      <th style=\"width: 100px\" translate>analysis.count</th>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"row in $ctrl.table.rows\">\n" +
    "          <td ng-if=\"row[0].rowspan>0 && $ctrl.showStudyColumn()\" colspan=\"{{row[0].colspan}}\" rowspan=\"{{row[0].rowspan}}\" title=\"{{row[0].title}}\">\n" +
    "            <a href=\"{{row[0].link}}\">{{row[0].value}}</a>\n" +
    "          </td>\n" +
    "          \n" +
    "          <!-- per variable criteria -->\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[1].colspan}}\">\n" +
    "              <a href=\"{{row[1].link}}\">{{row[1].value}}</a>\n" +
    "              <div class=\"help-block\">{{row[1].title}}</div>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[2].colspan}}\" title=\"{{row[2].title}}\">\n" +
    "              <a href=\"{{row[2].link}}\">{{row[2].value}}</a>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[3].colspan}}\">\n" +
    "            <variable-criteria query=\"row[3].value\"></variable-criteria>  \n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[4].colspan}}\">\n" +
    "            {{row[4].value}}\n" +
    "          </td>\n" +
    "\n" +
    "          <!-- all criteria -->\n" +
    "          <td ng-if=\"row.length===3\" colspan=\"{{row[1].colspan}}\" title=\"{{row[1].title}}\">\n" +
    "            <b translate>analysis.all-criteria</b>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===3\" colspan=\"{{row[2].colspan}}\">\n" +
    "            <span ng-if=\"$ctrl.studyCount === 1\" class=\"badge\">{{$ctrl.localizedTotal}}</span>\n" +
    "            <b ng-if=\"$ctrl.studyCount > 1\">{{row[2].value}}</b>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"$ctrl.studyCount > 1\">\n" +
    "          <td colspan=\"{{$ctrl.showStudyColumn() ? 4 : 3}}\">\n" +
    "            <b translate>total</b>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <span class=\"badge\">{{$ctrl.localizedTotal}}</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("analysis/components/variable-criteria/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/variable-criteria/component.html",
    "<div>\n" +
    "  <p ng-if=\"$ctrl.loading\" class=\"voffset2 loading\"></p>\n" +
    "  \n" +
    "  <div  ng-hide=\"$ctrl.loading\" class=\"btn-group voffset1 btn-variable\" ng-class=\"{open: $ctrl.state.open}\" ng-keyup=\"$ctrl.onKeyup($event)\">\n" +
    "\n" +
    "    <button class=\"btn btn-xs dropdown btn-variable\" ng-click=\"$ctrl.openDropdown()\">\n" +
    "      <span title=\"{{$ctrl.getQueryTitle(false)}}\" test-ref=\"search-criterion\">\n" +
    "        {{$ctrl.getQueryTitle(true)}}\n" +
    "      </span>\n" +
    "      <span class=\"fa fa-caret-down\"></span>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-xs btn-default\" ng-click=\"$ctrl.onRemove()\">\n" +
    "      <span class=\"fa fa-times\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"\">\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <span>{{$ctrl.variable.name}}</span>\n" +
    "          <span class=\"pull-right\" title=\"{{'search.close-and-search' | translate}}\" ng-click=\"$ctrl.closeDropdown()\"><i class=\"fa fa-check\"></i></span>\n" +
    "        </li>\n" +
    "        <li class='divider'></li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.all-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"all\">\n" +
    "              {{'analysis.all' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.allFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.exists-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"exists\">\n" +
    "              {{'analysis.exists' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.existsFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.empty-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"empty\">\n" +
    "              {{'analysis.empty' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.emptyFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showInOperations()\">\n" +
    "          <label title=\"{{'analysis.in-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"in\">\n" +
    "              {{'analysis.in' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showInOperations()\">\n" +
    "          <label title=\"{{'analysis.out-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"out\">\n" +
    "              {{'analysis.out' | translate}}\n" +
    "          </label>\n" +
    "        <li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showCategoricalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showCategoricalOptions() && $ctrl.categoriesData && $ctrl.categoriesData.length>10\">\n" +
    "          <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "            <input ng-model=\"$ctrl.searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"category-search\" ng-keyup=\"$ctrl.onSearchTextKeyup($event)\">\n" +
    "            <span class=\"input-group-addon\" id=\"category-search\"><i class=\"fa fa-search\"></i></span>\n" +
    "          </span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"$ctrl.showCategoricalOptions()\">\n" +
    "          <ul class=\"no-padding criteria-list-terms\">\n" +
    "            <li class=\"criteria-list-item\" ng-if=\"category.visible\" ng-repeat=\"category in $ctrl.categoriesData\">\n" +
    "              <label class=\"control-label\">\n" +
    "                <input \n" +
    "                  ng-model=\"$ctrl.selectedCategories[category.name]\"\n" +
    "                  type=\"checkbox\"\n" +
    "                  ng-click=\"$ctrl.updateSelection()\"/>\n" +
    "                  <span title=\"{{category.name}}\">{{category.label}}</span>\n" +
    "              </label>\n" +
    "              <div class=\"pull-right\">\n" +
    "                <span class=\"agg-term-count\">{{$ctrl.localizeNumber(category.frequency)}}</span>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showNumericalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions()\">\n" +
    "          <select class=\"form-control input-sm form-select\" ng-model=\"$ctrl.selectedNumericalOperation\">\n" +
    "            <option value=\"range\">{{'analysis.range' | translate}}</option>\n" +
    "            <option value=\"in\">{{'analysis.values' | translate}}</option>\n" +
    "          </select>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions() && $ctrl.selectedNumericalOperation === 'range'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"range-min\" translate>analysis.min</label>\n" +
    "                <input ng-model=\"$ctrl.selectedMin\" type=\"text\" class=\"form-control\" id=\"range-min\" ng-keyup=\"$ctrl.onNumericalMinKeyup($event)\" placeholder=\"{{$ctrl.rangeMin}}\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"range-max\" translate>analysis.max</label>\n" +
    "                <input ng-model=\"$ctrl.selectedMax\" type=\"text\" class=\"form-control\" id=\"range-max\" ng-keyup=\"$ctrl.onNumericalMaxKeyup($event)\" placeholder=\"{{$ctrl.rangeMax}}\">\n" +
    "              </div>    \n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions() && $ctrl.selectedNumericalOperation === 'in'\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"in-values\" translate>analysis.values-title</label>\n" +
    "            <input ng-model=\"$ctrl.selectedNumericalValues\" type=\"text\" class=\"form-control\" id=\"in-values\" ng-keyup=\"$ctrl.onNumericalValuesKeyup($event)\">\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showTemporalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions()\">\n" +
    "          <select class=\"form-control input-sm form-select\" ng-model=\"$ctrl.selectedTemporalOperation\">\n" +
    "            <option value=\"range\">{{'analysis.range' | translate}}</option>\n" +
    "            <option value=\"in\">{{'analysis.value' | translate}}</option>\n" +
    "          </select>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions() && $ctrl.selectedTemporalOperation === 'range'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"from-date\" class=\"control-label\" translate>analysis.to</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"from-date\" type=\"text\" class=\"form-control\" aria-describedby=\"from-date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedFrom\" is-open=\"$ctrl.fromDatePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"from-date-picker\" ng-click=\"$ctrl.fromDatePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"to-date\" class=\"control-label\" translate>analysis.to</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"to-date\" type=\"text\" class=\"form-control\" aria-describedby=\"to-date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedTo\" is-open=\"$ctrl.toDatePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"to-date-picker\" ng-click=\"$ctrl.toDatePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions() && $ctrl.selectedTemporalOperation === 'in'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-12\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"in-date\" class=\"control-label\" translate>analysis.date-title</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"in-date\" type=\"text\" class=\"form-control\" aria-describedby=\"date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedTemporalValue\" is-open=\"$ctrl.datePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"date-picker\" ng-click=\"$ctrl.datePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-crosstab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-crosstab.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-cloak>\n" +
    "  <h4>{{dataset.translatedAcronym}} {{'dataset.crosstab.title' | translate}}</h4>\n" +
    "\n" +
    "  <obiba-alert id=\"DatasetVariableCrosstabController\"></obiba-alert>\n" +
    "\n" +
    "  <!-- crosstab variable selection -->\n" +
    "  <div class=\"well well-sm\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"cross-tab col-xs-4\">\n" +
    "        <ui-select ng-model=\"crosstab.lhs.variable\" theme=\"bootstrap\">\n" +
    "          <ui-select-match placeholder=\"{{'dataset.crosstab.categorical' | translate}}\">{{$select.selected.name}}\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices refresh=\"searchCategoricalVariables($select.search)\" refresh-delay=\"0\"\n" +
    "                             repeat=\"variable in crosstab.lhs.variables\">\n" +
    "\n" +
    "            <div>{{variable.name}}</div>\n" +
    "            <small>{{variable | variableLabel}}</small>\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-1 text-center no-padding no-margin sm-width\">\n" +
    "        <i class=\"fa fa-times fa-2x\"></i>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cross-tab col-xs-4\">\n" +
    "        <ui-select ng-model=\"crosstab.rhs.variable\" theme=\"bootstrap\">\n" +
    "          <ui-select-match placeholder=\"{{'dataset.crosstab.another' | translate}}\">{{$select.selected.name}}\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices refresh=\"searchVariables($select.search)\" refresh-delay=\"0\"\n" +
    "                             repeat=\"variable in crosstab.rhs.variables\">\n" +
    "\n" +
    "            <div>{{variable.name}}</div>\n" +
    "            <small>{{variable | variableLabel}}</small>\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-3\">\n" +
    "        <span>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" aria-hidden=\"true\" ng-click=\"submit()\">{{'submit' | translate}}\n" +
    "          </button>\n" +
    "          <button ng-if=\"canExchangeVariables()\" type=\"button\" class=\"btn btn-primary\"\n" +
    "                  aria-hidden=\"true\" ng-click=\"exchangeVariables()\"> v1 <i class=\"fa fa-exchange fa-1x\"></i> v2\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-default\" aria-hidden=\"true\" ng-click=\"clear()\">{{'clear' | translate}}\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <span class=\"help-block\">{{'dataset.crosstab.query-help' | translate}}</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- crosstab results -->\n" +
    "  <div ng-if=\"crosstab.contingencies && crosstab.contingencies.length > 0\">\n" +
    "\n" +
    "    <div>\n" +
    "      <!-- table detail and stats options -->\n" +
    "      <div class=\"btn-group\">\n" +
    "        <label class=\"btn\" ng-class=\"{'btn-info': options.showDetails, 'btn-default': !options.showDetails}\"\n" +
    "               ng-model=\"options.showDetails\" uib-btn-checkbox>{{'global.detailed' | translate}}</label>\n" +
    "        <div class=\"btn-group\" ng-if=\"!isStatistical(crosstab.rhs.xVariable)\">\n" +
    "          <label class=\"btn\" ng-class=\"{'btn-info': options.statistics === StatType.CPERCENT, 'btn-default': options.statistics !== StatType.CPERCENT}\"\n" +
    "                 ng-model=\"options.statistics\" uib-btn-radio=\"StatType.CPERCENT\">{{'global.percentage' | translate}} <i class=\"fa fa-long-arrow-down\"></i></label>\n" +
    "          <label class=\"btn\" ng-class=\"{'btn-info': options.statistics === StatType.RPERCENT, 'btn-default': options.statistics !== StatType.RPERCENT}\"\n" +
    "                 ng-model=\"options.statistics\" uib-btn-radio=\"StatType.RPERCENT\">{{'global.percentage' | translate}} <i class=\"fa fa-long-arrow-right\"></i></label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- download menu -->\n" +
    "      <div class=\"pull-right sm-bottom-margin\">\n" +
    "        <div class=\"btn-group\" role=\"group\">\n" +
    "          <button type=\"button\" class=\"btn btn-info btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n" +
    "                  aria-expanded=\"false\">\n" +
    "            <i class=\"glyphicon glyphicon-download-alt\"></i> <span>{{'download' | translate}}</span>\n" +
    "            <span class=\"caret\"></span>\n" +
    "          </button>\n" +
    "          <ul class=\"dropdown-menu dropdown-menu-compact\">\n" +
    "            <li><a obiba-file-download url=\"downloadUrl(DocType.EXCEL)\" target=\"_self\" download ><i class=\"fa fa-file-excel-o\"></i> {{'excel' | translate}}</a></li>\n" +
    "            <li><a obiba-file-download url=\"downloadUrl(DocType.CSV)\" target=\"_self\" download ><i class=\"fa fa-file-text-o\"></i> {{'csv' | translate}}</a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- progress image -->\n" +
    "    <div>\n" +
    "      <div ng-if=\"loading\" class=\"loading \"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <table ng-if=\"!loading\" class=\"table table-striped table-bordered no-margin no-padding\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th style=\"vertical-align: top\" class=\"\" ng-if=\"datasetHarmo\" width=\"20%\"\n" +
    "            rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\">{{options.showDetailedStats ? ('dataset.study-table.title' | translate) : ''}}\n" +
    "        </th>\n" +
    "        <th style=\"vertical-align: top\" rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\" width=\"10%\">\n" +
    "          <a href=\"{{PageUrlService.variablePage(crosstab.rhs.xVariable.id)}}\">{{crosstab.rhs.xVariable.name}}</a>\n" +
    "        </th>\n" +
    "        <th class=\"text-center\" colspan=\"{{crosstab.lhs.xVariable.categories.length}}\">\n" +
    "          <a href=\"{{PageUrlService.variablePage(crosstab.lhs.xVariable.id)}}\">{{crosstab.lhs.xVariable.name}}</a>\n" +
    "        </th>\n" +
    "        <th style=\"vertical-align: top\" class=\"text-center\" rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\">\n" +
    "          {{'total' | translate}}\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th class=\"text-center\" ng-repeat=\"category in crosstab.lhs.xVariable.categories\">\n" +
    "          <span  class=\"clickable\" popover-title=\"\" popover-popup-delay=\"250\" popover-placement=\"bottom\" popover-trigger=\"'mouseenter'\"\n" +
    "                uib-popover=\"{{crosstab.lhs.xVariable.categories | variableCategory:category.name | variableLabel}}\">{{category.name}}</span>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "\n" +
    "      <!-- Categorical -->\n" +
    "      <tbody ng-repeat=\"contingency in crosstab.contingencies track by $index\"\n" +
    "             ng-if=\"!isStatistical(crosstab.rhs.xVariable) && (!datasetHarmo || (datasetHarmo && options.showDetailedStats))\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "      <tbody ng-if=\"!isStatistical(crosstab.rhs.xVariable) && datasetHarmo && options.showDetailedStats\">\n" +
    "      <tr>\n" +
    "        <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\"></td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "      <tbody ng-repeat=\"contingency in [crosstab.all]\" ng-init=\"grandTotal = true\"\n" +
    "             ng-if=\"datasetHarmo && !isStatistical(crosstab.rhs.xVariable)\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "\n" +
    "      <!-- Statistical -->\n" +
    "      <tbody ng-repeat=\"contingency in crosstab.contingencies\"\n" +
    "             ng-if=\"isStatistical(crosstab.rhs.xVariable) && (!datasetHarmo || (datasetHarmo && options.showDetailedStats))\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "      <tbody ng-if=\"isStatistical(crosstab.rhs.xVariable) && datasetHarmo && options.showDetailedStats\">\n" +
    "      <tr>\n" +
    "        <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\"></td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "      <tbody ng-repeat=\"contingency in [crosstab.all]\" ng-init=\"grandTotal = true\"\n" +
    "             ng-if=\"datasetHarmo && isStatistical(crosstab.rhs.xVariable)\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <span ng-bind-html=\"renderHtml(body)\"></span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-frequencies-empty.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-frequencies-empty.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo\" rowspan=\"{{crosstab.rhs.xVariable.categories.length + 1}}\">\n" +
    "    <crosstab-study-table contingency=\"contingency\"></crosstab-study-table>\n" +
    "  </td>\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 2}}\"><em>{{'search.no-results' | translate}}</em></td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-frequencies.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-frequencies.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails\" ng-repeat=\"frequency in contingency.aggregations[0].frequencies track by $index\">\n" +
    "  <td ng-if=\"datasetHarmo && $index === 0\" rowspan=\"{{crosstab.rhs.xVariable.categories.length + 2}}\">\n" +
    "      <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "\n" +
    "  <td>\n" +
    "    <span class=\"clickable\" popover-title=\"\" popover-popup-delay=\"250\" popover-placement=\"bottom\" popover-trigger=\"'mouseenter'\"\n" +
    "          uib-popover=\"{{crosstab.rhs.xVariable.categories | variableCategory:frequency.value | variableLabel}}\">\n" +
    "      {{frequency.value}}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "\n" +
    "  <td ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    {{aggregation.frequencies[$parent.$index].count}}&nbsp;\n" +
    "\n" +
    "    <span ng-show=\"aggregation.privacyCheck\" class=\"help-inline\">\n" +
    "      <span ng-show=\"options.statistics === StatType.RPERCENT\">\n" +
    "        ({{aggregation.frequencies[$parent.$index].percent | number:2}}%)\n" +
    "      </span>\n" +
    "      <span ng-show=\"options.statistics === StatType.CPERCENT\">\n" +
    "        ({{aggregation.frequencies[$parent.$index].cpercent | number:2}}%)\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td>\n" +
    "    {{contingency.all.frequencies[$index].count}}&nbsp;\n" +
    "    <span ng-if=\"contingency.all.privacyCheck\" class=\"help-inline\">\n" +
    "      <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "        (100%)\n" +
    "      </span>\n" +
    "      <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "        ({{contingency.all.frequencies[$index].percent | number:2}}%)\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"options.showDetailedStats &&  datasetHarmo && !options.showDetails\" rowspan=\"{{crosstab.rhs.xVariable.categories.length}}\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td><em>N</em></td>\n" +
    "  <td ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{aggregation.n}}&nbsp;\n" +
    "      <span class=\"help-inline\">\n" +
    "        <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "          ({{aggregation.percent | number:2}}%)\n" +
    "        </span>\n" +
    "        <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "      </span>\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{contingency.all.n}}&nbsp;\n" +
    "      <span ng-if=\"contingency.privacyCheck\" class=\"help-inline\">\n" +
    "        <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "        <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "      <span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails && !grandTotal && contingency.privacyCheck\">\n" +
    "  <td>\n" +
    "    <em>{{'dataset.crosstab.chi-squared.test' | translate}}</em>\n" +
    "  </td>\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 1}}\">\n" +
    "    <span>\n" +
    "      χ2 = {{contingency.chiSquaredInfo.sum | number:4 }},&nbsp;&nbsp;\n" +
    "      df = {{contingency.chiSquaredInfo.df}},&nbsp;&nbsp;\n" +
    "      p-value = {{contingency.chiSquaredInfo.pValue | number:4 }}\n" +
    "    </span>\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{'dataset.crosstab.privacy-check-failed' | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"!grandTotal && !contingency.privacyCheck\">\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 2}}\">\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{getPrivacyErrorMessage(contingency) | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-statistics-empty.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-statistics-empty.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo\">\n" +
    "    <crosstab-study-table contingency=\"contingency\"></crosstab-study-table>\n" +
    "  </td>\n" +
    "  <td colspan=\"4\" class=\"danger\"><em>{{'no-results' | translate}}</em></td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-statistics.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-statistics.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td ng-if=\"datasetHarmo\" rowspan=\"{{!grandTotal && !contingency.privacyCheck ? '6' : '5'}}\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td translate>min</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.min | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.min | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>max</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.max | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.max | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>mean</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.mean | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.mean | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>std-deviation</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.stdDeviation | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.stdDeviation | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo && !options.showDetails\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td>N</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{aggregation.n}}\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td class=\"text-center\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{contingency.all.n}}\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"!grandTotal && !contingency.privacyCheck\" colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\">\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{getPrivacyErrorMessage(contingency) | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    <span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/views/analysis-entities-count.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/views/analysis-entities-count.html",
    "<div>\n" +
    "  <div ng-if=\"entitiesHeaderTemplateUrl\" ng-include=\"entitiesHeaderTemplateUrl\"></div>\n" +
    "  <div>\n" +
    "      <span class=\"btn btn-primary\" ng-show=\"result.counts\">\n" +
    "        <span ng-show=\"result.counts.length>0\" translate>{{result.counts[0].entityType}}</span>\n" +
    "        <span class=\"badge\">{{localizedTotal}}</span>\n" +
    "      </span>\n" +
    "      <span ng-if=\"loading\" class=\"voffset2 loading\"></span>\n" +
    "  </div>\n" +
    "  <entities-count-result-table ng-hide=\"loading && !result.total\" result=\"result\"></entities-count-result-table>\n" +
    "  <p ng-hide=\"query\" translate>analysis.entities-count.no-query</p>\n" +
    "</div>");
}]);

angular.module("attachment/attachment-input-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("attachment/attachment-input-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<button ng-hide=\"{{disabled}}\" type=\"button\" class=\"btn btn-primary btn-xs\" aria-hidden=\"true\" ngf-multiple=\"{{multiple}}\" ngf-select\n" +
    "        ngf-change=\"onFileSelect($files)\" translate>file.upload.button\n" +
    "</button>\n" +
    "\n" +
    "<table ng-show=\"files.length\" class=\"table table-bordered table-striped\">\n" +
    "  <thead>\n" +
    "  <tr>\n" +
    "    <th translate>data-access-request.default.documents.title</th>\n" +
    "    <th class=\"col-xs-2\"><span class=\"pull-right\" translate>file.upload.date</span></th>\n" +
    "    <th translate>size</th>\n" +
    "    <th ng-show=\"deleteAttachments\" translate>actions</th>\n" +
    "  </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "  <tr ng-repeat=\"file in files\">\n" +
    "    <td>\n" +
    "      {{file.fileName}}\n" +
    "      <uib-progressbar ng-show=\"file.showProgressBar\" class=\"progress-striped\" value=\"file.progress\">\n" +
    "        {{file.progress}}%\n" +
    "      </uib-progressbar>\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <span class=\"pull-right\" ng-if=\"file.timestamps\" title=\"{{ file.timestamps.created | amDateFormat: 'lll' }}\">{{file.timestamps.created | amCalendar }}</span>\n" +
    "    </td>\n" +
    "    <td style=\"width:1%;\">\n" +
    "        <span class=\"pull-right\" style=\"white-space: nowrap;\">\n" +
    "          {{file.size | bytes}}\n" +
    "        </span>\n" +
    "    </td>\n" +
    "    <td style=\"width:20px;\" ng-show=\"deleteAttachments\">\n" +
    "      <a ng-show=\"file.id\" ng-click=\"deleteFile(file.id)\" class=\"action\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "      <a ng-show=\"file.tempId\" ng-click=\"deleteTempFile(file.tempId)\" class=\"action\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("attachment/attachment-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("attachment/attachment-list-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <span ng-if=\"!hasAttachments && emptyMessage\"><em>{{emptyMessage}}</em></span>\n" +
    "  <table ng-if=\"hasAttachments\" class=\"table table-bordered table-striped\" >\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "      <th translate>data-access-request.default.documents.title</th>\n" +
    "      <th class=\"col-xs-2\"><span class=\"pull-right\" translate>file.upload.date</span></th>\n" +
    "      <th translate>size</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"attachment in attachments\">\n" +
    "      <th>\n" +
    "        <a target=\"_self\" ng-href=\"{{attachment.href}}\"\n" +
    "           download=\"{{attachment.fileName}}\">{{attachment.fileName}}\n" +
    "        </a>\n" +
    "      </th>\n" +
    "      <td><span class=\"pull-right\" ng-if=\"attachment.timestamps\" title=\"{{ attachment.timestamps.created | amDateFormat: 'lll' }}\">{{attachment.timestamps.created | amCalendar }}</span></td>\n" +
    "      <td style=\"width:1%;\">\n" +
    "        <span class=\"pull-right\" style=\"white-space: nowrap;\">\n" +
    "          {{attachment.size | bytes}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("file-browser/views/document-detail-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/document-detail-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <span>\n" +
    "      <span title=\"{{data.details.document.name}}\">\n" +
    "        <i class=\"fa {{getDocumentIcon(data.details.document)}}\"></i> {{truncate(data.details.document.name, 30)}}\n" +
    "      </span>\n" +
    "      <a href class=\"pull-right\" ng-click=\"hideDetails()\"><i class=\"fa fa-times\"></i></a>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div>\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'size' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span ng-if=\"!isFile(data.details.document)\">{{data.details.document.size}} {{data.details.document.size === 1 ? 'item' : 'items' | translate}}</span>\n" +
    "        <span ng-if=\"isFile(data.details.document)\">{{data.details.document.size | bytes}}</span>\n" +
    "        <a target=\"{{downloadTarget}}\" ng-href=\"{{getDownloadUrl(data.details.document.path, data.document.keyToken)}}\" class=\"hoffset2\" title=\"{{'download' | translate}}\" download>\n" +
    "          <span><i class=\"fa fa-download\"></i><span class=\"hoffset2\"></span></span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"voffset2\">\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'created-on' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span>{{data.details.document.timestamps.created | amDateFormat : 'lll'}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"voffset2\">\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'last-modified' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span>{{data.details.document.timestamps.lastUpdate | amDateFormat : 'lll'}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isFile(data.details.document)\" class=\"voffset2\">\n" +
    "      <div ng-if=\"data.details.document.attachment.type\">\n" +
    "        <label class=\"text-muted no-margin\">\n" +
    "          <small>{{'type' | translate}}</small>\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          <span>{{data.details.document.attachment.type}}</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"hasLocalizedValue(data.details.document.attachment.description)\"\n" +
    "           class=\"voffset2\">\n" +
    "        <label class=\"text-muted no-margin\">\n" +
    "          <small>{{'description' | translate}}</small>\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          <span>{{getLocalizedValue(data.details.document.attachment.description)}}</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("file-browser/views/documents-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/documents-table-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-default table-responsive table-responsive-dropdown\">\n" +
    "  <div class=\"panel-heading\" ng-if=\"data.search.active\">\n" +
    "      <a class=\"no-text-decoration\" ng-click=\"clearSearch()\">\n" +
    "        <i class=\"fa fa-chevron-left\"> </i>\n" +
    "      </a>\n" +
    "      <span ng-if=\"data.search.recursively\">{{'file.search-results.current-sub' | translate}}</span>\n" +
    "      <span ng-if=\"!data.search.recursively\">{{'file.search-results.current' | translate}}</span>\n" +
    "      ({{data.document.children.length}})\n" +
    "  </div>\n" +
    "  <div ng-if=\"data.document.children.length > 0\" test-ref=\"file-search-result-list\">\n" +
    "    <table class=\"table table-bordered table-striped no-padding no-margin\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th colspan=\"2\" translate>name</th>\n" +
    "        <th style=\"width: 100px\" translate>type</th>\n" +
    "        <th style=\"width: 100px\" translate>size</th>\n" +
    "        <th style=\"width: 150px\" translate>global.modified</th>\n" +
    "        <th ng-if=\"data.search.active\" translate>folder</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-show=\"!data.isRoot && data.document.path !== data.rootPath && !data.search.active\">\n" +
    "        <td colspan=\"5\">\n" +
    "          <i class=\"fa fa-folder\"></i>\n" +
    "          <span><a href style=\"text-decoration: none\" class=\"no-text-decoration\" ng-click=\"navigateBack()\"> ..</a></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      <tr ng-class=\"{'selected-row': $index === pagination.selected}\"\n" +
    "          dir-paginate=\"document in data.document.children | itemsPerPage: pagination.itemsPerPage\"\n" +
    "          ng-init=\"fileDocument = isFile(document)\"\n" +
    "          current-page=\"pagination.currentPage\">\n" +
    "\n" +
    "        <td ng-click=\"showDetails(document, $index);\">\n" +
    "          <span>\n" +
    "            <span ng-if=\"fileDocument\">\n" +
    "              <i class=\"fa {{getDocumentIcon(document)}}\"></i>\n" +
    "              <a ng-if=\"fileDocument\" target=\"{{downloadTarget}}\" test-ref=\"file-name\"\n" +
    "                 style=\"text-decoration: none\" ng-click=\"$event.stopPropagation();\" ng-href=\"{{getDownloadUrl(document.path, data.document.keyToken)}}\"\n" +
    "                  title=\"{{document.name}}\">\n" +
    "                {{document.name}}\n" +
    "              </a>\n" +
    "            </span>\n" +
    "            <span ng-if=\"!fileDocument\">\n" +
    "              <i class=\"fa {{getDocumentIcon(document)}}\"></i>\n" +
    "              <a href style=\"text-decoration: none\" ng-click=\"navigateTo($event, document, data.document.keyToken)\">\n" +
    "                {{document.name}}\n" +
    "              </a>\n" +
    "            </span>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "\n" +
    "        <td class=\"fit-content\">\n" +
    "          <span class=\"btn-group pull-right\" uib-dropdown is-open=\"status.isopen\">\n" +
    "            <a title=\"{{'file.show-details' | translate}}\" id=\"single-button\" class=\"dropdown-anchor\" uib-dropdown-toggle\n" +
    "               ng-disabled=\"disabled\">\n" +
    "              <i class=\"glyphicon glyphicon-option-horizontal btn-large\"></i>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "              <li role=\"menuitem\">\n" +
    "                <a href ng-click=\"showDetails(document, $index)\">\n" +
    "                  <span><i class=\"fa fa-info\"></i><span class=\"hoffset2\">{{'details' | translate}}</span></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "              <li role=\"menuitem\">\n" +
    "                <a target=\"{{downloadTarget}}\" ng-href=\"{{getDownloadUrl(document.path, data.document.keyToken)}}\" download>\n" +
    "                  <span><i class=\"fa fa-download\"></i><span class=\"hoffset2\">{{'download' | translate}}</span></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "\n" +
    "        <td>\n" +
    "          <span ng-repeat=\"t in getTypeParts(document) track by $index\"\n" +
    "            class=\"label label-info\" test-ref=\"file-type\"\n" +
    "            ng-class=\"{'hoffset1' : !$first}\">{{t}}</span>\n" +
    "        </td>\n" +
    "        <td class=\"no-wrap\" ng-if=\"fileDocument\" test-ref=\"file-size\">\n" +
    "          {{document.size | bytes}}\n" +
    "        </td>\n" +
    "        <td class=\"no-wrap\" ng-if=\"!fileDocument\">\n" +
    "          {{document.size}} {{document.size === 1 ? 'item' : 'items' | translate}}\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span title=\"{{document.timestamps.lastUpdate | amDateFormat: 'lll'}}\" test-ref=\"file-lastModification\">\n" +
    "            {{document.timestamps.lastUpdate | amTimeAgo}}\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td ng-if=\"data.search.active\">\n" +
    "          <a href class=\"no-text-decoration\" ng-click=\"navigateToParent($event, document, data.document.keyToken)\" test-ref=\"file-parent\">\n" +
    "            {{document.attachment.path === data.rootPath ? '/' : document.attachment.path.replace(data.rootPath, '')}}\n" +
    "          </a>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("file-browser/views/file-browser-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/file-browser-template.html",
    "<div ng-cloak>\n" +
    "  <div ng-if=\"!noDocument\">\n" +
    "    <h4 ng-show=\"showTitle\">{{documentsTitle | translate}}</h4>\n" +
    "  <div ng-if=\"!data.document\" class=\"loading\"></div>\n" +
    "\n" +
    "  <div ng-if=\"data.document\">\n" +
    "    <obiba-alert id=\"FileSystemController\"></obiba-alert>\n" +
    "\n" +
    "    <div>\n" +
    "      <!-- Document details -->\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div ng-include=\"'file-browser/views/toolbar-template.html'\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"row voffset2\">\n" +
    "        <div ng-class=\"{'col-md-8': data.details.show, 'col-md-12': !data.details.show}\">\n" +
    "          <div ng-include=\"'file-browser/views/documents-table-template.html'\"></div>\n" +
    "          <div ng-if=\"!data.isFile && data.document.children.length < 1 && !data.search.active\" class=\"text-muted\">\n" +
    "            <em>{{'empty-folder' | translate}}</em>\n" +
    "          </div>\n" +
    "          <div class=\"pull-right no-margin\">\n" +
    "            <dir-pagination-controls></dir-pagination-controls>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"data.details.show\" class=\"col-md-4\">\n" +
    "          <div ng-include=\"'file-browser/views/document-detail-template.html'\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("file-browser/views/toolbar-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/toolbar-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<div>\n" +
    "    <div class=\"pull-left voffset3\">\n" +
    "        <ol ng-show=\"data.document.path !== data.rootPath\" class=\"breadcrumb mica-breadcrumb no-margin no-padding\">\n" +
    "            <li>\n" +
    "                <a href ng-click=\"navigateToPath(data.rootPath, data.document.keyToken)\">\n" +
    "                    <span><i class=\"fa {{getDocumentIcon(data.document)}}\"></i></span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-repeat=\"part in data.breadcrumbs\" ng-class=\"{'active': $first === $last && $last}\">\n" +
    "                <a ng-show=\"!$last && part.name !== '/'\" href ng-click=\"navigateToPath(part.path, data.document.keyToken)\">\n" +
    "                    <span ng-show=\"part.name !== '/'\">{{part.name}}</span>\n" +
    "                </a>\n" +
    "                <span class=\"no-padding\" ng-if=\"part.name !== '/' && $last\">{{data.document.name || 'empty'}}</span>\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!data.document.keyToken\" class=\"pull-right\">\n" +
    "\n" +
    "      <table style=\"border:none\">\n" +
    "        <tbody>\n" +
    "        <tr>\n" +
    "          <td>\n" +
    "            <a href>\n" +
    "              <span class=\"input-group input-group-sm no-padding-top no-padding-right\">\n" +
    "               <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></span>\n" +
    "               <input ng-keyup=\"searchKeyUp($event)\"\n" +
    "                      ng-model=\"data.search.text\"\n" +
    "                      type=\"text\"\n" +
    "                      class=\"form-control ng-pristine ng-untouched ng-valid\"\n" +
    "                      aria-describedby=\"study-search\"\n" +
    "                      style=\"max-width: 200px;\"\n" +
    "                      test-ref=\"file-search-input\">\n" +
    "               <span ng-show=\"data.search.text\" title=\"{{'search-tooltip.clear' | translate}}\" ng-click=\"clearSearch()\"\n" +
    "                  class=\"input-group-addon\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "               </span>\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <a href ng-model=\"data.search.recursively\"\n" +
    "              class=\"btn btn-sm hoffset1\"\n" +
    "              ng-class=\"{'btn-info': data.search.recursively, 'btn-default': !data.search.recursively}\"\n" +
    "              data-toggle=\"button\" ng-click=\"toggleRecursively()\"\n" +
    "              title=\"{{'search-tooltip.recursively' | translate}}\">\n" +
    "              <i class=\"fa i-obiba-hierarchy\"></i>\n" +
    "            </a>\n" +
    "            <a href ng-click=\"searchDocuments('RECENT')\"\n" +
    "              class=\"btn btn-info btn-sm\"\n" +
    "              title=\"{{'search-tooltip.most-recent' | translate}}\">\n" +
    "              <span><i class=\"fa fa-clock-o fa-lg\"></i></span>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("graphics/views/charts-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("graphics/views/charts-directive.html",
    "<div>\n" +
    "  <div ng-if=\"chartObject.type === 'GeoChart'\">\n" +
    "    <obiba-geo config=\"chartObject.d3Config\"></obiba-geo>\n" +
    "  </div>\n" +
    "  <div ng-if=\"chartObject.type !== 'GeoChart'\">\n" +
    "    <obiba-nv-chart chart-config=\"chartObject.d3Config\"></obiba-nv-chart>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("graphics/views/tables-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("graphics/views/tables-directive.html",
    "<div>\n" +
    "    <table ng-if=\"chartObject.entries && chartObject.entries.length\" style=\"max-height: 400px;\" class=\"table table-bordered table-striped\" fixed-header=\"chartObject.getTable().data\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "        <th ng-repeat=\"header in chartObject.header track by $index\">{{header}}</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"row in chartObject.entries track by $index\">\n" +
    "            <td>{{row.title}}</td>\n" +
    "            <td><a href ng-click=\"updateCriteria(row.key, chartObject.vocabulary)\">{{row.value}}</a></td>\n" +
    "            <td ng-if=\"row.participantsNbr\">{{row.participantsNbr}}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("lists/views/input-search-widget/input-search-widget-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/input-search-widget/input-search-widget-template.html",
    "<form class=\"list-search-widget\">\n" +
    "    <div class=\"form-group pull-left\">\n" +
    "        <entity-search-typeahead\n" +
    "                placeholder-text=\"global.list-search-placeholder\"\n" +
    "                target=\"target\"\n" +
    "                rql-query=\"rqlQuery\"\n" +
    "                entity-type=\"type\">\n" +
    "        </entity-search-typeahead>\n" +
    "    </div>\n" +
    "    <div class=\"pull-left voffset2 hoffset2\">\n" +
    "        <small><a href ng-href=\"{{navigateToSearchPage()}}\">\n" +
    "            {{'search.advanced-button' | translate}}\n" +
    "        </a></small>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("lists/views/list/datasets-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/datasets-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.dataset.noResults</p>\n" +
    "        <div ng-repeat=\"summary in summaries\" class=\"row sm-bottom-margin document-item-list flex-row\" test-ref=\"dataset\">\n" +
    "            <div class=\"col-md-12  col-sm-12 col-xs-12\">\n" +
    "                <h4>\n" +
    "                    <a ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "                        <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "                    </a>\n" +
    "                </h4>\n" +
    "                <p>\n" +
    "                    <localized value=\"summary.description\"\n" +
    "                               ellipsis-size=\"250\"\n" +
    "                               markdown-it=\"true\"\n" +
    "                               lang=\"lang\"></localized>\n" +
    "                </p>\n" +
    "                <a ng-if=\"summary.description\" href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                <div class=\"clear-fix\"></div>\n" +
    "                <div class=\"sm-top-margin countDetail voffset3\">\n" +
    "                    {{counts=summary['obiba.mica.CountStatsDto.datasetCountStats'];\"\"}}\n" +
    "                    <a ng-if=\"counts.networks && options.obibaListOptions.showNetworkBadge!==false\"\n" +
    "                       href=\"{{'networks' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"studyCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.networks\"></localized-number>\n" +
    "                        {{counts.networks > 1 ? \"networks\" : \"network.label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "                    <a ng-if=\"counts.studies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                       href=\"{{'studies' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"studyCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.studies\"></localized-number>\n" +
    "                        {{counts.studies > 1 ? \"studies\" : \"study.label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "\n" +
    "                    <a ng-if=\"counts.variables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                       href=\"{{'variables' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"variableCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.variables\"></localized-number>\n" +
    "                        {{counts.variables > 1 ? \"variables\" : \"search.variable.facet-label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/list/networks-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/networks-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.network.noResults</p>\n" +
    "        <div ng-if=\"summaries && summaries.length\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "            <div ng-repeat=\"summary in summaries\"\n" +
    "                 ng-init=\"lang = $parent.$parent.lang;\"\n" +
    "                 class=\"row lg-bottom-margin document-item-list flex-row\"\n" +
    "                 test-ref=\"network\">\n" +
    "                <div class=\"col-md-2 hidden-xs hidden-sm text-center\">\n" +
    "                    <img ng-if=\"summary.logo\" ng-src=\"{{summary.logoUrl}}\"\n" +
    "                         class=\"img-responsive\"/>\n" +
    "\n" +
    "                    <h1 ng-if=\"!summary.logo\" src=\"\" alt=\"\"\n" +
    "                        class=\"big-character\">\n" +
    "                        <span class=\"t_badge color_light i-obiba-N\"></span>\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-10  col-sm-12 col-xs-12\">\n" +
    "                    <h4>\n" +
    "                        <a href=\"{{PageUrlService.networkPage(summary.id)}}\">\n" +
    "                            <localized value=\"summary.name\"\n" +
    "                                       lang=\"lang\"></localized>\n" +
    "                        </a>\n" +
    "                    </h4>\n" +
    "                    <p>\n" +
    "                        <localized value=\"summary.description\" lang=\"lang\"\n" +
    "                                   ellipsis-size=\"250\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <a ng-if=\"summary.description\" href=\"{{PageUrlService.networkPage(summary.id)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                    <div class=\"clear-fix\"></div>\n" +
    "                    <div class=\"sm-top-margin countDetail voffset3\">\n" +
    "                        {{counts=summary['obiba.mica.CountStatsDto.networkCountStats'];\"\"}}\n" +
    "                        <a ng-if=\"counts.individualStudies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery:'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,Study))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"individualStudyCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.individualStudies\"></localized-number>\n" +
    "                            {{counts.individualStudies > 1 ?\n" +
    "                            \"global.individual-studies\":\"global.individual-study\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.studiesWithVariables && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"studyWithVariablesCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.studiesWithVariables\"></localized-number>\n" +
    "                            {{counts.studiesWithVariables > 1 ?\n" +
    "                            \"metrics.mica.studies-with-variables\" :\n" +
    "                            \"metrics.mica.study-with-variables\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.studyVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                           href=\"{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"studyVariableCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.studyVariables\"></localized-number>\n" +
    "                            {{counts.studyVariables > 1 ?\n" +
    "                            \"metrics.mica.study-variables\" :\n" +
    "                            \"metrics.mica.study-variable\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.harmonizationStudies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,HarmonizationStudy))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"harmonizationStudyCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.harmonizationStudies\"></localized-number>\n" +
    "                            {{counts.harmonizationStudies > 1 ?\n" +
    "                            \"global.harmonization-studies\" :\n" +
    "                            \"global.harmonization-study\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.dataschemaVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                           href=\"{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Dataschema))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"harmonizationStudyWithVariablesCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.dataschemaVariables\"></localized-number>\n" +
    "                            {{counts.dataschemaVariables > 1 ?\n" +
    "                            \"metrics.mica.harmonization-study-variables\" :\n" +
    "                            \"metrics.mica.harmonization-study-variable\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "                        {{datasetsCount = counts.studyDatasets +\n" +
    "                        counts.harmonizationDatasets; \"\"}}\n" +
    "                        <a ng-if=\"datasetsCount && options.obibaListOptions.showDatasetBadge!==false\"\n" +
    "                           href=\"{{'datasets' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  '))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"datasetCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"datasetsCount\"></localized-number>\n" +
    "                            {{datasetsCount > 1 ? \"datasets\" :\n" +
    "                            \"dataset.details\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/list/studies-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/studies-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.study.noResults</p>\n" +
    "        <div ng-if=\"summaries && summaries.length\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "            <div ng-repeat=\"summary in summaries\"\n" +
    "                 ng-init=\"lang = $parent.$parent.lang; studyPath= summary.studyResourcePath=='individual-study'?'individual-study':'harmonization-study'\"\n" +
    "                 class=\"row lg-bottom-margin document-item-list flex-row\"\n" +
    "                 test-ref=\"study\">\n" +
    "\n" +
    "                <div class=\"col-md-2 hidden-xs hidden-sm text-center\">\n" +
    "\n" +
    "                    <img ng-if=\"summary.logo\" ng-src=\"{{summary.logoUrl}}\"\n" +
    "                         class=\"img-responsive\"/>\n" +
    "\n" +
    "                    <h1 ng-if=\"!summary.logo\" src=\"\" alt=\"\"\n" +
    "                        class=\"big-character\">\n" +
    "                        <span class=\"t_badge color_light i-obiba-S\"></span>\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-10  col-sm-12 col-xs-12\">\n" +
    "                    <h4>\n" +
    "                        <a href=\"{{PageUrlService.studyPage( summary.id, studyPath)}}\">\n" +
    "                            <localized value=\"summary.name\"\n" +
    "                                       lang=\"lang\"></localized>\n" +
    "                        </a>\n" +
    "                    </h4>\n" +
    "                    <p ng-if=\"options.obibaListOptions.studiesTrimmedDescription\">\n" +
    "                        <localized value=\"summary.objectives\" lang=\"lang\"\n" +
    "                                   ellipsis-size=\"250\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <p ng-if=\"!options.obibaListOptions.studiesTrimmedDescription\">\n" +
    "                        <localized value=\"summary.objectives\" lang=\"lang\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <a ng-if=\"summary.objectives\" href=\"{{PageUrlService.studyPage( summary.id, studyPath)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                    <div class=\"clear-fix\"></div>\n" +
    "                    <div ng-if=\"options.obibaListOptions.studiesSupplInfoDetails\" class=\"voffset3\">\n" +
    "                        <blockquote-small\n" +
    "                                ng-if=\"summary.design || summary.targetNumber.noLimit\"\n" +
    "                                class=\"help-block\">\n" +
    "                                <span ng-if=\"summary.design\">\n" +
    "                                {{\"search.study.design\" | translate}} : {{ summary.design === undefined ? '-' : 'study_taxonomy.vocabulary.methods-design.term.' + summary.design + '.title' | translate}}\n" +
    "                                </span> -\n" +
    "                            <span ng-if=\"summary.targetNumber.number\">\n" +
    "                                 {{\"numberOfParticipants.participants\" | translate}} : <localized-number\n" +
    "                                    value=\"summary.targetNumber.number\"></localized-number>\n" +
    "                                </span>\n" +
    "                            <span ng-if=\"summary.targetNumber.noLimit\">\n" +
    "                                    <span ng-if=\"summary.design\">; </span>\n" +
    "                                    {{\"numberOfParticipants.no-limit\" | translate}}\n" +
    "                                </span>\n" +
    "                        </blockquote-small>\n" +
    "                        <div class=\"sm-top-margin\">\n" +
    "                            {{counts=summary['obiba.mica.CountStatsDto.studyCountStats'];\"\"}}\n" +
    "                            <a ng-if=\"counts.networks && options.obibaListOptions.showNetworkBadge!==false\"\n" +
    "                               href=\"{{'networks' | doSearchQuery:'network(in(Mica_network.studyIds,' + summary.id +  '))' }}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"networkCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.networks\"></localized-number>\n" +
    "                                {{counts.networks>1?\"networks\":\"network.label\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            {{datasetsCount=counts.studyDatasets +\n" +
    "                            counts.harmonizationDatasets;\"\"}}\n" +
    "                            <a ng-if=\"datasetsCount && options.obibaListOptions.showDatasetBadge!==false\"\n" +
    "                               href=\"{{'datasets' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + '))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"datasetCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"datasetsCount\"></localized-number>\n" +
    "                                {{datasetsCount>1?\"datasets\":\"dataset.details\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"counts.studyVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                               href=\"{{'variables' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + ')),variable(in(Mica_variable.variableType,Collected))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"studyVariableCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.studyVariables\"></localized-number>\n" +
    "                                {{counts.studyVariables>1?\"client.label.study-variables\":\"client.label.study-variable\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"counts.dataschemaVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                               href=\"{{'variables' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + ')),variable(in(Mica_variable.variableType,Dataschema))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"dataSchemaVariableCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.dataschemaVariables\"></localized-number>\n" +
    "                                {{counts.dataschemaVariables>1?\"client.label.dataschema-variables\":\"client.label.dataschema-variable\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/region-criteria/criterion-dropdown-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/region-criteria/criterion-dropdown-template.html",
    "<div id=\"{{criterion.id.replace('.','-')}}-dropdown-{{timestamp}}\" class=\"{{'btn-group voffset1 btn-' + criterion.target}}\" ng-class='{open: state.open}'\n" +
    "     ng-keyup=\"onKeyup($event)\">\n" +
    "\n" +
    "  <span ng-if=\"VocabularyService.isFacettedVocabulary(criterion.vocabulary)\" ng-class='{open: state.open}'>\n" +
    "  <button class=\"{{'btn btn-xs dropdown btn-' + criterion.target}}\"\n" +
    "          ng-click=\"openDropdown()\">\n" +
    "    <span uib-popover=\"{{localize(criterion.vocabulary.description ? criterion.vocabulary.description : criterion.vocabulary.title)}}\"\n" +
    "          popover-title=\"{{criterion.vocabulary.description ? localize(criterion.vocabulary.title) : null}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\">\n" +
    "    <i class=\"fa fa-info-circle\"> </i>\n" +
    "  </span>\n" +
    "    <span title=\"{{localizeCriterion()}}\" test-ref=\"search-criterion\">\n" +
    "    {{truncate(localizeCriterion())}}\n" +
    "    </span>\n" +
    "    <span class='fa fa-caret-down'></span>\n" +
    "  </button>\n" +
    "  <button class='btn btn-xs btn-default' ng-click='remove(criterion.id)'>\n" +
    "    <span class='fa fa-times'></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <match-criterion ng-if=\"VocabularyService.isMatchVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "                   state=\"state\"></match-criterion>\n" +
    "\n" +
    "  <string-criterion-terms\n" +
    "          ng-if=\"VocabularyService.isTermsVocabulary(criterion.vocabulary) || VocabularyService.isRangeVocabulary(criterion.vocabulary)\"\n" +
    "          criterion=\"criterion\" query=\"query\" state=\"state\"></string-criterion-terms>\n" +
    "\n" +
    "  <numeric-criterion ng-if=\"VocabularyService.isNumericVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "                     state=\"state\"></numeric-criterion>\n" +
    "</span>\n" +
    "</div>");
}]);

angular.module("lists/views/region-criteria/search-criteria-region-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/region-criteria/search-criteria-region-template.html",
    "<div id=\"search-criteria-region\" ng-class=\"options.showSearchBox || options.showSearchBrowser ? 'voffset2' : ''\" class=\"panel panel-default\" ng-if=\"search.criteria.children && search.criteria.children.length>0 && canShowCriteriaRegion()\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table style=\"border:none\">\n" +
    "            <tbody>\n" +
    "            <tr >\n" +
    "                <td style=\"padding-left: 10px\">\n" +
    "                    <div criteria-root item=\"search.criteria\"  on-remove=\"removeCriteriaItem\"\n" +
    "                         on-refresh=\"refreshQuery\" query=\"search.query\" class=\"inline\"></div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/search-result-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/search-result-list-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "\n" +
    "<div ng-show=\"display === 'list'\">\n" +
    "  <!--ToDo using the entity-counts component to diusplay some counts int lists page-->\n" +
    "  <!--<entity-counts taxonomy-type-map=\"targetTypeMap\" result-tabs-order=\"['study', 'variable', 'network']\" target=\"target\" result=\"result\"></entity-counts>-->\n" +
    "  <div class=\"row voffset3\">\n" +
    "    <div class=\"col-md-2\">\n" +
    "      <span ng-show=\"options.obibaListOptions.countCaption\" role=\"presentation\" ng-repeat=\"res in resultTabsOrder\" ng-class=\"{active: activeTarget[targetTypeMap[res]].active && resultTabsOrder.length > 1, disabled: resultTabsOrder.length === 1}\"\n" +
    "        ng-if=\"options[targetTypeMap[res]].showSearchTab\">\n" +
    "        <h4 ng-if=\"resultTabsOrder.length === 1\" class=\"pull-left\">\n" +
    "          {{totalHits = getTotalHits(res);\"\"}} {{singleLabel = \"search.\" + res + \".label\";\"\"}} {{totalHits | localizedNumber }} {{totalHits>1?targetTypeMap[res]:singleLabel\n" +
    "          | translate}}\n" +
    "        </h4>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-10\">\n" +
    "      <div ng-show=\"options.obibaListOptions.searchForm\">\n" +
    "        <list-search-widget type=\"type\"></list-search-widget>\n" +
    "      </div>\n" +
    "      <div class=\"pull-right hoffset1\">\n" +
    "        <div ng-repeat=\"res in resultTabsOrder\" ng-show=\"activeTarget[targetTypeMap[res]].active\" class=\"inline\" test-ref=\"pager\">\n" +
    "          <search-result-pagination\n" +
    "                show-total=\"false\"\n" +
    "                target=\"activeTarget[targetTypeMap[res]].name\"\n" +
    "                on-change=\"onPaginate(target, from, size, replace)\">\n" +
    "          </search-result-pagination>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <span ng-repeat=\"res in resultTabsOrder\" ng-show=\"activeTarget[targetTypeMap[res]].active && activeTarget[targetTypeMap[res]].totalHits > 0 && options.obibaListOptions.searchForm\">\n" +
    "        <list-sort-widget target=\"type\" class=\"pull-right\"></list-sort-widget>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <ng-include include-replace ng-repeat=\"res in resultTabsOrder\" src=\"'search/views/search-result-list-' + res + '-template.html'\"></ng-include>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("lists/views/sort-widget/sort-widget-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/sort-widget/sort-widget-template.html",
    "<div class=\"btn-group dropdown\">\n" +
    "    <button id=\"SortOrder\" type=\"button\" class=\"btn-sm btn btn-primary dropdown-toggle\"\n" +
    "            data-toggle=\"dropdown\">\n" +
    "           {{selected.label | translate}}\n" +
    "        <i ng-if=\"selected.value.startsWith('-') && selected.label !== 'relevance'\"\n" +
    "           class=\"fa fa-long-arrow-down\"></i>\n" +
    "        <i ng-if=\"!selected.value.startsWith('-') && selected.label !== 'relevance'\"\n" +
    "           class=\"fa fa-long-arrow-up\"></i>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu\" role=\"menu\" uib-dropdown-menu aria-labelledby=\"SortOrder\">\n" +
    "        <li ng-repeat=\"option in selectSortOrder.options\" role=\"menuitem\">\n" +
    "            <a ng-click=\"selectSortOrderOption(option)\" href><span translate>{{option.label}}</span>\n" +
    "               <i ng-if=\"option.value.startsWith('-') && option.label !== 'relevance'\"\n" +
    "                  class=\"fa fa-long-arrow-down\"></i>\n" +
    "               <i ng-if=\"!option.value.startsWith('-') && option.label !== 'relevance'\"\n" +
    "                  class=\"fa fa-long-arrow-up\"></i>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("localized/localized-input-group-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-input-group-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "  <div class=\"input-group\">\n" +
    "    <input ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" type=\"text\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" ng-disabled=\"disabled\" form-server-error ng-required=\"required\">\n" +
    "  <span class=\"input-group-btn\" ng-show=\"remove\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"remove(model)\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button>\n" +
    "  </span>\n" +
    "  </div>\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "</div>");
}]);

angular.module("localized/localized-input-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-input-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "  <input ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" type=\"text\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" ng-disabled=\"disabled\" form-server-error ng-required=\"required\">\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "</div>");
}]);

angular.module("localized/localized-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<span ng-bind-html=\"LocalizedValues.for(value,lang,keyLang,keyValue)  | markdown:markdownIt | ellipsis:ellipsisSize\"></span>");
}]);

angular.module("localized/localized-textarea-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-textarea-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "\n" +
    "  <textarea ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" rows=\"{{rows ? rows : 5}}\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" form-server-error ng-disabled=\"disabled\" ng-required=\"required\"></textarea>\n" +
    "\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/components/criteria/criteria-root/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/criteria-root/component.html",
    "<div class=\"form-inline\">\n" +
    "  <div ng-repeat=\"child in item.children | renderableTargets\" class=\"inline\">\n" +
    "    <div class=\"inline hoffset2\" ng-if=\"$index>0\">+</div>\n" +
    "    <criteria-target item=\"child\" query=\"$parent.query\" advanced=\"$parent.advanced\" class=\"inline\"></criteria-target>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/criteria/criteria-target/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/criteria-target/component.html",
    "<div>\n" +
    "  <div class=\"hidden-xs form-group\" title=\"{{'search.' + item.target + '-where' | translate}}\">\n" +
    "    <i class=\"{{'i-obiba-x-large i-obiba-' + item.target + ' color-' + item.target}}\">&nbsp;</i>\n" +
    "  </div>\n" +
    "  <criteria-node ng-repeat=\"child in item.children\" item=\"child\" query=\"$parent.query\" advanced=\"$parent.advanced\"></criteria-node>\n" +
    "</div>");
}]);

angular.module("search/components/criteria/item-region/dropdown/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/dropdown/component.html",
    "<div id=\"{{criterion.id.replace('.','-')}}-dropdown-{{timestamp}}\" class=\"{{'btn-group voffset1 btn-' + criterion.target}}\"\n" +
    "  ng-class='{open: state.open}' ng-keyup=\"onKeyup($event)\">\n" +
    "\n" +
    "  <button class=\"{{'btn btn-xs dropdown btn-' + criterion.target}}\" ng-click=\"openDropdown()\">\n" +
    "    <span uib-popover=\"{{localize(criterion.vocabulary.description ? criterion.vocabulary.description : criterion.vocabulary.title)}}\"\n" +
    "      popover-title=\"{{criterion.vocabulary.description ? localize(criterion.vocabulary.title) : null}}\" popover-placement=\"bottom\"\n" +
    "      popover-trigger=\"'mouseenter'\">\n" +
    "      <i class=\"fa fa-info-circle\"> </i>\n" +
    "    </span>\n" +
    "    <span title=\"{{localizeCriterion()}}\" test-ref=\"search-criterion\">\n" +
    "      {{truncate(localizeCriterion())}}\n" +
    "    </span>\n" +
    "    <span class='fa fa-caret-down'></span>\n" +
    "  </button>\n" +
    "  <button class='btn btn-xs btn-default' ng-click='remove(criterion.id)'>\n" +
    "    <span class='fa fa-times'></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <match-criterion ng-if=\"VocabularyService.isMatchVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\" state=\"state\"></match-criterion>\n" +
    "\n" +
    "  <string-criterion-terms ng-if=\"VocabularyService.isTermsVocabulary(criterion.vocabulary) || VocabularyService.isRangeVocabulary(criterion.vocabulary)\"\n" +
    "    criterion=\"criterion\" query=\"query\" state=\"state\"></string-criterion-terms>\n" +
    "\n" +
    "  <numeric-criterion ng-if=\"VocabularyService.isNumericVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "    state=\"state\"></numeric-criterion>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/components/criteria/item-region/item-node/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/item-node/component.html",
    "<span>\n" +
    "  <span ng-if=\"item.children.length > 0\">\n" +
    "    <criteria-leaf item=\"item.children[0]\" parent-type=\"$parent.item.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "\n" +
    "    <div class=\"btn-group voffset1\" ng-show=\"$parent.advanced\" uib-dropdown>\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-xs\" uib-dropdown-toggle>\n" +
    "        {{item.type | translate}}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul uib-dropdown-menu role=\"menu\">\n" +
    "        <li role=\"menuitem\">\n" +
    "          <a href ng-click=\"updateLogical('or')\" translate>or</a>\n" +
    "        </li>\n" +
    "        <li role=\"menuitem\">\n" +
    "          <a href ng-click=\"updateLogical('and')\" translate>and</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <criteria-leaf item=\"item.children[1]\" parent-type=\"$parent.item.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "\n" +
    "  </span>\n" +
    "  <span ng-if=\"item.children.length === 0\">\n" +
    "    <criteria-leaf item=\"item\" parent-type=\"item.parent.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "  </span>\n" +
    "</span>");
}]);

angular.module("search/components/criteria/item-region/match/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/match/component.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "  <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "  <li class=\"criteria-list-item\">\n" +
    "    <form novalidate>\n" +
    "      <div>\n" +
    "        <input class=\"form-control\" id=\"{{criterion.vocabulary.name}}-match\" ng-model=\"match\" ng-change=\"update()\" placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/components/criteria/item-region/numeric/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/numeric/component.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "  <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "  <li class=\"btn-group\">\n" +
    "    <ul class=\"criteria-list-item\">\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.any-help' | translate}}\">\n" +
    "          <input ng-click=\"updateSelection()\" type=\"radio\" ng-model=\"selectMissing\" ng-value=\"false\"> {{'search.any' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.none-help' | translate}}\">\n" +
    "          <input ng-click=\"updateSelection()\" type=\"radio\" ng-model=\"selectMissing\" ng-value=\"true\"> {{'search.none' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  <li ng-show=\"!selectMissing\" class='divider'></li>\n" +
    "  <li ng-show=\"!selectMissing\" class=\"btn-group criteria-list-item\">\n" +
    "    <form novalidate>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"{{criterion.vocabulary.name}}-from\" translate>from</label>\n" +
    "        <input type=\"number\" class=\"form-control\" id=\"{{criterion.vocabulary.name}}-from\" placeholder=\"{{min}}\" ng-model=\"from\" style=\"width:150px\">\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"{{criterion.vocabulary.name}}-to\" translate>to</label>\n" +
    "        <input type=\"number\" class=\"form-control\" id=\"{{criterion.vocabulary.name}}-to\" placeholder=\"{{max}}\" ng-model=\"to\" style=\"width:150px\">\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/components/criteria/item-region/region/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/region/component.html",
    "<div id=\"search-criteria-region\" ng-class=\"options.showSearchBox || options.showSearchBrowser ? 'voffset2' : ''\" class=\"panel panel-default\"\n" +
    "  ng-if=\"renderableTargets && renderableTargets.length > 0\">\n" +
    "  <div class=\"panel-body\">\n" +
    "    <table style=\"border:none\">\n" +
    "      <tbody>\n" +
    "        <tr>\n" +
    "          <td>\n" +
    "            <a href class=\"btn btn-sm btn-default\" ng-click=\"clearSearchQuery()\" translate>clear</a>\n" +
    "          </td>\n" +
    "          <td style=\"padding-left: 10px\">\n" +
    "            <div criteria-root item=\"search.criteria\" query=\"search.query\" advanced=\"search.advanced\" on-remove=\"removeCriteriaItem\"\n" +
    "              on-refresh=\"refreshQuery\" class=\"inline\"></div>\n" +
    "\n" +
    "            <small class=\"hoffset2\" ng-if=\"showAdvanced()\">\n" +
    "              <a href ng-click=\"toggleSearchQuery()\" title=\"{{search.advanced ? 'search.basic-help' : 'search.advanced-help' | translate}}\"\n" +
    "                translate>\n" +
    "                {{search.advanced ? 'search.basic' : 'search.advanced' | translate}}\n" +
    "              </a>\n" +
    "            </small>\n" +
    "\n" +
    "            <div class=\"btn-group voffset1 hoffset2\" uib-dropdown auto-close=\"outsideClick\" is-open=\"status.isopen\">\n" +
    "              <button id=\"single-button\" type=\"button\" class=\"btn btn-xs btn-success\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                Copy query\n" +
    "                <span class=\"caret\"></span>\n" +
    "              </button>\n" +
    "              <ul class=\"dropdown-menu query-dropdown-menu criteria-list-item\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "                <li role=\"menuitem\">\n" +
    "                  <div class=\"form-group\">\n" +
    "                    <label class=\"control-label\" translate>search.query</label>\n" +
    "                    <div class=\"input-group\">\n" +
    "                      <input id=\"copyQuery\" type=\"text\" class=\"form-control\" value=\"{{$parent.query}}\" tooltip-is-open=\"$parent.showCopiedQueryTooltipStatus\"\n" +
    "                        uib-tooltip=\"{{'global.copied' | translate}}\" tooltip-trigger=\"'none'\" />\n" +
    "                      <span class=\"input-group-btn\">\n" +
    "                        <button class=\"btn\" ng-click=\"$parent.showCopiedQueryTooltip()\" ngclipboard data-clipboard-target=\"#copyQuery\" uib-tooltip=\"{{'global.copy-to-clipboard' | translate}}\">\n" +
    "                          <span class=\"fa fa-copy\" alt=\"Copy to clipboard\" />\n" +
    "                        </button>\n" +
    "                      </span>\n" +
    "                    </div>\n" +
    "                    <small>\n" +
    "                      <span class=\"help-block\" translate>search.query-copy-help</span>\n" +
    "                    </small>\n" +
    "                  </div>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/criteria/item-region/string-terms/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/item-region/string-terms/component.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "    <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "    <li class=\"btn-group\">\n" +
    "      <ul class=\"criteria-list-item\">\n" +
    "        <li>\n" +
    "          <label title=\"{{'search.any-help' | translate}}\">\n" +
    "            <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.EXISTS}}\">\n" +
    "            {{'search.any' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <label title=\"{{'search.none-help' | translate}}\">\n" +
    "            <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.MISSING}}\">\n" +
    "            {{'search.none' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <label title=\"{{'search.in-help' | translate}}\">\n" +
    "            <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.IN}}\">\n" +
    "            {{'search.in' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <label title=\"{{'search.out-help' | translate}}\">\n" +
    "            <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.OUT}}\">\n" +
    "            {{'search.out' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li ng-show=\"criterion.vocabulary.repeatable\">\n" +
    "          <label title=\"{{'search.contains-help' | translate}}\">\n" +
    "            <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.CONTAINS}}\">\n" +
    "            {{'search.contains' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </li>\n" +
    "    <li ng-show=\"isInOutFilter() || isContainsFilter()\" class='divider'></li>\n" +
    "    <li class=\"criteria-list-item\" ng-show=\"state.loading\">\n" +
    "      <p class=\"voffset2 loading\">\n" +
    "      </p>\n" +
    "    </li>\n" +
    "    <li ng-show=\"isInOutFilter() || isContainsFilter()\">\n" +
    "      <ul ng-show=\"!state.loading\" class=\"no-padding criteria-list-terms\">\n" +
    "        <li class=\"criteria-list-item\" ng-show=\"terms && terms.length>10\">\n" +
    "          <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "            <input ng-model=\"searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"term-search\">\n" +
    "            <span class=\"input-group-addon\" id=\"term-search\"><i class=\"fa fa-search\"></i></span>\n" +
    "          </span>\n" +
    "        </li>\n" +
    "        <li ng-show=\"terms && terms.length>10\"></li>\n" +
    "        <li class=\"criteria-list-item\"\n" +
    "          ng-show=\"isInOutFilter() || isContainsFilter()\"\n" +
    "          ng-repeat=\"term in terms | regex:searchText:['key','title','description']\"\n" +
    "          uib-popover=\"{{term.description ? term.description : (truncate(term.title) === term.title ? null : term.title)}}\"\n" +
    "          popover-title=\"{{term.description ? term.title : null}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\">\n" +
    "            <span>\n" +
    "              <label class=\"control-label\">\n" +
    "                <input ng-model=\"checkboxTerms[term.key]\"\n" +
    "                  type=\"checkbox\"\n" +
    "                  ng-click=\"updateSelection()\">\n" +
    "                <span>{{truncate(term.title ? term.title : term.key)}}</span>\n" +
    "              </label>\n" +
    "            </span>\n" +
    "            <span class=\"pull-right\">\n" +
    "              <span class=\"agg-term-count\" ng-show=\"isSelectedTerm(term)\">{{term.count}}</span>\n" +
    "              <span class=\"agg-term-count-default\" ng-show=\"!isSelectedTerm(term)\">{{term.count}}</span>\n" +
    "            </span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </li>\n" +
    "  </ul>");
}]);

angular.module("search/components/criteria/match-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/match-vocabulary-filter-detail/component.html",
    "<input type=\"text\" class=\"form-control\"\n" +
    "       placeholder=\"{{'search.match.placeholder' | translate}}\"\n" +
    "       ng-model=\"$ctrl.vocabulary.matchString\"\n" +
    "       ng-keyup=\"$ctrl.enterText($event)\">");
}]);

angular.module("search/components/criteria/numeric-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/numeric-vocabulary-filter-detail/component.html",
    "<form ng-submit=\"$ctrl.setRangeValue($event)\">\n" +
    "  <label>{{'global.from' | translate}}\n" +
    "    <input type=\"number\"\n" +
    "           ng-model=\"$ctrl.vocabulary.rangeTerms.from\">\n" +
    "  </label>\n" +
    "\n" +
    "  <label> {{'global.to' | translate}}\n" +
    "    <input type=\"number\"\n" +
    "           ng-model=\"$ctrl.vocabulary.rangeTerms.to\">\n" +
    "  </label>\n" +
    "  <button type=\"submit\" class=\"btn btn-default btn-xs\"><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "</form>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/criteria/terms-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/terms-vocabulary-filter-detail/component.html",
    "<div ng-class=\"{'row': ($index + 1) % 4 === 0}\"\n" +
    "     ng-repeat=\"term in $ctrl.vocabulary.filteredTerms | sortTerms:$ctrl.vocabulary | limitTo:$ctrl.limitNumber\">\n" +
    "  <div class=\"col-xs-3 col-md-3\">\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label uib-popover=\"{{term.description ? term.description : term.title | localizedString}}\"\n" +
    "             popover-title=\"{{term.description ? term.title : null | localizedString}}\"\n" +
    "             popover-placement=\"bottom\"\n" +
    "             popover-trigger=\"'mouseenter'\"\n" +
    "             popover-popup-delay=\"250\"\n" +
    "             popover-class=\"right-panel-popover\"\n" +
    "             for=\"term-{{$ctrl.vocabulary.name + '-' + $index + '-' + term.name}}\"\n" +
    "             class=\"word-break\">\n" +
    "        <input id=\"term-{{$ctrl.vocabulary.name + '-' + $index + '-' + term.name}}\"\n" +
    "               type=\"checkbox\"\n" +
    "               ng-model=\"term.selected\"\n" +
    "               ng-click=\"$ctrl.clickCheckbox(term)\"> {{term.title | localizedString}}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<span class=\"clearfix\"></span>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-12\">\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "      <button type=\"button\" ng-if=\"$ctrl.limitNumber > $ctrl.constantLimitNumber\"\n" +
    "              class=\"btn btn-xs btn-primary\"\n" +
    "              ng-click=\"$ctrl.limitNumber = $ctrl.constantLimitNumber\">\n" +
    "        {{'search.facet.less' | translate}}\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-if=\"$ctrl.vocabulary.filteredTerms.length > $ctrl.limitNumber\"\n" +
    "              class=\"btn btn-xs btn-primary\"\n" +
    "              ng-click=\"$ctrl.limitNumber = $ctrl.vocabulary.filteredTerms.length\">\n" +
    "        {{'search.facet.more' | translate}}\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/entity-counts/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/entity-counts/component.html",
    "<ul class=\"list-no-style list-inline\">\n" +
    "  <li ng-repeat=\"entity in $ctrl.resultTabsOrder\">\n" +
    "    <a href ng-click=\"$ctrl.selectType(entity)\"\n" +
    "        class=\"btn btn-xs\"\n" +
    "        ng-class=\"{'btn-default': (entity !== $ctrl.target), 'btn-primary': (entity === $ctrl.target)}\">\n" +
    "        {{$ctrl.taxonomyTypeMap[entity] | translate}} <span>{{$ctrl.getTotalHits(entity) | localizedNumber}}</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/components/entity-search-typeahead/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/entity-search-typeahead/component.html",
    "<div class=\"input-group\">\n" +
    "  <div class=\"form-group has-feedback \">\n" +
    "    <input type=\"search\"\n" +
    "           ng-model=\"$ctrl.model\"\n" +
    "           ng-attr-placeholder=\"{{$ctrl.placeholderText | translate}}\"\n" +
    "           uib-typeahead=\"suggestion for suggestion in $ctrl.suggest($viewValue)\"\n" +
    "           typeahead-focus-first=\"false\"\n" +
    "           typeahead-on-select=\"$ctrl.select($item)\"\n" +
    "           ng-keyup=\"$ctrl.onKeyUp($event)\"\n" +
    "           class=\"form-control\">\n" +
    "    <span ng-if=\"$ctrl.model\"\n" +
    "          ng-click=\"$ctrl.clear()\"\n" +
    "          class=\"form-control-feedback form-control-clear width-initial height-initial padding-right-10\">\n" +
    "        <i class=\"fa fa-times\"></i>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <span ng-show=\"$ctrl.showButton\" class=\"input-group-btn\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"$ctrl.select($ctrl.model)\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "</div>");
}]);

angular.module("search/components/facets/taxonomy/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/facets/taxonomy/component.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "  <ul class=\"nav nav-tabs\" role=\"tablist\" ng-if=\"targets.length > 1\">\n" +
    "      <li ng-repeat=\"tab in targets\" role=\"presentation\" ng-class=\"{ active: tab === target }\">\n" +
    "        <a href role=\"tab\" ng-click=\"setTarget(tab)\">{{'search.' + tab + '.facet-label' | translate}}</a></li>\n" +
    "    </ul>\n" +
    "    \n" +
    "    <uib-accordion close-others=\"false\">\n" +
    "        <div uib-accordion-group ng-repeat=\"taxonomy in taxonomies[target]\" is-open=\"taxonomy.isOpen\" is-disabled=\"false\" template-url=\"search/views/classifications/taxonomy-accordion-group.html\">\n" +
    "          <uib-accordion-heading>\n" +
    "              <i class=\"fa\" ng-class=\"{'fa-chevron-down': taxonomy.isOpen, 'fa-chevron-right': !taxonomy.isOpen}\"></i>\n" +
    "              <span uib-popover=\"{{localize(taxonomy.description ? taxonomy.description : taxonomy.title)}}\"\n" +
    "                    popover-title=\"{{taxonomy.description ? localize(taxonomy.title) : null}}\"\n" +
    "                    popover-placement=\"bottom\"\n" +
    "                    popover-trigger=\"'mouseenter'\"\n" +
    "                    popover-popup-delay=\"1000\">\n" +
    "                {{localize(taxonomy.title)}}\n" +
    "              </span>\n" +
    "          </uib-accordion-heading>\n" +
    "          <uib-accordion close-others=\"false\">\n" +
    "            <div uib-accordion-group ng-repeat=\"vocabulary in taxonomy.vocabularies\" is-open=\"vocabulary.isOpen\" is-disabled=\"false\" template-url=\"search/views/classifications/vocabulary-accordion-group.html\">\n" +
    "              <uib-accordion-heading>\n" +
    "                <span uib-popover=\"{{localize(vocabulary.description ? vocabulary.description : vocabulary.title)}}\"\n" +
    "                      popover-title=\"{{vocabulary.description ? localize(vocabulary.title) : null}}\"\n" +
    "                      popover-placement=\"bottom\"\n" +
    "                      popover-trigger=\"'mouseenter'\"\n" +
    "                      popover-popup-delay=\"1000\"\n" +
    "                      ng-click=\"loadVocabulary(taxonomy, vocabulary)\">\n" +
    "                  <i class=\"fa\" ng-class=\"{'fa-caret-down': vocabulary.isOpen, 'fa-caret-right': !vocabulary.isOpen}\"></i>\n" +
    "                  <span>\n" +
    "                    {{localize(vocabulary.title)}}\n" +
    "                  </span>\n" +
    "                  <span ng-if=\"!vocabulary.title\">\n" +
    "                    {{vocabulary.name}}\n" +
    "                  </span>\n" +
    "                </span>\n" +
    "              </uib-accordion-heading>\n" +
    "              <div>\n" +
    "                <div ng-if=\"vocabulary.isMatch\" ng-controller=\"MatchVocabularyFacetController\" class=\"form-group\">\n" +
    "                  <form novalidate class=\"form-inline\" ng-keypress=\"onKeypress($event)\">\n" +
    "                    <div class=\"form-group form-group-sm\">\n" +
    "                      <input type=\"text\" class=\"form-control\" ng-model=\"text\" placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "                      <button class=\"btn btn-sm btn-default\" ng-click=\"onKeypress($event)\" ><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "                    </div>\n" +
    "                  </form>\n" +
    "                </div>\n" +
    "                <div ng-if=\"vocabulary.isNumeric\" ng-controller=\"NumericVocabularyFacetController\" class=\"form-group\">\n" +
    "                  <form novalidate class=\"form-inline\"  ng-keypress=\"onKeypress($event)\">\n" +
    "                    <div class=\"form-group form-group-sm\">\n" +
    "                      <label for=\"nav-{{vocabulary.name}}-from\" translate>global.from</label>\n" +
    "                      <input type=\"number\" class=\"form-control\" id=\"nav-{{vocabulary.name}}-from\" ng-model=\"from\" placeholder=\"{{min}}\" style=\"width:75px;\">\n" +
    "                      <label for=\"nav-{{vocabulary.name}}-to\" translate>global.to</label>\n" +
    "                      <input type=\"number\" class=\"form-control\" id=\"nav-{{vocabulary.name}}-to\" ng-model=\"to\" placeholder=\"{{max}}\" style=\"width:75px;\">\n" +
    "                      <button class=\"btn btn-sm btn-default\" ng-click=\"onKeypress($event)\" ><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "                    </div>\n" +
    "                  </form>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!vocabulary.isNumeric && !vocabulary.isMatch\" ng-controller=\"TermsVocabularyFacetController\">\n" +
    "                  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "                  <ul class=\"nav nav-pills nav-stacked\" ng-if=\"vocabulary.visibleTerms > 0\">\n" +
    "                    <li ng-repeat=\"term in vocabulary.terms | orderBy:['-selected', '-count', '+name']  | limitTo:vocabulary.limit:begin\"\n" +
    "                        class=\"checkbox\" ng-class=\"{active: term.name === term.name}\" ng-if=\"term.isVisible\">\n" +
    "                      <label style=\"max-width: 80%;\">\n" +
    "                        <input type=\"checkbox\" ng-model=\"term.selected\" ng-change=\"selectTerm(target, taxonomy, vocabulary, {term: term})\">\n" +
    "                        <span uib-popover=\"{{localize(term.description ? term.description : term.title)}}\"\n" +
    "                              popover-title=\"{{term.description ? localize(term.title) : null}}\"\n" +
    "                              popover-placement=\"bottom\"\n" +
    "                              popover-trigger=\"'mouseenter'\"\n" +
    "                              popover-popup-delay=\"1000\">\n" +
    "                          <span>\n" +
    "                            {{localize(term.title)}}\n" +
    "                          </span>\n" +
    "                          <span ng-if=\"!term.title\">\n" +
    "                            {{term.name}}\n" +
    "                          </span>\n" +
    "                        </span>\n" +
    "                      </label>\n" +
    "                        <span class=\"pull-right\" ng-class=\"{'text-muted': !term.selected}\">\n" +
    "                          {{term.count}}\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                  <span ng-if=\"vocabulary.visibleTerms === 0\">\n" +
    "                    <em translate>search.facet.no-data</em>\n" +
    "                  </span>\n" +
    "                  <div ng-if=\"!vocabulary.isNumeric && !vocabulary.isMatch && vocabulary.visibleTerms > 10\" class=\"voffset1 pull-right form-group\">\n" +
    "                    <button class=\"btn btn-xs btn-primary\" ng-if=\"vocabulary.limit\" ng-click=\"vocabulary.limit = undefined\" translate>search.facet.more</button>\n" +
    "                    <button class=\"btn btn-xs btn-default\" ng-if=\"!vocabulary.limit\" ng-click=\"vocabulary.limit = 10\" translate>search.facet.less</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div >\n" +
    "          </uib-accordion>\n" +
    "        </div>\n" +
    "    </uib-accordion>\n" +
    "    ");
}]);

angular.module("search/components/input-search-filter/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/input-search-filter/component.html",
    "<div class=\" pull-right\">\n" +
    "    <div class=\"input-group has-feedback\">\n" +
    "       <span class=\"input-group-addon\">\n" +
    "           <i class=\"fa fa-filter\"></i>\n" +
    "       </span>\n" +
    "        <input type=\"text\" ng-model=\"$ctrl.queryString\"  ng-attr-placeholder=\"{{'search.placeholder.vocabulary-filter'  | translate}}\"\n" +
    "               class=\"input-search-filter form-control\" ng-change=\"$ctrl.change()\">\n" +
    "        <span ng-if=\"$ctrl.queryString\"\n" +
    "              ng-click=\"$ctrl.clear()\"\n" +
    "              class=\"form-control-feedback form-control-clear width-initial height-initial padding-right-5 \">\n" +
    "          <i class=\"fa fa-times\"></i>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html",
    "<div uib-accordion-group class=\"panel-default\" is-open=\"$ctrl.status.isFirstOpen\">\n" +
    "  <div uib-accordion-heading >\n" +
    "    <span>\n" +
    "      <i class=\"fa\" ng-class=\"{'fa-caret-down': $ctrl.status.isFirstOpen, 'fa-caret-right':!$ctrl.status.isFirstOpen}\"></i>\n" +
    "    </span>\n" +
    "    {{$ctrl.metaTaxonomy.title | localizedString}}\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"nav nav-pills nav-stacked\">\n" +
    "    <li role=\"presentation\" ng-repeat=\"taxonomy in $ctrl.metaTaxonomy.taxonomies\" ng-class=\"{'active': taxonomy.state.isActive() && $ctrl.showTaxonomyPanel}\">\n" +
    "      <a href ng-click=\"$ctrl.selectTaxonomy(taxonomy)\">\n" +
    "        <span\n" +
    "          uib-popover=\"{{taxonomy.info.description | localizedString}}\"\n" +
    "          popover-title=\"{{taxonomy.info.trKey ? (taxonomy.info.trKey | translate) : (taxonomy.info.title | localizedString)}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\"\n" +
    "          popover-popup-delay=\"250\">\n" +
    "          {{taxonomy.info.trKey ? (taxonomy.info.trKey | translate) : (taxonomy.info.title | localizedString)}}\n" +
    "        </span>\n" +
    "        <span ng-if=\"taxonomy.state.isLoading()\" class=\"loading\"></span>\n" +
    "        <span class=\"pull-right\"><i class=\"fa fa-chevron-right\"></i></span>\n" +
    "      </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html",
    "<div ng-class=\"{'overlay-front-on-box-shodow' : $ctrl.showTaxonomyPanel}\">\n" +
    "  <uib-accordion close-others=\"false\" is-disabled=\"false\">\n" +
    "    <meta-taxonomy-filter-list ng-repeat=\"metaTaxonomy in $ctrl.metaTaxonomies\"\n" +
    "                               meta-taxonomy=\"metaTaxonomy\"\n" +
    "                               show-taxonomy-panel=\"$ctrl.showTaxonomyPanel\"\n" +
    "                               rql-query=\"$ctrl.rqlQuery\"\n" +
    "                               on-select-taxonomy=\"$ctrl.onSelectTaxonomy(target, taxonomy)\">\n" +
    "    </meta-taxonomy-filter-list>\n" +
    "  </uib-accordion>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/components/panel/classification/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/classification/component.html",
    "<div ng-show=\"!inSearchMode()\" class=\"voffset2\">\n" +
    "    <div>\n" +
    "      <ol class=\"breadcrumb\">\n" +
    "        <li ng-if=\"!taxonomies.taxonomy\">\n" +
    "          {{'all-' + taxonomies.target + '-classifications' | translate}}\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.taxonomy\">\n" +
    "          <a href ng-click=\"navigateTaxonomy()\">{{'all-' + taxonomies.target + '-classifications' |\n" +
    "            translate}}</a>\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.taxonomy\">\n" +
    "          <span ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"!taxonomies.vocabulary && label.locale === lang\">\n" +
    "            {{label.text}}\n" +
    "          </span>\n" +
    "          <a href ng-click=\"navigateTaxonomy(taxonomies.taxonomy)\" ng-if=\"taxonomies.vocabulary\">\n" +
    "            <span ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"label.locale === lang\">\n" +
    "              {{label.text}}\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.vocabulary\">\n" +
    "          <span ng-repeat=\"label in taxonomies.vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "            {{label.text}}\n" +
    "          </span>\n" +
    "        </li>\n" +
    "        <a ng-if=\"options.showSearchRefreshButton\" title=\"{{'search.refresh-taxonomies' | translate}}\"\n" +
    "           href class=\"hoffset1\" ng-click=\"refreshTaxonomyCache()\">\n" +
    "          <span class=\"fa fa-refresh\"></span>\n" +
    "        </a>\n" +
    "      </ol>\n" +
    "  \n" +
    "    </div>\n" +
    "  \n" +
    "    <div ng-if=\"taxonomies.search.active\" class=\"loading\"></div>\n" +
    "  \n" +
    "    <div ng-if=\"!taxonomies.search.active\">\n" +
    "      <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "        <div ng-repeat=\"group in taxonomyGroups\">\n" +
    "          <h3 ng-if=\"group.title\">{{group.title}}</h3>\n" +
    "          <p class=\"help-block\" ng-if=\"group.description\">{{group.description}}</p>\n" +
    "          <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "            <div ng-repeat=\"taxonomy in group.taxonomies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"></div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 1]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"></div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 2]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && !taxonomies.vocabulary\">\n" +
    "        <h3 ng-repeat=\"label in taxonomies.taxonomy.title\"\n" +
    "            ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h3>\n" +
    "  \n" +
    "        <p class=\"help-block\" ng-repeat=\"label in taxonomies.taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </p>\n" +
    "  \n" +
    "        <div ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 1]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 2]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && !taxonomies.term\">\n" +
    "        <h3 ng-repeat=\"label in taxonomies.vocabulary.title\"\n" +
    "            ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h3>\n" +
    "  \n" +
    "        <p class=\"help-block\" ng-repeat=\"label in taxonomies.vocabulary.description\"\n" +
    "           ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </p>\n" +
    "  \n" +
    "        <div ng-repeat=\"term in taxonomies.vocabulary.terms\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 1]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 2]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && taxonomies.term\">\n" +
    "        <h5 ng-repeat=\"label in taxonomies.term.title\" ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h5>\n" +
    "        <p ng-repeat=\"label in taxonomies.term.description\" ng-if=\"label.locale === lang\">\n" +
    "          <span class=\"help-block\" ng-bind-html=\"label.text | dceDescription\" ng-if=\"taxonomies.vocabulary.name === 'dceId'\"></span>\n" +
    "          <span class=\"help-block\" ng-bind-html=\"label.text\" ng-if=\"taxonomies.vocabulary.name !== 'dceId'\"></span>\n" +
    "        </p>\n" +
    "        <div>\n" +
    "          <a href class=\"btn btn-default btn-xs\"\n" +
    "             ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {term: taxonomies.term})\">\n" +
    "            <i class=\"fa fa-plus-circle\"></i>\n" +
    "            <span translate>add-query</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  \n" +
    "  </div>\n" +
    "  ");
}]);

angular.module("search/components/panel/taxonomies-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/taxonomies-panel/component.html",
    "<div class=\"collapse\">\n" +
    "  <div class=\"voffset2\">\n" +
    "    <div class=\"search-browser panel panel-default\">\n" +
    "      <div class=\"panel-heading no-padding-top no-padding-bottom\">\n" +
    "        <div class=\"row no-padding\">\n" +
    "          <div class=\"col-md-8\">\n" +
    "            <ol class=\"breadcrumb no-margin no-padding pull-left\">\n" +
    "              <li ng-if=\"taxonomies.taxonomy\">\n" +
    "                <h4 ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"label.locale === lang\" class=\"pull-left\">\n" +
    "                  <strong>{{label.text}}</strong>\n" +
    "                </h4>\n" +
    "                <a ng-if=\"options.showSearchRefreshButton\" title=\"{{'search.refresh-taxonomies' | translate}}\" href class=\"hoffset1 voffset2 pull-right\"\n" +
    "                  ng-click=\"refreshTaxonomyCache(target, taxonomies.taxonomy.name)\">\n" +
    "                  <span class=\"fa fa-refresh\"></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ol>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <h4 ng-click=\"closeTaxonomies()\" title=\"{{'close' | translate}}\" class=\"pull-right\" style=\"cursor: pointer\">\n" +
    "              <i class=\"fa fa-close\"></i>\n" +
    "            </h4>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"panel-body\">\n" +
    "        <div ng-if=\"taxonomies.search.active\" class=\"loading\"></div>\n" +
    "\n" +
    "        <div ng-if=\"!taxonomies.search.active\">\n" +
    "          <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "            <div ng-repeat=\"group in taxonomyGroups\">\n" +
    "              <h4 ng-if=\"group.title\">{{group.title}}</h4>\n" +
    "              <p class=\"help-block\" ng-if=\"group.description\">{{group.description}}</p>\n" +
    "              <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "                <div ng-repeat=\"taxonomy in group.taxonomies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index]\" lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 1]\" lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 2]\" lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"taxonomies.taxonomy\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.taxonomy\">\n" +
    "                <p class=\"help-block\" ng-repeat=\"label in taxonomies.taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "                  {{label.text}}\n" +
    "                </p>\n" +
    "                <ul class=\"nav nav-pills nav-stacked\" ng-if=\"taxonomies.taxonomy.vocabularies\">\n" +
    "                  <li ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies | visibleVocabularies | filter:canNavigate \" class=\"{{taxonomies.vocabulary.name === vocabulary.name ? 'active' : ''}}\">\n" +
    "                    <a class=\"clearfix\" id=\"search-navigate-taxonomy\" href ng-click=\"navigateTaxonomy(taxonomies.taxonomy, vocabulary)\">\n" +
    "                      <i class=\"pull-right {{taxonomies.vocabulary.name !== vocabulary.name ? 'hidden' : ''}} hidden-sm hidden-xs fa fa-chevron-circle-right\"></i>\n" +
    "                      <span ng-repeat=\"label in vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "                        {{label.text}}\n" +
    "                      </span>\n" +
    "                      <span ng-if=\"!vocabulary.title\">\n" +
    "                        {{vocabulary.name}}\n" +
    "                      </span>\n" +
    "\n" +
    "\n" +
    "                    </a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.vocabulary\">\n" +
    "                <div ng-if=\"taxonomies.vocabulary\">\n" +
    "                  <h5 ng-repeat=\"label in taxonomies.vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </h5>\n" +
    "                  <div class=\"form-group\" ng-if=\"!taxonomies.isNumericVocabulary && !taxonomies.isMatchVocabulary\">\n" +
    "                    <a href class=\"btn btn-default btn-xs\" ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary)\">\n" +
    "                      <i class=\"fa fa-plus-circle\"></i>\n" +
    "                      <span translate>add-query</span>\n" +
    "                    </a>\n" +
    "                  </div>\n" +
    "                  <p class=\"help-block\" ng-repeat=\"label in taxonomies.vocabulary.description\" ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </p>\n" +
    "                  <div ng-if=\"taxonomies.isMatchVocabulary\" ng-controller=\"MatchVocabularyPanelController\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <a href class=\"btn btn-default btn-xs\" ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {text: text})\">\n" +
    "                        <i class=\"fa fa-plus-circle\"></i>\n" +
    "                        <span translate>add-query</span>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                    <form novalidate class=\"form-inline\" ui-keypress=\"{13: 'selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {text: text})'}\">\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"text\" placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "                      </div>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <div ng-if=\"taxonomies.isNumericVocabulary\" ng-controller=\"NumericVocabularyPanelController\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <a href class=\"btn btn-default btn-xs\" ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {from: from, to: to})\">\n" +
    "                        <i class=\"fa fa-plus-circle\"></i>\n" +
    "                        <span translate>add-query</span>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                    <form novalidate class=\"form-inline\" ui-keypress=\"{13:'selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {from: from, to: to})'}\">\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"nav-{{taxonomies.vocabulary.name}}-from\" translate>from</label>\n" +
    "                        <input type=\"number\" class=\"form-control\" id=\"nav-{{taxonomies.vocabulary.name}}-from\" ng-model=\"from\" style=\"width:150px\">\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"nav-{{taxonomies.vocabulary.name}}-to\" translate>to</label>\n" +
    "                        <input type=\"number\" class=\"form-control\" id=\"nav-{{taxonomies.vocabulary.name}}-to\" ng-model=\"to\" style=\"width:150px\">\n" +
    "                      </div>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <ul class=\"nav nav-pills nav-stacked\" ng-if=\"taxonomies.vocabulary.terms\">\n" +
    "                    <li ng-repeat=\"term in taxonomies.vocabulary.terms\" class=\"{{taxonomies.term.name === term.name ? 'active' : ''}}\">\n" +
    "                      <a class=\"clearfix\" id=\"search-navigate-vocabulary\" href ng-click=\"navigateTaxonomy(taxonomies.taxonomy, taxonomies.vocabulary, term)\">\n" +
    "                        <i class=\"pull-right {{taxonomies.term.name !== term.name ? 'hidden' : ''}} hidden-sm hidden-xs fa fa-chevron-circle-right\"></i>\n" +
    "                        <span ng-repeat=\"label in term.title\" ng-if=\"label.locale === lang\">\n" +
    "                          {{label.text}}\n" +
    "                        </span>\n" +
    "                        <span ng-if=\"!term.title\">\n" +
    "                          {{term.name}}\n" +
    "                        </span>\n" +
    "                      </a>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!taxonomies.vocabulary\" translate>search.taxonomy-nav-help</div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.term\">\n" +
    "                <div ng-if=\"taxonomies.term\">\n" +
    "                  <h5 ng-repeat=\"label in taxonomies.term.title\" ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </h5>\n" +
    "                  <div>\n" +
    "                    <a href class=\"btn btn-default btn-xs\" ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {term: taxonomies.term})\">\n" +
    "                      <i class=\"fa fa-plus-circle\"></i>\n" +
    "                      <span translate>add-query</span>\n" +
    "                    </a>\n" +
    "                  </div>\n" +
    "                  <p ng-repeat=\"label in taxonomies.term.description\" ng-if=\"label.locale === lang\">\n" +
    "                    <span class=\"help-block\" ng-bind-html=\"label.text | dceDescription\" ng-if=\"taxonomies.vocabulary.name === 'dceId'\"></span>\n" +
    "                    <span class=\"help-block\" ng-bind-html=\"label.text\" ng-if=\"taxonomies.vocabulary.name !== 'dceId'\"></span>\n" +
    "                  </p>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!taxonomies.term && taxonomies.vocabulary\" translate>search.vocabulary-nav-help</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/panel/taxonomy-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/taxonomy-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"taxonomy\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div ng-repeat=\"label in taxonomy.title\" ng-if=\"label.locale === lang\">\n" +
    "        <a href ng-click=\"onNavigate(taxonomy)\">{{label.text}}</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div ng-repeat=\"label in taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/panel/term-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/term-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"term\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "        {{label.text}}\n" +
    "        <small>\n" +
    "          <a href ng-click=\"onSelect(target, taxonomy, vocabulary, {term: term})\">\n" +
    "            <i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i>\n" +
    "          </a>\n" +
    "        </small>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!term.description\" class=\"help-block\" translate>search.no-description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/panel/vocabulary-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/vocabulary-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"vocabulary\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div ng-repeat=\"label in vocabulary.title\" ng-if=\"label.locale === lang\" class=\"clearfix\">\n" +
    "        <a href ng-click=\"onNavigate(taxonomy, vocabulary)\" ng-if=\"vocabulary.terms\">{{label.text}}</a>\n" +
    "        <span ng-if=\"!vocabulary.terms\">{{label.text}}</span>\n" +
    "        <a href ng-click=\"onSelect(target, taxonomy, vocabulary)\">\n" +
    "          <small ng-if=\"vocabulary.terms\">\n" +
    "            <i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i>\n" +
    "          </small>\n" +
    "          <small ng-if=\"!vocabulary.terms\">\n" +
    "            <i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i>\n" +
    "          </small>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"vocabulary.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!vocabulary.description\" class=\"help-block\" translate>search.no-description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/cell-stat-value/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/cell-stat-value/component.html",
    "<div>\n" +
    "  <span ng-if=\"$ctrl.disable\"><localized-number value=\"$ctrl.entityCount\"></localized-number></span>\n" +
    "  <a ng-href=\"{{$ctrl.href}}\" ng-if=\"!$ctrl.disable && $ctrl.href\">\n" +
    "    <localized-number value=\"$ctrl.entityCount\"></localized-number>\n" +
    "  </a>\n" +
    "</div>");
}]);

angular.module("search/components/result/coverage-result/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/coverage-result/component.html",
    "<div class=\"coverage\">\n" +
    "\n" +
    "  <div ng-if=\"hasVariableTarget()\">\n" +
    "    <ul class=\"nav nav-pills pull-left\">\n" +
    "      <li ng-if=\"groupByOptions.canShowStudy() && groupByOptions.canShowDataset()\" ng-class=\"{'active': bucket.startsWith('study') || bucketStartsWithDce}\"\n" +
    "        class=\"studies\">\n" +
    "        <a href ng-click=\"selectTab('study')\" translate>{{groupByOptions.studyTitle()}}</a>\n" +
    "      </li>\n" +
    "      <li ng-if=\"groupByOptions.canShowStudy() && groupByOptions.canShowDataset()\" ng-class=\"{'active': bucket.startsWith('dataset')}\"\n" +
    "        class=\"datasets\">\n" +
    "        <a href ng-click=\"selectTab('dataset')\" translate>{{groupByOptions.datasetTitle()}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div ng-class=\"{'pull-right': groupByOptions.canShowStudy() && groupByOptions.canShowDataset()}\">\n" +
    "      <a ng-if=\"hasSelected()\" href class=\"btn btn-default\" ng-click=\"updateFilterCriteria()\">\n" +
    "        <i class=\"fa fa-filter\"></i> {{'search.filter' | translate}}\n" +
    "      </a>\n" +
    "\n" +
    "      <span ng-if=\"table.taxonomyHeaders.length > 0\">\n" +
    "        <a href class=\"btn btn-info btn-responsive\" ng-click=\"selectFullAndFilter()\" ng-hide=\"isFullCoverageImpossibleOrCoverageAlreadyFull()\">\n" +
    "          {{'search.coverage-select.full' | translate}}\n" +
    "        </a>\n" +
    "        <a obiba-file-download url=\"downloadUrl()\" target=\"_self\" download class=\"btn btn-info btn-responsive\" href>\n" +
    "          <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix\"></div>\n" +
    "\n" +
    "    <div class=\"voffset2\" ng-class=\"{'pull-right': groupByOptions.canShowVariableTypeFilter(bucket) && groupByOptions.canShowStudyType()}\" ng-if=\"!singleStudy && groupByOptions.canShowDce(bucket)\">\n" +
    "      <label class=\"checkbox-inline\">\n" +
    "        <input type=\"checkbox\" ng-model=\"bucketSelection.dceBucketSelected\">\n" +
    "        <span translate>search.coverage-buckets.dce</span>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"voffset2\" ng-if=\"!singleStudy && groupByOptions.canShowStudyType()\">\n" +
    "      <div class=\"btn btn-group\" style=\"padding: 0\">\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'all'\" translate>all</label>\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'individual'\" translate>search.coverage-buckets.individual</label>\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'harmonization'\" translate>search.coverage-buckets.harmonization</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && !table.taxonomyHeaders\">\n" +
    "    <span ng-if=\"!hasVariableTarget()\" translate>search.no-coverage</span>\n" +
    "    <span ng-if=\"hasVariableTarget()\" translate>search.no-results</span>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "\n" +
    "  <div class=\"table-responsive\" ng-if=\"!loading && table.taxonomyHeaders.length > 0\">\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <th rowspan=\"2\" width=\"50\" style=\"text-align: center\">\n" +
    "            <div class=\"btn-group voffset1\" uib-dropdown>\n" +
    "              <div uib-dropdown-toggle>\n" +
    "                <span class=\"fa fa-square-o\"></span>\n" +
    "                <span class=\"fa fa-caret-down\"></span>\n" +
    "              </div>\n" +
    "              <ul uib-dropdown-menu role=\"menu\">\n" +
    "                <li role=\"menuitem\">\n" +
    "                  <a href ng-click=\"selectAll()\" translate>search.coverage-select.all</a>\n" +
    "                </li>\n" +
    "                <li role=\"menuitem\">\n" +
    "                  <a href ng-click=\"selectNone()\" translate>search.coverage-select.none</a>\n" +
    "                </li>\n" +
    "                <li role=\"menuitem\">\n" +
    "                  <a href ng-click=\"selectFull()\" translate>search.coverage-select.full</a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </th>\n" +
    "          <th rowspan=\"{{bucketStartsWithDce ? 1 : 2}}\" colspan=\"{{table.cols.colSpan}}\" translate>\n" +
    "            {{'search.coverage-buckets.' + bucket}}\n" +
    "          </th>\n" +
    "          <th ng-repeat=\"header in ::table.vocabularyHeaders\" colspan=\"{{::header.termsCount}}\">\n" +
    "            <span uib-popover=\"{{header.entity.descriptions[0].value}}\" popover-title=\"{{header.entity.titles[0].value}}\" popover-placement=\"bottom\"\n" +
    "              popover-trigger=\"'mouseenter'\">\n" +
    "              {{header.entity.titles[0].value}}\n" +
    "            </span>\n" +
    "            <small>\n" +
    "              <a href ng-click=\"removeVocabulary(header)\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "              </a>\n" +
    "            </small>\n" +
    "          </th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <th ng-if=\"bucketStartsWithDce && !singleStudy\" translate>search.coverage-dce-cols.study</th>\n" +
    "          <th ng-if=\"bucketStartsWithDce\" colspan=\"{{choseHarmonization && !choseAll ? 2 : 1}}\" translate>search.coverage-dce-cols.population</th>\n" +
    "          <th ng-if=\"bucketStartsWithDce\" ng-hide=\"choseHarmonization && !choseAll\" translate>search.coverage-dce-cols.dce</th>\n" +
    "          <th ng-repeat=\"header in ::table.termHeaders\">\n" +
    "            <span uib-popover=\"{{header.entity.descriptions[0].value}}\" popover-title=\"{{header.entity.titles[0].value}}\" popover-placement=\"bottom\"\n" +
    "              popover-trigger=\"'mouseenter'\">\n" +
    "              {{header.entity.titles[0].value}}\n" +
    "            </span>\n" +
    "            <small>\n" +
    "              <a ng-if=\"header.canRemove\" href ng-click=\"removeTerm(header)\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "              </a>\n" +
    "            </small>\n" +
    "          </th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"row in ::table.rows track by row.value\" ng-show=\"showMissing || table.termHeaders.length == row.hits.length\">\n" +
    "          <td style=\"text-align: center\">\n" +
    "            <input type=\"checkbox\" ng-model=\"row.selected\">\n" +
    "          </td>\n" +
    "          <td ng-repeat=\"col in ::table.cols.ids[row.value] track by col.index\" colspan=\"{{$middle && (choseHarmonization && !choseAll) ? 2 : 1}}\" ng-hide=\"col.id === '-' && (singleStudy || choseHarmonization && !choseAll)\">\n" +
    "            <span ng-if=\"col.id === '-'\">-</span>\n" +
    "            <a ng-hide=\"col.rowSpan === 0  || col.id === '-'\" href=\"{{col.url}}\" uib-popover-html=\"col.description === col.title ? null : col.description\"\n" +
    "              popover-title=\"{{col.title}}\" popover-placement=\"bottom\" popover-trigger=\"'mouseenter'\">{{col.title}}</a>\n" +
    "            <div style=\"text-align: center\" ng-if=\"col.start && bucketStartsWithDce\">\n" +
    "              <div>\n" +
    "                <small class=\"help-block no-margin\" ng-if=\"::col.end\">\n" +
    "                  {{::col.start}} {{'to' | translate}} {{::col.end}}\n" +
    "                </small>\n" +
    "                <small class=\"help-block no-margin\" ng-if=\"!col.end\">\n" +
    "                  {{::col.start}}, {{'search.coverage-end-date-ongoing' | translate | lowercase}}\n" +
    "                </small>\n" +
    "              </div>\n" +
    "              <div class=\"progress no-margin\">\n" +
    "                <div class=\"progress-bar progress-bar-transparent\" role=\"progressbar\" aria-valuenow=\"{{::col.start}}\" aria-valuemin=\"{{::col.min}}\"\n" +
    "                  aria-valuemax=\"{{::col.start}}\" ng-style=\"{'width': col.progressStart + '%'}\">\n" +
    "                </div>\n" +
    "                <div class=\"{{'progress-bar progress-bar-' + col.progressClass}}\" role=\"progressbar\" aria-valuenow=\"{{col.current}}\" aria-valuemin=\"{{::col.start}}\"\n" +
    "                  aria-valuemax=\"{{::col.end ? col.end : col.current}}\" ng-style=\"{'width': col.progress + '%'}\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </td>\n" +
    "          <td ng-repeat=\"h in ::table.termHeaders\" title=\"{{h.entity.titles[0].value}}\">\n" +
    "            <a href ng-click=\"updateCriteria(row.value, h, $index, 'variables')\">\n" +
    "              <span class=\"label label-info\" ng-show=\"row.hitsTitles[$index]\">{{row.hitsTitles[$index]}}</span>\n" +
    "            </a>\n" +
    "            <span ng-show=\"!row.hitsTitles[$index]\">0</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "      <tfoot>\n" +
    "        <tr>\n" +
    "          <th></th>\n" +
    "          <th colspan=\"{{table.cols.colSpan}}\" translate>all</th>\n" +
    "          <th ng-repeat=\"header in ::table.termHeaders\" title=\"{{header.entity.descriptions[0].value}}\">\n" +
    "            <a href ng-click=\"updateCriteria(null, header, $index, 'variables')\">\n" +
    "              <localized-number value=\"header.hits\"></localized-number>\n" +
    "            </a>\n" +
    "          </th>\n" +
    "        </tr>\n" +
    "      </tfoot>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/datasets-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/datasets-result-table/component.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.dataset.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th translate ng-if=\"optionsCols.showDatasetsAcronymColumn\">acronym</th>\n" +
    "            <th translate>name</th>\n" +
    "            <th translate ng-if=\"optionsCols.showDatasetsTypeColumn\">type</th>\n" +
    "            <th translate ng-if=\"optionsCols.showDatasetsNetworkColumn\">networks</th>\n" +
    "            <th translate ng-if=\"optionsCols.showDatasetsStudiesColumn\">studies</th>\n" +
    "            <th translate ng-if=\"optionsCols.showDatasetsVariablesColumn\">variables</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "          <tr ng-if=\"!summaries || !summaries.length\">\n" +
    "            <td colspan=\"6\" translate>search.dataset.noResults</td>\n" +
    "          </tr>\n" +
    "          <tr ng-repeat=\"summary in summaries\">\n" +
    "            <td ng-if=\"optionsCols.showDatasetsAcronymColumn\">\n" +
    "              <a ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "                <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <a ng-if=\"!optionsCols.showDatasetsAcronymColumn\" ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "                <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "              </a>\n" +
    "              <localized ng-if=\"optionsCols.showDatasetsAcronymColumn\" value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showDatasetsTypeColumn\">\n" +
    "              <localized value=\"classNames[(summary.variableType === 'Collected' ? 'Study' : 'Harmonization') + 'Dataset']\" lang=\"lang\"></localized>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showDatasetsNetworkColumn\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"network\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'networks')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showDatasetsStudiesColumn\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"study\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'studies')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showDatasetsVariablesColumn\">\n" +
    "              <cell-stat-value result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].variables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'variables')\"></cell-stat-value>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/graphics-result/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/graphics-result/component.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && !noResults && !hasChartObjects()\" translate>search.no-graphic-result</p>\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && noResults\" translate>search.no-results</p>\n" +
    "\n" +
    "  <div ng-repeat=\"chart in chartObjects\" class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      {{chart.headerTitle}}\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-lg-6\">\n" +
    "          <div ng-if=\"chart.chartObject.type === 'GeoChart'\">\n" +
    "            <obiba-geo config=\"chart.chartObject.d3Config\"></obiba-geo>\n" +
    "          </div>\n" +
    "          <div ng-if=\"chart.chartObject.type !== 'GeoChart'\">\n" +
    "            <obiba-nv-chart chart-config=\"chart.chartObject.d3Config\"></obiba-nv-chart>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-lg-6\">\n" +
    "          <div class=\"table-responsive\" ng-if=\"chart.getTable().data  &&  chart.getTable().data.length>1\">\n" +
    "            <table style=\"max-height: 400px;\" class=\"table table-bordered table-striped\" fixed-header=\"chart.getTable().data\">\n" +
    "              <thead>\n" +
    "                <tr>\n" +
    "                  <th>{{chart.getTable().data[0][0]}}</th>\n" +
    "                  <th>{{chart.getTable().data[0][1]}}</th>\n" +
    "                  <th ng-if=\"chart.getTable().data[0][2]\">{{chart.getTable().data[0][2]}}</th>\n" +
    "                </tr>\n" +
    "              </thead>\n" +
    "              <tbody>\n" +
    "                <tr ng-repeat=\"row in chart.getTable().entries\">\n" +
    "                  <td>{{row.title}}</td>\n" +
    "                  <td>\n" +
    "                    <cell-stat-value result-tab-order=\"resultTabOrder\"\n" +
    "                                     destination-tab=\"study\"\n" +
    "                                     entity-count=\"row.value\"\n" +
    "                                     update-criteria=\"updateCriteria(row.key, chart.getTable().vocabulary)\"></cell-stat-value>\n" +
    "                  </td>\n" +
    "                  <td ng-if=\"row.participantsNbr\">{{row.participantsNbr}}</td>\n" +
    "                </tr>\n" +
    "              </tbody>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/networks-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/networks-result-table/component.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.network.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th rowspan=\"2\" translate>acronym</th>\n" +
    "            <th rowspan=\"2\" translate>name</th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showNetworksStudiesColumn\">studies</th>\n" +
    "            <th translate ng-attr-colspan=\"{{colSpans.datasets}}\" ng-if=\"(optionsCols.showNetworksStudyDatasetColumn && choseIndividual) || (optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization)\">\n" +
    "              datasets\n" +
    "            </th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showNetworksVariablesColumn\">variables</th>\n" +
    "            <th translate ng-attr-colspan=\"{{colSpans.variables}}\" ng-if=\"(optionsCols.showNetworksStudyVariablesColumn && choseIndividual) || (optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization)\">variables</th>\n" +
    "          </tr>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <th translate ng-if=\"optionsCols.showNetworksStudyDatasetColumn && choseIndividual\">search.dataset.collected</th>\n" +
    "            <th translate ng-if=\"optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization\">search.dataset.harmonized</th>\n" +
    "            <th translate ng-if=\"optionsCols.showNetworksStudyVariablesColumn && choseIndividual\">search.variable.collected</th>\n" +
    "            <th translate ng-if=\"optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization\">search.variable.dataschema</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "          <tr ng-if=\"!summaries || !summaries.length\">\n" +
    "            <td colspan=\"6\" translate>search.network.noResults</td>\n" +
    "          </tr>\n" +
    "          <tr ng-repeat=\"summary in summaries\">\n" +
    "            <td>\n" +
    "              <a ng-href=\"{{PageUrlService.networkPage(summary.id)}}\">\n" +
    "                <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksStudiesColumn\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studies\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"study\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studies\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'studies')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studies\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksStudyDatasetColumn && choseIndividual\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"dataset\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'Study', 'datasets')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"dataset\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'HarmonizationStudy', 'datasets')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksVariablesColumn\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].variables\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].variables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'variables')\"></cell-stat-value>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksStudyVariablesColumn && choseIndividual\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyVariables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'Study', 'variables')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.networkCountStats'].dataschemaVariables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'HarmonizationStudy', 'variables')\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\">-</span>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/pagination/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/pagination/component.html",
    "<div ng-show=\"$ctrl.pagination.totalHits > 10\">\n" +
    "  <div class=\"pull-left\">\n" +
    "    <select class=\"form-control input-sm form-select\"\n" +
    "            ng-model=\"$ctrl.pagination.selected\"\n" +
    "            ng-options=\"size.label for size in $ctrl.pagination.pageSizes\"\n" +
    "            ng-change=\"$ctrl.pageSizeChanged()\"></select>\n" +
    "  </div>\n" +
    "  <div class=\"pull-right\" style=\"margin-left: 5px\">\n" +
    "\n" +
    "    <span ng-show=\"$ctrl.pagination.maxSize > 1\"\n" +
    "          uib-pagination\n" +
    "          total-items=\"$ctrl.pagination.totalHits\"\n" +
    "          max-size=\"$ctrl.pagination.maxSize\"\n" +
    "          ng-model=\"$ctrl.pagination.currentPage\"\n" +
    "          boundary-links=\"true\"\n" +
    "          force-ellipses=\"true\"\n" +
    "          items-per-page=\"$ctrl.pagination.selected.value\"\n" +
    "          previous-text=\"&lsaquo;\"\n" +
    "          next-text=\"&rsaquo;\"\n" +
    "          first-text=\"&laquo;\"\n" +
    "          last-text=\"&raquo;\"\n" +
    "          template-url=\"search/views/list/pagination-template.html\"\n" +
    "          ng-change=\"$ctrl.pageChanged()\"></span>\n" +
    "    <ul class=\"pagination pagination-sm\" ng-show=\"$ctrl.showPaginationTotal\">\n" +
    "      <li>\n" +
    "        <a href class=\"pagination-total\">{{$ctrl.pagination.from}} - {{$ctrl.pagination.to}} {{'of' | translate}} {{$ctrl.pagination.totalHits}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/search-result/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/search-result/component.html",
    "<div class=\"search-result-tabs\">\n" +
    "  <ng-include include-replace ng-repeat=\"tab in searchTabsOrder\" src=\"getUrlTemplate(tab)\"></ng-include>\n" +
    "</div>");
}]);

angular.module("search/components/result/search-result/coverage.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/search-result/coverage.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'coverage'\">\n" +
    "  <coverage-result-table\n" +
    "    result=\"result.coverage\"\n" +
    "    loading=\"loading\"\n" +
    "    bucket=\"bucket\"\n" +
    "    query=\"query\"\n" +
    "    criteria=\"criteria\"\n" +
    "    class=\"voffset2\"\n" +
    "    on-update-criteria=\"onUpdateCriteria\"\n" +
    "    on-remove-criteria=\"onRemoveCriteria\"></coverage-result-table>\n" +
    "</div>\n" +
    "  ");
}]);

angular.module("search/components/result/search-result/graphics.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/search-result/graphics.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<div ng-show=\"display === 'graphics'\">\n" +
    "  <graphics-result result-tabs-order=\"resultTabsOrder\" on-update-criteria=\"onUpdateCriteria\" result=\"result.graphics\" loading=\"loading\" class=\"voffset2 graphics-tab\"></graphics-result>\n" +
    "</div>");
}]);

angular.module("search/components/result/search-result/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/search-result/list.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'list'\" class=\"list-table\">\n" +
    "  <result-tabs-order-count options=\"options\" result-tabs-order=\"resultTabsOrder\" active-target=\"activeTarget\" target-type-map=\"targetTypeMap\">\n" +
    "  </result-tabs-order-count>\n" +
    "  \n" +
    "  <div class=\"voffset2\" ng-class=\"{'pull-right': options.studies.showSearchTab, 'pull-left': !options.studies.showSearchTab, 'hoffset2': !options.studies.showSearchTab}\">\n" +
    "    <a ng-if=\"type=='variables' && options.variables.showCart\" ng-click=\"addToCart()\" class=\"btn btn-success\" href>\n" +
    "      <i class=\"fa fa-cart-plus\"></i>\n" +
    "    </a>\n" +
    "    <a obiba-file-download url=\"getStudySpecificReportUrl()\" target=\"_self\" ng-if=\"type=='studies'\" download class=\"btn btn-info\"\n" +
    "      href>\n" +
    "      <i class=\"fa fa-download\"></i> {{'report-group.study.button-name' | translate}}\n" +
    "    </a>\n" +
    "    <a obiba-file-download url=\"getReportUrl()\" target=\"_self\" download class=\"btn btn-info\" href>\n" +
    "      <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"clearfix\" ng-if=\"options.studies.showSearchTab\"></div>\n" +
    "\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"pull-left\" study-filter-shortcut ng-if=\"options.studies.showSearchTab && options.studies.studiesColumn.showStudiesTypeColumn\"></div>\n" +
    "    <div ng-repeat=\"res in resultTabsOrder\" ng-show=\"activeTarget[targetTypeMap[res]].active\" class=\"pull-right voffset2\" test-ref=\"pager\">\n" +
    "      <search-result-pagination\n" +
    "            show-total=\"true\"\n" +
    "            target=\"activeTarget[targetTypeMap[res]].name\"\n" +
    "            on-change=\"onPaginate(target, from, size, replace)\"></search-result-pagination>\n" +
    "    </div>\n" +
    "    <div class=\"clearfix\" />\n" +
    "    <ng-include include-replace ng-repeat=\"res in resultTabsOrder\" src=\"'search/views/search-result-list-' + res + '-template.html'\"></ng-include>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/studies-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/studies-result-table/component.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.study.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th rowspan=\"2\" translate>acronym</th>\n" +
    "            <th rowspan=\"2\" translate>name</th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"choseAll && optionsCols.showStudiesTypeColumn\">type</th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesDesignColumn && choseIndividual\">search.study.design</th>\n" +
    "            <th translate ng-attr-colspan=\"{{optionsCols.showStudiesQuestionnaireColumn + optionsCols.showStudiesPmColumn + optionsCols.showStudiesBioColumn + optionsCols.showStudiesOtherColumn}}\"\n" +
    "              ng-if=\"(optionsCols.showStudiesQuestionnaireColumn || optionsCols.showStudiesPmColumn || optionsCols.showStudiesBioColumn || optionsCols.showStudiesOtherColumn) && choseIndividual\">\n" +
    "              search.study.dataSources\n" +
    "            </th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesParticipantsColumn && choseIndividual\">search.study.participants</th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesNetworksColumn\">networks</th>\n" +
    "            <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesVariablesColumn\">variables</th>\n" +
    "            <th translate ng-attr-colspan=\"{{optionsCols.showStudiesStudyDatasetsColumn + optionsCols.showStudiesStudyVariablesColumn}}\"\n" +
    "              ng-if=\"choseIndividual && (optionsCols.showStudiesStudyDatasetsColumn || optionsCols.showStudiesStudyVariablesColumn)\">search.coverage-buckets.collection\n" +
    "            </th>\n" +
    "            <th translate ng-attr-colspan=\"{{optionsCols.showStudiesHarmonizationDatasetsColumn + optionsCols.showStudiesDataschemaVariablesColumn}}\"\n" +
    "              ng-if=\"choseHarmonization && (optionsCols.showStudiesHarmonizationDatasetsColumn || optionsCols.showStudiesDataschemaVariablesColumn)\">search.coverage-buckets.harmonization</th>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <th class=\"text-nowrap\" title=\"{{datasourceTitles.questionnaires.title}}\" ng-if=\"optionsCols.showStudiesQuestionnaireColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-file-text-o\"></i>\n" +
    "            </th>\n" +
    "            <th class=\"text-nowrap\" title=\"{{datasourceTitles.physical_measures.title}}\" ng-if=\"optionsCols.showStudiesPmColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-stethoscope\"></i>\n" +
    "            </th>\n" +
    "            <th class=\"text-nowrap\" title=\"{{datasourceTitles.biological_samples.title}}\" ng-if=\"optionsCols.showStudiesBioColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-flask\"></i>\n" +
    "            </th>\n" +
    "            <th class=\"text-nowrap\" title=\"{{datasourceTitles.others.title}}\" ng-if=\"optionsCols.showStudiesOtherColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-plus-square-o\"></i>\n" +
    "            </th>\n" +
    "            <th translate ng-if=\"optionsCols.showStudiesStudyDatasetsColumn && choseIndividual\">datasets</th>\n" +
    "            <th translate ng-if=\"optionsCols.showStudiesStudyVariablesColumn && choseIndividual\">variables</th>\n" +
    "            <th translate ng-if=\"optionsCols.showStudiesHarmonizationDatasetsColumn && choseHarmonization\">datasets</th>\n" +
    "            <th translate ng-if=\"optionsCols.showStudiesDataschemaVariablesColumn && choseHarmonization\">variables</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "          <tr ng-repeat=\"summary in summaries\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "            <td>\n" +
    "              <a ng-href=\"{{PageUrlService.studyPage(summary.id, summary.studyResourcePath === 'harmonization-study' ? 'harmonization' : 'individual')}}\">\n" +
    "                <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "            </td>\n" +
    "            <td ng-if=\"choseAll && optionsCols.showStudiesTypeColumn\">{{(summary.studyResourcePath === 'individual-study' ? 'search.study.individual' : 'search.study.harmonization')\n" +
    "              | translate}}</td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesDesignColumn && choseIndividual\">\n" +
    "              {{ summary.design === undefined ? '-' : 'study_taxonomy.vocabulary.methods-design.term.' + summary.design + '.title' | translate}}\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesQuestionnaireColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'questionnaires')\"></i>\n" +
    "              <span ng-if=\"!hasDatasource(summary.dataSources, 'questionnaires')\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesPmColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'physical_measures')\"></i>\n" +
    "              <span ng-if=\"!hasDatasource(summary.dataSources, 'physical_measures')\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesBioColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'biological_samples')\"></i>\n" +
    "              <span ng-if=\"!hasDatasource(summary.dataSources, 'biological_samples')\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesOtherColumn && choseIndividual\">\n" +
    "              <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'others')\"></i>\n" +
    "              <span ng-if=\"!hasDatasource(summary.dataSources, 'others')\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesParticipantsColumn && choseIndividual\">\n" +
    "              <span ng-if=\"summary.targetNumber.number\">\n" +
    "                <localized-number value=\"summary.targetNumber.number\"></localized-number>\n" +
    "              </span>\n" +
    "              <span translate ng-if=\"summary.targetNumber.noLimit\">\n" +
    "                numberOfParticipants.no-limit\n" +
    "              </span>\n" +
    "              <span ng-if=\"!summary.targetNumber.number && !summary.targetNumber.noLimit\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesNetworksColumn\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].networks\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"network\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].networks\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'networks' , 'networks', true)\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].networks\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesVariablesColumn\">\n" +
    "              <cell-stat-value result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].variables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'Study', 'variables', true)\"></cell-stat-value>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesStudyDatasetsColumn && choseIndividual\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"dataset\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'Study', 'datasets', true)\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesStudyVariablesColumn && choseIndividual\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyVariables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'Study', 'variables', true)\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesHarmonizationDatasetsColumn && choseHarmonization\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"dataset\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'HarmonizationStudy', 'datasets', true)\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\">-</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showStudiesDataschemaVariablesColumn && choseHarmonization\">\n" +
    "              <cell-stat-value ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"\n" +
    "                               result-tab-order=\"resultTabOrder\"\n" +
    "                               destination-tab=\"variable\"\n" +
    "                               entity-count=\"summary['obiba.mica.CountStatsDto.studyCountStats'].dataschemaVariables\"\n" +
    "                               update-criteria=\"updateCriteria(summary.id, 'HarmonizationStudy', 'variables', true)\"></cell-stat-value>\n" +
    "              <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\">-</span>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/result/tabs-order-count/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/tabs-order-count/component.html",
    "<div>\n" +
    "  <ul class=\"nav nav-pills pull-left voffset2\" test-ref=\"search-counts\">\n" +
    "    <li role=\"presentation\" ng-repeat=\"res in resultTabsOrder\" ng-class=\"{active: activeTarget[targetTypeMap[res]].active && resultTabsOrder.length >= 1}\"\n" +
    "      ng-if=\"options[targetTypeMap[res]].showSearchTab\" class=\"{{targetTypeMap[res]}}\">\n" +
    "      <a href ng-click=\"selectType(targetTypeMap[res])\" ng-if=\"resultTabsOrder.length > 1\">\n" +
    "        {{targetTypeMap[res] | translate}}\n" +
    "        <span class=\"badge hoffset1\" test-ref=\"{{targetTypeMap[res]}}\">\n" +
    "          <small>{{getTotalHits(res) | localizedNumber}}</small>\n" +
    "        </span>\n" +
    "      </a>\n" +
    "      <a href style=\"cursor: default;\" ng-if=\"resultTabsOrder.length === 1\">\n" +
    "        {{targetTypeMap[res] | translate}}\n" +
    "        <span class=\"badge hoffset1\" test-ref=\"{{targetTypeMap[res]}}\">\n" +
    "          <small>{{getTotalHits(res) | localizedNumber}}</small>\n" +
    "        </span>\n" +
    "      </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module("search/components/result/variables-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/result/variables-result-table/component.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.variable.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th translate>name</th>\n" +
    "            <th translate>search.variable.label</th>\n" +
    "            <th translate ng-if=\"optionsCols.showVariablesTypeColumn\">type</th>\n" +
    "            <th translate ng-if=\"optionsCols.showVariablesStudiesColumn\">search.study.label</th>\n" +
    "            <th translate ng-if=\"optionsCols.showVariablesDatasetsColumn\">search.dataset.label</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "          <tr ng-repeat=\"summary in summaries\">\n" +
    "            <td>\n" +
    "              <a test-ref=\"name\" href=\"{{PageUrlService.variablePage(summary.id) ? PageUrlService.variablePage(summary.id) : PageUrlService.datasetPage(summary.datasetId, summary.variableType)}}\">\n" +
    "                {{summary.name}}\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <localized value=\"summary.variableLabel\" lang=\"lang\"></localized>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showVariablesTypeColumn\">\n" +
    "              {{'search.variable.' + summary.variableType.toLowerCase() | translate}}\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showVariablesStudiesColumn\">\n" +
    "              <a ng-if=\"summary.studyId\" ng-href=\"{{PageUrlService.studyPage(summary.studyId, summary.variableType == 'Dataschema' ? 'harmonization' : 'individual')}}\">\n" +
    "                <localized value=\"summary.studyAcronym\" lang=\"lang\"></localized>\n" +
    "              </a>\n" +
    "              <a ng-if=\"summary.networkId\" ng-href=\"{{PageUrlService.networkPage(summary.networkId)}}\">\n" +
    "                <localized value=\"summary.networkAcronym\" lang=\"lang\"></localized>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td ng-if=\"optionsCols.showVariablesDatasetsColumn\">\n" +
    "              <a ng-href=\"{{PageUrlService.datasetPage(summary.datasetId, summary.variableType)}}\">\n" +
    "                <localized value=\"summary.datasetAcronym\" lang=\"lang\"></localized>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/search-box-region/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/search-box-region/component.html",
    "<div id=\"search-region\" class=\"{{tabs && tabs.length>1 ? 'tab-content voffset4' : ''}}\">\n" +
    "  <div ng-if=\"$ctrl.options.showSearchBox\" id=\"search-box-region\" class=\"{{hasFacetedTaxonomies ? '' : 'row'}}\">\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-3'}}\"></div>\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-6'}}\">\n" +
    "      <script type=\"text/ng-template\" id=\"customTemplate.html\">\n" +
    "        <a ng-if=\"match.model.id\">\n" +
    "          <table style=\"border:none;\">\n" +
    "            <tbody>\n" +
    "            <tr>\n" +
    "              <td style=\"min-width: 30px;\">\n" +
    "                <span title=\"{{match.model.target + '-classifications' | translate}}\">\n" +
    "                  <i class=\"{{'i-obiba-large i-obiba-' + match.model.target}}\"></i>\n" +
    "                </span>\n" +
    "              </td>\n" +
    "              <td>\n" +
    "            <span\n" +
    "              uib-popover-html=\"match.model.itemDescription | uibTypeaheadHighlight:query\"\n" +
    "              popover-title=\"{{match.model.itemTitle}}\"\n" +
    "              popover-placement=\"bottom\"\n" +
    "              popover-trigger=\"'mouseenter'\"\n" +
    "              ng-bind-html=\"match.model.itemTitle | uibTypeaheadHighlight:query\">\n" +
    "            </span>\n" +
    "                <small class=\"help-block no-margin\" title=\"{{match.model.itemParentDescription}}\">\n" +
    "                  {{match.model.itemParentTitle}}\n" +
    "                </small>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "          </table>\n" +
    "        </a>\n" +
    "        <a ng-if=\"!match.model.id\" class=\"{{match.model.status}}\">\n" +
    "          <small class=\"help-block no-margin\">\n" +
    "            {{match.model.message}}\n" +
    "          </small>\n" +
    "        </a>\n" +
    "      </script>\n" +
    "      <span class=\"input-group input-group-sm\">\n" +
    "        <span class=\"input-group-btn\" uib-dropdown>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle>\n" +
    "            {{'taxonomy.target.' + ($ctrl.documents.search.target ? $ctrl.documents.search.target : 'all')| translate}}\n" +
    "            <span class=\"caret\"></span>\n" +
    "          </button>\n" +
    "          <ul uib-dropdown-menu role=\"menu\">\n" +
    "            <li>\n" +
    "              <a href ng-click=\"$ctrl.selectSearchTarget()\" translate>taxonomy.target.all</a>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"target in $ctrl.targets\" role=\"menuitem\">\n" +
    "              <a href ng-click=\"$ctrl.selectSearchTarget(target)\">{{'taxonomy.target.' + target | translate}}</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </span>\n" +
    "        <input type=\"text\" ng-model=\"$ctrl.selectedCriteria\" placeholder=\"{{'search.placeholder.' + ($ctrl.documents.search.target ? $ctrl.documents.search.target : 'all') | translate}}\"\n" +
    "          uib-typeahead=\"criteria for criteria in $ctrl.searchCriteria($viewValue)\" typeahead-min-length=\"2\" typeahead-loading=\"$ctrl.documents.search.active\"\n" +
    "          typeahead-template-url=\"customTemplate.html\" typeahead-on-select=\"$ctrl.selectCriteria($item)\" class=\"form-control\">\n" +
    "        <span class=\"input-group-addon\">\n" +
    "          <i class=\"fa fa-search\"></i>\n" +
    "        </span>\n" +
    "        <span ng-if=\"$ctrl.options.SearchHelpLinkUrl\" class=\"input-group-btn\">\n" +
    "          <a type=\"button\" target=\"_blank\" class=\"btn btn-default\" href=\"{{$ctrl.options.SearchHelpLinkUrl}}\">\n" +
    "            <span class=\"fa fa-question-circle\"></span> {{$ctrl.options.SearchHelpLinkLabel}}</a>\n" +
    "        </span>\n" +
    "      </span>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-if=\"$ctrl.options.showSearchBrowser\" id=\"search-selector-region\" class=\"{{hasFacetedTaxonomies ? '' : 'row'}}\">\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-3'}}\"></div>\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-6'}}\">\n" +
    "      <small>\n" +
    "        <ul class=\"nav nav-pills taxo-element\">\n" +
    "          <li ng-if=\"hasClassificationsTitle\">\n" +
    "            <label class=\"nav-label\" translate>search.classifications-title</label>\n" +
    "          </li>\n" +
    "          <li ng-repeat=\"t in $ctrl.taxonomyNav track by $index\" title=\"{{$ctrl.translateTaxonomyNav(t, 'description')}}\">\n" +
    "            <a href ng-click=\"$ctrl.showTaxonomy(t.target, t.name)\" ng-if=\"!t.terms\">{{$ctrl.translateTaxonomyNav(t, 'title')}}</a>\n" +
    "            <span uib-dropdown ng-if=\"t.terms\">\n" +
    "              <ul class=\"nav nav-pills\">\n" +
    "                <li>\n" +
    "                  <a href uib-dropdown-toggle>{{$ctrl.translateTaxonomyNav(t, 'title')}}\n" +
    "                    <span class=\"caret\"></span>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              <ul uib-dropdown-menu class=\"innerul\">\n" +
    "                <li ng-repeat=\"st in t.terms\">\n" +
    "                  <a href ng-click=\"$ctrl.showTaxonomy(t.target, st.name)\" title=\"{{$ctrl.translateTaxonomyNav(st, 'description')}}\">{{$ctrl.translateTaxonomyNav(st, 'title')}}</a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </span>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href ng-click=\"$ctrl.goToClassifications()\" title=\"{{'search.classifications-show' | translate}}\">\n" +
    "              <span ng-if=\"hasClassificationsLinkLabel\" translate>search.classifications-link</span>\n" +
    "              <i class=\"fa fa-ellipsis-h\" ng-if=\"!hasClassificationsLinkLabel\"></i>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <taxonomies-panel ng-if=\"$ctrl.options.showSearchBrowser\" taxonomy-name=\"$ctrl.taxonomyName\" target=\"$ctrl.target\" on-select-term=\"$ctrl.selectTerm\"\n" +
    "    on-close=\"$ctrl.clearTaxonomy\" lang=\"$ctrl.lang\" taxonomies-shown=\"$ctrl.taxonomiesShown\"></taxonomies-panel>\n" +
    "</div>");
}]);

angular.module("search/components/study-filter-shortcut/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/study-filter-shortcut/component.html",
    "<div class=\"voffset2\">\n" +
    "  <div class=\"btn btn-group\" style=\"padding: 0\">\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'all'\" translate>all</label>\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'individual'\" translate>search.coverage-buckets.individual</label>\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'harmonization'\" translate>search.coverage-buckets.harmonization</label>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/taxonomy/taxonomy-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/taxonomy/taxonomy-filter-detail/component.html",
    "<div class=\"panel-primary\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div><strong>{{$ctrl.taxonomy.title | localizedString}}</strong></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <vocabulary-filter-detail\n" +
    "      ng-repeat=\"vocabulary in $ctrl.vocabularies\"\n" +
    "      vocabulary=\"vocabulary\"\n" +
    "      on-select-vocabulary-args=\"$ctrl.selectVocabularyArgs(vocabulary, args)\"\n" +
    "      on-remove-criterion=\"$ctrl.removeCriterion(item)\">\n" +
    "  </vocabulary-filter-detail>\n" +
    "</div>");
}]);

angular.module("search/components/taxonomy/taxonomy-filter-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/taxonomy/taxonomy-filter-panel/component.html",
    "<div class=\"vocabulary-filter-detail\" ng-class=\"{'close_right':$ctrl.classClose, 'overlay-front-on-box-shodow' : $ctrl.showTaxonomyPanel}\">\n" +
    "  \n" +
    "  <div class=\"ng-clearfix\"></div>\n" +
    "\n" +
    "  <vocabulary-filter-detail-heading show-taxonomy-panel=\"$ctrl.showTaxonomyPanel\" taxonomy-name=\"$ctrl.taxonomyName\" taxonomies-query=\"$ctrl.taxonomiesQuery\"\n" +
    "    clear-query=\"$ctrl.clearQuery\" on-filter-change=\"$ctrl.onFilterChange(queryString)\" taxonomy-type-map=\"$ctrl.taxonomyTypeMap\"\n" +
    "    result-tabs-order=\"$ctrl.resultTabsOrder\" target=\"$ctrl.target\" on-select-type=\"$ctrl.selectType(type)\" result=\"$ctrl.result\"\n" +
    "    toggle-pannel=\"$ctrl.togglePannel()\">\n" +
    "  </vocabulary-filter-detail-heading>\n" +
    "\n" +
    "  <div class=\"vocabulary-filter-detail-container\">\n" +
    "    <vocabulary-filter-detail ng-if=\"!$ctrl.taxonomyIsArray\" on-select-vocabulary-args=\"$ctrl.selectTaxonomyVocabularyArgs($ctrl.taxonomy, vocabulary, args)\"\n" +
    "      ng-repeat=\"vocabulary in $ctrl.filteredVocabularies track by $index\" on-remove-criterion=\"$ctrl.removeCriterion(item)\"\n" +
    "      vocabulary=\"vocabulary\">\n" +
    "    </vocabulary-filter-detail>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.taxonomyIsArray\" ng-repeat=\"subTaxonomy in $ctrl.taxonomy\">\n" +
    "      <taxonomy-filter-detail taxonomy=\"subTaxonomy\" ng-if=\"$ctrl.filteredVocabularies[subTaxonomy.name]\" vocabularies=\"$ctrl.filteredVocabularies[subTaxonomy.name]\"\n" +
    "        on-select-taxonomy-term=\"$ctrl.selectTaxonomyVocabularyArgs(taxonomy, vocabulary, args)\" on-remove-criterion=\"$ctrl.removeCriterion(item)\">\n" +
    "      </taxonomy-filter-detail>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/vocabulary-filter-detail-heading/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/vocabulary-filter-detail-heading/component.html",
    "<div class=\"panel-body vocabulary-filter-detail-heading\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-lg-4\">\n" +
    "            <input-search-filter\n" +
    "                    taxonomy-name=\"$ctrl.taxonomyName\"\n" +
    "                    taxonomies-query=\"$ctrl.taxonomiesQuery\"\n" +
    "                    class=\"input-search-filter\"\n" +
    "                    clear-query=\"$ctrl.clearQuery\"\n" +
    "                    on-filter-change=\"$ctrl.filterChange(queryString)\">\n" +
    "            </input-search-filter>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-11 col-lg-7 voffset1\">\n" +
    "            <entity-counts\n" +
    "                    taxonomy-type-map=\"$ctrl.taxonomyTypeMap\"\n" +
    "                    result-tabs-order=\"$ctrl.resultTabsOrder\"\n" +
    "                    target=\"$ctrl.target\"\n" +
    "                    on-select-type=\"$ctrl.selectType(type)\"\n" +
    "                    result=\"$ctrl.result\">\n" +
    "            </entity-counts>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-1 col-lg-1\">\n" +
    "            <button type=\"button\"\n" +
    "                    class=\"voffset1 pull-right close\"\n" +
    "                    data-dismiss=\"alert\"\n" +
    "                    aria-label=\"Close\"\n" +
    "                    ng-click=\"$ctrl.togglePannel()\"\n" +
    "                    title=\"{{'global.close-panel'|translate}}\"><span aria-hidden=\"true\">×</span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/components/vocabulary/vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/vocabulary/vocabulary-filter-detail/component.html",
    "<div class=\"panel-heading\">\n" +
    "  <label uib-popover=\"{{$ctrl.vocabulary.description ? $ctrl.vocabulary.description : $ctrl.vocabulary.title | localizedString}}\"\n" +
    "    popover-title=\"{{$ctrl.vocabulary.description ? $ctrl.vocabulary.title : null | localizedString}}\" popover-placement=\"bottom\"\n" +
    "    popover-trigger=\"'mouseenter'\" popover-popup-delay=\"250\" popover-class=\"right-panel-popover\">\n" +
    "    {{$ctrl.vocabulary.title | localizedString}}\n" +
    "  </label>\n" +
    "\n" +
    "  <div class=\"pull-right\">\n" +
    "    <a href=\"\" ng-click=\"$ctrl.removeCriterion()\" ng-if=\"$ctrl.vocabulary.existingItem\">{{'clear' | translate}}</a>\n" +
    "    <a href=\"\" class=\"hoffset2\" ng-click=\"$ctrl.selectAllFilteredVocabularyTerms($ctrl.vocabulary.filteredTerms)\" ng-if=\"$ctrl.criterionType === 'string-terms' && $ctrl.canStillSelectMore($ctrl.vocabulary.filteredTerms)\">\n" +
    "      {{'select-items' | translate}}\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"panel-body\">\n" +
    "  <div ng-switch on=\"$ctrl.criterionType\">\n" +
    "    <div ng-switch-when=\"string-terms\">\n" +
    "      <terms-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\" on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></terms-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-switch-when=\"numeric\">\n" +
    "      <numeric-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\" on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></numeric-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-switch-default>\n" +
    "      <match-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\" on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></match-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div id=\"classification-browser-region\">\n" +
    "  <div ng-if=\"classificationsHeaderTemplateUrl\" ng-include=\"classificationsHeaderTemplateUrl\"></div>\n" +
    "\n" +
    "  <div class=\"container alert-fixed-position\">\n" +
    "    <obiba-alert id=\"SearchController\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"alert-growl-container\">\n" +
    "    <obiba-alert id=\"SearchControllerGrowl\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <a href class=\"btn btn-sm btn-success\" ng-click=\"goToSearch()\">\n" +
    "    <i class=\"fa fa-chevron-left\"></i>\n" +
    "    <span translate>search.back</span>\n" +
    "  </a>\n" +
    "\n" +
    "  <!-- Lang tabs -->\n" +
    "  <ul class=\"nav nav-tabs voffset2\" role=\"tablist\" ng-if=\"tabs && tabs.length>1\">\n" +
    "    <li ng-repeat=\"tab in tabs\" role=\"presentation\" ng-class=\"{ active: tab === lang }\"><a href role=\"tab\"\n" +
    "      ng-click=\"setLocale(tab)\">{{'language.' + tab | translate}}</a></li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <!-- Search criteria region -->\n" +
    "  <search-criteria-region class=\"voffset2\" options=\"options\" search=\"search\"> </search-criteria-region>\n" +
    "\n" +
    "  <!-- Classifications region -->\n" +
    "  <div class=\"{{tabs && tabs.length>1 ? 'tab-content voffset4' : ''}}\">\n" +
    "    <ul class=\"nav nav-pills voffset2\" role=\"tablist\" ng-if=\"targetTabsOrder.length > 1\">\n" +
    "      <li ng-repeat=\"target in targetTabsOrder\" role=\"presentation\" ng-class=\"{ active: target === $parent.target }\" class=\"{{target}}\"><a href role=\"tab\"\n" +
    "          ng-click=\"navigateToTarget(target)\">{{'taxonomy.target.' + target | translate}}</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <classifications-panel target=\"target\" is-history-enabled=\"true\" on-select-term=\"onSelectTerm\" lang=\"lang\"></classifications-panel>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/views/classifications/taxonomy-accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomy-accordion-group.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-taxonomy\" ng-class=\"panelClass || 'panel-default'\">\n" +
    "  <div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><small><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></small></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "    <div class=\"panel-body no-padding small\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/taxonomy-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomy-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div vocabulary-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index]\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div taxonomy-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index + 1]\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div taxonomy-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index + 2]\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/vocabulary-accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/vocabulary-accordion-group.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-vocabulary\" ng-class=\"panelClass || 'panel-default'\">\n" +
    "  <div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><small><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></small></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "    <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/criteria/criterion-header-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-header-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<li class=\"criteria-list-item\">\n" +
    "  <label uib-popover=\"{{localize(criterion.vocabulary.description)}}\"\n" +
    "         popover-title=\"{{localize(criterion.vocabulary.title)}}\"\n" +
    "         popover-placement=\"bottom\"\n" +
    "         popover-trigger=\"'mouseenter'\">\n" +
    "    {{localize(criterion.vocabulary.title)}}\n" +
    "  </label>\n" +
    "  <span class=\"pull-right\" title=\"{{'search.close-and-search' | translate}}\" ng-click=\"$parent.$parent.closeDropdown()\"><i class=\"fa fa-check\"></i></span>\n" +
    "</li>\n" +
    "<li class='divider'></li>\n" +
    "");
}]);

angular.module("search/views/criteria/target-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/target-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span></span>");
}]);

angular.module("search/views/list/pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/pagination-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span>\n" +
    "  <ul class=\"pagination pagination-sm\">\n" +
    "    <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\">\n" +
    "      <a href ng-click=\"selectPage(1, $event)\">{{::getText('first')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\">\n" +
    "      <a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\"\n" +
    "        class=\"pagination-page\">\n" +
    "      <a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\">\n" +
    "      <a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\">\n" +
    "      <a href ng-click=\"selectPage(totalPages, $event)\">{{::getText('last')}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</span>");
}]);

angular.module("search/views/search-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-layout.html",
    "<div>\n" +
    "  <div class=\"alert alert-warning\" ng-if=\"!isSearchAvailable\">\n" +
    "    <span translate>search.search-not-available</span>\n" +
    "  </div>\n" +
    "  <div ng-if=\"isSearchAvailable\">\n" +
    "    <div class=\"container alert-fixed-position\">\n" +
    "      <obiba-alert id=\"SearchController\"></obiba-alert>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert-growl-container\">\n" +
    "      <obiba-alert id=\"SearchControllerGrowl\"></obiba-alert>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"searchHeaderTemplateUrl\" ng-include=\"searchHeaderTemplateUrl\"></div>\n" +
    "\n" +
    "    <div ng-switch on=\"search.layout\">\n" +
    "      <div ng-switch-when=\"layout1\">\n" +
    "        <ng-include src=\"'search/views/search.html'\"></ng-include>\n" +
    "      </div>\n" +
    "      <div ng-switch-default>\n" +
    "        <ng-include src=\"'search/views/search2.html'\"></ng-include>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-graphics-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-graphics-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'graphics'\">\n" +
    "  <graphics-result on-update-criteria=\"onUpdateCriteria\" result=\"result.graphics\" loading=\"loading\" class=\"voffset2 graphics-tab\"></graphics-result>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-list-dataset-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-dataset-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.datasets.showSearchTab\" ng-class=\"{'active': activeTarget.datasets.active}\">\n" +
    "  <datasets-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.datasetResultDto['obiba.mica.DatasetResultDto.result'].datasets\"></datasets-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-list-network-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-network-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.networks.showSearchTab\" ng-class=\"{'active': activeTarget.networks.active}\">\n" +
    "  <networks-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.networkResultDto['obiba.mica.NetworkResultDto.result'].networks\"></networks-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-list-study-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-study-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.studies.showSearchTab\" ng-class=\"{'active': activeTarget.studies.active}\">\n" +
    "  <studies-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.studyResultDto['obiba.mica.StudyResultDto.result'].summaries\"></studies-result-table>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-list-variable-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-variable-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.variables.showSearchTab\" ng-class=\"{'active': activeTarget.variables.active}\">\n" +
    "  <variables-result-table lang=\"lang\" loading=\"loading\"\n" +
    "      summaries=\"result.list.variableResultDto['obiba.mica.DatasetVariableResultDto.result'].summaries\"></variables-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"inSearchMode()\">\n" +
    "  <div class=\"row voffset2\">\n" +
    "    <div class=\"col-md-3\" ng-if=\"hasFacetedTaxonomies\" >\n" +
    "      <!-- Search Facets region -->\n" +
    "      <taxonomies-facets-panel id=\"search-facets-region\"\n" +
    "                               faceted-taxonomies=\"facetedTaxonomies\"\n" +
    "                               criteria=\"search.criteria\"\n" +
    "                               on-select-term=\"onSelectTerm\"\n" +
    "                               on-refresh=\"refreshQuery\"\n" +
    "                               lang=\"lang\"></taxonomies-facets-panel>\n" +
    "    </div>\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? 'col-md-9' : 'col-md-12'}}\">\n" +
    "      <search-box-region \n" +
    "        targets=\"targets\"\n" +
    "        options=\"options\" \n" +
    "        alert-id=\"'SearchController'\" \n" +
    "        lang=\"lang\"\n" +
    "        taxonomy-nav=\"taxonomyNav\"\n" +
    "        on-select-criteria=\"selectCriteria(item)\"\n" +
    "        on-goto-classifications=\"goToClassifications()\",\n" +
    "        on-select-term=\"onSelectTerm(target, taxonomy, vocabulary, args)\">\n" +
    "      </search-box-region>\n" +
    "\n" +
    "      <div ng-if=\"hasFacetedTaxonomies && hasFacetedNavigationHelp && !(search.criteria.children && search.criteria.children.length > 0)\">\n" +
    "        <p class=\"help-block\" translate>search.faceted-navigation-help</p>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Search criteria region -->\n" +
    "      <search-criteria-region options=\"options\" search=\"search\"> </search-criteria-region>\n" +
    "\n" +
    "      <!-- Search Results region -->\n" +
    "      <div id=\"search-result-region\" class=\"voffset3 can-full-screen\" ng-if=\"canExecuteWithEmptyQuery()\" fullscreen=\"isFullscreen\">\n" +
    "        <div ng-if=\"searchTabsOrder.length > 1\">\n" +
    "          <a href class=\"btn btn-sm btn-default pull-right\" ng-click=\"toggleFullscreen()\">\n" +
    "            <i class=\"glyphicon\" ng-class=\"{'glyphicon-resize-full': !isFullscreen, 'glyphicon-resize-small': isFullscreen}\"></i>\n" +
    "          </a>\n" +
    "          <ul class=\"nav nav-tabs voffset2\">\n" +
    "            <li role=\"presentation\" ng-repeat=\"tab in searchTabsOrder\" ng-class=\"{active: search.display === tab}\">\n" +
    "              <a href ng-click=\"selectDisplay(tab)\">{{ 'search.' + tab | translate}}</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "        <div translate>{{'search.' + search.display + '-help'}}</div>\n" +
    "        <result-panel display=\"search.display\"\n" +
    "                      type=\"search.type\"\n" +
    "                      bucket=\"search.bucket\"\n" +
    "                      criteria=\"search.criteria\"\n" +
    "                      query=\"search.executedQuery\"\n" +
    "                      result=\"search.result\"\n" +
    "                      loading=\"search.loading\"\n" +
    "                      pagination=\"search.pagination\"\n" +
    "                      on-update-criteria=\"onUpdateCriteria\"\n" +
    "                      on-remove-criteria=\"onRemoveCriteria\"\n" +
    "                      on-type-changed=\"onTypeChanged\"\n" +
    "                      on-bucket-changed=\"onBucketChanged\"\n" +
    "                      on-paginate=\"onPaginate\"\n" +
    "                      search-tabs-order=\"searchTabsOrder\"\n" +
    "                      result-tabs-order=\"resultTabsOrder\"\n" +
    "                      lang=\"lang\"></result-panel>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/views/search2.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search2.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"inSearchMode()\">\n" +
    "\n" +
    "  <!-- Search criteria region -->\n" +
    "  <search-criteria-region options=\"options\" search=\"search\"></search-criteria-region>\n" +
    "  <div ng-class=\"{'overlay-back-on': search.showTaxonomyPanel}\">\n" +
    "  </div>\n" +
    "  <div ng-class=\"{'overlay-front-on': search.showTaxonomyPanel}\">\n" +
    "    <div class=\"row voffset2\">\n" +
    "      <div class=\"col-md-3\" ng-if=\"hasFacetedTaxonomies\">\n" +
    "        <!-- Search Facets region -->\n" +
    "        <taxonomies-facets-panel id=\"search-facets-region\" faceted-taxonomies=\"facetedTaxonomies\"\n" +
    "                                criteria=\"search.criteria\" on-select-term=\"onSelectTerm\"\n" +
    "                                on-refresh=\"refreshQuery\" lang=\"lang\"></taxonomies-facets-panel>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\" ng-if=\"!hasFacetedTaxonomies\">\n" +
    "        <!-- Search Facets region -->\n" +
    "        <meta-taxonomy-filter-panel\n" +
    "            show-taxonomy-panel=\"search.showTaxonomyPanel\"\n" +
    "            tabs=\"targetTabsOrder\"\n" +
    "            rql-query=\"search.rqlQuery\"\n" +
    "            on-toggle=\"onTaxonomyFilterPanelToggleVisibility(target, taxonomy)\"></meta-taxonomy-filter-panel>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-9\">\n" +
    "        <!-- Search Results region -->\n" +
    "        <div class=\"panel panel-default\" ng-if=\"search.showTaxonomyPanel\">\n" +
    "          <taxonomy-filter-panel\n" +
    "              show-taxonomy-panel=\"search.showTaxonomyPanel\"\n" +
    "              result-tabs-order=\"resultTabsOrder\"\n" +
    "              taxonomy-type-map=\"taxonomyTypeMap\"\n" +
    "              result=\"search.countResult\"\n" +
    "              target=\"search.selectedTarget\"\n" +
    "              taxonomy=\"search.selectedTaxonomy\"\n" +
    "              on-select-type=\"onTypeChanged(type)\"\n" +
    "              on-select-term=\"onSelectTerm(target, taxonomy, vocabulary, args)\"\n" +
    "              on-remove-criterion=\"removeCriteriaItem(item)\"\n" +
    "              on-toggle=\"onTaxonomyFilterPanelToggleVisibility\"></taxonomy-filter-panel>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <div id=\"search-result-region\" class=\"can-full-screen\"\n" +
    "            ng-if=\"!search.showTaxonomyPanel && canExecuteWithEmptyQuery()\" fullscreen=\"isFullscreen\">\n" +
    "          <div ng-if=\"searchTabsOrder.length > 1\">\n" +
    "            <a href class=\"btn btn-sm btn-default pull-right\" ng-click=\"toggleFullscreen()\">\n" +
    "              <i class=\"glyphicon\"\n" +
    "                ng-class=\"{'glyphicon-resize-full': !isFullscreen, 'glyphicon-resize-small': isFullscreen}\"></i>\n" +
    "            </a>\n" +
    "            <ul class=\"nav nav-tabs\">\n" +
    "              <li role=\"presentation\" ng-repeat=\"tab in searchTabsOrder\"\n" +
    "                  ng-class=\"{active: search.display === tab}\">\n" +
    "                <a href ng-click=\"selectDisplay(tab)\">{{ 'search.' + tab | translate}}</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <div translate>{{'search.' + search.display + '-help'}}</div>\n" +
    "          <result-panel display=\"search.display\"\n" +
    "                        type=\"search.type\"\n" +
    "                        bucket=\"search.bucket\"\n" +
    "                        criteria=\"search.criteria\"\n" +
    "                        query=\"search.executedQuery\"\n" +
    "                        result=\"search.result\"\n" +
    "                        loading=\"search.loading\"\n" +
    "                        pagination=\"search.pagination\"\n" +
    "                        on-update-criteria=\"onUpdateCriteria\"\n" +
    "                        on-remove-criteria=\"onRemoveCriteria\"\n" +
    "                        on-type-changed=\"onTypeChanged\"\n" +
    "                        on-bucket-changed=\"onBucketChanged\"\n" +
    "                        on-paginate=\"onPaginate\"\n" +
    "                        search-tabs-order=\"searchTabsOrder\"\n" +
    "                        result-tabs-order=\"resultTabsOrder\"\n" +
    "                        lang=\"lang\"></result-panel>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/components/cart-documents-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/components/cart-documents-table/component.html",
    "<div>\n" +
    "  <div class=\"pull-left\" ng-show=\"$ctrl.documents.total>0\">\n" +
    "    <div ng-if=\"$ctrl.showAnalysis()\" class=\"btn-group\" uib-dropdown is-open=\"$ctrl.analysis.isopen\">\n" +
    "      <button id=\"single-button\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        <i class=\"fa fa-cog\"></i> {{'analysis.action' | translate}} <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "        <li role=\"menuitem\">\n" +
    "          <a href=\"\" ng-click=\"$ctrl.entitiesCount()\">\n" +
    "            {{'analysis.entities-count.action' | translate}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <a obiba-file-download url=\"$ctrl.download()\" target=\"_self\" download class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-download\"></i></a>\n" +
    "    <a href=\"\" ng-click=\"$ctrl.search()\" class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-search\"></i></a>\n" +
    "    <a href=\"\" ng-click=\"$ctrl.clearSet()\" class=\"action btn btn-danger btn-responsive\">\n" +
    "      <i class=\"fa fa-trash-o\"></i></a>\n" +
    "  </div>\n" +
    "  <div ng-show=\"$ctrl.pagination.totalHits > 0\" class=\"pull-right\">\n" +
    "    <span\n" +
    "          uib-pagination\n" +
    "          total-items=\"$ctrl.pagination.totalHits\"\n" +
    "          max-size=\"$ctrl.pagination.maxSize\"\n" +
    "          ng-model=\"$ctrl.pagination.currentPage\"\n" +
    "          boundary-links=\"true\"\n" +
    "          force-ellipses=\"true\"\n" +
    "          items-per-page=\"$ctrl.pagination.itemsPerPage\"\n" +
    "          previous-text=\"&lsaquo;\"\n" +
    "          next-text=\"&rsaquo;\"\n" +
    "          first-text=\"&laquo;\"\n" +
    "          last-text=\"&raquo;\"\n" +
    "          template-url=\"search/views/list/pagination-template.html\"\n" +
    "          ng-change=\"$ctrl.pageChanged()\"></span>\n" +
    "    <ul class=\"pagination pagination-sm\">\n" +
    "      <li>\n" +
    "        <a href class=\"pagination-total\">{{$ctrl.pagination.from}} - {{$ctrl.pagination.to}} {{'of' | translate}} {{$ctrl.pagination.totalHits}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "  <div class=\"table-responsive\">\n" +
    "    <table class=\"table table-bordered table-striped\" ng-if=\"$ctrl.documents.total>0\">\n" +
    "      <thead>\n" +
    "        <th style=\"width: 50px\">\n" +
    "            <input \n" +
    "            ng-model=\"$ctrl.allSelected\"\n" +
    "            type=\"checkbox\"\n" +
    "            ng-click=\"$ctrl.updateAllSelected()\"/>\n" +
    "        </th>\n" +
    "        <th translate>taxonomy.target.variable</th>\n" +
    "        <th translate>search.variable.label</th>\n" +
    "        <th ng-if=\"$ctrl.showVariableType()\" translate>type</th>\n" +
    "        <th ng-if=\"$ctrl.showStudies()\" translate>taxonomy.target.study</th>\n" +
    "        <th translate>taxonomy.target.dataset</th>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"row in $ctrl.table.rows\">\n" +
    "          <td>\n" +
    "              <input \n" +
    "              ng-model=\"$ctrl.selections[row[0].value]\"\n" +
    "              type=\"checkbox\"\n" +
    "              ng-click=\"$ctrl.updateSelection(row[0].value)\"/>\n" +
    "          </td>\n" +
    "          <td><a href=\"{{row[1].link}}\">{{row[1].value}}</a></td>\n" +
    "          <td>{{row[2].value}}</td>\n" +
    "          <td ng-if=\"$ctrl.showVariableType()\">{{'search.variable.' + row[3].value.toLowerCase() | translate}}</td>\n" +
    "          <td ng-if=\"$ctrl.showStudies()\"><a href=\"{{row[3].link}}\">{{row[4].value}}</a></td>\n" +
    "          <td><a href=\"{{row[5].link}}\">{{row[5].value}}</a></td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/views/cart.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/views/cart.html",
    "<div>\n" +
    "  <div ng-if=\"cartHeaderTemplateUrl\" ng-include=\"cartHeaderTemplateUrl\"></div>\n" +
    "  <h3>\n" +
    "    <span translate>variables</span>\n" +
    "    <span ng-if=\"loading\" class=\"voffset2 loading\"></span>\n" +
    "  </h3>\n" +
    "  <cart-documents-table \n" +
    "    type=\"'variables'\" \n" +
    "    documents=\"variables\"\n" +
    "    on-page-change=\"onPaginate\"></cart-documents-table>\n" +
    "  <p ng-hide=\"loading || variables && variables.total>0\" translate>sets.cart.no-variables</p>\n" +
    "</div>");
}]);

angular.module("utils/components/entity-schema-form/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/components/entity-schema-form/component.html",
    "<div sf-model=\"$ctrl.model\" sf-form=\"$ctrl.form.definition\" sf-schema=\"$ctrl.form.schema\" sf-options=\"$ctrl.sfOptions\"></div>");
}]);

angular.module("utils/services/user-profile-modal/service.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/services/user-profile-modal/service.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\"\n" +
    "      ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      {{'data-access-request.profile.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.name' | translate}}</th>\n" +
    "        <td>{{applicant.fullName}}</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.email' | translate}}</th>\n" +
    "        <td>{{applicant.email}}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"attribute in applicant.profile.attributes | filterProfileAttributes\">\n" +
    "          <th>{{\n" +
    "              ('userProfile.' + attribute.key | translate) !== ('userProfile.' + attribute.key) ?\n" +
    "              ('userProfile.' + attribute.key | translate) :\n" +
    "              (attribute.key)\n" +
    "              }}\n" +
    "          </th>\n" +
    "          <td>{{attribute.value}}</td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <a class=\"btn btn-default\" ng-if=\"applicant.email\" href=\"mailto:{{applicant.email}}\" target=\"_blank\">\n" +
    "      {{'data-access-request.profile.send-email' | translate}}</a>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\"\n" +
    "      ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.close\" translate>close</span>\n" +
    "      {{confirm.close}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("utils/views/unsaved-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/views/unsaved-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h4 class=\"modal-title\" translate>unsaved-title</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\" translate>\n" +
    "        unsaved-prompt\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\" translate>cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\" translate>ok</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/pagination-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<ul class=\"pagination no-margin pagination-sm\" ng-if=\"1 < pages.length\">\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(1)\">&laquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pagination.current - 1)\">&lsaquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pageNumber)\">{{ pageNumber }}</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pagination.current + 1)\">&rsaquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "    <a ng-class=\"round-border\" href=\"\" ng-click=\"setCurrent(pagination.last)\">&raquo;</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "\n" +
    "<ul class=\"pagination no-margin pagination-sm\" ng-if=\"1 < pages.length\">\n" +
    "  <li>\n" +
    "    <a href=\"\" class=\"pagination-total\" ng-if=\"1 < pages.length\" class=\"pagination-total\"><span>{{ range.lower }} - {{ range.upper }} </span><span translate>pagination.of</span><span> {{ range.total }}</span></a>\n" +
    "  </li>\n" +
    "</ul>");
}]);
