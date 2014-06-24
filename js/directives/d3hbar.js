app.directive('d3Barh', ['d3Service', function(d3Service) {

    var margin = {top: 20, right: 20, bottom: 55, left: 175}
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


      var legend = svg.selectAll('.legend')
          .data([data[23], data[0]])
          .enter()
        .append('g')
          .attr('class', 'legend');
        
      legend.append('rect')
          .attr('x', function(d, i) {
            return (width - (100 * i)) - 50
          })
          .attr('y', -20)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', function(d) { 
            return d.name === "you" ? 'blue' : 'red'
          });
          
      legend.append('text')
          .attr('x', function(d, i) {
            return (width - (100 * i)) - 30
          })
          .attr('y', -10)
          .text(function(d){
            return d.name === "you" ? "You" : "Average"
          });
      }



      scope.update = function(data) {

        var addFooter = function() {
          d3.select('svg')
          .append('text')
          .attr('class', 'footer')
          .attr('x', width - 475)
          .attr('y', 840)
          .text('*Estimate is suppressed because it does not meet the American Time Use Survey publication standards')
        }

        var removeFooter = function() {
          d3.select('.footer').remove()
        }

        removeFooter()

        d3.selectAll('.y text')
          .data(data)
          .text(function(d) {
            if(d.hours === null) {
              addFooter()
              return d.activity + '*'
            } else {
              return d.activity
            }
          }) 


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
            return d.name === "you" ? y(d.activity) + 20 : y(d.activity) + y.rangeBand()/1.2
          })
         .attr("x", function(d) {
          return x(d.hours) - 20
         })

         d3.selectAll(".y text")
         .style("text-anchor", "middle")
         .attr('dx', '-6em')
         .call(wrap, 160)

      }

      
      setTimeout(function() {
        scope.render(scope.data)    
      }, 0)

      function wrap(text, width) {
        console.log('wrap')
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").attr('dx', '-6em').text(word);
            }
          }
        });
      }

      })
    }
  }
}])

