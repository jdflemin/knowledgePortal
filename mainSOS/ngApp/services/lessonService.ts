namespace mainsos.Services {

    export class LessonServices {
      private LESSON_RESOURCE = this.$resource('http://localhost:3004/api/v1/lessons/:id');
      private COURSE_LESSON_RESOURCE = this.$resource('http://localhost:3004/api/v1/lessons/courses/:id/lessons');

      constructor(private $resource, private $window) {}

      public getAll() {
        return this.LESSON_RESOURCE.query();
      }

      public getOne(id) {
        return this.LESSON_RESOURCE.get({id: id}).$promise;
      }

      public getAllCourseLessons(courseId) {
        return this.COURSE_LESSON_RESOURCE.query({id: courseId});
      }

      public add(lesson) {
        return this.LESSON_RESOURCE.save(lesson).$promise;
      }

      public edit(id) {
        return this.LESSON_RESOURCE.post({id: id}).$promise;
      }

      public update(lesson) {
        return this.LESSON_RESOURCE.save({id: lesson._id}, lesson).$promise;
      }

      public delete(id){
        return this.LESSON_RESOURCE.delete({id: id}).$promise;
      }

      public reShow(){
        return this.$window.location.reload();
      }
    }

    angular.module('mainsos').service('lessonServices', LessonServices);
}
