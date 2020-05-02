import React, { memo, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, TextField } from '@material-ui/core'
import useStyles from '../stiller/useStyles'
import Axios from 'axios'

function UretimSikligiListesi (props) {
  console.debug('UretimSikligiListesi Rendered!')
  const classes = useStyles()
  const [uretimSiklikList, setUretimSiklikList] = useState([])

  useEffect(() => {
    Axios.get("/envanter/rapor/uretim_sikligi")
      .then(response => {
          setUretimSiklikList(response.data)
        }
      )
  }, [])

  return (
    <Grid item xs={12} className={classes.subGrid}>
      Üretim Sıklığı:
      <Autocomplete
        multiple
        size="small"
        options={uretimSiklikList}
        getOptionLabel={(option) => option.ad}
        onChange={props.onUretimSiklikChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Üretim Sıklığı"
          />
        )}
      />
    </Grid>
  )
}

export default memo(UretimSikligiListesi)