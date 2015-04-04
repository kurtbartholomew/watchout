// start slingin' some d3 here.
var height = 800;
var width = 800;
var highScore = 0;
var currentScore = 0;
var collisions = 0;
var playerX = 0;
var playerY = 0;
var enemyX = 0;
var enemyY = 0;
var collisionDistance = 30;
var playerRadius = 10;
var enemyRadius = 15;
var position = _.range(12);
var rotation = 0;
var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

var circles = svg.selectAll('circle')
                .data(position)
                .enter()
                .append('circle');

var player = svg.append('circle');

var randomNum = function(dimension){
  return Math.floor(Math.random() * dimension);
}

function rotTween(d) {
    enemy = circles[0][d];
    return "rotate(" + Math.random()*rotation + "," + enemy.cx.animVal.value + "," + enemy.cy.animVal.value + ")";
}

var update = function(){

  svg.selectAll('.enemy')
     .transition().duration(1500)
     .attr("transform", function(d){return rotTween(d)})
     .attr('cx', function(d){ return randomNum(width) })
     .attr('cy', function(d){ return randomNum(height) });
}

var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select('#player').attr("cx", x)
                      .attr("cy", y);
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);

var collision = function(){
  for(var i = 0; i < circles[0].length; i++){
    enemyX = circles[0][i].cx.animVal.value;
    enemyY = circles[0][i].cy.animVal.value;
    playerX = player[0][0].cx.animVal.value;
    playerY = player[0][0].cy.animVal.value;
    if(Math.sqrt(Math.pow(enemyX-playerX, 2) + Math.pow(enemyY-playerY, 2)) < collisionDistance){
      return true;
    }
  }
  return false
}

svg.append('defs')
   .append('pattern')
   .attr('id', 'image')
   .attr('width', enemyRadius * 2)
   .attr('height',enemyRadius * 2)
   .append('image')
   .attr('xlink:href', 'fredstar.png')
   .attr('width', enemyRadius * 2)
   .attr('height', enemyRadius * 2);

circles.attr('cx', function(d){ return randomNum(width-20) })
       .attr('cy', function(d){ return randomNum(height-20) })
       .attr('r', enemyRadius)
       .attr('class', 'enemy')
       .style('fill', 'url(#image)');

player.attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', playerRadius)
    .attr('id', 'player')
    .style('fill', 'yellow')
    .style('stroke', 'black')
    .style('stroke-width', 7)
    .call(drag);

setInterval(update , 1500);

setInterval(function(){
  if(collision()){
    highScore = Math.max(highScore, currentScore);
    currentScore = 0;
    collisions++;
  }
  currentScore++;
  d3.select('.current span').text(currentScore);
  d3.select('.high span').text(highScore);
  d3.select('.collisions span').text(collisions);
}, 50);

setInterval(function() {
  rotation += 15;
}, 150);

