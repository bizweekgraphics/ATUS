app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('click', function(event) {

          var disableEl = function(array) {
            array.forEach(function(item) {
              $(item).attr('disabled', true)
            })
          }

          var element = event.target
          var checkedArray = []
          $('.radio-input').each(function(index, item) {
            var radioEl = $(item)
            if(!/All/.test(radioEl.attr('id')) && item.checked === true) {
              checkedArray.push($(item).attr('class').split(' ')[0])
            }
          })
          if(/All/.test($(element).attr('id'))) {
            var elementChecked = false
          } else {
            var elementChecked = element.checked          
          }
          scope.$parent.$parent.updateGraph()
          $('.radio-input').attr('disabled', false)
          if(checkedArray.length > 0) {
            checkedArray.forEach(function(elClass) {
              switch(elClass) {
                case "gender":
                  disableEl(['.day', '.education', '.average'])
                  break;
                case "day":
                  disableEl(['.education', '.race', '.age', '.gender'])
                  break;
                case "race":
                  disableEl(['.day', '.education', '.age'])
                  break;
                case "education":
                  disableEl(['.day', '.race', '.gender', '.age'])
                  break;
                case "age":
                  disableEl(['.day', '.education', '.race'])
                  break;
               default:
                  $('.radio-input').attr('disabled', false)
                  break;
              } 
            })
          } else {
            $('.radio-input').attr('disabled', false)  
          }  
        $('.radio-input').each(function(index, item) {
          if(item.disabled) {
            $(item).parent().css('opacity', .4)
          } else {
            $(item).parent().css('opacity', 1)
          }
        })
      })
    }
  }
})