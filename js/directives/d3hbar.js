app.directive('d3Barh', ['d3Service', function(d3Service) {

    var margin = {top: 20, right: 20, bottom: 30, left: 175}
    var width = 970 - margin.left - margin.right
    var height = 850 - margin.top - margin.bottom

  return {
    restrict: 'EA', 
    scope: {
      data: '=',
      show: '='
    },
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var y = d3.scale.ordinal()
          .rangeRoundBands([0, height], .1)

        var x1 = d3.scale.ordinal()

        var x = d3.scale.linear()
          .range([0, width])

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          // .ticks(10)


        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")


        var svg = d3.select(element[0])
          .append('svg')
          .attr('id', 'graph')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        scope.$watch('data', function(newVals, oldVals) {
          return scope.update(newVals);
        }, true);

        scope.$watch('show', function() {
          return scope.update(scope.data)
        }, true)

        scope.render = function(data) {
          y.domain(data.map(function(d) { return d.activity; }));
          x.domain([0, 12])

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)



          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)              



          svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
              .style('display', function(d) {
                if(d.name === "ATUS") {
                  // return 'none'
                }
              })
              .attr("class", "bar")
              .attr("x", function(d) {
                return 0
              })
              .attr("width", function(d) {
                return x(d.hours); 
              })
              .attr("y", function(d) { 
                var yVal = d.name === "you" ? y(d.activity) : y(d.activity) + y.rangeBand()/2
                return yVal
              })
              .attr("height", function(d) { 
                return y.rangeBand()/2
              })
              .style("fill", function(d) {
                var color = d.name === "you" ? "blue" : "red"
                return color
              })
        
        svg.selectAll(".d3-tooltip")
           .data(data)
           .enter()
           .append("text")
           .text(function(d) {
            if(d.hours > 0) {
              return d.hours;
            }
           })
           .attr("text-anchor", "middle")
           .attr('class', 'd3-tooltip')
            .attr("y", function(d) {
                var yVal = d.name === "you" ? y(d.activity) : y(d.activity) + y.rangeBand()/1.2
                return yVal
              })
           .attr("x", function(d) {
            return x(d.hours) - 20
           })
           .attr("font-family", "sans-serif") 
           .attr("font-size", "11px")
           .attr("fill", "white")

        }

      scope.update = function(data) {
         svg.selectAll('rect')
            .data(data)
            .transition() 
              .attr("y", function(d) { 
                var yVal = d.name === "you" ? y(d.activity) : y(d.activity) + y.rangeBand()/2
                return yVal
              })
              .attr("width", function(d) {
                return x(d.hours); 
              })
            .style('display', function(d) {
              if(d.name === "ATUS" && !scope.$parent.displayGraph) {
                return 'hidden'
              } 
            })

        svg.selectAll('.d3-tooltip')
          .data(data)
          .transition()
          .text(function(d) {
            if(d.hours > 0) {
              return d.hours;
            }
          })
            .attr("y", function(d) {
                var yVal = d.name === "you" ? y(d.activity) + 20 : y(d.activity) + y.rangeBand()/1.2
                return yVal
              })
         .attr("x", function(d) {
          return x(d.hours) - 20
         })
      }

      
      setTimeout(function() {
        scope.render(scope.data)    
      }, 0)

      })
    }
  }
}])