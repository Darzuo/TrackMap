import React, {useState} from "react";
import './App.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor:   [12, 35], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 35],  // the same for the shadow
    popupAnchor:  [2, -20] // point from which the popup should open relative to the iconAnchor
});
L.Marker.prototype.options.icon = DefaultIcon;


let locations = [
    {
      id: "Pos1",
      lat: "51.505",
      long: "-0.09"
    },
    {
      id: "Pos2",
      lat: "51.52",
      long: "-0.08"
    },
    {
      id: "Pos3",
      lat: "51.5",
      long: "-0.06"
    },
    {
      id: "Pos4",
      lat: "50",
      long: "-2"
    }
]

var mapBounds = new L.LatLngBounds();
locations.forEach(location => {
  mapBounds.extend([location.lat, location.long]);
});

function App() {
  return (
    <div id="map">
      <MapContainer bounds={mapBounds} center={[51.505, -0.09]} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          locations.map((location, index) => {
            return (
              <Marker position={[location.lat, location.long]}>
                <Popup>
                  {location.id}
                </Popup>
              </Marker>
            );
          })
        }
        { 
          locations.map((location, index) => {
            if (index != locations.length - 1){
              return (
                <Polyline positions={[
                  [location.lat, location.long],
                  [locations[index+1].lat, locations[index+1].long]
                ]} />
              );
            }
          })
        }
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>

    </div>
  );
}

export default App;
