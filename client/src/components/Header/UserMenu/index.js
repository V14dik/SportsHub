import {
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/user/actions";
import { Link } from "react-router-dom";
import axios from "axios";

import config from "../../../config.json";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { isLogIn } = useSelector(({ user }) => user);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userId, setUserId] = useState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUser = async () => {
    const res = await axios.get(config.serverUrl + "/get/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setUserId(res.data);
  };

  useEffect(() => {
    if (isLogIn) {
      getUser();
    }
  }, [isLogIn]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={isLogIn ? "Vlad Cherenkevich" : "User"}
            src="/static/images/avatar/2.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {isLogIn ? (
          <div>
            <MenuItem
              component={Link}
              to={"/profile/" + userId}
              onClick={handleCloseUserMenu}
            >
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/subscriptions/"}
              onClick={handleCloseUserMenu}
            >
              <Typography>Subscriptions</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/create-course"}
              onClick={handleCloseUserMenu}
            >
              <Typography>Create course</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logOut())}>
              <Typography>Log out</Typography>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              component={Link}
              to={"/sign-up"}
              onClick={handleCloseUserMenu}
            >
              <Typography>Sign up</Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/sign-in"}
              onClick={handleCloseUserMenu}
            >
              <Typography>Sign in</Typography>
            </MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
};
