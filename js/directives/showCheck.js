app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('mousedown', function(event) {
        var element = event.target
        var elClass = $(element).attr('class').split(' ')[0]
        $('.' + elClass).attr('checked', false)
      })
      $(element).on('change', function(event) {
          var element = event.target
          var elClass = $(element).attr('class').split(' ')[0]
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
              break;
            case "age":
              $('.day').attr('disabled', true)
              $('.education').attr('disabled', true)
              $('.race').attr('disabled', true)
              $('.average').attr('disabled', true)
              break;
          }

          // $('.' + elClass).each(function(index, el) {
          //   if(!el.checked) {
          //     $(el).attr('disabled', true)
          //   }
          // })
      })
    }
  }
})