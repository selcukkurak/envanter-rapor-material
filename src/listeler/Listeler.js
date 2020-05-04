import Liste from './Liste'
import ListeItem from './ListeItem'
import React, { Fragment, memo } from 'react'
import { AnketIkon, IdariKayitIkon } from './ikonlar'
import { Grid } from '@material-ui/core'
import useStyles from '../stiller/useStyles'
import useUrunler from './hook/useUrunler'
import useBultenler from './hook/useBultenler'
import useKaynakKurumlar from './hook/useKaynakKurumlar'

function Listeler () {
  console.debug('Listeler Rendered!')
  const classes = useStyles()

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

  const [
    filteredKaynakKurumlarList,
    selectedKaynakKurum,
    onKurumAramaChange,
    handleClickRemoveKaynakKurumiItem,
    handleClickKaynakKurumItem
  ] = useKaynakKurumlar(filteredIstatistikiUrunList)

  return (
    <Grid item xs={7} className={classes.subGrid} container direction="row">
      <Grid item xs={6} className={classes.subGrid}>
        <Liste
          title={filteredIstatistikiUrunList.length + ' İstatistiki Ürün'}
          selectedItem={selectedUrunKod}
          handleClickRemoveItem={handleClickRemoveItem}
          onAramaChange={onUrunAramaChange}
          items={filteredIstatistikiUrunList}
          itemRenderer={(value) => (
            <ListeItem
              key={value.istatistiki_urun_kod}
              selected={selectedUrunKod === value.istatistiki_urun_kod}
              onClick={(event) => handleClickIstatistikiUrunItem(event, value.istatistiki_urun_kod)}
              text={value.istatistiki_urun_ad}
              rightItems={(
                <Fragment>
                  {value.anket_durumu && <AnketIkon />}
                  {value.idari_kayit_durumu && <IdariKayitIkon />}
                </Fragment>
              )} />
          )} />
      </Grid>
      <Grid item xs={6} className={classes.subGrid}>
        <Liste
          title={filteredHaberBulteniList.length + ' Haber Bülteni'}
          selectedItem={selectedHaberBultenKod}
          handleClickRemoveItem={handleClickRemoveHaberBulteniItem}
          onAramaChange={onHaberBulteniAramaChange}
          items={filteredHaberBulteniList}
          itemRenderer={(value) => (
            <ListeItem
              key={value.kod}
              selected={selectedHaberBultenKod===value.kod}
              onClick={(event) => handleClickBultenItem(event, value.kod)}
              text={value.ad} />
          )} />
      </Grid>
      <Grid item xs={12} className={classes.subGrid}>
        <Liste
          title={filteredKaynakKurumlarList.length + ' Kaynak Kurum'}
          selectedItem={selectedKaynakKurum}
          handleClickRemoveItem={handleClickRemoveKaynakKurumiItem}
          onAramaChange={onKurumAramaChange}
          items={filteredKaynakKurumlarList}
          itemRenderer={(value) => (
            <ListeItem
              key={value.kod}
              selected={selectedKaynakKurum===value.kod}
              onClick={(event) => handleClickKaynakKurumItem(event, value.kod)}
              text={value.ad} />
          )} />
      </Grid>
    </Grid>
  )
}

export default memo(Listeler)
