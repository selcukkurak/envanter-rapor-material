import { useEffect } from 'react'
import Axios from 'axios'
import { useGlobalState } from '../store'

export default function (props) {
  const [, setUrunler] = useGlobalState('urunler')

  useEffect(() => {
    Axios.get('/api/urunler')
      .then(response => setUrunler(response.data))
  }, [])

  return null
}