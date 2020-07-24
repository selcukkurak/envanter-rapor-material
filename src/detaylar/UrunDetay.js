import React, { memo } from 'react'
import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import useStyles from '../stiller/useStyles'
import { useGlobalState } from '../store'

function UrunDetay () {
  const classes = useStyles()

  const [urunler] = useGlobalState('urunler')
  const [bultenler] = useGlobalState('bultenler')
  const [birimler] = useGlobalState('birimler')
  const [seciliUrunId] = useGlobalState('seciliUrunId')

  const urun = urunler.find(urun => urun.id === seciliUrunId)

  if (!urun) return null

  const bulten = urun.bultenler &&
    urun.bultenler.length !== 0 &&
    bultenler.find(b => b.id === urun.bultenler[0].bultenId)

  const birim = birimler[urun.birimId]
  const daire = birimler[birim.ustBirimId]

  return (
    <div className={classes.marginBottom}>
      <Card className={classes.cardIstatistikiUrunDetay}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            <div className={classes.cardIstatistikiUrunDetay}>
              {urun.adi}
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Grid container>
              <Grid item sm={12} container>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Haber Bülteni
                </Grid>
                <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                  <a href={bulten.sonYayin.url} target='_blank' title={bulten.sonYayin.donemi}>{bulten.adi}</a>
                </Grid>
              </Grid>
              <Divider />
              <Grid item sm={12} container>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Daire Başkanlığı
                </Grid>
                <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                  {daire.adi}
                </Grid>
              </Grid>
              <Divider />
              <Grid item sm={12} container>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Üretici Birim
                </Grid>
                <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                  {birim.adi}
                </Grid>
              </Grid>
              <Divider />
              <Grid item sm={12} container>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Üretim Sıklığı
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                  {urun.periyot ? urun.periyot.adi : '-'}
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Coğrafi Düzey
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                  {urun.cografiDuzey ? urun.cografiDuzey.adi : '-'}
                </Grid>
              </Grid>
              <Divider />
              <Grid item sm={12} container>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Üretim Durumu
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                  {urun.uretiliyor ? 'Üretiliyor' : 'Üretilmiyor'}
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                  Veri Türü
                </Grid>
                <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                  {urun.veri_turu}
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
