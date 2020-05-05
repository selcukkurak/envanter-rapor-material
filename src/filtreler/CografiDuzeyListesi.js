import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { memo, useEffect, useState } from 'react'
import Axios from 'axios'
import { useSecilenCografiDuzeyler } from '../store'

function CografiDuzeyListesi () {
  console.debug('CografiDuzeyListesi Rendered!')

  const [cografiDuzeyList, setCografiDuzeyList]=useState([])
  const [, setSecilenCografiDuzeyler] = useSecilenCografiDuzeyler()

  useEffect(() => {
    Axios.get("/envanter/rapor/cografi_duzey")
      .then(response => {
          setCografiDuzeyList(response.data)
        }
      )
  }, [])

  const handleChange = (event, values) => {
    setSecilenCografiDuzeyler(values)
  }

  return (
    <Autocomplete
      multiple
      size="small"
      options={cografiDuzeyList}
      getOptionLabel={(option) => option.ad}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Coğrafi Düzey"
        />
      )}
    />
  )
}

export default memo(CografiDuzeyListesi)
