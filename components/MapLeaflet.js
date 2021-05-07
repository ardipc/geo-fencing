import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapLeaflet({ me, people }) {
  const mapStyle = {
    width: '100%',
    position: 'absolute',
    top: '0',
    bottom: '0'
  }

  return (
    <MapContainer center={[-6.2977526, 106.6664304000]} zoom={15} scrollWheelZoom={false} style={mapStyle}>

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        people.map((item, key) => (
          <Marker key={`marker-${key}`} position={[item.lat, item.lng]}>
            <Popup>
              <div dangerouslySetInnerHTML={{ __html: item.label }} />
            </Popup>
          </Marker>
        ))
      }

    </MapContainer>
  )
}
