import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  urunler: [],
  bultenler: [],
  birimler: {},
  referanslar: {},
  seciliUrunId: null,
  selectedHaberBulteni: null,
  selectedKaynakKurum: null,
  secilenUretimSikliklari: [],
  secilenVeriTurleri: [],
  secilenCografiDuzeyler: [],
  seciliBirimler: []
}

export const { useGlobalState } = createGlobalState(initialState)

export const useSelectedUrunKod = () => useGlobalState('seciliUrunId')
export const useSelectedHaberBulteni = () => useGlobalState('selectedHaberBulteni')
export const useSelectedKaynakKurum = () => useGlobalState('selectedKaynakKurum')
export const useSecilenUretimSikliklari = () => useGlobalState('secilenUretimSikliklari')
export const useSecilenVeriTurleri = () => useGlobalState('secilenVeriTurleri')
export const useSecilenCografiDuzeyler = () => useGlobalState('secilenCografiDuzeyler')
