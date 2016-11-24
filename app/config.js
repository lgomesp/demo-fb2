(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCbXa82D9W23Nkd6mHbzA66Jrksb8Cybn0",
        authDomain: "abt-a38e8.firebaseapp.com",
        databaseURL: "https://abt-a38e8.firebaseio.com",
        storageBucket: "abt-a38e8.appspot.com",
        messagingSenderId: "141352961057"
    };

    firebase.initializeApp(config);
    //URL do projeto
    var rootRef = firebase.database().ref();

    angular.module('insta').constant('APP_SETTINGS', {
        "FIREBASE_URL": rootRef
    });

    //sempre que a aplicação rodar
    angular.module('insta').run(function ($rootScope, $location) {
        $rootScope.user = null;
        //sempre que a rota mudar
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            //se o usuário estiver deslogado é redirecionado para a tela de login
            if ($rootScope.user == null) {
                $location.path("/login");
            }
        });
    });
})();