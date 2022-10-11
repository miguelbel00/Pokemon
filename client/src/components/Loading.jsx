 import React from "react";
 import picaLoading from "../utils/picaLoading.gif";

 const Loading  =() => {
    return (
        <div>
          <img src={picaLoading} alt="Loading Pokemons" />
          <h1>LOADING ........</h1>
        </div>
      );
 }

 export default Loading;