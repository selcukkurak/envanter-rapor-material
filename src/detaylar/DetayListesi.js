import { Card, CardContent, Typography } from '@material-ui/core'
import IdariKayitlarList from './IdariKayitlarList'
import AnketlerList from './AnketlerList'
import React from 'react'
import styled from 'styled-components'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { BaslikRenkleri } from '@tuik/renkler'
import { useRecoilValue } from 'recoil/dist'
import { seciliUrunDetay, tekilBultenler } from '../store/selectors'
import BagliUrunList from './BagliUrunList'

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
  const urun = useRecoilValue(seciliUrunDetay)
  const bultenler = useRecoilValue(tekilBultenler)

  if (!urun) return null

  console.debug('Ürün Detay', urun)

  const {
    paylasimlar,
    urunler,
    anketler,
    idariKayitlar
  } = urun

  const urunBultenleri = urun.bultenler
    .map(b => bultenler.find(bulten => bulten.id === b.bultenId))
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
              {urunler.length > 0 && (
                <Row>
                  <SubHeader>Bağlı Ürünler</SubHeader>
                  <BagliUrunList urunler={urunler} />
                </Row>
              )}
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
                  <Row key={bulten.id}>
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
