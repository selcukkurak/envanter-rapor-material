import React, { memo } from 'react'
import { Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useStyles from '../stiller/useStyles'
import { useSecilenVeriTurleri } from '../store'

function VeriTuruListesi () {
  console.debug('VeriTuruListesi Rendered!')
  const classes = useStyles()

  const [, setSecilenVeriTurleri] = useSecilenVeriTurleri()
  const veriTuruList = [
    { kod:'1', ad:'Sayım - Örnekleme' },
    { kod:'2', ad:'İdari kayıt' }
  ]

  const handleChange = (event, values) => {
    setSecilenVeriTurleri(values)
  }

  return (
    <Grid item xs={12} className={classes.subGrid}>
      <Autocomplete
        multiple
        size='small'
        options={veriTuruList}
        getOptionLabel={(option) => option.ad}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Veri Türü"
          />
        )}
      />
    </Grid>
  )
}

export default memo(VeriTuruListesi)
