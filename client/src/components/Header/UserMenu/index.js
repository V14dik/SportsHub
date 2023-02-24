import {
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/user/actions";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { isLogIn } = useSelector(({ user }) => user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          <MenuItem onClick={() => dispatch(logOut())}>
            <Typography>Log out</Typography>
          </MenuItem>
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
              to={"/log-in"}
              onClick={handleCloseUserMenu}
            >
              <Typography>Log in</Typography>
            </MenuItem>
          </div>
        )}
      </Menu>
    </Box>
  );
};
