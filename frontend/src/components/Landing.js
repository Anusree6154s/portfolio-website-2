import React, { useContext } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Landing() {
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
    const isSmall = useMediaQuery({ query: '(max-width: 320px)' });

    const { lightMode} = useContext(ThemeContext)

    return (
        <>
            <section id='landing' style={{ display: 'flex', justifyContent: 'center', height: isTablet ? 'fit-content' : '90vh', alignItems: 'center', paddingBottom: isSmall ? '20%' : isMobile ? '10%' : '2%', background: !lightMode && 'var(--dark-background)', color: !lightMode && 'var(--dark-text)' }}>
                <div style={{ width: '75%', display: 'flex', gap: '10%', flexDirection: isTablet ? 'column-reverse' : 'row', alignItems: isTablet ? 'center' : 'start' }} >

                    <div style={{ flex: 1, textAlign: isTablet ? 'center' : 'left' }} className='content-section'>
                        <div style={{ fontFamily: 'var(--text-primary)', paddingBottom: '20px', textTransform: 'uppercase' }}>
                            <h1 style={{ margin: '0px', paddingBottom: '5px' }}>
                                <span>Hi I'm  </span>
                                <span style={{
                                    background: 'linear-gradient(to right, var(--dark-primary), var(--dark-accent))',
                                    // background: lightMode ? 'linear-gradient(to right, var(--light-primary), var(--light-accent))':'linear-gradient(to right, var(--dark-primary), var(--dark-accent))',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    margin: '0px', fontWeight: '900'
                                }}>
                                    Anusree
                                </span>
                                👋
                            </h1>

                            <h2 style={{ margin: '0px' }}>I'm a <span style={{
                                background: 'linear-gradient(to right, var(--dark-primary), var(--dark-accent))',
                                // background: lightMode?'linear-gradient(to right, var(--light-primary), var(--light-accent))':'linear-gradient(to right, var(--dark-primary), var(--dark-accent))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent', fontWeight: '900'
                            }}>Fullstack Developer</span></h2>


                        </div>
                        <div style={{ display: isTablet ? 'flex' : 'block', flexDirection: isTablet ? 'column' : 'unset', alignItems: isTablet ? 'center' : 'unset' }}>
                            <p style={{ fontSize: '16px' }}>
                                I specialize in building applications using <strong>ReactJS</strong> and <strong>JavaScript</strong> for the frontend, along with databases like <strong>MongoDB</strong> and <strong>SQL</strong>. Additionally, I work with state management tools such as <strong>Redux</strong>. Currently, I'm expanding my skill set with Next.js and TypeScript.
                            </p>


                            <p style={{ fontSize: '16px' }}> Explore my projects to learn more!</p>

                            <a href='/projects' style={{ background: 'gold', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', color: 'var(--special-text)', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', width: 'fit-content' }} onMouseOver={(e) => e.currentTarget.style.background = 'dark-gold'} onMouseOut={(e) => e.currentTarget.style.background = 'gold'}>
                                <span>VIEW ALL PROJECTS</span>
                            </a>

                            <div style={{ display: 'flex', gap: '20px' }} id='socials-section'>
                                <a href='https://github.com/Anusree6154s' style={{ width: '30px', height: '30px', background: lightMode ? 'black' : 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = lightMode ? 'var(--light-primary)' : 'var(--dark-primary)'} onMouseOut={e => e.currentTarget.style.background = lightMode ? 'black' : 'white'} >
                                    <GitHubIcon style={{ width: '15px', height: '15px', color: lightMode ? 'white' : 'black' }} />
                                </a>
                                <a href='https://www.linkedin.com/in/anusree-anilkumar-6154s/' style={{ width: '30px', height: '30px', background: lightMode ? 'black' : 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = lightMode ? 'var(--light-primary)' : 'var(--dark-primary)'} onMouseOut={e => e.currentTarget.style.background = lightMode ? 'black' : 'white'}>
                                    <LinkedInIcon style={{ width: '15px', height: '15px', color: lightMode ? 'white' : 'black' }} />
                                </a>
                                <a href='mailto:anilkumaranusree113@gmail.com' style={{ width: '30px', height: '30px', background: lightMode ? 'black' : 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = lightMode ? 'var(--light-primary)' : 'var(--dark-primary)'} onMouseOut={e => e.currentTarget.style.background = lightMode ? 'black' : 'white'}>
                                    <EmailIcon style={{ width: '15px', height: '15px', color: lightMode ? 'white' : 'black' }} />
                                </a>
                                <a href='https://wa.me/+919699973230' style={{ width: '30px', height: '30px', background: lightMode ? 'black' : 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = lightMode ? 'var(--light-primary)' : 'var(--dark-primary)'} onMouseOut={e => e.currentTarget.style.background = lightMode ? 'black' : 'white'}>
                                    <WhatsAppIcon style={{ width: '15px', height: '15px', color: lightMode ? 'white' : 'black' }} />
                                </a>




                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, width: isTablet ? '50%' : '100%' }} >
                        <img src="/images/profile-img-1.png" alt="profile-img" style={{ objectFit: 'fit', width: '85%', padding: isTablet ? '10px' : '0px' }} />
                    </div>


                </div>
            </section>
        </>
    )
}
