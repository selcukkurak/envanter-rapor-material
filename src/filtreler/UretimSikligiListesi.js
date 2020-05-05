import React, { memo, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import Axios from 'axios'
import { useSecilenUretimSikliklari } from '../store'

function UretimSikligiListesi () {
  console.debug('UretimSikligiListesi Rendered!')

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
  )
}

export default memo(UretimSikligiListesi)