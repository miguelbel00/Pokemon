import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import "../styles/CreatePokemon.css";
import addType from "../utils/plusPokemon.png";

const CreatePokemon = () => {
  const dipatch = useDispatch();

  const typesState = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    health: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: ["Normal"],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(errors).length) {
      return alert("tienes errores, verifica");
    }
    dipatch(actions.createPokemon(input));

    return alert("creado");
  };

  useEffect(() => {
    let syncFilters = () => {
      input.types.map((e) => {
        let element = document.getElementById(e);
        element?.setAttribute("selected", "selected");
      });
    };
    syncFilters();
  }, [input]);

  const handleAddType = () => {
    let selected = document.getElementsByClassName("options-types");
    /* element?.setAttribute("selected", "selected");  */
    console.log(Object.entries (Object.values(selected)[0]));
  };


  return (
    <div className="container-create">
      <form onSubmit={handleSubmit} className="create-pokemon">
        <h3>New Pokemon</h3>
        <div className="pokemon-stats">
          <label>Name: </label>
          <input
            type="text"
            className={errors.name && "danger"}
            name="name"
            onChange={handleInputChange}
            value={input.name}
          />
          {errors.name && <p className="danger"> {errors.name} </p>}
        </div>
        <div className="pokemon-stats">
          <label>Health:</label>
          <input
            type="number"
            className={errors.health && "danger"}
            name="health"
            onChange={handleInputChange}
            value={input.health}
          />
          {errors.health !== "OK" && (
            <p className="danger"> {errors.health} </p>
          )}
        </div>
        <div className="pokemon-stats">
          <label>Attack: </label>
          <input
            type="number"
            className={errors.attack && "danger"}
            name="attack"
            onChange={handleInputChange}
            value={input.attack}
          />
          {errors.attack !== "OK" && (
            <p className="danger"> {errors.attack} </p>
          )}
        </div>
        <div className="pokemon-stats">
          <label>Defense: </label>
          <input
            type="number"
            className={errors.defense && "danger"}
            name="defense"
            onChange={handleInputChange}
            value={input.defense}
          />
          {errors.defense !== "OK" && (
            <p className="danger"> {errors.defense} </p>
          )}
        </div>
        <div className="pokemon-stats">
          <label>Speed: </label>
          <input
            type="number"
            className={errors.speed && "danger"}
            name="speed"
            onChange={handleInputChange}
            value={input.speed}
          />
          {errors.speed !== "OK" && <p className="danger"> {errors.speed} </p>}
        </div>

        <div className="pokemon-stats">
          <label>Height:</label>
          <input
            type="number"
            className={errors.height && "danger"}
            name="height"
            onChange={handleInputChange}
            value={input.height}
          />
          {errors.height !== "OK" && (
            <p className="danger"> {errors.height} </p>
          )}
        </div>

        <div className="pokemon-stats">
          <label>Weight:</label>
          <input
            type="number"
            className={errors.weight && "danger"}
            name="weight"
            onChange={handleInputChange}
            value={input.weight}
          />
          {errors.weight !== "OK" && (
            <p className="danger"> {errors.weight} </p>
          )}
        </div>

        <div className="pokemon-stats">
          <label>Types:</label>

          <select className="options-types" >
            {typesState?.map((t, i) => {
              return (
                <option value={t.name} key={i + 1}>
                  {t.name}
                </option>
              );
            })}
          </select>

          <img src={addType} alt="addType" onClick={handleAddType} />
          <div>
            {input.types.map((t, i) => {
              return (
                <p name={"type"} key={i + 1}>
                  {t}
                </p>
              );
            })}
          </div>

          {errors.types && <p className="danger"> {errors.types} </p>}
        </div>

        <div className="pokemon-stats">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

const validate = (input, target) => {
  let errors = {};

  if (!input.name) {
    errors.name = "name is required";
  } else if (!input?.name.match(/^[A-Za-z\s]*$/)) {
    errors.name = "Please check, name only should have letters";
  }

  errors.attack = !input.attack
    ? "Attack is required"
    : input.attack < 0 || input.attack > 200
    ? "Should be in range 0-200"
    : "OK";

  errors.health = !input.health
    ? "Health is required"
    : input.health < 0 || input.health > 200
    ? "Should be in range 0-200"
    : "OK";

  errors.defense = !input.defense
    ? "Defense is required"
    : input.defense < 0 || input.defense > 200
    ? "Should be in range 0-200"
    : "OK";

  errors.speed = !input.speed
    ? "Speed is required"
    : input.speed < 0 || input.speed > 200
    ? "Should be in range 0-200"
    : "OK";

  errors.height = !input.height
    ? "Height is required"
    : input.height < 0 || input.height > 200
    ? "Should be in range 0-200"
    : "OK";

  errors.weight = !input.weight
    ? "Defense is required"
    : input.weight < 0 || input.weight > 200
    ? "Should be in range 0-200"
    : "OK";

  if (!input.types) {
    errors.types = "tipos";
  }

  return errors;
};

export default CreatePokemon;
