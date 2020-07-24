import { useMemo } from 'react'
import { useSelectedUrunKod } from '../../store'

export default function useFilteredKaynakKurumlarList (filteredIstatistikiUrunList, kaynakKurumlarList, arananKurum) {
  const [selectedUrunKod] = useSelectedUrunKod()

  return useMemo(() => {
    const secilenIstatistikiUrunlerinKaynakKurumkodlar = filteredIstatistikiUrunList
      .filter(data => data.kaynak_kurumlar)
      .flatMap(data => data.kaynak_kurumlar)

    const seciliUrun = filteredIstatistikiUrunList.find(data => data.istatistiki_urun_kod === selectedUrunKod)

    return kaynakKurumlarList.filter(data => {
      if (seciliUrun) {
        if (seciliUrun.kaynak_kurumlar) {
          return (seciliUrun.kaynak_kurumlar.includes(data.id.toString()))
        } else {
          return false
        }
      } else if (arananKurum) {
        return (data.adi.toLowerCase().includes(arananKurum.toLowerCase()))
      } else {
        return secilenIstatistikiUrunlerinKaynakKurumkodlar.includes(data.id.toString())
      }
    })
  }, [
    kaynakKurumlarList,
    filteredIstatistikiUrunList,
    selectedUrunKod,
    arananKurum
  ])
}
