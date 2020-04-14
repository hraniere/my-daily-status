import db from '../../lib/db'
import auth0 from '../../lib/auth0'

const saveStatus = async (req, res) => {

  const dados = req.body
  const session = await auth0.getSession(req)
  const currentDate = new Date().toJSON().slice(0, 10)
  if (session) {
    await db.collection('markers')
      .doc(currentDate)
      .collection('checks')
      .doc(session.user.sub)
      .set({
        status: dados.status,
        coordinates: {
          latitude: dados.coords.lat,
          longitude: dados.coords.long
        }
      })
  }
  res.send({ status: 'ok' })
}

export default saveStatus
