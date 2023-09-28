import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import config from "../../../config.json";

import { getDate } from "../../../utils/getDate";
import axios from "axios";

export const Article = ({ article, isUser, afterDelete }) => {
  const navigate = useNavigate();

  const onDeleteHandler = async () => {
    const res = await axios.delete(
      config.serverUrl + "/article/" + article._id
    );
    afterDelete();
  };

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
            <Stack>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                {getDate(article.createdAt)}
              </Typography>
              {isUser ? (
                <Stack
                  direction={"row"}
                  spacing={1}
                  justifyContent={"flex-end"}
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/edit-article/${article._id}`);
                    }}
                  >
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteHandler();
                    }}
                  >
                    <DeleteIcon size="small" />
                  </IconButton>
                </Stack>
              ) : null}
            </Stack>
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
