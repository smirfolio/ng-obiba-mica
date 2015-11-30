'use strict';

angular.module('ngObibaMica', [
  'obiba.mica.utils',
  'obiba.mica.access'
]).config(['$provide', function($provide) {
  $provide.provider('ngObibaMicaUrlProvider', ['$log', function($log) {
    var registry = {
      'DataAccessFormConfigResource': 'ws/config/data-access-form',
      'DataAccessRequestsResource': 'ws/data-access-requests',
      'DataAccessRequestResource': 'ws/data-access-request/:id',
      'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments',
      'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
      'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
    };

    function UrlProvider() {

      this.getUrl =function(resource) {
        if (resource in registry) {
          return registry[resource];
        }

        $log.error('Invalid resource ', resource);
        return null;
      };

    }

    this.$get = function() {
      return new UrlProvider();
    };

  }]);

}]);

