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
ngObibaMica.search.MetaTaxonomyParser = function() {

  function parseTerms(terms) {
    return terms.map(function(taxonomy) {
      return {
        info: {name: taxonomy.name, title: taxonomy.title},
        taxonomies: [taxonomy]
      };
    });
  }

  this.parseTerms = parseTerms;
};

ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function(metaVocabulary) {
  return this.parseTerms(metaVocabulary.terms || []);
};

ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function(metaVocabulary) {

  // TODO plugin options to build the taxonomy list
  var chars = metaVocabulary.terms[0] || [];
  var taxonomies = this.parseTerms(chars.terms);

  var scales = metaVocabulary.terms[1];
  if (scales) {
    taxonomies = taxonomies.concat([{
      info: {name: 'scales/measures', title: 'Scales / Measures'},
      taxonomies: scales.terms
    }]);
  }

  return taxonomies;
};

