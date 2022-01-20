import React from 'react';
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '200ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  let { thread } = useParams()

  const messages = [
    {
      title: 'How are black holes created?',
      username: 'Jadeups',
      text: 'Interesting question! I think it has to do with voliminous dying stars.'
    },
    {
      title: 'How are black holes created?',
      username: 'Laure',
      text: 'Indeed, but how, more specifically ?'
    },
    {
      title: 'How are mitochondrias created?',
      username: 'Lynn',
      text: 'No idea haha, not interesting'
    },
    {
      title: 'How are mitochondrias created?',
      username: 'Joseph',
      text: 'Stop spamming'
    }
  ]
  return (
    <List className={classes.root}>

      {messages
        .filter((message) => {
          return message.title === thread
        })
        .map((message) => (
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
                      {message.username}
                    </Typography>
                  </div>
                  {message.text}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
    </List>
  );
}
