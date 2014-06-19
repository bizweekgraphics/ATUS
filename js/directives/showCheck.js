app.directive('showCheck', function() {
  return {
    link:function(scope, element) {
      $(element).bind('click', {scope: scope, element: element}, function(event) {
          var element = event.target
          var elClass = $(element).attr('class')
          $('.' + elClass).each(function(el) {
          debugger;
            if(!el.checked) {
              $(el).attr('disabled', true)
            }
          })
      })
    }
  }
})