import { Container } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const EventsPage = () => {
  const [location, setLocation] = useState([51.505, -0.09]);

  //[53.9007, 27.5709]

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const currLocation = await axios.get("https://ipapi.co/json");
    setLocation([currLocation.data.latitude, currLocation.data.longitude]);
  };

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords);

    return null;
  }

  return (
    <Container
      sx={{
        alignContent: "center",
      }}
    >
      <MapContainer
        center={location}
        zoom={11}
        scrollWheelZoom={true}
        style={{ width: "50%", height: "350px" }}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick coords={location} />
      </MapContainer>
    </Container>
  );
};
