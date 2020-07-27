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
import useSiraliBultenler from './hook/useSiraliBultenler'

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
    filteredIstatistikiUrunList,
    selectedUrunKod,
    onUrunAramaChange,
    handleClickRemoveItem,
    handleClickIstatistikiUrunItem
  ] = useUrunler()

  const [
    filteredHaberBulteniList,
    selectedHaberBultenKod,
    onHaberBulteniAramaChange,
    handleClickRemoveHaberBulteniItem,
    handleClickBultenItem
  ] = useBultenler(filteredIstatistikiUrunList)

  const [siraliBultenler] = useSiraliBultenler()

  const [
    filteredKaynakKurumlarList,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem,
    kaynakKurumlarList
  ] = useKaynakKurumlar(filteredIstatistikiUrunList)

  return (
    <Fragment>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs>
            <Liste
              title={<GostergeHeader gosterge={filteredIstatistikiUrunList.length} baslik='İstatistiki Ürün' />}
              selectedItem={selectedUrunKod}
              handleClickRemoveItem={handleClickRemoveItem}
              onAramaChange={onUrunAramaChange}
              length={filteredIstatistikiUrunList.length}
              itemRenderer={(index, key) => {
                const urun = filteredIstatistikiUrunList[index]
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
              title={<GostergeHeader gosterge={siraliBultenler.length} baslik='Haber Bülteni' />}
              selectedItem={selectedHaberBultenKod}
              handleClickRemoveItem={handleClickRemoveHaberBulteniItem}
              onAramaChange={onHaberBulteniAramaChange}
              length={siraliBultenler.length}
              itemRenderer={(index, key) => {
                const bulten = siraliBultenler[index]
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
          title={<GostergeHeader gosterge={kaynakKurumlarList.length} baslik='Kaynak Kurum' />}
          selectedItem={selectedKaynakKurum}
          handleClickRemoveItem={handleClickRemoveKaynakKurumiItem}
          onAramaChange={onKurumAramaChange}
          length={kaynakKurumlarList.length}
          itemRenderer={(index, key) => {
            const kurum = kaynakKurumlarList[index]
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
