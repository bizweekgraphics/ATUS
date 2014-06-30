app.directive('checkboxes', [function() {
  return {
    restrict: 'E',
    scope: {
      group: '=group',
      first: '=first'
    },
    templateUrl: 'templates/label.html'
  }
}])