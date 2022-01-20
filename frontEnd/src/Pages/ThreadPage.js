import React, { useEffect, useState, setState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CreateAnswer from "../components/CreateAnswer";
import ScrollTop from "../components/ScrollTop.js";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "200ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  let { username, subject, thread } = useParams();

  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/answers/answer",
      timeout: 4000,
    })
      .then((result) => {
        console.log("result = ", result);
        setAnswers(result.data);
        console.log("answers = ", answers);
      })
      .catch((error) => console.log("error", error));
  });

  return (
    <div>
      <CreateAnswer />
      <ScrollTop />
      <List className={classes.root}>
        {console.log("answers in html = ", answers)}
        {answers
          .filter((answer) => {
            return answer.thread === thread && answer.subject === subject;
          })
          .map((answer) => (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={thread}
                secondary={
                  <React.Fragment>
                    <div>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {answer.username}
                      </Typography>
                    </div>
                    {answer.body}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
