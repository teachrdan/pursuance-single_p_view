/* global d3 */
window.d3 = d3
// from "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776
// magic numbers, all in pixels
const height = 750
const width = 1000
let counter = 1

// append the svg object to the page
let svg = d3.select('#canvas').append('svg:svg')
  .attr('height', height)
  .attr('width', width)

const drawPursuance = function () {
  d3.select('#pursuance').remove()
  const pursuanceRadius = parseInt(document.getElementById('pursuance-radius').value)
  svg.append('svg:circle')
    .attr('id', 'pursuance')
    .attr('r', pursuanceRadius)
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('fill', 'red')
}

let createNodes = function (numNodes, OrbitNumber) {
  const firstOrbitRadius = parseInt(document.getElementById('first-orbit-radius').value)
  const distanceBetweenOrbits = parseInt(document.getElementById('distance-between-orbits').value)
  let nodes = []
  let angle
  let x
  let y
  for (let i = 0; i < numNodes; i++) {
    // Calculate the angle at which the element will be placed.
    angle = (i / (numNodes / 2)) * Math.PI
    // Calculate the x position of the element.
    x = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.cos(angle)) + (width / 2)
     // Calculate the y position of the element.
    y = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.sin(angle)) + (height / 2)
    nodes.push({'id': i, 'x': x, 'y': y, 'index': counter})
    counter++
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

    // show the index of each user
    svg.append('text')
      .text(node.index)
      .attr('x', (node.index < 10) ? node.x - 4 : node.x - 8)
      .attr('y', node.y + 4)
  })
}

let draw = function (numNodes, OrbitNumber) {
  let nodes = createNodes(numNodes, OrbitNumber)
  createElements(nodes, OrbitNumber)
}

let drawOrbits = function () {
  d3.selectAll('.node').remove()
  let num = parseInt(document.getElementById('num-users').value)
  let capacities = [2, 8, 10, 14, 18]
  let OrbitNumber = 0

  while (num > 0 && OrbitNumber < 10) {
    let thisShellCapacity = capacities[OrbitNumber] ? capacities[OrbitNumber] : 18 + OrbitNumber * 5
    // in case there are more spaces in this orbit than people to fill it
    let nodesInShell = (thisShellCapacity > num) ? num : thisShellCapacity
    draw(nodesInShell, OrbitNumber, counter)
    num -= thisShellCapacity
    OrbitNumber++
  }
}

drawPursuance()
drawOrbits()

d3.selectAll('.generic-selector')
  .on('input', () => { drawOrbits() })

d3.selectAll('.pursuance-selector')
  .on('input', () => { drawPursuance() })
