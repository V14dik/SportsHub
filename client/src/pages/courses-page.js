import axios from "axios";
import { useEffect, useState } from "react";

import config from "../config.json";
import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Course } from "../components/Course";

export function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const res = await axios.get(config.serverUrl + "/courses");
    setCourses(res.data);
  };

  return (
    <Container>
      {courses.length ? (
        <Grid container spacing={2}>
          {courses.map((course, index) => (
            <Grid xs={4} key={index + course.name}>
              <Paper elevation={24} sx={{ borderColor: "red" }}>
                <Course course={course} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  );
}
