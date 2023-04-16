import { CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { Article } from "./Article";

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const url = `${config.serverUrl}/articles/`;
    const res = await axios.get(url);
    setArticles(res.data.reverse());
  };

  useEffect(() => {
    getArticles();
    //setArticles(getArticles);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {articles.length ? (
        <>
          {articles.map((article) => (
            <Article article={article} key={article._id} />
          ))}
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
};
