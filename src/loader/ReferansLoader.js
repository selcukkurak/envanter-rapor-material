import Axios from 'axios'
import { useEffect } from 'react'
import { useGlobalState } from '../store'

export default function (props) {
  const [, setReferanslar] = useGlobalState('referanslar')

  useEffect(() => {
    Axios.get('/api/referanslar')
      .then(response => setReferanslar(response.data.referanslar))
  }, [])

  return null
}