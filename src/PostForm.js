import { useState } from 'react';
import EXIF from 'exif-js';
import heic2any from 'heic2any';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 28.6024, // Default latitude
  lng: -81.2001, // Default longitude
};

function PostForm({ fetchPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState(center.lat);
  const [longitude, setLongitude] = useState(center.lng);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        try {
          const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
          const convertedFile = new File([convertedBlob], file.name.replace(/\.[^/.]+$/, ".jpeg"), { type: 'image/jpeg' });
          setImage(convertedFile);
          extractExifData(convertedFile);
        } catch (error) {
          console.error('Error converting HEIC file:', error);
        }
      } else {
        setImage(file);
        extractExifData(file);
      }
    }
  };

  const extractExifData = (file) => {
    EXIF.getData(file, function() {
      const lat = EXIF.getTag(this, 'GPSLatitude');
      const lon = EXIF.getTag(this, 'GPSLongitude');
      const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
      const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');

      if (lat && lon && latRef && lonRef) {
        const latitude = convertDMSToDD(lat, latRef);
        const longitude = convertDMSToDD(lon, lonRef);
        setLatitude(latitude);
        setLongitude(longitude);
        setMarkerPosition({ lat: latitude, lng: longitude });
      } else {
        console.error('No EXIF GPS data found in image.');
      }
    });
  };

  const convertDMSToDD = (dms, ref) => {
    const degrees = dms[0];
    const minutes = dms[1];
    const seconds = dms[2];
    let dd = degrees + (minutes / 60) + (seconds / 3600);
    if (ref === 'S' || ref === 'W') {
      dd = dd * -1;
    }
    return dd;
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatitude(lat);
    setLongitude(lng);
    setMarkerPosition({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        fetchPosts();
      } else {
        console.error('Failed to upload post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Upload Image:
        <input type="file" onChange={handleImageChange} accept="image/*,.heic,.heif" />
      </label>
      <LoadScript googleMapsApiKey="AIzaSyBkI2FPgRRtKJ2laQDPMKarXj5ooqaEWTw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={10}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
      <button type="submit">Submit Post</button>
    </form>
  );
}

export default PostForm;