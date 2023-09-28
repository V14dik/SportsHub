import { TextField, Typography, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import config from "../config.json";
import { useNavigate, useParams } from "react-router-dom";

export const EditArticle = () => {
  const { isLogIn } = useSelector(({ user }) => user);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const articleId = useParams().id;

  const getArticle = async () => {
    const url = `${config.serverUrl}/article/${articleId}`;
    const res = await axios.get(url);
    setName(res.data.name);
    setCategories(res.data.categories);
    setContent(res.data.content);
  };

  useEffect(() => {
    getArticle();
  }, []);

  const saveArticleHandler = async () => {
    const url = `${config.serverUrl}/article/${articleId}`;
    const newArticle = {
      name: name,
      categories: categories,
      content: content,
    };
    const res = await axios.patch(
      url,
      { newArticle },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    navigate("/");
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
          onClick={saveArticleHandler}
          disabled={isLogIn ? false : true}
        >
          Save Article
        </Button>
      </Box>
    </Container>
  );
};
