import { useCallback, useEffect, useState } from 'react'
import { useSelectedKaynakKurum } from '../../store'
import Axios from 'axios'
import useFilteredKaynakKurumlarList from './useFilteredKaynakKurumlarList'

export default function useKaynakKurumlar (filteredIstatistikiUrunList) {
  const [kaynakKurumlarList, setKaynakKurumlarList] = useState([])
  const [arananKurum, setArananKurum] = useState(null)
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useSelectedKaynakKurum()

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
  }, [setSelectedKaynakKurum])

  return [
    filteredKaynakKurumlarList,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem
  ]
}