import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { CharacterDetails } from "./components/CharacterDetails";
function App() {
  const [character, setCharacter] = useState(null);

  /* const characterCopy = structuredClone(character); */

  const url = "https://ih-crud-api.herokuapp.com";
  useEffect(() => {
    axios
      .get(url + "/characters")
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const renderListOfCharacters = () => {
    if (character === null) {
      return <p>loading....</p>;
    } else {
      return character.map((char, index) => {
        return (
          <div key={index} className="character">
            Name: {char.name} <br />
            Weapon: {char.weapon} <br />
            <Link to={`/character/${char.id}`}>More Details</Link>
          </div>
        );
      });
    }
  };
  /*   let slicedArray = [];
  if (characterCopy) {
    slicedArray = characterCopy.slice(0, 10);
  } */

  return (
    <div className="App">
      <nav>
        <NavLink
          id="navlink"
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          id="navlink"
          to="/about"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          About
        </NavLink>
        <NavLink
          id="navlink"
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Contact
        </NavLink>
      </nav>
      {character === null ? (
        <h1>Loaing...</h1>
      ) : (
        <h1>Character Number: {character.length}</h1>
      )}

      <Routes>
        <Route path="/" element={renderListOfCharacters()} />
        <Route path="/about" element={<p>this is the about</p>} />
        <Route path="/contact" element={<p>this is the contact</p>} />
        <Route path="/character/:characterId" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
