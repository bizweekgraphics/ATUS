app.directive('slider', function() {
        return {
            require: '?ngModel',
            link: function(scope, elem, attrs, ngModel) {
                if(!ngModel) return;
                //slider settings, .noUiSlider is the method to initialize the slider
                $(elem).noUiSlider({
                  start: 0,
                  step: 0.25,
                  range: {
                    'min': 0,
                    'max': 24
                  }
                }).on('slide', function() {
                  console.log('here')
                  scope.$apply(function() {
                    var value = $(elem).val()
                    ngModel.$setViewValue(value);
                    scope.setData(elem.attr('counter'), $(elem).val())
                  })
                })

                ngModel.$render = function() {
                  elem.val(ngModel.$viewValue || [])
                }
            }
        };
    });