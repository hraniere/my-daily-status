import React, { useState, useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'
import auth0 from '../lib/auth0'
// import db from '../lib/db'

const CreateStatus = props => {

  useEffect(() => {
    if (!props.isAuth)
      router.push('/')
  })

  if (!props.isAuth)
    return null

  const [dados, setDados] = useState({
    status: 'bem',
    coords: {
      lat: null,
      long: null
    }
  })

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setDados(old => {
          return {
            ...old,
            coords: {
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          }
        })
      })
    }
  }

  const save = async () => {
    await axios.post('/api/save-status', dados)
  }

  const onStatusChange = evt => {
    const value = evt.target.value
    setDados(old => {
      return {
        ...old,
        status: value
      }
    })
  }

  return (
    <div>
      <h1>Create Status</h1>
      <label className='block'><input type='radio' name='status' value='bem' onClick={onStatusChange} /> Estou bem e sem sintomas</label>
      <label className='block'><input type='radio' name='status' value='gripe' onClick={onStatusChange} /> Estou com sintomas de gripe/resfriado</label>
      <label className='block'><input type='radio' name='status' value='covid' onClick={onStatusChange} /> Estou com sintomas da COVID-19</label>
      Sua posição atual: {JSON.stringify(dados)}
      <button className='block' onClick={getMyLocation}>Pegar minha localização</button>
      <button className='block' onClick={save}>Salvar meu status</button>
    </div>
  )
}

export default CreateStatus

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req)
  if (session) {
    return {
      props: {
        isAuth: true,
        user: session.user
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