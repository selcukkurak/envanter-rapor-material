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
import { useRecoilValue } from 'recoil/dist'
import { siraliKurumlar } from '../store/selectors'

export default function IdariKayitDetayDialog(props) {
  const {idariKayitValue} = props
  const [open, setOpen] = React.useState(false);
  const kurumlar = useRecoilValue(siraliKurumlar)
  const kurum = kurumlar.find(k => k.id === idariKayitValue.kaynakKurumId)

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
            {idariKayitValue.adi}
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {idariKayitValue.adi}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                İçerik:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.icerik}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Kaynak Kurum:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {kurum && kurum.adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Kaynak Birim:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.kaynakBirim}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Yasal Hükümler:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.yasalHukum}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Veri Biçimi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.bicim && idariKayitValue.bicim.adi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Düzey:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.veriDuzeyi && idariKayitValue.veriDuzeyi.adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Veri Talep Biçimi:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.talepBicimi && idariKayitValue.talepBicimi.adi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Transfer Sıklık:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.transferPeriyot && idariKayitValue.transferPeriyot.adi}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Aktarım Türü:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.aktarimTuru && idariKayitValue.aktarimTuru.adi}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Transfer Sorumlu Birim:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.transferdenSorumluBirim}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Hedef TÜİK Veritabanı:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.veritabani}
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                Hedef TÜİK Şema:
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.sema}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                İletişim E-posta Grubu:
             </Grid>
             <Grid item xs={9}  className={classes.istatistikiUrunDetayValue}>
                {idariKayitValue.epostaGruplari}
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
             <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
                 İletişim:
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Adı</StyledTableCell>
                                <StyledTableCell>Birim</StyledTableCell>
                                <StyledTableCell>Telefon</StyledTableCell>
                                <StyledTableCell>E-Posta</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {idariKayitValue.iletisimKisileri.filter(kisi => kisi.kurumDisi).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.adSoyad}</TableCell>
                                <TableCell>{row.disBirimAdi}</TableCell>
                                <TableCell>{row.telefon}</TableCell>
                                <TableCell>{row.eposta}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
             </Grid>
             <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
                <Divider></Divider>
             </Grid>
            <Grid item xs={3}  className={classes.istatistikiUrunDetayLabel}>
              Kurum İçi İletişim:
            </Grid>
            <Grid item xs={12}  className={classes.istatistikiUrunDetayValue}>
              <TableContainer>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Adı</StyledTableCell>
                      <StyledTableCell>Birim</StyledTableCell>
                      <StyledTableCell>Telefon</StyledTableCell>
                      <StyledTableCell>E-Posta</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {idariKayitValue.iletisimKisileri.filter(kisi => !kisi.kurumDisi).map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.adSoyad}</TableCell>
                        <TableCell>{row.birimId}</TableCell>
                        <TableCell>{row.telefon}</TableCell>
                        <TableCell>{row.eposta}</TableCell>
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
