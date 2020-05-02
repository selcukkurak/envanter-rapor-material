import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import 'typeface-roboto'
import AnketlerList from './AnketlerList.js'
import './App.css'
import HeaderBar from './HeaderBar.js'
import IdariKayitlarList from './IdariKayitlarList.js'
import useStyles from './stiller/useStyles'

const SolaYasli = styled.div`
    flex: 1
`

const Wrapper = styled.div`
  display: flex
`

function App() {
  console.debug('App Rendered!')
  const [uretimSiklikList,setUretimSiklikList]=useState([])
  const [cografiDuzeyList,setCografiDuzeyList]=useState([])
  const [birimlerList,setBirimlerList]=useState([])
  const [veriTuruList,setVeriTuruList]=useState([])
  const [secilenUretimSikliklar,setSecilenUretimSikliklar]=useState([])
  const [secilenCografiDuzeyler,setSecilenCografiDuzeyler]=useState([])
  const [secilenVeriTurleri,setSecilenVeriTurleri]=useState([])
  const [secilenBirimList, setSecilenBirimList] = useState([])
  
  const [haberBulteniList,setHaberBulteniList]=useState([])
  
  //const [istatistikiUrunSayisi,setIstatistikiUrunSayisi]=useState()
  const [istatistikiUrunList,setIstatistikiUrunList]=useState([])
  //const [filteredIstatistikiUrunList,setFilteredIstatistikiUrunList]=useState([])
  const [selectedUrunKod, setSelectedUrunKod] = useState(null)
  const [arananUrun, setArananUrun] = useState(null)
  const [selectedHaberBultenKod, setSelectedHaberBultenKod] = useState(null)
  const [arananHaberBulteni, setArananHaberBulteni] = useState(null)
  const [arananKurum, setArananKurum] = useState(null)
  
  const [selectedKaynakKurum, setSelectedKaynakKurum] = useState(null)

  const [kaynakKurumlarList,setKaynakKurumlarList]=useState([])
  const [istatistikiUrunDetay,setIstatistikiUrunDetay]=useState(null)
  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])

  useEffect(()=>{
    loadIstatistikiUrunList()
    loadHaberBulteniList()
    loadUretimSiklikList()
    loadCografiDuzeyList()
    loadBirimlerList()
    loadKaynakKurumlarList()
    loadVeriTurleri()
  },[])

  const filteredIstatistikiUrunList=useMemo(()=>{
    //setSelectedUrunKod(null)
    return filterIstatistikiUrunList()
  },[filterIstatistikiUrunList,arananUrun,selectedUrunKod,istatistikiUrunList,secilenUretimSikliklar,secilenCografiDuzeyler, secilenBirimList,secilenVeriTurleri,selectedHaberBultenKod,selectedKaynakKurum])
  
  const filteredHaberBulteniList=useMemo(
    ()=>{
    return filterHaberBulteniList()
  },[filterHaberBulteniList,haberBulteniList, filteredIstatistikiUrunList,selectedUrunKod,arananHaberBulteni])

  const filteredKaynakKurumlarList=useMemo(
    ()=>{
    return filterKaynakKurumList()
  },[filterKaynakKurumList,kaynakKurumlarList, filteredIstatistikiUrunList,selectedUrunKod,arananKurum])

  useEffect(()=>{
     loadIstatistikiUrunDetayi()
     loadIdariKayitlar()
     loadAnketler()
  },[selectedUrunKod,loadIstatistikiUrunDetayi,loadIdariKayitlar,loadAnketler])


  function loadUretimSiklikList(){
    Axios.get("/envanter/rapor/uretim_sikligi")
    .then(response=>{
          setUretimSiklikList(response.data)
        }
    )
  }

  function loadCografiDuzeyList(){
    Axios.get("/envanter/rapor/cografi_duzey")
    .then(response=>{
          setCografiDuzeyList(response.data)
        }
    )
  }


  function filterIstatistikiUrunList(){
    const secilenUretimSikliklarKodlar=secilenUretimSikliklar.map(data=>data.kod)
    const secilenCografiDuzeylerKodlar=secilenCografiDuzeyler.map(data=>data.kod)
    const secilenBirimListKodlar=secilenBirimList.map(data=>data.id)
    const secilenVeriTuruKodlar=secilenVeriTurleri.map(data=>data.kod)
    
    return istatistikiUrunList.filter(data=>{
        return (secilenUretimSikliklarKodlar.length===0  || secilenUretimSikliklarKodlar.includes(Number(data.uretim_siklik)) )
              && (secilenCografiDuzeylerKodlar.length===0  || secilenCografiDuzeylerKodlar.includes(Number(data.cografi_duzey_kod)))
              && (secilenBirimListKodlar.length===0  || secilenBirimListKodlar.includes(data.ic_birim_kod))
              && (secilenVeriTuruKodlar.length===0  || secilenVeriTuruKodlar.includes(data.veriTurleri.toString()))
              && (!selectedHaberBultenKod || selectedHaberBultenKod===data.bulten_kod)
              && (!selectedKaynakKurum || data.kaynak_kurumlar.toString().includes(selectedKaynakKurum))
              && (!selectedUrunKod || selectedUrunKod===data.istatistiki_urun_kod)
              && (!arananUrun || data.istatistiki_urun_ad.toLowerCase().includes(arananUrun.toLowerCase()))
    })
  }

  function loadIstatistikiUrunList(){
    Axios.post("/envanter/rapor/istatistiki_urunler")
    .then(response=>{
          setIstatistikiUrunList(response.data)
        }
    )
  }

  function filterHaberBulteniList(){
    const secilenIstatistikiUrunKodlar=filteredIstatistikiUrunList.map(data=>data.bulten_kod)
    const seciliUrun = filteredIstatistikiUrunList.find(data => data.istatistiki_urun_kod === selectedUrunKod)
    return haberBulteniList.filter(data=>{
        if(seciliUrun){
          return (seciliUrun.bulten_kod === data.kod)
        } else if(arananHaberBulteni){
          return (data.ad.toLowerCase().includes(arananHaberBulteni.toLowerCase()))
        } else{
          return secilenIstatistikiUrunKodlar.includes(data.kod)
        }
    })
  }

  function loadHaberBulteniList(){
    Axios.post("/envanter/rapor/haber_bultenleri")
    .then(response=>{
          setHaberBulteniList(response.data)
          //setHaberBulteniSayisi(response.data.length)
        }
    )
  }


  function loadKaynakKurumlarList(){
    Axios.post("/envanter/rapor/idari_kayit_kaynak_kurumlar")
    .then(response=>{
          setKaynakKurumlarList(response.data)
        }
    )
  }

  function filterKaynakKurumList(){
    const secilenIstatistikiUrunlerinKaynakKurumkodlar=filteredIstatistikiUrunList
        .filter(data=> data.kaynak_kurumlar)
        .flatMap(data=>data.kaynak_kurumlar)
        //.filter(data => data)
    //console.log('kodlar-->',secilenIstatistikiUrunlerinKaynakKurumkodlar)
    const seciliUrun = filteredIstatistikiUrunList.find(data => data.istatistiki_urun_kod === selectedUrunKod)
    //console.log('ürün kurumu-->',seciliUrun)
    return kaynakKurumlarList.filter(data=>{
        if(seciliUrun){
          if(seciliUrun.kaynak_kurumlar){
            return (seciliUrun.kaynak_kurumlar.includes(data.kod.toString()))
          }else{
            return false
          }
        }else if(arananKurum){
          return (data.ad.toLowerCase().includes(arananKurum.toLowerCase()))
        } else{
          return secilenIstatistikiUrunlerinKaynakKurumkodlar.includes(data.kod.toString())
        }
    })
  }

  function loadVeriTurleri(){
    const list = [
      {
          kod:'1', ad:'Sayım - Örnekleme'
      },
      {
          kod:'2', ad:'İdari kayıt'
      }
    ]
    setVeriTuruList(list)
  }
  


  function loadBirimlerList(){
    Axios.post("/envanter/rapor/ik_birimler")
    .then(response=>{
          setBirimlerList(response.data)
        }
    )
  }

  const onUretimSiklikChange = (event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenUretimSikliklar(values)
  }

  const onCografiDuzeyChange = (event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenCografiDuzeyler(values)
  }

  const onVeriTuruChange = (event, values) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSecilenVeriTurleri(values)
  }


  const onUrunAramaChange = (event) => {
    setArananUrun(event.target.value)
  }

  const onHaberBulteniAramaChange = (event) => {
    setArananHaberBulteni(event.target.value)
  }

  const onKurumAramaChange = (event) => {
    setArananKurum(event.target.value)
  }

  const handleClickRemoveItem = (event) =>{
    setSelectedUrunKod(null)
  }

  const handleClickRemoveHaberBulteniItem = (event) =>{
    setSelectedHaberBultenKod(null)
  }
  
  const handleClickRemoveKaynakKurumiItem = (event) =>{
    setSelectedKaynakKurum(null)
  }

  const handleBirimListToggle = (value) => () => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)

    const currentIndex = secilenBirimList.indexOf(value);
    const checkedList = [...secilenBirimList];
    if (currentIndex === -1) {
      checkedList.push(value);
    } else {
      checkedList.splice(currentIndex, 1);
    }
    setSecilenBirimList(checkedList)
  }

  const handeClickIstatistikiUrunItem = (event,index) => {
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(null)
    setSelectedUrunKod(index);
  }

  const handeClickBultenItem = (event,index) => {
    setSelectedUrunKod(null)
    setSelectedKaynakKurum(null)
    setSelectedHaberBultenKod(index);
  }

  const handeClickKaynakKurumItem = (event,index) => {
    setSelectedUrunKod(null)
    setSelectedHaberBultenKod(null)
    setSelectedKaynakKurum(index);
  }

  function loadIstatistikiUrunDetayi(){
    Axios.post("/envanter/rapor/istatistiki_urunler/"+selectedUrunKod)
    .then(response=>{
          setIstatistikiUrunDetay(response.data)
        }
    )
  }
  
  function loadIdariKayitlar(){
    if(selectedUrunKod){
      Axios.post("/envanter/rapor/envanter_idari_kayitlar/"+selectedUrunKod)
      .then(response=>{
            setIdariKayitlar(response.data)
          }
      )
    }
  }

  function loadAnketler(){
    if(selectedUrunKod){
      Axios.post("/envanter/rapor/envanter_anketler/"+selectedUrunKod)
      .then(response=>{
            setAnketler(response.data)
          }
      )
    }
    
  }

  const classes = useStyles()

  return (
    <div className={classes.mainDiv}>
        <HeaderBar></HeaderBar>
        <Grid container  className={classes.mainGrid}> 
            <Grid item xs={2} className={classes.subGrid}>
                <Grid item xs={12} className={classes.subGrid}>
                    Üretim Sıklığı:
                    <Autocomplete
                      multiple
                      size="small"
                      id="tags-standard"
                      options={uretimSiklikList}
                      getOptionLabel={(option) => option.ad}
                      onChange={onUretimSiklikChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          placeholder="Üretim Sıklığı"
                        />
                      )}
                    />
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    <div><br></br></div>
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    Veri Türü:
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={veriTuruList}
                      getOptionLabel={(option) => option.ad}
                      onChange={onVeriTuruChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          placeholder="Veri Türü"
                        />
                      )}
                    />
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    <div><br></br></div>
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    Coğrafi Düzey:
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      size="small"
                      options={cografiDuzeyList}
                      getOptionLabel={(option) => option.ad}
                      onChange={onCografiDuzeyChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          placeholder="Coğrafi Düzey"
                        />
                      )}
                    />
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    <div><br></br></div>
                </Grid>
                <Grid item xs={12} className={classes.subGrid}>
                    Birimler:
                    <Divider></Divider>
                    <List className={classes.filterlist}>
                      {birimlerList.map((value) => {
                        const labelId = `checkbox-list-label-${value.ic_birim_kod}`;

                        return (
                          <ListItem key={value.id} dense button className={classes.filterlistitem}
                            onClick={handleBirimListToggle(value)}>
                            <ListItemIcon
                              style={{minWidth:0, padding:2}}>
                              <Checkbox
                                edge="start"
                                checked={secilenBirimList.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography 
                                id={labelId} 
                                primary={value.adi}/>
                          </ListItem>
                        )
                      })}
                    </List>
                </Grid>
            </Grid>
            
            <Grid item xs={10} className={classes.subGrid} container direction="row">
                <Grid item xs={7} className={classes.subGrid} container direction="row">
                  <Grid item xs={6} className={classes.subGrid}>
                    <Card className={classes.cardIstatistikiUrun}>
                        <CardContent>
                          <div>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Wrapper className={classes.cardHeaderIstatistikiUrun}>
                                    <SolaYasli>
                                      {filteredIstatistikiUrunList.length} İstatistiki Ürün
                                    </SolaYasli>
                                    {selectedUrunKod && 
                                      <IconButton color="secondary" onClick={handleClickRemoveItem}>
                                        <HighlightOffIcon/>
                                      </IconButton>}
                                </Wrapper>
                            </Typography>
                            <TextField 
                              label="Ürün Ara" 
                              type="search"
                              onChange={onUrunAramaChange}/>
                          </div>
                          <List dense className={classes.istatistikiUrunList}>
                            {filteredIstatistikiUrunList.map((value) => {
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
                                  {
                                    value.anket_durumu &&(
                                      <Tooltip title="Anket">
                                          <Chip variant="outlined" size="small"
                                            label="a"/>
                                      </Tooltip>
                                    )
                                  }
                                  {
                                    value.idari_kayit_durumu &&(
                                      <Tooltip title="İdari Kayıt">
                                          <Chip variant="outlined" size="small"
                                            label="i"/>
                                      </Tooltip>)
                                  }  
                                </ListItem>
                              );
                            })}
                          </List>
                        </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} className={classes.subGrid}>
                    <Card className={classes.cardHaberBulteni}>
                        <CardContent>
                          <div>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Wrapper className={classes.cardHeaderHaberBulteni}>
                                  <SolaYasli>
                                    {filteredHaberBulteniList.length} Haber Bülteni
                                  </SolaYasli>
                                  {selectedHaberBultenKod && 
                                    <IconButton onClick={handleClickRemoveHaberBulteniItem}>
                                      <HighlightOffIcon 
                                        color="secondary"/>
                                    </IconButton>}
                                </Wrapper>
                            </Typography>
                            <TextField 
                              label="Bülten Ara" 
                              type="search"
                              onChange={onHaberBulteniAramaChange}/>
                          </div>
                          <List dense className={classes.haberBulteniList}>
                            {filteredHaberBulteniList.map((value) => {
                              const labelId = `checkbox-list-secondary-label-${value.kod}`;
                              return (
                                <ListItem key={value.kod} 
                                  button
                                  selected={selectedHaberBultenKod===value.kod}
                                  onClick={(event) => handeClickBultenItem(event, value.kod)}>
                                  <ListItemText id={labelId} primary={value.ad} 
                                    className={classes.listitemUrun}
                                    disableTypography/>
                                </ListItem>
                              );
                            })}
                          </List>
                        </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}  className={classes.subGrid}>
                    <Card className={classes.cardKaynakKurumlar}>
                        <CardContent>
                          <div>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Wrapper className={classes.cardHeaderKaynakKurumlar}>
                                  <SolaYasli>
                                    {filteredKaynakKurumlarList.length} Kaynak Kurum
                                  </SolaYasli>
                                  {selectedKaynakKurum && 
                                    <IconButton onClick={handleClickRemoveKaynakKurumiItem}>
                                      <HighlightOffIcon color="secondary" 
                                      />
                                    </IconButton>}
                                </Wrapper>
                            </Typography>
                            <TextField 
                              label="Kurum Ara" 
                              type="search"
                              onChange={onKurumAramaChange}/>
                          </div>
                          
                          <List dense className={classes.kaynakKurumList}>
                            {filteredKaynakKurumlarList.map((value) => {
                              const labelId = `checkbox-list-secondary-label-${value.kod}`;
                              return (
                                <ListItem key={value.kod} 
                                  button
                                  selected={selectedKaynakKurum===value.kod}
                                  onClick={(event) => handeClickKaynakKurumItem(event, value.kod)}>
                                  <ListItemText id={labelId} primary={value.ad} 
                                    className={classes.listitemUrun}
                                    disableTypography/>
                                </ListItem>
                              );
                            })}
                          </List>
                          
                        </CardContent>
                    </Card>
                  </Grid> 
                </Grid>
                <Grid item xs={5} container direction="row" className={classes.subGrid}>
                  <Grid item xs={12}  className={classes.subGrid}>
                    {selectedUrunKod &&(
                      <Card className={classes.cardIstatistikiUrunDetay}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              <div className={classes.cardIstatistikiUrunDetay}>
                                  {istatistikiUrunDetay.istatistiki_urun_ad}
                              </div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              <Grid container direction="row"> 
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Haber Bülteni
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                      {istatistikiUrunDetay.haber_bulteni}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider></Divider>
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Daire Başkanlığı
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.birim_adi}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider></Divider>
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretici Birim
                                  </Grid>
                                  <Grid item sm={9} className={classes.istatistikiUrunDetayValue}>
                                      {istatistikiUrunDetay.birim_adi}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider></Divider>
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretim Sıklığı
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.uretim_siklik}
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Coğrafi Düzey
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.cografi_duzey}
                                  </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                  <Divider></Divider>
                                </Grid>
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Üretim Durumu
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.uretim_durum}
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayLabel}>
                                      Veri Türü
                                  </Grid>
                                  <Grid item sm={3} className={classes.istatistikiUrunDetayValue}>
                                    {istatistikiUrunDetay.veri_turu}
                                  </Grid>
                                </Grid>
                              </Grid>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                  <Grid item xs={12}  className={classes.subGrid}>
                    {selectedUrunKod &&(
                      <Card className={classes.cardIstatistikiUrunDetay}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              <div className={classes.cardIstatistikiUrunDetay}>
                                  VERİ KAYNAKLARI
                              </div>
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              <Grid container direction="row"> 
                                <Grid item sm={12} container direction="row">
                                  <Grid item sm={12}>
                                    {idariKayitlar.length>0 &&(
                                      <div style={{fontWeight:'bold'}}>İdari Kayıtlar</div>
                                    )}
                                  </Grid>
                                  <Grid item sm={12}>
                                    <IdariKayitlarList datas={idariKayitlar} classes={classes}></IdariKayitlarList>
                                  </Grid>
                                  <Grid item sm={12}>
                                    {anketler.length>0 &&(
                                      <div style={{fontWeight:'bold'}}>Anketler</div>
                                    )}
                                  </Grid>
                                  <Grid item sm={12}>
                                    <AnketlerList datas={anketler} classes={classes}></AnketlerList>
                                  </Grid>
                                </Grid>
                              </Grid>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                </Grid>
            </Grid>
        </Grid>       
    </div>
  );
}

export default App;
