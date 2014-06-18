app.controller('HomeCtrl', ['$scope', 'd3Service', function($scope, d3Service) {

  function init() {
    $scope.setData()
  }

  $scope.personalCare = 0
  $scope.eating = 0
  $scope.household = 0
  $scope.purchasing = 0

  $scope.setData = function() {
    $scope.testData = [
    {name: "you", activity: "Personal care activites", hours: $scope.personalCare},
    {name: "you", activity: "Eating and drinking", hours: $scope.eating},
    {name: "you", activity: "Household activities", hours: $scope.household},
    {name: "you", activity: "Purchasing goods and services", hours: $scope.purchasing},
    {name: "ATUS", activity: "Personal care activites", hours: 3},

    {name: "ATUS", activity: "Eating and drinking", hours: 2},

    {name: "ATUS", activity: "Household activities", hours: 4},

    {name: "ATUS", activity: "Purchasing goods and services", hours: 6}
    ]
  }

  init()

}])