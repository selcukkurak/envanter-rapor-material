import { useEffect } from 'react'
import Axios from 'axios'
import { urunlerState } from '../store'
import keyBy from 'lodash/keyBy'
import { useSetRecoilState } from 'recoil/dist'

async function urunleriGetir () {
  const urunlerReq = Axios.get('/api/urunler')
  const sayilarReq = Axios.get('/api/urunler/sayilar')
  const kaynakKurumlarReq = Axios.get('/api/urunler/kaynak-kurumlar')
  const [urunler, sayilar, kurumlar] = await Axios.all([urunlerReq, sayilarReq, kaynakKurumlarReq])

  const sayilarById = keyBy(sayilar.data, 'id')
  const kurumlarById = keyBy(kurumlar.data, 'id')

  return urunler.data
    .filter(urun => !urun.taslak)
    .map(urun => ({
      ...urun,
      sayilar: sayilarById[urun.id],
      kurumlar: kurumlarById[urun.id].kurumlar
    }))
}

export default function (props) {
  const setUrunler = useSetRecoilState(urunlerState)

  useEffect(() => {
    urunleriGetir().then(response => setUrunler(response))
  }, [setUrunler])

  return null
}