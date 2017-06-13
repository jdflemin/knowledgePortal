namespace mainsos {

    angular.module('mainsos', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: mainsos.Controllers.HomeController,
                controllerAs: 'controller'
            })
           .state('lessons', {
                url: '/lessons/:id',
                templateUrl: '/ngApp/views/lessons.html',
                controller: mainsos.Controllers.LessonsController,
                controllerAs: 'controller'
            })
            .state('questions', {
                url: '/questions/:id',
                templateUrl: '/ngApp/views/questions.html',
                controller: mainsos.Controllers.QuestionController,
                controllerAs: 'controller'
            })
            .state('answers', {
                url: '/answers/:id',
                templateUrl: '/ngApp/views/answers.html',
                controller: mainsos.Controllers.AnswerController,
                controllerAs: 'controller'
            })
            .state('searchPage', {
                url: '/search/:search',
                templateUrl: '/ngApp/views/searchPage.html',
                controller: mainsos.Controllers.SearchController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/404',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/404');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
