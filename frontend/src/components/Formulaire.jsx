import React, { useState } from "react";
import FormInput from "./formInput/FormInput";
import axios from "axios";

const Formulaire = () => {
  const questions = {
    question1: "Quel est votre nom?",
    question2: "Quel est votre age?",
    question3: "Quel est votre animal preferer?",
  };

  const inputs = [
    {
      id: 1,
      name: "reponse1",
      type: "text",
      label: questions.question1,
      placeholder: "tapez votre réponse",
    },
    {
      id: 2,
      name: "reponse2",
      type: "text",
      label: questions.question2,
      placeholder: "tapez votre réponse",
    },
    {
      id: 3,
      name: "reponse3",
      type: "text",
      label: questions.question3,
      placeholder: "tapez votre réponse",
    },
    {
      id: 4,
      name: "nomFichier",
      type: "text",
      label: "Tapez le nom de fichier",
      placeholder: "Tapez ...",
    },
  ];

  const [reponses, setReponses] = useState({
    reponse1: "",
    reponse2: "",
    reponse3: "",
    nomFichier: "",
  });

  const onChange = (e) => {
    setReponses({ ...reponses, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.dir("reponse:", reponses);
    const formData = new FormData();
    formData.append("nomFichier", reponses.nomFichier);
    formData.append("question1", questions.question1);
    formData.append("reponse1", reponses.reponse1);
    formData.append("question2", questions.question2);
    formData.append("reponse2", reponses.reponse2);
    formData.append("question3", questions.question3);
    formData.append("reponse3", reponses.reponse3);

    // for (var value of formData.values()) {
    //   console.log(value);
    // }

    axios
      .post("http://127.0.0.1:8000/submitForm", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Questions</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={reponses[input.name]}
          onChange={onChange}
        />
      ))}

      <button>Soumettre</button>
    </form>
  );
};

export default Formulaire;
