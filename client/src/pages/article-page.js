import {
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

import config from "../config.json";
import { useEffect, useState } from "react";
import { Comment } from "../components/Comment";

export function ArticlePage() {
  const [article, setArticle] = useState();

  const articleId = useParams().id;

  const getArticle = async () => {
    const url = `${config.serverUrl}/article/${articleId}`;
    const res = await axios.get(url);
    setArticle(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        alignContent: "center",
      }}
    >
      {article ? (
        <>
          <Typography variant="h4" align="center" gutterBottom={true}>
            {article.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 2,
            }}
          >
            {article.categories.map((category, index) => (
              <Chip
                label={category}
                variant="outlined"
                color="info"
                clickable
                key={category + index}
              />
            ))}
          </Stack>
          <Typography paragraph={true}>{article.content}</Typography>
          <Stack spacing={1}>
            {article.comments.map((comment, index) => (
              <Comment comment={comment} key={index} />
            ))}
          </Stack>
        </>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
          }}
        />
      )}
    </Container>
  );
}
