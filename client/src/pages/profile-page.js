import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import config from "../config.json";
import { useParams } from "react-router-dom";
import { Article } from "../components/Articles/Article";
import { Course } from "../components/Course";
import { Event } from "../components/Event";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        height: "500px",
        overflow: "auto",
      }}
    >
      {value === index && (
        <Stack spacing={2} overflow={"auto"} sx={{ padding: "3px" }}>
          {children}
        </Stack>
      )}
    </div>
  );
}

export function ProfilePage() {
  const { isLogIn } = useSelector(({ user }) => user);
  const [userInfo, setUserInfo] = useState();
  const userId = useParams().id;

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(
      config.serverUrl + `/user/${userId}/isUser=true`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setUserInfo(res.data);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const followHandler = async () => {
    const res = await axios.post(
      config.serverUrl + `/user/follow`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setUserInfo({
      ...userInfo,
      user: {
        ...userInfo.user,
        subsCount: userInfo.user.subsCount + 1,
        isSub: true,
      },
    });
  };

  const unfollowHandler = async () => {
    const res = await axios.post(
      config.serverUrl + "/user/unfollow",
      { userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setUserInfo({
      ...userInfo,
      user: {
        ...userInfo.user,
        subsCount: userInfo.user.subsCount - 1,
        isSub: false,
      },
    });
  };

  return (
    <Container>
      {userInfo ? (
        <Stack spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5">{userInfo.user.username}</Typography>
            {(() => {
              if (!userInfo.user.isUser) {
                if (userInfo.user.isSub) {
                  return (
                    <Button
                      onClick={unfollowHandler}
                      variant="contained"
                      size="small"
                      disabled={isLogIn ? false : true}
                    >
                      Unfollow
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      onClick={followHandler}
                      variant="contained"
                      size="small"
                      disabled={isLogIn ? false : true}
                    >
                      Follow
                    </Button>
                  );
                }
              } else return null;
            })()}
          </Stack>
          <Stack>
            <Typography>followers: {userInfo.user.subsCount}</Typography>
            <Typography>articles: {userInfo.articles.length}</Typography>
            <Typography>courses: {userInfo.courses.length}</Typography>
            <Typography>events: {userInfo.events.length}</Typography>
          </Stack>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            centered
            variant="fullWidth"
          >
            <Tab label={"Articles"} />
            <Tab label={"Courses"} />
            <Tab label={"Events"} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            {userInfo.articles
              .map((article, index) => (
                <Article
                  article={article}
                  key={index + article.name}
                  isUser={userInfo.user.isUser}
                  afterDelete={getUser}
                />
              ))
              .reverse()}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {userInfo.courses.map((course, index) => (
              <Course course={course} key={index + course.name} />
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {userInfo.events.map((event, index) => (
              <Event event={event} key={index + event.name} />
            ))}
          </TabPanel>
        </Stack>
      ) : null}
    </Container>
  );
}
