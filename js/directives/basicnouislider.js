app.directive('basicslider', function() {
        return {
            link: function(scope, elem, attrs, ngModel) {
              debugger;
                //slider settings, .noUiSlider is the method to initialize the slider
                $(elem).noUiSlider({
                  start: 0,
                  step: 0.25,
                  connect: 'lower',
                  range: {
                    'min': 0,
                    'max': 12.5
                  }
                })
            }
        };
    });


