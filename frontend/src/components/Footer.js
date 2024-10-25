import React from 'react'
import { useMediaQuery } from 'react-responsive';


export default function Footer() {

    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
    const isSmall = useMediaQuery({ query: '(max-width: 320px)' });

    return (
        <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', textAlign: 'center', display: 'flex', justifyContent: 'center', fontFamily: 'monospace', color: 'darkslategray', marginTop: '5%' }}>
            <div style={{ width: isTablet ? '90%':'60%', display: 'flex', justifyContent: 'space-around', flexDirection: isTablet ? 'column' : 'unset', gap: isTablet ? '20px' : '0px' }}>
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
                        <a href="https://github.com/Anusree6154s" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--light-primary)', fontWeight: 'bold' }}>GitHub</a> |
                        <a href="https://www.linkedin.com/in/anusree-anilkumar-6154s/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--light-primary)', fontWeight: 'bold' }}> LinkedIn</a>
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
