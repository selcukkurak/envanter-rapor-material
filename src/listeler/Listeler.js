import Liste from './Liste'
import ListeItem from './ListeItem'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { AnketIkon, IdariKayitIkon } from './ikonlar'
import { Grid } from '@material-ui/core'
import useFilteredIstatistikiUrunList from '../hook/useFilteredIstatistikiUrunList'
import useFilteredHaberBulteniList from '../hook/useFilteredHaberBulteniList'
import useFilteredKaynakKurumlarList from '../hook/useFilteredKaynakKurumlarList'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'

function Listeler (props) {
  console.debug('Listeler Rendered!')
  const classes = useStyles()

  const [istatistikiUrunList,setIstatistikiUrunList]=useState([])
  const [arananUrun, setArananUrun] = useState(null)

  const [haberBulteniList,setHaberBulteniList]=useState([])
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)

  const [kaynakKurumlarList,setKaynakKurumlarList]=useState([])
  const [arananKurum, setArananKurum] = useState(null)

  const {
    secilenUretimSikliklar,
    secilenCografiDuzeyler,
    secilenBirimList,
    secilenVeriTurleri,
    selectedUrunKod,
    setSelectedUrunKod,
    selectedHaberBultenKod,
    setSelectedHaberBultenKod,
    selectedKaynakKurum,
    setSelectedKaynakKurum
  } = props

  useEffect(()=>{
    Axios.get("/envanter/rapor/istatistiki_urunler")
      .then(response=>{
          setIstatistikiUrunList(response.data)
        }
      )
    Axios.get("/envanter/rapor/haber_bultenleri")
      .then(response=>{
          setHaberBulteniList(response.data)
        }
      )
    Axios.get("/envanter/rapor/idari_kayit_kaynak_kurumlar")
      .then(response=>{
          setKaynakKurumlarList(response.data)
        }
      )
  },[])

  const filteredIstatistikiUrunList = useFilteredIstatistikiUrunList(
    secilenUretimSikliklar,
    secilenCografiDuzeyler,
    secilenBirimList,
    secilenVeriTurleri,
    istatistikiUrunList,
    selectedHaberBultenKod,
    selectedKaynakKurum,
    arananUrun
  )

  const filteredHaberBulteniList = useFilteredHaberBulteniList(
    filteredIstatistikiUrunList,
    selectedUrunKod,
    haberBulteniList,
    arananHaberBulteni
  )

  const filteredKaynakKurumlarList = useFilteredKaynakKurumlarList(
    filteredIstatistikiUrunList,
    selectedUrunKod,
    kaynakKurumlarList,
    arananKurum
  )

  const onUrunAramaChange = useCallback((event) => {
    setArananUrun(event.target.value)
  }, [])

  const onHaberBulteniAramaChange = useCallback((event) => {
    setArananHaberBulteni(event.target.value)
  }, [])

  const onKurumAramaChange = useCallback((event) => {
    setArananKurum(event.target.value)
  }, [])

  const handleClickRemoveItem = useCallback((event) =>{
    setSelectedUrunKod(null)
  }, [setSelectedUrunKod])

  const handleClickRemoveHaberBulteniItem = useCallback((event) =>{
    setSelectedHaberBultenKod(null)
  }, [setSelectedHaberBultenKod])

  const handleClickRemoveKaynakKurumiItem = useCallback((event) =>{
    setSelectedKaynakKurum(null)
  }, [setSelectedKaynakKurum])

  const handeClickIstatistikiUrunItem = useCallback((event,index) => {
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSelectedUrunKod(index);
  }, [setSelectedUrunKod, setSelectedKaynakKurum, setSelectedHaberBultenKod])

  const handeClickBultenItem = useCallback((event,index) => {
    setSelectedUrunKod(null)
    setSelectedKaynakKurum(null)
    setSelectedHaberBultenKod(index);
  }, [setSelectedUrunKod, setSelectedKaynakKurum, setSelectedHaberBultenKod])

  const handeClickKaynakKurumItem = useCallback((event,index) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(index);
  }, [setSelectedUrunKod, setSelectedHaberBultenKod, setSelectedKaynakKurum])

  return (
    <Grid item xs={7} className={classes.subGrid} container direction="row">
      <Liste
        title={filteredIstatistikiUrunList.length + ' İstatistiki Ürün'}
        selectedItem={selectedUrunKod}
        handleClickRemoveItem={handleClickRemoveItem}
        onAramaChange={onUrunAramaChange}
        items={filteredIstatistikiUrunList}
        itemRenderer={(value) => (
          <ListeItem
            key={value.istatistiki_urun_kod}
            selected={selectedUrunKod === value.istatistiki_urun_kod}
            onClick={(event) => handeClickIstatistikiUrunItem(event, value.istatistiki_urun_kod)}
            text={value.istatistiki_urun_ad}
            rightItems={(
              <Fragment>
                {value.anket_durumu && <AnketIkon />}
                {value.idari_kayit_durumu && <IdariKayitIkon />}
              </Fragment>
            )} />
        )} />
      <Liste
        title={filteredHaberBulteniList.length + ' Haber Bülteni'}
        selectedItem={selectedHaberBultenKod}
        handleClickRemoveItem={handleClickRemoveHaberBulteniItem}
        onAramaChange={onHaberBulteniAramaChange}
        items={filteredHaberBulteniList}
        itemRenderer={(value) => (
          <ListeItem
            key={value.kod}
            selected={selectedHaberBultenKod===value.kod}
            onClick={(event) => handeClickBultenItem(event, value.kod)}
            text={value.ad} />
        )} />
      <Liste
        title={filteredKaynakKurumlarList.length + ' Kaynak Kurum'}
        selectedItem={selectedKaynakKurum}
        handleClickRemoveItem={handleClickRemoveKaynakKurumiItem}
        onAramaChange={onKurumAramaChange}
        items={filteredKaynakKurumlarList}
        itemRenderer={(value) => (
          <ListeItem
            key={value.kod}
            selected={selectedKaynakKurum===value.kod}
            onClick={(event) => handeClickKaynakKurumItem(event, value.kod)}
            text={value.ad} />
        )} />
    </Grid>
  )
}

export default memo(Listeler)
