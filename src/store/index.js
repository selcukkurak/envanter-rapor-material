import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  urunler: [],
  birimler: {},
  selectedUrunKod: null,
  selectedHaberBulteni: null,
  selectedKaynakKurum: null,
  secilenUretimSikliklari: [],
  secilenVeriTurleri: [],
  secilenCografiDuzeyler: [],
  secilenBirimList: []
}

export const { useGlobalState } = createGlobalState(initialState)

export const useSelectedUrunKod = () => useGlobalState('selectedUrunKod')
export const useSelectedHaberBulteni = () => useGlobalState('selectedHaberBulteni')
export const useSelectedKaynakKurum = () => useGlobalState('selectedKaynakKurum')
export const useSecilenUretimSikliklari = () => useGlobalState('secilenUretimSikliklari')
export const useSecilenVeriTurleri = () => useGlobalState('secilenVeriTurleri')
export const useSecilenCografiDuzeyler = () => useGlobalState('secilenCografiDuzeyler')
export const useSecilenBirimList = () => useGlobalState('secilenBirimList')
