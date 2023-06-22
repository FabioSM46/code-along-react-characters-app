import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export const CharacterDetails = () => {
  const url = "https://ih-crud-api.herokuapp.com";
  const { characterId } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${url}/characters/${characterId}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <div className="CharacterDetails">
      <h1>{details.name}</h1>
      Occupation: {details.occupation} <br />
      Weapon: {details.weapon} <br />
      Debt: {details.debt ? "Yes" : "No"} <br />
    </div>
  );
};
