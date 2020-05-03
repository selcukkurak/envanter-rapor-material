import React, { memo } from 'react'
import { Card, CardContent, Grid, IconButton, List, TextField, Typography } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import styled from 'styled-components'
import useStyles from '../stiller/useStyles'

const SolaYasli = styled.div`
    flex: 1
`

const Wrapper = styled.div`
  display: flex
`

function Liste (props) {
  const classes = useStyles()

  return (
    <Grid item xs={6} className={classes.subGrid}>
      <Card className={classes.cardIstatistikiUrun}>
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              <Wrapper className={classes.cardHeaderIstatistikiUrun}>
                <SolaYasli>
                  {props.title}
                </SolaYasli>
                {props.selectedItem && (
                  <IconButton color="secondary" onClick={props.handleClickRemoveItem}>
                    <HighlightOffIcon/>
                  </IconButton>
                )}
              </Wrapper>
            </Typography>
            <TextField
              label="Ara"
              type="search"
              onChange={props.onAramaChange}/>
          </div>
          <List dense className={classes.istatistikiUrunList}>
            {props.items.map(props.itemRenderer)}
          </List>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default memo(Liste)
