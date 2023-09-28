import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export function Event({ event }) {
  return (
    <Card
      sx={{ textDecoration: "none" }}
      component={Link}
      to={`/event/${event._id}`}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{event.name}</Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              members: {event.members.length}
            </Typography>
          </Stack>
        }
        subheader={
          <Stack justifyContent={"space-between"} direction="row">
            <Typography>{event.userName}</Typography>
          </Stack>
        }
      />

      <CardContent>
        <Typography noWrap>{event.description}</Typography>
      </CardContent>
    </Card>
  );
}
