/* global d3 */
window.d3 = d3
// based loosely on "Placing n elements around a circle with radius r"
// http://bl.ocks.org/bycoffe/3404776
let counter
// magic numbers
let defaultCapacities = [6, 10, 18, 28, 40] // number of users per orbit
let highCapacities = [8, 14, 24, 36, 50] // number of users per orbit
const height = 750 // pixels
const width = 1000 // pixels
const pOpacity = 0.8 // pursuance opacity, out of 1
const uOpacity = 0.8 // user opacity, out of 1

// helper function to create mock user data
const createUser = function (nodeData) {
  let node = Object.assign({}, nodeData)
  const hashChars = '0123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ'
  const firstNames = ['Babette', 'Ellan', 'Rusty', 'Lilliam', 'Charlena', 'Denna', 'Francine', 'Teena', 'Marline', 'Raelene', 'Georgene', 'Sarita', 'Abe', 'Garnett', 'Lianne', 'Lillia', 'Charleen', 'Luetta', 'Bertie', 'Louie', 'Leida', 'Lacy', 'Kaye', 'Dede', 'Providencia', 'Hye', 'Nicol', 'Myriam', 'Maybelle', 'Agnes', 'Jenny', 'Derrick', 'Willetta', 'Cinda', 'Trudi', 'Johnsie', 'Rodney', 'Soon', 'Dovie', 'Micki', 'Carla', 'Marjory', 'Ella', 'Jasmin', 'Theressa', 'Barabara', 'Yu', 'Mariana', 'Fernande', 'Pearle']
  const lastNames = ['Clutter', 'Curiel', 'Cambre', 'Heilman', 'Riding', 'Hutchison', 'Kamerer', 'Rogge', 'Culbert', 'Tinner', 'Dustin', 'Mccullough', 'Korb', 'Carls', 'Rybak', 'Vetrano', 'Auton', 'Tremper', 'Bredeson', 'Spaeth', 'Sasaki', 'Zinn', 'Hoerr', 'Kirsch', 'Pippins', 'Ines', 'Belair', 'Ostrow', 'Beamer', 'Brodsky', 'Musser', 'Threadgill', 'Traughber', 'Mcduffee', 'Rohrbaugh', 'Wrench', 'Delahoussaye', 'Wilkes', 'Kearley', 'Klahn', 'Bramblett', 'Marrin', 'Eury', 'Sluder', 'Weidman', 'Shoffner', 'Finklea', 'Linkous', 'Kriger', 'Terrio']
  const lorem = ['Lorem', 'ipsum', 'dolor', 'amet', 'chicharrones', 'af', 'occupy', 'truffaut', 'mlkshk', 'succulents', 'intelligentsia', 'Adaptogen', 'master', 'cleanse', 'helvetica', 'raclette', 'Neutra', 'cred', 'lo-fi', 'flexitarian', 'Cred', 'XOXO', 'woke', 'tacos', 'meditation', 'drinking', 'vinegar', 'vegan', 'put', 'a', 'bird', 'on', 'it', 'jean', 'shorts', 'etsy', 'poke', 'man', 'braid', 'Squid', 'jianbing', 'af', 'master', 'cleanse', 'Meggings', 'street', 'art', 'VHS', 'pop-up', 'ramps', 'woke', 'hexagon', 'kinfolk', 'Paleo', 'air', 'plant', 'bespoke', 'blog', 'heirloom', 'ramps', 'coloring', 'book', 'selvage', 'tbh', 'affogato', 'selfies', 'single-origin', 'coffee', 'VHS', 'viral', 'taiyaki', 'hoodie', 'messenger', 'bag', 'actually', 'heirloom', 'Ramps', 'gluten-free', 'heirloom', 'scenester', 'authentic', 'messenger', 'bag', 'forage', 'Lo-fi', 'slow-carb', 'meh', 'irony', 'pabst', 'heirloom', 'hammock', 'gluten-free', 'brunch', 'sartorial', 'distillery', 'seitan']

  // TODO create a helper function to check for duplicate hashes between all users
  function createHash (len = 6) {
    let hash = ''
    for (let i = 0; i < len; i++) {
      const hashChar = Math.floor(Math.random() * hashChars.length)
      hash += hashChars[hashChar]
    }
    return hash
  }

  const firstNameIndex = Math.floor(Math.random() * firstNames.length)
  const lastNameIndex = Math.floor(Math.random() * lastNames.length)
  let bioLength = Math.floor(Math.random() * lorem.length)
  bioLength = Math.max(5, bioLength)
  // NOTE: 15% chance of being an admin
  const isAdmin = (Math.random() * 100 < 15)

  node.id = createHash()
  node.bio = lorem.slice(0, bioLength).join(' ') + '.'
  node.created = new Date()
  node.daysOld = Math.round(Math.random() * 100)
  node.isAdmin = isAdmin
  node.firstName = firstNames[firstNameIndex]
  node.lastName = lastNames[lastNameIndex]
  node.pointsTodo = Math.floor(Math.random() * 10)
  node.pointsDone = Math.floor(Math.random() * 100)
  return node
}

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
  let x
  let y
  for (let i = 0; i < numNodes; i++) {
    // Calculate the angle at which the element will be placed.
    angle = (i / (numNodes / 2)) * Math.PI
    // Calculate the x position of the element.
    x = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.cos(angle)) + (width / 2)
     // Calculate the y position of the element.
    y = ((firstOrbitRadius + (distanceBetweenOrbits * OrbitNumber)) * Math.sin(angle)) + (height / 2)
    nodes.push(createUser({ 'x': x, 'y': y, 'index': counter }))
    counter++
  }
  return nodes
}

let createElements = function (nodes) {
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
      .attr('fill', node.daysOld < 25 ? 'lightgreen' : 'black')
      .attr('x', node.x - nodeRadius + 3)
      .attr('y', node.y + nodeRadius + 14)

    svg.append('text')
      .attr('class', 'user-text')
      .text(node.lastName)
      .attr('fill', node.daysOld < 25 ? 'lightgreen' : 'black')
      .attr('x', node.x - nodeRadius + 3)
      .attr('y', node.y + nodeRadius + 28)
  })
}

let draw = function (numNodes, OrbitNumber) {
  let nodes = createNodes(numNodes, OrbitNumber)
  createElements(nodes, OrbitNumber)
}

let drawOrbits = function () {
  d3.selectAll('.node').remove()
  d3.selectAll('.user-text').remove()
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

d3.selectAll('.node')
  .on('mouseover', (d, i) => {
    // TODO make node bigger, too
    d3.select('#user' + d.node.id)
      .attr('fill', 'green')

    d3.select('#portrait-container')
      .style('display', 'inline')

    d3.select('#user-name')
      .append('div')
      .text(d.node.firstName + ' ' + d.node.lastName)
      .style('font-size', '28px')

    d3.select('#bio-container')
      .append('div')
      .text(d.node.bio)
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
  .on('input', () => { drawOrbits() })

d3.selectAll('.pursuance-selector')
  .on('input', () => { drawPursuance() })

d3.selectAll('.orbit-density')
  .on('input', () => {
    drawOrbits()
  })
