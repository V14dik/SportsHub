import { Container, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import config from "../config.json";
import { MMap } from "../components/Map";
import { Placemark } from "@pbe/react-yandex-maps";
import { ProfileLink } from "../components/ProfileLink";

export function EventPage() {
  const { isLogIn } = useSelector(({ user }) => user);
  const [event, setEvent] = useState();
  // const navigate = useNavigate();
  let userId;
  const [isJoined, setIsJoined] = useState(false);

  const eventId = useParams().id;

  const getEvent = async () => {
    const res = await axios.get(config.serverUrl + `/event/${eventId}`);
    setEvent(res.data);
    if (res.data.members.includes(userId)) {
      setIsJoined(true);
    } else setIsJoined(false);
  };

  const joinEvent = async () => {
    await axios.post(
      config.serverUrl + "/join",
      { eventId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setIsJoined(true);
  };

  const unjoin = async () => {
    await axios.post(
      config.serverUrl + "/unjoin",
      { eventId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setIsJoined(false);
  };

  const getId = async () => {
    const res = await axios.get(config.serverUrl + "/get/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    userId = res.data;
  };

  useEffect(() => {
    getEvent();
    if (isLogIn) {
      getId();
    }
  }, [isJoined]);

  return (
    <Container sx={{ alignContent: "center", display: "flex", gap: "15px" }}>
      {event ? (
        <>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4">{event.name}</Typography>
            <ProfileLink userId={event.user}>{event.username}</ProfileLink>
            <Typography
              mt={2}
              component={"pre"}
              sx={{ whiteSpace: "break-spaces" }}
            >
              {event.description}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <MMap
              style={{ width: "100%", height: "350px" }}
              defaultState={{ center: event.point, zoom: 12 }}
            >
              <Placemark geometry={event.point} />
            </MMap>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Typography variant="button">
                Already joined: {event.members.length}
              </Typography>
              {!isJoined ? (
                <Button
                  size="small"
                  variant="contained"
                  disabled={!isLogIn ? true : false}
                  onClick={() => {
                    joinEvent();
                    //getEvent();
                  }}
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  disabled={!isLogIn ? true : false}
                  onClick={() => {
                    unjoin();
                    //getEvent();
                  }}
                >
                  Unjoin
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : null}
    </Container>
  );
}
