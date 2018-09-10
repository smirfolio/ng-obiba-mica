"use strict";

var ngObibaMica;

function NgObibaMicaTemplateUrlFactory() {
    var templates = {
        searchStudiesResultTable: "search/components/result/studies-result-table/component.html",
        searchNetworksResultTable: "search/components/result/networks-result-table/component.html",
        searchDatasetsResultTable: "search/components/result/datasets-result-table/component.html",
        searchCriteriaRegionTemplate: "search/components/criteria/item-region/region/component.html",
        vocabularyFilterDetailHeading: "search/components/vocabulary-filter-detail-heading/component.html",
        CriterionDropdownTemplate: "search/components/criteria/item-region/dropdown/component.html",
        searchResultList: "search/components/result/search-result/list.html",
        searchInputList: "lists/views/input-search-widget/input-search-widget-template.html",
        searchResultCoverage: "search/components/result/search-result/coverage.html",
        searchResultGraphics: "search/components/result/search-result/graphics.html",
        variableCrosstab: "analysis/crosstab/views/crosstab-variable-crosstab.html",
        variableFrequencies: "analysis/crosstab/views/crosstab-variable-frequencies.html",
        variableFrequenciesEmpty: "analysis/crosstab/views/crosstab-variable-frequencies-empty.html",
        variableStatistics: "analysis/crosstab/views/crosstab-variable-statistics.html",
        variableStatisticsEmpty: "analysis/crosstab/views/crosstab-variable-statistics-empty.html",
        searchCellStatValue: "search/components/result/cell-stat-value/component.html"
    };
    var factory = {
        registry: null
    };
    function TemplateUrlProvider(registry) {
        var urlRegistry = registry;
        this.getHeaderUrl = function(key) {
            if (key in urlRegistry) {
                return urlRegistry[key].header;
            }
            return null;
        };
        this.getFooterUrl = function(key) {
            if (key in urlRegistry) {
                return urlRegistry[key].footer;
            }
            return null;
        };
        this.getTemplateUrl = function(key) {
            if (key in urlRegistry) {
                return urlRegistry[key].template ? urlRegistry[key].template : templates[key];
            }
            return null;
        };
    }
    factory.setTemplateUrl = function(key, url) {
        if (key in this.registry) {
            this.registry[key].template = url;
        }
    };
    factory.setHeaderUrl = function(key, url) {
        if (key in this.registry) {
            this.registry[key].header = url;
        }
    };
    factory.setFooterUrl = function(key, url) {
        if (key in this.registry) {
            this.registry[key].footer = url;
        }
    };
    factory.$get = function() {
        return new TemplateUrlProvider(this.registry);
    };
    this.create = function(inputRegistry) {
        factory.registry = inputRegistry;
        return factory;
    };
}

(function() {
    ngObibaMica = angular.module("ngObibaMica", [ "schemaForm", "ngCookies", "obiba.mica.utils", "obiba.mica.file", "obiba.mica.attachment", "obiba.mica.access", "obiba.mica.search", "obiba.mica.analysis", "obiba.mica.graphics", "obiba.mica.localized", "obiba.mica.fileBrowser", "angularUtils.directives.dirPagination" ]);
    function ServerConfigResourceProvider() {
        var provider = this;
        function setFactory(value) {
            provider.$get = value;
        }
        provider.$get = function() {
            throw new Error("The provider factory method $get() must be overridden by client code.");
        };
        provider.setFactory = setFactory;
    }
    function NgObibaMicaUrlProvider() {
        var registry = {
            DataAccessClientDetailPath: "",
            DataAccessClientListPath: "",
            DataAccessFormConfigResource: "ws/config/data-access-form",
            DataAccessAmendmentFormConfigResource: "ws/config/data-access-amendment-form",
            DataAccessRequestsResource: "ws/data-access-requests",
            DataAccessAmendmentsResource: "ws/data-access-request/:parentId/amendments",
            DataAccessAmendmentResource: "ws/data-access-request/:parentId/amendment/:id",
            DataAccessRequestsExportHistoryResource: "ws/data-access-requests/_history?lang=:lang",
            DataAccessRequestsExportCsvResource: "ws/data-access-requests/csv?lang=:lang",
            DataAccessRequestResource: "ws/data-access-request/:id",
            DataAccessRequestActionLogsResource: "ws/data-access-request/:id/_log-actions",
            DataAccessAmendmentsLogHistoryResource: "/ws/data-access-request/:id/amendments/_history",
            DataAccessRequestAttachmentsUpdateResource: "/ws/data-access-request/:id/_attachments",
            DataAccessRequestAttachmentDownloadResource: "/ws/data-access-request/:id/attachments/:attachmentId/_download",
            SchemaFormAttachmentDownloadResource: "/ws/:path/form/attachments/:attachmentName/:attachmentId/_download",
            DataAccessRequestDownloadPdfResource: "/ws/data-access-request/:id/_pdf",
            DataAccessRequestCommentsResource: "ws/data-access-request/:id/comments?admin=:admin",
            DataAccessRequestCommentResource: "ws/data-access-request/:id/comment/:commentId",
            DataAccessRequestStatusResource: "ws/data-access-request/:id/_status?to=:status",
            DataAccessAmendmentStatusResource: "ws/data-access-request/:parentId/amendment/:id/_status?to=:status",
            TempFileUploadResource: "ws/files/temp",
            TempFileResource: "ws/files/temp/:id",
            TaxonomiesSearchResource: "ws/taxonomies/_search",
            TaxonomiesResource: "ws/taxonomies/_filter",
            TaxonomyResource: "ws/taxonomy/:taxonomy/_filter",
            VocabularyResource: "ws/taxonomy/:taxonomy/vocabulary/:vocabulary/_filter",
            VariableResource: "ws/variable/:id",
            VariableSummaryResource: "ws/variable/:id/summary",
            SetsResource: "ws/:type/sets",
            SetsImportResource: "ws/:type/sets/_import",
            SetResource: "ws/:type/set/:id",
            SetClearResource: "ws/:type/set/:id/documents",
            SetDocumentsResource: "ws/:type/set/:id/documents?from=:from&limit=:limit",
            SetExistsResource: "ws/:type/set/:id/document/:did/_exists",
            SetImportResource: "ws/:type/set/:id/documents/_import",
            SetImportQueryResource: "ws/:type/set/:id/documents/_rql",
            SetRemoveResource: "ws/:type/set/:id/documents/_delete",
            JoinQuerySearchResource: "ws/:type/_rql",
            JoinQuerySearchCsvResource: "ws/:type/_rql_csv?query=:query",
            JoinQuerySearchCsvReportResource: "ws/:type/_report?query=:query",
            JoinQuerySearchCsvReportByNetworkResource: "ws/:type/_report_by_network?networkId=:networkId&locale=:locale",
            JoinQueryCoverageResource: "ws/variables/_coverage",
            JoinQueryCoverageDownloadResource: "ws/variables/_coverage_download?query=:query",
            VariablePage: "",
            NetworkPage: "#/network/:network",
            StudyPage: "#/:type/:study",
            StudyPopulationsPage: "#/:type/:study",
            DatasetPage: "#/:type/:dataset",
            BaseUrl: "/",
            FileBrowserFileResource: "ws/file/:path/",
            FileBrowserSearchResource: "ws/files-search/:path",
            FileBrowserDownloadUrl: "ws/draft/file-dl/:path?inline=:inline",
            SearchBaseUrl: "#/search",
            DocumentSuggestion: "ws/:documentType/_suggest",
            EntitiesCountResource: "ws/datasets/entities/_count?query=:query",
            EntitiesCountBaseUrl: "#/entities-count",
            DatasetCategoricalVariablesResource: "ws/:dsType/:dsId/variables/:query/categorical",
            DatasetVariablesResource: "ws/:dsType/:dsId/variables/:query",
            DatasetVariableResource: "ws/variable/:varId",
            DatasetVariablesCrosstabResource: "ws/:dsType/:dsId/variables/cross/:v1/by/:v2",
            DatasetResource: "ws/dataset/:dsType/:dsId"
        };
        function UrlProvider(registry) {
            var urlRegistry = registry;
            this.getUrl = function(resource) {
                if (resource in urlRegistry) {
                    return urlRegistry[resource];
                }
                return null;
            };
        }
        this.setUrl = function(key, url) {
            if (key in registry) {
                registry[key] = url;
            }
        };
        this.$get = function() {
            return new UrlProvider(registry);
        };
    }
    ngObibaMica.constant("USER_ROLES", {
        all: "*",
        admin: "mica-administrator",
        reviewer: "mica-reviewer",
        editor: "mica-editor",
        user: "mica-user",
        dao: "mica-data-access-officer"
    }).config([ "$provide", "paginationTemplateProvider", function($provide, paginationTemplateProvider) {
        $provide.provider("ngObibaMicaUrl", NgObibaMicaUrlProvider);
        $provide.provider("ObibaServerConfigResource", ServerConfigResourceProvider);
        paginationTemplateProvider.setPath("views/pagination-template.html");
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.utils = angular.module("obiba.mica.utils", [ "schemaForm", "LocalStorageModule" ]);
    ngObibaMica.utils.factory("urlEncode", function() {
        return function(input) {
            return window.encodeURIComponent(input);
        };
    }).service("GraphicChartsConfigurations", function() {
        this.getClientConfig = function() {
            return true;
        };
        this.setClientConfig = function() {
            return true;
        };
    }).directive("fixedHeader", [ "$timeout", "$window", function($timeout, $window) {
        return {
            restrict: "A",
            scope: {
                tableMaxHeight: "@",
                trigger: "=fixedHeader"
            },
            link: function($scope, $elem) {
                var elem = $elem[0];
                function isVisible(el) {
                    var style = $window.getComputedStyle(el);
                    return style.display !== "none" && el.offsetWidth !== 0;
                }
                function isTableReady() {
                    return isVisible(elem.querySelector("tbody")) && elem.querySelector("tbody tr:first-child") !== null;
                }
                $scope.redraw = false;
                function redrawTable() {
                    if ($scope.redraw) {
                        return;
                    }
                    angular.element(elem.querySelectorAll("thead, tbody, tfoot")).css("display", "");
                    $timeout(function() {
                        $scope.redraw = true;
                        var totalColumnWidth = 0;
                        angular.forEach(elem.querySelectorAll("tr:first-child th"), function(thElem, i) {
                            var tdElems = elem.querySelector("tbody tr:first-child td:nth-child(" + (i + 1) + ")");
                            var tfElems = elem.querySelector("tfoot tr:first-child td:nth-child(" + (i + 1) + ")");
                            var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;
                            if (tdElems) {
                                tdElems.style.width = columnWidth + "px";
                            }
                            if (thElem) {
                                thElem.style.width = columnWidth + "px";
                            }
                            if (tfElems) {
                                tfElems.style.width = columnWidth + "px";
                            }
                            totalColumnWidth = totalColumnWidth + columnWidth;
                        });
                        angular.element(elem.querySelectorAll("thead, tfoot")).css("display", "block");
                        angular.element(elem.querySelectorAll("tbody")).css({
                            display: "block",
                            "max-height": $scope.tableMaxHeight || "inherit",
                            overflow: "auto"
                        });
                        if (totalColumnWidth < elem.offsetWidth) {
                            var last = elem.querySelector("tbody tr:first-child td:last-child");
                            if (last) {
                                last.style.width = last.offsetWidth + elem.offsetWidth - totalColumnWidth + "px";
                                last = elem.querySelector("thead tr:first-child th:last-child");
                                last.style.width = last.offsetWidth + elem.offsetWidth - totalColumnWidth + "px";
                            }
                        }
                        var tbody = elem.querySelector("tbody");
                        var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
                        if (scrollBarWidth > 0) {
                            var lastColumn = elem.querySelector("tbody tr:first-child td:last-child");
                            lastColumn.style.width = parseInt(lastColumn.style.width.replace("px", "")) - scrollBarWidth + "px";
                        }
                        $scope.redraw = false;
                    });
                }
                $scope.$watchGroup([ "trigger", isTableReady ], function(newValue) {
                    if (newValue[1] === true) {
                        redrawTable();
                    }
                });
                $scope.$watch(function() {
                    return elem.offsetWidth;
                }, function() {
                    redrawTable();
                });
            }
        };
    } ]).directive("routeChecker", [ "$route", function($route) {
        return {
            restrict: "A",
            scope: {
                routeCheckerHidesParent: "="
            },
            link: function(scope, elem, attrs) {
                var routeToCheck = attrs.ngHref.substr(1, attrs.ngHref.length - 1);
                var found = Object.keys($route.routes).filter(function(route) {
                    var regexp = $route.routes[route].regexp;
                    return regexp ? regexp.test(routeToCheck) : false;
                }).pop();
                if (!found) {
                    if (scope.routeCheckerHidesParent) {
                        elem.parent().hide();
                    } else {
                        elem.hide();
                    }
                }
            }
        };
    } ]).factory("FormDirtyStateObserver", [ "$uibModal", "$location", function($uibModal, $location) {
        var onLocationChangeOff;
        return {
            observe: function(scope) {
                if (onLocationChangeOff) {
                    onLocationChangeOff();
                }
                onLocationChangeOff = scope.$on("$locationChangeStart", function(event, newUrl) {
                    if (scope.form && scope.form.$dirty) {
                        $uibModal.open({
                            backdrop: "static",
                            controller: [ "$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
                                $scope.ok = function() {
                                    $uibModalInstance.close(true);
                                };
                                $scope.cancel = function() {
                                    $uibModalInstance.dismiss("cancel");
                                };
                            } ],
                            templateUrl: "utils/views/unsaved-modal.html"
                        }).result.then(function(answer) {
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
            unobserve: function() {
                if (onLocationChangeOff) {
                    onLocationChangeOff();
                }
            }
        };
    } ]).service("SfOptionsService", [ "$translate", "$q", function($translate, $q) {
        var validationMessages = [ "required", "errors.does-not-validate", "errors.localized.completed" ];
        this.transform = function() {
            var deferred = $q.defer();
            $translate(validationMessages).then(function(result) {
                deferred.resolve({
                    validationMessage: {
                        302: result.required,
                        default: result["errors.does-not-validate"],
                        completed: result["errors.localized.completed"]
                    }
                });
            });
            return deferred.promise;
        };
    } ]).config([ "schemaFormProvider", function(schemaFormProvider) {
        schemaFormProvider.postProcess(function(form) {
            form.filter(function(e) {
                return e.hasOwnProperty("wordLimit");
            }).forEach(function(e) {
                e.$validators = {
                    wordLimitError: function(value) {
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
    } ]).config([ "localStorageServiceProvider", function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("mica").setStorageType("localStorage");
    } ]);
})();

"use strict";

var UserProfileService = function() {
    function UserProfileService() {}
    UserProfileService.prototype.getAttribute = function(attributes, key) {
        return this.getAttibuteValue(attributes, key);
    };
    UserProfileService.prototype.getFullName = function(profile) {
        var firstName = this.getProfileAttributeValue(profile, "firstName");
        var lastName = this.getProfileAttributeValue(profile, "lastName");
        return firstName && lastName ? firstName + " " + lastName : null;
    };
    UserProfileService.prototype.getEmail = function(profile) {
        return this.getProfileAttributeValue(profile, "email");
    };
    UserProfileService.prototype.getProfileAttributeValue = function(profile, key) {
        if (profile) {
            return this.getAttibuteValue(profile.attributes, key);
        }
        return null;
    };
    UserProfileService.prototype.getAttibuteValue = function(attributes, key) {
        if (attributes) {
            var result = attributes.filter(function(attribute) {
                return attribute.key === key;
            });
            return result && result.length > 0 ? result[0].value : null;
        }
        return null;
    };
    return UserProfileService;
}();

ngObibaMica.utils.service("UserProfileService", UserProfileService);

"use strict";

var UserProfileModalService = function() {
    function UserProfileModalService($uibModal, UserProfileService) {
        this.$uibModal = $uibModal;
        this.UserProfileService = UserProfileService;
    }
    UserProfileModalService.prototype.show = function(profile) {
        var applicant = {
            email: this.UserProfileService.getEmail(profile),
            fullName: this.UserProfileService.getFullName(profile),
            profile: profile
        };
        this.$uibModal.open({
            controller: [ "$scope", function($scope) {
                return $scope.applicant = applicant;
            } ],
            templateUrl: "utils/services/user-profile-modal/service.html"
        });
    };
    UserProfileModalService.$inject = [ "$uibModal", "UserProfileService" ];
    return UserProfileModalService;
}();

ngObibaMica.utils.service("UserProfileModalService", UserProfileModalService);

"use strict";

var CustomWatchDomElementService = function() {
    function CustomWatchDomElementService() {
        this.attributes = [];
        var that = this;
    }
    CustomWatchDomElementService.prototype.configWatch = function(node, attributes) {
        this.node = node;
        this.attributes = attributes;
        this.config = {
            attributeFilter: this.attributes
        };
        return this;
    };
    CustomWatchDomElementService.prototype.customWatch = function(callback) {
        var observable = function(mutationsList) {
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
}();

ngObibaMica.utils.service("CustomWatchDomElementService", [ CustomWatchDomElementService ]);

"use strict";

(function() {
    function Controller($rootScope, $timeout, LocalizedSchemaFormService, SfOptionsService, JsonUtils) {
        var ctrl = this, scope = $rootScope.$new();
        ctrl.form = {};
        ctrl.sfOptions = {};
        function broadcastSchemaFormRedraw() {
            $timeout(function() {
                ctrl.form = angular.copy(ctrl.form);
                scope.$broadcast("schemaFormRedraw");
                callOnRedraw(true);
            }, 250);
        }
        function validateSchemaParsing(schema, parseErrorCallback) {
            if (Object.getOwnPropertyNames(schema).length === 0) {
                schema = {};
                if (typeof parseErrorCallback === "function") {
                    parseErrorCallback();
                }
            }
            return schema;
        }
        function validateDefinitionParsing(definition, parseErrorCallback) {
            if (definition.length === 0) {
                definition = [];
                if (typeof parseErrorCallback === "function") {
                    parseErrorCallback();
                }
            }
            return definition;
        }
        function getParsingErrorCallback(type) {
            if (typeof ctrl.parsingErrorCallbacks !== "object") {
                return function() {
                    console.error("Error parsing ", type, ctrl.schemaForm);
                };
            }
            return ctrl.parsingErrorCallbacks[type];
        }
        function callOnRedraw(value) {
            if (typeof ctrl.onRedraw === "function") {
                ctrl.onRedraw(value);
            }
        }
        function onChanges(changes) {
            if (changes && changes.schemaForm && changes.schemaForm.currentValue) {
                callOnRedraw(false);
                var form = changes.schemaForm.currentValue;
                ctrl.form.definition = validateDefinitionParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.definition, [])), getParsingErrorCallback("definition"));
                ctrl.form.schema = validateSchemaParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.schema, {})), getParsingErrorCallback("schema"));
                ctrl.form.downloadTemplate = form.pdfDownloadType === "Template";
                ctrl.form.schema.readonly = ctrl.readOnly;
            }
            broadcastSchemaFormRedraw();
        }
        SfOptionsService.transform().then(function(options) {
            ctrl.sfOptions = options;
            ctrl.sfOptions.pristine = {
                errors: true,
                success: false
            };
        });
        ctrl.$onChanges = onChanges;
    }
    angular.module("obiba.mica.utils").component("obibaSchemaFormRenderer", {
        bindings: {
            schemaForm: "<",
            model: "<",
            readOnly: "<",
            parsingErrorCallbacks: "<",
            onRedraw: "<"
        },
        templateUrl: "utils/components/entity-schema-form/component.html",
        controller: [ "$rootScope", "$timeout", "LocalizedSchemaFormService", "SfOptionsService", "JsonUtils", Controller ]
    });
})();

"use strict";

ngObibaMica.file = angular.module("obiba.mica.file", [ "ngResource" ]);

"use strict";

ngObibaMica.file.filter("bytes", function() {
    return function(bytes) {
        return bytes === null || typeof bytes === "undefined" ? "" : filesize(bytes);
    };
});

"use strict";

ngObibaMica.file.factory("TempFileResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("TempFileResource"), {}, {
        get: {
            method: "GET"
        },
        delete: {
            method: "DELETE"
        }
    });
} ]);

"use strict";

ngObibaMica.attachment = angular.module("obiba.mica.attachment", [ "obiba.mica.file", "ui.bootstrap", "ngFileUpload", "templates-ngObibaMica" ]);

"use strict";

ngObibaMica.attachment.directive("attachmentList", [ function() {
    return {
        restrict: "E",
        scope: {
            hrefBuilder: "=",
            files: "=",
            emptyMessage: "="
        },
        templateUrl: "attachment/attachment-list-template.html",
        link: function(scope) {
            scope.attachments = [];
            scope.hrefBuilder = scope.hrefBuilder || function(a) {
                return a.id;
            };
            scope.hasAttachments = false;
            scope.$watch("files", function(val) {
                if (val) {
                    scope.hasAttachments = val.length > 0;
                    scope.attachments = val.map(function(a) {
                        var temp = angular.copy(a);
                        temp.href = scope.hrefBuilder(a);
                        return temp;
                    });
                }
            }, true);
        }
    };
} ]).directive("attachmentInput", [ function() {
    return {
        restrict: "E",
        require: "^form",
        scope: {
            multiple: "=",
            accept: "@",
            files: "=",
            disabled: "=",
            onError: "=",
            deleteAttachments: "<"
        },
        templateUrl: "attachment/attachment-input-template.html",
        controller: "AttachmentCtrl"
    };
} ]).controller("AttachmentCtrl", [ "$scope", "$timeout", "$log", "Upload", "TempFileResource", "ngObibaMicaUrl", function($scope, $timeout, $log, Upload, TempFileResource, ngObibaMicaUrl) {
    if ($scope.deleteAttachments === undefined || $scope.deleteAttachments === null) {
        $scope.deleteAttachments = true;
    }
    var uploadFile = function(file) {
        $scope.files = $scope.files || [];
        var attachment = {
            showProgressBar: true,
            lang: "en",
            progress: 0,
            fileName: file.name,
            size: file.size
        };
        if ($scope.multiple) {
            $scope.files.push(attachment);
        } else {
            $scope.files.splice(0, $scope.files.length);
            $scope.files.push(attachment);
        }
        $scope.upload = Upload.upload({
            url: ngObibaMicaUrl.getUrl("TempFileUploadResource"),
            method: "POST",
            file: file
        }).progress(function(evt) {
            attachment.progress = parseInt(100 * evt.loaded / evt.total);
        }).success(function(data, status, getResponseHeaders) {
            var parts = getResponseHeaders().location.split("/");
            var fileId = parts[parts.length - 1];
            TempFileResource.get({
                id: fileId
            }, function(tempFile) {
                $log.debug("tempFile", tempFile);
                attachment.id = tempFile.id;
                attachment.md5 = tempFile.md5;
                attachment.justUploaded = true;
                attachment.timestamps = {
                    created: new Date()
                };
                $timeout(function() {
                    attachment.showProgressBar = false;
                }, 1e3);
            });
        }).error(function(response) {
            $log.error("File upload failed: ", JSON.stringify(response, null, 2));
            var index = $scope.files.indexOf(attachment);
            if (index !== -1) {
                $scope.files.splice(index, 1);
            }
            if ($scope.onError) {
                $scope.onError(attachment);
            }
        });
    };
    $scope.onFileSelect = function(file) {
        $scope.uploadedFiles = file;
        $scope.uploadedFiles.forEach(function(f) {
            uploadFile(f);
        });
    };
    $scope.deleteTempFile = function(tempFileId) {
        TempFileResource.delete({
            id: tempFileId
        }, function() {
            for (var i = $scope.files.length; i--; ) {
                var attachment = $scope.files[i];
                if (attachment.justUploaded && attachment.id === tempFileId) {
                    $scope.files.splice(i, 1);
                }
            }
        });
    };
    $scope.deleteFile = function(fileId) {
        for (var i = $scope.files.length; i--; ) {
            if ($scope.files[i].id === fileId) {
                $scope.files.splice(i, 1);
            }
        }
    };
} ]);

"use strict";

ngObibaMica.access = angular.module("obiba.mica.access", [ "pascalprecht.translate", "ui.bootstrap", "obiba.alert", "obiba.comments", "obiba.mica.attachment", "obiba.utils", "angularMoment", "templates-ngObibaMica" ]);

ngObibaMica.access.config([ "$provide", function($provide) {
    $provide.provider("ngObibaMicaAccessTemplateUrl", new NgObibaMicaTemplateUrlFactory().create({
        list: {
            header: null,
            footer: null
        },
        view: {
            header: null,
            footer: null
        },
        form: {
            header: null,
            footer: null
        },
        amendmentView: {
            header: null,
            footer: null
        },
        amendmentForm: {
            header: null,
            footer: null
        }
    }));
} ]);

"use strict";

(function() {
    function ActionLogEditorController(SessionProxy, $filter) {
        var ctrl = this;
        ctrl.filterOutItemFromCollection = function(item, collection) {
            return (collection || []).filter(function(element) {
                return element.action !== item.action || element.author !== item.author || element.changedOn !== item.changedOn;
            });
        };
        ctrl.sourceCollectionWithout = function(item) {
            return ctrl.filterOutItemFromCollection(item, ctrl.sourceCollection);
        };
        ctrl.replaceActionNameByTranslationKey = function(item) {
            var index = (ctrl.predefinedActionNames || []).indexOf(item.action);
            if (index > -1) {
                item.action = ctrl.predefinedActions[index];
            }
        };
        ctrl.add = function(item) {
            ctrl.showError = false;
            if (item && item.action && item.changedOn) {
                ctrl.replaceActionNameByTranslationKey(item);
                item.changedOn = item.changedOn.toISOString();
                if (!item.author) {
                    item.author = SessionProxy.login();
                }
                var result = ctrl.sourceCollectionWithout(item);
                result.push(item);
                if (ctrl.update && typeof ctrl.update === "function") {
                    ctrl.update({
                        logs: result
                    });
                    ctrl.item = {};
                    ctrl.changedOn = null;
                } else {
                    console.error("Did not create", item);
                }
            } else {
                ctrl.showError = true;
            }
        };
        ctrl.predefinedActionsChanged = function(changes) {
            if (changes.predefinedActions && changes.predefinedActions.currentValue) {
                ctrl.predefinedActionNames = ctrl.predefinedActions.map(function(actionKey) {
                    return $filter("translate")(actionKey);
                });
            }
        };
        ctrl.$onChanges = function(changes) {
            ctrl.predefinedActionsChanged(changes);
        };
    }
    function ActionLogItemEditorController(SessionProxy, $uibModal, $filter) {
        var ctrl = this;
        ActionLogEditorController.call(ctrl, SessionProxy, $filter);
        function isAnActionLog(item) {
            return item && item.hasOwnProperty("action") && item.hasOwnProperty("author") && item.hasOwnProperty("changedOn");
        }
        ctrl.remove = function(item) {
            $uibModal.open({
                templateUrl: "access/components/action-log/item/delete-modal.html",
                controller: [ "$uibModalInstance", "actionLogItem", function($uibModalInstance, actionLogItem) {
                    this.item = actionLogItem;
                } ],
                controllerAs: "$modal",
                resolve: {
                    actionLogItem: function() {
                        return {
                            action: $filter("translate")(item.action),
                            author: item.author,
                            changedOn: moment(item.changedOn).calendar()
                        };
                    }
                }
            }).result.then(function() {
                var result = ctrl.sourceCollectionWithout(item);
                if (result.length < ctrl.sourceCollection.length && (ctrl.update && typeof ctrl.update === "function")) {
                    ctrl.update({
                        logs: result
                    });
                } else {
                    console.error("Did not remove", item);
                }
            });
        };
        ctrl.edit = function(item) {
            $uibModal.open({
                templateUrl: "access/components/action-log/item/edit-modal.html",
                controller: [ "$uibModalInstance", "actionLogItem", "predefinedActionNames", function($uibModalInstance, actionLogItem, predefinedActionNames) {
                    this.item = actionLogItem;
                    this.predefinedActionNames = predefinedActionNames;
                } ],
                controllerAs: "$modal",
                size: "sm",
                resolve: {
                    actionLogItem: function() {
                        return {
                            action: $filter("translate")(item.action),
                            author: item.author,
                            changedOn: new Date(item.changedOn)
                        };
                    },
                    predefinedActionNames: function() {
                        return ctrl.predefinedActionNames;
                    }
                }
            }).result.then(function(editionResult) {
                ctrl.replaceActionNameByTranslationKey(editionResult);
                editionResult.changedOn = editionResult.changedOn.toISOString();
                if (ctrl.update && typeof ctrl.update === "function") {
                    var result = ctrl.sourceCollectionWithout(item);
                    result = ctrl.filterOutItemFromCollection(editionResult, result);
                    result.push(editionResult);
                    ctrl.update({
                        logs: result
                    });
                } else {
                    console.error("Did not update", item);
                }
            });
        };
        ctrl.$onChanges = function(changes) {
            ctrl.predefinedActionsChanged(changes);
            ctrl.showButtons = ctrl.item && isAnActionLog(ctrl.item);
        };
    }
    angular.module("obiba.mica.access").component("actionLogEditor", {
        bindings: {
            sourceCollection: "<",
            predefinedActions: "<",
            update: "&"
        },
        templateUrl: "access/components/action-log/component.html",
        controller: [ "SessionProxy", "$filter", ActionLogEditorController ]
    });
    angular.module("obiba.mica.access").component("actionLogItemEditor", {
        bindings: {
            item: "<",
            sourceCollection: "<",
            predefinedActions: "<",
            update: "&"
        },
        templateUrl: "access/components/action-log/item/component.html",
        controller: [ "SessionProxy", "$uibModal", "$filter", ActionLogItemEditorController ]
    });
})();

"use strict";

(function() {
    function Controller($rootScope, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS, SessionProxy, USER_ROLES, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, ngObibaMicaUrl, $translate, UserProfileService, UserProfileModalService) {
        var ctrl = this;
        function initializeAddButtonCaption() {
            return ctrl.parentId === null ? ctrl.config.newRequestButtonCaption || "data-access-request.add" : "data-access-amendment.add";
        }
        function initializeNoneCaption() {
            return ctrl.parentId === null ? "data-access-request.none" : "data-access-amendment.none";
        }
        function onInit() {
            ctrl.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("list");
            ctrl.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("list");
            ctrl.config = DataAccessRequestConfig.getOptions();
            ctrl.searchStatus = {};
            ctrl.loading = true;
            ctrl.addButtonCaption = initializeAddButtonCaption();
            ctrl.noneCaption = initializeNoneCaption();
            ctrl.actions = DataAccessEntityService.actions;
            ctrl.showApplicant = SessionProxy.roles().filter(function(role) {
                return [ USER_ROLES.dao, USER_ROLES.admin ].indexOf(role) > -1;
            }).length > 0;
            var emitter = $rootScope.$new();
            ctrl.$on = angular.bind(emitter, emitter.$on);
            ctrl.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onConfirmDelete);
            DataAccessEntityService.getStatusFilterData(function(translated) {
                ctrl.REQUEST_STATUS = translated;
            });
        }
        function onSuccess(reqs) {
            for (var i = 0; i < reqs.length; i++) {
                var req = reqs[i];
                if (req.status !== "OPENED") {
                    for (var j = 0; j < req.statusChangeHistory.length; j++) {
                        var change = req.statusChangeHistory[j];
                        if (change.from === "OPENED" && change.to === "SUBMITTED") {
                            req.submissionDate = change.changedOn;
                        }
                    }
                }
            }
            ctrl.requests = reqs;
            ctrl.loading = false;
        }
        var onError = function() {
            ctrl.loading = false;
        };
        function onChanges(changed) {
            if (changed.parentId && changed.parentId.currentValue !== undefined) {
                if (changed.parentId.currentValue === null) {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessRequestsUrl();
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessRequestBaseUrl();
                } else {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessAmendmentsUrl(ctrl.parentId);
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessAmendmentBaseUrl(ctrl.parentId);
                }
                DataAccessEntityResource.list(ctrl.listUrl).$promise.then(onSuccess, onError);
            }
        }
        function deleteRequest(request) {
            ctrl.requestToDelete = request.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: "data-access-request.delete-dialog.title",
                messageKey: "data-access-request.delete-dialog.message",
                messageArgs: [ request.title, request.applicant ]
            }, request.id);
        }
        function getCsvExportHref() {
            return ngObibaMicaUrl.getUrl("DataAccessRequestsExportCsvResource").replace(":lang", $translate.use());
        }
        function getHistoryExportHref() {
            return ngObibaMicaUrl.getUrl("DataAccessRequestsExportHistoryResource").replace(":lang", $translate.use());
        }
        function getDataAccessRequestPageUrl() {
            var DataAccessClientDetailPath = ngObibaMicaUrl.getUrl("DataAccessClientDetailPath");
            if (DataAccessClientDetailPath) {
                return ngObibaMicaUrl.getUrl("BaseUrl") + ngObibaMicaUrl.getUrl("DataAccessClientDetailPath");
            } else {
                return null;
            }
        }
        function onConfirmDelete(event, id) {
            if (ctrl.requestToDelete === id) {
                DataAccessEntityResource.delete(ctrl.entityBaseUrl, ctrl.requestToDelete).$promise.then(function() {
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
    ngObibaMica.access.component("entityList", {
        bindings: {
            parentId: "<",
            canAdd: "<"
        },
        templateUrl: "access/components/entity-list/component.html",
        controller: [ "$rootScope", "DataAccessEntityUrls", "DataAccessEntityResource", "DataAccessEntityService", "NOTIFICATION_EVENTS", "SessionProxy", "USER_ROLES", "ngObibaMicaAccessTemplateUrl", "DataAccessRequestConfig", "ngObibaMicaUrl", "$translate", "UserProfileService", "UserProfileModalService", Controller ]
    });
})();

"use strict";

var PrintFriendlyController = function() {
    function PrintFriendlyController() {}
    return PrintFriendlyController;
}();

var PrintFriendlyComponent = function() {
    function PrintFriendlyComponent() {
        this.transclude = true;
        this.bindings = {
            accessForm: "<",
            lastSubmittedDate: "<",
            model: "<",
            project: "<",
            validForm: "<"
        };
        this.controller = PrintFriendlyController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "access/components/print-friendly-view/component.html";
    }
    return PrintFriendlyComponent;
}();

ngObibaMica.access.component("printFriendlyView", new PrintFriendlyComponent());

"use strict";

(function() {
    function Service($rootScope, $filter, $location, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS) {
        this.for = function(scope, accessEntity, successCallback, errorCallback) {
            var self = {};
            var parentId = accessEntity["obiba.mica.DataAccessAmendmentDto.amendment"].parentId;
            var entityRootpath = parentId ? DataAccessEntityUrls.getDataAccessAmendmentUrl(parentId, accessEntity.id) : DataAccessEntityUrls.getDataAccessRequestUrl(accessEntity.id);
            var prefix = parentId ? "data-access-amendment" : "data-access-request";
            function confirmStatusChange(status, messageKey, statusName) {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + ".status-change-confirmation.title",
                    messageKey: messageKey !== null ? messageKey : prefix + ".status-change-confirmation.message",
                    messageArgs: statusName !== null ? [ $filter("translate")(statusName).toLowerCase() ] : []
                }, status);
            }
            function statusChangedConfirmed(status, expectedStatus) {
                if (status === expectedStatus) {
                    DataAccessEntityResource.updateStatus(entityRootpath, accessEntity.id, status).$promise.then(successCallback, errorCallback);
                }
            }
            function onDeleteConfirmed(event, id) {
                if (accessEntity.id === id) {
                    DataAccessEntityResource.delete(entityRootpath, id).$promise.then(function() {
                        $location.path(parentId ? "/data-access-request/" + parentId : "/data-access-requests").replace();
                    });
                }
            }
            self.reopen = function() {
                confirmStatusChange(DataAccessEntityService.status.OPENED, null, "reopen");
            };
            self.review = function() {
                confirmStatusChange(DataAccessEntityService.status.REVIEWED, prefix + ".status-change-confirmation.message-review", null);
            };
            self.approve = function() {
                confirmStatusChange(DataAccessEntityService.status.APPROVED, null, "approve");
            };
            self.reject = function() {
                confirmStatusChange(DataAccessEntityService.status.REJECTED, null, "reject");
            };
            self.conditionallyApprove = function() {
                confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, "conditionallyApprove");
            };
            self.delete = function() {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + ".delete-dialog.title",
                    messageKey: prefix + ".delete-dialog.message",
                    messageArgs: [ accessEntity.title, accessEntity.applicant ]
                }, accessEntity.id);
            };
            self.printForm = function() {
                setTimeout(function() {
                    window.print();
                }, 250);
            };
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function(event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function(event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function(event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function(event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function(event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
            });
            return self;
        };
    }
    angular.module("obiba.mica.access").service("DataAccessEntityFormService", [ "$rootScope", "$filter", "$location", "DataAccessEntityUrls", "DataAccessEntityResource", "DataAccessEntityService", "NOTIFICATION_EVENTS", Service ]);
})();

"use strict";

var DataAccessEntityResource = function() {
    function DataAccessEntityResource(DataAccessRequestsResource, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessAmendmentResource, DataAccessRequestStatusResource, DataAccessAmendmentStatusResource) {
        this.DataAccessRequestsResource = DataAccessRequestsResource;
        this.DataAccessRequestResource = DataAccessRequestResource;
        this.DataAccessAmendmentsResource = DataAccessAmendmentsResource;
        this.DataAccessAmendmentResource = DataAccessAmendmentResource;
        this.DataAccessRequestStatusResource = DataAccessRequestStatusResource;
        this.DataAccessAmendmentStatusResource = DataAccessAmendmentStatusResource;
    }
    DataAccessEntityResource.prototype.list = function(listUrl) {
        var parentId = this.getParentId(listUrl);
        return parentId ? this.DataAccessAmendmentsResource.query({
            parentId: parentId
        }) : this.DataAccessRequestsResource.query();
    };
    DataAccessEntityResource.prototype.create = function(listUrl, data, successCallback, errorCallback) {
        var parentId = this.getParentId(listUrl);
        return parentId ? this.DataAccessAmendmentsResource.save(data, successCallback, errorCallback) : this.DataAccessRequestsResource.save(data, successCallback, errorCallback);
    };
    DataAccessEntityResource.prototype.update = function(entityRootPath, data) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ? this.DataAccessAmendmentResource.save(data) : this.DataAccessRequestResource.save(data);
    };
    DataAccessEntityResource.prototype.get = function(entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ? this.DataAccessAmendmentResource.get({
            parentId: parentId,
            id: id
        }) : this.DataAccessRequestResource.get({
            id: id
        });
    };
    DataAccessEntityResource.prototype.delete = function(entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ? this.DataAccessAmendmentResource.delete({
            parentId: parentId,
            id: id
        }) : this.DataAccessRequestResource.delete({
            id: id
        });
    };
    DataAccessEntityResource.prototype.updateStatus = function(entityRootPath, id, status) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ? this.DataAccessAmendmentStatusResource.update({
            parentId: parentId,
            id: id,
            status: status
        }) : this.DataAccessRequestStatusResource.update({
            id: id,
            status: status
        });
    };
    DataAccessEntityResource.prototype.getParentId = function(url) {
        var parentId = /data-access-request\/(\w+)(?:\/amendment)?/.exec(url);
        return parentId && parentId.length === 2 ? parentId[parentId.index] : null;
    };
    DataAccessEntityResource.$inject = [ "DataAccessRequestsResource", "DataAccessRequestResource", "DataAccessAmendmentsResource", "DataAccessAmendmentResource", "DataAccessRequestStatusResource", "DataAccessAmendmentStatusResource" ];
    return DataAccessEntityResource;
}();

ngObibaMica.access.service("DataAccessEntityResource", DataAccessEntityResource);

"use strict";

(function() {
    function DataAccessEntityService($translate, SessionProxy, USER_ROLES, ngObibaMicaUrl) {
        var statusList = {
            OPENED: "OPENED",
            SUBMITTED: "SUBMITTED",
            REVIEWED: "REVIEWED",
            CONDITIONALLY_APPROVED: "CONDITIONALLY_APPROVED",
            APPROVED: "APPROVED",
            REJECTED: "REJECTED"
        };
        var actions = {
            canViewProfile: function(role) {
                var found = false;
                var currentUserRoles = SessionProxy.roles();
                angular.forEach(currentUserRoles, function(value) {
                    if (value === role || value === USER_ROLES.admin) {
                        found = true;
                    }
                });
                return found;
            },
            canView: function(request) {
                return canDoAction(request, "VIEW");
            },
            canEdit: function(request) {
                return canDoAction(request, "EDIT");
            },
            canEditStatus: function(request) {
                return canDoAction(request, "EDIT_STATUS");
            },
            canDelete: function(request) {
                return canDoAction(request, "DELETE");
            },
            canEditAttachments: function(request) {
                return canDoAction(request, "EDIT_ATTACHMENTS");
            },
            canDeleteAttachments: function(request) {
                return canDoAction(request, "DELETE_ATTACHMENTS");
            },
            canAddAmendments: function(request) {
                return request["obiba.mica.DataAccessAmendmentDto.amendment"] ? true : canDoAction(request, "ADD_AMENDMENTS");
            },
            canEditActionLogs: function(request) {
                return canDoAction(request, "EDIT_ACTION_LOGS");
            },
            canViewPrivateComments: function(request) {
                return canDoAction(request, "VIEW_PRIVATE_COMMENTS");
            },
            canAddPrivateComments: function(request) {
                return canDoAction(request, "ADD_PRIVATE_COMMENTS");
            }
        };
        var nextStatus = {
            canSubmit: function(request) {
                return canChangeStatus(request, "SUBMITTED");
            },
            canReopen: function(request) {
                return canChangeStatus(request, "OPENED");
            },
            canReview: function(request) {
                return canChangeStatus(request, "REVIEWED");
            },
            canConditionallyApprove: function(request) {
                return canChangeStatus(request, "CONDITIONALLY_APPROVED");
            },
            canApprove: function(request) {
                return canChangeStatus(request, "APPROVED");
            },
            canReject: function(request) {
                return canChangeStatus(request, "REJECTED");
            }
        };
        function getStatusFilterData(userCallback) {
            if (userCallback) {
                $translate(Object.keys(statusList)).then(function(translation) {
                    userCallback(Object.keys(translation).map(function(key) {
                        return {
                            key: key,
                            translation: translation[key]
                        };
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
            var id = "opened";
            if (log.action) {
                id = "action";
            } else if (log.from !== "OPENED" || log.from !== log.to) {
                switch (log.to) {
                  case "OPENED":
                    id = "reopened";
                    break;

                  case "SUBMITTED":
                    id = "submitted";
                    break;

                  case "REVIEWED":
                    id = "reviewed";
                    break;

                  case "CONDITIONALLY_APPROVED":
                    id = "conditionallyApproved";
                    break;

                  case "APPROVED":
                    id = "approved";
                    break;

                  case "REJECTED":
                    id = "rejected";
                    break;
                }
            }
            return id;
        }
        function processLogsHistory(logs) {
            return (logs || []).map(function(log) {
                switch (getHistoryLogId(log)) {
                  case "opened":
                    log.msg = "data-access-request.histories.opened";
                    log.icon = "glyphicon glyphicon-saved";
                    break;

                  case "reopened":
                    log.msg = "data-access-request.histories.reopened";
                    log.icon = "glyphicon glyphicon-saved";
                    break;

                  case "submitted":
                    log.msg = "data-access-request.histories.submitted";
                    log.icon = "glyphicon glyphicon-export";
                    break;

                  case "reviewed":
                    log.msg = "data-access-request.histories.reviewed";
                    log.icon = "glyphicon glyphicon-check";
                    break;

                  case "conditionallyApproved":
                    log.msg = "data-access-request.histories.conditionallyApproved";
                    log.icon = "glyphicon glyphicon-unchecked";
                    break;

                  case "approved":
                    log.msg = "data-access-request.histories.approved";
                    log.icon = "glyphicon glyphicon-ok";
                    break;

                  case "rejected":
                    log.msg = "data-access-request.histories.rejected";
                    log.icon = "glyphicon glyphicon-remove";
                    break;

                  case "action":
                    log.msg = log.action;
                    log.icon = "glyphicon glyphicon-play-circle";
                    log.changedOn = new Date(log.changedOn).toISOString();
                    break;
                }
                return log;
            });
        }
        function getListDataAccessRequestPageUrl() {
            var DataAccessClientListPath = ngObibaMicaUrl.getUrl("DataAccessClientListPath");
            if (DataAccessClientListPath) {
                return ngObibaMicaUrl.getUrl("BaseUrl") + ngObibaMicaUrl.getUrl("DataAccessClientListPath");
            } else {
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
    ngObibaMica.access.service("DataAccessEntityService", [ "$translate", "SessionProxy", "USER_ROLES", "ngObibaMicaUrl", DataAccessEntityService ]);
})();

"use strict";

var DataAccessEntityUrls = function() {
    function DataAccessEntityUrls() {}
    DataAccessEntityUrls.prototype.getDataAccessRequestsUrl = function() {
        return "/data-access-requests";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestBaseUrl = function() {
        return "/data-access-request";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestUrl = function(id) {
        return this.getDataAccessRequestBaseUrl() + "/" + id;
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentsUrl = function(parentId) {
        return "/data-access-request/" + parentId + "/amendments";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentBaseUrl = function(parentId) {
        return "/data-access-request/" + parentId + "/amendment";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentUrl = function(parentId, id) {
        return this.getDataAccessAmendmentBaseUrl(parentId) + "/" + id;
    };
    return DataAccessEntityUrls;
}();

ngObibaMica.access.service("DataAccessEntityUrls", DataAccessEntityUrls);

"use strict";

ngObibaMica.access.controller("DataAccessRequestListController", [ "$scope", "ngObibaMicaAccessTemplateUrl", function($scope, ngObibaMicaAccessTemplateUrl) {
    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("list");
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("list");
} ]).controller("DataAccessRequestViewController", [ "$rootScope", "$scope", "$q", "$location", "$uibModal", "$routeParams", "$filter", "$translate", "DataAccessRequestResource", "DataAccessAmendmentsResource", "DataAccessEntityService", "DataAccessRequestStatusResource", "DataAccessFormConfigResource", "DataAccessRequestAttachmentsUpdateResource", "DataAccessRequestCommentsResource", "DataAccessRequestCommentResource", "ngObibaMicaUrl", "ngObibaMicaAccessTemplateUrl", "AlertService", "ServerErrorUtils", "NOTIFICATION_EVENTS", "DataAccessRequestConfig", "SfOptionsService", "moment", "UserProfileService", function($rootScope, $scope, $q, $location, $uibModal, $routeParams, $filter, $translate, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessEntityService, DataAccessRequestStatusResource, DataAccessFormConfigResource, DataAccessRequestAttachmentsUpdateResource, DataAccessRequestCommentsResource, DataAccessRequestCommentResource, ngObibaMicaUrl, ngObibaMicaAccessTemplateUrl, AlertService, ServerErrorUtils, NOTIFICATION_EVENTS, DataAccessRequestConfig, SfOptionsService, moment, UserProfileService) {
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
            id: "DataAccessRequestViewController",
            type: "danger",
            msg: ServerErrorUtils.buildMessage(response)
        });
    }
    function onAttachmentError(attachment) {
        AlertService.alert({
            id: "DataAccessRequestViewController",
            type: "danger",
            msgKey: "server.error.file.upload",
            msgArgs: [ attachment.fileName ]
        });
    }
    function retrieveComments() {
        DataAccessRequestCommentsResource.query({
            id: $routeParams.id,
            admin: $scope.privateComments === true ? true : ""
        }, function(comments) {
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
        DataAccessRequestCommentsResource.save({
            id: $routeParams.id,
            admin: $scope.privateComments === true
        }, comment.message, retrieveComments, onError);
    }
    function updateComment(comment) {
        DataAccessRequestCommentResource.update({
            id: $routeParams.id,
            commentId: comment.id
        }, comment.message, retrieveComments, onError);
    }
    function deleteComment(comment) {
        $scope.commentToDelete = comment.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
            titleKey: "comment.delete-dialog.title",
            messageKey: "comment.delete-dialog.message",
            messageArgs: [ comment.createdBy ]
        }, comment.id);
    }
    function toggleAttachmentsForm(show) {
        if (show) {
            $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
        }
        $scope.showAttachmentsForm = show;
    }
    function getRequest() {
        $q.all([ DataAccessRequestResource.get({
            id: $routeParams.id
        }).$promise, DataAccessAmendmentsResource.getLogHistory({
            id: $routeParams.id
        }).$promise ]).then(function(values) {
            var dataAccessRequest = values[0], amendmentsLogHistory = values[1];
            try {
                $scope.dataAccessRequest = dataAccessRequest;
                $scope.form.model = dataAccessRequest.content ? JSON.parse(dataAccessRequest.content) : {};
                var requestDownloadUrlPdf = ngObibaMicaUrl.getUrl("DataAccessRequestDownloadPdfResource").replace(":id", $scope.dataAccessRequest.id);
                $scope.requestDownloadUrl = requestDownloadUrlPdf + (requestDownloadUrlPdf.indexOf("?q=") !== -1 ? "&" : "?") + "lang=" + $translate.use();
                $scope.attachments = dataAccessRequest.attachments || [];
                $scope.lastSubmittedDate = findLastSubmittedDate();
                $scope.logsHistory = DataAccessEntityService.processLogsHistory([].concat(dataAccessRequest.statusChangeHistory, dataAccessRequest.actionLogHistory || [], amendmentsLogHistory || []).sort(function(a, b) {
                    return a.changedOn.localeCompare(b.changedOn);
                }));
            } catch (e) {
                $scope.validForm = false;
                $scope.form.model = {};
                AlertService.alert({
                    id: "DataAccessRequestViewController",
                    type: "danger",
                    msgKey: "data-access-request.parse-error"
                });
            }
            $scope.loading = false;
        }, onError);
    }
    function updateAttachments() {
        var request = angular.copy($scope.dataAccessRequest);
        request.attachments = $scope.attachments;
        DataAccessRequestAttachmentsUpdateResource.save(request, function() {
            toggleAttachmentsForm(false);
            getRequest();
        });
    }
    function initializeForm() {
        SfOptionsService.transform().then(function(options) {
            $scope.sfOptions = options;
            $scope.sfOptions.pristine = {
                errors: true,
                success: false
            };
        });
        DataAccessFormConfigResource.get(function onSuccess(dataAccessForm) {
            $scope.dataAccessForm = dataAccessForm;
        }, onError);
    }
    function findLastSubmittedDate() {
        var history = $scope.dataAccessRequest.logsHistory || [];
        return history.filter(function(item) {
            return item.to === DataAccessEntityService.status.SUBMITTED;
        }).sort(function(a, b) {
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
            titleKey: "data-access-request.delete-dialog.title",
            messageKey: "data-access-request.delete-dialog.message",
            messageArgs: [ $scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant ]
        }, $scope.requestToDelete);
    }
    function getDownloadHref(attachment) {
        return ngObibaMicaUrl.getUrl("DataAccessRequestAttachmentDownloadResource").replace(":id", $scope.dataAccessRequest.id).replace(":attachmentId", attachment.id);
    }
    function onDeleteConfirmed(event, id) {
        if ($scope.requestToDelete === id) {
            DataAccessRequestResource.delete({
                id: $scope.requestToDelete
            }, function() {
                $location.path("/data-access-requests").replace();
            });
            delete $scope.requestToDelete;
        }
    }
    function onUpdatStatusSuccess() {
        setTimeout(function() {
            getRequest();
        });
    }
    function confirmStatusChange(status, messageKey, statusName) {
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
            titleKey: "data-access-request.status-change-confirmation.title",
            messageKey: messageKey !== null ? messageKey : "data-access-request.status-change-confirmation.message",
            messageArgs: statusName !== null ? [ $filter("translate")(statusName).toLowerCase() ] : []
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
        setTimeout(function() {
            window.print();
        }, 250);
    }
    function submitForm() {
        $scope.$broadcast("schemaFormValidate");
        if ($scope.forms.requestForm.$valid) {
            DataAccessRequestStatusResource.update({
                id: $scope.dataAccessRequest.id,
                status: DataAccessEntityService.status.SUBMITTED
            }, function onSubmitted() {
                $uibModal.open({
                    scope: $scope,
                    templateUrl: "access/views/data-access-request-submitted-modal.html"
                }).result.then(function() {
                    onUpdatStatusSuccess();
                });
            }, onError);
        } else {
            AlertService.alert({
                id: "DataAccessRequestViewController",
                type: "danger",
                msgKey: "data-access-request.submit.invalid"
            });
        }
    }
    function onDeleteCommentConfirmed(event, id) {
        if ($scope.commentToDelete === id) {
            DataAccessRequestCommentResource.delete({
                id: $routeParams.id,
                commentId: id
            }, {}, retrieveComments, onError);
        }
    }
    function updateActionLogs(actionLogs) {
        if (Array.isArray(actionLogs)) {
            $scope.loading = true;
            $scope.dataAccessRequest.actionLogHistory = actionLogs;
            DataAccessRequestResource.editActionLogs($scope.dataAccessRequest, function() {
                onUpdatStatusSuccess();
            });
        }
    }
    function reOpen() {
        confirmStatusChange(DataAccessEntityService.status.OPENED, null, "reopen");
    }
    function review() {
        confirmStatusChange(DataAccessEntityService.status.REVIEWED, "data-access-request.status-change-confirmation.message-review", null);
    }
    function approve() {
        confirmStatusChange(DataAccessEntityService.status.APPROVED, null, "approve");
    }
    function reject() {
        confirmStatusChange(DataAccessEntityService.status.REJECTED, null, "reject");
    }
    function conditionallyApprove() {
        confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, "conditionallyApprove");
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
    $scope.cancelAttachments = function() {
        toggleAttachmentsForm(false);
    };
    $scope.editAttachments = function() {
        toggleAttachmentsForm(true);
    };
    $scope.updateActionLogs = updateActionLogs;
    $scope.onAttachmentError = onAttachmentError;
    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("view");
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("view");
    $scope.submit = submitForm;
    $scope.reopen = reOpen;
    $scope.review = review;
    $scope.approve = approve;
    $scope.reject = reject;
    $scope.conditionallyApprove = conditionallyApprove;
    $scope.UserProfileService = UserProfileService;
    $scope.userProfile = function(profile) {
        $scope.applicant = profile;
        $uibModal.open({
            scope: $scope,
            templateUrl: "access/views/data-access-request-profile-user-modal.html"
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
    $rootScope.$on("$translateChangeSuccess", initializeForm);
    $scope.tabs = {
        activeTab: 0
    };
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
} ]).controller("DataAccessRequestEditController", [ "$rootScope", "$log", "$scope", "$routeParams", "$location", "$uibModal", "LocalizedSchemaFormService", "DataAccessRequestsResource", "DataAccessRequestResource", "DataAccessFormConfigResource", "JsonUtils", "AlertService", "ServerErrorUtils", "SessionProxy", "DataAccessEntityService", "ngObibaMicaAccessTemplateUrl", "DataAccessRequestConfig", "SfOptionsService", "FormDirtyStateObserver", "DataAccessRequestDirtyStateService", "$timeout", function($rootScope, $log, $scope, $routeParams, $location, $uibModal, LocalizedSchemaFormService, DataAccessRequestsResource, DataAccessRequestResource, DataAccessFormConfigResource, JsonUtils, AlertService, ServerErrorUtils, SessionProxy, DataAccessEntityService, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, SfOptionsService, FormDirtyStateObserver, DataAccessRequestDirtyStateService, $timeout) {
    var onSuccess = function(response, getResponseHeaders) {
        FormDirtyStateObserver.unobserve();
        var parts = getResponseHeaders().location.split("/");
        $location.path("/data-access-request/" + parts[parts.length - 1]).replace();
    };
    var onError = function(response) {
        AlertService.alert({
            id: "DataAccessRequestEditController",
            type: "danger",
            msg: ServerErrorUtils.buildMessage(response)
        });
    };
    function onAttachmentError(attachment) {
        AlertService.alert({
            id: "DataAccessRequestEditController",
            type: "danger",
            msgKey: "server.error.file.upload",
            msgArgs: [ attachment.fileName ]
        });
    }
    $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
    var validate = function(form) {
        $scope.$broadcast("schemaFormValidate");
        $uibModal.open({
            resolve: {
                isValid: form.$valid
            },
            templateUrl: "access/views/data-access-request-validation-modal.html",
            controller: [ "$scope", "isValid", function($scope, isValid) {
                $scope.isValid = isValid;
            } ]
        });
    };
    var cancel = function() {
        $location.path("/data-access-request" + ($routeParams.id ? "/" + $routeParams.id : "s")).replace();
    };
    var save = function() {
        $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);
        if ($scope.newRequest) {
            DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
        } else {
            DataAccessRequestResource.save($scope.dataAccessRequest, function() {
                FormDirtyStateObserver.unobserve();
                $location.path("/data-access-request" + ($scope.dataAccessRequest.id ? "/" + $scope.dataAccessRequest.id : "s")).replace();
            }, onError);
        }
    };
    function initializeForm() {
        SfOptionsService.transform().then(function(options) {
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
                    id: "DataAccessRequestEditController",
                    type: "danger",
                    msgKey: "data-access-config.parse-error.definition"
                });
            }
            if (Object.getOwnPropertyNames($scope.sfForm.schema).length === 0) {
                $scope.sfForm.schema = {};
                $scope.validForm = false;
                AlertService.alert({
                    id: "DataAccessRequestEditController",
                    type: "danger",
                    msgKey: "data-access-config.parse-error.schema"
                });
            }
            if ($scope.validForm) {
                $scope.dataAccessRequest = $routeParams.id ? DataAccessRequestResource.get({
                    id: $routeParams.id
                }, function onSuccess(request) {
                    try {
                        $scope.sfForm.model = request.content ? JSON.parse(request.content) : {};
                    } catch (e) {
                        $scope.sfForm.model = {};
                        AlertService.alert({
                            id: "DataAccessRequestEditController",
                            type: "danger",
                            msgKey: "data-access-request.parse-error"
                        });
                    }
                    $scope.canEdit = DataAccessEntityService.actions.canEdit(request);
                    $scope.sfForm.schema.readonly = !$scope.canEdit;
                    $scope.$broadcast("schemaFormRedraw");
                    request.attachments = request.attachments || [];
                    return request;
                }) : {
                    applicant: SessionProxy.login(),
                    status: DataAccessEntityService.status.OPENED,
                    attachments: []
                };
            }
            $timeout(function() {
                $scope.sfForm = angular.copy($scope.sfForm);
                $scope.loaded = true;
            }, 250);
        }, onError);
    }
    $rootScope.$on("$translateChangeSuccess", function() {
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
    $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("form");
    $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("form");
    $scope.sfForm = {
        schema: null,
        definition: null,
        model: {}
    };
    FormDirtyStateObserver.observe($scope);
    DataAccessRequestDirtyStateService.setForm($scope.form);
    $scope.$on("$destroy", function() {
        DataAccessRequestDirtyStateService.setForm(null);
    });
} ]);

"use strict";

(function() {
    function Controller($scope, $location, $q, $routeParams, $uibModal, DataAccessEntityResource, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, DataAccessEntityService, ServerErrorUtils, AlertService, DataAccessRequestDirtyStateService, FormDirtyStateObserver, SessionProxy, ngObibaMicaAccessTemplateUrl) {
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function onSuccess(response, headersFunction) {
            FormDirtyStateObserver.unobserve();
            var parts = headersFunction().location.split("/");
            $location.path($scope.entityUrl + "/amendment/" + parts[parts.length - 1]).replace();
        }
        function onError(response) {
            AlertService.alert({
                id: "DataAccessAmendmentEditController",
                type: "danger",
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
        var amendment = $routeParams.id ? DataAccessEntityResource.get($scope.entityUrl, $routeParams.id) : {
            "obiba.mica.DataAccessAmendmentDto.amendment": {
                parentId: $routeParams.parentId
            },
            $promise: new Promise(function(resolve) {
                setTimeout(resolve, 0, {});
            }),
            status: DataAccessEntityService.status.OPENED
        };
        var model = amendment.$promise.then(getDataContent);
        var dataAccessForm = DataAccessAmendmentFormConfigResource.get();
        $q.all([ amendment, model, dataAccessForm.$promise ]).then(function(values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            return values;
        }, function(reason) {
            console.error("Failed to resolve amendment promises because", reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("amendmentForm");
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("amendmentForm");
        FormDirtyStateObserver.observe($scope);
        DataAccessRequestDirtyStateService.setForm($scope.form);
        $scope.$on("$destroy", destroyFormObserver);
        $scope.cancel = function() {
            destroyFormObserver();
            $location.path($scope.entityUrl).replace();
        };
        $scope.save = function() {
            $scope.requestEntity.content = angular.toJson($scope.model);
            $scope.requestEntity.parentId = $routeParams.parentId;
            delete $scope.requestEntity.$promise;
            if (!$scope.requestEntity.applicant) {
                $scope.requestEntity.applicant = SessionProxy.login();
            }
            if (!$routeParams.id) {
                DataAccessEntityResource.create($scope.entityUrl, $scope.requestEntity, onSuccess, onError);
            } else {
                DataAccessEntityResource.update($scope.entityUrl, $scope.requestEntity).$promise.then(function() {
                    FormDirtyStateObserver.unobserve();
                    $location.path($scope.entityUrl).replace();
                }, onError);
            }
        };
        $scope.validate = function(form) {
            $scope.$broadcast("schemaFormValidate");
            $uibModal.open({
                resolve: {
                    isValid: form.$valid
                },
                templateUrl: "access/views/data-access-request-validation-modal.html",
                controller: [ "$scope", "isValid", function($scope, isValid) {
                    $scope.isValid = isValid;
                } ]
            });
        };
        $scope.toggleFormDrawnStatus = function(value) {
            $scope.formDrawn = value;
        };
    }
    angular.module("obiba.mica.access").controller("DataAccessAmendmentEditController", [ "$scope", "$location", "$q", "$routeParams", "$uibModal", "DataAccessEntityResource", "DataAccessAmendmentFormConfigResource", "DataAccessEntityUrls", "DataAccessEntityService", "ServerErrorUtils", "AlertService", "DataAccessRequestDirtyStateService", "FormDirtyStateObserver", "SessionProxy", "ngObibaMicaAccessTemplateUrl", Controller ]);
})();

"use strict";

(function() {
    function Controller($scope, $routeParams, $q, $uibModal, DataAccessEntityResource, DataAccessEntityService, DataAccessEntityFormService, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, AlertService, ngObibaMicaAccessTemplateUrl) {
        function getAttributeValue(attributes, key) {
            var result = attributes.filter(function(attribute) {
                return attribute.key === key;
            });
            return result && result.length > 0 ? result[0].value : null;
        }
        $scope.userProfile = function(profile) {
            $scope.applicant = profile;
            $uibModal.open({
                scope: $scope,
                templateUrl: "access/views/data-access-request-profile-user-modal.html"
            });
        };
        $scope.getFullName = function(profile) {
            if (profile) {
                if (profile.attributes) {
                    return getAttributeValue(profile.attributes, "firstName") + " " + getAttributeValue(profile.attributes, "lastName");
                }
                return profile.username;
            }
            return null;
        };
        $scope.getProfileEmail = function(profile) {
            if (profile) {
                if (profile.attributes) {
                    return getAttributeValue(profile.attributes, "email");
                }
            }
            return null;
        };
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function resetRequestEntity() {
            var entity = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
            $q.all([ entity, entity.$promise.then(getDataContent) ]).then(function(values) {
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
        $q.all([ amendment, model, dataAccessForm.$promise ]).then(function(values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            $scope.actions = DataAccessEntityService.actions;
            $scope.nextStatus = DataAccessEntityService.nextStatus;
            Object.assign($scope, DataAccessEntityFormService.for($scope, $scope.requestEntity, resetRequestEntity));
            return values;
        }, function(reason) {
            console.error("Failed to resolve amendment promises because", reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl("amendmentView");
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl("amendmentView");
        $scope.submit = function() {
            $scope.$broadcast("schemaFormValidate");
            if ($scope.forms.requestForm.$valid) {
                DataAccessEntityResource.updateStatus($scope.entityUrl, $routeParams.id, DataAccessEntityService.status.SUBMITTED).$promise.then(function() {
                    $uibModal.open({
                        scope: $scope,
                        templateUrl: "access/views/data-access-request-submitted-modal.html"
                    }).result.then(function() {
                        resetRequestEntity();
                    });
                });
            } else {
                AlertService.alert({
                    id: "DataAccessAmendmentViewController",
                    type: "danger",
                    msgKey: "data-access-request.submit.invalid"
                });
            }
        };
        $scope.toggleFormDrawnStatus = function(value) {
            $scope.formDrawn = value;
        };
    }
    angular.module("obiba.mica.access").controller("DataAccessAmendmentViewController", [ "$scope", "$routeParams", "$q", "$uibModal", "DataAccessEntityResource", "DataAccessEntityService", "DataAccessEntityFormService", "DataAccessAmendmentFormConfigResource", "DataAccessEntityUrls", "AlertService", "ngObibaMicaAccessTemplateUrl", Controller ]);
})();

"use strict";

ngObibaMica.access.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/data-access-requests", {
        templateUrl: "access/views/data-access-request-list.html",
        controller: "DataAccessRequestListController"
    }).when("/data-access-request/new", {
        templateUrl: "access/views/data-access-request-form.html",
        controller: "DataAccessRequestEditController"
    }).when("/data-access-request/:id/edit", {
        templateUrl: "access/views/data-access-request-form.html",
        controller: "DataAccessRequestEditController"
    }).when("/data-access-request/:id", {
        templateUrl: "access/views/data-access-request-view.html",
        controller: "DataAccessRequestViewController"
    }).when("/data-access-request/:parentId/amendment/new", {
        templateUrl: "access/views/data-access-amendment-view.html",
        controller: "DataAccessAmendmentEditController"
    }).when("/data-access-request/:parentId/amendment/:id/edit", {
        templateUrl: "access/views/data-access-amendment-view.html",
        controller: "DataAccessAmendmentEditController"
    }).when("/data-access-request/:parentId/amendment/:id", {
        templateUrl: "access/views/data-access-amendment-view.html",
        controller: "DataAccessAmendmentViewController"
    });
} ]);

"use strict";

ngObibaMica.access.factory("DataAccessFormConfigResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessFormConfigResource"), {}, {
        get: {
            method: "GET",
            errorHandler: true
        }
    });
} ]).factory("DataAccessAmendmentFormConfigResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessAmendmentFormConfigResource"), {}, {
        get: {
            method: "GET",
            errorHandler: true
        }
    });
} ]).factory("DataAccessRequestsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestsResource"), {}, {
        save: {
            method: "POST",
            errorHandler: true
        },
        get: {
            method: "GET"
        }
    });
} ]).factory("DataAccessRequestsExportCsvResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestsExportCsvResource"), {}, {
        get: {
            method: "GET"
        }
    });
} ]).factory("DataAccessRequestResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestResource"), {}, {
        save: {
            method: "PUT",
            params: {
                id: "@id"
            },
            errorHandler: true
        },
        editActionLogs: {
            method: "PUT",
            params: {
                id: "@id"
            },
            url: ngObibaMicaUrl.getUrl("DataAccessRequestActionLogsResource"),
            errorHandler: true
        },
        get: {
            method: "GET"
        },
        delete: {
            method: "DELETE"
        }
    });
} ]).factory("DataAccessAmendmentsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessAmendmentsResource"), {}, {
        save: {
            method: "POST",
            params: {
                parentId: "@parentId"
            },
            errorHandler: true
        },
        get: {
            method: "GET",
            params: {
                parentId: "@parentId"
            }
        },
        getLogHistory: {
            method: "GET",
            isArray: true,
            url: ngObibaMicaUrl.getUrl("DataAccessAmendmentsLogHistoryResource")
        }
    });
} ]).factory("DataAccessAmendmentResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessAmendmentResource"), {}, {
        save: {
            method: "PUT",
            params: {
                parentId: "@parentId",
                id: "@id"
            },
            errorHandler: true
        },
        get: {
            method: "GET"
        },
        delete: {
            method: "DELETE"
        }
    });
} ]).factory("DataAccessRequestAttachmentsUpdateResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestAttachmentsUpdateResource"), {}, {
        save: {
            method: "PUT",
            params: {
                id: "@id"
            },
            errorHandler: true
        }
    });
} ]).factory("DataAccessRequestCommentsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestCommentsResource"), {}, {
        save: {
            method: "POST",
            params: {
                id: "@id",
                admin: "@admin"
            },
            headers: {
                "Content-Type": "text/plain"
            },
            errorHandler: true
        },
        get: {
            method: "GET",
            params: {
                id: "@id",
                admin: "@admin"
            },
            errorHandler: true
        }
    });
} ]).factory("DataAccessRequestCommentResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestCommentResource"), {}, {
        delete: {
            method: "DELETE",
            params: {
                id: "@id",
                commentId: "@commentId"
            },
            errorHandler: true
        },
        update: {
            method: "PUT",
            params: {
                id: "@id",
                commentId: "@commentId"
            },
            headers: {
                "Content-Type": "text/plain"
            },
            errorHandler: true
        }
    });
} ]).factory("DataAccessRequestStatusResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessRequestStatusResource"), {}, {
        update: {
            method: "PUT",
            params: {
                id: "@id",
                status: "@status"
            },
            errorHandler: true
        }
    });
} ]).factory("DataAccessAmendmentStatusResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("DataAccessAmendmentStatusResource"), {}, {
        update: {
            method: "PUT",
            params: {
                id: "@id",
                parentId: "@parentId",
                status: "@status"
            },
            errorHandler: true
        }
    });
} ]).service("DataAccessRequestConfig", function() {
    var options = {
        newRequestButtonCaption: null,
        documentsSectionTitle: null,
        documentsSectionHelpText: null,
        downloadButtonCaption: null,
        commentsEnabled: true,
        userListPageTitle: null,
        newRequestButtonHelpText: null
    };
    this.setOptions = function(newOptions) {
        if (typeof newOptions === "object") {
            Object.keys(newOptions).forEach(function(option) {
                if (option in options) {
                    options[option] = newOptions[option];
                }
            });
        }
    };
    this.getOptions = function() {
        return angular.copy(options);
    };
}).service("DataAccessRequestDirtyStateService", [ function() {
    var form = null;
    this.setForm = function(f) {
        form = f;
    };
    this.isDirty = function() {
        return form && form.$dirty;
    };
} ]).filter("filterProfileAttributes", function() {
    return function(attributes) {
        var exclude = [ "email", "firstName", "lastName", "createdDate", "lastLogin", "username" ];
        return attributes.filter(function(attribute) {
            return exclude.indexOf(attribute.key) === -1;
        });
    };
}).filter("capitalizeFirstLetter", [ "StringUtils", function(StringUtils) {
    return function(text) {
        return StringUtils.capitaliseFirstLetter(text);
    };
} ]);

"use strict";

ngObibaMica.sets = angular.module("obiba.mica.sets", [ "obiba.alert", "ui.bootstrap", "pascalprecht.translate", "templates-ngObibaMica", "LocalStorageModule" ]);

"use strict";

(function() {
    ngObibaMica.sets.config([ "$provide", function($provide) {
        $provide.provider("ngObibaMicaSetsTemplateUrl", new NgObibaMicaTemplateUrlFactory().create({
            cart: {
                header: null,
                footer: null
            }
        }));
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.sets.factory("SetResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetResource");
        return $resource(url, {}, {
            get: {
                method: "GET",
                params: {
                    type: "@type",
                    id: "@id"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetDocumentsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetDocumentsResource");
        return $resource(url, {}, {
            get: {
                method: "GET",
                params: {
                    type: "@type",
                    id: "@id",
                    from: "@from",
                    limit: "@limit"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetClearResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetClearResource");
        return $resource(url, {}, {
            clear: {
                method: "DELETE",
                params: {
                    type: "@type",
                    id: "@id"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetExistsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetExistsResource");
        return $resource(url, {}, {
            get: {
                method: "GET",
                params: {
                    type: "@type",
                    id: "@id",
                    did: "@did"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetImportResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetImportResource");
        return $resource(url, {}, {
            save: {
                method: "POST",
                params: {
                    type: "@type",
                    id: "@id"
                },
                headers: {
                    "Content-Type": "text/plain"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetImportQueryResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetImportQueryResource");
        var requestTransformer = function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };
        return $resource(url, {}, {
            save: {
                method: "POST",
                params: {
                    type: "@type",
                    id: "@id"
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                errorHandler: true,
                transformRequest: requestTransformer
            }
        });
    } ]).factory("SetRemoveResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("SetRemoveResource");
        return $resource(url, {}, {
            delete: {
                method: "POST",
                params: {
                    type: "@type",
                    id: "@id"
                },
                headers: {
                    "Content-Type": "text/plain"
                },
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.sets.factory("SetsResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("SetsResource"), {}, {
            save: {
                method: "POST",
                params: {
                    type: "@type"
                },
                errorHandler: true
            }
        });
    } ]).factory("SetsImportResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("SetsImportResource"), {}, {
            save: {
                method: "POST",
                params: {
                    type: "@type"
                },
                headers: {
                    "Content-Type": "text/plain"
                },
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

var SetService = function() {
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
        ObibaServerConfigResource.get(function(micaConfig) {
            that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
            that.hasHarmonization = micaConfig.isHarmonizedDatasetEnabled;
        });
    }
    SetService.prototype.isSingleStudy = function() {
        return !this.hasMultipleStudies;
    };
    SetService.prototype.hasHarmonizedDatasets = function() {
        return this.hasHarmonization;
    };
    SetService.prototype.getCartDocuments = function(documentType, fromIdx, limitIdx) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetDocumentsResource.get({
                from: fromIdx,
                id: set.id,
                limit: limitIdx,
                type: documentType
            }).$promise;
        });
    };
    SetService.prototype.isDocumentInCart = function(documentType, documentId) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetExistsResource.get({
                type: documentType,
                id: set.id,
                did: documentId
            }).$promise;
        });
    };
    SetService.prototype.addDocumentToCart = function(documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetImportResource.save({
                type: documentType,
                id: set.id
            }, did).$promise;
        }).then(function(set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.addDocumentQueryToCart = function(documentType, rqlQuery) {
        var _this = this;
        this.$log.info("query=" + rqlQuery);
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetImportQueryResource.save({
                type: documentType,
                id: set.id,
                query: rqlQuery
            }).$promise;
        }).then(function(set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.removeDocumentFromCart = function(documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetRemoveResource.delete({
                type: documentType,
                id: set.id
            }, did).$promise;
        }).then(function(set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.clearCart = function(documentType) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function(set) {
            return _this.SetClearResource.clear({
                type: documentType,
                id: set.id
            }).$promise;
        }).then(function() {
            _this.notifyCartChanged(documentType);
            return _this.getOrCreateCart(documentType);
        });
    };
    SetService.prototype.gotoSetEntitiesCount = function(setId, documentId) {
        var _this = this;
        var max = 20;
        var sid = setId;
        if (!sid) {
            var cartSet = this.getCartSet("variables");
            if (cartSet) {
                sid = cartSet.id;
            }
        }
        if (!documentId) {
            this.SetDocumentsResource.get({
                type: "variables",
                id: sid,
                from: 0,
                limit: max
            }).$promise.then(function(documents) {
                _this.gotoEntitiesCount(documents.variables.map(function(doc) {
                    return doc.id;
                }));
            });
        } else {
            var ids = Array.isArray(documentId) ? documentId : [ documentId ];
            this.gotoEntitiesCount(ids.slice(0, max));
        }
    };
    SetService.prototype.gotoEntitiesCount = function(ids) {
        if (ids) {
            var queryStr = ids.map(function(id) {
                return "all(" + id + ")";
            }).join(",");
            this.$window.location.href = this.PageUrlService.entitiesCountPage(queryStr);
        }
    };
    SetService.prototype.getDownloadUrl = function(documentType, setId) {
        var id = setId;
        if (!id) {
            var cartSet = this.getCartSet(documentType);
            if (cartSet) {
                id = cartSet.id;
            }
        }
        if (id) {
            var queryStr = "variable(in(Mica_variable.sets," + id + "),limit(0,20000)" + ",fields((attributes.label.*,variableType,datasetId,datasetAcronym))" + ",sort(variableType,containerId,populationWeight,dataCollectionEventWeight,datasetId,index,name))" + ",locale(" + this.$translate.use() + ")";
            return this.PageUrlService.downloadList(documentType, queryStr);
        }
        return null;
    };
    SetService.prototype.gotoSearch = function(documentType, setId) {
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
    SetService.prototype.getCartSet = function(documentType) {
        return this.localStorageService.get(this.getCartKey(documentType));
    };
    SetService.prototype.getOrCreateCart = function(documentType) {
        var _this = this;
        var cartSet = this.localStorageService.get(this.getCartKey(documentType));
        if (cartSet) {
            return this.SetResource.get({
                type: documentType,
                id: cartSet.id
            }).$promise.then(function(set) {
                return _this.saveCart(documentType, set);
            }).catch(function() {
                return _this.createCart(documentType, "");
            });
        } else {
            return this.createCart(documentType, "");
        }
    };
    SetService.prototype.createCart = function(documentType, documentId) {
        var _this = this;
        return this.SetsImportResource.save({
            type: documentType
        }, documentId).$promise.then(function(set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.saveCart = function(documentType, set) {
        if (set && set.id) {
            this.localStorageService.set(this.getCartKey(documentType), set);
            this.notifyCartChanged(documentType);
            return set;
        }
        return undefined;
    };
    SetService.prototype.getCartKey = function(documentType) {
        return "cart." + documentType;
    };
    SetService.prototype.notifyCartChanged = function(documentType) {
        var event;
        try {
            event = new CustomEvent("cart-updated", {
                detail: documentType
            });
        } catch (err) {
            event = document.createEvent("Event");
            event.initEvent("cart-updated", true, true);
            event.detail = documentType;
        }
        document.dispatchEvent(event);
    };
    SetService.$inject = [ "$location", "$window", "$log", "$translate", "localStorageService", "PageUrlService", "AlertService", "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource", "SetImportResource", "SetImportQueryResource", "SetRemoveResource", "ObibaServerConfigResource" ];
    return SetService;
}();

ngObibaMica.sets.service("SetService", [ "$location", "$window", "$log", "$translate", "localStorageService", "PageUrlService", "AlertService", "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource", "SetImportResource", "SetImportQueryResource", "SetRemoveResource", "ObibaServerConfigResource", SetService ]);

"use strict";

var CartDocumentsTableController = function() {
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
        this.allPageSelected = {};
        this.selections = {};
        this.documents = {
            from: 0,
            limit: 0,
            total: 0
        };
        this.pagination = {
            currentPage: 1,
            from: 0,
            itemsPerPage: 10,
            maxSize: 10,
            to: 0,
            totalHits: 0
        };
    }
    CartDocumentsTableController.prototype.hasSelections = function() {
        return this.allSelected || this.getSelectedDocumentIds().length > 0;
    };
    CartDocumentsTableController.prototype.updateAllSelected = function() {
        this.$log.info("ALL=" + this.allSelected);
        this.allSelected = !this.allSelected;
        if (this.allSelected) {
            this.allPageSelected[this.pagination.currentPage] = true;
            this.updateAllCurrentPageSelected();
        } else {
            this.allPageSelected = {};
            this.selections = {};
        }
    };
    CartDocumentsTableController.prototype.updateAllCurrentPageSelected = function() {
        var _this = this;
        this.$log.info("ALLPAGE=" + JSON.stringify(this.allPageSelected));
        if (this.allSelected && !this.allPageSelected[this.pagination.currentPage]) {
            this.allSelected = false;
            this.allPageSelected = {};
            this.selections = {};
        } else if (this.documents && this.documents[this.type]) {
            this.documents[this.type].forEach(function(doc) {
                _this.selections[doc.id] = _this.allPageSelected[_this.pagination.currentPage];
            });
        }
    };
    CartDocumentsTableController.prototype.updateSelection = function(documentId) {
        if (!this.selections[documentId]) {
            this.allPageSelected[this.pagination.currentPage] = false;
            this.allSelected = false;
        }
    };
    CartDocumentsTableController.prototype.showAnalysis = function() {
        return this.AnalysisConfigService.showAnalysis();
    };
    CartDocumentsTableController.prototype.showStudies = function() {
        return !this.SetService.isSingleStudy();
    };
    CartDocumentsTableController.prototype.showVariableType = function() {
        return this.SetService.hasHarmonizedDatasets();
    };
    CartDocumentsTableController.prototype.entitiesCount = function() {
        if (this.pagination.totalHits) {
            var sels = this.getSelectedDocumentIds();
            this.SetService.gotoSetEntitiesCount(undefined, sels && sels.length > 0 ? sels : undefined);
        }
    };
    CartDocumentsTableController.prototype.download = function() {
        return this.SetService.getDownloadUrl(this.type);
    };
    CartDocumentsTableController.prototype.search = function() {
        this.SetService.gotoSearch(this.type);
    };
    CartDocumentsTableController.prototype.clearSet = function() {
        var _this = this;
        if (!this.hasSelections()) {
            return;
        }
        var sels = this.getSelectedDocumentIds();
        if (sels && sels.length > 0) {
            this.SetService.removeDocumentFromCart(this.type, sels).then(function() {
                _this.allSelected = false;
                _this.allPageSelected = {};
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        } else {
            this.SetService.clearCart(this.type).then(function() {
                _this.allSelected = false;
                _this.allPageSelected = {};
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        }
    };
    CartDocumentsTableController.prototype.pageChanged = function() {
        var from = (this.pagination.currentPage - 1) * this.documents.limit;
        this.onPageChange(this.type, from);
    };
    CartDocumentsTableController.prototype.$onInit = function() {
        this.table = {
            rows: new Array()
        };
    };
    CartDocumentsTableController.prototype.$onChanges = function() {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues.formatNumber(this.documents && this.documents.total ? this.documents.total : 0);
    };
    CartDocumentsTableController.prototype.getSelectedDocumentIds = function() {
        var _this = this;
        if (this.allSelected) {
            return [];
        }
        return Object.keys(this.selections).filter(function(id) {
            return _this.selections[id];
        });
    };
    CartDocumentsTableController.prototype.localize = function(values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    CartDocumentsTableController.prototype.asTable = function() {
        var _this = this;
        var table = {
            rows: new Array()
        };
        this.pagination.totalHits = this.documents ? this.documents.total : 0;
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
        this.pagination.from = this.documents ? this.documents.from + 1 : 0;
        var documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
        this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
        if (documentCounts) {
            if (this.allSelected) {
                this.allPageSelected[this.pagination.currentPage] = true;
            }
            this.documents[this.type].forEach(function(doc) {
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
                var attrLabel = doc.attributes.filter(function(attr) {
                    return attr.name === "label";
                });
                var variableLabel = attrLabel && attrLabel.length > 0 ? _this.localize(attrLabel[0].values) : "";
                var row = new Array({
                    link: undefined,
                    value: doc.id
                }, {
                    link: variableLink ? variableLink : datasetLink,
                    value: doc.name
                }, {
                    link: undefined,
                    value: variableLabel
                }, {
                    link: undefined,
                    value: doc.variableType
                }, {
                    link: studyLink,
                    value: studyAcronym
                }, {
                    link: datasetLink,
                    value: datasetName
                });
                table.rows.push(row);
            });
        }
        return table;
    };
    CartDocumentsTableController.$inject = [ "PageUrlService", "LocalizedValues", "SetService", "AnalysisConfigService", "$translate", "$log", "$scope", "$location", "$window" ];
    return CartDocumentsTableController;
}();

var CartDocumentsTableComponent = function() {
    function CartDocumentsTableComponent() {
        this.transclude = true;
        this.bindings = {
            documents: "<",
            onPageChange: "<",
            type: "<"
        };
        this.controller = CartDocumentsTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "sets/components/cart-documents-table/component.html";
    }
    return CartDocumentsTableComponent;
}();

ngObibaMica.sets.component("cartDocumentsTable", new CartDocumentsTableComponent());

"use strict";

(function() {
    function manageCartHelpText($scope, $translate, $cookies) {
        var cookiesCartHelp = "micaHideCartHelpText";
        $translate([ "sets.cart.help" ]).then(function(translation) {
            if (!$scope.options.CartHelpText && !$cookies.get(cookiesCartHelp)) {
                $scope.options.CartHelpText = translation["sets.cart.help"];
            }
        });
        $scope.closeHelpBox = function() {
            $cookies.put(cookiesCartHelp, true);
            $scope.options.CartHelpText = null;
        };
        if ($cookies.get(cookiesCartHelp)) {
            $scope.options.CartHelpText = null;
        }
    }
    ngObibaMica.sets.controller("CartController", [ "$scope", "$location", "$translate", "$cookies", "SetService", "ngObibaMicaSetsTemplateUrl", function($scope, $location, $translate, $cookies, SetService, ngObibaMicaSetsTemplateUrl) {
        $scope.options = {};
        manageCartHelpText($scope, $translate, $cookies);
        $scope.cartHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl("cart");
        $scope.loading = true;
        var limit = 100;
        var onDocuments = function(variables) {
            $scope.loading = false;
            $scope.variables = variables;
        };
        var promisedDocs = SetService.getCartDocuments("variables", 0, limit);
        if (promisedDocs) {
            promisedDocs.then(onDocuments);
        } else {
            $scope.variables = {
                total: 0
            };
        }
        $scope.$on("cart-cleared", function(event, type) {
            $scope.loading = true;
            SetService.getCartDocuments(type, 0, limit).then(onDocuments);
        });
        $scope.onPaginate = function(type, from) {
            SetService.getCartDocuments(type, from, limit).then(onDocuments);
        };
    } ]).controller("VariableToCartController", [ "$scope", "SetService", "AlertService", function($scope, SetService, AlertService) {
        $scope.canBeAdded = false;
        $scope.canBeRemoved = false;
        $scope.loading = true;
        $scope.onInit = function(id) {
            SetService.isDocumentInCart("variables", id).then(function() {
                $scope.loading = false;
                $scope.canBeRemoved = true;
            }).catch(function() {
                $scope.loading = false;
                $scope.canBeAdded = true;
            });
        };
        $scope.onAdd = function(id) {
            $scope.loading = true;
            var beforeCart = SetService.getCartSet("variables");
            SetService.addDocumentToCart("variables", id).then(function(set) {
                $scope.loading = false;
                var addedCount = set.count - (beforeCart ? beforeCart.count : 0);
                var msgKey = addedCount === 0 ? "sets.cart.no-variable-added" : "sets.cart.variable-added";
                $scope.canBeRemoved = addedCount > 0;
                $scope.canBeAdded = !$scope.canBeRemoved;
                AlertService.growl({
                    id: "VariableToCartControllerGrowl",
                    type: "info",
                    msgKey: msgKey,
                    msgArgs: [],
                    delay: 3e3
                });
            }).catch(function() {
                $scope.loading = false;
            });
        };
        $scope.onRemove = function(id) {
            $scope.loading = true;
            var beforeCart = SetService.getCartSet("variables");
            SetService.removeDocumentFromCart("variables", id).then(function(set) {
                $scope.loading = false;
                var removedCount = (beforeCart ? beforeCart.count : 0) - set.count;
                var msgKey = removedCount > 0 ? "sets.cart.variable-removed" : "sets.cart.no-variable-removed";
                $scope.canBeAdded = removedCount > 0;
                $scope.canBeRemoved = !$scope.canBeAdded;
                AlertService.growl({
                    id: "VariableToCartControllerGrowl",
                    type: "info",
                    msgKey: msgKey,
                    msgArgs: [],
                    delay: 3e3
                });
            }).catch(function() {
                $scope.loading = false;
            });
        };
    } ]);
})();

"use strict";

ngObibaMica.sets.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/cart", {
        templateUrl: "sets/views/cart.html",
        controller: "CartController",
        reloadOnSearch: false
    });
} ]);

"use strict";

var DISPLAY_TYPES = {
    LIST: "list",
    COVERAGE: "coverage",
    GRAPHICS: "graphics"
};

ngObibaMica.search = angular.module("obiba.mica.search", [ "obiba.alert", "ui.bootstrap", "pascalprecht.translate", "ngclipboard", "templates-ngObibaMica", "obiba.mica.sets" ]);

(function() {
    ngObibaMica.search.run([ "GraphicChartsConfigurations", function(GraphicChartsConfigurations) {
        GraphicChartsConfigurations.setClientConfig();
    } ]);
})();

"use strict";

(function() {
    var FIELDS_TO_FILTER = [ "name", "title", "description", "keywords" ];
    function NgObibaMicaSearchOptionsWrapper() {
        var options = {
            searchLayout: "layout2",
            taxonomyPanelOptions: {
                network: {
                    taxonomies: {
                        Mica_network: {
                            trKey: "properties"
                        }
                    }
                },
                study: {
                    taxonomies: {
                        Mica_study: {
                            trKey: "properties"
                        }
                    }
                },
                dataset: {
                    taxonomies: {
                        Mica_dataset: {
                            trKey: "properties"
                        }
                    }
                },
                variable: {
                    taxonomies: {
                        Mica_variable: {
                            trKey: "properties"
                        }
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
            targetTabsOrder: [ QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK ],
            searchTabsOrder: [ DISPLAY_TYPES.LIST, DISPLAY_TYPES.COVERAGE, DISPLAY_TYPES.GRAPHICS ],
            resultTabsOrder: [ QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK ],
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
            hideSearch: [ "studyId", "dceId", "datasetId", "networkId" ],
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
                fields: [ "acronym.*", "name.*", "variableType", "studyTable.studyId", "studyTable.project", "studyTable.table", "studyTable.populationId", "studyTable.dataCollectionEventId", "harmonizationTable.studyId", "harmonizationTable.project", "harmonizationTable.table", "harmonizationTable.populationId" ]
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
                fields: [ "acronym.*", "name.*", "model.methods.design", "populations.dataCollectionEvents.model.dataSources", "model.numberOfParticipants.participant" ]
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
                fields: [ "acronym.*", "name.*", "studyIds" ]
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
                return valueFieldsToFilter.filter(function(valueField) {
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
            var canShowCoverage = Object.keys(options.coverage.groupBy).filter(function(canShow) {
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
            options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
            options.searchTabsOrder = value.searchTabsOrder || options.searchTabsOrder;
            options.resultTabsOrder = value.resultTabsOrder || options.resultTabsOrder;
            options.variableTaxonomiesOrder = value.variableTaxonomiesOrder || options.variableTaxonomiesOrder;
            options.studyTaxonomiesOrder = value.studyTaxonomiesOrder || options.studyTaxonomiesOrder;
            options.datasetTaxonomiesOrder = value.datasetTaxonomiesOrder || options.datasetTaxonomiesOrder;
            options.networkTaxonomiesOrder = value.networkTaxonomiesOrder || options.networkTaxonomiesOrder;
            options.hideNavigate = value.hideNavigate || options.hideNavigate;
            options.hideSearch = value.hideSearch || options.hideSearch;
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
    function ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource) {
        var deferred = $q.defer();
        var resolved = false;
        function resolveOptions() {
            var ngClientOptions = optionsWrapper.getOptions();
            if (resolved) {
                return $q.when(optionsWrapper.getOptions());
            } else {
                ObibaServerConfigResource.get(function(micaConfig) {
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
            getOptionsAsyn: function() {
                return resolveOptions();
            },
            getOptions: function() {
                return optionsWrapper.getOptions();
            },
            getDefaultListPageSize: function(target) {
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
    ngObibaMica.search.config([ "$provide", function($provide) {
        $provide.provider("ngObibaMicaSearch", function() {
            var optionsWrapper = new NgObibaMicaSearchOptionsWrapper();
            function initialize(options) {
                optionsWrapper.setOptions(options);
            }
            this.initialize = initialize;
            this.$get = [ "$q", "$translate", "ObibaServerConfigResource", function($q, $translate, ObibaServerConfigResource) {
                return new ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
            } ];
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.config([ "$provide", function($provide) {
        $provide.provider("ngObibaMicaSearchTemplateUrl", new NgObibaMicaTemplateUrlFactory().create({
            search: {
                header: null,
                footer: null
            },
            searchStudiesResultTable: {
                template: null
            },
            searchNetworksResultTable: {
                template: null
            },
            searchDatasetsResultTable: {
                template: null
            },
            searchCriteriaRegionTemplate: {
                template: null
            },
            vocabularyFilterDetailHeading: {
                template: null
            },
            CriterionDropdownTemplate: {
                template: null
            },
            searchResultList: {
                template: null
            },
            searchInputList: {
                template: null
            },
            searchResultCoverage: {
                template: null
            },
            searchResultGraphics: {
                template: null
            },
            classifications: {
                header: null,
                footer: null
            },
            searchCellStatValue: {
                template: null
            }
        }));
    } ]);
})();

"use strict";

(function() {
    function SearchControllerFacetHelperService(MetaTaxonomyService, ngObibaMicaSearch) {
        var metaTaxonomiesPromise = MetaTaxonomyService.getMetaTaxonomiesPromise(), options = ngObibaMicaSearch.getOptions(), taxonomyNav, tabOrderTodisplay, facetedTaxonomies, hasFacetedTaxonomies;
        function flattenTaxonomies(terms) {
            function termsReducer(accumulator, termsArray) {
                return termsArray.reduce(function(acc, val) {
                    if (!Array.isArray(val.terms)) {
                        acc.push(val);
                        return acc;
                    } else {
                        return termsReducer(acc, val.terms);
                    }
                }, accumulator || []);
            }
            return termsReducer([], terms);
        }
        function doTabOrderToDisplay(targetTabsOrder, lang) {
            return metaTaxonomiesPromise.then(function(metaTaxonomy) {
                taxonomyNav = [];
                tabOrderTodisplay = [];
                targetTabsOrder.forEach(function(target) {
                    var targetVocabulary = metaTaxonomy.vocabularies.filter(function(vocabulary) {
                        if (vocabulary.name === target) {
                            tabOrderTodisplay.push(target);
                            return true;
                        }
                    }).pop();
                    if (targetVocabulary && targetVocabulary.terms) {
                        targetVocabulary.terms.forEach(function(term) {
                            term.target = target;
                            var title = term.title.filter(function(t) {
                                return t.locale === lang;
                            })[0];
                            var description = term.description ? term.description.filter(function(t) {
                                return t.locale === lang;
                            })[0] : undefined;
                            term.locale = {
                                title: title,
                                description: description
                            };
                            if (term.terms) {
                                term.terms.forEach(function(trm) {
                                    var title = trm.title.filter(function(t) {
                                        return t.locale === lang;
                                    })[0];
                                    var description = trm.description ? trm.description.filter(function(t) {
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
            return metaTaxonomiesPromise.then(function(metaTaxonomy) {
                facetedTaxonomies = {};
                hasFacetedTaxonomies = false;
                metaTaxonomy.vocabularies.reduce(function(accumulator, target) {
                    var taxonomies = flattenTaxonomies(target.terms);
                    function getTaxonomy(taxonomyName) {
                        return taxonomies.filter(function(taxonomy) {
                            return taxonomy.name === taxonomyName;
                        })[0];
                    }
                    function notNull(value) {
                        return value !== null && value !== undefined;
                    }
                    if (options.showAllFacetedTaxonomies) {
                        accumulator[target.name] = taxonomies.filter(function(taxonomy) {
                            return taxonomy.attributes && taxonomy.attributes.some(function(attribute) {
                                return attribute.key === "showFacetedNavigation" && attribute.value.toString() === "true";
                            });
                        });
                    } else {
                        accumulator[target.name] = (options[target.name + "TaxonomiesOrder"] || []).map(getTaxonomy).filter(notNull);
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
            return Promise.all([ doFacetedTaxonomies(), doTabOrderToDisplay(targetTabsOrder, lang) ]).then(function() {
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
    ngObibaMica.search.service("SearchControllerFacetHelperService", [ "MetaTaxonomyService", "ngObibaMicaSearch", SearchControllerFacetHelperService ]);
})();

"use strict";

function CriteriaBuilder(rootRql, rootItem, taxonomies, LocalizedValues, lang, SetService) {
    this.newCriteriaItemBuilder = function() {
        return new CriteriaItemBuilder(LocalizedValues, lang, SetService);
    };
    this.initialize = function(target) {
        this.leafItemMap = {};
        this.target = target;
        this.rootRql = rootRql;
        this.taxonomies = taxonomies;
        this.LocalizedValues = LocalizedValues;
        this.lang = lang;
        this.SetService = SetService;
        this.rootItem = this.newCriteriaItemBuilder().parent(rootItem).type(this.target).rqlQuery(this.rootRql).target(this.target).build();
    };
    this.buildLeafItem = function(targetTaxonomy, targetVocabulary, targetTerms, node, parentItem) {
        var self = this;
        var builder = new CriteriaItemBuilder(self.LocalizedValues, self.lang, self.SetService).type(node.name).target(self.target).taxonomy(targetTaxonomy).vocabulary(targetVocabulary).rqlQuery(node).parent(parentItem);
        builder.selectedTerms(targetTerms).build();
        return builder.build();
    };
}

CriteriaBuilder.prototype.fieldToVocabulary = function(field) {
    var found = {
        taxonomy: null,
        vocabulary: null
    };
    var normalizedField = field;
    if (field.indexOf(".") < 0) {
        normalizedField = "Mica_" + this.target + "." + field;
    }
    var parts = normalizedField.split(".", 2);
    var targetTaxonomy = parts[0];
    var targetVocabulary = parts[1];
    var foundTaxonomy = this.taxonomies.filter(function(taxonomy) {
        return targetTaxonomy === taxonomy.name;
    });
    if (foundTaxonomy.length === 0) {
        throw new Error("Could not find taxonomy:", targetTaxonomy);
    }
    found.taxonomy = foundTaxonomy[0];
    var foundVocabulary = found.taxonomy.vocabularies.filter(function(vocabulary) {
        return targetVocabulary === vocabulary.name;
    });
    if (foundVocabulary.length === 0) {
        throw new Error("Could not find vocabulary:", targetVocabulary);
    }
    found.vocabulary = foundVocabulary[0];
    return found;
};

CriteriaBuilder.prototype.visitLeaf = function(node, parentItem) {
    var match = RQL_NODE.MATCH === node.name;
    var field = node.args[match ? 1 : 0];
    var values = node.args[match ? 0 : 1];
    var searchInfo = this.fieldToVocabulary(field);
    var item = this.buildLeafItem(searchInfo.taxonomy, searchInfo.vocabulary, values instanceof Array ? values : [ values ], node, parentItem);
    var current = this.leafItemMap[item.id];
    if (current) {
        if (current.isRepeatable()) {
            current.addItem(item);
        } else {
            console.error("Non-repeatable criteria items must be unique,", current.id, "will be overwritten.");
            current = item;
        }
    } else {
        current = item.vocabulary.repeatable ? new RepeatableCriteriaItem().addItem(item) : item;
    }
    this.leafItemMap[item.id] = current;
    parentItem.children.push(item);
};

CriteriaBuilder.prototype.getRootItem = function() {
    return this.rootItem;
};

CriteriaBuilder.prototype.getLeafItemMap = function() {
    return this.leafItemMap;
};

CriteriaBuilder.prototype.visitCondition = function(node, parentItem) {
    var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
    parentItem.children.push(item);
    this.visit(node.args[0], item);
    this.visit(node.args[1], item);
};

CriteriaBuilder.prototype.visitNot = function(node, parentItem) {
    var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
    parentItem.children.push(item);
    this.visit(node.args[0], item);
};

CriteriaBuilder.prototype.visit = function(node, parentItem) {
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

CriteriaBuilder.prototype.build = function() {
    var self = this;
    this.rootRql.args.forEach(function(node) {
        self.visit(node, self.rootItem);
    });
};

"use strict";

function CriteriaIdGenerator() {}

CriteriaIdGenerator.generate = function(taxonomy, vocabulary, term) {
    return taxonomy && vocabulary ? taxonomy.name + "." + vocabulary.name + (term ? "." + term.name : "") : undefined;
};

"use strict";

function CriteriaItemBuilder(LocalizedValues, useLang, SetService) {
    var criteria = {
        type: null,
        rqlQuery: null,
        lang: useLang || "en",
        parent: null,
        children: []
    };
    var builder = this;
    this.type = function(value) {
        if (!RQL_NODE[value.toUpperCase()]) {
            throw new Error("Invalid node type:", value);
        }
        criteria.type = value;
        return this;
    };
    this.target = function(value) {
        criteria.target = value;
        return this;
    };
    this.parent = function(value) {
        criteria.parent = value;
        return this;
    };
    this.taxonomy = function(value) {
        criteria.taxonomy = value;
        return this;
    };
    this.vocabulary = function(value) {
        criteria.vocabulary = value;
        if (criteria.vocabulary.name === "sets") {
            switch (criteria.taxonomy.name) {
              case "Mica_variable":
                appendSetTerms(criteria, "variables");
                break;

              case "Mica_dataset":
                appendSetTerms(criteria, "datasets");
                break;

              case "Mica_study":
                appendSetTerms(criteria, "studies");
                break;

              case "Mica_network":
                appendSetTerms(criteria, "networks");
                break;
            }
        }
        return this;
    };
    this.term = function(value) {
        if (Array.isArray(value)) {
            return builder.selectedTerms(value);
        } else {
            criteria.term = value;
            return this;
        }
    };
    this.rqlQuery = function(value) {
        criteria.rqlQuery = value;
        return this;
    };
    this.selectedTerm = function(term) {
        if (!criteria.selectedTerms) {
            criteria.selectedTerms = [];
        }
        criteria.selectedTerms.push(typeof term === "string" || typeof term === "number" ? term : term.name);
        return this;
    };
    this.selectedTerms = function(terms) {
        criteria.selectedTerms = terms.filter(function(term) {
            return term;
        }).map(function(term) {
            if (typeof term === "string" || typeof term === "number") {
                return term;
            } else {
                return term.name;
            }
        });
        return this;
    };
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
        } else {
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
    function appendSetTerms(criteria, documentType) {
        var cartSet = SetService.getCartSet(documentType);
        if (cartSet) {
            var cartTerm;
            if (criteria.vocabulary.terms) {
                var cTerm = criteria.vocabulary.terms.filter(function(term) {
                    return term.name === "cart";
                });
                if (cTerm.length > 0) {
                    cartTerm = cTerm[0];
                }
            }
            if (!cartTerm) {
                cartTerm = {
                    title: [ {
                        locale: "en",
                        text: "Cart"
                    }, {
                        locale: "fr",
                        text: "Panier"
                    } ]
                };
            }
            cartTerm.name = cartSet.id;
            criteria.vocabulary.terms = [ cartTerm ];
        } else {
            criteria.vocabulary.terms = [];
        }
    }
    this.build = function() {
        if (criteria.taxonomy && criteria.vocabulary) {
            prepareForLeaf();
        }
        return new CriteriaItem(criteria);
    };
}

"use strict";

function CriteriaItem(model) {
    var self = this;
    Object.keys(model).forEach(function(k) {
        self[k] = model[k];
    });
}

CriteriaItem.prototype.isRepeatable = function() {
    return false;
};

CriteriaItem.prototype.getTarget = function() {
    return this.target || null;
};

CriteriaItem.prototype.getRangeTerms = function() {
    var range = {
        from: null,
        to: null
    };
    if (this.type === RQL_NODE.BETWEEN) {
        range.from = this.selectedTerms[0];
        range.to = this.selectedTerms[1];
    } else if (this.type === RQL_NODE.GE) {
        range.from = this.selectedTerms[0];
        range.to = null;
    } else if (this.type === RQL_NODE.LE) {
        range.from = null;
        range.to = this.selectedTerms[0];
    }
    return range;
};

"use strict";

(function() {
    function CriteriaReducer() {}
    CriteriaReducer.reduce = function(parentItem, criteriaItem) {
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
        } else if (criteriaItem.type !== RQL_NODE.VARIABLE && parentItem.type === RQL_NODE.AND) {
            CriteriaReducer.reduce(parentItem.parent, parentItem);
        }
    };
    ngObibaMica.search.CriteriaReducer = CriteriaReducer;
})();

"use strict";

function RepeatableCriteriaItem() {
    CriteriaItem.call(this, {});
    this.list = [];
}

RepeatableCriteriaItem.prototype = Object.create(CriteriaItem.prototype);

RepeatableCriteriaItem.prototype.isRepeatable = function() {
    return true;
};

RepeatableCriteriaItem.prototype.addItem = function(item) {
    this.list.push(item);
    return this;
};

RepeatableCriteriaItem.prototype.items = function() {
    return this.list;
};

RepeatableCriteriaItem.prototype.first = function() {
    return this.list[0];
};

RepeatableCriteriaItem.prototype.getTarget = function() {
    return this.list.length > 0 ? this.list[0].getTarget() : null;
};

"use strict";

(function() {
    var pageSizes = [ {
        label: "10",
        value: 10
    }, {
        label: "20",
        value: 20
    }, {
        label: "50",
        value: 50
    }, {
        label: "100",
        value: 100
    } ];
    ngObibaMica.search.PaginationState = function(target, defaultPageSize) {
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
    ngObibaMica.search.PaginationState.prototype.updateRange = function() {
        var pageSize = this.selected.value;
        var current = this.currentPage;
        this.from = pageSize * (current - 1) + 1;
        this.to = Math.min(this.totalHits, pageSize * current);
    };
    ngObibaMica.search.PaginationState.prototype.initializeCurrentPage = function(pagination) {
        if (pagination && pagination.hasOwnProperty("from")) {
            this.selected = this.findPageSize(pagination.size);
            this.currentPage = 1 + pagination.from / this.selected.value;
        } else {
            this.selected = this.findPageSize(this.initialPageSize);
            this.currentPage = 1;
        }
    };
    ngObibaMica.search.PaginationState.prototype.update = function(pagination, hits) {
        this.totalHits = hits || null;
        this.initializeCurrentPage(pagination);
        this.updateRange();
        this.updatePageCount();
        this.updateMaxSize();
    };
    ngObibaMica.search.PaginationState.prototype.findPageSize = function(pageSize) {
        var result = pageSizes.filter(function(p) {
            return p.value === pageSize;
        }).pop();
        return result ? result : pageSizes[0];
    };
    ngObibaMica.search.PaginationState.prototype.totalHitsChanged = function(hits) {
        return null !== this.totalHits && this.totalHits !== hits;
    };
    ngObibaMica.search.PaginationState.prototype.updatePageCount = function() {
        this.pageCount = Math.ceil(this.totalHits / this.selected.value);
    };
    ngObibaMica.search.PaginationState.prototype.updateMaxSize = function() {
        this.maxSize = Math.min(3, this.pageCount);
    };
    ngObibaMica.search.PaginationState.prototype.data = function() {
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

"use strict";

(function() {
    function getTaxonomyWeightAttribute(taxonomy) {
        var defaultWeight = 0;
        if (taxonomy.attributes) {
            var weightAttribute = taxonomy.attributes.filter(function(attribute) {
                return "weight" === attribute.key;
            })[0];
            defaultWeight = weightAttribute ? parseInt(weightAttribute.value) || 0 : 0;
        }
        return defaultWeight;
    }
    ngObibaMica.search.MetaTaxonomyParser = function(config) {
        function parseTerms(targetConfig, terms) {
            return terms.map(function(taxonomy, index) {
                var result = {
                    state: new ngObibaMica.search.PanelTaxonomyState(index + ""),
                    info: {
                        name: taxonomy.name || "",
                        title: taxonomy.title || "",
                        description: taxonomy.description || "",
                        weight: getTaxonomyWeightAttribute(taxonomy)
                    },
                    taxonomies: [ taxonomy ]
                };
                var taxonomyConfig = targetConfig.taxonomies[taxonomy.name];
                if (taxonomyConfig && taxonomyConfig.hasOwnProperty("trKey")) {
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
            taxonomies.sort(function(a, b) {
                return a.info.weight - b.info.weight;
            });
        }
        this.config = config;
        this.parseTerms = parseTerms;
        this.createResultObject = createResultObject;
        this.sortTaxonomies = sortTaxonomies;
    };
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function(metaVocabulary) {
        return this.createResultObject(metaVocabulary, this.parseTerms(this.config[metaVocabulary.name], metaVocabulary.terms || []));
    };
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function(metaVocabulary) {
        var metaTaxonomies = metaVocabulary.terms.filter(function(term) {
            return [ "Variable_chars", "Scales" ].indexOf(term.name) > -1;
        }).reduce(function(acc, term) {
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
                    names: scales.terms.map(function(t) {
                        return t.name;
                    }),
                    title: scales.title,
                    description: scales.description || "",
                    weight: getTaxonomyWeightAttribute(scales)
                },
                taxonomies: scales.terms
            });
        }
        this.sortTaxonomies(taxonomies);
        return this.createResultObject(metaVocabulary, taxonomies);
    };
})();

(function() {
    "use strict";
    ngObibaMica.search.PanelTaxonomyState = function(id) {
        var STATES = {
            NONE: 0,
            ACTIVE: 1,
            LOADING: 2
        };
        this.id = id;
        this.STATES = STATES;
        this.state = STATES.NONE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isLoading = function() {
        return this.STATES.LOADING === (this.state & this.STATES.LOADING);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isActive = function() {
        return this.STATES.ACTIVE === (this.state & this.STATES.ACTIVE);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.active = function() {
        this.state = this.state | this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.inactive = function() {
        this.state = this.state & ~this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loading = function() {
        this.state = this.state | this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loaded = function() {
        this.state = this.state & ~this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.none = function() {
        this.state = this.STATES.NONE;
    };
})();

"use strict";

(function() {
    ngObibaMica.search.factory("DocumentSuggestionResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("DocumentSuggestion"), {}, {
            query: {
                method: "GET",
                errorHandler: true,
                isArray: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("JoinQueryCoverageResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var resourceUrl = ngObibaMicaUrl.getUrl("JoinQueryCoverageResource");
        var method = resourceUrl.indexOf(":query") === -1 ? "POST" : "GET";
        var contentType = method === "POST" ? "application/x-www-form-urlencoded" : "application/json";
        var requestTransformer = function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };
        return $resource(resourceUrl, {}, {
            get: {
                method: method,
                headers: {
                    "Content-Type": contentType
                },
                transformRequest: requestTransformer,
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("JoinQuerySearchResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var resourceUrl = ngObibaMicaUrl.getUrl("JoinQuerySearchResource");
        var actionFactory = function(type) {
            var method = resourceUrl.indexOf(":query") === -1 ? "POST" : "GET";
            var contentType = method === "POST" ? "application/x-www-form-urlencoded" : "application/json";
            var requestTransformer = function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            };
            return {
                method: method,
                headers: {
                    "Content-Type": contentType
                },
                errorHandler: true,
                params: {
                    type: type
                },
                transformRequest: requestTransformer
            };
        };
        return $resource(resourceUrl, {}, {
            variables: actionFactory("variables"),
            studies: actionFactory("studies"),
            networks: actionFactory("networks"),
            datasets: actionFactory("datasets")
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("TaxonomiesResource", [ "$resource", "ngObibaMicaUrl", "$cacheFactory", function($resource, ngObibaMicaUrl, $cacheFactory) {
        return $resource(ngObibaMicaUrl.getUrl("TaxonomiesResource"), {}, {
            get: {
                method: "GET",
                isArray: true,
                errorHandler: true,
                cache: $cacheFactory("taxonomiesResource")
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("TaxonomiesSearchResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("TaxonomiesSearchResource"), {}, {
            get: {
                method: "GET",
                isArray: true,
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("TaxonomyResource", [ "$resource", "ngObibaMicaUrl", "$cacheFactory", function($resource, ngObibaMicaUrl, $cacheFactory) {
        return $resource(ngObibaMicaUrl.getUrl("TaxonomyResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true,
                cache: $cacheFactory("taxonomyResource")
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("VocabularyResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("VocabularyResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    function manageSearchHelpText($scope, $translate, $cookies) {
        var cookiesSearchHelp = "micaHideSearchHelpText";
        var cookiesClassificationHelp = "micaHideClassificationHelpBox";
        $translate([ "search.help", "search.coverage-help" ]).then(function(translation) {
            if (!$scope.options.SearchHelpText && !$cookies.get(cookiesSearchHelp)) {
                $scope.options.SearchHelpText = translation["search.help"];
            }
            if (!$scope.options.ClassificationHelpText && !$cookies.get(cookiesClassificationHelp)) {
                $scope.options.ClassificationHelpText = translation["classifications.help"];
            }
        });
        $scope.closeHelpBox = function() {
            $cookies.put(cookiesSearchHelp, true);
            $scope.options.SearchHelpText = null;
        };
        $scope.closeClassificationHelpBox = function() {
            $cookies.put(cookiesClassificationHelp, true);
            $scope.options.ClassificationHelpText = null;
        };
        if ($cookies.get(cookiesSearchHelp)) {
            $scope.options.SearchHelpText = null;
        }
        if ($cookies.get(cookiesClassificationHelp)) {
            $scope.options.ClassificationHelpText = null;
        }
    }
    ngObibaMica.search.controller("SearchController", [ "$timeout", "$scope", "$rootScope", "$location", "$translate", "$filter", "$cookies", "ngObibaMicaSearchTemplateUrl", "ObibaServerConfigResource", "JoinQuerySearchResource", "JoinQueryCoverageResource", "AlertService", "ServerErrorUtils", "LocalizedValues", "RqlQueryService", "RqlQueryUtils", "SearchContext", "CoverageGroupByService", "VocabularyService", "EntitySuggestionRqlUtilityService", "SearchControllerFacetHelperService", "options", "PaginationService", function($timeout, $scope, $rootScope, $location, $translate, $filter, $cookies, ngObibaMicaSearchTemplateUrl, ObibaServerConfigResource, JoinQuerySearchResource, JoinQueryCoverageResource, AlertService, ServerErrorUtils, LocalizedValues, RqlQueryService, RqlQueryUtils, SearchContext, CoverageGroupByService, VocabularyService, EntitySuggestionRqlUtilityService, SearchControllerFacetHelperService, options, PaginationService) {
        $scope.options = options;
        manageSearchHelpText($scope, $translate, $cookies);
        $scope.taxonomyTypeMap = {
            variable: "variables",
            study: "studies",
            network: "networks",
            dataset: "datasets"
        };
        $translate([ "search.classifications-title", "search.classifications-link", "search.faceted-navigation-help" ]).then(function(translation) {
            $scope.hasClassificationsTitle = translation["search.classifications-title"];
            $scope.hasClassificationsLinkLabel = translation["search.classifications-link"];
            $scope.hasFacetedNavigationHelp = translation["search.faceted-navigation-help"];
        });
        var searchTaxonomyDisplay = {
            variable: $scope.options.variables.showSearchTab,
            dataset: $scope.options.datasets.showSearchTab,
            study: $scope.options.studies.showSearchTab,
            network: $scope.options.networks.showSearchTab
        };
        var taxonomyTypeInverseMap = Object.keys($scope.taxonomyTypeMap).reduce(function(prev, k) {
            prev[$scope.taxonomyTypeMap[k]] = k;
            return prev;
        }, {});
        $scope.targets = [];
        $scope.lang = $translate.use();
        function initSearchTabs() {
            function getTabsOrderParam(arg) {
                var value = $location.search()[arg];
                return value && value.split(",").filter(function(t) {
                    return t;
                }).map(function(t) {
                    return t.trim();
                });
            }
            var targetTabsOrderParam = getTabsOrderParam("targetTabsOrder");
            $scope.targetTabsOrder = (targetTabsOrderParam || $scope.options.targetTabsOrder).filter(function(t) {
                return searchTaxonomyDisplay[t];
            });
            var searchTabsOrderParam = getTabsOrderParam("searchTabsOrder");
            $scope.searchTabsOrder = searchTabsOrderParam || $scope.options.searchTabsOrder;
            var resultTabsOrderParam = getTabsOrderParam("resultTabsOrder");
            $scope.resultTabsOrder = (resultTabsOrderParam || $scope.options.resultTabsOrder).filter(function(t) {
                return searchTaxonomyDisplay[t];
            });
            if ($location.search().target) {
                $scope.target = $location.search().target;
            } else if (!$scope.target) {
                $scope.target = $scope.targetTabsOrder[0];
            }
        }
        function onError(response) {
            $scope.search.result = {};
            $scope.search.loading = false;
            AlertService.alert({
                id: "SearchController",
                type: "danger",
                msg: ServerErrorUtils.buildMessage(response),
                delay: 5e3
            });
        }
        function canExecuteWithEmptyQuery() {
            return $scope.search.layout === "layout2" || $scope.search.query;
        }
        function validateType(type) {
            if (!type || !QUERY_TYPES[type.toUpperCase()]) {
                throw new Error("Invalid type: " + type);
            }
        }
        function validateBucket(bucket) {
            if (bucket && (!BUCKET_TYPES[bucket.replace("-", "_").toUpperCase()] || !CoverageGroupByService.canGroupBy(bucket))) {
                throw new Error("Invalid bucket " + bucket);
            }
        }
        function validateDisplay(display) {
            if (!display || !DISPLAY_TYPES[display.toUpperCase()]) {
                throw new Error("Invalid display: " + display);
            }
        }
        function getDefaultQueryType() {
            return $scope.taxonomyTypeMap[$scope.resultTabsOrder[0]];
        }
        function getDefaultDisplayType() {
            return $scope.searchTabsOrder[0] || DISPLAY_TYPES.LIST;
        }
        function resolveLayout(resolvedOptions) {
            return resolvedOptions.listLayout ? resolvedOptions.listLayout : resolvedOptions.searchLayout ? resolvedOptions.searchLayout : "layout2";
        }
        function validateQueryData() {
            try {
                var search = $location.search();
                var type = $scope.resultTabsOrder.indexOf(taxonomyTypeInverseMap[search.type]) > -1 ? search.type : getDefaultQueryType();
                var bucket = search.bucket && CoverageGroupByService.canGroupBy(search.bucket) ? search.bucket : CoverageGroupByService.defaultBucket();
                var display = $scope.searchTabsOrder.indexOf(search.display) > -1 ? search.display : getDefaultDisplayType();
                var query = search.query || "";
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
            } catch (e) {
                AlertService.alert({
                    id: "SearchController",
                    type: "danger",
                    msg: e.message,
                    delay: 5e3
                });
            }
            return false;
        }
        function setLayout(layout) {
            return layout ? [ "layout1", "layout2" ].indexOf(layout) > -1 ? layout : "layout2" : "layout2";
        }
        var clearSearchQuery = function() {
            var search = $location.search();
            delete search.query;
            $location.search(search);
        };
        var toggleSearchQuery = function() {
            $scope.search.advanced = !$scope.search.advanced;
        };
        var showAdvanced = function() {
            var children = $scope.search.criteria.children || [];
            for (var i = children.length; i--; ) {
                var vocabularyChildren = children[i].children || [];
                for (var j = vocabularyChildren.length; j--; ) {
                    if (vocabularyChildren[j].type === RQL_NODE.OR || vocabularyChildren[j].type === RQL_NODE.AND) {
                        return true;
                    }
                }
            }
        };
        function sortCriteriaItems(items) {
            items.sort(function(a, b) {
                if (a.target === "network" || b.target === "variable") {
                    return -1;
                }
                if (a.target === "variable" || b.target === "network") {
                    return 1;
                }
                if (a.target < b.target) {
                    return 1;
                }
                if (a.target > b.target) {
                    return -1;
                }
                return 0;
            });
        }
        function loadResults() {
            if ($location.path() !== "/search") {
                return;
            }
            function updateSortByType() {
                var rqlSort = RqlQueryService.getTargetQuerySort($scope.search.type, $scope.search.rqlQuery);
                var sort = rqlSort && rqlSort.args ? rqlSort.args : null;
                if (!sort) {
                    sort = $scope.search.type === QUERY_TYPES.VARIABLES ? SORT_FIELDS.NAME : SORT_FIELDS.ACRONYM;
                    if ($scope.search.type === QUERY_TYPES.VARIABLES) {
                        sort = [ SORT_FIELDS.VARIABLE_TYPE, SORT_FIELDS.CONTAINER_ID, SORT_FIELDS.POPULATION_WEIGHT, SORT_FIELDS.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.DATASET_ID, SORT_FIELDS.INDEX, SORT_FIELDS.NAME ];
                    } else if ($scope.search.type === QUERY_TYPES.DATASETS) {
                        sort = [ SORT_FIELDS.STUDY_TABLE.STUDY_ID, SORT_FIELDS.STUDY_TABLE.POPULATION_WEIGHT, SORT_FIELDS.STUDY_TABLE.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.ACRONYM ];
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
                JoinQuerySearchResource[$scope.search.type]({
                    query: localizedQuery
                }, function onSuccess(response) {
                    $scope.search.result.list = response;
                    $scope.search.loading = false;
                    $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
                    $timeout(function() {
                        var pagination = RqlQueryService.getQueryPaginations($scope.search.rqlQuery);
                        PaginationService.update(pagination, $scope.search.countResult);
                    });
                }, onError);
                break;

              case DISPLAY_TYPES.COVERAGE:
                var hasVariableCriteria = Object.keys($scope.search.criteriaItemMap).map(function(k) {
                    return $scope.search.criteriaItemMap[k];
                }).filter(function(item) {
                    return QUERY_TARGETS.VARIABLE === item.getTarget() && item.taxonomy.name !== "Mica_variable";
                }).length > 0;
                if (hasVariableCriteria) {
                    $scope.search.loading = true;
                    $scope.search.executedQuery = RqlQueryService.prepareCoverageQuery(localizedQuery, $scope.search.bucket);
                    JoinQueryCoverageResource.get({
                        query: $scope.search.executedQuery
                    }, function onSuccess(response) {
                        $scope.search.result.coverage = response;
                        $scope.search.loading = false;
                        $scope.search.countResult = response.totalCounts;
                    }, onError);
                } else {
                    $scope.search.result = {};
                }
                break;

              case DISPLAY_TYPES.GRAPHICS:
                $scope.search.loading = true;
                $scope.search.executedQuery = RqlQueryService.prepareGraphicsQuery(localizedQuery, [ "Mica_study.populations-selectionCriteria-countriesIso", "Mica_study.populations-dataCollectionEvents-bioSamples", "Mica_study.numberOfParticipants-participant-number" ], [ "Mica_study.methods-design" ]);
                JoinQuerySearchResource.studies({
                    query: $scope.search.executedQuery
                }, function onSuccess(response) {
                    $scope.search.result.graphics = response;
                    $scope.search.loading = false;
                    $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
                }, onError);
                break;
            }
        }
        function findAndSetCriteriaItemForTaxonomyVocabularies(target, taxonomy) {
            if (Array.isArray(taxonomy)) {
                taxonomy.forEach(function(subTaxonomy) {
                    subTaxonomy.vocabularies.forEach(function(taxonomyVocabulary) {
                        taxonomyVocabulary.existingItem = RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(subTaxonomy, taxonomyVocabulary), $scope.search.criteria, true);
                    });
                });
            } else {
                taxonomy.vocabularies.forEach(function(taxonomyVocabulary) {
                    taxonomyVocabulary.existingItem = RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
                });
            }
        }
        function executeSearchQuery() {
            if (validateQueryData()) {
                RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function(result) {
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
                    $scope.$broadcast("ngObibaMicaQueryUpdated", $scope.search.criteria);
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
                        taxonomyVocabulary.matchString = existingItem.selectedTerms.join("");
                    }
                    taxonomyVocabulary.wholeVocabularyIsSelected = [ "exists", "match" ].indexOf(existingItem.type) > -1;
                    (taxonomyVocabulary.terms || []).forEach(function(term) {
                        term.selected = existingItem.type === "exists" || existingItem.selectedTerms.indexOf(term.name) > -1;
                    });
                } else {
                    taxonomyVocabulary.rangeTerms = {};
                    taxonomyVocabulary.matchString = null;
                    taxonomyVocabulary.wholeVocabularyIsSelected = false;
                    (taxonomyVocabulary.terms || []).forEach(function(term) {
                        term.selected = false;
                    });
                }
                taxonomyVocabulary._existingItem = existingItem;
            }
            taxonomyVocabulary.__defineSetter__("existingItem", processExistingItem);
            taxonomyVocabulary.__defineGetter__("existingItem", function() {
                return taxonomyVocabulary._existingItem;
            });
            taxonomyVocabulary.existingItem = RqlQueryService.findCriteriaItemFromTreeById(target, CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
        }
        function onTaxonomyFilterPanelToggleVisibility(target, taxonomy) {
            if (target && taxonomy) {
                if (Array.isArray(taxonomy)) {
                    taxonomy.forEach(function(subTaxonomy) {
                        subTaxonomy.vocabularies.forEach(function(taxonomyVocabulary) {
                            processTaxonomyVocabulary(target, subTaxonomy, taxonomyVocabulary);
                        });
                    });
                } else {
                    taxonomy.vocabularies.forEach(function(taxonomyVocabulary) {
                        processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary);
                    });
                }
            }
            $scope.search.selectedTarget = target;
            $scope.search.selectedTaxonomy = taxonomy;
            $scope.search.showTaxonomyPanel = taxonomy !== null;
            if (!$scope.search.showTaxonomyPanel) {
                loadResults();
            }
        }
        $rootScope.$on("$translateChangeSuccess", function(event, value) {
            if (value.language !== SearchContext.currentLocale()) {
                $scope.lang = $translate.use();
                SearchContext.setLocale($scope.lang);
                executeSearchQuery();
            }
        });
        var refreshQuery = function() {
            var query = new RqlQuery().serializeArgs($scope.search.rqlQuery.args);
            var search = $location.search();
            if ("" === query) {
                delete search.query;
            } else {
                search.query = query;
            }
            $location.search(search);
        };
        var replaceQuery = function() {
            var query = new RqlQuery().serializeArgs($scope.search.rqlQuery.args);
            var search = $location.search();
            if ("" === query) {
                delete search.query;
            } else {
                search.query = query;
            }
            $location.search(search).replace();
        };
        var removeCriteriaItem = function(item) {
            RqlQueryService.removeCriteriaItem(item);
            refreshQuery();
        };
        var selectCriteria = function(item, logicalOp, replace, showNotification, fullCoverage) {
            if (angular.isUndefined(showNotification)) {
                showNotification = true;
            }
            if (item.id) {
                var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
                var existingItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
                var growlMsgKey;
                if (existingItem && id.indexOf("dceId") !== -1 && fullCoverage) {
                    removeCriteriaItem(existingItem);
                    growlMsgKey = "search.criterion.updated";
                    RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
                } else if (existingItem) {
                    growlMsgKey = "search.criterion.updated";
                    RqlQueryService.updateCriteriaItem(existingItem, item, replace);
                } else {
                    growlMsgKey = "search.criterion.created";
                    RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
                }
                if (showNotification) {
                    AlertService.growl({
                        id: "SearchControllerGrowl",
                        type: "info",
                        msgKey: growlMsgKey,
                        msgArgs: [ LocalizedValues.forLocale(item.vocabulary.title, $scope.lang), $filter("translate")("taxonomy.target." + item.target) ],
                        delay: 3e3
                    });
                }
                refreshQuery();
            }
        };
        var onTypeChanged = function(type) {
            if (type) {
                validateType(type);
                var search = $location.search();
                search.type = type;
                search.display = DISPLAY_TYPES.LIST;
                $location.search(search);
            }
        };
        var onBucketChanged = function(bucket) {
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
                } catch (error) {
                    var defaultBucket = CoverageGroupByService.defaultBucket();
                    $location.search("bucket", defaultBucket).replace();
                }
            }
        }
        var onPaginate = function(target, from, size, replace) {
            $scope.search.rqlQuery = $scope.search.rqlQuery || new RqlQueryUtils(RQL_NODE.AND);
            RqlQueryService.prepareQueryPagination($scope.search.rqlQuery, target, from, size);
            if (replace) {
                replaceQuery();
            } else {
                refreshQuery();
            }
        };
        var onDisplayChanged = function(display) {
            if (display) {
                validateDisplay(display);
                var search = $location.search();
                search.display = display;
                $location.search(search);
            }
        };
        var onUpdateCriteria = function(item, type, useCurrentDisplay, replaceTarget, showNotification, fullCoverage) {
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
        };
        var onRemoveCriteria = function(item) {
            var found = RqlQueryService.findCriterion($scope.search.criteria, item.id);
            removeCriteriaItem(found);
        };
        var onSelectTerm = function(target, taxonomy, vocabulary, args) {
            args = args || {};
            if (args.text) {
                args.text = args.text.replace(/[^a-zA-Z0-9" _-]/g, "");
            }
            if (angular.isString(args)) {
                args = {
                    term: args
                };
            }
            if (vocabulary) {
                var item;
                if (VocabularyService.isNumericVocabulary(vocabulary)) {
                    item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                    item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
                    RqlQueryUtils.updateRangeQuery(item.rqlQuery, args.from, args.to);
                    selectCriteria(item, null, true);
                    return;
                } else if (VocabularyService.isMatchVocabulary(vocabulary)) {
                    item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                    item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
                    RqlQueryUtils.updateMatchQuery(item.rqlQuery, args.text);
                    selectCriteria(item, null, true);
                    return;
                }
            }
            if (options.searchLayout === "layout1") {
                selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang));
            } else {
                var selected = vocabulary.terms.filter(function(t) {
                    return t.selected;
                }).map(function(t) {
                    return t.name;
                }), criterion = RqlQueryService.findCriterion($scope.search.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));
                if (criterion && args.term) {
                    criterion.rqlQuery.name = RQL_NODE.IN;
                    if (args.term.selected) {
                        criterion.rqlQuery = RqlQueryUtils.mergeInQueryArgValues(criterion.rqlQuery, [ args.term.name ]);
                    } else {
                        var currentTerms = criterion.rqlQuery.args[1] || [];
                        if (criterion.type === RQL_NODE.EXISTS) {
                            currentTerms = criterion.vocabulary.terms.map(function(term) {
                                return term.name;
                            });
                        }
                        var index = currentTerms.indexOf(args.term.name);
                        currentTerms = Array.isArray(currentTerms) ? currentTerms : [ currentTerms ];
                        if (index > -1) {
                            currentTerms.splice(index, 1);
                            if (currentTerms.length === 0) {
                                criterion.rqlQuery.name = RQL_NODE.EXISTS;
                            }
                        } else {
                            currentTerms.push(args.term.name);
                        }
                        criterion.rqlQuery = RqlQueryUtils.mergeInQueryArgValues(criterion.rqlQuery, currentTerms);
                    }
                    if (vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length) {
                        criterion.rqlQuery.name = RQL_NODE.EXISTS;
                        criterion.rqlQuery.args.pop();
                    }
                    $scope.refreshQuery();
                } else {
                    var setExists = vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length;
                    selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, !setExists && (args && args.term), $scope.lang));
                }
            }
        };
        var VIEW_MODES = {
            SEARCH: "search",
            CLASSIFICATION: "classification"
        };
        var SUGGESTION_FIELDS_MAP = new Map([ [ QUERY_TARGETS.NETWORK, [ "acronym", "name" ] ], [ QUERY_TARGETS.STUDY, [ "acronym", "name" ] ], [ QUERY_TARGETS.DATASET, [ "acronym", "name" ] ], [ QUERY_TARGETS.VARIABLE, [ "name", "label" ] ] ]);
        function searchSuggestion(target, suggestion, withSpecificFields) {
            var rqlQuery = $scope.search.rqlQuery;
            var targetQuery = RqlQueryService.findTargetQuery(target, rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(target);
                rqlQuery.push(targetQuery);
            }
            var filterFields;
            if (withSpecificFields) {
                filterFields = SUGGESTION_FIELDS_MAP.get(target);
            }
            var matchQuery = EntitySuggestionRqlUtilityService.createMatchQuery(suggestion, filterFields);
            if (!matchQuery) {
                EntitySuggestionRqlUtilityService.removeFilteredMatchQueryFromTargetQuery(targetQuery);
            } else {
                var filterQuery = EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery);
                if (!filterQuery) {
                    targetQuery.push(new RqlQuery(RQL_NODE.FILTER).push(matchQuery));
                } else {
                    var currentMatchQuery = EntitySuggestionRqlUtilityService.givenFilterQueryGetMatchQuery(filterQuery);
                    if (currentMatchQuery) {
                        currentMatchQuery.args = matchQuery.args;
                    } else {
                        filterQuery.push(matchQuery);
                    }
                }
            }
            refreshQuery();
        }
        $scope.searchSuggestion = searchSuggestion;
        $scope.goToSearch = function() {
            $scope.viewMode = VIEW_MODES.SEARCH;
            $location.search("taxonomy", null);
            $location.search("vocabulary", null);
            $location.search("target", null);
            $location.path("/search");
        };
        $scope.goToClassifications = function() {
            $scope.viewMode = VIEW_MODES.CLASSIFICATION;
            $location.path("/classifications");
            $location.search("target", $scope.targetTabsOrder[0]);
        };
        $scope.navigateToTarget = function(target) {
            $location.search("target", target);
            $location.search("taxonomy", null);
            $location.search("vocabulary", null);
            $scope.target = target;
        };
        $scope.QUERY_TYPES = QUERY_TYPES;
        $scope.BUCKET_TYPES = BUCKET_TYPES;
        $scope.search = {
            layout: "layout2",
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
        $scope.searchHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl("search");
        $scope.classificationsHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl("classifications");
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
        $scope.inSearchMode = function() {
            return $scope.viewMode === VIEW_MODES.SEARCH;
        };
        $scope.toggleFullscreen = function() {
            $scope.isFullscreen = !$scope.isFullscreen;
        };
        $scope.isSearchAvailable = true;
        ObibaServerConfigResource.get(function(micaConfig) {
            $scope.isSearchAvailable = !micaConfig.isSingleStudyEnabled || micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled || micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
        });
        $scope.unbindLocationChange = $scope.$on("$locationChangeSuccess", onLocationChange);
        $rootScope.$on("ngObibaMicaSearch.fullscreenChange", function(obj, isEnabled) {
            $scope.isFullscreen = isEnabled;
        });
        $rootScope.$on("ngObibaMicaSearch.sortChange", function(obj, sort) {
            $scope.search.rqlQuery = RqlQueryService.prepareSearchQueryNoFields($scope.search.display, $scope.search.type, $scope.search.rqlQuery, $scope.lang, sort);
            refreshQuery();
        });
        $rootScope.$on("ngObibaMicaSearch.searchSuggestion", function(event, suggestion, target, withSpecificFields) {
            searchSuggestion(target, suggestion, withSpecificFields);
        });
        function init() {
            $scope.taxonomyNav = [];
            $scope.lang = $translate.use();
            SearchContext.setLocale($scope.lang);
            initSearchTabs();
            SearchControllerFacetHelperService.help($scope.targetTabsOrder, $scope.lang).then(function(data) {
                $scope.facetedTaxonomies = data.getFacetedTaxonomies();
                $scope.hasFacetedTaxonomies = data.getHasFacetedTaxonomies();
                $scope.targetTabsOrder = data.getTabOrderTodisplay();
                $scope.taxonomyNav = data.getTaxonomyNav();
            });
            executeSearchQuery();
        }
        init();
    } ]).controller("ResultTabsOrderCountController", [ function() {} ]);
})();

"use strict";

ngObibaMica.search.config([ "$routeProvider", function($routeProvider) {
    var optionsResolve = [ "ngObibaMicaSearch", function(ngObibaMicaSearch) {
        return ngObibaMicaSearch.getOptionsAsyn();
    } ];
    $routeProvider.when("/search", {
        templateUrl: "search/views/search-layout.html",
        controller: "SearchController",
        reloadOnSearch: false,
        resolve: {
            options: optionsResolve
        }
    }).when("/classifications", {
        templateUrl: "search/views/classifications.html",
        controller: "SearchController",
        reloadOnSearch: false,
        resolve: {
            options: optionsResolve
        }
    });
} ]);

"use strict";

var CoverageGroupByService = function() {
    function CoverageGroupByService(ngObibaMicaSearch) {
        this.options = ngObibaMicaSearch.getOptions();
        this.groupByOptions = this.options.coverage.groupBy;
    }
    CoverageGroupByService.prototype.isSingleStudy = function() {
        return !this.options.studies.showSearchTab;
    };
    CoverageGroupByService.prototype.canShowStudyType = function() {
        return this.options.studies.studiesColumn.showStudiesTypeColumn;
    };
    CoverageGroupByService.prototype.canShowStudy = function() {
        return this.groupByOptions.study || this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDce = function(bucket) {
        return (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1) && this.groupByOptions.study && this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDataset = function() {
        return this.groupByOptions.dataset;
    };
    CoverageGroupByService.prototype.canShowVariableTypeFilter = function(bucket) {
        var forStudy = (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1) && this.groupByOptions.study;
        var forDataset = bucket.indexOf("dataset") > -1 && this.groupByOptions.dataset;
        return forStudy || forDataset;
    };
    CoverageGroupByService.prototype.studyTitle = function() {
        return "search.coverage-buckets.study";
    };
    CoverageGroupByService.prototype.studyBucket = function() {
        return BUCKET_TYPES.STUDY;
    };
    CoverageGroupByService.prototype.dceBucket = function() {
        if (this.groupByOptions.study && this.groupByOptions.dce) {
            return BUCKET_TYPES.DCE;
        } else {
            return this.studyBucket();
        }
    };
    CoverageGroupByService.prototype.datasetTitle = function() {
        return "search.coverage-buckets.dataset";
    };
    CoverageGroupByService.prototype.datasetBucket = function() {
        return BUCKET_TYPES.DATASET;
    };
    CoverageGroupByService.prototype.canGroupBy = function(bucket) {
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
    CoverageGroupByService.prototype.defaultBucket = function() {
        if (this.groupByOptions.study) {
            if (this.options.studies.showSearchTab) {
                return this.studyBucket();
            } else {
                return this.dceBucket();
            }
        } else if (this.groupByOptions.dataset) {
            return this.datasetBucket();
        }
        return "";
    };
    return CoverageGroupByService;
}();

ngObibaMica.search.service("CoverageGroupByService", [ "ngObibaMicaSearch", CoverageGroupByService ]);

"use strict";

(function() {
    function CriteriaNodeCompileService($templateCache, $compile) {
        return {
            compile: function(scope, element, templateUrl) {
                var template = "";
                if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
                    template = angular.element($templateCache.get(templateUrl));
                } else {
                    template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
                }
                if (scope.item.rqlQuery.args) {
                    $compile(template)(scope, function(cloned) {
                        element.replaceWith(cloned);
                    });
                }
            }
        };
    }
    ngObibaMica.search.factory("CriteriaNodeCompileService", [ "$templateCache", "$compile", CriteriaNodeCompileService ]);
})();

"use strict";

(function() {
    function EntitySuggestionService($rootScope, $location, $translate, DocumentSuggestionResource, RqlQueryService, EntitySuggestionRqlUtilityService, AlertService, ServerErrorUtils) {
        function suggest(entityType, query) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanQuery = obibaUtils.cleanDoubleQuotesLeftUnclosed(query);
            cleanQuery = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanQuery);
            cleanQuery = obibaUtils.cleanSpecialLuceneCharacters(cleanQuery);
            if (entityType && query && cleanQuery.length > 1) {
                return DocumentSuggestionResource.query({
                    locale: $translate.use(),
                    documentType: entityType,
                    query: cleanQuery
                }).$promise.then(function(response) {
                    var parsedResponse = Array.isArray(response) ? response : [];
                    for (var i = 0; i < parsedResponse.length; i++) {
                        parsedResponse[i] = obibaUtils.quoteQuery(parsedResponse[i].replace(/\/.*/, ""));
                    }
                    return parsedResponse;
                }, function(response) {
                    AlertService.alert({
                        id: "SearchController",
                        type: "danger",
                        msg: ServerErrorUtils.buildMessage(response),
                        delay: 5e3
                    });
                });
            } else {
                return [];
            }
        }
        function suggestForTargetQuery(entityType, query) {
            var rql = RqlQueryService.parseQuery($location.search().query);
            var targetQuery = RqlQueryService.findTargetQuery(typeToTarget(entityType), rql);
            var classNameQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, "className");
            if (classNameQuery) {
                query = "className:" + classNameQuery.args[1] + " AND (" + query.replace(/\/.*/, "") + ")";
            }
            return suggest(entityType, query);
        }
        function getCurrentSuggestion(target, query) {
            if (query) {
                var targetQuery = RqlQueryService.findTargetQuery(target, query);
                if (targetQuery) {
                    var matchQuery = EntitySuggestionRqlUtilityService.givenFilterQueryGetMatchQuery(EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery));
                    if (matchQuery && matchQuery.args) {
                        if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length === 1) {
                            return matchQuery.args[0][0];
                        } else if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length > 1) {
                            return matchQuery.args[0].join(",");
                        }
                        return matchQuery.args[0].length ? matchQuery.args[0][0] : "";
                    } else {
                        return "";
                    }
                }
            }
            return "";
        }
        function selectSuggestion(target, suggestion, withSpecificFields) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanSuggestion = obibaUtils.cleanDoubleQuotesLeftUnclosed(suggestion);
            cleanSuggestion = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanSuggestion);
            cleanSuggestion = obibaUtils.cleanSpecialLuceneCharacters(cleanSuggestion);
            $rootScope.$new().$emit("ngObibaMicaSearch.searchSuggestion", cleanSuggestion, target, withSpecificFields);
        }
        this.getCurrentSuggestion = getCurrentSuggestion;
        this.suggest = suggest;
        this.selectSuggestion = selectSuggestion;
        this.suggestForTargetQuery = suggestForTargetQuery;
    }
    function EntitySuggestionRqlUtilityService() {
        function createMatchQueryArgs(suggestion, filterFields) {
            var args = [];
            args.push([ suggestion ]);
            if (Array.isArray(filterFields)) {
                args.push(filterFields);
            } else if (filterFields) {
                args.push([ filterFields ]);
            }
            return args;
        }
        function createMatchQuery(suggestion, filterFields) {
            var matchQuery = null;
            var trimmedSuggestion = suggestion.trim();
            if (trimmedSuggestion.length) {
                matchQuery = new RqlQuery(RQL_NODE.MATCH);
                matchQuery.args = createMatchQueryArgs(trimmedSuggestion, filterFields);
            }
            return matchQuery;
        }
        function givenTargetQueryGetFilterQuery(targetQuery) {
            if (!targetQuery) {
                return null;
            }
            return targetQuery.args.filter(function(arg) {
                return arg.name === RQL_NODE.FILTER;
            }).pop();
        }
        function givenFilterQueryGetMatchQuery(filterQuery) {
            if (!filterQuery) {
                return null;
            }
            return filterQuery.args.filter(function(arg) {
                return arg.name === RQL_NODE.MATCH;
            }).pop();
        }
        function removeFilteredMatchQueryFromTargetQuery(targetQuery) {
            var filterQuery = givenTargetQueryGetFilterQuery(targetQuery);
            if (!filterQuery) {
                return;
            }
            if (filterQuery.args.length === 1 && filterQuery.args[0].name === RQL_NODE.MATCH) {
                targetQuery.args = targetQuery.args.filter(function(arg) {
                    return arg.name !== RQL_NODE.FILTER;
                });
            } else {
                filterQuery.args = filterQuery.args.filter(function(arg) {
                    return arg.name !== RQL_NODE.MATCH;
                });
            }
        }
        this.createMatchQuery = createMatchQuery;
        this.givenTargetQueryGetFilterQuery = givenTargetQueryGetFilterQuery;
        this.givenFilterQueryGetMatchQuery = givenFilterQueryGetMatchQuery;
        this.removeFilteredMatchQueryFromTargetQuery = removeFilteredMatchQueryFromTargetQuery;
    }
    ngObibaMica.search.service("EntitySuggestionRqlUtilityService", EntitySuggestionRqlUtilityService);
    ngObibaMica.search.service("EntitySuggestionService", [ "$rootScope", "$location", "$translate", "DocumentSuggestionResource", "RqlQueryService", "EntitySuggestionRqlUtilityService", "AlertService", "ServerErrorUtils", EntitySuggestionService ]);
})();

"use strict";

(function() {
    function FullScreenService($document, $window, $rootScope) {
        var document = $document[0];
        var isKeyboardAvailbleOnFullScreen = typeof $window.Element !== "undefined" && "ALLOW_KEYBOARD_INPUT" in $window.Element && $window.Element.ALLOW_KEYBOARD_INPUT;
        var emitter = $rootScope.$new();
        var serviceInstance = {
            $on: angular.bind(emitter, emitter.$on),
            enable: function(element) {
                if (element.requestFullScreen) {
                    element.requestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    if (/Version\/[\d]{1,2}(\.[\d]{1,2}){1}(\.(\d){1,2}){0,1} Safari/.test($window.navigator.userAgent)) {
                        element.webkitRequestFullscreen();
                    } else {
                        element.webkitRequestFullscreen(isKeyboardAvailbleOnFullScreen);
                    }
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            },
            cancel: function() {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },
            isEnabled: function() {
                var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                return fullscreenElement ? true : false;
            }
        };
        $document.on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function() {
            emitter.$emit("ngObibaMicaSearch.fullscreenChange", serviceInstance.isEnabled());
        });
        return serviceInstance;
    }
    ngObibaMica.search.factory("FullScreenService", [ "$document", "$window", "$rootScope", FullScreenService ]);
})();

"use strict";

(function() {
    function MetaTaxonomyService($q, $translate, TaxonomyResource, ngObibaMicaSearch) {
        var taxonomyPanelOptions = ngObibaMicaSearch.getOptions().taxonomyPanelOptions, parser = new ngObibaMica.search.MetaTaxonomyParser(taxonomyPanelOptions);
        function getMetaTaxonomies() {
            return TaxonomyResource.get({
                target: QUERY_TARGETS.TAXONOMY,
                taxonomy: "Mica_taxonomy"
            }).$promise;
        }
        function getMetaTaxonomyForTargets(targets) {
            var deferred = $q.defer();
            getMetaTaxonomies().then(function(metaTaxonomy) {
                var metaVocabularies = (metaTaxonomy.vocabularies || []).filter(function(vocabulary) {
                    return targets.indexOf(vocabulary.name) > -1;
                });
                var taxonomies = metaVocabularies.map(function(vocabulary) {
                    switch (vocabulary.name) {
                      case QUERY_TARGETS.VARIABLE:
                        return parser.parseVariableTaxonomies(vocabulary);

                      case QUERY_TARGETS.NETWORK:
                      case QUERY_TARGETS.STUDY:
                      case QUERY_TARGETS.DATASET:
                        return parser.parseEntityTaxonomies(vocabulary);
                    }
                });
                taxonomies.sort(function(a, b) {
                    return targets.indexOf(a.name) - targets.indexOf(b.name);
                });
                deferred.resolve(taxonomies || []);
            });
            return deferred.promise;
        }
        function getTaxonomyPanelOptions() {
            return taxonomyPanelOptions;
        }
        this.getTaxonomyPanelOptions = getTaxonomyPanelOptions;
        this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
        this.getMetaTaxonomiesPromise = getMetaTaxonomies;
    }
    ngObibaMica.search.service("MetaTaxonomyService", [ "$q", "$translate", "TaxonomyResource", "ngObibaMicaSearch", MetaTaxonomyService ]);
})();

"use strict";

(function() {
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
        this.setOptions = function(newOptions) {
            if (typeof newOptions === "object") {
                Object.keys(newOptions).forEach(function(option) {
                    if (option in options) {
                        options[option] = newOptions[option];
                    }
                });
            }
        };
        this.getOptions = function() {
            return angular.copy(options);
        };
    }
    ngObibaMica.search.service("ObibaSearchConfig", ObibaSearchConfig);
})();

"use strict";

(function() {
    function PageUrlService(ngObibaMicaUrl, StringUtils, urlEncode) {
        this.studyPage = function(id, type) {
            var sType = (type.toLowerCase().indexOf("individual") > -1 ? "individual" : "harmonization") + "-study";
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl("StudyPage"), {
                ":type": urlEncode(sType),
                ":study": urlEncode(id)
            }) : "";
        };
        this.studyPopulationPage = function(id, type, populationId) {
            var sType = (type.toLowerCase() === "individual" ? "individual" : "harmonization") + "-study";
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl("StudyPopulationsPage"), {
                ":type": urlEncode(sType),
                ":study": urlEncode(id),
                ":population": urlEncode(populationId)
            }) : "";
        };
        this.networkPage = function(id) {
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl("NetworkPage"), {
                ":network": urlEncode(id)
            }) : "";
        };
        this.datasetPage = function(id, type) {
            var dsType = (type.toLowerCase() === "collected" ? "collected" : "harmonized") + "-dataset";
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl("DatasetPage"), {
                ":type": urlEncode(dsType),
                ":dataset": urlEncode(id)
            }) : "";
        };
        this.variablePage = function(id) {
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl("VariablePage"), {
                ":variable": urlEncode(id)
            }) : "";
        };
        this.downloadList = function(type, query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl("JoinQuerySearchCsvResource"), {
                ":type": type,
                ":query": query
            });
        };
        this.downloadCoverage = function(query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl("JoinQueryCoverageDownloadResource"), {
                ":query": query
            });
        };
        this.entitiesCountPage = function(query) {
            var url = ngObibaMicaUrl.getUrl("BaseUrl") + ngObibaMicaUrl.getUrl("EntitiesCountBaseUrl");
            if (query) {
                url = url + "?query=" + urlEncode(query);
            }
            return url;
        };
        this.searchPage = function(query) {
            var url = ngObibaMicaUrl.getUrl("BaseUrl") + ngObibaMicaUrl.getUrl("SearchBaseUrl");
            if (query) {
                url = url + "?query=" + urlEncode(query);
            }
            return url;
        };
        return this;
    }
    ngObibaMica.search.service("PageUrlService", [ "ngObibaMicaUrl", "StringUtils", "urlEncode", PageUrlService ]);
})();

"use strict";

(function() {
    function PaginationService(ngObibaMicaSearch) {
        var listeners = {};
        var states = Object.keys(QUERY_TARGETS).reduce(function(acc, key) {
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
                var hits = results[target + "TotalCount"].hits || 0;
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
                    throw new Error("PaginationService::registerListener() - listener must implement onUpdate()");
                }
                listeners[target] = listener;
            }
        }
        this.registerListener = registerListener;
        this.update = update;
    }
    ngObibaMica.search.service("PaginationService", [ "ngObibaMicaSearch", PaginationService ]);
})();

"use strict";

var QUERY_TYPES = {
    NETWORKS: "networks",
    STUDIES: "studies",
    DATASETS: "datasets",
    VARIABLES: "variables"
};

var QUERY_TARGETS = {
    NETWORK: "network",
    STUDY: "study",
    DATASET: "dataset",
    VARIABLE: "variable",
    TAXONOMY: "taxonomy"
};

var BUCKET_TYPES = {
    NETWORK: "network",
    STUDY: "study",
    STUDY_INDIVIDUAL: "study-individual",
    STUDY_HARMONIZATION: "study-harmonization",
    DCE: "dce",
    DCE_INDIVIDUAL: "dce-individual",
    DCE_HARMONIZATION: "dce-harmonization",
    DATASET: "dataset",
    DATASET_COLLECTED: "dataset-collected",
    DATASET_HARMONIZED: "dataset-harmonized",
    DATASCHEMA: "dataschema"
};

var RQL_NODE = {
    VARIABLE: "variable",
    DATASET: "dataset",
    STUDY: "study",
    NETWORK: "network",
    LIMIT: "limit",
    SORT: "sort",
    AND: "and",
    NAND: "nand",
    OR: "or",
    NOR: "nor",
    NOT: "not",
    FACET: "facet",
    LOCALE: "locale",
    AGGREGATE: "aggregate",
    BUCKET: "bucket",
    FIELDS: "fields",
    FILTER: "filter",
    CONTAINS: "contains",
    IN: "in",
    OUT: "out",
    EQ: "eq",
    GT: "gt",
    GE: "ge",
    LT: "lt",
    LE: "le",
    BETWEEN: "between",
    MATCH: "match",
    EXISTS: "exists",
    MISSING: "missing"
};

var SORT_FIELDS = {
    ACRONYM: "acronym",
    NAME: "name",
    CONTAINER_ID: "containerId",
    POPULATION_WEIGHT: "populationWeight",
    DATA_COLLECTION_EVENT_WEIGHT: "dataCollectionEventWeight",
    POPULATION_ID: "populationId",
    DATASET_ID: "datasetId",
    VARIABLE_TYPE: "variableType",
    INDEX: "index",
    STUDY_TABLE: {
        POPULATION_WEIGHT: "studyTable.populationWeight",
        DATA_COLLECTION_EVENT_WEIGHT: "studyTable.dataCollectionEventWeight",
        STUDY_ID: "studyTable.studyId",
        POPULATION_ID: "studyTable.populationId"
    }
};

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
    throw new Error("Invalid target: " + target);
}

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
    throw new Error("Invalid type: " + type);
}

(function() {
    function RqlQueryService($q, $log, TaxonomiesResource, TaxonomyResource, LocalizedValues, VocabularyService, RqlQueryUtils, ngObibaMicaSearch, SetService) {
        var taxonomiesCache = {
            variable: null,
            dataset: null,
            study: null,
            network: null
        };
        var self = this;
        var searchOptions = ngObibaMicaSearch.getOptions();
        this.findItemNodeById = function(root, targetId, result, strict) {
            var splitTagetId = targetId.split(".");
            if (root && root.children && result) {
                return root.children.some(function(child) {
                    if (strict ? targetId === child.id : child.id && child.id.split(".").reduce(function(acc, val) {
                        return acc && splitTagetId.indexOf(val) > -1;
                    }, true)) {
                        result.item = child;
                        return true;
                    }
                    return self.findItemNodeById(child, targetId, result, strict);
                });
            }
            return false;
        };
        this.findItemNode = function(root, item, result) {
            return self.findItemNodeById(root, item.id, result);
        };
        function findTargetCriteria(target, rootCriteria) {
            return rootCriteria.children.filter(function(child) {
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
            return query.args.filter(function(arg) {
                return arg.name === target;
            }).pop();
        }
        function findQueryInTargetByTaxonomyVocabulary(target, taxonomy, vocabulary) {
            if (!target) {
                return null;
            }
            function search(parent, rx, result) {
                return parent.args.some(function(arg) {
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
            search(target, new RegExp((taxonomy ? taxonomy : "") + "\\." + vocabulary + "$"), result);
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
                    return RqlQueryUtils.fields([ "attributes.label.*", "variableType", "datasetId", "datasetAcronym" ]);

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
                throw new Error("Criteria node not found: " + item);
            }
            parent.children.splice(indexChild, 1);
            item.children.forEach(function(c) {
                c.parent = parent;
            });
            parent.children.splice.apply(parent.children, [ indexChild, 0 ].concat(item.children));
            parentQuery.args.splice(index, 1);
            if (queryArgs) {
                if (queryArgs instanceof Array) {
                    parentQuery.args.splice.apply(parentQuery.args, [ index, 0 ].concat(queryArgs));
                } else {
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
                throw new Error("Criteria node not found: " + item);
            }
            parent.children.splice(indexChild, 1);
            item.children.forEach(function(c) {
                c.parent = parent;
            });
            parent.children.splice.apply(parent.children, [ indexChild, 0 ].concat(item.children));
            parentQuery.args.splice(index, 1);
            if (queryArgs) {
                if (queryArgs instanceof Array) {
                    parentQuery.args.splice.apply(parentQuery.args, [ index, 0 ].concat(queryArgs));
                } else {
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
                throw new Error("Cannot remove criteria when parent is NULL");
            }
            var query = item.rqlQuery;
            var parentQuery = item.parent.rqlQuery;
            var index = parentQuery.args.indexOf(query);
            if (index === -1) {
                throw new Error("Criteria node not found: " + item);
            }
            parentQuery.args.splice(index, 1);
            if ([ RQL_NODE.OR, RQL_NODE.AND, RQL_NODE.NAND, RQL_NODE.NOR ].indexOf(parent.type) !== -1) {
                deleteNodeCriteriaWithOrphans(parent);
            } else if (parentQuery.args.length === 0) {
                deleteNode(parent);
            }
        }
        function queryHasCriteria(query) {
            if (query && query.args) {
                var leafQueries = query.args.filter(function(arg) {
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
            return (targets || []).filter(function(target) {
                return queryHasCriteria(target.rqlQuery);
            });
        }
        function getRenderableTargetCriteriaFromRoot(rootCriteria) {
            return rootCriteria ? getRenderableTargetCriteria(rootCriteria.children) : [];
        }
        this.getRenderableTargetCriteria = getRenderableTargetCriteria;
        this.getRenderableTargetCriteriaFromRoot = getRenderableTargetCriteriaFromRoot;
        this.parseQuery = function(query) {
            try {
                return new RqlParser().parse(query);
            } catch (e) {
                $log.error(e.message);
            }
            return new RqlQuery();
        };
        this.removeCriteriaItem = function(item) {
            if (isLeafCriteria(item)) {
                deleteLeafCriteria(item);
            } else {
                deleteNode(item);
            }
        };
        this.createCriteriaItem = function(target, taxonomy, vocabulary, term, lang) {
            function createBuilder(taxonomy, vocabulary, term) {
                return new CriteriaItemBuilder(LocalizedValues, lang, SetService).target(target).taxonomy(taxonomy).vocabulary(vocabulary).term(term);
            }
            if (angular.isString(taxonomy)) {
                return TaxonomyResource.get({
                    target: target,
                    taxonomy: taxonomy
                }).$promise.then(function(taxonomy) {
                    vocabulary = taxonomy.vocabularies.filter(function(v) {
                        return v.name === vocabulary || VocabularyService.vocabularyAlias(v) === vocabulary;
                    })[0];
                    term = vocabulary && vocabulary.terms ? vocabulary.terms.filter(function(t) {
                        return t.name === term;
                    })[0] : null;
                    return createBuilder(taxonomy, vocabulary, term).build();
                });
            }
            return createBuilder(taxonomy, vocabulary, term).build();
        };
        this.addCriteriaItem = function(rootRql, newItem, logicalOp) {
            var target = rootRql.args.filter(function(query) {
                return newItem.target === query.name;
            }).pop();
            if (!target) {
                target = new RqlQuery(RQL_NODE[newItem.target.toUpperCase()]);
                rootRql.args.push(target);
            }
            var rqlQuery = newItem.rqlQuery ? newItem.rqlQuery : RqlQueryUtils.buildRqlQuery(newItem);
            return RqlQueryUtils.addQuery(target, rqlQuery, logicalOp);
        };
        this.updateCriteriaItem = function(existingItem, newItem, replace) {
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
            } else {
                if (replace && newItem.rqlQuery) {
                    existingItem.rqlQuery.name = newItem.rqlQuery.name;
                }
                if (newItem.rqlQuery) {
                    newTerms = newItem.rqlQuery.args[isMatchNode ? 0 : 1];
                } else if (newItem.term) {
                    newTerms = [ newItem.term.name ];
                } else {
                    updateItemForExistsQuery();
                }
                if (newTerms) {
                    if (isRepeatable) {
                        RqlQueryUtils.updateRepeatableQueryArgValues(existingItem, newTerms);
                    } else {
                        RqlQueryUtils.updateQueryArgValues(existingItem.rqlQuery, newTerms, replace);
                    }
                }
            }
        };
        this.getTaxonomyByTarget = function(target) {
            var deferred = $q.defer();
            var taxonomy = taxonomiesCache[target];
            if (taxonomy) {
                deferred.resolve(taxonomy);
            } else {
                TaxonomiesResource.get({
                    target: target
                }).$promise.then(function(response) {
                    taxonomiesCache[target] = response;
                    deferred.resolve(response);
                });
            }
            return deferred.promise;
        };
        this.builders = function(target, rootRql, rootItem, lang) {
            var deferred = $q.defer();
            function build(rootRql, rootItem) {
                var builder = new CriteriaBuilder(rootRql, rootItem, taxonomiesCache[target], LocalizedValues, lang, SetService);
                builder.initialize(target);
                builder.build();
                deferred.resolve({
                    root: builder.getRootItem(),
                    map: builder.getLeafItemMap()
                });
            }
            self.getTaxonomyByTarget(target).then(function() {
                build(rootRql, rootItem);
            });
            return deferred.promise;
        };
        this.createCriteria = function(rootRql, lang) {
            var deferred = $q.defer();
            var rootItem = new CriteriaItemBuilder().type(RQL_NODE.AND).rqlQuery(rootRql).build();
            var leafItemMap = {};
            if (!RqlQueryUtils.hasTargetQuery(rootRql)) {
                deferred.resolve({
                    root: rootItem,
                    map: leafItemMap
                });
                return deferred.promise;
            }
            var queries = [];
            var self = this;
            var resolvedCount = 0;
            rootRql.args.forEach(function(node) {
                if (QUERY_TARGETS[node.name.toUpperCase()]) {
                    queries.push(node);
                }
            });
            queries.forEach(function(node) {
                self.builders(node.name, node, rootItem, lang).then(function(result) {
                    rootItem.children.push(result.root);
                    leafItemMap = angular.extend(leafItemMap, result.map);
                    resolvedCount++;
                    if (resolvedCount === queries.length) {
                        deferred.resolve({
                            root: rootItem,
                            map: leafItemMap
                        });
                    }
                });
            });
            return deferred.promise;
        };
        this.prepareCriteriaTermsQuery = function(query, item, lang) {
            function iterReplaceQuery(query, criteriaId, newQuery) {
                if (!query || !query.args) {
                    return null;
                }
                if ((query.name === RQL_NODE.IN || query.name === RQL_NODE.MISSING || query.name === RQL_NODE.CONTAINS) && query.args[0] === criteriaId) {
                    return query;
                }
                for (var i = query.args.length; i--; ) {
                    var res = iterReplaceQuery(query.args[i], criteriaId, newQuery);
                    if (res) {
                        query.args[i] = newQuery;
                    }
                }
            }
            var parsedQuery = this.parseQuery(query);
            var targetQuery = parsedQuery.args.filter(function(node) {
                return node.name === item.target;
            }).pop();
            if (targetQuery) {
                var anyQuery = new RqlQuery(RQL_NODE.EXISTS), criteriaId = RqlQueryUtils.criteriaId(item.taxonomy, item.vocabulary);
                anyQuery.args.push(criteriaId);
                iterReplaceQuery(targetQuery, criteriaId, anyQuery);
                targetQuery.args.push(RqlQueryUtils.aggregate([ criteriaId ]));
                targetQuery.args.push(RqlQueryUtils.limit(0, 0));
            }
            parsedQuery.args.push(new RqlQuery(RQL_NODE.FACET));
            if (lang) {
                RqlQueryUtils.addLocaleQuery(parsedQuery, lang);
            }
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.getTargetQuerySort = function(type, query) {
            var target = typeToTarget(type);
            var targetQuery = findTargetQuery(target, query);
            var sort = null;
            if (targetQuery) {
                sort = targetQuery.args.filter(function(arg) {
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
            return rqlQuery.args.reduce(function(acc, query) {
                if (isTarget(query.name)) {
                    var limitQuery = RqlQueryUtils.getLimitQuery(query);
                    if (limitQuery) {
                        acc[query.name] = {
                            from: limitQuery.args[0],
                            size: limitQuery.args[1]
                        };
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
        this.prepareSearchQuery = function(context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, true);
        };
        this.prepareSearchQueryNoFields = function(context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, false);
        };
        this.prepareSearchQueryAndSerialize = function(context, type, query, lang, sort) {
            return new RqlQuery().serializeArgs(self.prepareSearchQuery(context, type, query, lang, sort).args);
        };
        this.prepareCoverageQuery = function(query, bucketArg) {
            var parsedQuery = this.parseQuery(query);
            var aggregate = new RqlQuery("aggregate");
            var bucketField;
            var parts = bucketArg.split("-");
            var groupBy = parts[0];
            var filterBy = parts.length > 1 ? parts[1] : undefined;
            switch (groupBy) {
              case BUCKET_TYPES.NETWORK:
                bucketField = "networkId";
                break;

              case BUCKET_TYPES.STUDY:
              case BUCKET_TYPES.STUDY_INDIVIDUAL:
              case BUCKET_TYPES.STUDY_HARMONIZATION:
                bucketField = "studyId";
                break;

              case BUCKET_TYPES.DCE:
              case BUCKET_TYPES.DCE_INDIVIDUAL:
                bucketField = "dceId";
                break;

              case BUCKET_TYPES.DATASCHEMA:
              case BUCKET_TYPES.DATASET:
              case BUCKET_TYPES.DATASET_COLLECTED:
              case BUCKET_TYPES.DATASET_HARMONIZED:
                bucketField = "datasetId";
                break;
            }
            var bucket = new RqlQuery("bucket");
            bucket.args.push(bucketField);
            aggregate.args.push(bucket);
            var variable;
            parsedQuery.args.forEach(function(arg) {
                if (!variable && arg.name === "variable") {
                    variable = arg;
                }
            });
            if (!variable) {
                variable = new RqlQuery("variable");
                parsedQuery.args.push(variable);
            }
            if (variable.args.length > 0 && variable.args[0].name !== "limit") {
                var variableType = new RqlQuery("in");
                variableType.args.push("Mica_variable.variableType");
                if (filterBy === undefined) {
                    if (bucketArg === BUCKET_TYPES.DATASET_HARMONIZED || bucketArg === BUCKET_TYPES.DATASCHEMA) {
                        variableType.args.push("Dataschema");
                    } else {
                        variableType.args.push([ "Collected", "Dataschema" ]);
                    }
                } else if ([ "individual", "collected" ].indexOf(filterBy) > -1) {
                    variableType.args.push("Collected");
                } else if ([ "harmonization", "harmonized" ].indexOf(filterBy) > -1) {
                    variableType.args.push("Dataschema");
                }
                var andVariableType = new RqlQuery("and");
                andVariableType.args.push(variableType);
                andVariableType.args.push(variable.args[0]);
                variable.args[0] = andVariableType;
            }
            variable.args.push(aggregate);
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.prepareGraphicsQuery = function(query, aggregateArgs, bucketArgs) {
            var parsedQuery = this.parseQuery(query);
            var aggregate = new RqlQuery(RQL_NODE.AGGREGATE);
            aggregateArgs.forEach(function(a) {
                aggregate.args.push(a);
            });
            if (bucketArgs && bucketArgs.length > 0) {
                var bucket = new RqlQuery(RQL_NODE.BUCKET);
                bucketArgs.forEach(function(b) {
                    bucket.args.push(b);
                });
                aggregate.args.push(bucket);
            }
            var study;
            var hasQuery = false;
            var hasStudyTarget = false;
            parsedQuery.args.forEach(function(arg) {
                if (arg.name === "study") {
                    hasStudyTarget = true;
                    var limitIndex = null;
                    hasQuery = arg.args.filter(function(requestArg, index) {
                        if (requestArg.name === "limit") {
                            limitIndex = index;
                        }
                        return [ "limit", "sort", "aggregate" ].indexOf(requestArg.name) < 0;
                    }).length;
                    if (limitIndex !== null) {
                        arg.args.splice(limitIndex, 1);
                    }
                    study = arg;
                }
            });
            if (!hasStudyTarget) {
                study = new RqlQuery("study");
                parsedQuery.args.push(study);
            }
            if (!hasQuery) {
                study.args.push(new RqlQuery(RQL_NODE.MATCH));
            }
            study.args.push(aggregate);
            parsedQuery.args.push(new RqlQuery("facet"));
            return parsedQuery.serializeArgs(parsedQuery.args);
        };
        this.getTargetAggregations = function(joinQueryResponse, criterion, lang) {
            function addMissingTerms(aggs, vocabulary) {
                var terms = vocabulary.terms;
                if (terms && terms.length > 0) {
                    var keys = aggs && aggs.map(function(agg) {
                        return agg.key;
                    }) || [];
                    if (aggs) {
                        var missingTerms = [];
                        terms.forEach(function(term) {
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
                    return terms.map(function(term) {
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
                    var child = parentAgg.children.filter(function(child) {
                        return child.hasOwnProperty(aggKey);
                    }).pop();
                    if (child) {
                        return child[aggKey];
                    }
                }
                return null;
            }
            var alias = VocabularyService.vocabularyAlias(criterion.vocabulary);
            var targetResponse = joinQueryResponse[criterion.target + "ResultDto"];
            if (targetResponse && targetResponse.aggs) {
                var isProperty = criterion.taxonomy.name.startsWith("Mica_");
                var filter = isProperty ? alias : criterion.taxonomy.name;
                var filteredAgg = targetResponse.aggs.filter(function(agg) {
                    return agg.aggregation === filter;
                }).pop();
                if (filteredAgg) {
                    if (isProperty) {
                        if (VocabularyService.isNumericVocabulary(criterion.vocabulary)) {
                            return filteredAgg["obiba.mica.StatsAggregationResultDto.stats"];
                        } else {
                            return VocabularyService.isRangeVocabulary(criterion.vocabulary) ? addMissingTerms(filteredAgg["obiba.mica.RangeAggregationResultDto.ranges"], criterion.vocabulary) : addMissingTerms(filteredAgg["obiba.mica.TermsAggregationResultDto.terms"], criterion.vocabulary);
                        }
                    } else {
                        var vocabularyAgg = filteredAgg.children.filter(function(agg) {
                            return agg.aggregation === alias;
                        }).pop();
                        if (vocabularyAgg) {
                            return VocabularyService.isRangeVocabulary(criterion.vocabulary) ? addMissingTerms(getChildAggragations(filteredAgg, "obiba.mica.RangeAggregationResultDto.ranges"), criterion.vocabulary) : addMissingTerms(getChildAggragations(filteredAgg, "obiba.mica.TermsAggregationResultDto.terms"), criterion.vocabulary);
                        }
                    }
                }
            }
            return addMissingTerms([], criterion.vocabulary);
        };
        this.findCriterion = function(criteria, id) {
            function inner(criteria, id) {
                var result;
                if (criteria.id === id) {
                    return criteria;
                }
                var children = criteria.children.filter(function(childCriterion) {
                    return childCriterion instanceof CriteriaItem;
                });
                for (var i = children.length; i--; ) {
                    result = inner(children[i], id);
                    if (result) {
                        return result;
                    }
                }
            }
            return inner(criteria, id);
        };
        this.cleanQuery = function(rqlQuery) {
            var query = angular.copy(rqlQuery);
            if (query.args) {
                angular.forEach(query.args, function(arg) {
                    if (arg.args) {
                        var i = arg.args.length;
                        while (i--) {
                            if (arg.args[i].name === "limit" || arg.args[i].name === "sort" || arg.args[i].name === "fields") {
                                arg.args.splice(i, 1);
                            }
                        }
                    }
                });
                var i = query.args.length;
                while (i--) {
                    if (query.args[i].name === "locale" || !query.args[i].args || query.args[i].args.length === 0) {
                        query.args.splice(i, 1);
                    }
                }
            }
            return query;
        };
    }
    ngObibaMica.search.service("RqlQueryService", [ "$q", "$log", "TaxonomiesResource", "TaxonomyResource", "LocalizedValues", "VocabularyService", "RqlQueryUtils", "ngObibaMicaSearch", "SetService", RqlQueryService ]);
})();

"use strict";

(function() {
    function RqlQueryUtils(VocabularyService) {
        function findValidParentNode(targetNode) {
            var target = targetNode.args.filter(function(query) {
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
                return targetNode.args.findIndex(function(arg) {
                    return arg.name === target.name;
                });
            }
            return -1;
        }
        function vocabularyTermNames(vocabulary) {
            return vocabulary && vocabulary.terms ? vocabulary.terms.map(function(term) {
                return term.name;
            }) : [];
        }
        function hasTargetQuery(rootRql, target) {
            return rootRql.args.filter(function(query) {
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
            query.args = [ left, right ];
            return query;
        }
        function aggregate(fields) {
            var query = new RqlQuery(RQL_NODE.AGGREGATE);
            fields.forEach(function(field) {
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
            query.args.push(queryString || "*");
            query.args.push(field);
            return query;
        }
        function isFreeTextMatch(query) {
            return query.name === RQL_NODE.MATCH && query.args.length === 1;
        }
        function updateMatchQuery(query, queryString) {
            query.args[0] = queryString || "*";
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
            } else {
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
                } else {
                    if (!(current instanceof Array)) {
                        current = [ current ];
                    }
                    var unique = terms.filter(function(term) {
                        return current.indexOf(term) === -1;
                    });
                    query.args[1] = current.concat(unique);
                }
            } else {
                query.args.splice(1, 1);
            }
            return query;
        }
        function updateRangeQuery(query, from, to, missing) {
            if (missing) {
                query.name = RQL_NODE.MISSING;
                query.args.splice(1, 1);
            } else if (angular.isDefined(from) && from !== null && angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.BETWEEN;
                query.args[1] = [ from, to ];
            } else if (angular.isDefined(from) && from !== null) {
                query.name = RQL_NODE.GE;
                query.args[1] = from;
            } else if (angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.LE;
                query.args[1] = to;
            } else {
                query.name = RQL_NODE.EXISTS;
                query.args.splice(1, 1);
            }
        }
        function buildRqlQuery(item) {
            if (VocabularyService.isNumericVocabulary(item.vocabulary)) {
                return rangeQuery(criteriaId(item.taxonomy, item.vocabulary), null, null);
            } else if (VocabularyService.isMatchVocabulary(item.vocabulary)) {
                return matchQuery(criteriaId(item.taxonomy, item.vocabulary), null);
            } else {
                var args;
                if (Array.isArray(item.selectedTerms) && item.selectedTerms.length > 0) {
                    args = item.selectedTerms;
                } else if (item.term) {
                    args = item.term.name;
                }
                return inQuery(criteriaId(item.taxonomy, item.vocabulary), args);
            }
        }
        function addQuery(parentQuery, query, logicalOp) {
            if (parentQuery.args.length === 0) {
                parentQuery.args.push(query);
            } else {
                var parentIndex = findValidParentNode(parentQuery);
                if (parentIndex === -1) {
                    parentQuery.args.push(query);
                } else {
                    var oldArg = parentQuery.args.splice(parentIndex, 1).pop();
                    if (!logicalOp && query.args && query.args.length > 0) {
                        var targetTaxo = "Mica_" + parentQuery.name;
                        if (!isFreeTextMatch(query)) {
                            var criteriaVocabulary = query.name === "match" ? query.args[1] : query.args[0];
                            logicalOp = criteriaVocabulary.startsWith(targetTaxo + ".") ? RQL_NODE.AND : RQL_NODE.OR;
                        }
                    }
                    var orQuery = new RqlQuery(logicalOp || RQL_NODE.AND);
                    orQuery.args.push(oldArg, query);
                    parentQuery.args.push(orQuery);
                }
            }
            return parentQuery;
        }
        function updateRepeatableQueryArgValues(existingItem, terms) {
            existingItem.items().forEach(function(item) {
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
                    var contains = values.filter(function(value) {
                        return terms.indexOf(value) < 0;
                    }).map(function(value) {
                        return fieldQuery(RQL_NODE.CONTAINS, field, [].concat(value, terms));
                    });
                    var orRql;
                    if (contains.length > 1) {
                        var firstTwo = contains.splice(0, 2);
                        orRql = orQuery(firstTwo[0], firstTwo[1]);
                        contains.forEach(function(value) {
                            orRql = orQuery(value, orRql);
                        });
                        query.name = orRql.name;
                        query.args = orRql.args;
                    } else {
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
            var found = rqlQuery.args.filter(function(arg) {
                return arg.name === RQL_NODE.LOCALE;
            }).pop();
            if (!found) {
                var localeQuery = new RqlQuery("locale");
                localeQuery.args.push(locale);
                rqlQuery.args.push(localeQuery);
            }
        }
        function addFields(targetQuery, fieldsQuery) {
            if (targetQuery && targetQuery.args) {
                var found = targetQuery.args.filter(function(arg) {
                    return arg.name === RQL_NODE.FIELDS;
                }).pop();
                if (found) {
                    found.args = fieldsQuery.args;
                } else {
                    targetQuery.args.push(fieldsQuery);
                }
            }
        }
        function getLimitQuery(targetQuery) {
            if (targetQuery && targetQuery.args) {
                return targetQuery.args.filter(function(arg) {
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
                } else {
                    targetQuery.args.push(limitQuery);
                }
            }
        }
        function addSort(targetQuery, sort) {
            var sortQuery = targetQuery.args.filter(function(arg) {
                return arg.name === RQL_NODE.SORT;
            }).pop();
            if (!sortQuery) {
                sortQuery = new RqlQuery("sort");
                targetQuery.args.push(sortQuery);
            }
            sortQuery.args = Array.isArray(sort) ? sort : [ sort ];
        }
        function criteriaId(taxonomy, vocabulary) {
            return taxonomy.name + "." + vocabulary.name;
        }
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
    ngObibaMica.search.service("RqlQueryUtils", [ "VocabularyService", RqlQueryUtils ]);
})();

"use strict";

(function() {
    function SearchContext() {
        var selectedLocale = null;
        this.setLocale = function(locale) {
            selectedLocale = locale;
        };
        this.currentLocale = function() {
            return selectedLocale;
        };
    }
    ngObibaMica.search.service("SearchContext", SearchContext);
})();

"use strict";

(function() {
    function StudyFilterShortcutService($location, RqlQueryService) {
        function getCurrentClassName(rqlQuery) {
            rqlQuery = rqlQuery || RqlQueryService.parseQuery($location.search().query);
            var targetQuery = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, rqlQuery);
            var className;
            if (targetQuery) {
                className = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, "className");
            }
            return className;
        }
        function classNameQueryHasArgValue(className, argValue) {
            return !className || (Array.isArray(className.args[1]) ? className.args[1].indexOf(argValue) > -1 : className.args[1] === argValue);
        }
        function classNameQueryHasStudyArg(className) {
            return classNameQueryHasArgValue(className, "Study");
        }
        function classNameQueryHasHarmonizationStudyArg(className) {
            return classNameQueryHasArgValue(className, "HarmonizationStudy");
        }
        function classNameQueryIsExists(className) {
            return !className || className.name === RQL_NODE.EXISTS || classNameQueryHasStudyArg(className) && classNameQueryHasHarmonizationStudyArg(className);
        }
        this.filter = function(choice) {
            var parsedQuery = RqlQueryService.parseQuery($location.search().query);
            var foundStudyClassNameQuery = getCurrentClassName(parsedQuery);
            var studyClassNameQuery;
            if (foundStudyClassNameQuery) {
                studyClassNameQuery = foundStudyClassNameQuery;
                if (studyClassNameQuery.name === RQL_NODE.EXISTS) {
                    studyClassNameQuery.name = RQL_NODE.IN;
                }
            } else {
                studyClassNameQuery = new RqlQuery(RQL_NODE.IN);
            }
            studyClassNameQuery.args = [ "Mica_study.className" ];
            switch (choice) {
              case ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES:
                studyClassNameQuery.args.push("Study");
                break;

              case ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES:
                studyClassNameQuery.args.push("HarmonizationStudy");
                break;

              case ngObibaMica.search.STUDY_FILTER_CHOICES.ALL_STUDIES:
                studyClassNameQuery.args.push([ "Study", "HarmonizationStudy" ]);
                break;
            }
            if (!foundStudyClassNameQuery) {
                var study = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, parsedQuery);
                if (!study) {
                    study = new RqlQuery(QUERY_TARGETS.STUDY);
                    parsedQuery.args.push(study);
                }
                if (study.args.length > 0) {
                    var replace = study.args.filter(function(arg) {
                        return RqlQueryService.isLeaf(arg.name) || RqlQueryService.isOperator(arg.name);
                    }).pop();
                    if (replace) {
                        var andStudyClassName = new RqlQuery(RQL_NODE.AND);
                        var index = study.args.indexOf(replace);
                        andStudyClassName.args.push(studyClassNameQuery, replace);
                        study.args[index] = andStudyClassName;
                    } else {
                        study.args.push(studyClassNameQuery);
                    }
                } else {
                    study.args = [ studyClassNameQuery ];
                }
            }
            $location.search("query", new RqlQuery().serializeArgs(parsedQuery.args));
        };
        this.getStudyClassNameChoices = function() {
            return {
                choseAll: classNameQueryIsExists(getCurrentClassName()),
                choseIndividual: classNameQueryHasStudyArg(getCurrentClassName()),
                choseHarmonization: classNameQueryHasHarmonizationStudyArg(getCurrentClassName())
            };
        };
    }
    ngObibaMica.search.service("StudyFilterShortcutService", [ "$location", "RqlQueryService", StudyFilterShortcutService ]);
})();

"use strict";

(function() {
    function TaxonomyService($q, TaxonomiesResource, TaxonomyResource, VocabularyService) {
        function getTaxonomy(target, taxonomyName) {
            return TaxonomyResource.get({
                target: target,
                taxonomy: taxonomyName
            }).$promise;
        }
        function getTaxonomiesInternal(target, taxonomyNames) {
            return TaxonomiesResource.get({
                target: target,
                query: "taxonomyName:" + taxonomyNames.join(" OR taxonomyName:")
            }).$promise;
        }
        function sortTaxonomies(order, taxonomies) {
            taxonomies.sort(function(a, b) {
                return order.indexOf(a.name) - order.indexOf(b.name);
            });
        }
        function findVocabularyInTaxonomy(target, taxonomyName, vocabularyName) {
            var deferred = $q.defer();
            var foundVocabulary = null;
            TaxonomyResource.get({
                target: target,
                taxonomy: taxonomyName
            }).$promise.then(function(taxonomy) {
                taxonomy.vocabularies.some(function(v) {
                    if (v.name === vocabularyName || VocabularyService.vocabularyAlias(v) === vocabularyName) {
                        foundVocabulary = v;
                        return true;
                    }
                });
                deferred.resolve(foundVocabulary);
            });
            return deferred.promise;
        }
        function getTaxonomies(target, taxonomyNames) {
            var deferred = $q.defer();
            if (Array.isArray(taxonomyNames)) {
                getTaxonomiesInternal(target, taxonomyNames).then(function(taxonomies) {
                    taxonomies.forEach(function(taxonomy) {
                        taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
                    });
                    sortTaxonomies(taxonomyNames, taxonomies);
                    deferred.resolve(taxonomies);
                });
            } else {
                getTaxonomy(target, taxonomyNames).then(function(taxonomy) {
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
    ngObibaMica.search.service("TaxonomyService", [ "$q", "TaxonomiesResource", "TaxonomyResource", "VocabularyService", TaxonomyService ]);
})();

"use strict";

(function() {
    function VocabularyService($translate, LocalizedValues, MetaTaxonomyService) {
        var TOKEN_LENGTH = 1;
        var VOCABULARY_TYPES = {
            STRING: "string",
            INTEGER: "integer",
            DECIMAL: "decimal"
        };
        function translateField(title) {
            return LocalizedValues.forLocale(title, $translate.use());
        }
        function asciiFold(text) {
            return text.normalize("NFD").replace(/\//g, " ").replace(/[^\w|^\s|^-]/g, "");
        }
        function filter(vocabularies, queryString) {
            if (queryString) {
                var tokens = asciiFold(queryString).toLowerCase().split(" ").filter(function(token) {
                    return token.length > TOKEN_LENGTH;
                });
                var vocabulariesToFilter = Array.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;
                var fieldsToFilter = MetaTaxonomyService.getTaxonomyPanelOptions().fieldsToFilter;
                return (vocabulariesToFilter || []).filter(function(vocabulary) {
                    vocabulary.filteredTerms = (vocabulary.terms || []).filter(function(term) {
                        var toMatchField = fieldsToFilter.reduce(function(toMatchField, field) {
                            return toMatchField + " " + translateField(term[field]);
                        }, fieldsToFilter[0]);
                        var toMatch = asciiFold(toMatchField).trim().toLowerCase();
                        return tokens.map(function(token) {
                            if (token.startsWith("-")) {
                                var ntoken = token.substr(1);
                                if (ntoken.length <= TOKEN_LENGTH) {
                                    return true;
                                }
                                return toMatch.indexOf(ntoken) === -1;
                            }
                            return toMatch.indexOf(token) >= 0;
                        }).reduce(function(acc, val) {
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
            var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function(a) {
                return a.key === "hidden";
            }).pop() : null;
            return !hidden || hidden.value === "false";
        }
        function isFacetVocabularyVisible(vocabulary) {
            if (!vocabulary || !vocabulary.attributes) {
                return false;
            }
            var result = vocabulary.attributes.filter(function(attribute) {
                return [ "hidden", "facet" ].indexOf(attribute.key) > -1;
            }).reduce(function(a, i) {
                a[i.key] = i.value;
                return a;
            }, {});
            return "true" === result.facet && (!result.hidden || "false" === result.hidden);
        }
        function findVocabularyAttributes(vocabulary, pattern) {
            return (vocabulary.attributes || []).filter(function(attribute) {
                return attribute.key.search(pattern) > -1;
            }).reduce(function(a, i) {
                a[i.key] = i.value;
                return a;
            }, {});
        }
        function vocabularyAttributeValue(vocabulary, key, defaultValue) {
            var value = defaultValue;
            if (vocabulary.attributes) {
                vocabulary.attributes.some(function(attribute) {
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
            return vocabularyAttributeValue(vocabulary, "type", VOCABULARY_TYPES.STRING);
        }
        function vocabularyField(vocabulary) {
            return vocabularyAttributeValue(vocabulary, "field", vocabulary.name);
        }
        function vocabularyAlias(vocabulary) {
            return vocabularyAttributeValue(vocabulary, "alias", vocabulary.name);
        }
        function vocabularyTermsSortKey(vocabulary) {
            return vocabularyAttributeValue(vocabulary, "termsSortKey", null);
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
            return "true" === vocabularyAttributeValue(vocabulary, "facet", "false");
        }
        function sortFilteredVocabularyTerms(vocabulary, terms, locale) {
            var termsSortKey = vocabularyTermsSortKey(vocabulary);
            if (termsSortKey && terms && terms.length > 0) {
                switch (termsSortKey) {
                  case "name":
                    terms.sort(function(a, b) {
                        return a[termsSortKey].localeCompare(b[termsSortKey]);
                    });
                    break;

                  case "title":
                    terms.sort(function(a, b) {
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
    ngObibaMica.search.service("VocabularyService", [ "$translate", "LocalizedValues", "MetaTaxonomyService", VocabularyService ]);
})();

"use strict";

ngObibaMica.search.filter("dceDescription", function() {
    return function(input) {
        return input.split(":<p>").map(function(d) {
            return "<p>" + d;
        })[2];
    };
});

"use strict";

ngObibaMica.search.filter("orderBySelection", function() {
    return function(elements, selections) {
        if (!elements) {
            return [];
        }
        var selected = [];
        var unselected = [];
        elements.forEach(function(element) {
            if (selections[element.key]) {
                selected.push(element);
            } else {
                unselected.push(element);
            }
        });
        return selected.concat(unselected);
    };
});

"use strict";

ngObibaMica.search.filter("regex", function() {
    return function(elements, regex, fields, lang) {
        var out = [];
        try {
            var pattern = new RegExp(regex, "i");
            out = elements.filter(function(element) {
                return fields.some(function(field) {
                    var value = element[field];
                    if (angular.isArray(value) && lang) {
                        return value.filter(function(item) {
                            return item.locale === lang;
                        }).some(function(item) {
                            return pattern.test(item.text);
                        });
                    }
                    return pattern.test(value);
                });
            });
        } catch (e) {}
        return out;
    };
});

"use strict";

ngObibaMica.search.filter("renderableTargets", [ "RqlQueryService", function(RqlQueryService) {
    return function(targets) {
        return RqlQueryService.getRenderableTargetCriteria(targets);
    };
} ]);

"use strict";

(function() {
    ngObibaMica.search.STUDY_FILTER_CHOICES = {
        ALL_STUDIES: "all",
        INDIVIDUAL_STUDIES: "individual",
        HARMONIZATION_STUDIES: "harmonization"
    };
})();

"use strict";

ngObibaMica.search.filter("visibleVocabularies", [ "VocabularyService", function(VocabularyService) {
    return function(vocabularies) {
        return VocabularyService.visibleVocabularies(vocabularies);
    };
} ]);

"use strict";

(function() {
    ngObibaMica.search.SortVocabularyTerms = function(VocabularyService) {
        return function(terms, vocabulary) {
            VocabularyService.sortFilteredVocabularyTerms(vocabulary, terms);
            return terms;
        };
    };
    ngObibaMica.search.filter("sortTerms", [ "VocabularyService", ngObibaMica.search.SortVocabularyTerms ]);
})();

"use strict";

(function() {
    function EntityCountsController() {
        var ctrl = this;
        function getTotalHits(entity) {
            if (!ctrl.result || !ctrl.result[entity + "TotalCount"]) {
                return "";
            }
            return ctrl.result[entity + "TotalCount"].hits;
        }
        function selectType(entity) {
            ctrl.onSelectType({
                type: targetToType(entity)
            });
        }
        ctrl.getTotalHits = getTotalHits;
        ctrl.selectType = selectType;
    }
    ngObibaMica.search.component("entityCounts", {
        transclude: true,
        bindings: {
            result: "<",
            target: "<",
            onSelectType: "&",
            resultTabsOrder: "<",
            taxonomyTypeMap: "<"
        },
        templateUrl: "search/components/entity-counts/component.html",
        controller: [ EntityCountsController ]
    });
})();

"use strict";

(function() {
    function Controller(EntitySuggestionService) {
        var ctrl = this;
        function init() {
            ctrl.model = EntitySuggestionService.getCurrentSuggestion(ctrl.target, ctrl.rqlQuery) || "";
        }
        function suggest(query) {
            return EntitySuggestionService.suggest(ctrl.entityType, query);
        }
        function select(suggestion) {
            EntitySuggestionService.selectSuggestion(ctrl.target, suggestion, ctrl.withSpecificFields === "true");
        }
        function onKeyUp(event) {
            if (event.keyCode === 13) {
                select(ctrl.model);
            }
        }
        function clear() {
            ctrl.model = "";
            select("");
        }
        function onChanges(changedObjects) {
            if (changedObjects.rqlQuery.currentValue) {
                init();
            }
        }
        ctrl.model = "";
        ctrl.suggest = suggest;
        ctrl.select = select;
        ctrl.clear = clear;
        ctrl.onKeyUp = onKeyUp;
        ctrl.$onChanges = onChanges;
    }
    ngObibaMica.search.component("entitySearchTypeahead", {
        bindings: {
            target: "<",
            entityType: "<",
            rqlQuery: "<",
            withSpecificFields: "@",
            placeholderText: "@",
            showButton: "@"
        },
        templateUrl: "search/components/entity-search-typeahead/component.html",
        controller: [ "EntitySuggestionService", Controller ]
    });
})();

"use strict";

(function() {
    function FullScreen(FullScreenService) {
        return {
            link: function($scope, $element, $attrs) {
                if ($attrs.fullscreen) {
                    $scope.$watch($attrs.fullscreen, function(value) {
                        var isEnabled = FullScreenService.isEnabled();
                        if (value && !isEnabled) {
                            FullScreenService.enable($element[0]);
                            $element.addClass("isInFullScreen");
                        } else if (!value && isEnabled) {
                            FullScreenService.cancel();
                            $element.removeClass("isInFullScreen");
                        }
                    });
                }
            }
        };
    }
    ngObibaMica.search.directive("fullscreen", [ "FullScreenService", FullScreen ]);
})();

"use strict";

(function() {
    function IncludeReplace() {
        return {
            require: "ngInclude",
            link: function(scope, el) {
                el.replaceWith(el.children());
            }
        };
    }
    ngObibaMica.search.directive("includeReplace", IncludeReplace);
})();

"use strict";

(function() {
    function InputSearchFilterController() {
        var ctrl = this;
        function change() {
            ctrl.onFilterChange({
                queryString: ctrl.queryString
            });
        }
        function clear() {
            ctrl.queryString = "";
            change();
        }
        function onChanges(changesObj) {
            if (changesObj.taxonomyName) {
                var updateQueryString = false;
                ctrl.taxonomiesQuery.forEach(function(taxonomy) {
                    if (taxonomy.name === ctrl.taxonomyName && taxonomy.queryString) {
                        ctrl.queryString = taxonomy.queryString;
                        updateQueryString = true;
                    }
                });
                if (!updateQueryString) {
                    ctrl.queryString = "";
                }
            }
        }
        ctrl.$onChanges = onChanges;
        ctrl.change = change;
        ctrl.clear = clear;
    }
    ngObibaMica.search.component("inputSearchFilter", {
        transclude: true,
        bindings: {
            taxonomiesQuery: "<",
            taxonomyName: "<",
            queryString: "<",
            onFilterChange: "&"
        },
        templateUrl: "search/components/input-search-filter/component.html",
        controller: [ InputSearchFilterController ]
    });
})();

"use strict";

function BaseTaxonomiesController($rootScope, $scope, $translate, $location, TaxonomyResource, TaxonomiesResource, ngObibaMicaSearch, RqlQueryUtils, $cacheFactory, VocabularyService) {
    $scope.options = ngObibaMicaSearch.getOptions();
    $scope.RqlQueryUtils = RqlQueryUtils;
    $scope.metaTaxonomy = TaxonomyResource.get({
        target: "taxonomy",
        taxonomy: "Mica_taxonomy"
    });
    $scope.taxonomies = {
        all: [],
        search: {
            text: null,
            active: false
        },
        target: $scope.target || "variable",
        taxonomy: null,
        vocabulary: null
    };
    $rootScope.$on("$translateChangeSuccess", function() {
        if ($scope.taxonomies && $scope.taxonomies.vocabulary) {
            VocabularyService.sortVocabularyTerms($scope.taxonomies.vocabulary, $translate.use());
        }
    });
    $scope.canNavigate = function(vocabulary) {
        if ($scope.options.hideNavigate.indexOf(vocabulary.name) > -1) {
            return false;
        }
        return (vocabulary.attributes || []).filter(function(attr) {
            return attr.key === "showNavigate";
        }).length === 0;
    };
    this.navigateTaxonomy = function(taxonomy, vocabulary, term) {
        $scope.taxonomies.term = term;
        if ($scope.isHistoryEnabled) {
            var search = $location.search();
            search.taxonomy = taxonomy ? taxonomy.name : null;
            if (vocabulary && search.vocabulary !== vocabulary.name) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
                search.vocabulary = vocabulary.name;
            } else {
                search.vocabulary = null;
            }
            $location.search(search);
        } else {
            $scope.taxonomies.taxonomy = taxonomy;
            if (!$scope.taxonomies.vocabulary || $scope.taxonomies.vocabulary.name !== vocabulary.name) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
            }
            $scope.taxonomies.vocabulary = vocabulary;
        }
    };
    this.updateStateFromLocation = function() {
        var search = $location.search();
        var taxonomyName = search.taxonomy, vocabularyName = search.vocabulary, taxonomy = null, vocabulary = null;
        if (!$scope.taxonomies.all) {
            return;
        }
        $scope.taxonomies.all.forEach(function(t) {
            if (t.name === taxonomyName) {
                taxonomy = t;
                t.vocabularies.forEach(function(v) {
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
    this.selectTerm = function(target, taxonomy, vocabulary, args) {
        $scope.onSelectTerm(target, taxonomy, vocabulary, args);
    };
    this.clearCache = function() {
        var taxonomyResourceCache = $cacheFactory.get("taxonomyResource");
        if (taxonomyResourceCache) {
            taxonomyResourceCache.removeAll();
        }
    };
    var self = this;
    $scope.$on("$locationChangeSuccess", function() {
        if ($scope.isHistoryEnabled) {
            self.updateStateFromLocation();
        }
    });
    $scope.$watch("taxonomies.vocabulary", function(value) {
        if (RqlQueryUtils && value) {
            $scope.taxonomies.isNumericVocabulary = VocabularyService.isNumericVocabulary($scope.taxonomies.vocabulary);
            $scope.taxonomies.isMatchVocabulary = VocabularyService.isMatchVocabulary($scope.taxonomies.vocabulary);
        } else {
            $scope.taxonomies.isNumericVocabulary = null;
            $scope.taxonomies.isMatchVocabulary = null;
        }
    });
    $scope.navigateTaxonomy = this.navigateTaxonomy;
    $scope.selectTerm = this.selectTerm;
    $scope.clearCache = this.clearCache;
}

"use strict";

(function() {
    function ScrollToTop() {
        return {
            restrict: "A",
            scope: {
                trigger: "=scrollToTop"
            },
            link: function postLink(scope, elem) {
                scope.$watch("trigger", function() {
                    elem[0].scrollTop = 0;
                });
            }
        };
    }
    ngObibaMica.search.directive("scrollToTop", ScrollToTop);
})();

"use strict";

(function() {
    function Controller($translate, VocabularyService, RqlQueryService, AlertService, StringUtils, LocaleStringUtils, ServerErrorUtils, TaxonomiesSearchResource) {
        var ctrl = this;
        function canSearch(taxonomyEntity, hideSearchList) {
            if ((hideSearchList || []).indexOf(taxonomyEntity.name) > -1) {
                return false;
            }
            return (taxonomyEntity.attributes || []).filter(function(attr) {
                return attr.key === "showSearch";
            }).length === 0;
        }
        function score(query, item) {
            var result = 0;
            var regExp = new RegExp(query, "ig");
            if (item.itemTitle.match(regExp)) {
                result = 10;
            } else if (item.itemDescription && item.itemDescription.match(regExp)) {
                result = 8;
            } else if (item.itemParentTitle.match(regExp)) {
                result = 6;
            } else if (item.itemParentDescription && item.itemParentDescription.match(regExp)) {
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
                taxonomy.vocabularies.filter(function(vocabulary) {
                    return VocabularyService.isVisibleVocabulary(vocabulary) && canSearch(vocabulary, ctrl.hideSearch);
                }).forEach(function(vocabulary) {
                    if (vocabulary.terms) {
                        vocabulary.terms.filter(function(term) {
                            return canSearch(term, ctrl.hideSearch);
                        }).forEach(function(term) {
                            var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, ctrl.lang);
                            results.push({
                                score: score(query, item),
                                item: item
                            });
                            total++;
                        });
                    } else {
                        var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, ctrl.lang);
                        results.push({
                            score: score(query, item),
                            item: item
                        });
                        total++;
                    }
                });
            }
            return {
                results: results,
                total: total
            };
        }
        function searchCriteria(query) {
            var criteria = TaxonomiesSearchResource.get({
                query: StringUtils.quoteQuery(query.replace(/\/.*/g, "")),
                locale: ctrl.lang,
                target: ctrl.documents.search.target
            }).$promise.then(function(response) {
                if (response) {
                    var results = [];
                    var total = 0;
                    var size = 10;
                    response.forEach(function(bundle) {
                        var rval = processBundle(query, bundle);
                        results.push.apply(results, rval.results);
                        total = total + rval.total;
                    });
                    results.sort(function(a, b) {
                        return b.score - a.score;
                    });
                    results = results.splice(0, size);
                    if (total > results.length) {
                        var note = {
                            query: query,
                            total: total,
                            size: size,
                            message: LocaleStringUtils.translate("search.showing", [ size, total ]),
                            status: "has-warning"
                        };
                        results.push({
                            score: -1,
                            item: note
                        });
                    }
                    return results.map(function(result) {
                        return result.item;
                    });
                } else {
                    return [];
                }
            }, function(response) {
                AlertService.alert({
                    id: ctrl.alertId,
                    type: "danger",
                    msg: ServerErrorUtils.buildMessage(response),
                    delay: 5e3
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
            ctrl.onSelectCriteria({
                item: item
            });
            ctrl.selectedCriteria = null;
        }
        function translateTaxonomyNav(taxonomy, key) {
            var value = taxonomy[key] && taxonomy[key].filter(function(item) {
                return item.locale === $translate.use();
            }).pop();
            return value ? value.text : key;
        }
        function goToClassifications() {
            ctrl.onGotoClassifications({});
        }
        function selectTerm(target, taxonomy, vocabulary, args) {
            ctrl.onSelectTerm({
                target: target,
                taxonomy: taxonomy,
                vocabulary: vocabulary,
                args: args
            });
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
    ngObibaMica.search.component("searchBoxRegion", {
        bindings: {
            targets: "<",
            options: "<",
            alertId: "@",
            lang: "<",
            taxonomyNav: "<",
            onSelectCriteria: "&",
            onGotoClassifications: "&",
            onSelectTerm: "&"
        },
        templateUrl: "search/components/search-box-region/component.html",
        controller: [ "$translate", "VocabularyService", "RqlQueryService", "AlertService", "StringUtils", "LocaleStringUtils", "ServerErrorUtils", "TaxonomiesSearchResource", Controller ]
    });
})();

"use strict";

(function() {
    function StudyFilterShortcut($location, $translate, RqlQueryService, StudyFilterShortcutService) {
        return {
            restrict: "EA",
            replace: true,
            templateUrl: "search/components/study-filter-shortcut/component.html",
            link: function(scope) {
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
                    } else if (result.choseIndividual) {
                        scope.studyFilterSelection._selection = ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES;
                    } else if (result.choseHarmonization) {
                        scope.studyFilterSelection._selection = ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES;
                    }
                }
                scope.$on("$locationChangeSuccess", function() {
                    setChoice();
                });
                setChoice();
            }
        };
    }
    ngObibaMica.search.directive("studyFilterShortcut", [ "$location", "$translate", "RqlQueryService", "StudyFilterShortcutService", StudyFilterShortcut ]);
})();

"use strict";

(function() {
    function VocabularyFilterDetailHeading() {
        var ctrl = this;
        var bodyElement = document.querySelectorAll("body")[0];
        function selectType(type) {
            return ctrl.onSelectType({
                type: type
            });
        }
        function closePanelWhenClickingOutside(event, callbackOnClose) {
            var keepOpen = event.target.closest("#back-to-top") !== null;
            var nodes = bodyElement.querySelectorAll(".overlay-front-on-box-shodow");
            function isInside(rect) {
                return event.clientX > rect.x && event.clientX < rect.x + rect.width && event.clientY > rect.y && event.clientY < rect.y + rect.height;
            }
            nodes.forEach(function(node) {
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
            bodyElement.onmouseup = function(event) {
                closePanelWhenClickingOutside(event, ctrl.togglePannel);
            };
            bodyElement.onkeyup = function(event) {
                if (event.keyCode === 27) {
                    removeWindowEventHandlers();
                    ctrl.togglePannel();
                }
            };
        }
        function onFilterChange(queryString) {
            return ctrl.onFilterChange({
                queryString: queryString
            });
        }
        function onDestroy() {
            removeWindowEventHandlers();
        }
        ctrl.selectType = selectType;
        ctrl.filterChange = onFilterChange;
        ctrl.$onDestroy = onDestroy;
        addWindowEventHandlers();
    }
    ngObibaMica.search.component("vocabularyFilterDetailHeading", {
        transclude: true,
        bindings: {
            showTaxonomyPanel: "<",
            taxonomyName: "<",
            taxonomiesQuery: "<",
            clearQuery: "<",
            onFilterChange: "&",
            taxonomyTypeMap: "<",
            resultTabsOrder: "<",
            target: "<",
            onSelectType: "&",
            result: "<",
            togglePannel: "&"
        },
        templateUrl: [ "ngObibaMicaSearchTemplateUrl", function(ngObibaMicaSearchTemplateUrl) {
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl("vocabularyFilterDetailHeading");
        } ],
        controller: [ VocabularyFilterDetailHeading ]
    });
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab = angular.module("obiba.mica.DatasetVariableCrosstab", [ "ui.bootstrap", "obiba.notification", "obiba.mica.analysis", "schemaForm", "schemaForm-datepicker", "pascalprecht.translate", "angularMoment", "ui.bootstrap", "ui.select" ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.controller("DatasetVariableCrosstabController", [ "$rootScope", "$scope", "$routeParams", "$log", "$location", "$route", "$translate", "DatasetResource", "DatasetCategoricalVariablesResource", "DatasetVariablesResource", "DatasetVariableResource", "DatasetVariablesCrosstabResource", "ServerErrorAlertService", "ContingencyService", "LocalizedValues", "ChiSquaredCalculator", "PageUrlService", "ngObibaMicaAnalysisTemplateUrl", "AnalysisConfigService", function($rootScope, $scope, $routeParams, $log, $location, $route, $translate, DatasetResource, DatasetCategoricalVariablesResource, DatasetVariablesResource, DatasetVariableResource, DatasetVariablesCrosstabResource, ServerErrorAlertService, ContingencyService, LocalizedValues, ChiSquaredCalculator, PageUrlService, ngObibaMicaAnalysisTemplateUrl, AnalysisConfigService) {
        var analysisOptions = AnalysisConfigService.getOptions();
        function updateLocation(currentPath, param) {
            var original = $location.path;
            $location.path = function(path, reload) {
                if (reload === false) {
                    var lastRoute = $route.current;
                    var un = $rootScope.$on("$locationChangeSuccess", function() {
                        $route.current = lastRoute;
                        un();
                    });
                }
                return original.apply($location, [ path ]);
            };
            $location.path(currentPath + "/" + param, false);
            $location.path = original;
        }
        var onError = function(response) {
            $scope.serverError = true;
            ServerErrorAlertService.alert("MainController", response);
        };
        var searchCategoricalVariables = function(queryString) {
            if (!queryString || queryString.trim().length < 2) {
                return;
            }
            DatasetCategoricalVariablesResource.get({
                dsType: $routeParams.type,
                dsId: $routeParams.ds,
                query: queryString.trim() + "*"
            }, function onSuccess(response) {
                $scope.crosstab.lhs.variables = response.variables;
            }, onError);
        };
        var searchVariables = function(queryString) {
            if (!queryString || queryString.trim().length < 2) {
                return;
            }
            DatasetVariablesResource.get({
                dsType: $routeParams.type,
                dsId: $routeParams.ds,
                query: queryString.trim() + "*"
            }, function onSuccess(response) {
                $scope.crosstab.rhs.variables = response.variables;
            }, onError);
        };
        var isStatistical = function(variable) {
            return variable && variable.nature === "CONTINUOUS";
        };
        var canExchangeVariables = function() {
            return $scope.crosstab.lhs.variable && $scope.crosstab.rhs.variable && !isStatistical($scope.crosstab.rhs.variable);
        };
        var submit = function() {
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
                    if (Object.keys(response).filter(function(k) {
                        return k[0] !== "$";
                    }).length === 0) {
                        onError({
                            status: "crosstab.no-data"
                        });
                    } else {
                        $scope.crosstab.contingencies = normalizeData(response.contingencies ? response.contingencies : [ response ]);
                        if ($scope.datasetHarmo) {
                            $scope.crosstab.all = normalizeData(response.all ? [ response.all ] : [])[0];
                        }
                    }
                    $scope.loading = false;
                }, onError);
            }
        };
        var exchangeVariables = function() {
            if (canExchangeVariables()) {
                var temp = $scope.crosstab.lhs.variable;
                $scope.crosstab.lhs.variable = $scope.crosstab.rhs.variable;
                $scope.crosstab.rhs.variable = temp;
                submit();
            }
        };
        var initCrosstab = function() {
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
        var clear = function() {
            initCrosstab();
        };
        function normalizeStatistics(contingency, v1Cats) {
            function createEmptyStatistics() {
                return {
                    min: "-",
                    max: "-",
                    mean: "-",
                    stdDeviation: "-"
                };
            }
            contingency.privacyCheck = contingency.aggregations.filter(function(aggregation) {
                return aggregation.statistics !== null;
            }).length === contingency.aggregations.length;
            var terms = contingency.aggregations.map(function(aggregation) {
                return aggregation.term;
            });
            if (!contingency.privacyCheck) {
                contingency.aggregations.forEach(function(aggregation) {
                    aggregation.statistics = createEmptyStatistics();
                });
                contingency.all.statistics = createEmptyStatistics();
            } else {
                v1Cats.forEach(function(cat, i) {
                    if (terms.indexOf(cat) === -1) {
                        contingency.aggregations.splice(i, 0, {
                            n: "-",
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
                return cTotal * rTotal / gt;
            }
            function cellChiSquared(value, expected) {
                return expected === 0 ? 0 : Math.pow(value - expected, 2) / expected;
            }
            function degreeOfFreedom(rows, columns) {
                return (rows - 1) * (columns - 1);
            }
            function normalize(aggregation) {
                if (!aggregation.frequencies) {
                    aggregation.frequencies = [];
                }
                var fCats = aggregation.frequencies.map(function(frq) {
                    return frq.value;
                });
                v2Cats.forEach(function(cat, i) {
                    if (fCats.indexOf(cat) === -1) {
                        aggregation.frequencies.splice(i, 0, {
                            count: aggregation.privacyCheck ? 0 : "-",
                            value: cat
                        });
                    }
                });
            }
            function statistics(aggregation, grandTotal, totals, chiSquaredInfo) {
                if (chiSquaredInfo) {
                    aggregation.percent = percentage(aggregation.n, grandTotal);
                    aggregation.frequencies.forEach(function(frequency, i) {
                        frequency.percent = percentage(frequency.count, totals.frequencies[i].count);
                        frequency.cpercent = percentage(frequency.count, aggregation.n);
                        chiSquaredInfo.sum += cellChiSquared(frequency.count, expected(aggregation.n, totals.frequencies[i].count, grandTotal));
                    });
                } else {
                    aggregation.frequencies.forEach(function(frequency) {
                        frequency.percent = percentage(frequency.count, grandTotal);
                        frequency.cpercent = percentage(frequency.n, grandTotal);
                    });
                }
            }
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
                contingency.aggregations.forEach(function(aggregation) {
                    aggregation.privacyCheck = aggregation.frequencies ? aggregation.frequencies.length > 0 : false;
                    contingency.privacyCheck = contingency.privacyCheck && aggregation.privacyCheck;
                    normalize(aggregation);
                    statistics(aggregation, grandTotal, contingency.all, contingency.chiSquaredInfo);
                });
                if (contingency.privacyCheck) {
                    contingency.chiSquaredInfo.pValue = 1 - ChiSquaredCalculator.compute(contingency.chiSquaredInfo);
                }
            }
        }
        var extractSummaryInfo = function(opalTable) {
            var summary = opalTable.studySummary;
            var pop = {};
            var dce = {};
            if (opalTable.studySummary) {
                var studySummary = opalTable.studySummary;
                pop = studySummary.populationSummaries ? studySummary.populationSummaries[0] : null;
                dce = pop && pop.dataCollectionEventSummaries ? pop.dataCollectionEventSummaries.filter(function(dce) {
                    return dce.id === opalTable.dataCollectionEventId;
                }) : null;
            }
            var currentLanguage = $translate.use();
            return {
                summary: LocalizedValues.forLang(summary.acronym, currentLanguage),
                population: pop ? LocalizedValues.forLang(pop.name, currentLanguage) : "",
                dce: dce ? LocalizedValues.forLang(dce[0].name, currentLanguage) : "",
                project: opalTable.project,
                table: opalTable.table,
                tableName: LocalizedValues.forLang(opalTable.name, currentLanguage)
            };
        };
        function normalizeData(contingencies) {
            var v2Cats = $scope.crosstab.rhs.xVariable.categories ? $scope.crosstab.rhs.xVariable.categories.map(function(category) {
                return category.name;
            }) : undefined;
            var v1Cats = $scope.crosstab.lhs.xVariable.categories ? $scope.crosstab.lhs.xVariable.categories.map(function(category) {
                return category.name;
            }) : undefined;
            if (contingencies) {
                contingencies.forEach(function(contingency) {
                    contingency.totalPrivacyCheck = contingency.all.n !== -1;
                    if (!contingency.totalPrivacyCheck || contingency.all.n > 0) {
                        if (isStatistical($scope.crosstab.rhs.xVariable)) {
                            normalizeStatistics(contingency, v1Cats);
                        } else {
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
        var downloadUrl = function(docType) {
            return ContingencyService.getCrossDownloadUrl({
                ":dsType": $routeParams.type,
                ":dsId": $routeParams.ds,
                ":docType": docType,
                ":v1": $scope.crosstab.lhs.xVariable.name,
                ":v2": $scope.crosstab.rhs.xVariable.name
            });
        };
        var lhsVariableCategory = function(category) {
            return getVariableCategory($scope.crosstab.lhs.xVariable, category);
        };
        var rhsVariableCategory = function(category) {
            return getVariableCategory($scope.crosstab.rhs.xVariable, category);
        };
        function getVariableCategory(variable, category) {
            var result = null;
            if (variable && variable.categories) {
                result = variable.categories.filter(function(cat) {
                    return cat.name === category;
                });
            }
            return result ? result[0] : category;
        }
        var getPrivacyErrorMessage = function(contingency) {
            return !contingency.totalPrivacyCheck ? "dataset.crosstab.total-privacy-check-failed" : !contingency.privacyCheck ? "dataset.crosstab.privacy-check-failed" : "";
        };
        var getTemplatePath = function(contingency) {
            if (!$scope.crosstab.rhs.xVariable) {
                $log.error("RHS variable is not initialized!");
                return;
            }
            return isStatistical($scope.crosstab.rhs.xVariable) ? !contingency.totalPrivacyCheck || contingency.all.n > 0 ? ngObibaMicaAnalysisTemplateUrl.getTemplateUrl("variableStatistics") : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl("variableStatisticsEmpty") : !contingency.totalPrivacyCheck || contingency.all.n > 0 ? ngObibaMicaAnalysisTemplateUrl.getTemplateUrl("variableFrequencies") : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl("variableFrequenciesEmpty");
        };
        $scope.crosstabTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getTemplateUrl("variableCrosstab");
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
        $scope.DocType = {
            CSV: "csv",
            EXCEL: "excel"
        };
        $scope.StatType = {
            CPERCENT: 1,
            RPERCENT: 2,
            CHI: 3
        };
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
            $scope.datasetHarmo = $scope.dataset.hasOwnProperty("obiba.mica.HarmonizedDatasetDto.type");
        }, onError);
        var varCount = 0;
        if ($routeParams.varId) {
            DatasetVariableResource.get({
                varId: $routeParams.varId
            }, function onSuccess(response) {
                $scope.crosstab.lhs.variable = response;
                $scope.crosstab.lhs.variables = [ response ];
                varCount++;
                if (varCount > 1) {
                    submit();
                }
            }, onError);
        }
        if ($routeParams.byId) {
            DatasetVariableResource.get({
                varId: $routeParams.byId
            }, function onSuccess(response) {
                $scope.crosstab.rhs.variable = response;
                $scope.crosstab.rhs.variables = [ response ];
                varCount++;
                if (varCount > 1) {
                    submit();
                }
            }, onError);
        }
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.filter("variableCategory", function() {
        return function(categories, category) {
            var result = null;
            if (categories) {
                result = categories.filter(function(cat) {
                    return cat.name === category;
                });
            }
            return result ? result[0] : null;
        };
    }).filter("variableLabel", [ "AttributeService", function(AttributeService) {
        return function(variable) {
            var label = "";
            if (variable) {
                var attributes = AttributeService.getAttributes(variable, [ "label" ]);
                if (attributes) {
                    attributes.forEach(function(attribute) {
                        label = AttributeService.getValue(attribute);
                        return false;
                    });
                }
                return label;
            }
        };
    } ]).filter("roundNumber", [ "$filter", function($filter) {
        return function(value) {
            return isNaN(value) ? value : $filter("number")(value, 2);
        };
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.config([ "$routeProvider", function($routeProvider) {
        $routeProvider.when("/crosstab/:type/:ds", {
            templateUrl: "analysis/crosstab/views/crosstab-variable-crosstab.html",
            controller: "DatasetVariableCrosstabController"
        }).when("/crosstab/:type/:ds/variable/:varId", {
            templateUrl: "analysis/crosstab/views/crosstab-variable-crosstab.html",
            controller: "DatasetVariableCrosstabController"
        }).when("/crosstab/:type/:ds/variable/:varId/by/:byId", {
            templateUrl: "analysis/crosstab/views/crosstab-variable-crosstab.html",
            controller: "DatasetVariableCrosstabController"
        });
    } ]);
})();

"use strict";

ngObibaMica.analysis = angular.module("obiba.mica.analysis", [ "obiba.alert", "ui.bootstrap", "pascalprecht.translate", "templates-ngObibaMica" ]);

"use strict";

(function() {
    ngObibaMica.analysis.config([ "$provide", function($provide) {
        $provide.provider("ngObibaMicaAnalysisTemplateUrl", new NgObibaMicaTemplateUrlFactory().create({
            entities: {
                header: null,
                footer: null
            },
            variableCrosstab: {
                template: null
            },
            variableFrequencies: {
                template: null
            },
            variableFrequenciesEmpty: {
                template: null
            },
            variableStatistics: {
                template: null
            },
            variableStatisticsEmpty: {
                template: null
            }
        }));
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.factory("DatasetCategoricalVariablesResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("DatasetCategoricalVariablesResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.factory("DatasetResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl("DatasetResource");
        return $resource(url, {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.factory("DatasetVariableResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("DatasetVariableResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.factory("DatasetVariablesCrosstabResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("DatasetVariablesCrosstabResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.DatasetVariableCrosstab.factory("DatasetVariablesResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl("DatasetVariablesResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("EntitiesCountResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
        var resourceUrl = ngObibaMicaUrl.getUrl("EntitiesCountResource");
        var method = resourceUrl.indexOf(":query") === -1 ? "POST" : "GET";
        var contentType = method === "POST" ? "application/x-www-form-urlencoded" : "application/json";
        var requestTransformer = function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };
        return $resource(resourceUrl, {}, {
            get: {
                method: method,
                headers: {
                    "Content-Type": contentType
                },
                transformRequest: requestTransformer,
                errorHandler: true
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("VariableResource", [ "$resource", "ngObibaMicaUrl", "$cacheFactory", function($resource, ngObibaMicaUrl, $cacheFactory) {
        return $resource(ngObibaMicaUrl.getUrl("VariableResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true,
                cache: $cacheFactory("variableResource")
            }
        });
    } ]);
})();

"use strict";

(function() {
    ngObibaMica.search.factory("VariableSummaryResource", [ "$resource", "ngObibaMicaUrl", "$cacheFactory", function($resource, ngObibaMicaUrl, $cacheFactory) {
        return $resource(ngObibaMicaUrl.getUrl("VariableSummaryResource"), {}, {
            get: {
                method: "GET",
                errorHandler: true,
                cache: $cacheFactory("variableSummaryResource")
            }
        });
    } ]);
})();

"use strict";

(function() {
    function manageEntitiesCountHelpText($scope, $translate, $cookies) {
        var cookiesHelp = "micaHideEntitiesCountHelpText";
        $translate([ "analysis.entities-count.help" ]).then(function(translation) {
            if (!$scope.options.EntitiesCountHelpText && !$cookies.get(cookiesHelp)) {
                $scope.options.EntitiesCountHelpText = translation["analysis.entities-count.help"];
            }
        });
        $scope.closeHelpBox = function() {
            $cookies.put(cookiesHelp, true);
            $scope.options.EntitiesCountHelpText = null;
        };
        if ($cookies.get(cookiesHelp)) {
            $scope.options.EntitiesCountHelpText = null;
        }
    }
    ngObibaMica.analysis.controller("EntitiesCountController", [ "$scope", "$location", "$translate", "$cookies", "LocalizedValues", "AnalysisConfigService", "EntitiesCountResource", "AlertService", "ServerErrorUtils", "ngObibaMicaAnalysisTemplateUrl", function($scope, $location, $translate, $cookies, LocalizedValues, AnalysisConfigService, EntitiesCountResource, AlertService, ServerErrorUtils, ngObibaMicaAnalysisTemplateUrl) {
        $scope.options = AnalysisConfigService.getOptions();
        manageEntitiesCountHelpText($scope, $translate, $cookies);
        $scope.entitiesHeaderTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getHeaderUrl("entities");
        $scope.result = {};
        $scope.query = $location.search().query;
        $scope.loading = false;
        function refresh() {
            if ($scope.query) {
                $scope.loading = true;
                EntitiesCountResource.get({
                    query: $scope.query
                }, function onSuccess(response) {
                    $scope.result = response;
                    $scope.loading = false;
                    $scope.localizedTotal = ($scope.result.belowPrivacyThreshold ? "<" : "") + LocalizedValues.formatNumber($scope.result.total, $translate.use());
                }, function onError(response) {
                    $scope.result = {};
                    $scope.loading = false;
                    AlertService.alert({
                        id: "EntitiesCountController",
                        type: "danger",
                        msg: ServerErrorUtils.buildMessage(response),
                        delay: 5e3
                    });
                });
            } else {
                $scope.result = {};
            }
        }
        refresh();
        $scope.$on("$locationChangeSuccess", function() {
            $scope.query = $location.search().query;
            refresh();
        });
    } ]);
})();

"use strict";

ngObibaMica.analysis.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/entities-count", {
        templateUrl: "analysis/views/analysis-entities-count.html",
        controller: "EntitiesCountController",
        reloadOnSearch: false
    });
} ]);

"use strict";

var AnalysisConfigService = function() {
    function AnalysisConfigService() {
        this.options = {
            crosstab: {
                showDetailedStats: true
            },
            showAnalysis: true
        };
    }
    AnalysisConfigService.prototype.setOptions = function(newOptions) {
        var _this = this;
        if (typeof newOptions === "object") {
            Object.keys(newOptions).forEach(function(option) {
                if (option in _this.options) {
                    _this.options[option] = newOptions[option];
                }
            });
        }
    };
    AnalysisConfigService.prototype.getOptions = function() {
        return angular.copy(this.options);
    };
    AnalysisConfigService.prototype.showAnalysis = function() {
        return this.options.showAnalysis;
    };
    return AnalysisConfigService;
}();

ngObibaMica.analysis.service("AnalysisConfigService", [ AnalysisConfigService ]);

"use strict";

var ChiSquaredCalculator = function() {
    function ChiSquaredCalculator() {}
    ChiSquaredCalculator.prototype.compute = function(chiSquaredInfo) {
        var Chisqcdf = null;
        var Z = chiSquaredInfo.sum;
        var DF = chiSquaredInfo.df;
        if (DF <= 0) {} else {
            Chisqcdf = this.gammacdf(Z / 2, DF / 2);
        }
        Chisqcdf = Math.round(Chisqcdf * 1e5) / 1e5;
        return Chisqcdf;
    };
    ChiSquaredCalculator.prototype.logGamma = function(Z) {
        var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + .00120858003 / (Z + 4) - 536382e-11 / (Z + 5);
        var LG = (Z - .5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
        return LG;
    };
    ChiSquaredCalculator.prototype.gcf = function(X, A) {
        var A0 = 0;
        var B0 = 1;
        var A1 = 1;
        var B1 = X;
        var AOLD = 0;
        var N = 0;
        while (Math.abs((A1 - AOLD) / A1) > 1e-5) {
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
    ChiSquaredCalculator.prototype.gser = function(X, A) {
        var T9 = 1 / A;
        var G = T9;
        var I = 1;
        while (T9 > G * 1e-5) {
            T9 = T9 * X / (A + I);
            G = G + T9;
            I = I + 1;
        }
        G = G * Math.exp(A * Math.log(X) - X - this.logGamma(A));
        return G;
    };
    ChiSquaredCalculator.prototype.gammacdf = function(x, a) {
        var GI;
        if (x <= 0) {
            GI = 0;
        } else if (x < a + 1) {
            GI = this.gser(x, a);
        } else {
            GI = this.gcf(x, a);
        }
        return GI;
    };
    return ChiSquaredCalculator;
}();

ngObibaMica.DatasetVariableCrosstab.service("ChiSquaredCalculator", [ ChiSquaredCalculator ]);

"use strict";

var ContingencyService = function() {
    function ContingencyService() {}
    ContingencyService.prototype.removeVariableFromUrl = function(path) {
        return path.replace(/\/variable\/.*/, "");
    };
    ContingencyService.prototype.getCrossDownloadUrl = function(params) {
        return this.searchReplace(":dsType/:dsId/download_:docType/cross/:v1/by/:v2/ws", params);
    };
    ContingencyService.prototype.createVariableUrlPart = function(var1, var2) {
        return this.searchReplace("variable/:var/by/:by", {
            ":by": var2,
            ":var": var1
        });
    };
    ContingencyService.prototype.searchReplace = function(pattern, params) {
        return pattern.replace(/:\w+/g, function(all) {
            return params[all] || all;
        });
    };
    return ContingencyService;
}();

ngObibaMica.DatasetVariableCrosstab.service("ContingencyService", [ ContingencyService ]);

"use strict";

var EntitiesCountService = function() {
    function EntitiesCountService($location, ObibaServerConfigResource) {
        this.$location = $location;
        this.ObibaServerConfigResource = ObibaServerConfigResource;
        var that = this;
        ObibaServerConfigResource.get(function(micaConfig) {
            that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        });
    }
    EntitiesCountService.prototype.isSingleStudy = function() {
        return !this.hasMultipleStudies;
    };
    EntitiesCountService.prototype.update = function(originalQuery, newQuery) {
        if (originalQuery === newQuery) {
            return;
        }
        var search = this.$location.search();
        search.query = search.query.split(originalQuery).join("").replace(/,,/, ",").replace(/^,/, "").replace(/,$/, "");
        if (newQuery && newQuery.length !== 0) {
            if (search.query && search.query.length > 0) {
                search.query = search.query + "," + newQuery;
            } else {
                search.query = newQuery;
            }
        }
        this.$location.search(search);
    };
    EntitiesCountService.$inject = [ "$location", "ObibaServerConfigResource" ];
    return EntitiesCountService;
}();

ngObibaMica.analysis.service("EntitiesCountService", [ "$location", "ObibaServerConfigResource", EntitiesCountService ]);

"use strict";

var CrosstabStudyTableController = function() {
    function CrosstabStudyTableController(PageUrlService) {
        this.PageUrlService = PageUrlService;
        this.contingency = {};
    }
    CrosstabStudyTableController.prototype.$onChanges = function() {
        if (this.contingency.studyTable) {
            this.studyLink = this.PageUrlService.studyPage(this.contingency.studyTable.studyId, "individual-study");
        }
    };
    CrosstabStudyTableController.$inject = [ "PageUrlService" ];
    return CrosstabStudyTableController;
}();

var CrosstabStudyTableComponent = function() {
    function CrosstabStudyTableComponent() {
        this.transclude = true;
        this.bindings = {
            contingency: "<"
        };
        this.controller = CrosstabStudyTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/crosstab-study-table/component.html";
    }
    return CrosstabStudyTableComponent;
}();

ngObibaMica.DatasetVariableCrosstab.component("crosstabStudyTable", new CrosstabStudyTableComponent());

"use strict";

var EntitiesCountResultTableController = function() {
    function EntitiesCountResultTableController(PageUrlService, LocalizedValues, EntitiesCountService, $translate, $log) {
        this.PageUrlService = PageUrlService;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$translate = $translate;
        this.$log = $log;
        this.result = {};
    }
    EntitiesCountResultTableController.prototype.$onInit = function() {
        this.table = {
            rows: new Array()
        };
    };
    EntitiesCountResultTableController.prototype.$onChanges = function() {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues.formatNumber(this.result.total ? this.result.total : 0);
        if (this.result.belowPrivacyThreshold) {
            this.localizedTotal = "<" + this.localizedTotal;
        }
    };
    EntitiesCountResultTableController.prototype.showStudyColumn = function() {
        return !this.EntitiesCountService.isSingleStudy();
    };
    EntitiesCountResultTableController.prototype.localize = function(values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    EntitiesCountResultTableController.prototype.asTable = function() {
        var _this = this;
        var table = {
            rows: new Array()
        };
        this.studyCount = this.result.counts ? this.result.counts.length : 0;
        if (this.studyCount) {
            this.result.counts.forEach(function(studyResult) {
                var studyAcronym = _this.localize(studyResult.study.acronym);
                var studyName = _this.localize(studyResult.study.name);
                if (studyResult.counts) {
                    var studyRowCount_1 = 0;
                    studyResult.counts.forEach(function(datasetResult) {
                        var datasetAcronym = _this.localize(datasetResult.dataset.acronym);
                        var datasetName = _this.localize(datasetResult.dataset.name);
                        if (datasetResult.counts) {
                            datasetResult.counts.forEach(function(variableResult) {
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
                                    value: studyRowCount_1 === 0 ? studyAcronym : ""
                                }, {
                                    colspan: 1,
                                    link: variableLink ? variableLink : datasetLink,
                                    rowspan: 1,
                                    title: _this.localize(variableResult.variable.name),
                                    value: variableName
                                }, {
                                    colspan: 1,
                                    link: datasetLink,
                                    rowspan: 1,
                                    title: datasetName,
                                    value: datasetAcronym
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: variableResult.query,
                                    value: variableResult.query
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: undefined,
                                    value: _this.LocalizedValues.formatNumber(variableResult.count)
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
                        value: undefined
                    }, {
                        colspan: 3,
                        rowspan: 1,
                        title: studyResult.query,
                        value: undefined
                    }, {
                        colspan: 1,
                        rowspan: 1,
                        title: undefined,
                        value: (studyResult.belowPrivacyThreshold ? "<" : "") + _this.LocalizedValues.formatNumber(studyResult.total)
                    }));
                }
            });
        }
        return table;
    };
    EntitiesCountResultTableController.$inject = [ "PageUrlService", "LocalizedValues", "EntitiesCountService", "$translate", "$log" ];
    return EntitiesCountResultTableController;
}();

var EntitiesCountResultTableComponent = function() {
    function EntitiesCountResultTableComponent() {
        this.transclude = true;
        this.bindings = {
            result: "<"
        };
        this.controller = EntitiesCountResultTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/entities-count-result-table/component.html";
    }
    return EntitiesCountResultTableComponent;
}();

ngObibaMica.analysis.component("entitiesCountResultTable", new EntitiesCountResultTableComponent());

"use strict";

var Operation;

(function(Operation) {
    Operation["All"] = "all";
    Operation["Exists"] = "exists";
    Operation["Empty"] = "empty";
    Operation["In"] = "in";
    Operation["Out"] = "out";
})(Operation || (Operation = {}));

var VariableCriteriaController = function() {
    function VariableCriteriaController(VariableResource, VariableSummaryResource, LocalizedValues, EntitiesCountService, $log, $translate, $filter) {
        this.VariableResource = VariableResource;
        this.VariableSummaryResource = VariableSummaryResource;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$log = $log;
        this.$translate = $translate;
        this.$filter = $filter;
        this.query = "";
        this.state = {
            open: false
        };
        this.categoriesData = [];
        this.selectedCategories = {};
        this.selectedNumericalOperation = "range";
        this.selectedTemporalOperation = "range";
    }
    VariableCriteriaController.prototype.$onInit = function() {
        this.loading = true;
        this.initializeState();
    };
    VariableCriteriaController.prototype.onKeyup = function(event) {
        if (event.keyCode === 13) {
            this.closeDropdown(false);
        } else if (event.keyCode === 27) {
            this.closeDropdown(true);
        }
    };
    VariableCriteriaController.prototype.onSearchTextKeyup = function(event) {
        var filter = this.searchText.trim();
        if (this.categoriesData) {
            var regex_1 = new RegExp(filter, "i");
            this.categoriesData.forEach(function(cat) {
                cat.visible = cat.label.match(regex_1) !== null;
            });
        }
    };
    VariableCriteriaController.prototype.onNumericalMinKeyup = function(event) {
        this.selectedMin = this.ensureNumericValue(this.selectedMin + "", " ");
    };
    VariableCriteriaController.prototype.onNumericalMaxKeyup = function(event) {
        this.selectedMax = this.ensureNumericValue(this.selectedMax + "", " ");
    };
    VariableCriteriaController.prototype.onNumericalValuesKeyup = function(event) {
        this.selectedNumericalValues = this.ensureNumericValue(this.selectedNumericalValues, " ");
    };
    VariableCriteriaController.prototype.closeDropdown = function(cancel) {
        this.state.open = false;
        if (cancel) {
            return;
        }
        this.update(this.makeNewQuery());
    };
    VariableCriteriaController.prototype.openDropdown = function() {
        if (this.state.open) {
            this.closeDropdown(false);
            return;
        }
        this.state.open = true;
    };
    VariableCriteriaController.prototype.onRemove = function() {
        this.update("");
    };
    VariableCriteriaController.prototype.getQueryTitle = function(truncated) {
        var _this = this;
        if (!this.rqlQuery) {
            return "?";
        }
        var title = this.getOperationTitle();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (rqlQueryWithArgs.args.length > 1) {
            var items = rqlQueryWithArgs.args[1];
            if (this.getNature() === "CATEGORICAL") {
                items = items.map(function(x) {
                    return _this.localizeCategory(x);
                });
            }
            if (rqlQueryWithArgs.name === "range") {
                title = title + " [" + items.join(", ") + "]";
            } else {
                title = title + " (" + items.join(", ") + ")";
            }
        }
        if (!truncated) {
            return title.length > 50 ? title : "";
        }
        return title.length > 50 ? title.substring(0, 50) + "..." : title;
    };
    VariableCriteriaController.prototype.showInOperations = function() {
        return this.getNature() === "CATEGORICAL" || this.isNumerical() || this.isTemporal();
    };
    VariableCriteriaController.prototype.showCategoricalOptions = function() {
        return this.getNature() === "CATEGORICAL" && this.showOptions();
    };
    VariableCriteriaController.prototype.showNumericalOptions = function() {
        return this.getNature() === "CONTINUOUS" && this.isNumerical() && this.showOptions();
    };
    VariableCriteriaController.prototype.showTemporalOptions = function() {
        return this.getNature() === "TEMPORAL" && this.isTemporal() && this.showOptions();
    };
    VariableCriteriaController.prototype.localizeNumber = function(value) {
        return this.LocalizedValues.formatNumber(value);
    };
    VariableCriteriaController.prototype.initializeState = function() {
        this.rqlQuery = this.parseQuery();
        if (this.rqlQuery.args) {
            var rqlQueryWithArgs = this.getQueryWithArgs();
            this.id = rqlQueryWithArgs.args[0].join(":");
            this.VariableResource.get({
                id: this.id
            }, this.onVariable(), this.onError());
        }
    };
    VariableCriteriaController.prototype.getQueryWithArgs = function() {
        return this.isQueryNot() ? this.rqlQuery.args[0] : this.rqlQuery;
    };
    VariableCriteriaController.prototype.isQueryNot = function() {
        return this.rqlQuery.name === "not";
    };
    VariableCriteriaController.prototype.update = function(newQuery) {
        this.EntitiesCountService.update(this.query, newQuery);
    };
    VariableCriteriaController.prototype.showOptions = function() {
        return Operation.All !== this.selectedOperation && Operation.Exists !== this.selectedOperation && Operation.Empty !== this.selectedOperation;
    };
    VariableCriteriaController.prototype.getNature = function() {
        return this.variable ? this.variable.nature : "?";
    };
    VariableCriteriaController.prototype.isNumerical = function() {
        return this.variable && (this.variable.valueType === "integer" || this.variable.valueType === "decimal");
    };
    VariableCriteriaController.prototype.isLogical = function() {
        return this.variable && this.variable.valueType === "boolean";
    };
    VariableCriteriaController.prototype.isTemporal = function() {
        return this.variable && (this.variable.valueType === "date" || this.variable.valueType === "datetime");
    };
    VariableCriteriaController.prototype.getOperationTitle = function() {
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (this.isNotQuery()) {
            if (rqlQueryWithArgs.name === "exists") {
                return this.$filter("translate")("analysis.empty");
            } else {
                return this.$filter("translate")("analysis.out");
            }
        }
        return this.$filter("translate")("analysis." + (rqlQueryWithArgs.name === "range" ? "in" : rqlQueryWithArgs.name));
    };
    VariableCriteriaController.prototype.getRqlQueryWithArgs = function() {
        if (this.isNotQuery()) {
            return this.rqlQuery.args[0];
        }
        return this.rqlQuery;
    };
    VariableCriteriaController.prototype.isNotQuery = function() {
        return this.rqlQuery && this.rqlQuery.name === "not";
    };
    VariableCriteriaController.prototype.parseQuery = function() {
        try {
            return new RqlParser().parse(this.normalize(this.query)).args[0];
        } catch (e) {
            this.$log.error(e.message);
        }
        return new RqlQuery();
    };
    VariableCriteriaController.prototype.normalize = function(str) {
        return str.split(":").join("/");
    };
    VariableCriteriaController.prototype.localizeCategory = function(value) {
        if (!this.variable.categories) {
            return this.isLogical() ? this.$filter("translate")("global." + value) : value;
        }
        var categories = this.variable.categories.filter(function(cat) {
            return cat.name === value + "";
        });
        if (categories.length === 0) {
            return value;
        }
        var category = categories[0];
        if (!category.attributes) {
            return value;
        }
        var labels = category.attributes.filter(function(attr) {
            return attr.name === "label";
        });
        if (labels.length === 0) {
            return value;
        }
        var label = this.localize(labels[0].values);
        return label || value;
    };
    VariableCriteriaController.prototype.localize = function(values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    VariableCriteriaController.prototype.prepareCategories = function() {
        var _this = this;
        this.categoriesData = [];
        if (this.getNature() === "CATEGORICAL") {
            var categories = this.variable.categories;
            if (categories) {
                categories.forEach(function(cat) {
                    _this.categoriesData.push({
                        label: _this.localizeCategory(cat.name),
                        name: cat.name,
                        visible: true
                    });
                });
            } else if (this.isLogical()) {
                this.categoriesData.push({
                    label: this.$filter("translate")("global.true"),
                    name: "true",
                    visible: true
                });
                this.categoriesData.push({
                    label: this.$filter("translate")("global.false"),
                    name: "false",
                    visible: true
                });
            }
        }
    };
    VariableCriteriaController.prototype.prepareOptions = function() {
        var _this = this;
        this.prepareCategories();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (rqlQueryWithArgs.args.length > 1) {
            if (rqlQueryWithArgs.name === "in") {
                if (this.showCategoricalOptions()) {
                    rqlQueryWithArgs.args[1].forEach(function(value) {
                        _this.selectedCategories[value] = true;
                    });
                } else if (this.showNumericalOptions()) {
                    this.selectedNumericalOperation = "in";
                    this.selectedNumericalValues = rqlQueryWithArgs.args[1].filter(function(val) {
                        return !isNaN(val);
                    }).join(" ");
                } else if (this.showTemporalOptions()) {
                    this.selectedTemporalOperation = "in";
                    this.selectedTemporalValue = rqlQueryWithArgs.args[1].length > 0 ? new Date(Date.parse(rqlQueryWithArgs.args[1][0])) : undefined;
                }
            } else if (rqlQueryWithArgs.name === "range" && rqlQueryWithArgs.args[1].length > 0) {
                var arg1 = rqlQueryWithArgs.args[1][0];
                if (arg1 === "*") {
                    this.selectedMin = undefined;
                    this.selectedFrom = undefined;
                } else if (this.showNumericalOptions() && !isNaN(arg1)) {
                    this.selectedMin = arg1;
                } else if (this.showTemporalOptions()) {
                    this.selectedFrom = new Date(Date.parse(arg1));
                }
                if (rqlQueryWithArgs.args[1].length >= 2) {
                    var arg2 = rqlQueryWithArgs.args[1][1];
                    if (arg2 === "*") {
                        this.selectedMax = undefined;
                        this.selectedTo = undefined;
                    } else if (this.showNumericalOptions() && !isNaN(arg2)) {
                        this.selectedMax = arg2;
                    } else if (this.showTemporalOptions()) {
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
    VariableCriteriaController.prototype.ensureNumericValue = function(selection, separator) {
        var values = "";
        if (selection) {
            for (var i = 0; i < selection.length; i++) {
                var c = selection.charAt(i);
                if (c === separator || this.variable.valueType === "decimal" && c === "." || c === "-" || !isNaN(parseInt(c, 10))) {
                    values = values + c;
                }
            }
        }
        return values;
    };
    VariableCriteriaController.prototype.makeNewQuery = function() {
        var _this = this;
        var newQuery = "";
        var args;
        if (this.showCategoricalOptions()) {
            args = Object.keys(this.selectedCategories).filter(function(key) {
                return _this.selectedCategories[key];
            }).map(function(key) {
                return key;
            }).join(",");
        }
        if (this.showNumericalOptions()) {
            if (this.selectedNumericalOperation === "range") {
                var min = this.selectedMin && this.selectedMin !== "-" ? this.selectedMin : "*";
                var max = this.selectedMax && this.selectedMax !== "-" ? this.selectedMax : "*";
                args = [ min, max ].join(",");
            } else {
                args = this.selectedNumericalValues.split(" ").join(",");
            }
        }
        if (this.showTemporalOptions()) {
            if (this.selectedTemporalOperation === "range") {
                var min = this.selectedFrom ? this.dateToString(this.selectedFrom) : "*";
                var max = this.selectedTo ? this.dateToString(this.selectedTo) : "*";
                args = [ min, max ].join(",");
            } else {
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
                if (this.showCategoricalOptions() || this.showNumericalOptions() && this.selectedNumericalOperation === "in" || this.showTemporalOptions() && this.selectedTemporalOperation === "in") {
                    newQuery = "in({field},({args}))";
                } else if (this.showNumericalOptions() && this.selectedNumericalOperation === "range" || this.showTemporalOptions() && this.selectedTemporalOperation === "range") {
                    newQuery = "range({field},({args}))";
                }
            } else {
                newQuery = "not(exists({field}))";
                this.selectedOperation = "empty";
            }
            break;

          case Operation.Out:
            if (args && args.length > 0) {
                if (this.showCategoricalOptions() || this.showNumericalOptions() && this.selectedNumericalOperation === "in" || this.showTemporalOptions() && this.selectedTemporalOperation === "in") {
                    newQuery = "not(in({field},({args})))";
                } else if (this.showNumericalOptions() && this.selectedNumericalOperation === "range" || this.showTemporalOptions() && this.selectedTemporalOperation === "range") {
                    newQuery = "not(range({field},({args})))";
                }
            } else {
                newQuery = "exists({field})";
                this.selectedOperation = "exists";
            }
        }
        newQuery = newQuery.replace("{field}", this.variable.id);
        newQuery = newQuery.replace("{args}", args);
        return newQuery;
    };
    VariableCriteriaController.prototype.dateToString = function(date) {
        if (!date) {
            return "";
        }
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        return [ date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd ].join("-");
    };
    VariableCriteriaController.prototype.onVariable = function() {
        var that = this;
        return function(response) {
            that.variable = response;
            that.loading = false;
            that.prepareOptions();
            that.VariableSummaryResource.get({
                id: response.id
            }, that.onVariableSummary(), that.onError());
        };
    };
    VariableCriteriaController.prototype.onVariableSummary = function() {
        var that = this;
        return function(response) {
            that.summary = response;
            if (that.summary["Math.ContinuousSummaryDto.continuous"]) {
                var summary = that.summary["Math.ContinuousSummaryDto.continuous"].summary;
                that.rangeMin = summary.min;
                that.rangeMax = summary.max;
                var frequencies = that.summary["Math.ContinuousSummaryDto.continuous"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function(elem) {
                    return elem.value === "NOT_NULL";
                }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                var emptyFreq = frequencies.filter(function(elem) {
                    return elem.value === "N/A";
                }).pop();
                that.emptyFrequency = emptyFreq ? emptyFreq.freq : 0;
                that.allFrequency = that.existsFrequency + that.emptyFrequency;
            }
            if (that.summary["Math.CategoricalSummaryDto.categorical"]) {
                var frequencies_1 = that.summary["Math.CategoricalSummaryDto.categorical"].frequencies;
                that.categoriesData.forEach(function(cat) {
                    var freqs = frequencies_1.filter(function(elem) {
                        return elem.value === cat.name;
                    });
                    if (freqs.length > 0) {
                        cat.frequency = freqs[0].freq;
                    }
                });
                that.allFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].n;
                that.existsFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].otherFrequency + frequencies_1.filter(function(elem) {
                    return elem.value !== "N/A";
                }).map(function(elem) {
                    return elem.freq;
                }).reduce(function(acc, curr) {
                    return acc + curr;
                });
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.TextSummaryDto.textSummary"]) {
                that.allFrequency = that.summary["Math.TextSummaryDto.textSummary"].n;
                var frequencies = that.summary["Math.TextSummaryDto.textSummary"].frequencies;
                if (frequencies) {
                    that.existsFrequency = frequencies.filter(function(elem) {
                        return elem.value !== "N/A";
                    }).map(function(elem) {
                        return elem.freq;
                    }).reduce(function(acc, curr) {
                        return acc + curr;
                    });
                }
                if (that.summary["Math.TextSummaryDto.textSummary"].otherFrequency) {
                    that.existsFrequency = that.existsFrequency + that.summary["Math.TextSummaryDto.textSummary"].otherFrequency;
                }
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.DefaultSummaryDto.defaultSummary"]) {
                that.allFrequency = that.summary["Math.DefaultSummaryDto.defaultSummary"].n;
                var frequencies = that.summary["Math.DefaultSummaryDto.defaultSummary"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function(elem) {
                    return elem.value === "NOT_NULL";
                }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
        };
    };
    VariableCriteriaController.prototype.onError = function() {
        var that = this;
        return function(response) {
            that.variable = undefined;
            that.loading = false;
        };
    };
    VariableCriteriaController.$inject = [ "VariableResource", "VariableSummaryResource", "LocalizedValues", "EntitiesCountService", "$log", "$translate", "$filter" ];
    return VariableCriteriaController;
}();

var VariableCriteriaComponent = function() {
    function VariableCriteriaComponent() {
        this.transclude = true;
        this.bindings = {
            query: "<"
        };
        this.controller = VariableCriteriaController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/variable-criteria/component.html";
    }
    return VariableCriteriaComponent;
}();

ngObibaMica.analysis.component("variableCriteria", new VariableCriteriaComponent());

"use strict";

function NgObibaMicaListsOptionsFactory() {
    var defaultOptions = {
        listSearchOptions: {
            network: {
                fields: [ "studyIds", "acronym.*", "name.*", "description.*", "logo" ]
            },
            study: {
                fields: [ "logo", "objectives.*", "acronym.*", "name.*", "model.methods.design", "model.numberOfParticipants.participant" ]
            },
            dataset: {
                fields: [ "acronym.*", "name.*", "description.*", "variableType", "studyTable.studyId", "studyTable.project", "studyTable.table", "studyTable.populationId", "studyTable.dataCollectionEventId", "harmonizationTable.studyId", "harmonizationTable.project", "harmonizationTable.table", "harmonizationTable.populationId" ]
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
        this.getOptions = function() {
            return defaultOptions;
        };
    }
    this.$get = function() {
        return new NgObibaMicaListsOptions();
    };
    this.setOptions = function(value) {
        Object.keys(value).forEach(function(option) {
            if (option in defaultOptions) {
                defaultOptions[option] = value[option];
            }
        });
    };
}

function SortWidgetOptionsProvider() {
    var defaultOptions = {
        sortOrderField: {
            options: [ {
                value: "-_score",
                label: "relevance"
            }, {
                value: "name",
                label: "name"
            }, {
                value: "-name",
                label: "name"
            }, {
                value: "acronym",
                label: "acronym"
            }, {
                value: "-acronym",
                label: "acronym"
            } ],
            defaultValue: "-_score"
        }
    };
    var self = this;
    function SortWidgetOptions(defaultOptions) {
        var options = defaultOptions;
        this.getOptions = function() {
            return options;
        };
    }
    this.getDefaultOptions = function() {
        return self.defaultOptions;
    };
    this.$get = function() {
        return new SortWidgetOptions(defaultOptions);
    };
    this.setOptions = function(value) {
        Object.keys(value).forEach(function(optionKey) {
            if (optionKey in defaultOptions) {
                if (value[optionKey].options) {
                    defaultOptions[optionKey].options = defaultOptions[optionKey].options.concat(value[optionKey].options);
                    defaultOptions[optionKey].default = value[optionKey].default;
                }
            }
        });
    };
}

ngObibaMica.lists = angular.module("obiba.mica.lists", [ "obiba.mica.search" ]);

ngObibaMica.lists.run().config([ "$provide", function($provide) {
    $provide.provider("ngObibaMicaLists", NgObibaMicaListsOptionsFactory);
} ]).config([ "ngObibaMicaSearchTemplateUrlProvider", function(ngObibaMicaSearchTemplateUrlProvider) {
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchStudiesResultTable", "lists/views/list/studies-search-result-table-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchNetworksResultTable", "lists/views/list/networks-search-result-table-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchDatasetsResultTable", "lists/views/list/datasets-search-result-table-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchResultList", "lists/views/search-result-list-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchInputList", "lists/views/input-search-widget/input-search-widget-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("searchCriteriaRegionTemplate", "lists/views/region-criteria/search-criteria-region-template.html");
    ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl("CriterionDropdownTemplate", "lists/views/region-criteria/criterion-dropdown-template.html");
} ]).config([ "$provide", function($provide) {
    $provide.provider("sortWidgetOptions", SortWidgetOptionsProvider);
} ]).filter("getBaseUrl", function() {
    return function(param) {
        return "/mica/" + param;
    };
}).filter("doSearchQuery", function() {
    return function(type, query) {
        return "/mica/repository#/search?type=" + type + "&query=" + query + "&display=list";
    };
});

"use strict";

ngObibaMica.lists.service("sortWidgetService", [ "$filter", "$location", "RqlQueryService", "sortWidgetOptions", function($filter, $location, RqlQueryService, sortWidgetOptions) {
    var newOptions = sortWidgetOptions.getOptions();
    var self = this;
    this.getSortOrderOptions = function() {
        newOptions.sortOrderField.options.map(function(option) {
            return $filter("translate")(option.label);
        });
        return {
            options: newOptions.sortOrderField.options
        };
    };
    this.getSortOrderOption = function(value) {
        var selectedOption = null;
        if (!value) {
            value = newOptions.sortOrderField.defaultValue;
        }
        angular.forEach(self.getSortOrderOptions().options, function(option) {
            if (option.value === value) {
                selectedOption = option;
            }
        });
        return selectedOption ? selectedOption : self.getSortOrderOption(newOptions.sortOrderField.defaultValue);
    };
    this.getSortArg = function() {
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
    this.getLabel = function(selectSort, valueSort) {
        var result = null;
        angular.forEach(selectSort.options, function(value) {
            if (value.value === valueSort) {
                result = value.label;
            }
        });
        return result;
    };
} ]);

"use strict";

(function() {
    ngObibaMica.lists.controller("listSearchWidgetController", [ "$scope", "$rootScope", "$location", "RqlQueryService", "ngObibaMicaUrl", function($scope, $rootScope, $location, RqlQueryService, ngObibaMicaUrl) {
        function initMatchInput() {
            $scope.query = $location.search().query;
            $scope.target = typeToTarget($scope.type);
            $scope.rqlQuery = RqlQueryService.parseQuery($scope.query);
        }
        $scope.navigateToSearchPage = function() {
            var targetQuery = RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));
            if (targetQuery) {
                var query = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, "className") || RqlQueryService.findQueryInTargetByVocabulary(targetQuery, "id");
                if (query) {
                    targetQuery.args = [ query ];
                    var containerQuery = new RqlQuery(RQL_NODE.AND);
                    containerQuery.args.push(targetQuery);
                    return ngObibaMicaUrl.getUrl("BaseUrl") + ngObibaMicaUrl.getUrl("SearchBaseUrl") + "?type=" + $scope.type + "&query=" + new RqlQuery().serializeArgs(containerQuery.args) + "&display=list";
                }
            }
            return "";
        };
        $scope.$on("$locationChangeSuccess", function() {
            initMatchInput();
        });
        var emitter = $rootScope.$new();
        $scope.selectSuggestion = function(suggestion) {
            emitter.$emit("ngObibaMicaSearch.searchSuggestion", suggestion);
        };
        $scope.search = function() {
            emitter.$emit("ngObibaMicaSearch.searchSuggestion", $scope.searchFilter.replace(/\/.*/g, ""));
        };
        initMatchInput();
    } ]).controller("listSortWidgetController", [ "$scope", "$rootScope", "sortWidgetService", function($scope, $rootScope, sortWidgetService) {
        var emitter = $rootScope.$new();
        $scope.selectSortOrder = sortWidgetService.getSortOrderOptions();
        $scope.getLabel = sortWidgetService.getLabel;
        $scope.selected = $scope.selectSortOrder.options.defaultValue;
        initSelectedOptions();
        $scope.$on("$locationChangeSuccess", function() {
            initSelectedOptions();
        });
        $scope.selectSortOrderOption = function(option) {
            $scope.selected = option;
            emitter.$emit("ngObibaMicaSearch.sortChange", option.value);
        };
        function initSelectedOptions() {
            $scope.selected = sortWidgetService.getSortOrderOption(sortWidgetService.getSortArg());
        }
    } ]);
})();

"use strict";

ngObibaMica.lists.directive("listSortWidget", [ function() {
    return {
        restrict: "EA",
        controller: "listSortWidgetController",
        templateUrl: "lists/views/sort-widget/sort-widget-template.html"
    };
} ]).directive("listSearchWidget", [ "ngObibaMicaSearchTemplateUrl", function(ngObibaMicaSearchTemplateUrl) {
    return {
        restrict: "EA",
        require: "^^suggestionField",
        transclude: true,
        replace: true,
        scope: {
            type: "="
        },
        controller: "listSearchWidgetController",
        templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl("searchInputList")
    };
} ]).directive("suggestionField", [ "$location", "DocumentSuggestionResource", "$translate", "RqlQueryService", "EntitySuggestionService", function($location, DocumentSuggestionResource, $translate, RqlQueryService, EntitySuggestionService) {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            documentType: "=",
            model: "=",
            placeholderText: "=",
            select: "="
        },
        templateUrl: "lists/views/input-search-widget/suggestion-field.html",
        link: function(scope) {
            scope.suggest = function(query) {
                return EntitySuggestionService.suggestForTargetQuery(scope.documentType, query);
            };
        }
    };
} ]);

"use strict";

function GraphicChartsDataProvider() {
    function DataProvider(dataResponse) {
        var data = dataResponse;
        this.getData = function(callback) {
            if (callback) {
                data.$promise.then(callback);
            }
        };
    }
    this.$get = [ "$log", "JoinQuerySearchResource", "ServerErrorUtils", "AlertService", "GraphicChartsConfig", "GraphicChartsQuery", function($log, JoinQuerySearchResource, ServerErrorUtils, AlertService, GraphicChartsConfig, GraphicChartsQuery) {
        var queryDto = GraphicChartsQuery.queryDtoBuilder(GraphicChartsConfig.getOptions().entityIds, GraphicChartsConfig.getOptions().entityType);
        return new DataProvider(JoinQuerySearchResource.studies({
            query: queryDto
        }, function onSuccess(response) {
            return response;
        }, function(response) {
            $log.error("Server error", response);
        }));
    } ];
}

ngObibaMica.graphics = angular.module("obiba.mica.graphics", [ "obiba.graphics", "obiba.utils", "templates-ngObibaMica" ]);

ngObibaMica.graphics.config([ "$provide", function($provide) {
    $provide.provider("GraphicChartsData", GraphicChartsDataProvider);
} ]).run([ "GraphicChartsConfigurations", function(GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
} ]);

"use strict";

ngObibaMica.graphics.directive("obibaChart", [ function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            fieldTransformer: "=",
            chartType: "=",
            chartAggregationName: "=",
            chartEntityDto: "=",
            chartOptionsName: "=",
            chartOptions: "=",
            chartHeader: "=",
            chartTitle: "=",
            chartTitleGraph: "=",
            chartSelectGraphic: "="
        },
        templateUrl: "graphics/views/charts-directive.html",
        controller: "GraphicChartsController"
    };
} ]).directive("obibaTable", [ function() {
    return {
        restrict: "EA",
        replace: true,
        scope: {
            fieldTransformer: "=",
            chartType: "@",
            chartAggregationName: "=",
            chartEntityDto: "=",
            chartOptionsName: "=",
            chartOptions: "=",
            chartHeader: "=",
            chartTitle: "=",
            chartTitleGraph: "=",
            chartSelectGraphic: "=",
            chartOrdered: "=",
            chartNotOrdered: "="
        },
        templateUrl: "graphics/views/tables-directive.html",
        controller: "GraphicChartsController"
    };
} ]);

"use strict";

ngObibaMica.graphics.controller("GraphicChartsController", [ "$rootScope", "$scope", "$filter", "$window", "GraphicChartsConfig", "GraphicChartsUtils", "GraphicChartsData", "RqlQueryService", "ngObibaMicaUrl", "D3GeoConfig", "D3ChartConfig", function($rootScope, $scope, $filter, $window, GraphicChartsConfig, GraphicChartsUtils, GraphicChartsData, RqlQueryService, ngObibaMicaUrl, D3GeoConfig, D3ChartConfig) {
    function initializeChartData() {
        $scope.chartObject = {};
        GraphicChartsData.getData(function(StudiesData) {
            if (StudiesData) {
                GraphicChartsUtils.getArrayByAggregation($scope.chartAggregationName, StudiesData[$scope.chartEntityDto]).then(function(entries) {
                    var data = entries.map(function(e) {
                        if (e.participantsNbr) {
                            return [ e.title, e.value, e.participantsNbr ];
                        } else {
                            return [ e.title, e.value ];
                        }
                    });
                    $scope.updateCriteria = function(key, vocabulary) {
                        RqlQueryService.createCriteriaItem("study", "Mica_study", vocabulary, key).then(function(item) {
                            var entity = GraphicChartsConfig.getOptions().entityType;
                            var id = GraphicChartsConfig.getOptions().entityIds;
                            var parts = item.id.split(".");
                            var urlRedirect = ngObibaMicaUrl.getUrl("SearchBaseUrl") + "?type=studies&query=" + entity + "(in(Mica_" + entity + ".id," + id + ")),study(in(" + parts[0] + "." + parts[1] + "," + parts[2].replace(":", "%253A") + "))";
                            $window.location.href = ngObibaMicaUrl.getUrl("BaseUrl") + urlRedirect;
                        });
                    };
                    if (data) {
                        if (/^Table-/.exec($scope.chartType) !== null) {
                            $scope.chartObject.ordered = $scope.chartOrdered;
                            $scope.chartObject.notOrdered = $scope.chartNotOrdered;
                            if ($scope.chartHeader.length < 3) {
                                $scope.chartObject.header = [ $filter("translate")($scope.chartHeader[0]), $filter("translate")($scope.chartHeader[1]) ];
                            } else {
                                $scope.chartObject.header = [ $filter("translate")($scope.chartHeader[0]), $filter("translate")($scope.chartHeader[1]), $filter("translate")($scope.chartHeader[2]) ];
                            }
                            $scope.chartObject.type = $scope.chartType;
                            $scope.chartObject.data = data;
                            $scope.chartObject.vocabulary = $scope.chartAggregationName;
                            $scope.chartObject.entries = entries;
                            $scope.chartObject.getTable = function() {
                                return $scope.chartObject;
                            };
                        } else {
                            if ($scope.chartHeader.length < 3) {
                                data.unshift([ $filter("translate")($scope.chartHeader[0]), $filter("translate")($scope.chartHeader[1]) ]);
                            } else {
                                data.map(function(item) {
                                    item.pop();
                                    return item;
                                });
                                data.unshift([ $filter("translate")($scope.chartHeader[0]), $filter("translate")($scope.chartHeader[1]) ]);
                            }
                            $scope.chartObject.term = true;
                            $scope.chartObject.type = $scope.chartType;
                            $scope.chartObject.data = data;
                            $scope.chartObject.options = {
                                backgroundColor: {
                                    fill: "transparent"
                                }
                            };
                            angular.extend($scope.chartObject.options, $scope.chartOptions);
                            $scope.chartObject.options.title = $filter("translate")($scope.chartTitleGraph) + " (N=" + StudiesData.studyResultDto.totalHits + ")";
                            $scope.$parent.directive = {
                                title: $scope.chartObject.options.title
                            };
                        }
                    }
                    if ($scope.chartType === "GeoChart") {
                        $scope.chartObject.d3Config = new D3GeoConfig().withData(entries).withTitle($scope.chartObject.options.title);
                        if ($scope.chartObject.options) {
                            $scope.chartObject.d3Config.withColor($scope.chartOptions.colors);
                        }
                    } else {
                        $scope.chartObject.d3Config = new D3ChartConfig($scope.chartAggregationName).withType($scope.chartType === "PieChart" ? "pieChart" : "multiBarHorizontalChart").withData(entries, $scope.chartType === "PieChart", $filter("translate")("graphics.nbr-studies")).withTitle($filter("translate")($scope.chartTitleGraph) + " (N=" + StudiesData.studyResultDto.totalHits + ")");
                        if ($scope.chartType !== "PieChart") {
                            $scope.chartObject.d3Config.options.chart.showLegend = false;
                        }
                        if ($scope.chartObject.options && $scope.chartObject.options.colors) {
                            $scope.chartObject.d3Config.options.chart.color = $scope.chartOptions.colors;
                        }
                        $scope.chartObject.d3Config.options.chart.legendPosition = "right";
                        $scope.chartObject.d3Config.options.chart.legend = {
                            margin: {
                                top: 0,
                                right: 10,
                                bottom: 0,
                                left: 0
                            }
                        };
                    }
                });
            }
        });
    }
    $scope.ready = true;
    $scope.$watch("chartAggregationName", function() {
        if ($scope.chartAggregationName) {
            initializeChartData();
        }
    });
} ]);

"use strict";

ngObibaMica.graphics.factory("GraphicChartsDataResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    var resourceUrl = ngObibaMicaUrl.getUrl("JoinQuerySearchResource");
    var method = resourceUrl.indexOf(":query") === -1 ? "POST" : "GET";
    var contentType = method === "POST" ? "application/x-www-form-urlencoded" : "application/json";
    var requestTransformer = function(obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    return $resource(resourceUrl, {}, {
        studies: {
            method: method,
            headers: {
                "Content-Type": contentType
            },
            errorHandler: true,
            params: {
                type: "studies"
            },
            transformRequest: requestTransformer
        }
    });
} ]).service("GraphicChartsConfig", function() {
    var factory = {
        options: {
            entityIds: "NaN",
            entityType: null,
            ChartsOptions: {
                geoChartOptions: {
                    header: [ "graphics.country", "graphics.nbr-studies" ],
                    title: "graphics.geo-chart-title",
                    options: {
                        backgroundColor: {
                            fill: "transparent"
                        },
                        colors: [ "#e5edfb", "#cfddf5", "#b8cbed", "#a0b8e2", "#88a4d4" ]
                    }
                },
                studiesDesigns: {
                    header: [ "graphics.study-design", "graphics.nbr-studies", "graphics.number-participants" ],
                    title: "graphics.study-design-chart-title",
                    options: {
                        bars: "horizontal",
                        series: {
                            0: {
                                axis: "nbrStudies"
                            },
                            1: {
                                axis: "nbrParticipants"
                            }
                        },
                        axes: {
                            x: {
                                nbrStudies: {
                                    side: "top",
                                    label: "Number of Studies"
                                },
                                nbrParticipants: {
                                    label: "Number of Participants"
                                }
                            }
                        },
                        backgroundColor: {
                            fill: "transparent"
                        },
                        colors: [ "#b8cbed", "#e5edfb", "#cfddf5", "#a0b8e2", "#88a4d4" ]
                    }
                },
                numberParticipants: {
                    header: [ "graphics.number-participants", "graphics.nbr-studies" ],
                    title: "graphics.number-participants-chart-title",
                    options: {
                        backgroundColor: {
                            fill: "transparent"
                        },
                        colors: [ "#b8cbed", "#e5edfb", "#cfddf5", "#a0b8e2", "#88a4d4" ],
                        pieSliceTextStyle: {
                            color: "#000000"
                        }
                    }
                },
                biologicalSamples: {
                    header: [ "graphics.bio-samples", "graphics.nbr-studies" ],
                    title: "graphics.bio-samples-chart-title",
                    options: {
                        bars: "horizontal",
                        series: {
                            0: {
                                axis: "nbrStudies"
                            }
                        },
                        axes: {
                            x: {
                                nbrStudies: {
                                    side: "top",
                                    label: "Number of Studies"
                                }
                            }
                        },
                        backgroundColor: {
                            fill: "transparent"
                        },
                        colors: [ "#b8cbed", "#e5edfb", "#cfddf5", "#a0b8e2", "#88a4d4" ]
                    }
                }
            }
        }
    };
    factory.setOptions = function(newOptions) {
        if (typeof newOptions === "object") {
            Object.keys(newOptions).forEach(function(option) {
                if (option in factory.options) {
                    factory.options[option] = newOptions[option];
                }
            });
        }
    };
    factory.getOptions = function() {
        return angular.copy(factory.options);
    };
    return factory;
}).service("GraphicChartsUtils", [ "LocalizedValues", "TaxonomyResource", "VocabularyService", "$q", "$translate", function(LocalizedValues, TaxonomyResource, VocabularyService, $q, $translate) {
    var studyTaxonomy = {};
    studyTaxonomy.getTerms = function(aggregationName) {
        var deferred = $q.defer();
        function getTerms() {
            var terms = null;
            if (studyTaxonomy.vocabularies) {
                angular.forEach(studyTaxonomy.vocabularies, function(vocabulary) {
                    if (VocabularyService.vocabularyAlias(vocabulary) === aggregationName) {
                        terms = vocabulary.terms;
                    }
                });
            }
            deferred.resolve(terms);
        }
        if (!studyTaxonomy.vocabularies) {
            TaxonomyResource.get({
                target: "study",
                taxonomy: "Mica_study"
            }).$promise.then(function(taxonomy) {
                studyTaxonomy.vocabularies = angular.copy(taxonomy.vocabularies);
                getTerms();
            });
        } else {
            getTerms();
        }
        return deferred.promise;
    };
    this.getArrayByAggregation = function(aggregationName, entityDto) {
        var deferred = $q.defer();
        if (!aggregationName || !entityDto) {
            deferred.resolve([]);
        }
        var arrayData = [];
        studyTaxonomy.getTerms(aggregationName).then(function(terms) {
            var sortedTerms = terms;
            var i = 0;
            angular.forEach(entityDto.aggs, function(aggregation) {
                if (aggregation.aggregation === aggregationName) {
                    if (aggregation["obiba.mica.RangeAggregationResultDto.ranges"]) {
                        i = 0;
                        angular.forEach(sortedTerms, function(sortTerm) {
                            angular.forEach(aggregation["obiba.mica.RangeAggregationResultDto.ranges"], function(term) {
                                if (sortTerm.name === term.key) {
                                    if (term.count) {
                                        arrayData[i] = {
                                            title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                                            value: term.count,
                                            key: term.key
                                        };
                                        i++;
                                    }
                                }
                            });
                        });
                    } else {
                        if (aggregation.aggregation === "populations-model-selectionCriteria-countriesIso") {
                            var locale = $translate.use();
                            sortedTerms.sort(function(a, b) {
                                var textA = LocalizedValues.forLocale(a.title, locale);
                                var textB = LocalizedValues.forLocale(b.title, locale);
                                return textA < textB ? -1 : textA > textB ? 1 : 0;
                            });
                        }
                        var numberOfParticipant = 0;
                        i = 0;
                        angular.forEach(sortedTerms, function(sortTerm) {
                            angular.forEach(aggregation["obiba.mica.TermsAggregationResultDto.terms"], function(term) {
                                if (sortTerm.name === term.key) {
                                    if (term.count) {
                                        if (aggregation.aggregation === "model-methods-design") {
                                            angular.forEach(term.aggs, function(aggBucket) {
                                                if (aggBucket.aggregation === "model-numberOfParticipants-participant-number") {
                                                    var aggregateBucket = aggBucket["obiba.mica.StatsAggregationResultDto.stats"];
                                                    numberOfParticipant = LocalizedValues.formatNumber(aggregateBucket ? aggregateBucket.data.sum : 0);
                                                }
                                            });
                                            arrayData[i] = {
                                                title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                                                value: term.count,
                                                participantsNbr: numberOfParticipant,
                                                key: term.key
                                            };
                                        } else {
                                            arrayData[i] = {
                                                title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                                                value: term.count,
                                                key: term.key
                                            };
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
} ]).service("GraphicChartsQuery", [ "RqlQueryService", "RqlQueryUtils", "$translate", function(RqlQueryService, RqlQueryUtils, $translate) {
    this.queryDtoBuilder = function(entityIds, entityType) {
        var query;
        if (!entityIds || entityIds === "NaN") {
            query = "study(exists(Mica_study.id))";
        }
        if (entityType && entityIds !== "NaN") {
            query = entityType + "(in(Mica_" + entityType + ".id,(" + entityIds + ")))";
        }
        var localizedRqlQuery = angular.copy(RqlQueryService.parseQuery(query));
        RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $translate.use());
        var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
        return RqlQueryService.prepareGraphicsQuery(localizedQuery, [ "Mica_study.populations-selectionCriteria-countriesIso", "Mica_study.populations-dataCollectionEvents-bioSamples", "Mica_study.numberOfParticipants-participant-number" ], [ "Mica_study.methods-design" ]);
    };
} ]);

"use strict";

ngObibaMica.localized = angular.module("obiba.mica.localized", [ "obiba.notification", "pascalprecht.translate", "templates-ngObibaMica" ]);

"use strict";

ngObibaMica.localized.directive("localized", [ "LocalizedValues", function(LocalizedValues) {
    return {
        restrict: "AE",
        scope: {
            value: "=",
            lang: "=",
            ellipsisSize: "=",
            markdownIt: "=",
            keyLang: "@",
            keyValue: "@"
        },
        templateUrl: "localized/localized-template.html",
        link: function(scope) {
            scope.keyLang = scope.keyLang || "lang";
            scope.keyValue = scope.keyValue || "value";
            scope.LocalizedValues = LocalizedValues;
        }
    };
} ]).directive("localizedNumber", [ "LocalizedValues", function(LocalizedValues) {
    return {
        restrict: "E",
        scope: {
            number: "=value"
        },
        template: "{{::localizedNumber}}",
        controller: [ "$scope", function($scope) {
            $scope.localizedNumber = LocalizedValues.formatNumber($scope.number);
        } ]
    };
} ]).directive("localizedInput", [ function() {
    return {
        restrict: "AE",
        require: "^form",
        scope: {
            name: "@",
            model: "=",
            label: "@",
            required: "@",
            disabled: "=",
            lang: "=",
            help: "@",
            customValidator: "="
        },
        templateUrl: "localized/localized-input-template.html",
        link: function($scope, elem, attr, ctrl) {
            if (angular.isUndefined($scope.model) || $scope.model === null) {
                $scope.model = [ {
                    lang: $scope.lang,
                    value: ""
                } ];
            }
            $scope.$watch("model", function(newModel) {
                if (angular.isUndefined(newModel) || newModel === null) {
                    $scope.model = [ {
                        lang: $scope.lang,
                        value: ""
                    } ];
                }
                var currentLang = $scope.model.filter(function(e) {
                    if (e.lang === $scope.lang) {
                        return e;
                    }
                });
                if (currentLang.length === 0) {
                    $scope.model.push({
                        lang: $scope.lang,
                        value: ""
                    });
                }
            }, true);
            $scope.fieldName = $scope.name + "-" + $scope.lang;
            $scope.form = ctrl;
        }
    };
} ]).directive("localizedInputGroup", [ function() {
    return {
        restrict: "AE",
        require: "^form",
        scope: {
            name: "@",
            model: "=",
            label: "@",
            required: "@",
            disabled: "=",
            lang: "=",
            help: "@",
            remove: "=",
            customValidator: "="
        },
        templateUrl: "localized/localized-input-group-template.html",
        link: function($scope, elem, attr, ctrl) {
            if (angular.isUndefined($scope.model) || $scope.model === null) {
                $scope.model = [ {
                    lang: $scope.lang,
                    value: ""
                } ];
            }
            $scope.$watch("model", function(newModel) {
                if (angular.isUndefined(newModel) || newModel === null) {
                    $scope.model = [ {
                        lang: $scope.lang,
                        value: ""
                    } ];
                }
                var currentLang = $scope.model.filter(function(e) {
                    if (e.lang === $scope.lang) {
                        return e;
                    }
                });
                if (currentLang.length === 0) {
                    $scope.model.push({
                        lang: $scope.lang,
                        value: ""
                    });
                }
            }, true);
            $scope.fieldName = $scope.name + "-" + $scope.lang;
            $scope.form = ctrl;
        }
    };
} ]).directive("localizedTextarea", [ function() {
    return {
        restrict: "AE",
        require: "^form",
        scope: {
            name: "@",
            model: "=",
            label: "@",
            required: "@",
            disabled: "=",
            lang: "=",
            help: "@",
            rows: "@",
            customValidator: "="
        },
        templateUrl: "localized/localized-textarea-template.html",
        link: function($scope, elem, attr, ctrl) {
            if (angular.isUndefined($scope.model) || $scope.model === null) {
                $scope.model = [ {
                    lang: $scope.lang,
                    value: ""
                } ];
            }
            $scope.$watch("model", function(newModel) {
                if (angular.isUndefined(newModel) || newModel === null) {
                    $scope.model = [ {
                        lang: $scope.lang,
                        value: ""
                    } ];
                }
                var currentLang = $scope.model.filter(function(e) {
                    if (e.lang === $scope.lang) {
                        return e;
                    }
                });
                if (currentLang.length === 0) {
                    $scope.model.push({
                        lang: $scope.lang,
                        value: ""
                    });
                }
            }, true);
            $scope.fieldName = $scope.name + "-" + $scope.lang;
            $scope.form = ctrl;
        }
    };
} ]);

"use strict";

ngObibaMica.localized.service("LocalizedValues", [ "$translate", function($translate) {
    var self = this;
    this.for = function(values, lang, keyLang, keyValue) {
        if (angular.isArray(values)) {
            var result = values.filter(function(item) {
                return item[keyLang] === lang;
            });
            if (result && result.length > 0) {
                return result[0][keyValue];
            } else {
                var langs = values.map(function(value) {
                    return value[keyLang];
                });
                if (langs.length > 0) {
                    return self.for(values, langs.length === 1 ? langs[0] : "en", keyLang, keyValue);
                }
            }
        } else if (angular.isObject(values)) {
            return self.for(Object.keys(values).map(function(k) {
                return {
                    lang: k,
                    value: values[k]
                };
            }), lang, keyLang, keyValue);
        }
        return values || "";
    };
    this.forLocale = function(values, lang) {
        var rval = this.for(values, lang, "locale", "text");
        if (!rval || rval === "") {
            rval = this.for(values, "und", "locale", "text");
        }
        if (!rval || rval === "") {
            rval = this.for(values, "en", "locale", "text");
        }
        return rval;
    };
    this.forLang = function(values, lang) {
        var rval = this.for(values, lang, "lang", "value");
        if (!rval || rval === "") {
            rval = this.for(values, "und", "lang", "value");
        }
        if (!rval || rval === "") {
            rval = this.for(values, "en", "lang", "value");
        }
        return rval;
    };
    this.formatNumber = function(val) {
        return typeof val === "undefined" || val === null || typeof val !== "number" ? val : val.toLocaleString($translate.use());
    };
    this.arrayToObject = function(values) {
        var rval = {};
        if (values) {
            values.forEach(function(entry) {
                rval[entry.lang] = entry.value;
            });
        }
        return rval;
    };
    this.objectToArray = function(values, languages) {
        var rval = [];
        if (values) {
            var locales = languages ? languages : Object.keys(values);
            if (locales) {
                locales.forEach(function(lang) {
                    rval.push({
                        lang: lang,
                        value: values[lang]
                    });
                });
            }
        }
        return rval.length === 0 ? undefined : rval;
    };
} ]).service("LocalizedSchemaFormService", [ "$filter", function($filter) {
    this.translate = function(value) {
        if (!value) {
            return value;
        }
        if (typeof value === "string") {
            return this.translateString(value);
        } else if (typeof value === "object") {
            if (Array.isArray(value)) {
                return this.translateArray(value);
            } else {
                return this.translateObject(value);
            }
        }
        return value;
    };
    this.translateObject = function(object) {
        if (!object) {
            return object;
        }
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (typeof object[prop] === "string") {
                    object[prop] = this.translateString(object[prop]);
                } else if (typeof object[prop] === "object") {
                    if (Array.isArray(object[prop])) {
                        object[prop] = this.translateArray(object[prop]);
                    } else {
                        object[prop] = this.translateObject(object[prop]);
                    }
                }
            }
        }
        return object;
    };
    this.translateArray = function(array) {
        if (!array) {
            return array;
        }
        var that = this;
        array.map(function(item) {
            return that.translate(item);
        });
        return array;
    };
    this.translateString = function(string) {
        if (!string) {
            return string;
        }
        return string.replace(/t\(([^\)]+)\)/g, function(match, p1) {
            return $filter("translate")(p1);
        });
    };
} ]);

"use strict";

ngObibaMica.localized.filter("localizedNumber", [ "LocalizedValues", function(LocalizedValues) {
    return function(value) {
        return value === 0 ? 0 : value ? LocalizedValues.formatNumber(value) : "";
    };
} ]).filter("localizedString", [ "$translate", "LocalizedValues", function($translate, LocalizedValues) {
    return function(input) {
        return LocalizedValues.forLocale(input, $translate.use());
    };
} ]);

"use strict";

function NgObibaMicaFileBrowserOptionsProvider() {
    var options = {
        locale: "en",
        downloadInline: true,
        downloadKey: false,
        folders: {
            excludes: [ "population" ]
        },
        documentsTitle: "file.documents"
    };
    this.addExcludeFolder = function(folder) {
        if (folder) {
            options.folders.excludes.push(folder);
        }
    };
    this.setOptions = function(newOptions) {
        if (typeof newOptions === "object") {
            Object.keys(newOptions).forEach(function(option) {
                if (option in options) {
                    options[option] = newOptions[option];
                }
            });
        }
    };
    this.$get = function() {
        return options;
    };
}

ngObibaMica.fileBrowser = angular.module("obiba.mica.fileBrowser", [ "pascalprecht.translate", "ui.bootstrap", "templates-ngObibaMica" ]).config([ "$provide", function($provide) {
    $provide.provider("ngObibaMicaFileBrowserOptions", new NgObibaMicaFileBrowserOptionsProvider());
} ]);

"use strict";

ngObibaMica.fileBrowser.directive("fileBrowser", [ function() {
    return {
        restrict: "EA",
        replace: true,
        controller: "FileBrowserController",
        scope: {
            docPath: "@",
            docId: "@",
            tokenKey: "@",
            subject: "=",
            refresh: "=",
            showTitle: "@"
        },
        templateUrl: "file-browser/views/file-browser-template.html",
        link: function(scope, elem) {
            scope.selfNode = elem[0];
        }
    };
} ]);

"use strict";

ngObibaMica.fileBrowser.controller("FileBrowserController", [ "$rootScope", "$scope", "$log", "$filter", "StringUtils", "FileBrowserService", "BrowserBreadcrumbHelper", "AlertService", "ServerErrorUtils", "FileBrowserFileResource", "FileBrowserSearchResource", "ngObibaMicaFileBrowserOptions", "FileBrowserDownloadService", "CustomWatchDomElementService", function($rootScope, $scope, $log, $filter, StringUtils, FileBrowserService, BrowserBreadcrumbHelper, AlertService, ServerErrorUtils, FileBrowserFileResource, FileBrowserSearchResource, ngObibaMicaFileBrowserOptions, FileBrowserDownloadService, CustomWatchDomElementService) {
    var navigateToPath = function(path, keyToken) {
        clearSearchInternal();
        getDocument(path, keyToken);
    };
    var navigateTo = function(event, document, keyToken) {
        event.stopPropagation();
        if (document) {
            navigateToPath(document.path, keyToken);
        }
    };
    var onError = function(response) {
        AlertService.alert({
            id: "FileSystemController",
            type: "danger",
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
            fileParam = {
                path: path,
                keyToken: keyToken
            };
        } else {
            fileParam = {
                path: path
            };
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
                    $scope.data.document.children = $scope.data.document.children.filter(function(child) {
                        return ngObibaMicaFileBrowserOptions.folders.excludes.indexOf(child.name) < 0;
                    });
                    $scope.data.document.size = $scope.data.document.children.length;
                }
                $scope.data.breadcrumbs = BrowserBreadcrumbHelper.toArray(path, $scope.data.rootPath);
                $scope.data.isFile = FileBrowserService.isFile(response);
                $scope.data.isRoot = FileBrowserService.isRoot(response);
                $scope.noDocument = false;
                if (response.type === "FOLDER" && response.size < 1) {
                    $scope.noDocument = true;
                }
            } else {
                $scope.noDocument = true;
            }
        }, onError);
    }
    function navigateToParent(event, document, keyToken) {
        event.stopPropagation();
        var path = document.path;
        if (path.lastIndexOf("/") === 0) {
            path = "/";
        } else {
            path = path.substring(0, path.lastIndexOf("/"));
        }
        navigateToPath(path, keyToken);
    }
    function navigateBack() {
        if (!$scope.data.isRoot && $scope.data.document) {
            var parentPath = $scope.data.document.path.replace(/\\/g, "/").replace(/\/[^\/]*$/, "");
            getDocument(parentPath ? parentPath : "/");
        }
    }
    function hideDetails() {
        $scope.pagination.selected = -1;
        $scope.data.details.show = false;
    }
    function searchDocumentsInternal(path, searchParams) {
        function excludeFolders(query) {
            var excludeQuery = "";
            try {
                var excludes = [];
                ngObibaMicaFileBrowserOptions.folders.excludes.forEach(function(exclude) {
                    var q = path.replace(/\//g, "\\/") + "\\/" + exclude.replace(/\s/, "\\ ");
                    excludes.push(q);
                    excludes.push(q + "\\/*");
                });
                excludeQuery = excludes.length > 0 ? "NOT path:(" + excludes.join(" OR ") + ")" : "";
            } catch (error) {}
            return query ? query + " AND " + excludeQuery : excludeQuery;
        }
        searchParams.query = excludeFolders(searchParams.query);
        var urlParams = angular.extend({}, {
            path: path
        }, searchParams);
        FileBrowserSearchResource.search(urlParams, function onSuccess(response) {
            var clone = $scope.data.document ? angular.copy($scope.data.document) : {};
            clone.children = response;
            $scope.data.document = clone;
        }, function onError(response) {
            $log.debug("ERROR:", response);
        });
    }
    var searchDocuments = function(query) {
        $scope.data.search.active = true;
        hideDetails();
        var recursively = $scope.data.search.recursively;
        var orderBy = null;
        var sortBy = null;
        var limit = 999;
        $scope.data.search.query = query;
        switch (query) {
          case "RECENT":
            query = "";
            orderBy = "desc";
            sortBy = "lastModifiedDate";
            limit = 10;
            break;
        }
        var searchParams = {
            query: query,
            recursively: recursively,
            sort: sortBy,
            order: orderBy,
            limit: limit
        };
        searchDocumentsInternal($scope.data.document.path, searchParams);
    };
    var toggleRecursively = function() {
        $scope.data.search.recursively = !$scope.data.search.recursively;
        if ($scope.data.search.text) {
            searchDocuments($scope.data.search.text);
        } else if ($scope.data.search.query) {
            searchDocuments($scope.data.search.query);
        }
    };
    var clearSearch = function() {
        clearSearchInternal();
        getDocument($scope.data.document.path);
    };
    var searchKeyUp = function(event) {
        switch (event.keyCode) {
          case 13:
            if ($scope.data.search.text) {
                searchDocuments($scope.data.search.text);
            } else {
                clearSearch();
            }
            break;

          case 27:
            if ($scope.data.search.active) {
                clearSearch();
            }
            break;
        }
    };
    var showDetails = function(document, index) {
        $scope.pagination.selected = index;
        $scope.data.details.document = document;
        $scope.data.details.show = true;
    };
    var getTypeParts = function(document) {
        return FileBrowserService.isFile(document) && document.attachment.type ? document.attachment.type.split(/,|\s+/) : [];
    };
    var getLocalizedValue = function(values) {
        return FileBrowserService.getLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
    };
    var hasLocalizedValue = function(values) {
        return FileBrowserService.hasLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
    };
    var refresh = function(docPath, docId) {
        if (docPath && docId) {
            $scope.docPath = docPath;
            $scope.docId = docId;
        }
        if ($scope.docPath && $scope.docPath !== "/" && $scope.docId) {
            $scope.data.docRootIcon = BrowserBreadcrumbHelper.rootIcon($scope.docPath);
            $scope.data.rootPath = $scope.docPath + ($scope.docId !== "null" ? "/" + $scope.docId : "");
            if ($scope.tokenKey) {
                getDocument($scope.data.rootPath, $scope.tokenKey, null);
            } else {
                getDocument($scope.data.rootPath, null);
            }
        }
    };
    $scope.downloadTarget = ngObibaMicaFileBrowserOptions.downloadInline ? "_blank" : "_self";
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
    $scope.$watchGroup([ "docPath", "docId" ], function() {
        refresh();
    });
    $scope.__defineSetter__("selfNode", function(selfNode) {
        if (selfNode) {
            CustomWatchDomElementService.configWatch(selfNode, [ "refresh", "show-title" ]).customWatch(function() {
                if (selfNode.attributes[4].value === "true") {
                    refresh(selfNode.attributes[1].value, selfNode.attributes[2].value);
                    $scope.showTitle = selfNode.attributes[6].value;
                }
            });
        }
    });
} ]);

"use strict";

ngObibaMica.fileBrowser.factory("FileBrowserFileResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    var url = ngObibaMicaUrl.getUrl("FileBrowserFileResource");
    return $resource(url, {
        path: "@path",
        keyToken: "@keyToken"
    }, {
        get: {
            method: "GET",
            errorHandler: true
        }
    });
} ]).factory("FileBrowserSearchResource", [ "$resource", "ngObibaMicaUrl", function($resource, ngObibaMicaUrl) {
    return $resource(ngObibaMicaUrl.getUrl("FileBrowserSearchResource"), {
        path: "@path"
    }, {
        search: {
            method: "GET",
            isArray: true,
            errorHandler: true
        }
    });
} ]).service("FileBrowserDownloadService", [ "ngObibaMicaUrl", "ngObibaMicaFileBrowserOptions", function(ngObibaMicaUrl, ngObibaMicaFileBrowserOptions) {
    this.getUrl = function(path, keyToken) {
        var url = ngObibaMicaUrl.getUrl("FileBrowserDownloadUrl").replace(/:path/, path).replace(/:inline/, ngObibaMicaFileBrowserOptions.downloadInline);
        if (keyToken) {
            url = url.replace(/:key/, keyToken);
        } else {
            url = url.replace(/:key/, "");
        }
        return url;
    };
    return this;
} ]).service("FileBrowserService", [ function() {
    this.isFile = function(document) {
        return document && document.type === "FILE";
    };
    this.isRoot = function(document) {
        return document && document.path === "/";
    };
    this.getLocalizedValue = function(values, lang) {
        if (!values) {
            return null;
        }
        var result = values.filter(function(value) {
            return value.lang === lang;
        });
        return result && result.length > 0 ? result[0].value : null;
    };
    this.hasLocalizedValue = function(values, lang) {
        var value = this.getLocalizedValue(values, lang);
        return value !== null && value.trim().length > 0;
    };
    this.getDocumentIcon = function(document) {
        if (!document) {
            return "";
        }
        if (document.type === "FOLDER") {
            return "fa-folder";
        }
        var ext = document.path.match(/\.(\w+)$/);
        if (ext && ext.length > 1) {
            switch (ext[1].toLowerCase()) {
              case "doc":
              case "docx":
              case "odm":
              case "gdoc":
                return "fa-file-word-o";

              case "xls":
              case "xlsx":
                return "fa-file-excel-o";

              case "pdf":
                return "fa-file-pdf-o";

              case "ppt":
              case "odt":
                return "fa-file-powerpoint-o";

              case "xt":
                return "fa-file-text-o";
            }
        }
        return "fa-file";
    };
} ]).service("BrowserBreadcrumbHelper", [ function() {
    this.toArray = function(path, exclude) {
        if (path) {
            path = path.replace(exclude, "");
            var a = path.replace(/\/$/, "").split("/").slice(1);
            var parts = [];
            var prev = null;
            a.forEach(function(part) {
                prev = (prev === null ? exclude : prev) + "/" + part;
                parts.push({
                    name: part,
                    path: prev
                });
            });
            return parts;
        }
        return [ {
            name: "",
            path: ""
        } ];
    };
    this.rootIcon = function(docPath) {
        var matched = /^\/([^\/]*)/.exec(docPath);
        switch (matched ? matched[1] : "") {
          case "study":
            return "i-obiba-study";

          case "network":
            return "i-obiba-network";

          case "study-dataset":
            return "i-obiba-study-dataset";

          case "harmonization-dataset":
            return "i-obiba-harmo-dataset";

          default:
            return "fa fa-hdd-o";
        }
    };
} ]);