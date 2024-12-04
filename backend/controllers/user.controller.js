const {
  fetchRepoDetails,
  fetchReadmeImage,
  fetchRepoNames,
} = require("../services/repo.service");
const fs = require("fs");
const path = require("path");

exports.fetchRepo = async (req, res) => {
  const repoNames = (await fetchRepoNames()) || [];
  const repoDetails = [];

  for (const repoName of repoNames) {
    const details = await fetchRepoDetails(repoName);
    if (details && details.gitURL) {
      const { imageURL, title, description } = await fetchReadmeImage(repoName);
      const dummy_title = "Dummy Title";
      const dummy_img =
        "https://fastly.picsum.photos/id/423/300/200.jpg?blur=5&hmac=J0Qswu3j9HsHOvXZ5Pm9HZ3abPOhhZ74EBE8mb_T2Gk";
      const dummy_desc = "Dummy description";

      repoDetails.push({
        ...details,
        title: title || dummy_title,
        imageURL: imageURL || dummy_img,
        description: description || dummy_desc,
      });
    } else {
      repoDetails.push({
        repoName,
        error: "Unable to fetch details or URL does not exist.",
      });
    }
  }

  const githubPrevDataFilePath = path.join(
    __dirname,
    "../db/githubPreviousData.json"
  );
  try {
    await fs.promises.writeFile(
      githubPrevDataFilePath,
      JSON.stringify(repoDetails, null, 2)
    );
    console.log("Data written to file successfully");
  } catch (error) {
    console.error("Error writing to file:", error);
  }

  res.json(repoDetails);
};

exports.fetchPrevData = async (req, res) => {
  res.json(require("../db/githubPreviousData.json"));
};
