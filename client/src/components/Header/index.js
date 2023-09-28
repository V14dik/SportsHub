import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { UserMenu } from "./UserMenu";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SportsHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/add-article"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add post
            </Button>
            <Button
              component={Link}
              to="/events"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Events
            </Button>
            <Button
              component={Link}
              to="/courses"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Courses
            </Button>
          </Box>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
