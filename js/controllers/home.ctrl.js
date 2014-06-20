app.controller('HomeCtrl', ['$scope', 'd3Service', '$http', function($scope, d3Service, $http) {

  $scope.activity = 0
  $scope.set0 = 0
  $scope.set1 = 0
  $scope.set2 = 0
  $scope.set3 = 0
  $scope.set4 = 0
  $scope.set5 = 0
  $scope.set6 = 0
  $scope.set7 = 0
  $scope.set8 = 0
  $scope.set9 = 0
  $scope.set10 = 0
  $scope.set11 = 0

  function init() {
    $scope.setData()
  }

  $scope.totalHours = 0

  $scope.checkHours = function() {
    return $scope.totalHours === 24
  }

  $scope.displayGraph = false
  $scope.showGraph = function() {
    $('.average').attr('checked', true)
    $scope.displayGraph = true

  }

  $scope.showCheck = function(event) {
    debugger;
  }

  $scope.setData = function(elemCounter, value) {
    $scope[elemCounter] = parseFloat(value)

    $scope.personalData = [
      {"name":"you","activity":"Personal care activities","hours": $scope.set0,"counter":"set0"},
      {"name":"you","activity":"Eating and drinking","hours": $scope.set1,"counter":"set1"},
      {"name":"you","activity":"Household activities","hours": $scope.set2,"counter":"set2"},
      {"name":"you","activity":"Purchasing goods and services","hours": $scope.set3,"counter":"set3"},
      {"name":"you","activity":"Caring for and helping household members","hours": $scope.set4,"counter":"set4"},
      {"name":"you","activity":"Caring for and helping non-household members","hours": $scope.set5,"counter":"set5"},
      {"name":"you","activity":"Working and work-related activities","hours": $scope.set6,"counter":"set6"},
      {"name":"you","activity":"Educational activities","hours": $scope.set7,"counter":"set7"},
      {"name":"you","activity":"Organizational civic and religious activities","hours": $scope.set8,"counter":"set8"},
      {"name":"you","activity":"Leisure and sports","hours": $scope.set9,"counter":"set9"},
      {"name":"you","activity":"Telephone calls mail and email","hours": $scope.set10,"counter":"set1 $scope.set0"},
      {"name":"you","activity":"Other activities not elsewhere classified","hours": $scope.set11,"counter":"set11"}
    ]

    $scope.totalHours = $scope.set0 + $scope.set1 + $scope.set2 + $scope.set3 + $scope.set4 + $scope.set5 + $scope.set6 + $scope.set7 + $scope.set8 + $scope.set9 + $scope.set10 + $scope.set11
    
    $scope.testData = $scope.averageData.concat($scope.personalData)
  }

  $scope.filterGraph = function(group) {
    $http.get('/data/updateddata.json')
    .then(function(res) {
      $scope.averageData = []
      $scope.personalData = []
      counter = 0
      angular.forEach(res.data, function(obj) {
        var counterVal = "set" + counter
        counter += 1
        $scope.averageData.push({name: "ATUS", activity: obj.activity, hours: obj[group], counter: counterVal, nested: obj.nested})
        $scope.personalData.push({name: "you", activity: obj.activity, hours: 0, counter: counterVal})
      })
      init()
    })
  }

  $scope.filterGraph('average hours total')

  $http.get('/data/categories.json')
    .then(function(res) {
      $scope.checkboxArray = res.data
    })




}])





























