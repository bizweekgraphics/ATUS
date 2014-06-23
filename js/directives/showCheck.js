app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('click', function(event) {

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
          $('.radio').attr('disabled', false)
          if(checkedArray.length > 0) {
            checkedArray.forEach(function(elClass) {
              switch(elClass) {
                case "average":
                  $('.day').attr('disabled', true)
                  $('.education').attr('disabled', true)
                  $('.race').attr('disabled', true)
                  $('.age').attr('disabled', true)
                  $('.gender').attr('disabled', true)
                  break;
                case "gender":
                  $('.day').attr('disabled', true)
                  $('.education').attr('disabled', true)
                  $('.average').attr('disabled', true)
                  break;
                case "day":
                  $('.average').attr('disabled', true)
                  $('.education').attr('disabled', true)
                  $('.race').attr('disabled', true)
                  $('.age').attr('disabled', true)
                  $('.gender').attr('disabled', true)
                  break;
                case "race":
                  $('.day').attr('disabled', true)
                  $('.education').attr('disabled', true)
                  $('.age').attr('disabled', true)
                  $('.average').attr('disabled', true)
                  break;
                case "education":
                  $('.day').attr('disabled', true)
                  $('.race').attr('disabled', true)
                  $('.gender').attr('disabled', true)
                  $('.average').attr('disabled', true)
                  $('.age').attr('disabled', true)
                  break;
                case "age":
                  $('.day').attr('disabled', true)
                  $('.education').attr('disabled', true)
                  $('.race').attr('disabled', true)
                  $('.average').attr('disabled', true)
                  break;
               default:
                  $('.radio-input').attr('disabled', false)
                  break;
              } 
            })
          } else {
            $('.radio-input').attr('disabled', false)  
          }  
        $('.radio').each(function(index, item) {
          if(item.disabled) {
            $(item).parent().css('opacity', .2)
          } else {
            $(item).parent().css('opacity', 1)
          }
        })
      })
    }
  }
})