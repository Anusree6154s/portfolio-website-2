import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HeaderDrawer from './HeaderDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../contexts/ThemeContext';


export default function Header() {
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    const { lightMode, setLightMode } = useContext(ThemeContext)


    const setTheme = () => {
        const newTheme = !lightMode
        setLightMode(newTheme)
    }

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    console.log(lightMode)
    return (
        <>
            <header style={{ position: 'sticky', top: '0px', zIndex: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: lightMode ? 'white' : 'var(--dark-background)', boxShadow: '0px 1px 5px 1px #00000026' }}>
                        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" component="div" sx={{
                                    background: lightMode ? 'linear-gradient(to right,var(--light-primary), var(--light-accent))' : 'linear-gradient(to right,var(--dark-primary), var(--dark-accent))',
                                    padding: '0px 8px 0px 10px', fontWeight: 'bold', cursor: 'pointer',
                                }}>
                                    A.
                                </Typography>
                                <Box style={{ display: isTablet ? 'none' : 'flex', color: lightMode ? 'var(--light-text)' : 'var(--dark-text)', width: '50%', justifyContent: 'space-between', cursor: 'pointer' }} className='nav-buttons'>
                                    <a href='/#top' >Home</a>
                                    <a href='/#skills'>Skills</a>
                                    <a href='/#projects'>Projects</a>
                                    <a href='/#contact'>Contact</a>
                                </Box>
                                <a href="https://drive.google.com/file/d/1yCF-00tsgWcXbntJY-yjH896HMvbsFew/view?usp=drive_link" target='_blank' rel="noreferrer" color="inherit" style={{ background: 'gold', color: 'var(--special-text)', padding: '5px 15px', border: 'none', fontWeight: 'bold', borderRadius: '5px' }} className='resume-button'>Resume</a>
                                <div
                                    onClick={setTheme}
                                    style={{ cursor: 'pointer', color: lightMode ? 'var(--light-primary)' : 'var(--dark-primary)' }}>
                                    {lightMode ? <DarkModeIcon /> : <LightModeIcon />}
                                </div>

                                <MenuIcon onClick={toggleDrawer(true)} className='drawer-button' style={{ color:lightMode? 'black':'white', display: !isTablet && 'none' }} />
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>

            <HeaderDrawer open={open} toggleDrawer={toggleDrawer} />
        </>
    )
}
