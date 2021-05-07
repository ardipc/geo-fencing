import dynamic from 'next/dynamic'
import Head from 'next/head'

import { Fragment, useState, useEffect } from 'react'
import { geolocated } from "react-geolocated"
import moment from 'moment-timezone'

import io from 'socket.io-client'
const SOCKET_URL = 'https://various-delirious-river.glitch.me'
const socket = io(SOCKET_URL, { query: { room: 'geofencing' } });

function Leaf(props) {
  const { coords, timestamp } = props

  if(coords) {

    const [data, setData] = useState([])
    console.log(data)

    const [isName, setIsName] = useState(false)
    const [name, setName] = useState('')
    const [me, setMe] = useState({})

    socket.on("message", body => {
      let copy = [...data];
      copy.push(body)
      setData(copy)
    });

    const Map = dynamic(
      () => import('../components/MapLeaflet'),
      { ssr: false }
    )

    const enterName = (e) => {
      if(e.code === "Enter") {
        setIsName(true)
        setMe({
          lat: coords.latitude,
          lng: coords.longitude,
          label: `<span>${name}</span><br/>${moment(timestamp).format('LLL')}`
        })
        socket.emit('message', {
          lat: coords.latitude,
          lng: coords.longitude,
          label: `<span>${name}</span><br/>${moment(timestamp).format('LLL')}`
        })
      }
    }

    const submitName = (e) => {
      e.preventDefault()
      setIsName(true)
      setMe({
        lat: coords.latitude,
        lng: coords.longitude,
        label: `<span>${name}</span><br/>${moment(timestamp).format('LLL')}`
      })
      socket.emit('message', {
        lat: coords.latitude,
        lng: coords.longitude,
        label: `<span>${name}</span><br/>${moment(timestamp).format('LLL')}`
      })
    }

    const nameBadgeStyles = {
      fontSize: '0.8rem',
      height: 40,
      borderRadius: 20,
      cursor: 'pointer'
    };

    return (
      <Fragment>

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

        {
          isName === false ?

          <div className="container h-100 mt-4">
            <div className="row h-100 justify-content-center align-items-center">
              <form onSubmit={e => submitName(e)} className="col-4">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Nama Kamu Siapa ?</label>
                  <input onChange={e => setName(e.target.value)} onKeyPress={e => enterName(e)} value={name} type="text" className="form-control" id="formGroupExampleInput" placeholder="John, Smith, etc..." />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Masuk</button>
                </div>
              </form>
            </div>
          </div>


          :

          <div className="row position-absolute w-100 h-100" style={{margin: '0'}}>
            <section className="col-md-9 px-0 border-right border-gray position-relative h-100">
              <Map me={me} people={data} />
            </section>

            <section className="col-md-3 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
              <Fragment>

                <div className="border-bottom border-gray w-100 px-2 d-flex align-items-center bg-white justify-content-between" style={{ height: 90 }}>
                  <span className="h5 text-dark mb-0 mx-4">Nearby Friends</span>
                  <span className="d-flex align-items-center text-center text-white bg-primary font-weight-bold py-2 px-4 mx-4" style={nameBadgeStyles} title={'Saya'}>{name}</span>
                </div>

                <div className="w-100 d-flex flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 90px)', overflowY: 'auto' }}>
                  <Fragment>
                    {
                      data.map((item, index) => (
                        <div key={index} className="d-flex border-bottom border-gray w-100 px-4 py-3 font-weight-bold text-secondary align-items-center">

                          <div className="pl-2" style={{ width: 30, height: 30 }}>
                            <img src={'/images/marker-icon.png'} className="img-fluid" alt="marker" />
                          </div>

                          <span className="pl-3" dangerouslySetInnerHTML={{ __html: item.label }}></span>

                        </div>
                      ))
                    }
                  </Fragment>
                </div>

              </Fragment>
            </section>
          </div>
        }

      </Fragment>
    )
  }
  else {
    return (
      <code>loading...</code>
    )
  }

}

const Main = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(Leaf)

export default Main
