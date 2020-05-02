import { Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { memo, useEffect, useState } from 'react'
import Axios from 'axios'
import useStyles from '../stiller/useStyles'

function CografiDuzeyListesi (props) {
  console.debug('CografiDuzeyListesi Rendered!')
  const classes = useStyles()
  const [cografiDuzeyList,setCografiDuzeyList]=useState([])

  useEffect(() => {
    Axios.get("/envanter/rapor/cografi_duzey")
      .then(response => {
          setCografiDuzeyList(response.data)
        }
      )
  }, [])

  return (
    <Grid item xs={12} className={classes.subGrid}>
      Coğrafi Düzey:
      <Autocomplete
        multiple
        size="small"
        options={cografiDuzeyList}
        getOptionLabel={(option) => option.ad}
        onChange={props.onCografiDuzeyChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Coğrafi Düzey"
          />
        )}
      />
    </Grid>
  )
}

export default memo(CografiDuzeyListesi)
