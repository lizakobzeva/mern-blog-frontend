import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { getPosts, getTags } from "../redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getPosts());
  }, [dispatch]);

  const { posts, tags } = useSelector((state) => state.posts);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(posts.status !== "success" ? [...Array(5)] : posts.items).map(
            (obj, index) =>
              posts.status !== "success" ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={150}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?._id == obj.user._id}
                />
              )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items
              .filter((el, id) => tags.items.indexOf(el) === id)
              .slice(0, 5)}
            isLoading={tags.status === "success" ? false : true}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
