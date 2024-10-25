import { Box, Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '70vh',
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    p: 2,
};



export default function ProjectModal({ open, handleClose, details }) {
    return (
        <>
            {
                details && Object.keys(details).length !== 0 &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
                        <img src={`${details.imageURL}`} alt="" style={{ height: '100%', width: '70%', objectFit: 'fill', background: '#e3e3e3' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <span style={{ borderBottom: '1px solid #00000026', fontWeight: 'bold', paddingBottom: '10px' }}>
                                {details.title}
                            </span>
                            <span style={{ fontSize: 'small' }}> {details.description}</span>
                            <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {details.topics.map((topic, index) =>
                                    <span key={index} style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>{topic}</span>
                                )}
                            </span>
                            <span style={{ fontSize: 'small', display: "flex", gap: '10px', alignItems: "center", justifyContent: 'center', color: '#ffbf00', fontWeight: 'bold' }}>
                                <a href={`${details.webURL}`} target='_blank' rel="noreferrer">View Website </a>
                                {details.gitURL && <>
                                    <span style={{ fontSize: 'x-small', color: 'black' }}>•</span>
                                    <a href={`${details.gitURL}`} target='_blank' rel="noreferrer"> View Github</a>
                                </>}
                            </span>
                        </div>
                        <span style={{ textAlign: 'right', cursor: 'pointer' }} onClick={handleClose}><CloseIcon style={{ background: 'gold', borderRadius: '20px', fontWeight: 'bold', padding: '5px' }} /></span>
                    </Box>
                </Modal>
            }
        </>
    )
}
