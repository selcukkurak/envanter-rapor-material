import { useCallback, useEffect, useState } from 'react'
import { useSelectedHaberBulteni, useSelectedKaynakKurum, useSelectedUrunKod } from '../../store'
import Axios from 'axios'
import useFilteredKaynakKurumlarList from './useFilteredKaynakKurumlarList'

export default function useKaynakKurumlar (filteredIstatistikiUrunList) {
  const [kaynakKurumlarList, setKaynakKurumlarList] = useState([])
  const [arananKurum, setArananKurum] = useState(null)
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useSelectedKaynakKurum()
  const [, setSelectedHaberBulteni] = useSelectedHaberBulteni()
  const [, setSelectedUrunKod] = useSelectedUrunKod()

  const filteredKaynakKurumlarList = useFilteredKaynakKurumlarList(
    filteredIstatistikiUrunList,
    kaynakKurumlarList,
    arananKurum
  )

  useEffect(()=>{
    Axios.get("/envanter/rapor/idari_kayit_kaynak_kurumlar")
      .then(response=>{
          setKaynakKurumlarList(response.data)
        }
      )
  },[])

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
    filteredKaynakKurumlarList,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem
  ]
}