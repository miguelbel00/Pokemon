import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
  <>
    <Link to="/">Home</Link>
    <br />
    <Link to="/pokemon/create">Create Pokemon</Link>
  </>
  )
};

export default Nav;
