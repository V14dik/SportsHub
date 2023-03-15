import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export const Article = ({ article }) => {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Card>
      <CardHeader
        title={article.name}
        subheader={
          <>
            <Typography>{article.userName}</Typography>
            <Typography>
              {new Date(article.createdAt).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </Typography>
          </>
        }
      />

      <CardContent>
        <Typography>{article.content}</Typography>
      </CardContent>
    </Card>
  );
};
