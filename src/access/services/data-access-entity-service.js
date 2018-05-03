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
  function DataAccessEntityService($translate, SessionProxy, USER_ROLES, ngObibaMicaUrl) {
    var statusList = {
      OPENED: 'OPENED',
      SUBMITTED: 'SUBMITTED',
      REVIEWED: 'REVIEWED',
      CONDITIONALLY_APPROVED: 'CONDITIONALLY_APPROVED',
      APPROVED: 'APPROVED',
      REJECTED: 'REJECTED'
    };

    this.status = statusList;

    this.getStatusFilterData = function (userCallback) {
      if (userCallback) {
        $translate(Object.keys(statusList)).then(function (translation) {
          userCallback(Object.keys(translation).map(function (key) {
            return {key: key, translation: translation[key]};
          }));
        });
      }
    };

    var canDoAction = function (request, action) {
      return request.actions ? request.actions.indexOf(action) !== - 1 : false;
    };

    this.actions = {
      canViewProfile: function (role) {
        var found = false;
        var currentUserRoles = SessionProxy.roles();
        angular.forEach(currentUserRoles, function (value) {
          if (value === role || value === USER_ROLES.admin) {
            found = true;
          }
        });
        return found;
      },
      canView: function (request) {
        return canDoAction(request, 'VIEW');
      },

      canEdit: function (request) {
        return canDoAction(request, 'EDIT');
      },

      canEditStatus: function (request) {
        return canDoAction(request, 'EDIT_STATUS');
      },

      canDelete: function (request) {
        return canDoAction(request, 'DELETE');
      },

      canEditAttachments: function (request) {
        return canDoAction(request, 'EDIT_ATTACHMENTS');
      },

      canDeleteAttachments: function (request) {
        return canDoAction(request, 'DELETE_ATTACHMENTS');
      },

      canAddAmendments: function (request) {
        return request['obiba.mica.DataAccessAmendmentDto.amendment'] ? true : canDoAction(request, 'ADD_AMENDMENTS');
      }
    };

    var canChangeStatus = function (request, to) {
      return request.nextStatus ? request.nextStatus.indexOf(to) !== - 1 : null;
    };

    this.nextStatus = {
      canSubmit: function (request) {
        return canChangeStatus(request, 'SUBMITTED');
      },

      canReopen: function (request) {
        return canChangeStatus(request, 'OPENED');
      },

      canReview: function (request) {
        return canChangeStatus(request, 'REVIEWED');
      },

      canConditionallyApprove: function (request) {
        return canChangeStatus(request, 'CONDITIONALLY_APPROVED');
      },

      canApprove: function (request) {
        return canChangeStatus(request, 'APPROVED');
      },

      canReject: function (request) {
        return canChangeStatus(request, 'REJECTED');
      }

    };

    this.getStatusHistoryInfo = function (userCallback) {
      if (! userCallback) {
        return;
      }

      var keyIdMap = {
        'data-access-request.histories.opened': 'opened',
        'data-access-request.histories.reopened': 'reopened',
        'data-access-request.histories.submitted': 'submitted',
        'data-access-request.histories.reviewed': 'reviewed',
        'data-access-request.histories.conditionallyApproved': 'conditionallyApproved',
        'data-access-request.histories.approved': 'approved',
        'data-access-request.histories.rejected': 'rejected'
      };

      var statusHistoryInfo = {
        opened: {
          id: 'opened',
          icon: 'glyphicon glyphicon-saved',
        },
        reopened: {
          id: 'reopened',
          icon: 'glyphicon glyphicon-repeat',
        },
        submitted: {
          id: 'submitted',
          icon: 'glyphicon glyphicon-export',
        },
        reviewed: {
          id: 'reviewed',
          icon: 'glyphicon glyphicon-check',
        },
        conditionallyApproved: {
          id: 'conditionallyApproved',
          icon: 'glyphicon glyphicon-unchecked',
        },
        approved: {
          id: 'approved',
          icon: 'glyphicon glyphicon-ok',
        },
        rejected: {
          id: 'rejected',
          icon: 'glyphicon glyphicon-remove',
        }
      };

      $translate(Object.keys(keyIdMap))
        .then(
          function (translation) {
            Object.keys(translation).forEach(
              function (key) {
                statusHistoryInfo[keyIdMap[key]].msg = translation[key];
              });

            userCallback(statusHistoryInfo);
          });
    };

    this.getStatusHistoryInfoId = function (status) {
      var id = 'opened';

      if (status.from !== 'OPENED' || status.from !== status.to) {
        switch (status.to) {
          case 'OPENED':
            id = 'reopened';
            break;
          case 'SUBMITTED':
            id = 'submitted';
            break;
          case 'REVIEWED':
            id = 'reviewed';
            break;
          case 'CONDITIONALLY_APPROVED':
            id = 'conditionallyApproved';
            break;
          case 'APPROVED':
            id = 'approved';
            break;
          case 'REJECTED':
            id = 'rejected';
            break;
        }
      }

      return id;
    };

    this.getListDataAccessRequestPageUrl = function () {
      var DataAccessClientListPath = ngObibaMicaUrl.getUrl('DataAccessClientListPath');
      if(DataAccessClientListPath){
        return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientListPath');
      }
      else{
        return null;
      }
    };

    return this;
  }

  ngObibaMica.access.service('DataAccessEntityService',
    ['$translate', 'SessionProxy', 'USER_ROLES', 'ngObibaMicaUrl', DataAccessEntityService]);

}) ();