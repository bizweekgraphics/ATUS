app.directive('checkboxes', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '=item',
    },
    templateUrl: 'templates/label.html'
  }
}])