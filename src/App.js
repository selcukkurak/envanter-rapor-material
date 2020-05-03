import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import 'typeface-roboto'
import AnketlerList from './AnketlerList.js'
import './App.css'
import HeaderBar from './HeaderBar.js'
import IdariKayitlarList from './IdariKayitlarList.js'
import useStyles from './stiller/useStyles'
import Filtreler from './filtreler/Filtreler'
import useFilteredIstatistikiUrunList from './hook/useFilteredIstatistikiUrunList'
import useFilteredHaberBulteniList from './hook/useFilteredHaberBulteniList'
import useFilteredKaynakKurumlarList from './hook/useFilteredKaynakKurumlarList'
import Liste from './listeler/Liste'
import ListeItem from './listeler/ListeItem'
import { AnketIkon, IdariKayitIkon } from './listeler/ikonlar'

function App() {
  console.debug('App Rendered!')
  const classes = useStyles()

  const [secilenUretimSikliklar,setSecilenUretimSikliklar]=useState([])
  const [secilenCografiDuzeyler,setSecilenCografiDuzeyler]=useState([])
  const [secilenVeriTurleri,setSecilenVeriTurleri]=useState([])
  const [secilenBirimList, setSecilenBirimList] = useState([])
  
  const [istatistikiUrunList,setIstatistikiUrunList]=useState([])
  const [selectedUrunKod, setSelectedUrunKod] = useState(null)
  const [arananUrun, setArananUrun] = useState(null)

  const [haberBulteniList,setHaberBulteniList]=useState([])
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useState(null)
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)

  const [kaynakKurumlarList,setKaynakKurumlarList]=useState([])
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useState(null)
  const [arananKurum, setArananKurum] = useState(null)

  const [istatistikiUrunDetay,setIstatistikiUrunDetay]=useState(null)
  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])

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

  useEffect(()=>{
    console.debug('selectedUrunKod değişti: ', selectedUrunKod)
    if (selectedUrunKod) {
      Axios.get("/envanter/rapor/istatistiki_urunler/"+selectedUrunKod)
        .then(response=>{
            setIstatistikiUrunDetay(response.data)
          }
        )
    }
    if(selectedUrunKod){
      Axios.get("/envanter/rapor/envanter_idari_kayitlar/"+selectedUrunKod)
        .then(response=>{
            setIdariKayitlar(response.data)
          }
        )
    }
    if(selectedUrunKod){
      Axios.get("/envanter/rapor/envanter_anketler/"+selectedUrunKod)
        .then(response=>{
            setAnketler(response.data)
          }
        )
    }
  },[selectedUrunKod])

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

  const onUretimSiklikChange = useCallback((event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenUretimSikliklar(values)
  }, [])

  const onCografiDuzeyChange = useCallback((event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenCografiDuzeyler(values)
  }, [])

  const onVeriTuruChange = useCallback((event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenVeriTurleri(values)
  }, [])

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
  }, [])

  const handleClickRemoveHaberBulteniItem = useCallback((event) =>{
    setSelectedHaberBultenKod(null)
  }, [])
  
  const handleClickRemoveKaynakKurumiItem = useCallback((event) =>{
    setSelectedKaynakKurum(null)
  }, [])

  const handleBirimListToggle = useCallback((value) => () => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)

    const currentIndex = secilenBirimList.indexOf(value);
    const checkedList = [...secilenBirimList];
    if (currentIndex === -1) {
      checkedList.push(value);
    } else {
      checkedList.splice(currentIndex, 1);
    }
    setSecilenBirimList(checkedList)
  }, [secilenBirimList])

  const handeClickIstatistikiUrunItem = useCallback((event,index) => {
    console.debug('selected item: ', index)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSelectedUrunKod(index);
  }, [])

  const handeClickBultenItem = useCallback((event,index) => {
    setSelectedUrunKod(null)
    setSelectedKaynakKurum(null)
    setSelectedHaberBultenKod(index);
  }, [])

  const handeClickKaynakKurumItem = useCallback((event,index) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(index);
  }, [])

  return (
    <div className={classes.mainDiv}>
        <HeaderBar />
        <Grid container  className={classes.mainGrid}>
            <Filtreler
              secilenBirimList={secilenBirimList}
              onUretimSiklikChange={onUretimSiklikChange}
              onCografiDuzeyChange={onCografiDuzeyChange}
              onVeriTuruChange={onVeriTuruChange}
              handleBirimListToggle={handleBirimListToggle} />

            <Grid item xs={10} className={classes.subGrid} container direction="row">
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
                <Grid item xs={5} container direction="row" className={classes.subGrid}>
                  <Grid item xs={12}  className={classes.subGrid}>
                    {istatistikiUrunDetay &&(
                      <Card className={classes.cardIstatistikiUrunDetay}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              <div className={classes.cardIstatistikiUrunDetay}>
                                  {istatistikiUrunDetay.istatistiki_urun_ad}
                              </div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              <Grid container direction="row"> 
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Haber Bülteni
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                      {istatistikiUrunDetay.haber_bulteni}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider />
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Daire Başkanlığı
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.birim_adi}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider />
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretici Birim
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                      {istatistikiUrunDetay.birim_adi}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider />
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretim Sıklığı
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.uretim_siklik}
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Coğrafi Düzey
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.cografi_duzey}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider />
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretim Durumu
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.uretim_durum}
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Veri Türü
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.veri_turu}
                                  </Grid>
                                </Grid>
                              </Grid>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                  <Grid item xs={12}  className={classes.subGrid}>
                    {selectedUrunKod &&(
                      <Card className={classes.cardIstatistikiUrunDetay}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              <div className={classes.cardIstatistikiUrunDetay}>
                                  VERİ KAYNAKLARI
                              </div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              <Grid container direction="row"> 
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={12}>
                                    {idariKayitlar.length>0 &&(
                                      <div style={{fontWeight:'bold'}}>İdari Kayıtlar</div>
                                    )}
                                  </Grid>
                                  <Grid item sm={12}>
                                    <IdariKayitlarList datas={idariKayitlar} classes={classes} />
                                  </Grid>
                                  <Grid item sm={12}>
                                    {anketler.length>0 &&(
                                      <div style={{fontWeight:'bold'}}>Anketler</div>
                                    )}
                                  </Grid>
                                  <Grid item sm={12}>
                                    <AnketlerList datas={anketler} classes={classes} />
                                  </Grid>
                                </Grid>
                              </Grid>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                </Grid>
            </Grid>
        </Grid>       
    </div>
  );
}

export default App;
