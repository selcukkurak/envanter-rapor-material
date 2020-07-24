import { useMemo } from 'react'
import { useSelectedUrunKod } from '../../store'

export default function useFilteredHaberBulteniList (filteredIstatistikiUrunList, haberBulteniList, arananHaberBulteni) {
  const [selectedUrunKod] = useSelectedUrunKod()

  return useMemo(() => {
    const secilenIstatistikiUrunKodlar = filteredIstatistikiUrunList.map(data => data.bulten_kod)
    const seciliUrun = filteredIstatistikiUrunList.find(data => data.istatistiki_urun_kod === selectedUrunKod)

    return haberBulteniList.filter(data => {
      if (seciliUrun) {
        return (seciliUrun.bulten_kod === data.id)
      } else if (arananHaberBulteni) {
        return (data.adi.toLowerCase().includes(arananHaberBulteni.toLowerCase()))
      } else {
        return secilenIstatistikiUrunKodlar.includes(data.id)
      }
    })
  }, [
    haberBulteniList,
    filteredIstatistikiUrunList,
    selectedUrunKod,
    arananHaberBulteni
  ])
}
