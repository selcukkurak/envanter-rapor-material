import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import 'typeface-roboto'
import './App.css'
import HeaderBar from './HeaderBar.js'
import useStyles from './stiller/useStyles'
import Filtreler from './filtreler/Filtreler'
import Listeler from './listeler/Listeler'
import ListeReset from './listeler/ListeReset'
import UrunDetay from './detaylar/UrunDetay'
import DetayListesi from './detaylar/DetayListesi'

function App() {
  console.debug('App Rendered!')
  const classes = useStyles()

  return (
    <div className={classes.mainDiv}>
        <HeaderBar />
        <Grid container  className={classes.mainGrid}>
            <Filtreler />
            <Grid item xs={10} className={classes.subGrid} container direction="row">
                <Grid item xs={7} className={classes.subGrid} container direction="row">
                  <ListeReset />
                  <Listeler />
                </Grid>
                <Grid item xs={5} container direction="row" className={classes.subGrid}>
                  <Grid item xs={12}  className={classes.subGrid}>
                    <UrunDetay />
                  </Grid>
                  <Grid item xs={12}  className={classes.subGrid}>
                    <DetayListesi />
                  </Grid>
                </Grid>
            </Grid>
        </Grid>       
    </div>
  );
}

export default memo(App);
