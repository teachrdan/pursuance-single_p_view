// helper function to create mock user data
const createUser = function (idx) {
  // let node = Object.assign({}, nodeData)
  let node = {}
  const hashChars = '0123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ'
  const firstNames = ['Babette', 'Ellan', 'Rusty', 'Lilliam', 'Charlena', 'Denna', 'Francine', 'Teena', 'Marline', 'Raelene', 'Georgene', 'Sarita', 'Abe', 'Garnett', 'Lianne', 'Lillia', 'Charleen', 'Luetta', 'Bertie', 'Louie', 'Leida', 'Lacy', 'Kaye', 'Dede', 'Providencia', 'Hye', 'Nicol', 'Myriam', 'Maybelle', 'Agnes', 'Jenny', 'Derrick', 'Willetta', 'Cinda', 'Trudi', 'Johnsie', 'Rodney', 'Soon', 'Dovie', 'Micki', 'Carla', 'Marjory', 'Ella', 'Jasmin', 'Theressa', 'Barabara', 'Yu', 'Mariana', 'Fernande', 'Pearle']
  const lastNames = ['Clutter', 'Curiel', 'Cambre', 'Heilman', 'Riding', 'Hutchison', 'Kamerer', 'Rogge', 'Culbert', 'Tinner', 'Dustin', 'Mccullough', 'Korb', 'Carls', 'Rybak', 'Vetrano', 'Auton', 'Tremper', 'Bredeson', 'Spaeth', 'Sasaki', 'Zinn', 'Hoerr', 'Kirsch', 'Pippins', 'Ines', 'Belair', 'Ostrow', 'Beamer', 'Brodsky', 'Musser', 'Threadgill', 'Traughber', 'Mcduffee', 'Rohrbaugh', 'Wrench', 'Delahoussaye', 'Wilkes', 'Kearley', 'Klahn', 'Bramblett', 'Marrin', 'Eury', 'Sluder', 'Weidman', 'Shoffner', 'Finklea', 'Linkous', 'Kriger', 'Terrio']
  const lorem = ['Lorem', 'ipsum', 'dolor', 'amet', 'chicharrones', 'af', 'occupy', 'truffaut', 'mlkshk', 'succulents', 'intelligentsia', 'Adaptogen', 'master', 'cleanse', 'helvetica', 'raclette', 'Neutra', 'cred', 'lo-fi', 'flexitarian', 'Cred', 'XOXO', 'woke', 'tacos', 'meditation', 'drinking', 'vinegar', 'vegan', 'put', 'a', 'bird', 'on', 'it', 'jean', 'shorts', 'etsy', 'poke', 'man', 'braid', 'Squid', 'jianbing', 'af', 'master', 'cleanse', 'Meggings', 'street', 'art', 'VHS', 'pop-up', 'ramps', 'woke', 'hexagon', 'kinfolk', 'Paleo', 'air', 'plant', 'bespoke', 'blog', 'heirloom', 'ramps', 'coloring', 'book', 'selvage', 'tbh', 'affogato', 'selfies', 'single-origin', 'coffee', 'VHS', 'viral', 'taiyaki', 'hoodie', 'messenger', 'bag', 'actually', 'heirloom', 'Ramps', 'gluten-free', 'heirloom', 'scenester', 'authentic', 'messenger', 'bag', 'forage', 'Lo-fi', 'slow-carb', 'meh', 'irony', 'pabst', 'heirloom', 'hammock', 'gluten-free', 'brunch', 'sartorial', 'distillery', 'seitan']

  // TODO add skills

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
  // node.created = new Date()
  node.daysOld = Math.round(Math.random() * 100)
  node.isAdmin = isAdmin
  node.firstName = firstNames[firstNameIndex]
  node.lastName = lastNames[lastNameIndex]
  node.pointsTodo = Math.floor(Math.random() * 10)
  node.pointsDone = Math.floor(Math.random() * 100)
  node.portrait = idx + '.jpg'
  return node
}

module.exports = createUser
