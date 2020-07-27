import { createMuiTheme } from '@material-ui/core'
import { AnaRenkler } from '@tuik/renkler'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: AnaRenkler.kirmizi,
      main: AnaRenkler.koyuKirmizi,
      dark: AnaRenkler.cokKoyuKirmizi,
    }
  }
})

export default {
  ...theme,
  overrides: {
    MuiListItem: {
      dense: {
        paddingTop: 2,
        paddingBottom: 2
      },
      gutters: {
        paddingLeft: 8,
        paddingRight: 8
      }
    }
  }
}