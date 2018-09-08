/* global d3 */
window.d3 = d3
// based loosely on "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776
let counter = 0
// magic numbers
let lowCapacities = [6, 10, 18, 28, 40] // number of users per orbit--102 total
let highCapacities = [8, 14, 24, 36, 50] // number of users per orbit--132 total
const height = 750 // pixels
const width = 1000 // pixels
const pOpacity = 0.8 // pursuance opacity, out of 1
const uOpacity = 0.7 // user opacity, out of 1
let nodeUsers = []
let users = [{'id': '98pUF3', 'daysOld': 91, 'isAdmin': false, 'firstName': 'Louie', 'lastName': 'Rybak', 'pointsTodo': 6, 'pointsDone': 46, 'portrait': '0.jpg'}, {'id': 'fS8YKJ', 'daysOld': 15, 'isAdmin': false, 'firstName': 'Lilliam', 'lastName': 'Mcduffee', 'pointsTodo': 7, 'pointsDone': 22, 'portrait': '1.jpg'}, {'id': 'bmUNwF', 'daysOld': 91, 'isAdmin': false, 'firstName': 'Denna', 'lastName': 'Ostrow', 'pointsTodo': 9, 'pointsDone': 76, 'portrait': '2.jpg'}, {'id': 'X2d2tt', 'daysOld': 6, 'isAdmin': false, 'firstName': 'Fernande', 'lastName': 'Wrench', 'pointsTodo': 1, 'pointsDone': 46, 'portrait': '3.jpg'}, {'id': 'WuWvKs', 'daysOld': 80, 'isAdmin': false, 'firstName': 'Teena', 'lastName': 'Sasaki', 'pointsTodo': 9, 'pointsDone': 4, 'portrait': '4.jpg'}, {'id': 'F9xbRW', 'daysOld': 64, 'isAdmin': true, 'firstName': 'Raelene', 'lastName': 'Belair', 'pointsTodo': 2, 'pointsDone': 64, 'portrait': '5.jpg'}, {'id': 'RVaAFW', 'daysOld': 15, 'isAdmin': false, 'firstName': 'Rusty', 'lastName': 'Curiel', 'pointsTodo': 3, 'pointsDone': 78, 'portrait': '6.jpg'}, {'id': 'SqMG6g', 'daysOld': 92, 'isAdmin': false, 'firstName': 'Myriam', 'lastName': 'Clutter', 'pointsTodo': 6, 'pointsDone': 63, 'portrait': '7.jpg'}, {'id': 'AxNwY5', 'daysOld': 40, 'isAdmin': false, 'firstName': 'Mariana', 'lastName': 'Clutter', 'pointsTodo': 6, 'pointsDone': 67, 'portrait': '8.jpg'}, {'id': '9Nv2dn', 'daysOld': 46, 'isAdmin': false, 'firstName': 'Babette', 'lastName': 'Tinner', 'pointsTodo': 9, 'pointsDone': 64, 'portrait': '9.jpg'}, {'id': '8bbUr1', 'daysOld': 84, 'isAdmin': true, 'firstName': 'Myriam', 'lastName': 'Shoffner', 'pointsTodo': 4, 'pointsDone': 84, 'portrait': '10.jpg'}, {'id': 'm7j8vZ', 'daysOld': 97, 'isAdmin': false, 'firstName': 'Theressa', 'lastName': 'Beamer', 'pointsTodo': 8, 'pointsDone': 54, 'portrait': '11.jpg'}, {'id': 'DmC5HF', 'daysOld': 33, 'isAdmin': false, 'firstName': 'Nicol', 'lastName': 'Linkous', 'pointsTodo': 0, 'pointsDone': 77, 'portrait': '12.jpg'}, {'id': '69DRHh', 'daysOld': 36, 'isAdmin': false, 'firstName': 'Pearle', 'lastName': 'Ostrow', 'pointsTodo': 1, 'pointsDone': 59, 'portrait': '13.jpg'}, {'id': 'FWHPxD', 'daysOld': 32, 'isAdmin': false, 'firstName': 'Luetta', 'lastName': 'Bramblett', 'pointsTodo': 9, 'pointsDone': 8, 'portrait': '14.jpg'}, {'id': '546NQE', 'daysOld': 97, 'isAdmin': true, 'firstName': 'Rodney', 'lastName': 'Pippins', 'pointsTodo': 9, 'pointsDone': 0, 'portrait': '15.jpg'}, {'id': 'X6Xzbj', 'daysOld': 87, 'isAdmin': false, 'firstName': 'Soon', 'lastName': 'Rybak', 'pointsTodo': 9, 'pointsDone': 52, 'portrait': '16.jpg'}, {'id': 'GWB3gF', 'daysOld': 67, 'isAdmin': false, 'firstName': 'Sarita', 'lastName': 'Rybak', 'pointsTodo': 6, 'pointsDone': 25, 'portrait': '17.jpg'}, {'id': 'hDudYP', 'daysOld': 5, 'isAdmin': false, 'firstName': 'Dede', 'lastName': 'Clutter', 'pointsTodo': 7, 'pointsDone': 76, 'portrait': '18.jpg'}, {'id': 's1Fxvh', 'daysOld': 59, 'isAdmin': false, 'firstName': 'Kaye', 'lastName': 'Heilman', 'pointsTodo': 9, 'pointsDone': 12, 'portrait': '19.jpg'}, {'id': 'GhQFyM', 'daysOld': 19, 'isAdmin': false, 'firstName': 'Barabara', 'lastName': 'Zinn', 'pointsTodo': 7, 'pointsDone': 58, 'portrait': '20.jpg'}, {'id': '0hr4cd', 'daysOld': 48, 'isAdmin': false, 'firstName': 'Rusty', 'lastName': 'Cambre', 'pointsTodo': 7, 'pointsDone': 58, 'portrait': '21.jpg'}, {'id': 'vnAH7D', 'daysOld': 58, 'isAdmin': false, 'firstName': 'Denna', 'lastName': 'Mcduffee', 'pointsTodo': 2, 'pointsDone': 51, 'portrait': '22.jpg'}, {'id': 'a2pyC8', 'daysOld': 8, 'isAdmin': false, 'firstName': 'Cinda', 'lastName': 'Kirsch', 'pointsTodo': 1, 'pointsDone': 42, 'portrait': '23.jpg'}, {'id': 'P7Xkrp', 'daysOld': 96, 'isAdmin': false, 'firstName': 'Georgene', 'lastName': 'Rogge', 'pointsTodo': 0, 'pointsDone': 1, 'portrait': '24.jpg'}, {'id': 'tsK2Jw', 'daysOld': 14, 'isAdmin': false, 'firstName': 'Lacy', 'lastName': 'Kirsch', 'pointsTodo': 0, 'pointsDone': 75, 'portrait': '25.jpg'}, {'id': 'MBzJGN', 'daysOld': 62, 'isAdmin': false, 'firstName': 'Lilliam', 'lastName': 'Tremper', 'pointsTodo': 2, 'pointsDone': 57, 'portrait': '26.jpg'}, {'id': 'AHdFNt', 'daysOld': 72, 'isAdmin': false, 'firstName': 'Rusty', 'lastName': 'Eury', 'pointsTodo': 8, 'pointsDone': 67, 'portrait': '27.jpg'}, {'id': 'vNAgwd', 'daysOld': 74, 'isAdmin': false, 'firstName': 'Charleen', 'lastName': 'Wrench', 'pointsTodo': 4, 'pointsDone': 49, 'portrait': '28.jpg'}, {'id': 'e3BVRt', 'daysOld': 70, 'isAdmin': false, 'firstName': 'Lilliam', 'lastName': 'Rohrbaugh', 'pointsTodo': 6, 'pointsDone': 21, 'portrait': '29.jpg'}, {'id': 'r2kZww', 'daysOld': 15, 'isAdmin': false, 'firstName': 'Theressa', 'lastName': 'Kirsch', 'pointsTodo': 3, 'pointsDone': 32, 'portrait': '30.jpg'}, {'id': 'JpY3BZ', 'daysOld': 24, 'isAdmin': false, 'firstName': 'Mariana', 'lastName': 'Beamer', 'pointsTodo': 3, 'pointsDone': 54, 'portrait': '31.jpg'}, {'id': 'QFh4f4', 'daysOld': 79, 'isAdmin': false, 'firstName': 'Ellan', 'lastName': 'Dustin', 'pointsTodo': 9, 'pointsDone': 89, 'portrait': '32.jpg'}, {'id': 'WNhCcx', 'daysOld': 56, 'isAdmin': false, 'firstName': 'Charleen', 'lastName': 'Sluder', 'pointsTodo': 9, 'pointsDone': 83, 'portrait': '33.jpg'}, {'id': 'NwXBTp', 'daysOld': 95, 'isAdmin': false, 'firstName': 'Luetta', 'lastName': 'Kearley', 'pointsTodo': 3, 'pointsDone': 96, 'portrait': '34.jpg'}, {'id': 'tTJTmV', 'daysOld': 96, 'isAdmin': false, 'firstName': 'Myriam', 'lastName': 'Linkous', 'pointsTodo': 5, 'pointsDone': 40, 'portrait': '35.jpg'}, {'id': 'MHVqA6', 'daysOld': 25, 'isAdmin': true, 'firstName': 'Trudi', 'lastName': 'Kamerer', 'pointsTodo': 8, 'pointsDone': 21, 'portrait': '36.jpg'}, {'id': 'W46D7v', 'daysOld': 43, 'isAdmin': true, 'firstName': 'Rodney', 'lastName': 'Mccullough', 'pointsTodo': 2, 'pointsDone': 2, 'portrait': '37.jpg'}, {'id': 'KRpAGT', 'daysOld': 50, 'isAdmin': false, 'firstName': 'Babette', 'lastName': 'Dustin', 'pointsTodo': 6, 'pointsDone': 83, 'portrait': '38.jpg'}, {'id': 'FE0Vqu', 'daysOld': 5, 'isAdmin': false, 'firstName': 'Derrick', 'lastName': 'Musser', 'pointsTodo': 2, 'pointsDone': 56, 'portrait': '39.jpg'}, {'id': 'PJQeK1', 'daysOld': 74, 'isAdmin': false, 'firstName': 'Kaye', 'lastName': 'Brodsky', 'pointsTodo': 1, 'pointsDone': 77, 'portrait': '40.jpg'}, {'id': 'Vtx557', 'daysOld': 15, 'isAdmin': false, 'firstName': 'Lianne', 'lastName': 'Heilman', 'pointsTodo': 1, 'pointsDone': 39, 'portrait': '41.jpg'}, {'id': 'w7r0C0', 'daysOld': 80, 'isAdmin': true, 'firstName': 'Jasmin', 'lastName': 'Mccullough', 'pointsTodo': 1, 'pointsDone': 10, 'portrait': '42.jpg'}, {'id': 'D5AcCQ', 'daysOld': 23, 'isAdmin': false, 'firstName': 'Dovie', 'lastName': 'Heilman', 'pointsTodo': 0, 'pointsDone': 75, 'portrait': '43.jpg'}, {'id': 'KQ5rNn', 'daysOld': 24, 'isAdmin': false, 'firstName': 'Babette', 'lastName': 'Clutter', 'pointsTodo': 8, 'pointsDone': 65, 'portrait': '44.jpg'}, {'id': 'KGjp7n', 'daysOld': 54, 'isAdmin': false, 'firstName': 'Mariana', 'lastName': 'Threadgill', 'pointsTodo': 4, 'pointsDone': 50, 'portrait': '45.jpg'}, {'id': 'CdMUtX', 'daysOld': 12, 'isAdmin': false, 'firstName': 'Ellan', 'lastName': 'Belair', 'pointsTodo': 2, 'pointsDone': 19, 'portrait': '46.jpg'}, {'id': 'wpFpE0', 'daysOld': 60, 'isAdmin': true, 'firstName': 'Derrick', 'lastName': 'Delahoussaye', 'pointsTodo': 1, 'pointsDone': 16, 'portrait': '47.jpg'}, {'id': 'r8V3aP', 'daysOld': 47, 'isAdmin': true, 'firstName': 'Theressa', 'lastName': 'Sasaki', 'pointsTodo': 1, 'pointsDone': 53, 'portrait': '48.jpg'}, {'id': 'ysUjzx', 'daysOld': 30, 'isAdmin': false, 'firstName': 'Lillia', 'lastName': 'Hutchison', 'pointsTodo': 5, 'pointsDone': 64, 'portrait': '49.jpg'}, {'id': '7YkPV9', 'daysOld': 75, 'isAdmin': false, 'firstName': 'Hye', 'lastName': 'Weidman', 'pointsTodo': 6, 'pointsDone': 68, 'portrait': '50.jpg'}, {'id': 'Bxzng8', 'daysOld': 29, 'isAdmin': true, 'firstName': 'Pearle', 'lastName': 'Shoffner', 'pointsTodo': 0, 'pointsDone': 29, 'portrait': '51.jpg'}, {'id': 'yvzS2y', 'daysOld': 25, 'isAdmin': false, 'firstName': 'Cinda', 'lastName': 'Mcduffee', 'pointsTodo': 8, 'pointsDone': 21, 'portrait': '52.jpg'}, {'id': 'JnYfnY', 'daysOld': 5, 'isAdmin': false, 'firstName': 'Hye', 'lastName': 'Rohrbaugh', 'pointsTodo': 9, 'pointsDone': 51, 'portrait': '53.jpg'}, {'id': 'wDRgwV', 'daysOld': 28, 'isAdmin': false, 'firstName': 'Francine', 'lastName': 'Brodsky', 'pointsTodo': 6, 'pointsDone': 34, 'portrait': '54.jpg'}, {'id': 'PMpW90', 'daysOld': 21, 'isAdmin': true, 'firstName': 'Louie', 'lastName': 'Ines', 'pointsTodo': 3, 'pointsDone': 26, 'portrait': '55.jpg'}, {'id': 'SKBDEh', 'daysOld': 91, 'isAdmin': true, 'firstName': 'Dede', 'lastName': 'Wilkes', 'pointsTodo': 9, 'pointsDone': 44, 'portrait': '56.jpg'}, {'id': 'rDPmWy', 'daysOld': 15, 'isAdmin': false, 'firstName': 'Lilliam', 'lastName': 'Terrio', 'pointsTodo': 0, 'pointsDone': 18, 'portrait': '57.jpg'}, {'id': 'PAbRgH', 'daysOld': 70, 'isAdmin': false, 'firstName': 'Nicol', 'lastName': 'Mcduffee', 'pointsTodo': 6, 'pointsDone': 51, 'portrait': '58.jpg'}, {'id': 'dBf3KG', 'daysOld': 79, 'isAdmin': true, 'firstName': 'Myriam', 'lastName': 'Korb', 'pointsTodo': 2, 'pointsDone': 86, 'portrait': '59.jpg'}]

let bio = 'Lorem ipsum dolor amet chicharrones af occupy truffaut mlkshk succulents intelligentsia Adaptogen master cleanse helvetica raclette Neutra cred lo-fi flexitarian Cred XOXO woke tacos meditation drinking vinegar vegan put a bird on it jean shorts etsy poke man braid af master cleanse Meggings street art VHS pop-up ramps woke kinfolk Paleo air plant bespoke blog heirloom ramps coloring book selvage tbh affogato selfies single-origin coffee viral taiyaki hoodie messenger bag actually heirloom Ramps gluten-free heirloom scenester authentic messenger bag forage slow-carb meh irony pabst heirloom hammock brunch sartorial distillery seitan.'

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

  svg.append('text')
    .text('Sample Pursuance')
    .attr('x', width / 2 - pursuanceRadius + 14)
    .attr('y', height / 2 + 6)
}

let createNodes = function (numNodes, OrbitNumber) {
  const firstOrbitRadius = parseInt(document.getElementById('first-orbit-radius').value)
  const distanceBetweenOrbits = parseInt(document.getElementById('distance-between-orbits').value)
  let nodes = []
  let angle
  for (let i = 0; i < numNodes; i++) {
    const user = nodeUsers[counter]
    // Calculate the angle at which the element will be placed.
    angle = (i / (numNodes / 2)) * Math.PI
    // Calculate the x position of the element.
    user.x = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.cos(angle)) + (width / 2)
     // Calculate the y position of the element.
    user.y = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.sin(angle)) + (height / 2)
    user.index = counter
    nodes.push(user)
    counter++
  }
  return nodes
}

let createElements = function (nodes) {
  // TODO draw the orbits
  let nodeRadius = parseInt(document.getElementById('user-radius').value)
  nodes.forEach(node => {
    node.fill = node.isAdmin ? 'red' : 'steelblue'
    svg.append('svg:circle')
      .attr('id', 'user' + node.id)
      .attr('cx', node.x)
      .attr('cy', node.y)
      .attr('fill', node.fill)
      .attr('class', 'node')
      .attr('r', nodeRadius)
      .attr('opacity', uOpacity)
      .datum({ node: node })

    // show the index of each user
    svg.append('text')
      .attr('class', 'user-text')
      .text(node.index)
      .attr('x', (node.index < 10) ? node.x - 4 : node.x - 8)
      .attr('y', node.y + 4)
      .style('pointer-events', 'none')

    // show the name of each user
    svg.append('text')
      .attr('class', 'user-text')
      .text(node.firstName)
      .attr('fill', node.daysOld < 25 ? '#3c963c' : '#828282')
      .attr('x', node.x - nodeRadius + 3)
      .attr('y', node.y + nodeRadius + 14)

    svg.append('text')
      .attr('class', 'user-text')
      .text(node.lastName)
      .attr('fill', node.daysOld < 25 ? '#3c963c' : '#828282')
      .attr('x', node.x - nodeRadius + 3)
      .attr('y', node.y + nodeRadius + 28)
  })
}

let draw = function (numNodes, OrbitNumber) {
  let nodes = createNodes(numNodes, OrbitNumber)
  createElements(nodes)
}

let drawOrbits = function () {
  const mode = d3.select('.active-mode').attr('id')
  let num = parseInt(document.getElementById('num-users').value)
  num = (num <= 75) ? num : 75 // 75 is max number of users for now
  if (mode === 'points') {
    nodeUsers = users.filter((user, idx) => idx < num).sort((a, b) => (a.pointsDone < b.pointsDone) ? -1 : 1)
  } else if (mode === 'admin') {
    nodeUsers = users.filter((user, idx) => idx < num).sort((a, b) => (a.isAdmin) ? -1 : 1)
  } else {
    // NOTE: default is alpha
    nodeUsers = users.filter((user, idx) => idx < num).sort((a, b) => (a.firstName < b.firstName) ? -1 : 1)
  }

  counter = 0
  d3.selectAll('.node').remove()
  d3.selectAll('.user-text').remove()
  let OrbitNumber = 0
  let density = d3.select('input[name="density"]:checked').node().value
  const capacities = (density === 'high') ? highCapacities : lowCapacities

  while (num > 0 && OrbitNumber < 10) {
    let thisShellCapacity = capacities[OrbitNumber] ? capacities[OrbitNumber] : 18 + OrbitNumber * 5
    // in case there are more spaces in this orbit than people to fill it
    let nodesInShell = (thisShellCapacity > num) ? num : thisShellCapacity
    draw(nodesInShell, OrbitNumber)
    num -= thisShellCapacity
    OrbitNumber++
  }
}

const attachListeners = function () {
  d3.selectAll('.mode-selector')
    .on('click', function () {
      d3.selectAll('.mode-selector')
        .attr('class', 'mode-selector')
      d3.select(this)
        .attr('class', 'mode-selector active-mode')
      drawOrbits()
      attachListeners()
    })

  d3.selectAll('.node')
    .on('mouseover', (d, i) => {
      // TODO make node bigger, too
      // TODO choose a different highlight color / technique
      d3.select('#user' + d.node.id)
        .attr('fill', 'green')

      // make its own function
      d3.select('#portrait-container')
      .style('display', 'inline-block')
      d3.select('#portrait')
        .attr('src', './resources/lowres_photos/' + i + '.jpg')

      d3.select('#user-name')
      .append('div')
      .text(d.node.firstName + ' ' + d.node.lastName)
      .style('font-size', '28px')

      d3.select('#bio-container')
      .append('div')
      .text(bio)
      .attr('id', 'bio-text')
      .style('font-size', '18px')
    })

  d3.selectAll('.node')
    .on('mouseout', (d, i) => {
      d3.select('#user' + d.node.id)
      .attr('fill', d.node.fill)

      d3.select('#portrait-container')
      .style('display', 'none')

      d3.selectAll('#user-name').text('')
      d3.selectAll('#bio-text').text('')
    })

  d3.selectAll('.generic-selector')
    .on('input', () => {
      drawOrbits()
      attachListeners()
    })

  d3.selectAll('.pursuance-selector')
    .on('input', () => { drawPursuance() })

  d3.selectAll('.orbit-density')
    .on('input', () => {
      drawOrbits()
      attachListeners()
    })
}

drawPursuance()
drawOrbits()
attachListeners()
