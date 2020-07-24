import { Card, CardContent, Typography } from '@material-ui/core'
import IdariKayitlarList from './IdariKayitlarList'
import AnketlerList from './AnketlerList'
import React, { useEffect, useState } from 'react'
import useStyles from '../stiller/useStyles'
import { useGlobalState } from '../store'
import Axios from 'axios'

function DetayListesi () {
  const classes = useStyles()

  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])
  const [seciliUrunId] = useGlobalState('seciliUrunId')

  useEffect(() => {
    if(seciliUrunId) {
      Axios.get(`/api/urunler/${seciliUrunId}/idari-kayitlar`)
        .then(response => setIdariKayitlar(response.data))
    }
    if(seciliUrunId){
      Axios.get(`/api/urunler/${seciliUrunId}/anketler`)
        .then(response => setAnketler(response.data))
    }
  },[seciliUrunId])

  if (anketler.length === 0 && idariKayitlar.length === 0) return null

  return (
    <Card className={classes.cardIstatistikiUrunDetay}>
      <CardContent>
        <div className={classes.cardIstatistikiUrunDetay}>
          <Typography gutterBottom variant="h5" component="h5">
            GİRDİLER
          </Typography>
        </div>
        {idariKayitlar.length > 0 && (
          <div>
            <div style={{fontWeight:'bold'}}>İdari Kayıtlar</div>
            <IdariKayitlarList idariKayitlar={idariKayitlar} classes={classes} />
          </div>
        )}
        {anketler.length > 0 && (
          <div>
            <div style={{fontWeight:'bold'}}>Anketler</div>
            <AnketlerList anketler={anketler} classes={classes} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DetayListesi
