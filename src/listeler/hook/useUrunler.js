import { useCallback, useState } from 'react'
import { seciliBultenState, seciliUrunState } from '../../store'
import useFiltreliUrunler from './useFiltreliUrunler'
import { useRecoilState, useSetRecoilState } from 'recoil/dist'

export default function useUrunler () {
  const [arananUrun, setArananUrun] = useState(null)
  const [selectedUrunKod, setSelectedUrunKod] = useRecoilState(seciliUrunState)
  const setSelectedHaberBulteni = useSetRecoilState(seciliBultenState)

  const filtreliUrunler = useFiltreliUrunler(arananUrun)

  const onUrunAramaChange = useCallback((event) => {
    setArananUrun(event.target.value)
  }, [])

  const handleClickRemoveItem = useCallback((event) =>{
    setSelectedUrunKod(null)
  }, [setSelectedUrunKod])

  const handleClickIstatistikiUrunItem = useCallback((event, index) => {
    setSelectedUrunKod(index);
    setSelectedHaberBulteni(null)
  }, [setSelectedUrunKod, setSelectedHaberBulteni])

  return [
    filtreliUrunler,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ]
}