import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { Grid, makeStyles, Divider, Table, TableHead, TableCell, TableBody, TableRow, TableContainer } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" component="h2">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#5A6F7B',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const classes = useStyles()
  return (
    <div>
      <Grid container onClick={handleClickOpen}>
        <Grid item xs={12} 
            style={{paddingTop:5, color:'#5A6F7B', textDecoration:'underline',fontSize:'0.9em'}}>
            {anketValue.anket_ad}
        </Grid>
      </Grid>
      

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {anketValue.anket_ad}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item direction="row">
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Periyodu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.periyodu}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Veri Düzeyi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.veri_birim_duzeyi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Örneklem Boyutu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.orneklem_sayisi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Coğrafi Düzeyi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                 {anketValue.cografi_duzeyi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Şeması:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.calisma_sema}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Üst Durumu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {anketValue.ust_durumu}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Harzemli Durumu:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                 {anketValue.harzemli_durumu}
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
