import React, { memo } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'
import { referanslarState, seciliUretimSikliklariState } from '../store'
import { useRecoilValue, useSetRecoilState } from 'recoil/dist'

function UretimSikligiListesi () {
  const referanslar = useRecoilValue(referanslarState)
  const setSecilenUretimSikliklar = useSetRecoilState(seciliUretimSikliklariState)

  const handleChange = (event, values) => {
    setSecilenUretimSikliklar(values)
  }

  const periyotlar = referanslar.PERIYOT || []

  return (
    <Autocomplete
      multiple
      size="small"
      options={periyotlar}
      getOptionLabel={(option) => option.adi}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Üretim Sıklığı"
          InputLabelProps={{
            style: {
              color: 'white',
            } }}
        />
      )}
    />
  )
}

export default memo(UretimSikligiListesi)