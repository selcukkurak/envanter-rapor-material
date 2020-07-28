import React, { memo } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSecilenVeriTurleri } from '../store'

function VeriTuruListesi () {
  const [, setSecilenVeriTurleri] = useSecilenVeriTurleri()

  const veriTuruList = [
    { id: '1', adi:'Sayım - Örnekleme' },
    { id: '2', adi:'İdari kayıt' },
    { id: '3', adi: 'Hepsi' }
  ]

  const handleChange = (event, values) => {
    setSecilenVeriTurleri(values)
  }

  return (
    <Autocomplete
      multiple
      size='small'
      options={veriTuruList}
      getOptionLabel={(option) => option.adi}
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
