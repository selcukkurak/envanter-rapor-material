import { List, ListItem } from '@material-ui/core';
import React, { useState } from 'react';
import IdariKayitDetayDialog from './IdariKayitDetayDialog.js';



export default function IdariKayitlarList(props){
    const [selectedItem, setSelectedItem] = useState(null)
    const handleClickItem = (event,index) => {
        setSelectedItem(index);
    }

    return(
      <div>
        <List dense>
            {props.idariKayitlar.map((value) => {
              return (
              <ListItem
                key={value.id}
                button
                selected={selectedItem===value.id}
                onClick={(event) => handleClickItem(event, value.id)}>
                <IdariKayitDetayDialog idariKayitValue={value} />
              </ListItem>
              );
            })}
        </List>
      </div>
    )
}