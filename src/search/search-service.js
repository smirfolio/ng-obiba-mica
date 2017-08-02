/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global BUCKET_TYPES */
/* global RQL_NODE */

/* exported STUDY_FILTER_CHOICES */
var STUDY_FILTER_CHOICES = {
  ALL_STUDIES: 'all',
  INDIVIDUAL_STUDIES: 'individual',
  HARMONIZATION_STUDIES: 'harmonization'
};

/**
 * Module services and factories
 */
angular.module('obiba.mica.search')
  .factory('TaxonomiesSearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomiesSearchResource'), {}, {
        'get': {
          method: 'GET',
          isArray: true,
          errorHandler: true
        }
      });
    }])

  .factory('TaxonomiesResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomiesResource'), {}, {
        'get': {
          method: 'GET',
          isArray: true,
          errorHandler: true
        }
      });
    }])

  .factory('TaxonomyResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
    function ($resource, ngObibaMicaUrl, $cacheFactory) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomyResource'), {}, {
        'get': {
          method: 'GET',
          errorHandler: true,
          cache: $cacheFactory('taxonomyResource')
        }
      });
    }])

  .factory('JoinQuerySearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('JoinQuerySearchResource'), {}, {
        'variables': {
          method: 'GET',
          errorHandler: true,
          params: {type: 'variables'}
        },
        'studies': {
          method: 'GET',
          errorHandler: true,
          params: {type: 'studies'}
        },
        'networks': {
          method: 'GET',
          errorHandler: true,
          params: {type: 'networks'}
        },
        'datasets': {
          method: 'GET',
          errorHandler: true,
          params: {type: 'datasets'}
        }
      });
    }])

  .factory('JoinQueryCoverageResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('JoinQueryCoverageResource'), {}, {
        'get': {
          method: 'GET',
          errorHandler: true
        }
      });
    }])

  .factory('VocabularyResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('VocabularyResource'), {}, {
        'get': {
          method: 'GET',
          errorHandler: true
        }
      });
    }])

  .service('StudyFilterShortcutService', ['$q', '$location', '$translate', 'RqlQueryService',
    function ($q, $location, $translate, RqlQueryService) {
      this.filter = function (choice, lang) {
        var parsedQuery = RqlQueryService.parseQuery($location.search().query);

        RqlQueryService.createCriteria(RqlQueryService.parseQuery($location.search().query), lang).then(function (criteria) {
          var study;
          var foundCriteriaItem = RqlQueryService.findCriteriaItemFromTreeById('study', 'Mica_study.className', criteria.root);

          if (!foundCriteriaItem) {
            study = new RqlQuery('study');
            parsedQuery.args.push(study);
          } else {
            study = parsedQuery.args.filter(function (arg) {
              return arg.name === 'study';
            })[0];
            study.args = [];
          }

          var studyClassName = new RqlQuery('in');
          studyClassName.args.push('Mica_study.className');

          switch (choice) {
            case STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES:
              studyClassName.args.push('Study');
              break;
            case STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES:
              studyClassName.args.push('HarmonizationStudy');
              break;
            case STUDY_FILTER_CHOICES.ALL_STUDIES:
              studyClassName.args.push(['Study', 'HarmonizationStudy']);
              break;
          }

          if (study.args.length > 0 && study.args[0].name !== 'limit') {
            var andStudyClassName = new RqlQuery('and');
            andStudyClassName.args.push(studyClassName);
            andStudyClassName.args.push(study.args[0]);
            study.args[0] = andStudyClassName;
          } else {
            study.args.push(studyClassName);
          }

          $location.search('query', parsedQuery.serializeArgs(parsedQuery.args));
        });
      };

      this.getStudyClassNameChoices = function () {
        return RqlQueryService.createCriteria(RqlQueryService.parseQuery($location.search().query), $translate.use()).then(function (criteria) {
          var foundCriteriaItem = RqlQueryService.findCriteriaItemFromTreeById('study', 'Mica_study.className', criteria.root);

          return {
            choseAll: function () {
              return !foundCriteriaItem || foundCriteriaItem.type === RQL_NODE.EXISTS || (foundCriteriaItem.selectedTerms.indexOf('Study') > -1 && foundCriteriaItem.selectedTerms.indexOf('HarmonizationStudy') > -1);
            },
            choseIndividual: function () {
              return !foundCriteriaItem || foundCriteriaItem.selectedTerms.indexOf('Study') > -1;
            },
            choseHarmonization: function () {
              return !foundCriteriaItem || foundCriteriaItem.selectedTerms.indexOf('HarmonizationStudy') > -1;
            }
          };
        });
      };
    }
  ])

  .service('SearchContext', function() {
    var selectedLocale = null;

    this.setLocale = function(locale) {
      selectedLocale = locale;
    };

    this.currentLocale = function() {
      return selectedLocale;
    };
  })

  .service('PageUrlService', ['ngObibaMicaUrl', 'StringUtils', 'urlEncode', function(ngObibaMicaUrl, StringUtils, urlEncode) {

    this.studyPage = function(id, type) {
      var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPage'), {':type': urlEncode(sType), ':study': urlEncode(id)}) : '';
    };

    this.studyPopulationPage = function(id, type, populationId) {
      var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPopulationsPage'), {':type': urlEncode(sType), ':study': urlEncode(id), ':population': urlEncode(populationId)}) : '';
    };

    this.networkPage = function(id) {
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('NetworkPage'), {':network': urlEncode(id)}) : '';
    };

    this.datasetPage = function(id, type) {
      var dsType = (type.toLowerCase() === 'collected' ? 'collected' : 'harmonized') + '-dataset';
      var result = id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('DatasetPage'), {':type': urlEncode(dsType), ':dataset': urlEncode(id)}) : '';
      return result;
    };

    this.variablePage = function(id) {
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('VariablePage'), {':variable': urlEncode(id)}) : '';
    };

    this.downloadCoverage = function(query) {
      return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQueryCoverageDownloadResource'), {':query': query});
    };

    return this;
  }])

  .service('ObibaSearchConfig', function () {
    var options = {
      networks: {
        showSearchTab:1
      },
      studies: {
        showSearchTab:1
      },
      datasets: {
        showSearchTab:1
      },
      variables: {
        showSearchTab:1
      }
    };

    this.setOptions = function (newOptions) {
      if (typeof(newOptions) === 'object') {
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

  .service('CoverageGroupByService', ['ngObibaMicaSearch', function(ngObibaMicaSearch) {
    var self = this;

    var groupByOptions = ngObibaMicaSearch.getOptions().coverage.groupBy;
    this.canShowStudy = function() {
      return groupByOptions.study || groupByOptions.dce;
    };

    this.canShowDce = function(bucket) {
      return (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && groupByOptions.study && groupByOptions.dce;
    };

    this.canShowDataset = function() {
      return groupByOptions.dataset;
    };

    this.canShowVariableTypeFilter = function(bucket) {
      var forStudy = (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && (groupByOptions.study);
      var forDataset = bucket.indexOf('dataset') > -1 && groupByOptions.dataset;

      return forStudy || forDataset;
    };

    this.studyTitle = function() {
      return 'search.coverage-buckets.study';
    };

    this.studyBucket = function() {
      return BUCKET_TYPES.STUDY;
    };

    this.dceBucket = function () {
      if (groupByOptions.study && groupByOptions.dce) {
        return BUCKET_TYPES.DCE;
      } else {
        return this.studyBucket();
      }
    };

    this.datasetTitle = function() {
      return 'search.coverage-buckets.dataset';
    };

    this.datasetBucket = function() {
      return BUCKET_TYPES.DATASET;
    };

    this.canGroupBy = function(bucket) {
      var isAllowed = false;

      switch (bucket) {
        case BUCKET_TYPES.STUDY:
        case BUCKET_TYPES.STUDY_INDIVIDUAL:
        case BUCKET_TYPES.STUDY_HARMONIZATION:
          isAllowed = groupByOptions.study;
          break;
        case BUCKET_TYPES.DCE:
        case BUCKET_TYPES.DCE_INDIVIDUAL:
        case BUCKET_TYPES.DCE_HARMONIZATION:
          isAllowed = groupByOptions.dce;
          break;
        case BUCKET_TYPES.DATASET:
        case BUCKET_TYPES.DATASET_COLLECTED:
        case BUCKET_TYPES.DATASCHEMA:
        case BUCKET_TYPES.DATASET_HARMONIZED:
          isAllowed = groupByOptions.dataset;
      }
      return isAllowed;
    };

    this.defaultBucket = function() {
      if (groupByOptions.study) {
        return self.studyBucket();
      } else if (groupByOptions.dataset) {
        return self.datasetBucket();
      }

      return '';
    };

  }])

  .service('TaxonomyUtils', [ function() {

    function visibleVocabulary(vocabulary) {
      if (!vocabulary) {
        return false;
      }

      var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function(a) {
        return a.key === 'hidden';
      }).pop() : null;

      return !hidden || hidden.value === 'false';
    }

    function visibleVocabularies(vocabularies) {
      return (vocabularies || []).filter(visibleVocabulary);
    }

    this.visibleVocabulary = visibleVocabulary;
    this.visibleVocabularies = visibleVocabularies;

    return this;
  }])

  .factory('CriteriaNodeCompileService', ['$templateCache', '$compile', function($templateCache, $compile){

    return {
      compile: function(scope, element) {
        var template = '';
        if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
          template = angular.element($templateCache.get('search/views/criteria/criteria-node-template.html'));
        } else {
          template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
        }

        $compile(template)(scope, function(cloned){
          element.replaceWith(cloned);
        });
      }
    };

  }]);

