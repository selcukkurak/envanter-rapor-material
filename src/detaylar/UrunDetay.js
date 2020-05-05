import React, { memo, useEffect, useState } from 'react'
import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import useStyles from '../stiller/useStyles'
import Axios from 'axios'
import { useSelectedUrunKod } from '../store'

function UrunDetay () {
  const classes = useStyles()

  const [istatistikiUrunDetay, setIstatistikiUrunDetay] = useState(null)
  const [selectedUrunKod] = useSelectedUrunKod()

  useEffect(() => {
    if (selectedUrunKod) {
      Axios.get("/envanter/rapor/istatistiki_urunler/"+selectedUrunKod)
        .then(response=>{
            setIstatistikiUrunDetay(response.data)
          }
        )
    }
  }, [selectedUrunKod])

  if (!istatistikiUrunDetay) return null

  return (
    <div className={classes.marginBottom}>
      <Card className={classes.cardIstatistikiUrunDetay}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            <div className={classes.cardIstatistikiUrunDetay}>
              {istatistikiUrunDetay.istatistiki_urun_ad}
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Grid container>
              <Grid item sm={12} container>
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
              <Grid item sm={12} container>
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
              <Grid item sm={12} container>
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
              <Grid item sm={12} container>
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
              <Grid item sm={12} container>
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
    </div>
  )
}

export default memo(UrunDetay)
