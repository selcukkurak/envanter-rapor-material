import { useMemo } from 'react'
import {
  useSecilenBirimList,
  useSecilenCografiDuzeyler,
  useSecilenUretimSikliklari,
  useSecilenVeriTurleri, useSelectedHaberBulteni, useSelectedKaynakKurum
} from '../../store'

export default function useFilteredIstatistikiUrunList (istatistikiUrunList, arananUrun) {
  const [secilenUretimSikliklar] = useSecilenUretimSikliklari()
  const [secilenVeriTurleri] = useSecilenVeriTurleri()
  const [secilenCografiDuzeyler] = useSecilenCografiDuzeyler()
  const [secilenBirimList] = useSecilenBirimList()
  const [selectedHaberBultenKod] = useSelectedHaberBulteni()
  const [selectedKaynakKurum] = useSelectedKaynakKurum()

  return useMemo(() => {
    const secilenUretimSikliklarKodlar = secilenUretimSikliklar.map(data => data.kod)
    const secilenCografiDuzeylerKodlar = secilenCografiDuzeyler.map(data => data.kod)
    const secilenBirimListKodlar = secilenBirimList.map(data => data.ustBirimId)
    const secilenVeriTuruKodlar = secilenVeriTurleri.map(data => data.kod)
    
    console.log("aranan ürün:",arananUrun)
    //console.log("secBirim:",secilenBirimListKodlar)
    return istatistikiUrunList.filter(data => {
      return (secilenUretimSikliklarKodlar.length === 0 || secilenUretimSikliklarKodlar.includes(Number(data.uretim_siklik)))
        && (secilenCografiDuzeylerKodlar.length === 0 || secilenCografiDuzeylerKodlar.includes(Number(data.cografi_duzey_kod)))
        && (secilenBirimListKodlar.length === 0 || secilenBirimListKodlar.includes(data.ust_birim_kod))
        && (secilenVeriTuruKodlar.length === 0 || secilenVeriTuruKodlar.includes(data.veriTurleri.toString()))
        && (!selectedHaberBultenKod || selectedHaberBultenKod === data.bulten_kod)
        && (!selectedKaynakKurum || data.kaynak_kurumlar.includes(selectedKaynakKurum.toString()))
        && (!arananUrun || data.istatistiki_urun_ad.toLowerCase().includes(arananUrun.toLowerCase()))
    })
  }, [
    arananUrun,
    istatistikiUrunList,
    secilenUretimSikliklar,
    secilenCografiDuzeyler,
    secilenBirimList,
    secilenVeriTurleri,
    selectedHaberBultenKod,
    selectedKaynakKurum
  ])
}
