app.directive('checkboxes', [function() {
  return {
    restrict: 'E',
    scope: {
      group: '=group',
    },
    templateUrl: 'templates/label.html'
  }
}])