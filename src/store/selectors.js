import { selector } from 'recoil/dist'
import { keyBy } from 'lodash'
import { birimlerState, bultenlerState, referanslarState, seciliUrunState, urunlerState } from './index'
import uniq from 'lodash/uniq'
import { localSort } from '../util/sort'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'

function birimAdiKisalt (birim) {
  return {
    ...birim,
    adi: birim.adi
      .replace(' Daire Başkanlığı', '')
      .replace(' Dai.bşk.lığı', '')
  }
}

export const birimlerById = selector({
  key: 'birimlerById',
  get: ({ get }) => {
    const birimler = get(birimlerState)

    return keyBy(birimler, 'id')
  }
})

export const siraliUrunDaireleri = selector({
  key: 'siraliUrunDaireleri',
  get: ({ get }) => {
    const birimler = get(birimlerById)
    const urunler = get(urunlerState)
    const urunBirimIdleri = uniq(urunler.map(urun => urun.birimId))
    const daireIdleri = uniq(urunBirimIdleri.map(id => birimler[id].ustBirimId))

    return  localSort(daireIdleri.map(id => birimler[id]).map(birimAdiKisalt), 'adi')
  }
})

export const seciliUrun = selector({
  key: 'seciliUrun',
  get: ({ get }) => {
    return get(urunlerState).find(urun => urun.id === get(seciliUrunState))
  }
})

export const siraliUrunler = selector({
  key: 'siraliUrunler',
  get: ({ get }) => {
    const urunler = get(urunlerState)

    return localSort(urunler, 'adi')
  }
})

/*
* Bültenler servisten çoklanmış olarak geliyor.
* Bunun sebebi adı değişen bültenlerin de aynı id ile tutuluyor olması.
* Bültenleri tekilleştirmek için ise son yayın tarihi en yakın olanı seçiyoruz.
* */
export const tekilBultenler = selector({
  key: 'tekilBultenler',
  get: ({ get }) => {
    const bultenler = get(bultenlerState)
    const gruplanmisBultenler = groupBy(bultenler, 'id')

    return Object.keys(gruplanmisBultenler)
      .map(id => maxBy(gruplanmisBultenler[id], bulten => bulten.sonYayin.id))
      .sort((a, b) => a.adi.localeCompare(b.adi))
  }
})

export const siraliKurumlar = selector({
  key: 'siraliKurumlar',
  get: ({ get }) => {
    const kurumlar = get(referanslarState).KAYNAK_KURUM || []

    return localSort(kurumlar, 'adi')
  }
})
