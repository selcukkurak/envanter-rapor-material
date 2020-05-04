import {
  useSecilenBirimList,
  useSecilenCografiDuzeyler,
  useSecilenUretimSikliklari,
  useSecilenVeriTurleri,
  useSelectedHaberBulteni,
  useSelectedKaynakKurum,
  useSelectedUrunKod
} from '../store'
import { useEffect } from 'react'

function ListeReset () {
  const [secilenUretimSikliklar] = useSecilenUretimSikliklari()
  const [secilenVeriTurleri] = useSecilenVeriTurleri()
  const [secilenCografiDuzeyler] = useSecilenCografiDuzeyler()
  const [secilenBirimList] = useSecilenBirimList()

  const [, setSelectedUrunKod] = useSelectedUrunKod()
  const [, setSelectedHaberBultenKod] = useSelectedHaberBulteni()
  const [, setSelectedKaynakKurum] = useSelectedKaynakKurum()

  useEffect(() => {
    console.debug('Listeleri Sıfırla')
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
  }, [
    secilenUretimSikliklar,
    secilenVeriTurleri,
    secilenCografiDuzeyler,
    secilenBirimList,
    setSelectedUrunKod,
    setSelectedHaberBultenKod,
    setSelectedKaynakKurum
  ])
  return null
}

export default ListeReset
