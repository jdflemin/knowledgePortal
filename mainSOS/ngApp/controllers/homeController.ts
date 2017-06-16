namespace mainsos.Controllers {

    export class HomeController {
      public courses;
      public course;
      public newCourse = {
        name: ''
      };
      public courseID = '';
      public updatedCourse = {
        _id: '',
        name: '',
        icon: '',
        isEnabled: true
      };
      public administrator = false;


      constructor(public courseServices, public $window, public $state, private $uibModal){
        this.checkAccess();
        this.courses = courseServices.getAll();
      }

      public checkAccess(){
        let x = sessionStorage.getItem('role');
        if( x == 'admin'){
          this.administrator = true;
        }
      }


      public delete(course){
        this.course = this.courseServices.delete(course._id).then(() => this.listCourses());
      }

      public addCourse(){
        this.newCourse = this.courseServices.add({
          name: this.newCourse.name,
        }).then(() => this.listCourses());
      }

      public courseActivation(course){
        this.courseServices.getOne(course._id).then((data) => {
          console.log(this.course);
          this.course = data;
          if(data.isEnabled === true){
          this.course.isEnabled = false
          this.courseUpdate();
        } else {
          this.course.isEnabled = true
          this.courseUpdate();
        }
      })
      }

      public courseUpdate() {
        console.log(this.course);
        this.courseServices.edit({
          _id: this.course._id,
          name: this.course.name,
          isEnabled: this.course.isEnabled,
          icon: this.course.icon,
        }).then(() => {
          this.listCourses()
        });
      }

      public listCourses(){
        this.courses = this.courseServices.getAll();
      }


      public redirectToLessons(courseId){
        this.$state.go('lessons', {id: courseId});
      }

      public showEditModalCourse(course) {
        let modal = this.$uibModal.open({
          templateUrl: '/ngApp/views/editCourse.html',
          controller: editModalCourseController,
          controllerAs: 'controller',
          resolve: {
            course: () => course
          },
          size: 'md',
        });
          modal.closed.then(() => this.courses = this.courseServices.getAll());
        }

      }

      export class editModalCourseController {
        public courses;

        constructor(course, private courseServices, private $uibModalInstance) {
          this.courseServices.getOne(course._id).then((foundCourse) => {
            this.courses = foundCourse
          });
        }

        public editCourse() {
          this.courseServices.update({
            _id: this.courses._id,
            name: this.courses.name,
            isEnabled: this.courses.isEnabled,
            icon: this.courses.icon
          }).then(() => this.close());
        }

        public close() {
          this.$uibModalInstance.close();
        }

      }

}
