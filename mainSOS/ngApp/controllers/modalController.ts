namespace mainsos.Controllers {

   export class ModalController {

    constructor(private $uibModalInstance, private $state) {}

    public ok(){
      this.$uibModalInstance.close();
    }

    public studentView(){
      this.$state.go('home')
        .then(() => this.$uibModalInstance.close()
      )
    }

    public nukeSomething(){
      this.$state.go('admin')
        .then(() => this.$uibModalInstance.close()
      )
    }

    public adminView(){
      this.$state.go('adminCourse')
        .then(() => this.$uibModalInstance.close()
      )
    }

  }

  angular.module('mainsos').controller('ModalController', ModalController);

}
