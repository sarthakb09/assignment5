import React, { useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import axios from "axios";

function App() {
  const [videoFiles, setVideoFiles] = useState([]);
  const [jsonFiles, setJsonFiles] = useState([]);
  const [videoFileNames, setVideoFileNames] = useState([]);
  const [jsonFileNames, setJsonFileNames] = useState([]);
  const [message, setMessage] = useState("");

  const handleVideoUpload = (event) => {
    setVideoFiles(event.target.files);
    let fileNames = [];
    for (let i = 0; i < event.target.files.length; i++) {
      fileNames.push(event.target.files[i].name);
    }
    setVideoFileNames(fileNames);
  };

  const handleJsonUpload = (event) => {
    setJsonFiles(event.target.files);
    let fileNames = [];
    for (let i = 0; i < event.target.files.length; i++) {
      fileNames.push(event.target.files[i].name);
    }
    setJsonFileNames(fileNames);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < videoFiles.length; i++) {
      formData.append("videos", videoFiles[i]);
    }
    for (let i = 0; i < jsonFiles.length; i++) {
      formData.append("json", jsonFiles[i]);
    }
    try {
      await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessage("Upload successful!");
    } catch (error) {
      console.log(error);
      setMessage("Upload failed.");
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Upload Videos and JSON Objects</h2>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              id="videos"
              name="videos"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
            />
            <label htmlFor="videos">
              <Button variant="contained" component="span">
                Upload Videos
              </Button>
            </label>
            {videoFileNames.length > 0 && (
              <div>
                <h4>Selected videos:</h4>
                <ul>
                  {videoFileNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              type="file"
              id="json"
              name="json"
              multiple
              accept=".json"
              onChange={handleJsonUpload}
            />
            <label htmlFor="json">
              <Button variant="contained" component="span">
                Upload JSON Objects
              </Button>
            </label>
            {jsonFileNames.length > 0 && (
              <div>
                <h4>Selected JSON objects:</h4>
                <ul>
                  {jsonFileNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          {message && (
            <div>
              <h3>{message}</h3>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
