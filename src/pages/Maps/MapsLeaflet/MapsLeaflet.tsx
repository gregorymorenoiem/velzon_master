import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMapEvents, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import BreadCrumb from "Components/Common/BreadCrumb";
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon
const customIcon = new L.Icon({
  iconUrl: '/assets/images/logo-sm.png',
  iconSize: [45, 45],
  iconAnchor: [22, 94],
  popupAnchor: [0, -86]
});

// Initial positions
const center: [number, number] = [37.778519, -122.40564];
const second: [number, number] = [54.5260, 15.2551];
const third: [number, number] = [8.7832, 34.5085];
const fourth: [number, number] = [19.0760, 72.8777];

// Component for adding a marker on click
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked here</Popup>
    </Marker>
  );
}

const LeafletMaps = () => {
  document.title = "Leaflet Maps | Velzon - React Admin & Dashboard Template";

  // Polygon coordinates
  const polygone: [number, number][] = [
    [37.778519, -122.40564],
    [37.759703, -122.429155],
    [37.779314, -122.463645]
  ];

  // Multi polygon coordinates
  const multiPolygone: [number, number][][] = [
    [[37.778519, -122.40564], [37.759703, -122.429155], [37.779314, -122.463645]],
    [[37.758824, -122.391832], [37.747988, -122.407131], [37.754184, -122.418739]]
  ];

  return (
    <React.Fragment>                
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Leaflet Maps" pageTitle="Maps" />

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Example</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ height: "300px", width: "100%" }}>
                    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={center}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Markers, Circles and Polygons</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ height: "300px", width: "100%" }}>
                    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={center}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                      <Circle
                        center={center}
                        pathOptions={{ color: 'purple', fillColor: 'blue' }}
                        radius={200}
                      />
                      <Polygon
                        pathOptions={{ color: 'red', fillColor: 'orange' }}
                        positions={polygone}
                      />
                    </MapContainer>
                  </div>
                </CardBody>
              </Card>
            </Col>                            
          </Row>                    

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Working with Popups</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ height: "300px", width: "100%" }}>
                    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={center}>
                        <Popup>
                          <b>Hello world!</b><br />I am a popup.
                        </Popup>
                      </Marker>
                      <LocationMarker />
                    </MapContainer>
                  </div>
                </CardBody>
              </Card>
            </Col>                           

            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Markers with Custom Icons</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ height: "300px", width: "100%" }}>
                    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={center} icon={customIcon}>
                        <Popup>
                          Custom icon marker
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </CardBody>
              </Card>
            </Col>                            
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Layer Groups and Layers Control</h4>
                </CardHeader>
                <CardBody>
                  <div style={{ height: "300px", width: "100%" }}>
                    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                          />
                        </LayersControl.BaseLayer>
                        <LayersControl.Overlay name="Marker with popup">
                          <Marker position={center}>
                            <Popup>
                              <b>Hello world!</b><br />I am a popup.
                            </Popup>
                          </Marker>
                        </LayersControl.Overlay>
                      </LayersControl>
                    </MapContainer>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>                    
      </div>
    </React.Fragment>
  );
}

export default LeafletMaps;