import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  marginBottom: {
    marginBottom: 24
  },
  cardIstatistikiUrun: {
    background: '#D0D4D8',
  },
  cardHeaderIstatistikiUrun: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  cardHaberBulteni: {
    background: '#D0D4D8',
  },
  cardHeaderHaberBulteni: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  cardIstatistikiUrunDetay: {
    color: '#5A6F7B',
  },

  cardKaynakKurumlar: {
    background: '#D0D4D8',
  },

  cardHeaderKaynakKurumlar: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  list: {
    height: 300,
    overflow: 'auto',
  },

  istatistikiUrunList: {
    height: 300,
    overflow: 'auto',
    paddingTop: 0,
    color: '#5A6F7B',
  },

  haberBulteniList: {
    height: 300,
    overflow: 'auto',
    paddingTop: 0,
    color: '#5A6F7B',
  },

  kaynakKurumList: {
    maxHeight: 300,
    overflow: 'auto',
    paddingTop: 0,
    color: '#5A6F7B',
  },
  baslik: {
    color: '#666666',
    marginBottom: 12
  },
  birimlerBaslik: {
    color: '#666666',
    padding: '12px 16px'
  },
  filterlist: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 400,
    overflow: 'auto',
  },
  filterlistitem: {
    paddingTop: 0,
    paddingBottom: 0,
    color: '#157DBD'
  },
  mainDiv: {
    padding: 12,
    backgroundColor: '#EFEFEF',
  },
  mainGrid: {
    paddingTop: 50,
  },
  subGrid: {
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  listitemUrun: {
  },
  istatistikiUrunDetayLabel: {
    fontWeight:'bold',
    color:'black',
    paddingTop:10
  },
  istatistikiUrunDetayValue: {
    color:'black',
    paddingTop:10
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  avatarSmall: {
    width: 12,
    height: 12,
  },
}))