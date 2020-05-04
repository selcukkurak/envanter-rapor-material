import { useCallback, useEffect, useState } from 'react'
import { useSelectedHaberBulteni } from '../../store'
import Axios from 'axios'
import useFilteredHaberBulteniList from './useFilteredHaberBulteniList'

export default function useBultenler (filteredIstatistikiUrunList) {
  const [haberBulteniList, setHaberBulteniList] = useState([])
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useSelectedHaberBulteni()

  const filteredHaberBulteniList = useFilteredHaberBulteniList(
    filteredIstatistikiUrunList,
    haberBulteniList,
    arananHaberBulteni
  )

  useEffect(() => {
    Axios.get("/envanter/rapor/haber_bultenleri")
      .then(response=>{
          setHaberBulteniList(response.data)
        }
      )
  }, [])

  const onHaberBulteniAramaChange = useCallback((event) => {
    setArananHaberBulteni(event.target.value)
  }, [])

  const handleClickRemoveHaberBulteniItem = useCallback((event) =>{
    setSelectedHaberBultenKod(null)
  }, [setSelectedHaberBultenKod])

  const handleClickBultenItem = useCallback((event,index) => {
    setSelectedHaberBultenKod(index);
  }, [setSelectedHaberBultenKod])

  return [
    filteredHaberBulteniList,
    selectedHaberBultenKod,
    onHaberBulteniAramaChange,
    handleClickRemoveHaberBulteniItem,
    handleClickBultenItem
  ]
}