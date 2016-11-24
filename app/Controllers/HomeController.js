(function () {
    'use strict';

    angular.module('insta').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$firebaseArray'];

    function HomeCtrl($scope, $firebaseArray) {
        var vm = this;

        //pega os últimos 15 posts
        firebase.database().ref("posts").orderByKey().limitToLast(25);

        vm.posts = [];

        activate();

        function activate() {
            //$firebaseArray = plugin angularfire
            //$scope.messages = //$firebaseArray(firebase.database().ref("messages"));
            vm.posts = $firebaseArray(firebase.database().ref("posts"))
        }
    };
})();