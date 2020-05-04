import React, { memo, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField } from '@material-ui/core'
import useStyles from '../stiller/useStyles'
import Axios from 'axios'
import { useSecilenUretimSikliklari } from '../store'

function UretimSikligiListesi () {
  console.debug('UretimSikligiListesi Rendered!')
  const classes = useStyles()

  const [uretimSiklikList, setUretimSiklikList] = useState([])
  const [, setSecilenUretimSikliklar] = useSecilenUretimSikliklari()

  useEffect(() => {
    Axios.get("/envanter/rapor/uretim_sikligi")
      .then(response => {
          setUretimSiklikList(response.data)
        }
      )
  }, [])

  const handleChange = (event, values) => {
    setSecilenUretimSikliklar(values)
  }

  return (
    <Grid item xs={12} className={classes.subGrid}>
      <Autocomplete
        multiple
        size="small"
        options={uretimSiklikList}
        getOptionLabel={(option) => option.ad}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Üretim Sıklığı"
          />
        )}
      />
    </Grid>
  )
}

export default memo(UretimSikligiListesi)