import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import github from "../utils/github.png";
import gmail from "../utils/gmail(1).png";

const Footer = () =>{

  const clickGmail = (e)=> {
    e.preventDefault()
    navigator.clipboard.writeText("miguelabeltranp@gmail.com")
    alert("Gmail copied in clipboard")
  }

  return (
    <footer className="main-footer">
      <div className="container">
          <div className="col">
            <ul className="list-unstyled">
              <p >Developed For Miguel Angel Beltran</p>
            </ul>
          </div>
          <div className="col">
            <div>
              <a className="a-contact" href="https://github.com/miguelbel00">
                <img className="img-contact" src={github} alt="github"></img>
                Github
              </a>
              &nbsp;&nbsp;&nbsp;
              <a className="a-contact" href="/" onClick={clickGmail}>
                <img className="img-contact" src={gmail} alt="github"></img>
                Gmail
              </a>
            </div>
          </div>
          <div className="col">
            <Link className="footer-about-me" to={"/pokemon/about"}>
              About Me
            </Link>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
