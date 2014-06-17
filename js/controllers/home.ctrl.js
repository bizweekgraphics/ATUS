app.controller('HomeCtrl', ['$scope', 'd3Service', function($scope, d3Service) {

  function init() {
    $scope.test()
  }

  $scope.personalCare = 9.49
  $scope.eating = 1.25
  $scope.household = 1.74
  $scope.purchasing = 0.72

  $scope.test = function() {
    $scope.testData = [
    {activity: "Personal care activites", hours: $scope.personalCare},
    {activity: "Eating and drinking", hours: $scope.eating},
    {activity: "Household activities", hours: $scope.household},
    {activity: "Purchasing goods and services", hours: $scope.purchasing}
    ]
  }

  init()

}])