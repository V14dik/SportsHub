import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import config from "../../config.json";
import axios from "axios";

export const CommentForm = ({ articleId }) => {
  const { isLogIn } = useSelector(({ user }) => user);
  const [content, setContent] = useState("");
  const addComment = async () => {
    const url = config.serverUrl + "/comment";
    await axios.post(
      url,
      { content, articleId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  };
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "10px",
        mb: 2,
      }}
    >
      <Stack
        component={"form"}
        spacing={1}
        onSubmit={(e) => {
          addComment();
        }}
      >
        <Typography variant="button">Add your comment</Typography>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: "10%" }}
          disabled={isLogIn ? false : true}
        >
          Send
        </Button>
      </Stack>
    </Paper>
  );
};
