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
    handleClickBultenItem,
    siraliBultenler
  ] = useBultenler(filteredIstatistikiUrunList)

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
              title={<Fragment><span className={classes.gosterge}>{filteredIstatistikiUrunList.length}</span>  İstatistiki Ürün</Fragment>}
              selectedItem={selectedUrunKod}
              handleClickRemoveItem={handleClickRemoveItem}
              onAramaChange={onUrunAramaChange}
              items={filteredIstatistikiUrunList}
              itemRenderer={(urun) => (
                <ListeItem
                  key={urun.id}
                  selected={selectedUrunKod === urun.id}
                  onClick={(event) => handleClickIstatistikiUrunItem(event, urun.id)}
                  text={urun.adi}
                  rightItems={(
                    <Fragment>
                      {urun.anket_durumu && <AnketIkon />}
                      {urun.idari_kayit_durumu && <IdariKayitIkon />}
                    </Fragment>
                  )} />
              )} />
          </Grid>
          <Grid item xs>
            <Liste
              title={<Fragment><span className={classes.gosterge}>{siraliBultenler.length}</span>  Haber Bülteni</Fragment>}
              selectedItem={selectedHaberBultenKod}
              handleClickRemoveItem={handleClickRemoveHaberBulteniItem}
              onAramaChange={onHaberBulteniAramaChange}
              items={siraliBultenler}
              itemRenderer={(value) => (
                <ListeItem
                  key={value.id}
                  selected={selectedHaberBultenKod===value.id}
                  onClick={(event) => handleClickBultenItem(event, value.id)}
                  text={value.adi} />
              )} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <Liste
          title={<Fragment><span className={classes.gosterge}>{kaynakKurumlarList.length}</span>  Kaynak Kurum</Fragment>}
          selectedItem={selectedKaynakKurum}
          handleClickRemoveItem={handleClickRemoveKaynakKurumiItem}
          onAramaChange={onKurumAramaChange}
          items={kaynakKurumlarList}
          itemRenderer={(value) => (
            <ListeItem
              key={value.id}
              selected={selectedKaynakKurum===value.id}
              onClick={(event) => handleClickKaynakKurumItem(event, value.id)}
              text={value.adi} />
          )} />
      </Grid>
    </Fragment>
  )
}

export default memo(Listeler)
