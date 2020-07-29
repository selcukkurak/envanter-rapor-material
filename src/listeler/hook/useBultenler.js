import { useCallback, useState } from 'react'
import { seciliBultenState, seciliKaynakKurumState, seciliUrunState } from '../../store'
import useFiltreliBultenler from './useFiltreliBultenler'
import { useRecoilState, useSetRecoilState } from 'recoil/dist'

export default function useBultenler (filtreliUrunler) {
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)

  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useRecoilState(seciliBultenState)
  const setSelectedUrunKod = useSetRecoilState(seciliUrunState)
  const setSelectedKaynakKurum = useSetRecoilState(seciliKaynakKurumState)

  const filtreliBultenler = useFiltreliBultenler(
    filtreliUrunler,
    arananHaberBulteni
  )

  const onHaberBulteniAramaChange = useCallback((event) => {
    setArananHaberBulteni(event.target.value)
  }, [])

  const handleClickRemoveHaberBulteniItem = useCallback((event) =>{
    setSelectedHaberBultenKod(null)
  }, [setSelectedHaberBultenKod])

  const handleClickBultenItem = useCallback((event,index) => {
    setSelectedHaberBultenKod(index);
    setSelectedUrunKod(null)
    setSelectedKaynakKurum(null)
  }, [setSelectedUrunKod, setSelectedHaberBultenKod, setSelectedKaynakKurum])

  return [
    filtreliBultenler,
    selectedHaberBultenKod,
    onHaberBulteniAramaChange,
    handleClickRemoveHaberBulteniItem,
    handleClickBultenItem
  ]
}