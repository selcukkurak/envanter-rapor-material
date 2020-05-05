import {
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { DialogActions, DialogContent, DialogTitle } from './dialog'

export default function IdariKayitDetayDialog(props) {
  const {idarKayitValue} = props  
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
            {idarKayitValue.idari_kayit_ad}
        </Grid>
      </Grid>
      

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {idarKayitValue.idari_kayit_ad}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                İçerik:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.veri_icerik}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Kaynak Kurum:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.kaynak_kurum_adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Kaynak Özet:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Yasal Hükümler:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.yasal_hukum}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Veri Biçimi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.veri_bicimi_adi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Düzey:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.veri_duzeyi_adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Aktarım Türü:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.veri_aktarim_turu_adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Hedef TÜİK Veritabanı:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.verinin_tutuldugu_veritabani}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Hedef TÜİK Şema:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.verinin_tutuldugu_sema}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                İletişim E-posta Grubu:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idarKayitValue.eposta_grup}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <TableContainer title="İletişim">
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Adı</StyledTableCell>
                                <StyledTableCell>Telefon</StyledTableCell>
                                <StyledTableCell>E-Posta</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {idarKayitValue.iletisim_dis.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.iletisim_dis_ad_soyad}</TableCell>
                                <TableCell>{row.iletisim_dis_telefon}</TableCell>
                                <TableCell>{row.iletisim_dis_eposta}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
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
