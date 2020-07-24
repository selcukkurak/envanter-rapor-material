import { useEffect } from 'react'
import Axios from 'axios'
import keyBy from 'lodash/keyBy'
import { turkishTitleCase } from '@tuik/util'
import { useGlobalState } from '../store'

function birimAdiKucult (birim) {
  return {
    ...birim,
    adi: turkishTitleCase(birim.adi)
  }
}

export default function (props) {
  const [, setBirimler] = useGlobalState('birimler')

  useEffect(() => {
    Axios.get('/api/birimler')
      .then(response => setBirimler(keyBy(response.data.map(birimAdiKucult), 'id')))
  }, [])

  return null
}