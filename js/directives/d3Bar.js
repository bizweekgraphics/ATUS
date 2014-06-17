app.directive('d3Bar', ['d3Service', function(d3Service) {

    var margin = {top: 20, right: 20, bottom: 30, left: 40}
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom

  return {
    restrict: 'EA', 
    scope: {
      data: '='
    },
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1)

        var y = d3.scale.linear()
          .domain([0, .1])
          .range([height, 0])

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10)

        var svg = d3.select(element[0])
          .append('svg')
          .attr('id', 'graph')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        scope.$watch('data', function(newVals, oldVals) {
          return scope.render(newVals);
        }, true);

        scope.render = function(data) {
          svg.selectAll('*').remove();


          x.domain(data.map(function(d) { return d.activity; }));
          y.domain([0, 24])

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Hours");

          svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) {
               return x(d.activity); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.hours); })
              .attr("height", function(d) { return height - y(d.hours); })


        }

      scope.render(scope.data)
      })
    }
  }
}])