/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

declare var QUERY_TARGETS: any;

class VariableAnnotationsService {
  private static $inject = ["$q", "$log", "$translate", "$cacheFactory",
    "ngObibaMicaSearch", "TaxonomyResource", "LocalizedValues"];

  private localizedAnnotations: any;
  private annotationTaxonomies: any;
  private annotationsEnabled: boolean;

  constructor(private $q: any,
              private $log: any,
              private $translate: any,
              private $cacheFactory: any,
              private ngObibaMicaSearch: any,
              private TaxonomyResource: any,
              private LocalizedValues: any) {
    this.localizedAnnotations = {};
    this.annotationTaxonomies = this.ngObibaMicaSearch.getOptions().variables.annotationTaxonomies;
    this.annotationsEnabled = this.annotationTaxonomies && this.annotationTaxonomies.length > 0;
  }

  public isAnnotationsEnabled(): boolean {
    return this.annotationsEnabled;
  }

  public processAnnotations(variables: any): any {
    const deferred = this.$q.defer();
    if (!this.annotationsEnabled || !variables || variables.length < 0) {
      deferred.resolve();
    }

    this.ensureAnnotationTaxonomies().then(() => {
      variables.forEach((variable) => {
        (variable.annotations || []).forEach((annotation) => {
          annotation.title = this.localizedAnnotations[this.createMapKey(annotation)];
          if (!annotation.title) {
            this.localizeAnnotation(annotation).then((localized) => {
              annotation.title = localized;
            });
          }
        });
      });

      deferred.resolve();
    });

    return deferred.promise;
  }

  private createMapKey(annotation): string {
    return annotation.taxonomy + "_" + annotation.vocabulary + "_" + annotation.value;
  }

  private ensureAnnotationTaxonomies(): any {
    const deferred = this.$q.defer();
    this.annotationTaxonomies.forEach((taxonomy) => {
      // cache in Angular App
      this.TaxonomyResource.get({
        target: QUERY_TARGETS.VARIABLE,
        taxonomy,
      }).$promise.then(deferred.resolve());
    });
    return deferred.promise;
  }

  private localizeAnnotation(annotation): any {
    const deferred = this.$q.defer();

    const key = this.createMapKey(annotation);
    if (this.localizedAnnotations[key]) {
      deferred.resolve(this.localizedAnnotations[key] || annotation.value);
    }

    let localized = null;
    this.TaxonomyResource.get({
      target: QUERY_TARGETS.VARIABLE,
      taxonomy: annotation.taxonomy,
    }).$promise.then((taxonomy) => {
      taxonomy.vocabularies.some((vocabulary) => {
        if (vocabulary.name === annotation.vocabulary) {
          (vocabulary.terms || []).some((term) => {
            if (term.name === annotation.value) {
              localized = this.LocalizedValues.forLocale(term.title, this.$translate.use());
              return true;
            }
          });

          return true;
        }
      });

      this.localizedAnnotations[key] = localized;
      deferred.resolve(localized || annotation.value);
    });

    return deferred.promise;
  }
}

ngObibaMica.search.service("VariableAnnotationsService", VariableAnnotationsService);
