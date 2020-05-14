import { useCallback, useEffect, useState } from 'react'
import { useSelectedHaberBulteni, useSelectedUrunKod } from '../../store'
import Axios from 'axios'
import useFilteredIstatistikiUrunList from './useFilteredIstatistikiUrunList'

export default function useUrunler () {
  const [istatistikiUrunList, setIstatistikiUrunList] = useState([])
  const [arananUrun, setArananUrun] = useState(null)
  const [selectedUrunKod, setSelectedUrunKod] = useSelectedUrunKod()
  const [, setSelectedHaberBulteni] = useSelectedHaberBulteni()
  //const [, setSelectedKaynakKurum] = useSelectedKaynakKurum()

  const filteredIstatistikiUrunList = useFilteredIstatistikiUrunList(
    istatistikiUrunList,
    arananUrun
  )

  useEffect(() => {
    Axios.get("/envanter/rapor/istatistiki_urunler")
      .then(response=>{
          setIstatistikiUrunList(response.data)
        }
      )
  }, [])

  const onUrunAramaChange = useCallback((event) => {
    setArananUrun(event.target.value)
  }, [])

  const handleClickRemoveItem = useCallback((event) =>{
    setSelectedUrunKod(null)
  }, [setSelectedUrunKod])

  const handleClickIstatistikiUrunItem = useCallback((event,index) => {
    setSelectedUrunKod(index);
    setSelectedHaberBulteni(null)
    //setSelectedKaynakKurum(null)
  }, [setSelectedUrunKod, setSelectedHaberBulteni])

  return [
    filteredIstatistikiUrunList,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ]
}