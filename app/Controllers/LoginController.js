(function () {
    'use strict';

    angular.module('insta').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location'];

    function LoginCtrl($scope, $rootScope, $location) {
        var vm = this;

        var auth = firebase.auth();
        var provider = new firebase.auth.FacebookAuthProvider();

        vm.facebookLogin = doFacebookLogin;
        vm.logout = logout;

        function doFacebookLogin() {
            auth.signInWithPopup(provider).then(function (result) {
                $rootScope.user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };
                $location.path('/');
                $scope.$apply();
                var uid = result.user.uid;
            }).catch(function (error) {
                console.log("Falha no login!", error);
            });
        }

        function logout() {
            auth.signOut();
            $rootScope.user = null;
            localStorage.removeItem("firebase:session::5517");
            $location.path('/login')
        }

        function navigate(path) {
            $location.path(path + '/');
        }


    };


})();