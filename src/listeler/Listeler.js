import Liste from './Liste'
import ListeItem from './ListeItem'
import React, { Fragment, memo } from 'react'
import { AnketIkon, IdariKayitIkon } from './ikonlar'
import { Grid } from '@material-ui/core'
import useUrunler from './hook/useUrunler'
import useBultenler from './hook/useBultenler'
import useKaynakKurumlar from './hook/useKaynakKurumlar'
import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'

const Gosterge = styled.div`
  display: inline-block;
  color: ${AnaRenkler.koyuKirmizi};
  margin-right: 12px;
`

const GostergeHeader = props => (
  <Fragment>
    <Gosterge>{props.gosterge}</Gosterge>
    {props.baslik}
  </Fragment>
)

function Listeler () {
  const [
    filtreliUrunler,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ] = useUrunler()

  const [
    filtreliBultenler,
    selectedHaberBultenKod,
    onHaberBulteniAramaChange,
    handleClickRemoveHaberBulteniItem,
    handleClickBultenItem
  ] = useBultenler(filtreliUrunler)

  const [
    filtreliKurumlar,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem
  ] = useKaynakKurumlar(filtreliUrunler)

  return (
    <Fragment>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs>
            <Liste
              title={<GostergeHeader gosterge={filtreliUrunler.length} baslik='İstatistiki Ürün' />}
              selectedItem={selectedUrunKod}
              handleClickRemoveItem={handleClickRemoveItem}
              onAramaChange={onUrunAramaChange}
              length={filtreliUrunler.length}
              itemRenderer={(index, key) => {
                const urun = filtreliUrunler[index]
                return (
                  <ListeItem
                    key={key}
                    selected={selectedUrunKod === urun.id}
                    onClick={(event) => handleClickIstatistikiUrunItem(event, urun.id)}
                    text={urun.adi}
                    rightItems={(
                      <Fragment>
                        {urun.sayilar.anket !== 0 && <AnketIkon />}
                        {urun.sayilar.idariKayit !== 0 && <IdariKayitIkon />}
                      </Fragment>
                    )} />
                )
              }} />
          </Grid>
          <Grid item xs>
            <Liste
              title={<GostergeHeader gosterge={filtreliBultenler.length} baslik='Haber Bülteni' />}
              selectedItem={selectedHaberBultenKod}
              handleClickRemoveItem={handleClickRemoveHaberBulteniItem}
              onAramaChange={onHaberBulteniAramaChange}
              length={filtreliBultenler.length}
              itemRenderer={(index, key) => {
                const bulten = filtreliBultenler[index]
                return (
                  <ListeItem
                    key={key}
                    selected={selectedHaberBultenKod===bulten.id}
                    onClick={(event) => handleClickBultenItem(event, bulten.id)}
                    text={bulten.adi} />
                )
              }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Liste
          title={<GostergeHeader gosterge={filtreliKurumlar.length} baslik='Kaynak Kurum' />}
          selectedItem={selectedKaynakKurum}
          handleClickRemoveItem={handleClickRemoveKaynakKurumiItem}
          onAramaChange={onKurumAramaChange}
          length={filtreliKurumlar.length}
          itemRenderer={(index, key) => {
            const kurum = filtreliKurumlar[index]
            return (
              <ListeItem
                key={key}
                selected={selectedKaynakKurum===kurum.id}
                onClick={(event) => handleClickKaynakKurumItem(event, kurum.id)}
                text={kurum.adi} />
            )
          }} />
      </Grid>
    </Fragment>
  )
}

export default memo(Listeler)
