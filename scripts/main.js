const myLoginApp = angular.module('myLoginApp', [
  'ngRoute',
  'ngSanitize',
  'schemaForm',
]);

/*myLoginApp.component('navBar', {
  templateUrl: './components/navBars/navBar.html',
  bindings: {
    listitem: '@',
  },
});*/

myLoginApp.component('navBarLogin', {
  templateUrl: './components/navBars/navBarLogin.html',
  bindings: {
    listitem: '@',
  },
});

myLoginApp.service('loginService', function ($http) {
  this.getAdmins = function (cb) {
    $http.get('assets/data/users.json').then(
      function (response) {
        this.admins = response.data;
        // $scope.admins = response.data;
        // console.log(response);
        cb();
      }.bind(this)
    );
  };
});

myLoginApp.controller(
  'loginController',
  function ($scope, $window, $location, $http, loginService) {
    $scope.schema = {
      type: 'object',
      title: 'Login User',
      properties: {
        username: {
          title: 'User Name',
          type: 'string',
          pattern: '^[a-zA-Z]*$',
          validationMessage: 'Name contains only Alphabetic Characteres.',
          maxLength: 15,
          minLength: 3,
        },
        password: {
          title: 'Password',
          type: 'string',
          minLength: 8,
        },
      },
      required: ['username', 'password'],
    };

    $scope.form = [
      'username',
      {
        key: 'password',
        type: 'password',
        placeholder: 'Enter a password',
      },
      {
        type: 'submit',
        style: 'btn-info',
        title: 'OK',
      },
    ];

    $scope.model = {};

    $window.sessionStorage.setItem('isAuth', false);

    if ($window.sessionStorage.getItem('isAuth') === 'true') {
      $location.path('/employeelist');
    }

    $scope.callBackFunction = function () {
      $scope.adminsLogin = loginService.getAdmins;
    };

    $scope.onLogin = function (form) {
      if (
        form.$valid &&
        $scope.model.username !== '' &&
        $scope.model.password !== ''
      ) {
        //     loginService.getAdmins($scope.callBackFunction);
        if (
          $scope.model.username == 'admin' &&
          $scope.model.password == 'adminadmin'
        ) {
          $window.sessionStorage.setItem('isAuth', true);

          $scope.isAuth = true;

          // setTimeout(() => {
          //   $scope.isAlert = false;
          // }, 2000);

          // window.location.href =
          //   'http://127.0.0.1:5500/angularjsfinaltest/#!/employeelist';
          $location.path('/employeelist');
        } else {
          // $window.sessionStorage.setItem('isAlert', 'Invalid Credentials');
          document.querySelector('.error-block').classList.remove('hidden');
          setTimeout(() => {
            document.querySelector('.error-block').classList.add('hidden');
          }, 3000);
          // console.log('incorrect password!');
          // setTimeout(() => {
          //   $scope.isAlert = true;
          // }, 2000);

          // $scope.isAlert = false;
        }
      } else {
        document.querySelector('.error-block').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('.error-block').classList.add('hidden');
        }, 3000);
      }
    };
  }
);

myLoginApp.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: './components/home.html',
    })
    .when('/login', {
      templateUrl: './components/login.html',
      controller: 'loginController',
    })
    .when('/register', {
      templateUrl: './components/register.html',
      controller: 'registerController',
    })
    .otherwise({
      redirectTo: '/home',
    });
});
