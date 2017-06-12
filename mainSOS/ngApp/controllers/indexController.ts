namespace mainsos.Controllers {

    export class IndexController {
      public courses;
      public searchString;

      constructor(courseServices, private $uibModal, private $state){
        this.courses = courseServices.getAll()
      }

      public openAdminModal(){
        this.$uibModal.open({
          templateUrl: 'ngApp/views/adminmodal.html',
          controller: 'ModalController',
          controllerAs: 'controller',
          size: 'lg'
        });
      }

      public goToSearch() {
        this.$state.go('searchPage', {search: this.searchString});
      }

    }
  angular.module('mainsos').controller('indexController', IndexController);
}
