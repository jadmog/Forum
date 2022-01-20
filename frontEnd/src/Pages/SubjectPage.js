import React, { useRef, useState, useEffect } from 'react'
import {
  Link,
  useParams
} from "react-router-dom";
import Thread from '../components/Thread.js'
import { makeStyles } from '@material-ui/core/styles';
import questionButton from '../Pages/questionButton.module.css'
import ScrollTop from '../components/ScrollTop.js'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function SubjectPage(props) {
  console.log('props', props);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const [threads, setThreads] = useState([])

  const inputTitleRef = useRef(null);
  let { username, subject } = useParams();

  const deleteQuestion = (id) => {

    const title = inputTitleRef.current.value;

    /* const requestOptions = {
       method: 'DELETE',
       headers: {
         'Authorization': 'Bearer my-token',
         'My-Custom-Header': 'foobar'
       }
     };
     fetch(`http://localhost:5000/subject/subject/${title}`, requestOptions)
       .then(() => console.log('Delete successful'))
       .catch(() => console.log('Error deleting'));*/
    console.log('thread id', id)

    /*fetch(`http://localhost:5000/subject/${title}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
    })
      .then(response => response.json())
      .then(newThread => {
        console.log('thread', newThread);
        setThreads([
          ...threads,
          newThread
        ])
        alert('Thread Deleted!')
      })
      .catch(error => console.log('error', error));*/
  }
  const submit = () => {

    const title = inputTitleRef.current.value;

    fetch("http://localhost:5000/subject/subject", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        title: title,
        subject: subject,
        author: username,
      }),
    })
      .then(response => response.json())
      .then(newThread => {
        console.log('thread', newThread);
        // 
        setThreads([
          ...threads,
          newThread
        ])
        alert('Thread Saved!')
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch("http://localhost:5000/subject/subject", {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        console.log('result', result)
        console.log('threadUsername', threads.username)
        console.log('username', username)
        setThreads(result);
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    // <div className={classes.root}>
    <div>
      {console.log('SubjectPageUsername ', username)}
      {/* {console.log('ThreadUsername ', thread.username)} */}
      <div>
        <input className={questionButton["c-checkbox"]} type="checkbox" id="checkbox" />
        <div className={questionButton["c-formContainer"]}>
          <form className={questionButton["c-form"]} action="">
            <input className={questionButton["c-form__input"]} ref={inputTitleRef} placeholder="Question" type="text" />
            <label className={questionButton["c-form__buttonLabel"]} for="checkbox">
              <button className={questionButton["c-form__button"]} type="button" onClick={submit}>Ask</button>
            </label>
            <label className={questionButton["c-form__toggle"]} for="checkbox" data-title="Ask a question"></label>
          </form>
        </div>
      </div>
      <ScrollTop />
      <h1>
        {threads
          .filter((thread) => {
            console.log('----', thread.subject)
            return thread.subject === subject
          })
          .map((thread, key) => {
            return (
              <Link to={{
                pathname: '/subjects/' + username + '/' + thread.subject + '/' + thread.title
              }} style={{ textDecoration: 'none', color: "black" }}>
                <div style={{ display: 'inline-grid', 'flex-direction': 'row' }} ><Thread
                  key={key}
                  title={thread.title} />
                  <div style={{ marginLeft: 'auto' }}>
                    {thread.author === username && <Button onClick={deleteQuestion(thread.id)} variant="outlined" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>}
                    {console.log('ThreadAuthor ', thread.author, thread)}
                    {console.log('equalUsername ', username)}
                  </div>
                </div>
                <Divider></Divider>
              </Link>
            )
          })
        }
      </h1>
    </div >
  );
}