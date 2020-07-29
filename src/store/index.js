import { atom } from 'recoil/dist'

export const urunlerState = atom({ key: 'urunlerState', default: [] })
export const bultenlerState = atom({ key: 'bultenlerState', default: [] })
export const birimlerState = atom({ key: 'birimlerState', default: [] })
export const referanslarState = atom({ key: 'referanslarState', default: [] })

export const seciliUrunState = atom({ key: 'seciliUrunState', default: null })
export const seciliBultenState = atom({ key: 'seciliBultenState', default: null })
export const seciliKaynakKurumState = atom({ key: 'seciliKaynakKurumState', default: null })
export const seciliVeriTuruState = atom({ key: 'seciliVeriTuruState', default: null })

export const seciliUretimSikliklariState = atom({ key: 'seciliUretimSikliklariState', default: [] })
export const seciliCografiDuzeylerState = atom({ key: 'seciliCografiDuzeylerState', default: [] })
export const seciliBirimlerState = atom({ key: 'seciliBirimlerState', default: [] })
