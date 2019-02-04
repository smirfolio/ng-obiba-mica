"use strict";

interface IAddToSetModalInstanceController {

  accept(): void;
  cancel(): void;
}

class AddToSetModalInstanceController implements IAddToSetModalInstanceController {

  private static $inject = ["$uibModalInstance", "$log", "sets"];

  public choice: { radio: string, selected?: string, name?: string };
  public canAccept: boolean;

  constructor(private $uibModalInstance: any, private $log: any, private sets: [any]) {
    this.choice = {
      name: undefined,
      radio: "NEW",
      selected: undefined,
    };

    this.canAccept = false;
  }

  public accept(): void {
    if (this.choice.radio === "NEW") {
      this.choice.name = this.choice.name.trim();
    }

    this.$uibModalInstance.close(this.choice);
  }

  public cancel(): void { this.$uibModalInstance.dismiss(); }

  public onRadioChanged(): void {
    if (this.choice.radio === "NEW") {
      this.onNameChanged();
    } else if (this.choice.radio === "EXISTING") {
      this.onSelected();
    }
  }

  public onNameChanged(): void {
    this.choice.radio = "NEW";
    this.canAccept = this.choice.name && this.choice.name.trim().length > 0;
    if (this.choice.selected !== undefined) {
      this.choice.selected = undefined;
    }
  }

  public onSelected(): void {
    this.choice.radio = "EXISTING";
    this.canAccept = this.choice.selected && this.choice.selected.length > 0;
    if (this.choice.name !== undefined) {
      this.choice.name = undefined;
    }
  }

}

angular.module("obiba.mica.sets").controller("AddToSetModalInstanceController", AddToSetModalInstanceController);
