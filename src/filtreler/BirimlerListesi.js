import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo, useMemo } from 'react'
import useStyles from '../stiller/useStyles'
import { useGlobalState } from '../store'
import Typography from '@material-ui/core/Typography'
import uniq from 'lodash/uniq'
import { localSort } from '../util/sort'

function birimAdiKisalt (birim) {
  return {
    ...birim,
    adi: birim.adi
      .replace(' Daire Başkanlığı', '')
      .replace(' Dai.bşk.lığı', '')
  }
}

function BirimlerListesi () {
  const classes = useStyles()

  const [urunler] = useGlobalState('urunler')
  const [birimler] = useGlobalState('birimler')
  const [seciliBirimler, setSeciliBirimler] = useGlobalState('seciliBirimler')

  const daireler = useMemo(() => {
    const urunBirimIdleri = uniq(urunler.map(urun => urun.birimId)) // listelenen ürünlerin tekil birim idlerini bul
    const daireIdleri = uniq(urunBirimIdleri.map(id => birimler[id].ustBirimId)) // birim idlerinden daire idlerini bul

    return  localSort(
      daireIdleri
        .map(id => birimler[id])
        .map(birimAdiKisalt),
      'adi'
    )// idlerden daireleri bul, adlarını kısalt, sırala
  }, [urunler, birimler])

  const handleToggle = (value) => () => {
    const currentIndex = seciliBirimler.indexOf(value);
    const checkedList = [...seciliBirimler];
    if (currentIndex === -1) {
      checkedList.push(value);
    } else {
      checkedList.splice(currentIndex, 1);
    }
    setSeciliBirimler(checkedList)
  }

  return (
    <div>
      <Typography className={classes.birimlerBaslik}>Birimler</Typography>
      <List dense>
        {daireler.map((birim) => {
          const labelId = `checkbox-list-label-${birim.id}`;

          return (
            <ListItem
              key={birim.id}
              button
              className={classes.filterlistitem}
              onClick={handleToggle(birim)}>
              <ListItemIcon
                style={{minWidth:0, padding:2}}>
                <Checkbox
                  edge="start"
                  checked={seciliBirimler.indexOf(birim) !== -1}
                  tabIndex={-1}
                  disableRipple
                  style={{color: 'white'}}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={birim.adi}/>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default memo(BirimlerListesi)
