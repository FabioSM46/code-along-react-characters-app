import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { CharacterDetails } from "./components/CharacterDetails";
import { Create } from "./components/Create";
function App() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    getCharactersFromApi();
  }, []);

  const getCharactersFromApi = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/characters")
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
          to="/create"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Create
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
        <Route path="/create" element={<Create />} />
        <Route path="/about" element={<p>this is the about</p>} />
        <Route path="/contact" element={<p>this is the contact</p>} />
        <Route
          path="/character/:characterId"
          element={<CharacterDetails />}
          callback={getCharactersFromApi}
        />
      </Routes>
    </div>
  );
}

export default App;
