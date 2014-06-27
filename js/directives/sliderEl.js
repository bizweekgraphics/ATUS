app.directive('slider', [function() {
  return {
    restrict: 'E',
    scope: {
      data: '=data',
      activity: '=activity',
    },
    templateUrl: 'templates/slider.html'
  }
}])