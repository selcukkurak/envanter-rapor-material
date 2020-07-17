import { Grid } from '@material-ui/core'
import React, { memo } from 'react'
import 'typeface-roboto'
import './App.css'
import HeaderBar from './HeaderBar.js'
import Filtreler from './filtreler/Filtreler'
import Listeler from './listeler/Listeler'
import ListeReset from './listeler/ListeReset'
import UrunDetay from './detaylar/UrunDetay'
import DetayListesi from './detaylar/DetayListesi'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 62px 16px 16px;
`

const YanMenu = styled.div`
  width: 320px;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: auto;
`

const OrtaBolme = styled.div`
  margin-left: 320px;
`

function App() {
  return (
    <Wrapper>
        <HeaderBar />
        <ListeReset />
        <YanMenu>
          <Filtreler />
        </YanMenu>
        <OrtaBolme>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Grid container direction="column" spacing={2}>
                <Listeler />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <UrunDetay />
              <DetayListesi />
            </Grid>
          </Grid>
        </OrtaBolme>
    </Wrapper>
  );
}

export default memo(App);
