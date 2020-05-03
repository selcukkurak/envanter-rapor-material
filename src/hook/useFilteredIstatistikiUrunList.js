import { useMemo } from 'react'

export default function useFilteredIstatistikiUrunList (secilenUretimSikliklar, secilenCografiDuzeyler, secilenBirimList, secilenVeriTurleri, istatistikiUrunList, selectedHaberBultenKod, selectedKaynakKurum, arananUrun) {
  return useMemo(() => {
    const secilenUretimSikliklarKodlar = secilenUretimSikliklar.map(data => data.kod)
    const secilenCografiDuzeylerKodlar = secilenCografiDuzeyler.map(data => data.kod)
    const secilenBirimListKodlar = secilenBirimList.map(data => data.id)
    const secilenVeriTuruKodlar = secilenVeriTurleri.map(data => data.kod)

    return istatistikiUrunList.filter(data => {
      return (secilenUretimSikliklarKodlar.length === 0 || secilenUretimSikliklarKodlar.includes(Number(data.uretim_siklik)))
        && (secilenCografiDuzeylerKodlar.length === 0 || secilenCografiDuzeylerKodlar.includes(Number(data.cografi_duzey_kod)))
        && (secilenBirimListKodlar.length === 0 || secilenBirimListKodlar.includes(data.ic_birim_kod))
        && (secilenVeriTuruKodlar.length === 0 || secilenVeriTuruKodlar.includes(data.veriTurleri.toString()))
        && (!selectedHaberBultenKod || selectedHaberBultenKod === data.bulten_kod)
        && (!selectedKaynakKurum || data.kaynak_kurumlar.toString().includes(selectedKaynakKurum))
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
