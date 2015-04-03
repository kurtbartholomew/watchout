// start slingin' some d3 here.
var height = 400;
var width = 800;

var randomNum = function(dimension){
  return Math.floor(Math.random() * dimension);
}

var update = function(){
  svg.selectAll('.enemy')
     .transition()
     .duration(1500)
     .attr('cx', function(d){ return randomNum(width-20) })
     .attr('cy', function(d){ return randomNum(height-20) });
}

var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var position = _.range(10);

var circles = svg.selectAll('circle')
                .data(position)
                .enter()
                .append('circle');

var user = svg.append('circle');

circles.attr('cx', function(d){ return randomNum(width-20) })
       .attr('cy', function(d){ return randomNum(height-20) })
       .attr('r', 20)
       .attr('class', 'enemy')
       .style('fill', 'red');

user.attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 10)
    .attr('class', 'player')
    .style('fill', 'yellow')
    .style('stroke', 'black')
    .style('stroke-width', 7);

setInterval(update , 1000);


