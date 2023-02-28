import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export const Article = ({ article }) => {
  return (
    <Card>
      <CardHeader title={article.name} subheader={article.user} />
      <CardContent>
        <Typography>{article.content}</Typography>
      </CardContent>
    </Card>
  );
};
