import React, { Fragment, memo } from 'react'
import useStyles from '../stiller/useStyles'
import UretimSikligiListesi from './UretimSikligiListesi'
import VeriTuruListesi from './VeriTuruListesi'
import CografiDuzeyListesi from './CografiDuzeyListesi'
import BirimlerListesi from './BirimlerListesi'
import Typography from '@material-ui/core/Typography'

function Filtreler () {
  const classes = useStyles()
  console.debug('Filtreler Rendered!')

  return (
    <Fragment>
      <Typography className={classes.filtrelerBaslik}>
        FİLTRELER
      </Typography>
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
    </Fragment>
  )
}

export default memo(Filtreler)
