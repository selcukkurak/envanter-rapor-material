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

function App() {
  console.debug('App Rendered!')

  return (
    <Wrapper>
        <HeaderBar />
        <ListeReset />
        <Grid container spacing={2}>
            <Grid item xs={2}>
              <Filtreler />
            </Grid>
            <Grid item xs={10}>
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
            </Grid>
        </Grid>
    </Wrapper>
  );
}

export default memo(App);
