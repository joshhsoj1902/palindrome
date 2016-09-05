var message = angular.module('message', ['ngRoute', 'messageUI']);

message.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'messageCtrl'
    })
    .otherwise({
        redirectTo: '/messages'
      });
    // use the HTML5 History API and remove # from URLs
    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }
]);
