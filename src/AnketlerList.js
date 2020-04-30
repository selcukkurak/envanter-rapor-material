import { List, ListItem } from '@material-ui/core';
import React, { useState } from 'react';
import AnketDetayDialog from './AnketDetayDialog.js';



export default function AnketlerList(props){
    const {datas} = props;
    const [selectedItem, setSelectedItem] = useState(null)
    const handleClickItem = (event,index) => {
        setSelectedItem(index);
    }

    return(
      <div>
        <List dense style={{backgroundColor:'white'}}>
		{datas.map((value) => {
		  //const labelId = `checkbox-list-secondary-label-${value.istatistiki_urun_kod}`;
		  return (
			<ListItem 
				key={value.id} 
				button
				selected={selectedItem===value.id}
				onClick={(event) => handleClickItem(event, value.id)}>
			  	
              	<AnketDetayDialog anketValue={value}></AnketDetayDialog>
			</ListItem>
		  );
		})}
		</List>   
      </div>
    )
}