/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
// import SVG from "react-inlinesvg";
import { checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/registration')}`}>
                <NavLink className="menu-link" to="/registration">
                    <span className="menu-text">Vehicle Registration</span>
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*begin::1 Level*/}
            <li
                className={`menu-item menu-item-rel ${getMenuItemActive('/submissions')}`}>
                <NavLink className="menu-link" to="/submissions">
                    <span className="menu-text">Submission Management</span>
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*begin::1 Level*/}
            <li
                className={`menu-item menu-item-rel ${getMenuItemActive('/test_registration')}`}>
                <NavLink className="menu-link" to="/test_registration">
                    <span className="menu-text">Test Registration</span>
                </NavLink>
            </li>

            {/*begin::1 Level*/}
            {/* <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/custom')}`}>
                <NavLink className="menu-link menu-toggle" to="/custom">
                    <span className="menu-text">Custom</span>
                    <i className="menu-arrow"></i>
                </NavLink>
            </li> */}
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
