import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ProfileLink({ children, userId }) {
  return (
    <Typography
      sx={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}
      gutterBottom
      component={Link}
      to={"/profile/" + userId}
    >
      {children}
    </Typography>
  );
}
