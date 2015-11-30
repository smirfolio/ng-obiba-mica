'use strict';

angular.module('ngObibaMica', [
  'obiba.mica.utils',
  'obiba.mica.access'
])
.config(['$provide', function($provide) {
  $provide.provider('ngObibaMicaUrl', function() {
    var registry = {
      'DataAccessFormConfigResource': 'ws/config/data-access-form',
      'DataAccessRequestsResource': 'ws/data-access-requests',
      'DataAccessRequestResource': 'ws/data-access-request/:id',
      'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments',
      'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
      'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
    };

    function UrlProvider(registry) {
      var urlRegistry = registry;

      this.getUrl =function(resource) {
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

  });

}]);

