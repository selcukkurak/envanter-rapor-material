import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo, useEffect, useState } from 'react'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'
import { useSecilenBirimList } from '../store'
import Typography from '@material-ui/core/Typography'

function BirimlerListesi () {
  console.debug('BirimlerListesi Rendered!')
  const classes = useStyles()

  const [birimlerList,setBirimlerList] = useState([])
  const [secilenBirimList, setSecilenBirimList] = useSecilenBirimList()

  useEffect(() => {
    Axios.post("/envanter/rapor/ik_ust_birimler")
      .then(response => {
          setBirimlerList(response.data)
        }
      )
  }, [])

  const handleToggle = (value) => () => {
    //console.log("Birim:",value)
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
      <List>
        {birimlerList.map((value) => {
          const labelId = `checkbox-list-label-${value.ustBirimId}`;

          return (
            <ListItem
              key={value.ustBirimId}
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
                id={labelId}
                primary={value.ust_birim_adi}/>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default memo(BirimlerListesi)
