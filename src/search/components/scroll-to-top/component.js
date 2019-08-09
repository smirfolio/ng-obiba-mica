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

  ngObibaMica.search.directive('tableScroll', function() {
    return {
      restrict: 'C',
      scope: {},
      link: function(scope, elem) {

        var windowFirstChild = document.querySelector('body :first-child');
        var onscroll;
        var theadRectangle ;
        var initialTheadBackgroundColor = elem.find('table > thead').css('background-color');
        var opaqueTheadBackground = rgbaToRgb(initialTheadBackgroundColor);
        if (window.onscroll) {
          onscroll = window.onscroll;
        }

        function rgbaToRgb(color) {
          var rgbaRegex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+),?[\s+]?(\S+)\)$/i;
          var matches = color.match(rgbaRegex);

          if (matches && matches.length >= 4) {
            var r = parseInt(matches[1], 10);
            var g = parseInt(matches[2], 10);
            var b = parseInt(matches[3], 10);
            var a = parseFloat(matches[4] || '1', 10);

            var rPrime = (1 - a) * 255 + a * r;
            var gPrime = (1 - a) * 255 + a * g;
            var bPrime = (1 - a) * 255 + a * b;

            return 'rgb(' + rPrime + ', ' + gPrime + ', ' + bPrime + ')';
          }

          return color;
        }

        function getWindowScroll() {
          return {
            top: window.pageYOffset,
            left: window.pageXOffset
          };
        }

        function getElementRectangle(item) {
          var rectangle = item.getBoundingClientRect();
          var windowScroll = getWindowScroll();

          return {
            left: rectangle.left + windowScroll.left,
            top: rectangle.top + windowScroll.top,
            width: rectangle.width,
            height: rectangle.height
          };
        }

        window.onscroll = function (event) {
          var thead = elem.find('table > thead');
          theadRectangle = theadRectangle || getElementRectangle(thead[0]);

          var bodyFirstItemHeight = windowFirstChild.getBoundingClientRect().height;
          var itemTop = theadRectangle.top + bodyFirstItemHeight;

          if (getWindowScroll().top > itemTop) {
            thead.css('transform', 'translateY(' + Math.max(0, getWindowScroll().top + bodyFirstItemHeight - theadRectangle.top) + 'px)');
            thead.css('background-color', opaqueTheadBackground);
          } else {
            thead.css('transform', 'translateY(0)');
            thead.css('background-color', initialTheadBackgroundColor);
          }
          return onscroll && onscroll(event);
        };
      }
    };
  });
})();
