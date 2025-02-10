import React from 'react'
import { AiFillFacebook,  AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer>
            <div>
            <AiFillFacebook/><AiFillLinkedin /><AiFillInstagram /><AiFillYoutube /><AiFillLinkedin />
            </div>
          <div>
            <Link to="/">
              About
            </Link>
            <br/>
            <Link
              to="/"
            >
              Privacy Policy
            </Link>
            <br/>
            <Link
              to="/"
            >
              Contact
            </Link>
          </div>
          <p>© 2025 Mech2U. All rights reserved.</p>
        </footer>
  )
}

export default Footer