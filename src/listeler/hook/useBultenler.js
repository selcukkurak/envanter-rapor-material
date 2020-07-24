import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelectedHaberBulteni, useSelectedKaynakKurum, useSelectedUrunKod } from '../../store'
import Axios from 'axios'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'
import useFilteredHaberBulteniList from './useFilteredHaberBulteniList'

export default function useBultenler (filteredIstatistikiUrunList) {
  const [haberBulteniList, setHaberBulteniList] = useState([])
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useSelectedHaberBulteni()
  const [, setSelectedUrunKod] = useSelectedUrunKod()
  const [, setSelectedKaynakKurum] = useSelectedKaynakKurum()

  const filteredHaberBulteniList = useFilteredHaberBulteniList(
    filteredIstatistikiUrunList,
    haberBulteniList,
    arananHaberBulteni
  )

  useEffect(() => {
    Axios.get("/api/bultenler")
      .then(response=>{
          setHaberBulteniList(response.data)
        }
      )
  }, [])


  const gruplanmisBultenler = useMemo(() => groupBy(haberBulteniList, 'id'), [haberBulteniList])
  const siraliBultenler = useMemo(() => {
    return Object.keys(gruplanmisBultenler)
      .map(id => maxBy(gruplanmisBultenler[id], bulten => bulten.sonYayin.id))
      .sort((a, b) => a.adi.localeCompare(b.adi))
  }, [haberBulteniList])

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