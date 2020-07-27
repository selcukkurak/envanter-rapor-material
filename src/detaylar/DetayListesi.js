import { Card, CardContent, Typography } from '@material-ui/core'
import IdariKayitlarList from './IdariKayitlarList'
import AnketlerList from './AnketlerList'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../store'
import Axios from 'axios'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { BaslikRenkleri } from '@tuik/renkler'
import useSiraliBultenler from '../listeler/hook/useSiraliBultenler'

const Bolum = styled.div`
  margin-bottom: 12px;
`

const Row = styled.div`
  margin-bottom: 12px;
`

const Header = styled.div`
  color: ${BaslikRenkleri.gri};
`

const SubHeader = styled.div`
  font-weight: bold;
  color: ${BaslikRenkleri.gri};
  margin-bottom: 8px;
`

function DetayListesi () {
  const [idariKayitlar,setIdariKayitlar]=useState([])
  const [anketler,setAnketler]=useState([])
  const [paylasimlar, setPaylasimlar] = useState([])

  const [urunler] = useGlobalState('urunler')
  const [seciliUrunId] = useGlobalState('seciliUrunId')
  const [siraliBultenler] = useSiraliBultenler()

  useEffect(() => {
    if(seciliUrunId) {
      Axios.get(`/api/urunler/${seciliUrunId}/idari-kayitlar`)
        .then(response => setIdariKayitlar(response.data))

      Axios.get(`/api/urunler/${seciliUrunId}/anketler`)
        .then(response => setAnketler(response.data))

      Axios.get(`/api/urunler/${seciliUrunId}/paylasimlar`)
        .then(response => setPaylasimlar(response.data))
    }
  },[seciliUrunId])

  const urun = urunler.find(urun => urun.id === seciliUrunId)

  if (!urun) return null

  const urunBultenleri = urun.bultenler
    .map(b => siraliBultenler.find(bulten => bulten.id === b.bultenId))
    .filter(bulten => !!bulten)

  return (
    <div>
      {(idariKayitlar.length > 0 || anketler.length > 0) && (
        <Bolum>
          <Card>
            <CardContent>
              <Row>
                <Typography gutterBottom variant="h5" component="h5">
                  <Header>GİRDİLER</Header>
                </Typography>
              </Row>
              {idariKayitlar.length > 0 && (
                <Row>
                  <SubHeader>İdari Kayıtlar</SubHeader>
                  <IdariKayitlarList idariKayitlar={idariKayitlar} />
                </Row>
              )}
              {anketler.length > 0 && (
                <Row>
                  <SubHeader>Anketler</SubHeader>
                  <AnketlerList anketler={anketler} />
                </Row>
              )}
            </CardContent>
          </Card>
        </Bolum>
      )}
      <Bolum>
        <Card>
          <CardContent>
            <Row>
              <Typography gutterBottom variant="h5" component="h5">
                <Header>ÇIKTILAR</Header>
              </Typography>
            </Row>
            {urunBultenleri.length !== 0 && (
              <Row>
                <SubHeader>Haber Bültenleri</SubHeader>
                {urunBultenleri.map(bulten => (
                  <Row>
                    <Link href={bulten.sonYayin.url} target='_blank' title={bulten.sonYayin.donemi}>{bulten.adi}</Link>
                  </Row>
                ))}
              </Row>
            )}
            {paylasimlar.length > 0 && (
              <Row>
                <SubHeader>Paylaşımlar</SubHeader>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Paylaşılan Kuruluş</TableCell>
                      <TableCell>Kullanılan Araç</TableCell>
                      <TableCell>Gönderi Sıklığı</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paylasimlar.map(paylasim => (
                      <TableRow key={paylasim.id}>
                        <TableCell>{paylasim.kurulus.adi}</TableCell>
                        <TableCell>{paylasim.arac.adi}</TableCell>
                        <TableCell>{paylasim.periyot.adi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Row>
            )}
          </CardContent>
        </Card>
      </Bolum>
    </div>
  )
}

export default DetayListesi
