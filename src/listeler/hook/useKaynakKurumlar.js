import { useCallback, useState } from 'react'
import { seciliBultenState, seciliKaynakKurumState, seciliUrunState } from '../../store'
import useFiltreliKurumlar from './useFiltreliKurumlar'
import { useRecoilState, useSetRecoilState } from 'recoil/dist'

export default function useKaynakKurumlar (filtreliUrunler) {
  const [arananKurum, setArananKurum] = useState(null)

  const [selectedKaynakKurum, setSelectedKaynakKurum] = useRecoilState(seciliKaynakKurumState)
  const setSelectedHaberBulteni = useSetRecoilState(seciliBultenState)
  const setSelectedUrunKod = useSetRecoilState(seciliUrunState)

  const filtreliKurumlar = useFiltreliKurumlar(
    filtreliUrunler,
    arananKurum
  )

  const onKurumAramaChange = useCallback((event) => {
    setArananKurum(event.target.value)
  }, [])

  const handleClickRemoveKaynakKurumiItem = useCallback((event) =>{
    setSelectedKaynakKurum(null)
  }, [setSelectedKaynakKurum])

  const handleClickKaynakKurumItem = useCallback((event,index) => {
    setSelectedKaynakKurum(index);
    setSelectedHaberBulteni(null)
    setSelectedUrunKod(null)
  }, [setSelectedUrunKod, setSelectedHaberBulteni, setSelectedKaynakKurum])

  return [
    filtreliKurumlar,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem
  ]
}