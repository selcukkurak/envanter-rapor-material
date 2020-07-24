import { Divider, Grid, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import React from 'react'
import { DialogActions, DialogContent, DialogTitle } from './dialog'

export default function AnketDetayDialog(props) {
  const {anketValue} = props  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    istatistikiUrunDetayLabel: {
      fontSize:'0.8em',
      fontWeight:'bold', 
      color:'black',
      paddingTop:10
    },
    istatistikiUrunDetayValue: {
      fontSize:'0.8em',
      color:'black',
      paddingTop:10
    },
  }))

 
  const classes = useStyles()

  const ustDurumu = anketValue.ustDurumu
    ? anketValue.ustDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'

  const harzemliDurumu = anketValue.harzemliDurumu
    ? anketValue.harzemliDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'
  return (
    <div>
      <Grid container onClick={handleClickOpen}>
        <Grid item xs={12} 
            style={{paddingTop:5, color:'#5A6F7B', textDecoration:'underline',fontSize:'0.9em'}}>
            {anketValue.adi}
        </Grid>
      </Grid>
      

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {anketValue.adi}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Periyodu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.periyot ? anketValue.periyot.adi : '-'}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Veri Düzeyi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.birimDuzeyi ? anketValue.birimDuzeyi.adi : '-'}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Örneklem Boyutu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.orneklemSayisi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Coğrafi Düzeyi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                 {anketValue.cografiDuzey ? anketValue.cografiDuzey.adi : '-'}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Şeması:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.sema}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Üst Durumu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {ustDurumu}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Harzemli Durumu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                 {harzemliDurumu}
             </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
