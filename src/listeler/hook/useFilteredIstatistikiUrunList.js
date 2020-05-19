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
    
    //console.log("aranan ürün:",arananUrun)
    //console.log("secBirim:",secilenBirimListKodlar)
    return istatistikiUrunList.filter(data => {
      var veriKoduVarmi=true
      if(secilenVeriTuruKodlar){
        if(secilenVeriTuruKodlar.length>1){
          veriKoduVarmi=data.veriTurleri.toString().includes(secilenVeriTuruKodlar[1])
                        || data.veriTurleri.toString().includes(secilenVeriTuruKodlar[0])
        }else if(secilenVeriTuruKodlar.length>0){
          veriKoduVarmi=data.veriTurleri.toString().includes(secilenVeriTuruKodlar[0])
        }
      }

      //&& (secilenVeriTuruKodlar.length === 0 || secilenVeriTuruKodlar.includes(data.veriTurleri.toString()))
      
      return (secilenUretimSikliklarKodlar.length === 0 || secilenUretimSikliklarKodlar.includes(Number(data.uretim_siklik)))
        && (secilenCografiDuzeylerKodlar.length === 0 || secilenCografiDuzeylerKodlar.includes(Number(data.cografi_duzey_kod)))
        && (secilenBirimListKodlar.length === 0 || secilenBirimListKodlar.includes(data.ust_birim_kod))
        && (veriKoduVarmi)
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
