var feedUI = angular.module('feedUI', ['ui.bootstrap',"ng","ngAnimate","ngAria"]);

var messageUI = angular.module('messageUI', ['ui.bootstrap']);

// feedUI.factory('UserService', [function () {
//     var user = {
//         isLogged: false,
//         username: '',
//         redditUsername: ''
//     };
//     return user;
// }]);

// angular
//       .module('tabsDemoDynamicTabs', ['ngMaterial'])
//       .controller('AppCtrl', AppCtrl);

// feedUI.controller('authCtrl', function ($scope, $http, $location, UserService, $timeout) {

//     $scope.user = { username: '', password: '' };
//     $scope.alert = '';
//     //$scope.isUserLoggedIn = false;
//     console.log("authControl");
//     console.log("UserService", UserService);



//     function getCurrentUser(done) {
//         $http.get('/auth/currentuser').
//             success(function (data) {
//                 console.log("getCurrentUser success: ", data);
//                 setUser(data);
//                 done(data);
//             }).
//             error(function () {
//                 console.log("getCurrentUser fail");
//                 setUser(null);
//                 done(null);
//             });
//     }

//     function setUser(user) {
//         if (typeof user !== 'undefined' && user !== null) {
//             UserService.username = user.username;
//             UserService.isLogged = true;
//             //TODO: Handle more then 1 reddit account
//             if (typeof user.RedditAccounts[0] !== 'undefined') {
//                 UserService.redditUsername = user.RedditAccounts[0].profileId;
//             } else {
//                 UserService.redditUsername = '';
//             }
//             $scope.user = UserService;
//             //$scope.loggeduser = user;
//             //$scope.isUserLoggedIn = true;
//             console.log("user set:", UserService);
//         } else {
//             $scope.user = null;
//             //$scope.isUserLoggedIn = false;

//             UserService.isLogged = false;
//             UserService.username = '';
//         }

//     }

//     $scope.isUserLoggedIn = function () {
//         console.log(UserService.isLogged);
//         console.log($scope.user);
//         if (UserService.isLogged) {
//             $scope.user.username = UserService.username;
//         }

//         return UserService.isLogged;
//     };

//     $scope.hasRedditAccount = function () {
//         console.log('USERSERVICE: ', UserService);
//         if (typeof UserService.redditUsername == 'undefined' || UserService.redditUsername == '') {
//             console.log("hasRedditAccount 2");
//             return false;
//         } else {
//             console.log("hasRedditAccount 3");
//             return true;
//         }
//     };

//     // $scope.login = function(user){
//     //     console.log("login");
//     //     $http.post('/auth/login', user).
//     //         success(function(data) {
//     //             setUser(data);
//     //             $location.path('/profile');
//     //         }).
//     //         error(function() {
//     //             $scope.alert = 'Login failed';
//     //             setUser(null);
//     //         });

//     // };

//     // $scope.signup = function(user){
//     //     $http.post('/auth/signup', user).
//     //         success(function(data) {
//     //             $scope.alert = data.alert;
//     //          }).
//     //         error(function() {
//     //             $scope.alert = 'Registration failed';
//     //             // $scope.isUserLoggedIn = false;
//     //             // UserService.isLogged = false;
//     //             // UserService.username = '';
//     //         });

//     // };

//     $scope.profile = function () {
//         getCurrentUser(function (user) {
//             if (typeof user !== 'undefined' && user !== null) {
//                 console.log("Not Undefined: ", user);
//                 //$scope.user = user;           
//             } else {
//                 console.log("Undefined: ", user);
//                 $location.path('/signin');
//             }
//         });
//     };

//     $scope.logout = function () {
//         console.log("logout");
//         $http.get('/auth/logout')
//             .success(function () {
//                 setUser(null);
//                 // $scope.loggeduser = {};
//                 // $scope.isUserLoggedIn = false;
//                 // UserService.isLogged = false;
//                 // UserService.username = '';
//                 $location.path('/home');

//             })
//             .error(function () {
//                 $scope.alert = 'Logout failed';
//             });
//     };

//     $scope.unlink = function (service) {


//         console.log("UNLINK: ", service);
//         switch
//         (service) {
//             case 'REDDIT':
//                 $http.get('/auth/reddit/unlink')
//                     .success(function () {
//                         console.log("Test1");
//                         getCurrentUser(function (user) {
//                             console.log("Test2");
//                             $location.path('/profile');
//                         });
//                     })
//                     .error(function () {
//                         $scope.alert = 'Unlink failed';
//                     });
//                 break;

//             // 
//             default:
//             //     break;
//         }
//     };

// });

messageUI.controller('messageCtrl', function($scope,$http){

    $scope.getMessages = function() {
        console.log("Message Get: ");
        $http.get('/api/message')
        .success(function(data) {
            $scope.messages = data;
            console.log("Messages: ",data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
        
     // when submitting the add form, send the text to the node API
    $scope.createMessage = function() {
        console.log("Message Put: ",$scope.formData);
        //$http.post('/api/feed', $scope.formData)
        $http.put('/api/message', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.messages = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateMessage = function(message){
        console.log("Update message: ", message);
        $http.put('/api/message/'+message._id, message)
            .success(function(data) { 
                $scope.messages = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteMessage = function(message){
        console.log("Delete message: ", message._id);
        $http.delete('/api/message/' + message._id)
            .success(function(data) {
                $scope.messages = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.editmode = false;
    $scope.toggleEditMode = function(){
        $scope.editmode = $scope.editmode === false ? true: false;
    }

    $scope.getMessages();
});

feedUI.controller('feedCtrl', function ($scope, $http, $location, UserService) {
    $scope.formData = {};

    // when landing on the page, get all feeds and show them
    $http.get('/api/feed')
        .success(function(data) {
            $scope.feeds = data;
            console.log("FEEDS: ",data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    
        
     // when submitting the add form, send the text to the node API
    $scope.createFeed = function() {
        console.log("FEED POST: ",$scope.formData);
        $http.post('/api/feed', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.feeds = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.updateFeed = function(feed) {
        console.log("FEED PUT: ",feed);
        $http.put('/api/feed/' + feed.id, feed)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.feeds = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

  $scope.editmode = false;
  $scope.toggleEditMode = function(){
    $scope.editmode = $scope.editmode === false ? true: false;
  }

    // delete a feed
    $scope.deleteFeed = function(id) {
        console.log("JB2: DELETE BY ID: ",id);
        $http.delete('/api/feed/' + id)
            .success(function(data) {
                $scope.feeds = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.toggleFeedDetail = function($index) {
        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
        $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        console.log("index: ",$index);
        console.log("Active Postion: ",$scope.activePosition);
    };

    $scope.addTab = function() {
        // console.log('the powerful feedId: ',feedId);
        console.log("Active Postion: ",$scope.activePosition);
        var newTab = {
            subreddit: 'New '
        };
        
        $scope.feeds[$scope.activePosition].RedditFeeds.push(newTab)
        // $scope.tabs.push(newTab);
        // $timeout(function(){
        //     $scope.activeTabIndex = ($scope.tabs.length -1)
        // });
    };
    
    
    
    //TAB INTERFACE TEST
    
    
    
    
    
    // $scope.$watch('selectedIndex', function(current, old){
    //   previous = selected;
    //   selected = tabs[current];
    //   if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
    //   if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    // });
    // $scope.addTab = function (title, view) {
    //   view = view || title + " Content View";
    //   tabs.push({ title: title, content: view, disabled: false});
    // };
    // $scope.removeTab = function (tab) {
    //   var index = tabs.indexOf(tab);
    //   tabs.splice(index, 1);
    // };
    
});



// feedUI.directive('contenteditable', ['$sce', function($sce) {
//   return {
//     restrict: 'A', // only activate on element attribute
//     require: '?ngModel', // get a hold of NgModelController
//     link: function(scope, element, attrs, ngModel) {
//       if (!ngModel) return; // do nothing if no ng-model

//       // Specify how UI should be updated
//       ngModel.$render = function() {
//         element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
//       };

//       // Listen for change events to enable binding
//       element.on('blur keyup change', function() {
//         scope.$evalAsync(read);
//       });
//       read(); // initialize

//       // Write data to the model
//       function read() {
//         var html = element.html();
//         // When we clear the content editable the browser leaves a <br> behind
//         // If strip-br attribute is provided then we strip this out
//         if ( attrs.stripBr && html == '<br>' ) {
//           html = '';
//         }
//         ngModel.$setViewValue(html);
//       }
//     }
//   };
// }]);

messageUI.directive("contenteditable", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
        //ngModel.$render();
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
          console.log("JB2: bind");
        scope.$apply(read);
      });
    }
  };
});

messageUI.directive("uibTabButton", function() {
  return {
    restrict: "EA",
    scope: {
        handler: '&',
        text: '@'
    },
    template: '<li class="uib-tab nav-item">' +
        '<a href="javascript:;" ng-click="handler()" class="nav-link" ng-bind="text"></a>' +
        '</li>',
    replace: true
  };
});
