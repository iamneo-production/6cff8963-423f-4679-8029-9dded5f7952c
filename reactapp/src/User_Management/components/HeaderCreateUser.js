import React from "react"
import "../components_styles/header.css"
import {Link} from "react-router-dom";

export default function HeaderListUser(){
    return(
        <div className="header">

            <ul className="sections">
                <li>
                    <Link to="/users" style={{ textDecoration: 'none'}}>Show All Users</Link>
                </li>
            </ul>
        </div>
    )
}