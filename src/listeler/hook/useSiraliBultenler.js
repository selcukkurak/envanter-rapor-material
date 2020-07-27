import { useGlobalState } from '../../store'
import { useMemo } from 'react'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'

export default function useSiraliBultenler() {
  const [bultenler] = useGlobalState('bultenler')

  const gruplanmisBultenler = useMemo(() => groupBy(bultenler, 'id'), [bultenler])
  const siraliBultenler = useMemo(() => {
    return Object.keys(gruplanmisBultenler)
      .map(id => maxBy(gruplanmisBultenler[id], bulten => bulten.sonYayin.id))
      .sort((a, b) => a.adi.localeCompare(b.adi))
  }, [bultenler])

  return [
    siraliBultenler,
    gruplanmisBultenler
  ]
}