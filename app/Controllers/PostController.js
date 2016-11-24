(function () {
    'use strict';

    angular.module('insta').controller('PostCtrl', PostCtrl);

    PostCtrl.$inject = ['$scope', '$rootScope', '$location'];

    function PostCtrl($scope, $rootScope, $location) {

        var vm = this;
        //INSTÂNCIA FB


        vm.filters = ['original', 'grayscale', 'brightness', 'contrast', 'saturate', 'invert', 'sepia'];
        vm.image = '';
        vm.croppedImage = '';
        vm.message = '';


        $scope.post = function (filter) {
            var data = {
                photo: vm.croppedImage,
                filter: filter,
                message: vm.message,
                user: $rootScope.user
            };

            firebase.database().ref().child('posts').push(data);

            vm.image = '';
            vm.croppedImage = '';
            vm.message = '';
            $location.path('/');
        };

        //converte a imagem pra base 64
        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    vm.image = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        //input com id file
        angular.element(document.querySelector('#file')).on('change', handleFileSelect);
    }
})();