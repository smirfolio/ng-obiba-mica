/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

class StatusProgressBarController implements ng.IComponentController {
  private static $inject = ["$log"];

  public status: string;
  public config: any;
  public onChange: (args: any) => void;
  private states: any;
  private step: number;
  private percent: number;

  constructor(private $log: any) {
    this.percent = 0;
  }

  public $onChanges(changes: any): void {
    if (this.status && this.config) {

      if (!this.states) {
        this.initializeStates();
      }

      this.updateStatus();
    }
  }

  private initializeStates(): void {
    let i = 0;
    this.states = {};
    this.states.OPENED = i++;
    this.states.SUBMITTED = i++;
    if (true === this.config.withReview) {
      this.states.REVIEWED = i++;
    }
    if (true === this.config.withConditionalApproval) {
      this.states.CONDITIONALLY_APPROVED = i++;
    }

    this.states.APPROVED = this.states.REJECTED = i;
    this.step = 100 / i;
  }

  private updateStatus(): void {
    this.percent = this.states[this.status] * this.step;
  }
}

class StatusProgressBarComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string = "access/components/status-progressbar/component.html";
  public transclude: boolean = false;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
      config: "<",
      status: "<",
    };
    this.controller = StatusProgressBarController;
    this.controllerAs = "$ctrl";
  }
}

ngObibaMica.access.component("statusProgressbar", new StatusProgressBarComponent());
