import axios from "axios";

export const fetchProjects = async (setProjects) => {
  try {
    const response = await axios.get(`https://portfolio-backend-2-83yv.onrender.com/fetch-repos`);
    // const response = await axios.get(`http://localhost:8080/fetch-repos`);
    setProjects(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPrevProjects = async (setPrevProjects) => {
  try {
      let res = await fetch("https://portfolio-backend-2-83yv.onrender.com/prev-data");
    // let res = await fetch("http://localhost:8080/prev-data");
    let data = await res.json();
    setPrevProjects(data);
  } catch (error) {
    console.log(error);
  }
};
