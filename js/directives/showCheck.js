app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('click', {scope: scope}, function(event) {
          var element = event.target
          var elementChecked = element.checked
          var elClass = $(element).attr('class').split(' ')[0]
          $('.' + elClass).attr('checked', false)
          element.checked = elementChecked
          scope.$parent.updateGraph()
          switch(elClass) {
            case "average":
              $('.day').attr('disabled', elementChecked)
              $('.education').attr('disabled', elementChecked)
              $('.race').attr('disabled', elementChecked)
              $('.age').attr('disabled', elementChecked)
              $('.gender').attr('disabled', elementChecked)
              break;
            case "gender":
              $('.day').attr('disabled', elementChecked)
              $('.education').attr('disabled', elementChecked)
              $('.average').attr('disabled', elementChecked)
              break;
            case "race":
              $('.day').attr('disabled', elementChecked)
              $('.education').attr('disabled', elementChecked)
              $('.age').attr('disabled', elementChecked)
              $('.average').attr('disabled', elementChecked)
              break;
            case "education":
              $('.day').attr('disabled', elementChecked)
              $('.race').attr('disabled', elementChecked)
              $('.gender').attr('disabled', elementChecked)
              $('.average').attr('disabled', elementChecked)
              $('.age').attr('disabled', elementChecked)
              break;
            case "age":
              $('.day').attr('disabled', elementChecked)
              $('.education').attr('disabled', elementChecked)
              $('.race').attr('disabled', elementChecked)
              $('.average').attr('disabled', elementChecked)
              break;
          }
      })
    }
  }
})