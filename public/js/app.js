var message = angular.module('message', ['ngRoute', 'messageUI']);

message.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html'
      //controller: 'authCtrl'
    }).
    // when('/login', {
    //    templateUrl: '/views/login.html',
    //    controller: 'authCont'
    // }).
    // when('/signup', {
    //   templateUrl: 'views/signup.html',
    //   controller: 'authCtrl'
    // }).
    // when('/profile', {
    //   templateUrl: 'views/profile.html',
    //   controller: 'authCtrl'
    // })
    when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'messageCtrl'
    })
    // .when('/feeds2', {
    //   templateUrl: 'views/feeds2.html',
    //   controller: 'feedCtrl'
    // })
    .otherwise({
        redirectTo: '/home'
      });
    // use the HTML5 History API and remove # from URLs
    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }
]);
