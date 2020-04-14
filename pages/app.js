import React, { useEffect } from 'react'
import router from 'next/router'
import auth0 from '../lib/auth0'
import db from '../lib/db'

const App = props => {
  useEffect(() => {
    if (!props.isAuth)
      router.push('/')
    else if (props.forceCreate) {
      router.push('/create-status')
    }
  })

  if (!props.isAuth)
    return null

  return (
    <div>
      <h1>Pessoas próximas a você:</h1>
      <table>
        {props.checkins.map(checkin => {
          return (
            <tr key={checkin.id}>
              <td>{checkin.id === props.user.sub ? 'Seu status:' : 'usuário'}</td>
              < td > {checkin.status}</td>
              <td>{JSON.stringify(checkin.coordinates)}</td>
              <td>{checkin.distance.toFixed(2)}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
export default App

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req)
  const currentDate = new Date().toJSON().slice(0, 10)
  if (session) {
    const todaysCheckin = await db.collection('markers')
      .doc(currentDate)
      .collection('checks')
      .doc(session.user.sub)
      .get()

    let forceCreate = true
    if (todaysCheckin.data()) {
      const checkins = await db.collection('markers')
        .doc(currentDate)
        .collection('checks')
        .near({
          center: todaysCheckin.data().coordinates,
          radius: 10
        })
        .get()
      const checkinsList = checkins.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
          distance: doc.distance
        }
      })
      return {
        props: {
          isAuth: true,
          user: session.user,
          forceCreate: false,
          checkins: checkinsList
        }
      }
    }
    return {
      props: {
        isAuth: true,
        user: session.user,
        forceCreate,

      }
    }
  }
  return {
    props: {
      isAuth: false,
      user: {}
    }
  }
}