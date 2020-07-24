import { useCallback, useMemo, useState } from 'react'
import { useGlobalState, useSelectedHaberBulteni, useSelectedKaynakKurum, useSelectedUrunKod } from '../../store'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'
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


  const gruplanmisBultenler = useMemo(() => groupBy(bultenler, 'id'), [bultenler])
  const siraliBultenler = useMemo(() => {
    return Object.keys(gruplanmisBultenler)
      .map(id => maxBy(gruplanmisBultenler[id], bulten => bulten.sonYayin.id))
      .sort((a, b) => a.adi.localeCompare(b.adi))
  }, [bultenler])

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
    handleClickBultenItem,
    siraliBultenler,
    gruplanmisBultenler
  ]
}