app.controller('HomeCtrl', ['$scope', 'd3Service', '$http', function($scope, d3Service, $http) {

  function init() {
    $scope.setData()
  }

  $scope.personalCare = 0
  $scope.eating = 0
  $scope.household = 0
  $scope.purchasing = 0

  $scope.setData = function() {
    // $scope.testData = [
    // {name: "you", activity: "Personal care activites", hours: $scope.personalCare},
    // {name: "you", activity: "Eating and drinking", hours: $scope.eating},
    // {name: "you", activity: "Household activities", hours: $scope.household},
    // {name: "you", activity: "Purchasing goods and services", hours: $scope.purchasing}
    // ]
    $scope.testData = $scope.averageData.concat($scope.personalData)
  }

  $http.get('/data/data.json')
    .then(function(res) {
      $scope.averageData = []
      $scope.personalData = []
      angular.forEach(res.data[0], function(value, key) {
        $scope.averageData.push({name: "ATUS", activity: key, hours: value[0]["average hours total"]})
        $scope.personalData.push({name: "you", activity: key, hours: 0})
      })
      init()
    })

}])