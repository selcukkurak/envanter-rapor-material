import { useCallback, useState } from 'react'
import { useGlobalState, useSelectedHaberBulteni, useSelectedUrunKod } from '../../store'
import useFilteredIstatistikiUrunList from './useFilteredIstatistikiUrunList'

export default function useUrunler () {
  const [urunler] = useGlobalState('urunler')
  const [arananUrun, setArananUrun] = useState(null)
  const [selectedUrunKod, setSelectedUrunKod] = useSelectedUrunKod()
  const [, setSelectedHaberBulteni] = useSelectedHaberBulteni()

  const filteredIstatistikiUrunList = useFilteredIstatistikiUrunList(
    urunler,
    arananUrun
  )

  const onUrunAramaChange = useCallback((event) => {
    setArananUrun(event.target.value)
  }, [])

  const handleClickRemoveItem = useCallback((event) =>{
    setSelectedUrunKod(null)
  }, [setSelectedUrunKod])

  const handleClickIstatistikiUrunItem = useCallback((event,index) => {
    setSelectedUrunKod(index);
    setSelectedHaberBulteni(null)
  }, [setSelectedUrunKod, setSelectedHaberBulteni])

  return [
    filteredIstatistikiUrunList,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ]
}