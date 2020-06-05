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
    color: '#666666',
    padding: '12px 4px',
    fontSize: '1.2em'
  },
  birimlerBaslik: {
    color: '#5A6F7B',
    padding: '12px 16px',
    fontSize: '1.1em'
  },
  filterlistitem: {
    color: '#ab2328'
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
}))