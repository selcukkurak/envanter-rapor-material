import React, { memo } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSecilenVeriTurleri } from '../store'

function VeriTuruListesi () {
  console.debug('VeriTuruListesi Rendered!')

  const [, setSecilenVeriTurleri] = useSecilenVeriTurleri()
  const veriTuruList = [
    { kod:'1', ad:'Sayım - Örnekleme' },
    { kod:'2', ad:'İdari kayıt' }
  ]

  const handleChange = (event, values) => {
    setSecilenVeriTurleri(values)
  }

  return (
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
          InputLabelProps={{
            style: {
              color: 'white',
            } }}
        />
      )}
    />
  )
}

export default memo(VeriTuruListesi)
