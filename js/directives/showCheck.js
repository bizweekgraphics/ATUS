app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('change', function(event) {

          var disableEl = function(array) {
            array.forEach(function(item) {
              $(item).prop('disabled', true)
            })
          }

          var element = $(event.target)
          var elementVal = element.val()
          var elementId = element.find('option').filter(function(index, item) {
            return $(item).val() === elementVal
          })
          var group = element.attr('class')
          var checkedArray = []
          $('option').each(function(index, item) {
            var optionEl = $(item)
            var allEl = /All/.test(optionEl.text())
            if(!allEl && item.selected === true) {
              var elClass = $(item).parent().attr('class').split(' ')[0]
              checkedArray.push(elClass)
            }
          })

          var elementChecked = /All/.test(elementId) ? false : element.selected

          scope.$parent.updateGraph()
          $('select').attr('disabled', false)
          if(checkedArray.length > 0) {
            checkedArray.forEach(function(elClass) {
              switch(elClass) {
                case "gender":
                  disableEl(['.day', '.education'])
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
                  $('select').attr('disabled', false)
                  break;
              } 
            })
          } else {
            $('select').attr('disabled', false)  
          }  
        $('select').each(function(index, item) {
          item.disabled === true ? $(item).css('opacity', .4) : $(item).css('opacity', 1)
        })
      })
    }
  }
})