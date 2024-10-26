import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeContext } from '../contexts/ThemeContext';

export default function HeaderDrawer({ open, toggleDrawer }) {
  const { lightMode } = useContext(ThemeContext)

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'} >
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} style={{ backgroundColor: !lightMode && 'var(--light-text)', height: '100%', color: !lightMode && 'white' }}>
        <List>
          {[{ title: 'Home', url: '/#top', icon: <HomeIcon /> }, { title: 'Skills', url: '/#skills', icon: <ConstructionIcon /> }, { title: 'Projects', url: '/#projects', icon: <WebStoriesIcon /> }, { title: 'Contact', url: '/#contact', icon: <MailIcon /> }].map((group, index) => (
            <a key={index}  href={group.url}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: !lightMode && 'gray' }}>
                    {group.icon}
                  </ListItemIcon>
                  <ListItemText primary={group.title} />
                </ListItemButton>
              </ListItem>
            </a>
          ))}
        </List>
        <Divider />
        <List>
          <a href='/projects' >
            {['Resume'].map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} style={{ background: 'gold', color: 'var(--special-text)', padding: '5px 15px', border: 'none', fontWeight: 'bold', borderRadius: '5px', textAlign: 'center' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </a>
        </List>
      </Box>
    </Drawer>
  )
}
