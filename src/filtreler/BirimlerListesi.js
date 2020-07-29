import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React, { memo } from 'react'
import { seciliBirimlerState } from '../store'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil/dist'
import { siraliUrunDaireleri } from '../store/selectors'

const Baslik = styled(Typography)`
  color: #fff;
  padding: 12px 4px;
  font-size: 1.3em;
  text-decoration: underline;
`

const ListItemIconStyled = styled(ListItemIcon).attrs({
  style: {
    minWidth: 0
  }
})``

const ListItemTextWhite = styled(ListItemText)`
  color: white;
`

const CheckBoxWhite = styled(Checkbox)`
  &.MuiCheckbox-root, &.MuiCheckbox-root.Mui-checked {
    color: white;
  }
`

function BirimlerListesi () {
  const [seciliBirimler, setSeciliBirimler] = useRecoilState(seciliBirimlerState)
  const daireler = useRecoilValue(siraliUrunDaireleri)

  const handleToggle = (value) => () => {
    if (seciliBirimler.includes(value)) setSeciliBirimler([])
    else setSeciliBirimler([value])
  }

  return (
    <div>
      <Baslik>Birimler</Baslik>
      <List dense>
        {daireler.map((birim) => (
          <ListItem
            key={birim.id}
            button
            onClick={handleToggle(birim.id)}>
            <ListItemIconStyled>
              <CheckBoxWhite
                edge="start"
                checked={seciliBirimler.includes(birim.id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIconStyled>
            <ListItemTextWhite primary={birim.adi} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default memo(BirimlerListesi)
