import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { getDate } from "../../../utils/getDate";

export const Article = ({ article }) => {
  return (
    <Card
      component={Link}
      to={`/article/${article._id}`}
      sx={{ textDecoration: "none" }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{article.name}</Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {getDate(article.createdAt)}
            </Typography>
          </Stack>
        }
        subheader={
          <Stack justifyContent={"space-between"} direction="row">
            <Typography>{article.userName}</Typography>
          </Stack>
        }
      />

      <CardContent>
        <Typography noWrap>{article.content}</Typography>
      </CardContent>
    </Card>
  );
};
