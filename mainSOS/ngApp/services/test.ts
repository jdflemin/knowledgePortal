namespace mainsos.Service {

  class TestService {
    private TEST_RESOURCE =  this.$resource('http://localhost:8080/api/v1/weightclasses');

    constructor(private $resource, private $http){}

    public getAll(){
      return this.TEST_RESOURCE.query();
    }

  }
  angular.module('mainsos').service('testService', TestService);
}
