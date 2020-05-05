import React, { memo } from 'react'
import { Card, CardContent, IconButton, List, TextField, Typography } from '@material-ui/core'
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
    <Card className={classes.cardIstatistikiUrun}>
      <CardContent>
        <div>
          <Wrapper>
            <SolaYasli>
              <Typography gutterBottom variant="h5" className={classes.cardHeaderIstatistikiUrun}>
                {props.title}
              </Typography>
            </SolaYasli>
            {props.selectedItem && (
              <IconButton color="secondary" onClick={props.handleClickRemoveItem}>
                <HighlightOffIcon/>
              </IconButton>
            )}
          </Wrapper>
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
  )
}
export default memo(Liste)
