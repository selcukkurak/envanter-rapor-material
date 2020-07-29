import React, { memo } from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { seciliVeriTuruState } from '../store'
import { useSetRecoilState } from 'recoil/dist'

function VeriTuruListesi () {
  const setSecilenVeriTuru = useSetRecoilState(seciliVeriTuruState)

  const veriTuruList = [
    { id: 1, adi:'Sayım - Örnekleme' },
    { id: 2, adi:'İdari kayıt' },
    { id: 3, adi: 'Hepsi' }
  ]

  const handleChange = (event, values) => {
    setSecilenVeriTuru(values)
  }

  return (
    <Autocomplete
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
