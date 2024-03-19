import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    useEffect(() => {
        const map = L.map('map').setView([48.8566, 2.3522], 5);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = [
            [49.48984518226985, 0.09760311177538679],   // Paris
            [49.93127439459951, -1.529519326942444],  // London
            [48.5067048744209, -5.5456321805048665], // New York
            [43.871604293635166, -2.3604902065242763],
            [43.48296010686958, -10.194995140040248],// Los Angeles
            [35.94577427985918, -11.238332662542154], // Tokyo
            [36.13325291966876, -1.577800046783766],
            [40.84852923645673, 1.2817176074807202],
            [42.919600185453895, 7.000752916009688],
            [43.63531563997076, 7.139019305600198],
          ];
      
          
          const latLngPoints = points.map(point => L.latLng(point[0], point[1]));
      
          const polyline = L.polyline(latLngPoints, { color: 'orange', dashArray: '10, 10' }).addTo(map);
      
          map.fitBounds(polyline.getBounds());
      

        return () => {
          map.remove();
        };
      }, []); // Run once on component mount
      return (<div id="map" style={{ width: '100%', height: '100%' }}></div>);
};

export default Map;