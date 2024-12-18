import React, { useState, useContext } from 'react'
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Contact() {
  const { lightMode} = useContext(ThemeContext)

  const [openSuccess, setOpenSuccess] = useState(false)
  const [openWarning, setOpenWarning] = useState(false)

  const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    };

    const service_id = 'service_t02yo3u',
      template_id = 'template_gnfp56n',
      public_key = 'sh5ftzuQ4g5FMqdAx'
    emailjs.send(service_id, template_id, formData, {
      publicKey: public_key
    }).then((result) => {
      console.log('Email sent successfully!', result.text);
      setOpenSuccess(true)
    }, (error) => {
      console.log('Error sending email:', error);
      setOpenWarning(true)
    });
  };




  return (
    <section id='contact' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isTablet ? 'fit-content' : '100vh', paddingTop: isTablet ? '8%' : '3%', background: !lightMode && 'black', paddingBottom:'5%' }}>
      <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        <h1 style={{ marginBottom: '3%', marginTop: '0px', color: lightMode ? 'var(--light-primary)' : ' var(--dark-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
          Contact Me
        </h1>

        <div style={{ background: lightMode?'var(--light-primary)':'linear-gradient(to bottom, var(--dark-primary), var(--light-primary))', height: isLaptop ? '50%' : '70%', borderRadius: '20px', display: 'flex', justifyContent: 'space-around', width: "100%", flexDirection: isTablet ? 'column' : 'unset', padding: isTablet ? '5%' : '0%' }}>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isTablet ? '5%' : 'unset' }}>
            <img src="/images/contact-img.png" alt="contact-img" style={{ width: isTablet ? '40%' : '70%', background: 'var(--default-color-1)', borderRadius: '5px' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>

            <form onSubmit={handleSubmit} action="submit" style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" name='name' placeholder='Name' style={{ width: isLaptop ? '100%' : '80%', padding: '10px 20px' }} />
              <input type="email" name='email' placeholder='Email' style={{ width: isLaptop ? '100%' : '80%', padding: '10px 20px' }} />
              <input type="text" name='subject' placeholder='Subject' style={{ width: isLaptop ? '100%' : '80%', padding: '10px 20px' }} />
              <textarea name='message' placeholder='Message' style={{ width: isLaptop ? '100%' : '80%', padding: '10px 20px', height: '50px' }} />
              <button style={{ width: '50%', padding: '10px 20px', alignSelf: 'center', background: 'gold', color: 'var(--special-text)', fontWeight: 'bold', border: 'none', borderRadius: '2px' }}>Send</button>

            </form>
          </div>
        </div>


      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Email sent successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openWarning}
        autoHideDuration={6000}
        onClose={() => setOpenWarning(false)}
      >
        <Alert
          onClose={() => setOpenWarning(false)}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Failed to send email.
        </Alert>
      </Snackbar>

    </section >
  )
}
