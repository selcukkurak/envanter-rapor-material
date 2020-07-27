import { useEffect } from 'react'
import Axios from 'axios'
import { useGlobalState } from '../store'
import keyBy from 'lodash/keyBy'

async function urunleriGetir () {
  const urunlerReq = Axios.get('/api/urunler')
  const sayilarReq = Axios.get('/api/urunler/sayilar')
  const [urunler, sayilar] = await Axios.all([urunlerReq, sayilarReq])

  const sayilarById = keyBy(sayilar.data, 'id')

  return urunler.data.map(urun => ({
    ...urun,
    sayilar: sayilarById[urun.id]
  }))
}

export default function (props) {
  const [, setUrunler] = useGlobalState('urunler')

  useEffect(() => {
    urunleriGetir().then(response => setUrunler(response))
  }, [])

  return null
}