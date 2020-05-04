import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'typeface-roboto'
import AnketlerList from './AnketlerList.js'
import './App.css'
import HeaderBar from './HeaderBar.js'
import IdariKayitlarList from './IdariKayitlarList.js'
import useStyles from './stiller/useStyles'
import Filtreler from './filtreler/Filtreler'
import Listeler from './listeler/Listeler'
import ListeReset from './listeler/ListeReset'
import { useSelectedUrunKod } from './store'

function App() {
  console.debug('App Rendered!')
  const classes = useStyles()

  const [selectedUrunKod] = useSelectedUrunKod()

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

  return (
    <div className={classes.mainDiv}>
        <HeaderBar />
        <Grid container  className={classes.mainGrid}>
            <Filtreler />
            <Grid item xs={10} className={classes.subGrid} container direction="row">
                <ListeReset />
                <Listeler />
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
