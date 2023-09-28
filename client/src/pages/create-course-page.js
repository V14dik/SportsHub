import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";

export const CreateCoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [activeStep, setActiveStep] = useState(0);

  const [lessons, setLessons] = useState([{ name: "", content: "" }]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const createCourse = async () => {
    const newLessons = lessons.map((lesson, index) => {
      if (index === activeStep) return { name, content };
      else return lesson;
    });
    setLessons(newLessons);
    const res = await axios.post(
      config.serverUrl + "/course",
      {
        name: courseName,
        description: courseDescription,
        lessons: newLessons,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  };

  useEffect(() => {
    setActiveLesson();
  }, [activeStep]);

  const addLesson = () => {
    const newLessons = lessons.map((lesson, index) => {
      if (index === activeStep) return { name, content };
      else return lesson;
    });
    newLessons.push({ name: "", content: "" });
    setLessons(newLessons);
    setActiveStep(lessons.length);
  };

  const setActiveLesson = () => {
    setName(lessons[activeStep].name);
    setContent(lessons[activeStep].content);
  };

  const saveLesson = () => {
    const newLessons = lessons.map((lesson, index) => {
      if (index === activeStep) return { name, content };
      else return lesson;
    });
    setLessons(newLessons);
  };

  const deleteLesson = () => {
    let newLessons = lessons;
    newLessons.splice(activeStep, 1);
    setLessons(newLessons);
    setActiveStep(activeStep - 1);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create your course
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
          <TextField
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            size="small"
            label="Course name"
            variant="outlined"
            sx={{ flexGrow: "1" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              createCourse();
            }}
          >
            Create
          </Button>
        </Stack>
        <TextField
          value={courseDescription}
          onChange={(e) => {
            setCourseDescription(e.target.value);
          }}
          multiline
          rows={5}
          size="small"
          label="Course description"
          fullWidth
        />
        <Stack
          sx={{ justifyContent: "space-between", width: "100%" }}
          direction={"row"}
        >
          <Stepper
            activeStep={activeStep}
            sx={{ width: "100%", flexWrap: "wrap" }}
          >
            {lessons.map((lesson, index) => (
              <Step key={index} completed={false}>
                {activeStep === index ? (
                  <>
                    <StepLabel>
                      <TextField
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        label={"Lesson name"}
                        size="small"
                      ></TextField>
                    </StepLabel>
                  </>
                ) : (
                  <>
                    <StepLabel
                      onClick={() => {
                        saveLesson();
                        setActiveStep(index);
                      }}
                    >
                      <Typography gutterBottom>{lesson.name}</Typography>
                    </StepLabel>
                  </>
                )}
              </Step>
            ))}
          </Stepper>
          <IconButton
            sx={{
              height: "40px",
              position: "relative",
              right: "10px",
            }}
            onClick={addLesson}
          >
            <AddIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton
            disabled={lessons.length == 1}
            sx={{
              height: "40px",
              position: "relative",
              right: "10px",
            }}
            onClick={deleteLesson}
          >
            <DeleteIcon
              fontSize="large"
              color={lessons.length == 1 ? "" : "primary"}
            />
          </IconButton>
        </Stack>
        <TextField
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          label="Lesson content"
          fullWidth
          multiline
          rows={15}
        />
      </Box>
    </Container>
  );
};
