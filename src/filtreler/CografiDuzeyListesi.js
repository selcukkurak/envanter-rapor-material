import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { memo } from 'react'
import { useGlobalState, useSecilenCografiDuzeyler } from '../store'

function CografiDuzeyListesi () {
  const [referanslar] = useGlobalState('referanslar')
  const [, setSecilenCografiDuzeyler] = useSecilenCografiDuzeyler()

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
