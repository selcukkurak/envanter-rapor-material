import React, { memo } from 'react'
import UretimSikligiListesi from './UretimSikligiListesi'
import VeriTuruListesi from './VeriTuruListesi'
import CografiDuzeyListesi from './CografiDuzeyListesi'
import BirimlerListesi from './BirimlerListesi'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 60px 12px 12px;
`

const Baslik = styled(Typography)`
  color: #ffffff;
  padding: 12px 4px;
  font-size: 1.2em;
`

const Row = styled.div`
  margin-bottom: 24px;
`

function Filtreler () {
  return (
    <Wrapper>
      <Baslik>
        FİLTRELER
      </Baslik>
      <Row>
        <UretimSikligiListesi />
      </Row>
      <Row>
        <VeriTuruListesi />
      </Row>
      <Row>
        <CografiDuzeyListesi />
      </Row>
      <div>
        <BirimlerListesi />
      </div>
    </Wrapper>
  )
}

export default memo(Filtreler)
