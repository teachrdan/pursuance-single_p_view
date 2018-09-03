const d3 = require('d3')
window.d3 = d3
// from "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776
// magic numbers, all in pixels
let pursuanceRadius = parseInt(document.getElementById('pursuance-radius').value) || 75
let distanceBetweenShells = 30
const height = 750
let firstShellRadius = 100
const width = 1000

// append the svg object to the page
let svg = d3.select('#canvas').append('svg:svg')
  .attr('height', height)
  .attr('width', width)

svg.append('svg:circle')
  .attr('r', pursuanceRadius)
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('fill', 'red')

let createNodes = function (numNodes, shellNumber) {
  let nodes = []
  let angle
  let x
  let y
  for (let i = 0; i < numNodes; i++) {
    // Calculate the angle at which the element will be placed.
    angle = (i / (numNodes / 2)) * Math.PI
    // Calculate the x position of the element.
    x = ((firstShellRadius + (distanceBetweenShells * shellNumber)) * Math.cos(angle)) + (width / 2)
     // Calculate the y position of the element.
    y = ((firstShellRadius + (distanceBetweenShells * shellNumber)) * Math.sin(angle)) + (height / 2)
    nodes.push({'id': i, 'x': x, 'y': y})
  }
  return nodes
}

let createElements = function (nodes) {
  let nodeRadius = parseInt(document.getElementById('user-radius').value)
  nodes.forEach(node => {
    svg.append('svg:circle')
    .attr('cx', node.x)
    .attr('cy', node.y)
    .attr('fill', 'steelblue')
    .attr('class', 'node')
    .attr('r', nodeRadius)
  })
}

let draw = function (numNodes, shellNumber) {
  let nodes = createNodes(numNodes, shellNumber)
  createElements(nodes, shellNumber)
}

let drawOrbits = function () {
  d3.selectAll('.node').remove()
  num = parseInt(document.getElementById('num-users').value)
  let capacities = [2, 8, 10, 14, 18]
  let shellNumber = 0

  while (num > 0 && shellNumber < 10) {
    let thisShellCapacity = capacities[shellNumber] ? capacities[shellNumber] : 5 * shellNumber
    let numNodes = (thisShellCapacity > num) ? thisShellCapacity : num
    draw(numNodes, shellNumber)
    num -= thisShellCapacity
    shellNumber++
  }
}

drawOrbits()

d3.selectAll('.selector')
  .on('input', function() {
    console.log("here");
    drawOrbits()
  })
