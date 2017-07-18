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
        return groupByOptions.study || groupByOptions.harmonizationStudy || groupByOptions.dce;
      };

      this.canShowIndividualStudy = function (bucket) {
        return bucket.indexOf('individual') > -1 && groupByOptions.study;
      };

      this.canShowHarmonizationStudy = function (bucket) {
        return bucket.indexOf('harmonization') > -1 && groupByOptions.harmonizationStudy;
      };

      this.canShowDce = function(bucket) {
        return (bucket.startsWith('study') || bucket.startsWith('dce')) && groupByOptions.study && groupByOptions.dce;
      };

      this.canShowDataset = function() {
        return groupByOptions.dataset || groupByOptions.dataschema;
      };

      this.canShowVariableTypeFilter = function(bucket) {
        var forStudy = bucket.indexOf('study') > -1 && (groupByOptions.study && groupByOptions.harmonizationStudy);
        var forDataset = bucket.indexOf('dataset') > -1 && groupByOptions.dataset && groupByOptions.dataschema;

        return (bucket !== BUCKET_TYPES.NETWORK) && (forStudy || forDataset);
      };

      this.collectionCoverageTitle = function(bucket) {
        return 'search.coverage-buckets.' + (bucket.startsWith('study') ? 'collection' : 'dataset-collected');
      };

      this.harmonizationCoverageTitle = function(bucket) {
        return 'search.coverage-buckets.' + (bucket.startsWith('study') ? 'harmonization' : 'dataset-harmonized');
      };

      this.studyTitle = function() {
        if (groupByOptions.study) {
          return 'search.coverage-buckets.study';
        } else if (groupByOptions.harmonizationStudy) {
          return 'search.coverage-buckets.study-harmonization';
        } else if (groupByOptions.dce) {
          return 'search.coverage-buckets.dce';
        }

        return '';
      };

      this.studyBucket = function() { // assuming can showStudy is true
        if (groupByOptions.study && groupByOptions.harmonizationStudy) {
          return BUCKET_TYPES.STUDY;
        } else if (groupByOptions.study && !groupByOptions.harmonizationStudy) {
          return BUCKET_TYPES.STUDY_INDIVIDUAL;
        } else {
          return BUCKET_TYPES.STUDY_HARMONIZATION;
        }
      };

      this.dceBucket = function () { // assuming can showStudy is true
        if (groupByOptions.study && groupByOptions.harmonizationStudy && groupByOptions.dce) {
          return BUCKET_TYPES.DCE;
        } else if (groupByOptions.study && !groupByOptions.harmonizationStudy && groupByOptions.dce) {
          return BUCKET_TYPES.DCE_INDIVIDUAL;
        } else if (!groupByOptions.study && groupByOptions.harmonizationStudy && groupByOptions.dce) {
          return BUCKET_TYPES.DCE_HARMONIZATION;
        } else { // if dce option is false go to study
          return this.studyBucket();
        }
      };

      this.datasetTitle = function() {
        return groupByOptions.dataset && groupByOptions.dataschema ?
          'search.coverage-buckets.datasetNav' :
          (groupByOptions.dataset ?
            'search.coverage-buckets.dataset' :
            (groupByOptions.dataschema ? 'search.coverage-buckets.dataschema' : ''));
      };

      this.datasetBucket = function() {
        if (groupByOptions.dataset && groupByOptions.dataschema) {
          return BUCKET_TYPES.DATASET;
        } else if (groupByOptions.dataset && !groupByOptions.dataschema) {
          return BUCKET_TYPES.DATASET_COLLECTED;
        } else {
          return BUCKET_TYPES.DATASET_HARMONIZED;
        }
      };

      this.canGroupBy = function(bucket) {
        var isAllowed = false;

        switch (bucket) {
          case BUCKET_TYPES.STUDY:
          case BUCKET_TYPES.STUDY_INDIVIDUAL:
            isAllowed = groupByOptions.study;
            break;
          case BUCKET_TYPES.STUDY_HARMONIZATION:
            isAllowed = groupByOptions.harmonizationStudy;
            break;
          case BUCKET_TYPES.DCE:
          case BUCKET_TYPES.DCE_INDIVIDUAL:
            isAllowed = groupByOptions.dce;
            break;
          case BUCKET_TYPES.DATASET:
          case BUCKET_TYPES.DATASET_COLLECTED:
            isAllowed = groupByOptions.dataset;
            break;
          case BUCKET_TYPES.DATASCHEMA:
          case BUCKET_TYPES.DATASET_HARMONIZED:
            isAllowed = groupByOptions.dataschema;
        }
        return isAllowed;
      };

      this.defaultBucket = function() {
        if (groupByOptions.study || groupByOptions.harmonizationStudy) {
          return self.studyBucket();
        } else if (groupByOptions.study && groupByOptions.dce) {
          return self.dceBucket();
        } else if (groupByOptions.dataset || groupByOptions.dataschema) {
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

