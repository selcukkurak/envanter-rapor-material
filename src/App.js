import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import 'typeface-roboto'
import AnketlerList from './AnketlerList.js'
import './App.css'
import HeaderBar from './HeaderBar.js'
import IdariKayitlarList from './IdariKayitlarList.js'
import useStyles from './stiller/useStyles'
import Filtreler from './filtreler/Filtreler'
import Listeler from './listeler/Listeler'

function App() {
  console.debug('App Rendered!')
  const classes = useStyles()

  const [secilenUretimSikliklar,setSecilenUretimSikliklar]=useState([])
  const [secilenCografiDuzeyler,setSecilenCografiDuzeyler]=useState([])
  const [secilenVeriTurleri,setSecilenVeriTurleri]=useState([])
  const [secilenBirimList, setSecilenBirimList] = useState([])

  const [selectedUrunKod, setSelectedUrunKod] = useState(null)
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useState(null)
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useState(null)

  const [istatistikiUrunDetay,setIstatistikiUrunDetay]=useState(null)
  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])

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
                <Listeler
                  secilenUretimSikliklar={secilenUretimSikliklar}
                  secilenCografiDuzeyler={secilenCografiDuzeyler}
                  secilenBirimList={secilenBirimList}
                  secilenVeriTurleri={secilenVeriTurleri}
                  selectedUrunKod={selectedUrunKod}
                  setSelectedUrunKod={setSelectedUrunKod}
                  selectedHaberBultenKod={selectedHaberBultenKod}
                  setSelectedHaberBultenKod={setSelectedHaberBultenKod}
                  selectedKaynakKurum={selectedKaynakKurum}
                  setSelectedKaynakKurum={setSelectedKaynakKurum}  />
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
