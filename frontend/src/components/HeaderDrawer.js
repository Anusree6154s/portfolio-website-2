import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function HeaderDrawer({ open, toggleDrawer }) {
  const navigate = useNavigate()

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {[{ title: 'Home', url: '/#top' }, { title: 'Skills', url: '/#skills' }, { title: 'Projects', url: '/#projects' }, { title: 'Contact', url: '/#contact' }].map((group, index) => (
            <ListItem key={index} disablePadding>
              <a href={`${group.url}`}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={group.title} />
                </ListItemButton>
              </a>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Resume'].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
