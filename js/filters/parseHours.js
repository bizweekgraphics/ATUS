app.filter('parseHours', function() {
  return function(hours) {
    var minutes = ((hours % 1) * 60).toString()
    minutes = minutes === '0' ? '0' + minutes : minutes
    var hours = parseInt(hours - hours % 1).toString()
    hours = hours.length < 2 ? '0' + hours : hours
    console.log(minutes, hours)
    return '' + hours + ':' + minutes
  }
})