import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import config from "../config.json";
import { Article } from "../components/Articles/Article";

export function SubsPage() {
  const [articles, setArticles] = useState();

  useEffect(() => {
    getSubsArticles();
  }, []);

  const getSubsArticles = async () => {
    const res = await axios.get(config.serverUrl + "/sub", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(res);
    setArticles(res.data.articles.reverse());
  };

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
      <Typography variant="h5" align="center">
        Your subscriptions
      </Typography>
      {articles ? (
        <div
          style={{
            height: "645px",
            overflow: "auto",
          }}
        >
          <Stack spacing={2} overflow={"auto"} sx={{ padding: "3px" }}>
            {articles.map((article, index) => (
              <Article article={article} key={index} />
            ))}
          </Stack>
        </div>
      ) : null}
    </Container>
  );
}
