import React, { useEffect, useRef, useState, useContext } from "react";
import ProjectModal from "../components/ProjectModal";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import crioExtraProjects from "../db/crioExtraProjects.json";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "../contexts/ThemeContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProjectsPage() {
  const { lightMode } = useContext(ThemeContext);

  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  const localPrevProjects = JSON.parse(sessionStorage.getItem("prevProjects"));
  const localProjects = JSON.parse(sessionStorage.getItem("projects"));
  const allProjects = localProjects
    ? [...localProjects, ...crioExtraProjects]
    : localPrevProjects
    ? [...localPrevProjects, ...crioExtraProjects]
    : [];

  const [projects, setProjects] = useState(allProjects);
  
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

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const alltopics = allProjects
    .flatMap((project) => (!project.error ? project.topics : []))
    .sort();
  const topics = [...new Set(alltopics)];

  const [tools, setTools] = useState([]);
  const handleSetFilter = (e) => {
    !tools.includes(e.target.innerHTML) &&
      setTools((prev) => [...prev, e.target.innerHTML]);
  };

  const handleUnsetFilter = (e) => {
    setTools((prev) => prev.filter((tool) => tool !== e.target.id));
  };

  const [searchInput, setSearchInput] = useState("");
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearInterval(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  useEffect(() => {
    if (allProjects.length) {
      let input = searchInput.toLowerCase();

      let filtered_projects_by_search = tools.length ? projects : allProjects;
      filtered_projects_by_search = filtered_projects_by_search.filter(
        (project) => {
          return (
            !project.error &&
            (project.title.toLowerCase().includes(input) ||
              project.description.toLowerCase().includes(input) ||
              project.topics.some((topic) =>
                topic.toLowerCase().includes(input)
              ))
          );
        }
      );

      let filtered_projects_by_tools = searchInput
        ? filtered_projects_by_search
        : allProjects;
      tools.forEach((item) => {
        let tool = item.toLowerCase();
        filtered_projects_by_tools = filtered_projects_by_tools.filter(
          (project) => {
            return (
              !project.error &&
              (project.title.toLowerCase().includes(tool) ||
                project.description.toLowerCase().includes(tool) ||
                project.topics.some((topic) =>
                  topic.toLowerCase().includes(tool)
                ))
            );
          }
        );
      });

      setProjects(filtered_projects_by_tools);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, tools]);

  return projects.length !== 0 ? (
    <section
      id="projects-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: !lightMode && "black",
        color: !lightMode && "white",
        paddingBottom: "5%",
      }}
    >
      <div
        id="searchbar"
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
          flexDirection: isTablet ? "column" : "unset",
        }}
      >
        <div
          id="search"
          style={{
            width: isTablet ? "100%" : "40%",
            background: lightMode ? "#f0f0f0" : "var(--light-text)",
            padding: "0px 10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <SearchIcon style={{ color: "gray", fontSize: "medium" }} />
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px 0px",
              outline: "none",
              border: "none",
              background: lightMode ? "#f0f0f0" : "var(--light-text)",
              color: !lightMode && "white",
            }}
            placeholder="Search"
            onChange={(e) => debounce(setSearchInput, 1000)(e.target.value)}
          />
        </div>

        <div
          id="filterbar"
          style={{
            display: "flex",
            fontSize: "small",
            gap: "20px",
            flexDirection: isTablet ? "column" : "unset",
            alignItems: "center",
          }}
        >
          <div
            id="filter-tools"
            style={{
              display: "flex",
              gap: "5px",
              flexWrap: "wrap",
              justifyContent: isTablet ? "center" : "end",
              fontSize: "x-small",
            }}
          >
            {tools.length !== 0 &&
              tools.map((tool, index) => (
                <span
                  key={index}
                  style={{
                    borderRadius: "10px",
                    background: "#f0f0f0",
                    padding: "2px 5px 2px 10px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  {tool}{" "}
                  <span
                    style={{
                      fontSize: "xx-small",
                      background: lightMode ? "white" : "gray",
                      borderRadius: "10px",
                      padding: "0px 3px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    id={tool}
                    onClick={(e) => handleUnsetFilter(e)}
                  >
                    x
                  </span>
                </span>
              ))}
          </div>
          <div
            id="filter-button"
            style={{
              fontSize: "small",
              color: "gray",
              display: "flex",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <span style={{ width: "max-content" }}>Filter by Tool</span>
            <FilterListIcon style={{ fontSize: "medium" }} />
            {isDropdownVisible && (
              <div
                style={{
                  position: "absolute",
                  top: "100%", // Right below the icon
                  right: "0%", // Align the right side of the dropdown with the right side of the icon
                  width: "100%",
                  height: "fit-content",
                  maxHeight: "200px",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  zIndex: 1, // Ensure it appears above other elements
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                className="dropdown"
              >
                {topics.length !== 0 &&
                  topics.map((topic, index) => (
                    <span
                      className="dropdown-item"
                      key={index}
                      style={{ padding: "5px 10px", width: "100%" }}
                      onClick={(e) => handleSetFilter(e)}
                    >
                      {topic}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(1, 1fr)"
            : isTablet
            ? "repeat(2, 1fr)"
            : "repeat(3, 1fr)",
          gap: "40px",
          paddingTop: "40px",
        }}
      >
        {projects &&
          projects.length !== 0 &&
          projects.map(
            (project, index) =>
              !project.error && (
                <div
                  className="swiper-slide"
                  onClick={() => handleOpen(project)}
                  key={index}
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
                        background: "gray",
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
                        {project.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            style={{
                              borderRadius: "10px",
                              background: lightMode
                                ? "#e3e3e3"
                                : "var(--dark-accent)",
                              color: !lightMode && "white",
                              padding: "2px 10px",
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>

      <ProjectModal open={open} handleClose={handleClose} details={details} />

      <style>
        {`
          .swiper-slide:hover{
             background: ${lightMode ? "#f5f5f5" : "var(--light-text)"};
          opacity:0.8;
          cursor:pointer;
          }

       .dropdown-item:hover{
       background:#f5f5f5;
       }


       .dropdown::-webkit-scrollbar {
  width: 2px;
}

.dropdown::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px; 

        `}
      </style>
    </section>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "70vh",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <CircularProgress />
    </div>
  );
}
