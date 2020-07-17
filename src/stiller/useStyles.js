import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  marginBottom: {
    marginBottom: 24
  },
  gosterge: {
    color: '#ab2328'
  },
  cardIstatistikiUrun: {
    width: '100%'
  },
  cardHeaderIstatistikiUrun: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  cardHaberBulteni: {
    width: '100%'
  },
  cardHeaderHaberBulteni: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  cardKaynakKurumlar: {
    width: '100%'
  },

  cardHeaderKaynakKurumlar: {
    color: '#5A6F7B',
    fontWeight: 'bold',
  },

  cardIstatistikiUrunDetay: {
    width: '100%',
    color: '#5A6F7B',
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
  filtrelerBaslik: {
    color: '#ffffff',
    padding: '12px 4px',
    fontSize: '1.2em'
  },
  birimlerBaslik: {
    color: '#fff',
    padding: '12px 4px',
    fontSize: '1.3em',
    textDecoration: 'underline'
  },
  filterlistitem: {
    color: '#ffffff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
    paddingBottom: 0
  },
  listitemUrun: {
  },
  istatistikiUrunDetayLabel: {
    fontWeight:'bold',
    color:'#333333',
    paddingTop:10
  },
  istatistikiUrunDetayValue: {
    color:'#333333',
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
  filtrelerTema: {
    padding: '60px 12px 12px',
  },
}))