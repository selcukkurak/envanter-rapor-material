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

  const [selectedUrunKod, setSelectedUrunKod] = useSelectedUrunKod()
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useSelectedHaberBulteni()
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useSelectedKaynakKurum()

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

  useEffect(() => {
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
  }, [selectedUrunKod])

  useEffect(() => {
    setSelectedUrunKod(null)
  }, [selectedHaberBultenKod, selectedKaynakKurum])

  return null
}

export default ListeReset
