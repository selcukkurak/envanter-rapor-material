import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import IdariKayitlarList from './IdariKayitlarList'
import AnketlerList from './AnketlerList'
import React, { useEffect, useState } from 'react'
import useStyles from '../stiller/useStyles'
import { useSelectedUrunKod } from '../store'
import Axios from 'axios'

function DetayListesi () {
  const classes = useStyles()

  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])
  const [selectedUrunKod] = useSelectedUrunKod()

  useEffect(() => {
    if(selectedUrunKod) {
      Axios.get("/envanter/rapor/envanter_idari_kayitlar/"+selectedUrunKod)
        .then(response => {
            setIdariKayitlar(response.data)
          }
        )
    }
    if(selectedUrunKod){
      Axios.get("/envanter/rapor/envanter_anketler/"+selectedUrunKod)
        .then(response => {
            setAnketler(response.data)
          }
        )
    }
  },[selectedUrunKod])

  if (anketler.length === 0 && idariKayitlar.length === 0) return null

  return (
    <Card className={classes.cardIstatistikiUrunDetay}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <div className={classes.cardIstatistikiUrunDetay}>
            VERİ KAYNAKLARI
          </div>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <Grid container>
            <Grid item sm={12} container>
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
  )
}

export default DetayListesi
