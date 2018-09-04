/* global d3 */
window.d3 = d3
// from "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776

let counter
// magic numbers
const maxFirstOrbit = 8
let defaultCapacities = [2, 8, 10, 14, 18] // number of users per orbit
let highCapacities = [8, 14, 24, 36, 50] // number of users per orbit
const height = 750 // pixels
const width = 1000 // pixels
const pOpacity = 0.8
const uOpacity = 0.8

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
    .attr('opacity', pOpacity)
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
    .attr('opacity', uOpacity)

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
  d3.selectAll('text').remove()
  let OrbitNumber = 0
  let num = parseInt(document.getElementById('num-users').value)
  let density = d3.select('input[name="density"]:checked').node().value
  const capacities = (density === 'high') ? highCapacities : defaultCapacities
  counter = 1

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

d3.selectAll('.orbit-density')
  .on('input', () => {
    drawOrbits()
  })
