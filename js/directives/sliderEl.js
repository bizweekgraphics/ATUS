app.directive('slider', [function() {
  return {
    restrict: 'E',
    scope: {
      data: '=data',
      activity: '=activity',
      updateImg: '&'
    },
    templateUrl: 'templates/slider.html',
    link: function(scope, element, attrs) {
      scope.updateImg = function(event, datum) {
        var img = datum.counter
        $('#clockman-img').attr('src', 'img/' + img + '.png')
      }
    }
  }
}])