import React, { useState, useRef, useEffect}  from "react"
import { useParams, Link, useLocation, useSearchParams, useNavigate, useMatch } from "react-router-dom"


const Result = (props) => {

  console.log(props.result)

  return(
    <div className="f-24">{props.result}</div>
  )

}
export default Result