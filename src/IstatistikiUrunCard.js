import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

export default function IdariKayitDetayDialog(props) {
    const {liste} = props
    const [selectedUrunKod, setSelectedUrunKod] = useState(null)

    const useStyles = makeStyles((theme) => ({
        cardIstatistikiUrun: {
            background: '#D0D4D8',
        },
        cardHeaderIstatistikiUrun: {
            color: '#5A6F7B',
            fontSize: '0.8em',
            fontWeight: 'bold',
        },
        list: {
            height: 300, 
            overflow: 'auto',
        },
    }))

    const handeClickIstatistikiUrunItem = (event,index) => {
        setSelectedUrunKod(index);
    }

    const classes = useStyles()

    return (
        <Card className={classes.cardIstatistikiUrun}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    <div className={classes.cardHeaderIstatistikiUrun}>
                         {liste.length} İstatistiki Ürün
                    </div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <List dense className={classes.list}>
                      {liste.map((value) => {
                        //const labelId = `checkbox-list-secondary-label-${value.istatistiki_urun_kod}`;
                        return (
                        <ListItem 
                            key={value.istatistiki_urun_kod} 
                            button
                            selected={selectedUrunKod===value.istatistiki_urun_kod}
                            onClick={(event) => handeClickIstatistikiUrunItem(event, value.istatistiki_urun_kod)}>
                            <ListItemText primary={value.istatistiki_urun_ad} 
                                className={classes.listitemUrun}
                                disableTypography/>
                        </ListItem>
                        );
                    })}
                    </List>
                </Typography>
            </CardContent>
        </Card>
    )
}