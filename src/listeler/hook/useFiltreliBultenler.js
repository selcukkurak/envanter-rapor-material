import { useMemo } from 'react'
import { useRecoilValue } from 'recoil/dist'
import uniq from 'lodash/uniq'
import { seciliUrun, tekilBultenler } from '../../store/selectors'

export default function useFiltreliBultenler (filtreliUrunler, arananHaberBulteni) {
  const bultenler = useRecoilValue(tekilBultenler)
  const urun = useRecoilValue(seciliUrun)

  return useMemo(() => {
    console.debug('filtreliyor')
    return bultenler.filter(data => {
      if (urun) {
        return urun.bultenler.some(b => b.bultenId === data.id)
      } else if (arananHaberBulteni) {
        return (data.adi.toLowerCase().includes(arananHaberBulteni.toLowerCase()))
      } else {
        return uniq(
          filtreliUrunler.flatMap(urun =>
            urun.bultenler.map(bulten =>
              bulten.bultenId))
        ).includes(data.id)
      }
    })
  }, [
    bultenler,
    filtreliUrunler,
    urun,
    arananHaberBulteni
  ])
}
