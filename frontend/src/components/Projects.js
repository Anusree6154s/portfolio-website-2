import { useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import ProjectModal from './ProjectModal';
import projectsDB from '../db/projects.json'




export default function Projects() {
    const projects = [...JSON.parse(sessionStorage.getItem('projects')), ...projectsDB]

    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({})
    const handleOpen = (project) => {
        setOpen(true)
        setDetails(project)
    }
    const handleClose = () => {
        setOpen(false)
        setDetails({})
    }


    return (
        <section id='projects' style={{ height: 'fit-content', display: 'flex', justifyContent: 'center', paddingTop: '8%' }}>
            <div style={{ width: '80%' }
            } >
                <h1 style={{ marginBottom: '3%', marginTop: '0px', color: 'var(--light-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
                    Projects
                </h1>

                <p style={{ textAlign: 'right', fontSize: 'small', marginBottom: '20px', fontWeight: 'bold', color: '#ffbf00' }} className='view-projects-button'>
                    <a href="/projects">View All Projects</a>
                </p>

                <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Swiper
                        navigation={true}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={3}
                        modules={[Navigation, Pagination]} className="mySwiper"
                        style={{ background: 'white', height: '100%', paddingBottom: '60px' }}
                    >
                        {projects && projects.length !== 0 &&
                            projects.map((project, index) => (
                                !project.error &&
                                <SwiperSlide key={index} className='swiper-slide' onClick={() => handleOpen(project)}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <img src={`${project.imageURL}`} alt="dummy img" style={{ width: "100%", height: '60%', flex: 1.5, background: 'gray' }} />


                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%', flex: 0.85 }}>
                                            <span style={{ textAlign: 'center' }}>{project.title}</span>
                                            <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                {project.topics.slice(0, 3).map((topic, index) =>
                                                    <span key={index} style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>{topic}</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        {/* {projectsDB && projectsDB.length !== 0 &&
                            projectsDB.map((project, index) => (
                                !project.error &&
                                <SwiperSlide key={index} className='swiper-slide' onClick={() => handleOpen(project)}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <img src={`${project.imageURL}`} alt="dummy img" style={{ width: "100%", height: '60%', flex: 1.5, background: 'gray' }} />


                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%', flex: 0.85 }}>
                                            <span style={{ textAlign: 'center' }}>{project.title}</span>
                                            <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                {project.topics.slice(0, 3).map((topic, index) =>
                                                    <span key={index} style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>{topic}</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))} */}

                    </Swiper>
                </div>
            </div>

            <ProjectModal open={open} handleClose={handleClose} details={details} />

            <style>
                {`
          .swiper-button-next,
          .swiper-button-prev {
            color: black;
            font-weight:bold;
            background:gold;
            border-radius:20px;
            font-size: 20px; 
            width: 30px; 
            height: 30px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 15px; 
          }

          .swiper-pagination-bullet-active {
            background-color: goldenrod; 
          }

          .swiper-slide:hover{
          background:#f5f5f5;
          opacity:0.8;
          cursor:pointer;
          }

       
        `}
            </style>

        </section>
    )
}
