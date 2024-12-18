import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import ProjectModal from "./ProjectModal";
import crioExtraProjects from "../db/crioExtraProjects.json";
import { useMediaQuery } from "react-responsive";
import CircularProgress from "@mui/material/CircularProgress";

export default function Projects() {
  const localProjects = JSON.parse(sessionStorage.getItem("projects"));
  const localPrevProjects = JSON.parse(sessionStorage.getItem("prevProjects"));
  console.log(localProjects, localPrevProjects)
  const projects = localProjects
    ? [...localProjects, ...crioExtraProjects]
    : localPrevProjects
    ? [...localPrevProjects, ...crioExtraProjects]
    : [];

  const { lightMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const handleOpen = (project) => {
    setOpen(true);
    setDetails(project);
  };
  const handleClose = () => {
    setOpen(false);
    setDetails({});
  };

  const isLaptop = useMediaQuery({ query: "(max-width: 1024px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section
      id="projects"
      style={{
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        paddingTop: "8%",
        color: !lightMode && "var(--dark-text)",
        background: !lightMode && "var(--dark-background)",
      }}
    >
      <div style={{ width: "80%" }}>
        <h1
          style={{
            marginBottom: "3%",
            marginTop: "0px",
            color: lightMode ? "var(--light-primary)" : "var(--dark-primary)",
            fontWeight: "900",
            textTransform: "uppercase",
          }}
        >
          Projects
        </h1>

        {projects.length !== 0 ? (
          <>
            <p
              style={{
                textAlign: "right",
                fontSize: "small",
                marginBottom: "20px",
                fontWeight: "bold",
                color: "#ffbf00",
              }}
              className="view-projects-button"
            >
              <a href="/projects">View All Projects</a>
            </p>

            <div
              style={{
                height: "60vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Swiper
                navigation={true}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                slidesPerView={isTablet ? 1 : isLaptop ? 2 : 3}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                style={{
                  background: lightMode ? "white" : "black",
                  height: "100%",
                  paddingBottom: "60px",
                }}
              >
                {projects &&
                  projects.length !== 0 &&
                  projects.map(
                    (project, index) =>
                      !project.error && (
                        <SwiperSlide
                          key={index}
                          className="swiper-slide"
                          onClick={() => handleOpen(project)}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              height: "100%",
                              boxShadow: "0x 2px 2px 2px #f8f9fa",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <img
                              src={`${project.imageURL}`}
                              alt="dummy img"
                              style={{
                                width: "100%",
                                height: "60%",
                                flex: 1.5,
                                background: lightMode
                                  ? "gray"
                                  : "var(--dark-accent)",
                              }}
                            />

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                                alignItems: "center",
                                width: "80%",
                                justifyContent: "space-around",
                                height: "100%",
                                flex: 0.85,
                              }}
                            >
                              <span style={{ textAlign: "center" }}>
                                {project.title}
                              </span>
                              <span
                                style={{
                                  fontSize: "small",
                                  display: "flex",
                                  gap: "5px",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                {project.topics
                                  .slice(0, 3)
                                  .map((topic, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        borderRadius: "10px",
                                        background: lightMode
                                          ? "#e3e3e3"
                                          : "var(--dark-accent)",
                                        padding: "2px 10px",
                                      }}
                                    >
                                      {topic}
                                    </span>
                                  ))}
                              </span>
                            </div>
                          </div>
                        </SwiperSlide>
                      )
                  )}
              </Swiper>
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
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

   .swiper-pagination-bullet{
   background-color: goldenrod; 
   }
          .swiper-pagination-bullet-active {
            background-color: goldenrod; 
          }

          .swiper-slide:hover{
            background: ${lightMode ? "#f5f5f5" : "var(--light-text)"};
            opacity:0.8;
            cursor:pointer;
            border-radius:10px;
            overflow:hidden;
          }

       
        `}
      </style>
    </section>
  );
}
