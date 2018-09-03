window.d3 = d3
// from "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776
// magic numbers, all in pixels
let distanceBetweenShells = 30
const height = 750
const width = 1000

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

let createNodes = function (numNodes, shellNumber) {
  const firstShellRadius = parseInt(document.getElementById('first-orbit-radius').value)
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
    let thisShellCapacity = capacities[shellNumber] ? capacities[shellNumber] : 18 + shellNumber * 5
    // in case there are more spaces in this orbit than people to fill it
    let nodesInShell = (thisShellCapacity > num) ? num : thisShellCapacity
    draw(nodesInShell, shellNumber)
    num -= thisShellCapacity
    shellNumber++
  }
}

drawPursuance()
drawOrbits()

d3.selectAll('.generic-selector')
  .on('input', () => { drawOrbits() })

d3.selectAll('.pursuance-selector')
  .on('input', () => { drawPursuance() })
