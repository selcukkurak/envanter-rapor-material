import {
  seciliBirimlerState,
  seciliBultenState,
  seciliCografiDuzeylerState,
  seciliKaynakKurumState,
  seciliUretimSikliklariState,
  seciliUrunState,
  seciliVeriTuruState
} from '../store'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil/dist'

function ListeReset () {
  const secilenUretimSikliklar = useRecoilValue(seciliUretimSikliklariState)
  const secilenVeriTuru = useRecoilValue(seciliVeriTuruState)
  const secilenCografiDuzeyler = useRecoilValue(seciliCografiDuzeylerState)
  const secilenBirimList = useRecoilValue(seciliBirimlerState)

  const setSelectedUrunKod = useSetRecoilState(seciliUrunState)
  const setSelectedHaberBultenKod = useSetRecoilState(seciliBultenState)
  const setSelectedKaynakKurum = useSetRecoilState(seciliKaynakKurumState)

  useEffect(() => {
    console.debug('Listeleri Sıfırla')
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
  }, [
    secilenUretimSikliklar,
    secilenVeriTuru,
    secilenCografiDuzeyler,
    secilenBirimList,
    setSelectedUrunKod,
    setSelectedHaberBultenKod,
    setSelectedKaynakKurum
  ])

  return null
}

export default ListeReset
