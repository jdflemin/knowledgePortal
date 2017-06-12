namespace mainsos.Services {

  class CourseServices {
    private COURSE_RESOURCE = this.$resource('http://localhost:3004/api/v1/courses/:id');

    constructor(private $resource, private $window){}

    public getAll() {
      return this.COURSE_RESOURCE.query();
    }

    public getOne(id) {
      console.log(id);
      return this.COURSE_RESOURCE.get({id: id}).$promise;
    }

    public add(course) {
      return this.COURSE_RESOURCE.save(course).$promise;
    }

    public edit(course) {
      console.log(course);
      return this.COURSE_RESOURCE.save({id: course._id}, course).$promise;
    }

    public delete(id){
      return this.COURSE_RESOURCE.delete({id: id}).$promise;
    }

    public update(course) {
      return this.COURSE_RESOURCE.save({id: course._id}, course).$promise;
    }

    public reShow(){
      return this.$window.location.reload();
    }
  }
  angular.module('mainsos').service('courseServices', CourseServices);
}
