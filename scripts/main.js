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

myLoginApp.component('sidePanel', {
  templateUrl: './components/dashboardComponents/sidePanel.html',
});

myLoginApp.component('headerPanel', {
  templateUrl: './components/dashboardComponents/headerPanel.html',
  controller: function ($window, $location) {
    this.signOut = function () {
      $window.sessionStorage.setItem('isAuth', false);
      $location.path('/home');
    };
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

myLoginApp.service('employeeService', function ($http) {
  this.employees = [];
  this.getEmployees = function (cb) {
    if (this.employees.length === 0) {
      $http
        .get('assets/data/employees.json') //https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001
        .then(
          function (response) {
            this.employees = response.data;
            // console.log(response);
            cb();
          }.bind(this)
        );
    } else {
      cb();
    }
  };
  this.addEmployee = function (cb, employee) {
    this.employees.push(employee);
    cb();
  };
  /*this.checkData = function (cb) {
    this.getEmployees;
    if (this.employees.length === 0) {
      return false;
    } else {
      return true;
    }
  };*/
});

myLoginApp.service('menuService', function ($http) {
  this.menus = [];
  this.getMenus = function (cb) {
    if (this.menus.length === 0) {
      $http
        .get('assets/data/dashboardMenus.json') //https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001
        .then(
          function (response) {
            this.menus = response.data;
            // console.log(response);
            cb();
          }.bind(this)
        );
    } else {
      cb();
    }
  };
});

myLoginApp.controller('menuController', function ($scope, menuService) {
  $scope.callBackFunction = function () {
    $scope.menus = menuService.menus;
  };
  // if ($scope.employees === undefined) {
  //   employeeService.getEmployees($scope.callBackFunction);
  // }
  menuService.getMenus($scope.callBackFunction);
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

myLoginApp.controller(
  'employeeController',
  function ($scope, $window, $location, employeeService) {
    $scope.title = 'Employee Details';
    $scope.employees = [];
    if ($window.sessionStorage.getItem('isAuth') === 'false') {
      $location.path('/login');
    }
    $scope.callBackFunction = function () {
      $scope.employees = employeeService.employees;
    };
    // if ($scope.employees === undefined) {
    //   employeeService.getEmployees($scope.callBackFunction);
    // }
    employeeService.getEmployees($scope.callBackFunction);
  }
);

myLoginApp.controller(
  'addEmployeeController',
  function ($scope, $window, $location, employeeService) {
    $scope.title = 'Add Employee Details';
    if ($window.sessionStorage.getItem('isAuth') === 'false') {
      $location.path('/login');
    }
    $scope.schema = {
      type: 'object',
      title: 'Register Employee',
      properties: {
        firstname: {
          title: 'First Name',
          type: 'string',
          pattern: '^[a-zA-Z]*$',
          validationMessage: 'Name contains only Alphabetic Characteres.',
          maxLength: 15,
          minLength: 3,
        },
        lastname: {
          title: 'Last Name',
          type: 'string',
          pattern: '^[a-zA-Z]*$',
          validationMessage: 'Name contains only Alphabetic Characteres.',
          maxLength: 15,
          minLength: 3,
        },
        email: {
          title: 'Email',
          type: 'string',
          pattern: '^\\S+@\\S+$',
          validationMessage: 'Email Should be Valid!',
          // description: 'Password will be used for login.',
        },
        gender: {
          title: 'Gender',
          type: 'string',
        },
        mobile: {
          title: 'Mobile Number',
          type: 'string',
          minLength: 10,
          maxLength: 10,
        },
        dob: {
          title: 'Date of Birth',
          type: 'date',
        },
        salary: {
          title: 'Salary',
          type: 'number',
          pattern: '^[1-9]+[0-9]*$',
        },
      },
      required: [
        'firstname',
        'lastname',
        'email',
        'gender',
        'mobile',
        'dob',
        'salary',
      ],
    };

    $scope.form = [
      'firstname',
      'lastname',
      {
        key: 'email',
        type: 'email',
        placeholder: 'name@example.com',
      },
      {
        key: 'gender',
        type: 'radios',
        titleMap: [
          { value: 'Male', name: 'Male' },
          { value: 'Female', name: 'Female' },
        ],
      },
      {
        key: 'mobile',
        type: 'string',
        placeholder: 'Enter Your Mobile Number',
      },
      {
        key: 'dob',
        type: 'date',
      },
      {
        key: 'salary',
        type: 'number',
        placeholder: 'Enter Your Salary',
      },
      {
        type: 'submit',
        style: 'btn-info',
        title: 'OK',
      },
    ];

    $scope.model = {};

    $scope.callBackFunction = function () {
      $scope.employees = employeeService.getEmployees;
    };

    $scope.onRegister = function (form) {
      $scope.$broadcast('schemaFormValidate');
      if (form.$valid) {
        employeeService.getEmployees($scope.callBackFunction);
        employeeService.addEmployee($scope.callBackFunction, $scope.model);
        console.log($scope.model);
        console.log(employeeService.employees);
        document.querySelector('.msg-block-success').classList.remove('hidden');
        $location.path('/employeelist');
        setTimeout(() => {
          document.querySelector('.msg-block-success').classList.add('hidden');
          // $location.path('/employeelist');
          // window.location.href =
          //   'http://127.0.0.1:5500/angularjsfinaltest/#!/employeelist';
        }, 1000);
      } else {
        document.querySelector('.msg-block-error').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('.msg-block-error').classList.add('hidden');
        }, 2000);
      }
      /*if (!employeeService.checkData) {
        document.querySelector('.msg-block-error').classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('.msg-block-error').classList.add('hidden');
          // window.location.href =
          //   'http://127.0.0.1:5500/angularjsfinaltest/#!/employeelist';
        }, 1000);
      }*/
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
    .when('/dashboard', {
      templateUrl: './components/dashboardComponents/dashboard.html',
      controller: 'employeeController',
    })
    .when('/employeelist', {
      templateUrl: './components/dashboardComponents/employeeList.html',
      controller: 'employeeController',
    })
    .when('/addemployee', {
      templateUrl: './components/dashboardComponents/addEmployee.html',
      controller: 'addEmployeeController',
    })
    .otherwise({
      redirectTo: '/home',
    });
});
