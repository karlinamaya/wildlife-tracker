import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 28.6024, // Set initial latitude
  lng: -81.2001, // Set initial longitude
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
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
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
    </LoadScript>
  );
}

export default MyMap;
