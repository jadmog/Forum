import React, { useRef, useState, props, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import buttonStyle from "../components/button.module.css";
import Axios from "axios";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CreateAnswer() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const inputAnswer = useRef(null);
  const [answers, setAnswers] = useState([]);
  let { username, subject, thread } = useParams();
  console.log(subject);
  console.log(thread);
  const submitAnswer = () => {
    const fieldAnswer = inputAnswer.current.value;
    Axios({
      method: "POST",
      data: {
        username: username,
        subject: subject,
        thread: thread,
        body: fieldAnswer,
      },
      withCredentials: true,
      url: "http://localhost:5000/answers/answer",
      timeout: 4000,
    })
      .then((newAnswer) => {
        console.log("thread", newAnswer);
        setAnswers([...answers, newAnswer]);
        setOpen(false);
        alert("Answer saved!");
      })
      .catch((error) => console.log("error", error));
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Write your answer!</h2>
      <div>
        <textarea
          ref={inputAnswer}
          rows="10"
          cols="40"
          placeholder="Write answer here"
        ></textarea>
      </div>
      <button type="submit" onClick={handleClose}>
        Cancel
      </button>
      <button type="submit" onClick={submitAnswer}>
        Ok
      </button>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        className={buttonStyle.coolBeans}
        onClick={handleOpen}
      >
        Write your answer
      </button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
