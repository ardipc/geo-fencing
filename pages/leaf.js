import dynamic from 'next/dynamic'
import Head from 'next/head'

import { Fragment } from 'react'

export default function Leaf(props) {

  const Map = dynamic(
    () => import('../components/MapLeaflet'),
    { ssr: false }
  )

  const data = [
    {
      name: 'Kantor Carsworld',
      lat: -6.29355284145648,
      lng: 106.6660888175777,
      label: 'A pretty CSS1 popup. <br /> Easily customizable.'},
    {
      name: 'Bank BRI BSD',
      lat: -6.300249901018364,
      lng: 106.66840624593438,
      label: 'A pretty CSS2 popup. <br /> Easily customizable.'},
    {
      name: 'Samsat Serpong BSD',
      lat: -6.296120862073244,
      lng: 106.66430618921609,
      label: 'A pretty CSS3 popup. <br /> Easily customizable.'
    }
  ]

  const nameBadgeStyles = {
    fontSize: '0.8rem',
    height: 40,
    borderRadius: 20,
    cursor: 'pointer'
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <title>{props.pageTitle || 'Realtime Geofencing'}</title>
        <link
          rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""/>
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""></script>
      </Head>

      <div className="row position-absolute w-100 h-100">
        <section className="col-md-9 px-0 border-right border-gray position-relative h-100">
          <Map people={data} />
        </section>

        <section className="col-md-3 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
          <Fragment>

            <div className="border-bottom border-gray w-100 px-2 d-flex align-items-center bg-white justify-content-between" style={{ height: 90 }}>
              <span className="h4 text-dark mb-0 mx-4 font-weight-bold">Nearby Friends</span>
              <span className="d-flex align-items-center text-center text-white bg-primary font-weight-bold py-2 px-4 mx-4" style={nameBadgeStyles} title={'Saya'}>Saya</span>
            </div>

            <div className="w-100 d-flex flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}>
              <Fragment>
                {
                  data.map((item, index) => (
                    <div key={index} className="d-flex border-bottom border-gray w-100 px-4 py-3 font-weight-bold text-secondary align-items-center">

                      <div className="pl-2" style={{ width: 30, height: 30 }}>
                        <img src={'/images/marker-icon.png'} className="img-fluid" alt="marker" />
                      </div>

                      <span className="pl-3">{item.name}</span>

                    </div>
                  ))
                }
              </Fragment>
            </div>

          </Fragment>
        </section>
      </div>

    </>
  )

}
