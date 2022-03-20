import axios from "axios";
import React, { useState } from "react";
import "./formInput/formInput.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Affichage = () => {
  const [file, setFile] = useState("");
  const [markdowns, setMarkdowns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fichier", file);
    axios
      .post("http://127.0.0.1:8000/submit/", formData)
      .then((res) => setMarkdowns(res.data));
  };

  console.log("file", file);
  console.log("result", markdowns);

  return (
    <div
      className="formInput"
      style={{ width: 8000 }}
      encType="multipart/form-data"
    >
      <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Afficher votre donnée ici</h1>
        <input
          id="1"
          type="file"
          name="fichier"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>Soumettre</button>
      </form>
      <div className="markdown">
        <ReactMarkdown remarkPlugins={[gfm]}>{markdowns}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Affichage;
