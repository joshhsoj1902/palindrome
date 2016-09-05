var messageUI = angular.module('messageUI', ['ui.bootstrap']);

messageUI.controller('messageCtrl', function ($scope, $http) {

    $scope.getMessages = function () {
        console.log("Message Get: ");
        $http.get('/api/message')
            .success(function (data) {
                $scope.messages = data;
                console.log("Messages: ", data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function () {
        console.log("Message Put: ", $scope.formData);
        $http.put('/api/message', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateMessage = function (message) {
        console.log("Update message: ", message);
        $http.put('/api/message/' + message._id, message)
            .success(function (data) {
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteMessage = function (message) {
        console.log("Delete message: ", message._id);
        $http.delete('/api/message/' + message._id)
            .success(function (data) {
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
            $scope.editmode = false;
            $scope.activePosition = -1;
    };

    $scope.toggleMessageDetail = function ($index) {
        $scope.activePosition = $scope.activePosition === $index ? -1 : $index;
        $scope.editmode = false;
    };

    $scope.editmode = false;
    $scope.toggleEditMode = function () {
        $scope.editmode = $scope.editmode === false ? true : false;
    };

    $scope.getMessages();
});

messageUI.filter('yesNo', function() {
    return function(input) {
        return input ? 'Yes' : 'No';
    };
});

messageUI.directive("contenteditable", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
                //ngModel.$render();
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function () {
                scope.$apply(read);
            });
        }
    };
});
