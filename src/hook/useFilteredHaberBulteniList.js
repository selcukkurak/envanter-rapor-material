import { useMemo } from 'react'

export default function useFilteredHaberBulteniList (filteredIstatistikiUrunList, selectedUrunKod, haberBulteniList, arananHaberBulteni) {
  return useMemo(() => {
    const secilenIstatistikiUrunKodlar = filteredIstatistikiUrunList.map(data => data.bulten_kod)
    const seciliUrun = filteredIstatistikiUrunList.find(data => data.istatistiki_urun_kod === selectedUrunKod)

    return haberBulteniList.filter(data => {
      if (seciliUrun) {
        return (seciliUrun.bulten_kod === data.kod)
      } else if (arananHaberBulteni) {
        return (data.ad.toLowerCase().includes(arananHaberBulteni.toLowerCase()))
      } else {
        return secilenIstatistikiUrunKodlar.includes(data.kod)
      }
    })
  }, [
    haberBulteniList,
    filteredIstatistikiUrunList,
    selectedUrunKod,
    arananHaberBulteni
  ])
}
