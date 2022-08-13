import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0px'
  },
  inline: {
    display: 'inline'
  }
}))

export default function ItemsList ({ list }) {
  const classes = useStyles()
  console.log('list', list)
  return (
    <List className={classes.root}>
      {list &&
        Array.isArray(list) &&
        list.map(({ commentDetail, id }) => {
          const { selectedTrim, selectedCameraControl, message } =
            commentDetail.content
          const { user, createdDate } = commentDetail
          return (
            <>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background: '#002856',
                      color: 'white'
                    }}
                  >
                    {user?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user} - ${createdDate}`}
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'
                      >
                        {`${id} - ${selectedTrim} ${selectedCameraControl} - `}
                      </Typography>
                      {message}
                    </>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          )
        })}
    </List>
  )
}
