import React, { memo } from 'react'
import { Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useStyles from '../stiller/useStyles'

function VeriTuruListesi (props) {
  console.debug('VeriTuruListesi Rendered!')
  const classes = useStyles()
  const veriTuruList = [
    { kod:'1', ad:'Sayım - Örnekleme' },
    { kod:'2', ad:'İdari kayıt' }
  ]

  return (
    <Grid item xs={12} className={classes.subGrid}>
      Veri Türü:
      <Autocomplete
        multiple
        size='small'
        options={veriTuruList}
        getOptionLabel={(option) => option.ad}
        onChange={props.onVeriTuruChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Veri Türü"
          />
        )}
      />
    </Grid>
  )
}

export default memo(VeriTuruListesi)
