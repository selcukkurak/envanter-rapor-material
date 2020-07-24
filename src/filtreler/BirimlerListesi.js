import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'
import { useGlobalState, useSecilenBirimList } from '../store'
import Typography from '@material-ui/core/Typography'
import { turkishTitleCase } from '@tuik/util'
import uniq from 'lodash/uniq'
import keyBy from 'lodash/keyBy'
import { localSort } from '../util/sort'

function birimAdiKisalt (birim) {
  return {
    ...birim,
    adi: birim.adi
      .replace(' Daire Başkanlığı', '')
      .replace(' Dai.bşk.lığı', '')
  }
}

function birimAdiKucult (birim) {
  return {
    ...birim,
    adi: turkishTitleCase(birim.adi)
  }
}

function BirimlerListesi () {
  console.debug('BirimlerListesi Rendered!')
  const classes = useStyles()

  const [birimler,setBirimler] = useGlobalState('birimler')
  const [secilenBirimList, setSecilenBirimList] = useSecilenBirimList()
  const [urunler] = useGlobalState('urunler')

  useEffect(() => {
    Axios.get("/api/birimler")
      .then(response => {
          setBirimler(keyBy(response.data.map(birimAdiKucult), 'id'))
        }
      )
  }, [])

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
    const currentIndex = secilenBirimList.indexOf(value);
    const checkedList = [...secilenBirimList];
    if (currentIndex === -1) {
      checkedList.push(value);
    } else {
      checkedList.splice(currentIndex, 1);
    }
    setSecilenBirimList(checkedList)
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
                  checked={secilenBirimList.indexOf(birim) !== -1}
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
