import { useEffect } from 'react'
import Axios from 'axios'
import { useGlobalState } from '../store'

export default function (props) {
  const [, setBultenler] = useGlobalState('bultenler')

  useEffect(() => {
    Axios.get('/api/bultenler')
      .then(response => setBultenler(response.data))
  }, [])

  return null
}