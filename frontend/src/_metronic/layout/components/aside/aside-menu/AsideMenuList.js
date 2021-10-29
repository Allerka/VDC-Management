/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import {APICall} from "../../../../../app/modules/Auth/_redux/authCrud"

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
        ? " menu-item-active menu-item-open "
        : "";
  };
  
  var props = {};
  const [ admin, setAdmin ] = useState(false);
  props.call = 'activeCheck';
  APICall(props)
  .then(response => {
	  setAdmin(response);
  });
  
  return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
              className={`menu-item ${getMenuItemActive("/dashboard")}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
		  {admin && (
			<li
              className={`menu-item ${getMenuItemActive("/data_admin")}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/data_admin">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Terminal.svg")}/>
            </span>
              <span className="menu-text">Database Administration</span>
            </NavLink>
          </li>
		  )}
          <li
              className={`menu-item ${getMenuItemActive("/changelog")}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/changelog">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Option.svg")}/>
            </span>
              <span className="menu-text">View Changelog</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}
          {/* <li> */}
            {/* Vehicle Registration Page only */}
            {(window.location.pathname === "/vdc/management/registration" || window.location.pathname === "/vdc/management/registration/") && (
              <>
          <li
              className={`menu-item ${getMenuItemActive("/upload")}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/upload">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Files/Upload.svg")}/>
            </span>
              <span className="menu-text">Upload Excel Form</span>
            </NavLink>
            </li>
            </>
            )}
          {/* </li> */}
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
