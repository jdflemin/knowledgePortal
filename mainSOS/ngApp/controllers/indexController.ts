namespace mainsos.Controllers {

    export class IndexController {
      public courses;
      public searchString;


      constructor(courseServices, private $uibModal, private $state){
        this.courses = courseServices.getAll()
      }

      public isAdmin() {
        console.log('click');
        sessionStorage.clear();
        sessionStorage.setItem('role', 'admin');
        this.$state.reload();
        $('.choice').slideUp(150);
      }

      public isStudent(){
        console.log('clicked');
        sessionStorage.clear();
        sessionStorage.setItem('role', 'student');
        this.$state.reload();
        $('.choice').slideUp(150);
      }

      public goToSearch() {
        this.$state.go('searchPage', {search: this.searchString})
        this.searchString = '';
      }

    }
  angular.module('mainsos').controller('indexController', IndexController);
}
