app.directive('slider', function() {
        return {
            require: '?ngModel',
            link: function(scope, elem, attrs, ngModel) {
                if(!ngModel) return;
                //slider settings, .noUiSlider is the method to initialize the slider
                $(elem).noUiSlider({
                  start: 0,
                  step: 0.25,
                  connect: 'lower',
                  range: {
                    'min': 0,
                    'max': 12.5
                  }
                }).on('slide', function() {
                  scope.$apply(function() {
                    if($(elem).val() >=12) {
                      var value = 12.00
                      $(elem).val(12.00)
                    } else {
                      var value = $(elem).val()
                    }
                    var right = value == 0 ? -9.5: (value/12) * -70 - 7
                    $(elem).prev().css('right', right + '%')
                    ngModel.$setViewValue(value);
                    scope.$parent.$parent.setData(elem.attr('counter'), $(elem).val())
                    var handle = $(elem).parent().children('.handle')
                    handle.css('left', -right + '%')
                    if(value === 12) {
                      handle.css('border-radius', '0% 50% 50% 0%')
                    } else {
                      handle.css('border-radius', '50%')
                    }
                  })
                })
                .on('set', function() {
                  if($(elem).val() >=12) {
                    var value = 12.00
                    $(elem).val(12.00)
                  } else {
                    var value = $(elem).val()
                  }
                    var right = value == 0 ? -9.5 : (value/12) * -70 - 7
                  $(elem).prev().css('right', right + '%')
                  ngModel.$setViewValue(value);
                  scope.$parent.$parent.setData(elem.attr('counter'), $(elem).val())
                  $(elem).parent().children('.handle').css('left', -right + '%')

                })

                ngModel.$render = function() {
                  elem.val(ngModel.$viewValue || [])
                }
            }
        };
    });


