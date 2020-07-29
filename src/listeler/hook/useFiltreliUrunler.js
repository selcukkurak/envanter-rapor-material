import { useMemo } from 'react'
import {
  birimlerState,
  seciliBirimlerState,
  seciliBultenState,
  seciliCografiDuzeylerState,
  seciliKaynakKurumState,
  seciliUretimSikliklariState,
  seciliVeriTuruState
} from '../../store'
import { useRecoilValue } from 'recoil/dist'
import { siraliUrunler } from '../../store/selectors'

function veriTuruBul (urun, secilenVeriTuru) {
  switch (secilenVeriTuru.id) {
    case 1:
      return urun.sayilar.anket > 0
    case 2:
      return urun.sayilar.idariKayit > 0
    case 3:
      return urun.sayilar.anket > 0 && urun.sayilar.idariKayit > 0
    default:
      return false
  }
}

function idIceriyorMu (dizi, nesne, key) {
  if (dizi.length === 0) return true
  else {
    const value = nesne[key]
    return value && dizi.some(item => item.id === value.id)
  }
}

export default function useFiltreliUrunler (arananUrun) {
  const urunler = useRecoilValue(siraliUrunler)
  const birimler = useRecoilValue(birimlerState)

  const secilenUretimSikliklar = useRecoilValue(seciliUretimSikliklariState)
  const secilenCografiDuzeyler = useRecoilValue(seciliCografiDuzeylerState)
  const secilenBirimler = useRecoilValue(seciliBirimlerState)
  const secilenVeriTuru = useRecoilValue(seciliVeriTuruState)
  const secilenHaberBulteni = useRecoilValue(seciliBultenState)
  const secilenKaynakKurum = useRecoilValue(seciliKaynakKurumState)

  return useMemo(() => {
    const secilenAltBirimler = secilenBirimler.length === 0
      ? []
      : birimler
        .filter(birim => secilenBirimler.includes(birim.ustBirimId))
        .map(birim => birim.id)

    console.debug(secilenBirimler, secilenAltBirimler, secilenKaynakKurum)

    return urunler.filter(urun => {
      return (idIceriyorMu(secilenUretimSikliklar, urun, 'periyot'))
        && (idIceriyorMu(secilenCografiDuzeyler, urun, 'cografiDuzey'))
        && (secilenBirimler.length === 0 || secilenAltBirimler.includes(urun.birimId))
        && (!secilenVeriTuru || veriTuruBul(urun, secilenVeriTuru))
        && (!secilenHaberBulteni || urun.bultenler.map(b => b.bultenId).includes(secilenHaberBulteni))
        && (!secilenKaynakKurum || urun.kurumlar.some(k => k.kurumId === secilenKaynakKurum))
        && (!arananUrun || urun.adi.toLowerCase().includes(arananUrun.toLowerCase()))
    })
  }, [
    arananUrun,
    urunler,
    birimler,
    secilenUretimSikliklar,
    secilenCografiDuzeyler,
    secilenBirimler,
    secilenVeriTuru,
    secilenHaberBulteni,
    secilenKaynakKurum
  ])
}
