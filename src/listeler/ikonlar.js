import { Chip, Tooltip } from '@material-ui/core'
import React from 'react'

export const AnketIkon = props => (
  <Tooltip title="Anket">
    <Chip variant="outlined" size="small"
          label="a"/>
  </Tooltip>
)

export const IdariKayitIkon = props => (
  <Tooltip title="İdari Kayıt">
    <Chip variant="outlined" size="small"
          label="i"/>
  </Tooltip>
)
