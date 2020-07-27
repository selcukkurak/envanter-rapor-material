import { useCallback, useState } from 'react'
import { useGlobalState, useSelectedHaberBulteni, useSelectedKaynakKurum, useSelectedUrunKod } from '../../store'
import useFilteredHaberBulteniList from './useFilteredHaberBulteniList'

export default function useBultenler (filteredIstatistikiUrunList) {
  const [bultenler] = useGlobalState('bultenler')
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useSelectedHaberBulteni()
  const [, setSelectedUrunKod] = useSelectedUrunKod()
  const [, setSelectedKaynakKurum] = useSelectedKaynakKurum()

  const filteredHaberBulteniList = useFilteredHaberBulteniList(
    filteredIstatistikiUrunList,
    bultenler,
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
    filteredHaberBulteniList,
    selectedHaberBultenKod,
    onHaberBulteniAramaChange,
    handleClickRemoveHaberBulteniItem,
    handleClickBultenItem
  ]
}