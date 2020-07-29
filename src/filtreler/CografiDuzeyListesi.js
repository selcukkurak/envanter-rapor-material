import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { memo } from 'react'
import { referanslarState, seciliCografiDuzeylerState } from '../store'
import { useRecoilValue, useSetRecoilState } from 'recoil/dist'

function CografiDuzeyListesi () {
  const referanslar = useRecoilValue(referanslarState)
  const setSecilenCografiDuzeyler = useSetRecoilState(seciliCografiDuzeylerState)

  const handleChange = (event, values) => {
    setSecilenCografiDuzeyler(values)
  }

  const cografiDuzeyler = referanslar.COGRAFI_DUZEY || []

  return (
    <Autocomplete
      multiple
      size="small"
      options={cografiDuzeyler}
      getOptionLabel={(option) => option.adi}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Coğrafi Düzey"
          InputLabelProps={{
            style: {
              color: 'white',
            } }}
        />
      )}
    />
  )
}

export default memo(CografiDuzeyListesi)
