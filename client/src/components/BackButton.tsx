import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowAltCircleLeft} from "react-icons/fa"

type ButtonUrl = {
  url: string
}

function BackButton({url}: ButtonUrl) {
  return (
    <Link to={url} className="btn-back">
      <FaArrowAltCircleLeft /> Back
    </Link>
  )
}

export default BackButton
