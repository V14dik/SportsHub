import { Box, Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../components/Event";

import { Clusterer, Placemark } from "@pbe/react-yandex-maps";
import { Link } from "react-router-dom";

import config from "../config.json";
import { MMap } from "../components/Map";

export const EventsPage = () => {
  const [location, setLocation] = useState([53.9007, 27.5709]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getLocation();
    getEvents();
  }, []);

  const getLocation = async () => {
    const currLocation = await axios.get("https://ipapi.co/json");
    setLocation([currLocation.data.latitude, currLocation.data.longitude]);
  };

  const getEvents = async () => {
    const res = await axios.get(config.serverUrl + "/event");
    setEvents(res.data.reverse());
  };

  return (
    <Container
      sx={{
        display: "flex",
        gap: "15px",
        alignContent: "center",
      }}
    >
      <Box sx={{ width: "55%" }}>
        <Button
          component={Link}
          to={"/add-event"}
          variant={"contained"}
          sx={{ marginBottom: "10px" }}
        >
          New Event
        </Button>
        <div style={{ height: "658px", overflow: "auto" }}>
          {events.length ? (
            <Stack
              spacing={2}
              sx={{
                padding: "3px",
                overflow: "auto",
              }}
            >
              {events.map((event, index) => (
                <Event event={event} key={index} />
              ))}
            </Stack>
          ) : null}
        </div>
      </Box>

      <MMap
        onClick={(e) => setLocation(e.get("coords"))}
        defaultState={{ center: location, zoom: 11 }}
        style={{ width: "65%", height: "350px" }}
      >
        <Clusterer>
          {events.map((event, index) => (
            <Placemark key={index} geometry={event.point} />
          ))}
        </Clusterer>
      </MMap>
    </Container>
  );
};
