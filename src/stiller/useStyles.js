import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  cardIstatistikiUrun: {
    background: '#D0D4D8',
  },
  cardHeaderIstatistikiUrun: {
    color: '#5A6F7B',
    fontSize: '0.8em',
    fontWeight: 'bold',
  },

  cardHaberBulteni: {
    background: '#D0D4D8',
  },
  cardHeaderHaberBulteni: {
    color: '#5A6F7B',
    fontSize: '0.8em',
    fontWeight: 'bold',
  },

  cardIstatistikiUrunDetay: {
    color: '#5A6F7B',
    fontSize: '0.8em',
  },

  cardKaynakKurumlar: {
    background: '#D0D4D8',
  },

  cardHeaderKaynakKurumlar: {
    color: '#5A6F7B',
    fontSize: '0.8em',
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
    fontSize: '0.9em',
    color: '#5A6F7B',
  },

  haberBulteniList: {
    height: 300,
    overflow: 'auto',
    paddingTop: 0,
    fontSize: '0.9em',
    color: '#5A6F7B',
  },

  kaynakKurumList: {
    maxHeight: 300,
    overflow: 'auto',
    paddingTop: 0,
    fontSize: '0.9em',
    color: '#5A6F7B',
  },
  filterlist: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 200,
    overflow: 'auto',
  },
  filterlistitem: {
    paddingTop: 0,
    paddingBottom: 0,
    color: '#157DBD',
    fontSize:'0.7em',
    margin: -15,
  },
  mainDiv: {
    backgroundColor: '#EFEFEF',
    flexGrow: 1,
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
    fontSize: '0.9em',
  },
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
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}))