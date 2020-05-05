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
    <Fragment>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs>
            <Liste
              title={<Fragment><span className={classes.gosterge}>{filteredIstatistikiUrunList.length}</span>  İstatistiki Ürün</Fragment>}
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
          <Grid item xs>
            <Liste
              title={<Fragment><span className={classes.gosterge}>{filteredHaberBulteniList.length}</span>  Haber Bülteni</Fragment>}
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
        </Grid>
      </Grid>
      <Grid item xs>
        <Liste
          title={<Fragment><span className={classes.gosterge}>{filteredKaynakKurumlarList.length}</span>  Kaynak Kurum</Fragment>}
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
    </Fragment>
  )
}

export default memo(Listeler)
