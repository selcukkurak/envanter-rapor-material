import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import useStyles from '../stiller/useStyles'
import UretimSikligiListesi from './UretimSikligiListesi'
import VeriTuruListesi from './VeriTuruListesi'
import CografiDuzeyListesi from './CografiDuzeyListesi'
import BirimlerListesi from './BirimlerListesi'

function Filtreler (props) {
  const classes = useStyles()
  console.debug('Filtreler Rendered!')

  return (
    <Grid item xs={2} className={classes.subGrid}>
      <UretimSikligiListesi onUretimSiklikChange={props.onUretimSiklikChange} />
      <VeriTuruListesi onVeriTuruChange={props.onVeriTuruChange} />
      <CografiDuzeyListesi onCografiDuzeyChange={props.onCografiDuzeyChange} />
      <BirimlerListesi handleBirimListToggle={props.handleBirimListToggle} secilenBirimList={props.secilenBirimList} />
    </Grid>
  )
}

export default memo(Filtreler)
