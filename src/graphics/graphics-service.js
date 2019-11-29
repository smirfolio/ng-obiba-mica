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
      var requestTransformer = function(obj) {
        var str = [];
        for(var p in obj) {
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
          params: {type: 'studies'},
          transformRequest : requestTransformer
        }
      });
    }])
  .service('GraphicChartsConfig', function () {
    var factory = {
      options: {
        entityIds: 'NaN',
        entityType: null,
        ChartsOptions: {
          geoChart: {
            type: 'geoChart',
            aggregationName: 'populations-model-selectionCriteria-countriesIso',
            optionsName: 'geoChart',
            header : ['graphics.country', 'graphics.nbr-studies'],
            title : 'graphics.geo-chart-title',
            subtitle : 'graphics.geo-chart-subtitle',
            active: true,
            ordered:true,
            notOrdered: false,
            sortedby:['title', 'value'],
            options: {
              backgroundColor: {fill: 'transparent'},
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
            type: 'BarChart',
            header: ['graphics.study-design', 'graphics.nbr-studies', 'graphics.number-participants', 'graphics.percentage.studies'],
            title : 'graphics.study-design-chart-title',
            aggregationName: 'model-methods-design',
            optionsName: 'studiesDesigns',
            active: true,
            ordered:true,
            notOrdered: false,
            sortedby:[],
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' }, // Bind series 1 to an axis
                1: { axis: 'nbrParticipants' } // Bind series 0 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'}, // Top x-axis.
                  nbrParticipants: {label: 'Number of Participants'} // Bottom x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          },
          numberParticipants: {
            type: 'PieChart',
            header: ['graphics.number-participants', 'graphics.nbr-studies', 'graphics.percentage.studies'],
            title: 'graphics.number-participants-chart-title',
            aggregationName: 'model-numberOfParticipants-participant-number-range',
            optionsName: 'numberParticipants',
            active: true,
            ordered:false,
            notOrdered: true,
            sortedby: [],
            options: {
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4'],
              pieSliceTextStyle: {color: '#000000'}
            }
          },
          biologicalSamples: {
            type: 'BarChart',
            header : ['graphics.bio-samples', 'graphics.nbr-studies'],
            title : 'graphics.bio-samples-chart-title',
            aggregationName: 'populations-dataCollectionEvents-model-bioSamples',
            optionsName: 'biologicalSamples',
            active: true,
            ordered:true,
            notOrdered: false,
            sortedby: [],
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' } // Bind series 1 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'} // Top x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          },
          startYear: {
            type: 'BarChart',
            header : ['graphics.study-start-year', 'graphics.nbr-studies', 'graphics.number-participants', 'graphics.percentage.studies'],
            title : 'graphics.study-start-year-chart-title',
            aggregationName: 'model-startYear-range',
            optionsName: 'startYear',
            active: true,
            ordered:false,
            notOrdered: true,
            sortedby: [],
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' } // Bind series 1 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'} // Top x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
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
      if (typeof(newOptions) === 'object') {
        Object.keys(newOptions).forEach(function (option) {
          if (option in factory.options) {
            if(option !== 'ChartsOptions'){
              factory.options[option] = newOptions[option];
            }
            else{
              Object.keys(newOptions.ChartsOptions).forEach(function(chartObject){
                factory.options.ChartsOptions[chartObject].options.colors = newOptions.ChartsOptions[chartObject].options.colors;
              });
            }
          }
        });
      }
    };

    factory.getOptions = function () {
      return angular.copy(factory.options);
    };
    return factory;

  })
  .service('GraphicChartsUtils',
    [
      'LocalizedValues',
      'TaxonomyResource',
      'VocabularyService',
      '$q',
      '$translate',
      '$filter',
      'D3GeoConfig',
      'D3ChartConfig',
    'MathFunction',
    function (LocalizedValues, TaxonomyResource, VocabularyService, $q, $translate, $filter, D3GeoConfig, D3ChartConfig, MathFunction) {
      var studyTaxonomy = {};

      studyTaxonomy.getTerms = function (aggregationName) {
        var deferred = $q.defer();

        function getTerms() {
          var terms = null;
          if (studyTaxonomy.vocabularies){
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
          }).$promise.then(function(taxonomy){
            studyTaxonomy.vocabularies = angular.copy(taxonomy.vocabularies);
            getTerms();
          });

        } else {
          getTerms();
        }

        return deferred.promise;
      };

      var participantBucket = function(term, sortTerm, entityDto){
        var numberOfParticipant = 0;
        var arrayData;
        angular.forEach(term.aggs, function (aggBucket) {
          if (aggBucket.aggregation === 'model-numberOfParticipants-participant-number') {
            var aggregateBucket = aggBucket['obiba.mica.StatsAggregationResultDto.stats'];
            numberOfParticipant = aggregateBucket ? aggregateBucket.data.sum : 0;
          }
        });
        arrayData = {
          title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
          value: term.count,
          participantsNbr: numberOfParticipant,
          key: term.key,
          perc: MathFunction.round((100* term.count)/entityDto.totalHits, 2)
        };
        return arrayData;
      };
      var getArrayByAggregation = function (aggregationName, entityDto, terms) {
        if(entityDto){
        if (!aggregationName || !entityDto) {
          return [];
        }

        var arrayData = [];
          var sortedTerms = terms;
          var i = 0;

          angular.forEach(entityDto.aggs, function (aggregation) {
            if (aggregation.aggregation === aggregationName) {
              if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.RangeAggregationResultDto.ranges'], function (term) {
                      angular.forEach(entityDto.aggs, function (aggregation) {
                        if (aggregation.aggregation === aggregationName) {
                          if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
                            if (sortTerm.name === term.key) {
                              if (term.count) {
                                if (aggregation.aggregation === 'model-startYear-range') {
                                    arrayData[i] = participantBucket(term, sortTerm, entityDto, arrayData);
                                  } else {
                                    arrayData[i] = {
                                      title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                                      value: term.count,
                                      key: term.key, perc: MathFunction.round((100* term.count)/entityDto.totalHits, 2)
                                    };
                                  }
                                i++;
                              }
                            }
                          }
                        }
                      });
                  });
                });
              }
              else {
                // MK-924 sort countries by title in the display language
                if (aggregation.aggregation === 'populations-model-selectionCriteria-countriesIso') {
                  var locale = $translate.use();
                  sortedTerms.sort(function(a, b) {
                    var textA = LocalizedValues.forLocale(a.title, locale);
                    var textB = LocalizedValues.forLocale(b.title, locale);
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  });
                }
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                    if (sortTerm.name === term.key) {
                      if (term.count) {
                        if (aggregation.aggregation === 'model-methods-design') {
                          arrayData[i] = participantBucket(term, sortTerm, entityDto);
                        }
                        else {
                          arrayData[i] = {title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key};
                        }
                        i++;
                      }
                    }
                  });
                });
              }
            }
          });
        return arrayData;
        }
      };
      this.getGraphConfig = function(){
        return {
          'populations-model-selectionCriteria-countriesIso': {
            chartType: 'geoChart',
            headerTitle: $filter('translate')('graphics.geo-charts'),
            chartAggregationName: 'populations-model-selectionCriteria-countriesIso',
          },
          'model-methods-design': {
            chartType: 'studiesDesigns',
            headerTitle: $filter('translate')('graphics.study-design'),
            chartAggregationName: 'model-methods-design',
          },
          'model-numberOfParticipants-participant-number-range': {
            chartType: 'numberParticipants',
            headerTitle: $filter('translate')('graphics.number-participants'),
            chartAggregationName: 'model-numberOfParticipants-participant-number-range',
          },
          'populations-dataCollectionEvents-model-bioSamples': {
            chartType: 'biologicalSamples',
            headerTitle: $filter('translate')('graphics.bio-samples'),
            chartAggregationName: 'populations-dataCollectionEvents-model-bioSamples',
          },
          'model-startYear-range': {
            chartType: 'startYear',
            headerTitle: $filter('translate')('graphics.study-start-year'),
            chartAggregationName: 'model-startYear-range',
          }
        };
      };
      this.initializeChartData = function (StudiesData, graphOptions, chartAggregationName, chartConfig, directiveType) {
        var returnedScope = {
          chartObject: {
            options: {}
          }
        };
        if(StudiesData){
          var deferred = $q.defer();
          if (!chartAggregationName) {
            deferred.resolve([]);
            return null;
          }

          studyTaxonomy.getTerms(chartAggregationName).then(function(terms) {
            var entries = getArrayByAggregation(chartAggregationName, StudiesData,terms);

            var data = entries.map(function(e) {
              if(e.participantsNbr) {
                return [e.title, e.value, e.participantsNbr, e.perc];
              }
              else{
                return [e.title, e.value];
              }
            });

            if (data) {
              if (/^Table-/.exec(directiveType) !== null) {
                switch (chartAggregationName) {
                  case 'populations-model-selectionCriteria-countriesIso':
                    returnedScope.chartObject.header = {
                      title: $filter('translate')(graphOptions.geoChart.header[0]),
                      value: $filter('translate')(graphOptions.geoChart.header[1])
                    };
                    break;
                  case 'populations-dataCollectionEvents-model-bioSamples':
                    returnedScope.chartObject.header = {
                      title: $filter('translate')(graphOptions.biologicalSamples.header[0]),
                      value: $filter('translate')(graphOptions.biologicalSamples.header[1])
                    };
                    break;
                  case  'model-methods-design':
                    returnedScope.chartObject.header = {
                      title: $filter('translate')(graphOptions.studiesDesigns.header[0]),
                      value: $filter('translate')(graphOptions.studiesDesigns.header[1]),
                      key: $filter('translate')(graphOptions.studiesDesigns.header[2]),
                      perc: $filter('translate')(graphOptions.studiesDesigns.header[3])
                    };
                    if(entries.length>1){
                      entries.push(entries.reduce(function (a, b){
                        return {
                          title: $filter('translate')('total'),
                          value: a.value + b.value,
                          participantsNbr:  parseFloat(a.participantsNbr) + parseFloat(b.participantsNbr),
                          key: '-',
                          perc: MathFunction.round(parseFloat(a.perc) + parseFloat(b.perc), 2)
                        };
                      }));
                    }
                    break;
                  case 'model-numberOfParticipants-participant-number-range':
                    returnedScope.chartObject.header = {
                      title: $filter('translate')(graphOptions.numberParticipants.header[0]),
                      value: $filter('translate')(graphOptions.numberParticipants.header[1]),
                      perc: $filter('translate')(graphOptions.numberParticipants.header[2])
                    };
                    if(entries.length>1){
                      entries.push(entries.reduce(function (a, b){
                        return {
                          title: $filter('translate')('total'),
                          value: a.value + b.value,
                          perc: MathFunction.round(parseFloat(a.perc) + parseFloat(b.perc), 2)
                        };
                      }));
                    }
                    break;
                  case 'model-startYear-range':
                    returnedScope.chartObject.header = {
                      title: $filter('translate')(graphOptions.startYear.header[0]),
                      value: $filter('translate')(graphOptions.startYear.header[1]),
                      key: $filter('translate')(graphOptions.startYear.header[2]),
                      perc: $filter('translate')(graphOptions.startYear.header[3])
                    };
                    if(entries.length>1){
                      entries.push(entries.reduce(function (a, b){
                        return {
                          title: $filter('translate')('total'),
                          value: a.value + b.value,
                          participantsNbr:  parseFloat(a.participantsNbr) + parseFloat(b.participantsNbr),
                          key: '-',
                          perc: MathFunction.round(parseFloat(a.perc) + parseFloat(b.perc), 2)
                        };
                      }));
                    }
                    break;
                }
                returnedScope.chartObject.type = graphOptions[chartConfig.chartType].type;
                returnedScope.chartObject.data = data;
                returnedScope.chartObject.vocabulary = chartAggregationName;
                returnedScope.chartObject.entries = entries;
              }
              else {
                if(graphOptions[chartConfig.chartType].header.length<3){
                  data.unshift([$filter('translate')(graphOptions[chartConfig.chartType].header[0]), $filter('translate')(graphOptions[chartConfig.chartType].header[1])]);
                }
                else{
                  data.map(function(item){
                    item.pop();
                    return item;
                  });
                  data.unshift([
                    $filter('translate')(graphOptions[chartConfig.chartType].header[0]),
                    $filter('translate')(graphOptions[chartConfig.chartType].header[1])
                  ]);
                }
                returnedScope.chartObject.term = true;
                returnedScope.chartObject.type = graphOptions[chartConfig.chartType].type;
                returnedScope.chartObject.data = data;
                returnedScope.chartObject.options.backgroundColor = {fill: 'transparent'} ;
                angular.extend(returnedScope.chartObject.options, graphOptions[chartConfig.chartType].options);
                returnedScope.chartObject.options.title = $filter('translate')(graphOptions[chartConfig.chartType].title) + ' (N=' + StudiesData.totalHits + ')';
              }
            }

            if (chartConfig.chartType === 'geoChart') {
              returnedScope.chartObject.options.subtitle = $filter('translate')(graphOptions[chartConfig.chartType].subtitle);
              returnedScope.chartObject.d3Config = new D3GeoConfig().withData(entries)
                .withTitle(returnedScope.chartObject.options.title)
                .withSubtitle(returnedScope.chartObject.options.subtitle);
              if (returnedScope.chartObject.options) {
                returnedScope.chartObject.d3Config.withColor(graphOptions[chartConfig.chartType].options.colors);
              }
            } else {

              returnedScope.chartObject.d3Config = new D3ChartConfig(chartAggregationName).withType(graphOptions[chartConfig.chartType].type === 'PieChart' ? 'pieChart' : 'multiBarHorizontalChart')
                .withData(entries, graphOptions[chartConfig.chartType].type === 'PieChart', $filter('translate')('graphics.nbr-studies'))
                .withTitle($filter('translate')(graphOptions[chartConfig.chartType].title) + ' (N=' + StudiesData.totalHits + ')');

              if (graphOptions[chartConfig.chartType].type !== 'PieChart') {
                returnedScope.chartObject.d3Config.options.chart.showLegend = false;
              }

              if (returnedScope.chartObject.options && returnedScope.chartObject.options.colors) {
                returnedScope.chartObject.d3Config.options.chart.color = graphOptions[chartConfig.chartType].options.colors;
              }
              returnedScope.chartObject.d3Config.options.chart.legendPosition = 'right';
              returnedScope.chartObject.d3Config.options.chart.legend = {margin : {
                  top: 0,
                  right:10,
                  bottom: 0,
                  left: 0
                }};
            }
            deferred.resolve(returnedScope);
          });
          return deferred.promise;
        }
      };

    }])

  .service('GraphicChartsQuery', ['RqlQueryService', 'RqlQueryUtils','$translate', function (RqlQueryService, RqlQueryUtils, $translate) {
    this.queryDtoBuilder = function (entityIds, entityType) {
      var query;
      if (!(entityIds) || entityIds === 'NaN') {
        query =  'study(exists(Mica_study.id))';
      }
      if(entityType && entityIds !== 'NaN') {
        query =  entityType + '(in(Mica_'+ entityType +'.id,(' + entityIds + ')))';
      }
      var localizedRqlQuery = angular.copy(RqlQueryService.parseQuery(query));
      RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $translate.use());
      var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
      return RqlQueryService.prepareGraphicsQuery(localizedQuery,
        ['Mica_study.populations-selectionCriteria-countriesIso',
          'Mica_study.populations-dataCollectionEvents-bioSamples',
          'Mica_study.numberOfParticipants-participant-number',
        ],
        ['Mica_study.methods-design', 'Mica_study.start-range']
      );
    };
  }]);
