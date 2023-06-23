import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export const CharacterDetails = (props) => {
  const { characterId } = useParams();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const deleteCharacter = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
      .then((response) => {
        props.callback();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="CharacterDetails">
      <h1>{details.name}</h1>
      Occupation: {details.occupation} <br />
      Weapon: {details.weapon} <br />
      Debt: {details.debt ? "Yes" : "No"} <br />
      <p>
        <Link onClick={deleteCharacter}>Delete</Link>
      </p>
      <p>
        <Link to={-1}>Back</Link>
      </p>
    </div>
  );
};
