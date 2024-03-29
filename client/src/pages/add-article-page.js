import { TextField, Typography, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import config from "../config.json";
import { useNavigate } from "react-router-dom";

export const AddArticle = () => {
  const { isLogIn } = useSelector(({ user }) => user);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const addArticleHandler = async () => {
    const url = `${config.serverUrl}/article/`;
    const newArticle = {
      name: name,
      categories: categories,
      content: content,
    };
    console.log(newArticle);
    const res = await axios.post(
      url,
      { newArticle },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
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
        <Typography variant="h4">New article</Typography>

        <TextField
          label="Article title"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Categories"
          variant="outlined"
          fullWidth
          value={categories.join(" ")}
          onChange={(e) => {
            setCategories(e.target.value.split(" "));
          }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          value={content}
          multiline
          minRows={10}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            addArticleHandler();
            navigate("/");
          }}
          disabled={isLogIn ? false : true}
        >
          Add Article
        </Button>
      </Box>
    </Container>
  );
};
