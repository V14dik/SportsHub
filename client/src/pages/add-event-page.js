import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Placemark } from "@pbe/react-yandex-maps";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import config from "../config.json";
import { MMap } from "../components/Map";
import { useNavigate } from "react-router-dom";

export function AddEvent() {
  const { isLogIn } = useSelector(({ user }) => user);
  const [location, setLocation] = useState([53.9007, 27.5709]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();

  const onCreateHandler = async () => {
    const res = await axios.post(
      config.serverUrl + "/event",
      {
        name,
        description,
        dateTime,
        point: location,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    //setEventId(res.data._id);
    navigate("/event/" + res.data._id);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h4">Create your event</Typography>
        <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
          <TextField
            label="Event name"
            variant="outlined"
            sx={{ flexGrow: "2" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stack spacing={2} direction={"row"}>
            <DateTimePicker
              label="Date and time"
              disablePast
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              value={dateTime}
              onChange={(newDateTime) => setDateTime(newDateTime)}
            />
            <Button
              variant="contained"
              onClick={() => {
                onCreateHandler();
              }}
              disabled={isLogIn ? false : true}
            >
              Create Event
            </Button>
          </Stack>
        </Stack>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <MMap
          defaultState={{ center: location, zoom: 12 }}
          onClick={(e) => setLocation(e.get("coords"))}
          style={{ width: "100%", height: "350px" }}
        >
          <Placemark geometry={location} />
        </MMap>
      </Box>
    </Container>
  );
}
