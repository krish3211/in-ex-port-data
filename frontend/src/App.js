import React, { useState } from "react";
import CsvDownloadButton from 'react-json-to-csv'

function App() {
  const [File, setFile] = useState();
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlecsv = async () => {
    const formData = new FormData();
    formData.append("csvFile", File);

    await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  };
  return (
    <div className="App">
      <input
        type="file"
        className="form-control"
        id="csv_file"
        name="csvFile"
        onChange={handleFileUpload}
      />
      <button type="submit" onClick={handlecsv}>
        Upload
      </button>

      {data && <CsvDownloadButton delimiter="," filename="export.csv" data={data} />}
    </div>
  );
}

export default App;
