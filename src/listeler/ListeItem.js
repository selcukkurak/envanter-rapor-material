import { ListItem, ListItemText } from '@material-ui/core'
import React, { memo } from 'react'
import useStyles from '../stiller/useStyles'

function ListeItem (props) {
  const classes = useStyles()

  return (
    <ListItem
      button
      selected={props.selected}
      onClick={props.onClick}>
      <ListItemText primary={props.text}
                    className={classes.listitemUrun}
                    disableTypography/>
      {props.rightItems}
    </ListItem>
  )
}

export default memo(ListeItem)
