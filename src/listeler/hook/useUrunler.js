import { useCallback, useEffect, useState } from 'react'
import { useSelectedUrunKod } from '../../store'
import Axios from 'axios'
import useFilteredIstatistikiUrunList from './useFilteredIstatistikiUrunList'

export default function useUrunler () {
  const [istatistikiUrunList, setIstatistikiUrunList] = useState([])
  const [arananUrun, setArananUrun] = useState(null)
  const [selectedUrunKod, setSelectedUrunKod] = useSelectedUrunKod()

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
  }, [setSelectedUrunKod])

  return [
    filteredIstatistikiUrunList,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ]
}