import React, { memo } from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { AnaRenkler, BaslikRenkleri } from '@tuik/renkler'
import { useRecoilValue } from 'recoil/dist'
import { birimlerById, seciliUrun } from '../store/selectors'

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const CardHeader = styled.div`
  padding: 16px 16px 4px;
  border-bottom: 1px solid ${AnaRenkler.acikGri};
`

const Header = styled.div`
  color: ${BaslikRenkleri.gri};
  font-weight: bold;
`

const Label = props => (
  <Typography variant='body2' color='primary' component='p'>
    {props.children}
  </Typography>
)

const Row = styled.div`
  margin-bottom: 12px;
`

const uretimDurumu = durum => durum ? 'Üretiliyor' : 'Üretilmiyor'

function UrunDetay () {
  const birimler = useRecoilValue(birimlerById)
  const urun = useRecoilValue(seciliUrun)

  if (!urun) return null

  const birim = birimler[urun.birimId]
  const daire = birimler[birim.ustBirimId]

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Typography gutterBottom variant="h5">
            <Header>{urun.adi}</Header>
          </Typography>
        </CardHeader>
        <CardContent>
          <div>
            <Row>
              <Grid container>
                <Grid item sm={3}>
                  <Label>Daire Başkanlığı</Label>
                </Grid>
                <Grid item sm={9}>
                  {daire.adi}
                </Grid>
              </Grid>
            </Row>
            <Row>
              <Grid container>
                <Grid item sm={3}>
                  <Label>Üretici Birim</Label>
                </Grid>
                <Grid item sm={9}>
                  {birim.adi}
                </Grid>
              </Grid>
            </Row>
            <Row>
              <Grid container>
                <Grid item sm={3}>
                  <Label>Üretim Sıklığı</Label>
                </Grid>
                <Grid item sm={3}>
                  {urun.periyot ? urun.periyot.adi : '-'}
                </Grid>
                <Grid item sm={3}>
                  <Label>Coğrafi Düzey</Label>
                </Grid>
                <Grid item sm={3}>
                  {urun.cografiDuzey ? urun.cografiDuzey.adi : '-'}
                </Grid>
              </Grid>
            </Row>
            <Row>
              <Grid container>
                <Grid item sm={3}>
                  <Label>Üretim Durumu</Label>
                </Grid>
                <Grid item sm={3}>
                  {uretimDurumu(urun.uretiliyor)}
                </Grid>
              </Grid>
            </Row>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default memo(UrunDetay)
