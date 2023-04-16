import { Card, CardContent, CardHeader, Typography } from "@mui/material";
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
        title={article.name}
        subheader={
          <>
            <Typography>{article.userName}</Typography>
            <Typography>{getDate(article.createdAt)}</Typography>
          </>
        }
      />

      <CardContent>
        <Typography>{article.content}</Typography>
      </CardContent>
    </Card>
  );
};
