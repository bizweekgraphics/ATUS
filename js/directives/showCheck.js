app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).on('change', {scope: scope, element: element}, function(event) {
          $('.checkbox').attr('disabled', false)
          var element = event.target
          var elClass = $(element).attr('class')
          $('.' + elClass).each(function(index, el) {
            if(!el.checked) {
              $(el).attr('disabled', true)
            }
          })
      })
    }
  }
})