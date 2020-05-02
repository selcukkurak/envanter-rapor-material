import { Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo, useEffect, useState } from 'react'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'

function BirimlerListesi (props) {
  console.debug('BirimlerListesi Rendered!')
  const classes = useStyles()
  const [birimlerList,setBirimlerList]=useState([])

  useEffect(() => {
    Axios.post("/envanter/rapor/ik_birimler")
      .then(response => {
          setBirimlerList(response.data)
        }
      )
  }, [])

  return (
    <Grid item xs={12} className={classes.subGrid}>
      Birimler:
      <Divider />
      <List className={classes.filterlist}>
        {birimlerList.map((value) => {
          const labelId = `checkbox-list-label-${value.ic_birim_kod}`;

          return (
            <ListItem key={value.id} dense button className={classes.filterlistitem}
                      onClick={props.handleBirimListToggle(value)}>
              <ListItemIcon
                style={{minWidth:0, padding:2}}>
                <Checkbox
                  edge="start"
                  checked={props.secilenBirimList.indexOf(value) !== -1}
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
