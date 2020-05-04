import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import useStyles from '../stiller/useStyles'
import UretimSikligiListesi from './UretimSikligiListesi'
import VeriTuruListesi from './VeriTuruListesi'
import CografiDuzeyListesi from './CografiDuzeyListesi'
import BirimlerListesi from './BirimlerListesi'

function Filtreler () {
  const classes = useStyles()
  console.debug('Filtreler Rendered!')

  return (
    <Grid item xs={2} className={classes.subGrid}>
      <h4 className={classes.baslik}>
        FİLTRELER
      </h4>
      <div className={classes.marginBottom}>
        <UretimSikligiListesi />
      </div>
      <div className={classes.marginBottom}>
        <VeriTuruListesi />
      </div>
      <div className={classes.marginBottom}>
        <CografiDuzeyListesi />
      </div>
      <div className={classes.marginBottom}>
        <BirimlerListesi />
      </div>
    </Grid>
  )
}

export default memo(Filtreler)
