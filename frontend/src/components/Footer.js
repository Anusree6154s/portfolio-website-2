import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import { useMediaQuery } from 'react-responsive';


export default function Footer() {
    const { lightMode} = useContext(ThemeContext)

    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <footer style={{ padding: '20px', backgroundColor: lightMode ? '#f8f9fa' : 'var(--light-text)', textAlign: 'center', display: 'flex', justifyContent: 'center', fontFamily: 'monospace', color: lightMode ? 'darkslategray' : 'var(--dark-text)', paddingTop: '5%' }}>
            <div style={{ width: isTablet ? '90%' : '60%', display: 'flex', justifyContent: 'space-around', flexDirection: isTablet ? 'column' : 'unset', gap: isTablet ? '20px' : '0px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', textAlign: isTablet ? 'center' : 'left' }}>
                    <span>
                        <strong style={{ display: isTablet && 'none' }}>Email: </strong>
                        <a href="mailto:anilkumaranusree113@gmail.com">anilkumaranusree113@gmail.com</a>
                    </span>
                    <span>
                        <strong style={{ display: isTablet && 'none' }}>Phone: </strong>
                        <a href='https://wa.me/+919699973230' target="_blank" rel="noopener noreferrer">+91-9699973230</a>
                    </span>
                    <div>
                        <a href="https://github.com/Anusree6154s" target="_blank" rel="noopener noreferrer" style={{ color: lightMode ? 'var(--light-primary)' : 'var(--dark-primary)', fontWeight: 'bold' }}>GitHub</a> |
                        <a href="https://www.linkedin.com/in/anusree-anilkumar-6154s/" target="_blank" rel="noopener noreferrer" style={{ color: lightMode ? 'var(--light-primary)' : 'var(--dark-primary)', fontWeight: 'bold' }}> LinkedIn</a>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span>&copy; 2024 Anusree Anilkumar</span>
                    <span>Illustrations by <a href="https://storyset.com/education" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Storyset</a></span>
                    <span>Made with ❤️</span>
                </div>

            </div>


        </footer>
    )
}
