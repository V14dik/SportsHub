import { Paper, Stack, Typography } from "@mui/material";

import { getDate } from "../../utils/getDate";
import { ProfileLink } from "../ProfileLink";

export const Comment = ({ comment }) => {
  return (
    <Paper elevation={3} sx={{ padding: "10px" }}>
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "baseline", justifyContent: "space-between" }}
        >
          <ProfileLink userId={comment.user._id}>
            {comment.user.username}
          </ProfileLink>
          <Typography
            variant="caption"
            sx={{
              color: "#808080",
            }}
          >
            {getDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography>{comment.content}</Typography>
      </Stack>
    </Paper>
  );
};
