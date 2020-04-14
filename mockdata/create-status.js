const db = require('../lib/db')
const uuid4 = require('uuid4')

const user = uuid4()
const dados = {
  status: 'bem',
  coordinates: {
    latitude: -23.575624849999997,
    longitude: -46.64018250161935
  }
}
const currentDate = new Date().toJSON().slice(0, 10)

db.collection('markers')
  .doc(currentDate)
  .collection('checks')
  .doc(user)
  .set(dados)
