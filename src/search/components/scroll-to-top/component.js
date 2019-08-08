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
        // *******

        var windowFirstChild = document.querySelector('body :first-child');
        var onscroll;
        if (window.onscroll) {
          onscroll = window.onscroll;
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
          var theadRectangle = getElementRectangle(elem.find('table > thead')[0]);

          var bodyFirstItemHeight = windowFirstChild.getBoundingClientRect().height;
          var itemTop = theadRectangle.top + bodyFirstItemHeight;
          console.log('item', theadRectangle, 'window', getWindowScroll().top, 'nav', bodyFirstItemHeight);

          if (getWindowScroll().top > itemTop) {
            elem.find('table thead').css('transform', 'translateY(' + Math.max(0, getWindowScroll().top + bodyFirstItemHeight - theadRectangle.top) + 'px)');
          } else {
            elem.find('table thead').css('transform', 'translateY(0)');
          }
          return onscroll && onscroll(event);
        };

        // *******
      }
    };
  });
})();
