import { Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo, useEffect, useState } from 'react'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'
import { useSecilenBirimList } from '../store'

function BirimlerListesi () {
  console.debug('BirimlerListesi Rendered!')
  const classes = useStyles()

  const [birimlerList,setBirimlerList] = useState([])
  const [secilenBirimList, setSecilenBirimList] = useSecilenBirimList()

  useEffect(() => {
    Axios.post("/envanter/rapor/ik_birimler")
      .then(response => {
          setBirimlerList(response.data)
        }
      )
  }, [])

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
    <Grid item xs={12} className={classes.subGrid}>
      Birimler:
      <Divider />
      <List className={classes.filterlist}>
        {birimlerList.map((value) => {
          const labelId = `checkbox-list-label-${value.ic_birim_kod}`;

          return (
            <ListItem
              key={value.id}
              dense
              button
              className={classes.filterlistitem}
              onClick={handleToggle(value)}>
              <ListItemIcon
                style={{minWidth:0, padding:2}}>
                <Checkbox
                  edge="start"
                  checked={secilenBirimList.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                id={labelId}
                primary={value.adi}/>
            </ListItem>
          )
        })}
      </List>
    </Grid>
  )
}

export default memo(BirimlerListesi)
