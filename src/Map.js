import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 28.6024,
  lng: -81.2001,
};

const options = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

function MyMap({ posts }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = posts.map(post => ({
    position: { lat: post.latitude, lng: post.longitude },
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
  }));

  return (
    <LoadScript googleMapsApiKey="AIzaSyBkI2FPgRRtKJ2laQDPMKarXj5ooqaEWTw">
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={options}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              title={marker.title}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>{selectedMarker.title}</h3>
                <p>{selectedMarker.content}</p>
                {selectedMarker.imageUrl && (
                  <img src={selectedMarker.imageUrl} alt="Post" style={{ width: '100px' }} />
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default MyMap;