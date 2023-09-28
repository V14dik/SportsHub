import {
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import config from "../config.json";
import { useParams } from "react-router-dom";
import { ProfileLink } from "../components/ProfileLink";

export function CoursePage() {
  const [activeStep, setStep] = useState(0);
  const [course, setCourse] = useState();

  const courseId = useParams().id;

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const res = await axios.get(config.serverUrl + `/course/${courseId}`);
    setCourse(res.data);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignContent: "center",
      }}
    >
      {course ? (
        <Box sx={{ width: "80%" }}>
          <Typography variant="h4">{course.name}</Typography>
          <ProfileLink userId={course.author._id}>
            {course.author.username}
          </ProfileLink>
          <Typography mt={2} variant="h6" gutterBottom={true}>
            {course.description}
          </Typography>
          <Stepper activeStep={activeStep}>
            {course.lessons.map((lesson, index) => (
              <Step key={index} completed={false}>
                <StepLabel
                  onClick={() => {
                    setStep(index);
                  }}
                >
                  {lesson.name}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography
            component={"pre"}
            sx={{ whiteSpace: "pre-wrap", marginTop: "15px" }}
          >
            {course.lessons[activeStep].content}
          </Typography>
        </Box>
      ) : null}
    </Container>
  );
}
