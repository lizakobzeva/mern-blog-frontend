import React, { useRef, useState, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useNavigate, Navigate } from "react-router-dom";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/authSlice";
import axios from "../../axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const inputfileRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [text, setText] = useState("");
  const isAuth = useSelector(selectIsAuth);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке картинки");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmitPost = async () => {
    try {
      setLoading(true);
      const postData = {
        title,
        imageUrl,
        tags,
        text,
      };
      const { data } = await axios.post("/posts", postData);

      const id = data._id;

      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err);
      alert("Не удалось создать статью");
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputfileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputfileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl != "" && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        onChange={(ch) => setTitle(ch.target.value)}
        value={title}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        onChange={(ch) => setTags(ch.target.value)}
        value={tags}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        onChange={(ch) => setText(ch)}
        value={text}
        className={styles.editor}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          onClick={onSubmitPost}
          type="submit"
          size="large"
          variant="contained"
        >
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
