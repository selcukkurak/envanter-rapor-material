import { List, ListItem } from '@material-ui/core'
import React from 'react'
import { useSetRecoilState } from 'recoil/dist'
import { seciliUrunState } from '../store'

export default function BagliUrunList (props) {
    const setSeciliUrunId = useSetRecoilState(seciliUrunState)

    const handleClickItem = (event,index) => {
        setSeciliUrunId(index);
    }

    return(
      <div>
        <List dense>
            {props.urunler.map((value) => {
              return (
                <ListItem
                  key={value.id}
                  button
                  onClick={(event) => handleClickItem(event, value.id)}>
                    <div style={{paddingTop:5, color:'#5A6F7B', textDecoration:'underline',fontSize:'0.9em'}}>
                        {value.adi}
                    </div>
                </ListItem>
              );
            })}
        </List>
      </div>
    )
}