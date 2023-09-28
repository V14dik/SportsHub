import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export function Course({ course }) {
  return (
    <Card
      sx={{ textDecoration: "none" }}
      component={Link}
      to={`/course/${course._id}`}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{course.name}</Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              lessons: {course.lessons.length}
            </Typography>
          </Stack>
        }
        subheader={
          <Stack justifyContent={"space-between"} direction="row">
            <Typography>{course.author.username}</Typography>
          </Stack>
        }
      />

      <CardContent>
        <Typography noWrap>{course.description}</Typography>
      </CardContent>
    </Card>
  );
}
