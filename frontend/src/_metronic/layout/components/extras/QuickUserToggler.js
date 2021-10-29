/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
// import {OverlayTrigger, Tooltip} from "react-bootstrap";
// import {useSelector} from "react-redux";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
// import {UserProfileDropdown} from "./dropdowns/UserProfileDropdown";
import { getStorage } from "../../../_helpers/LocalStorageHelpers"
import {Popover} from "@material-ui/core"

export function QuickUserToggler() {
  // const {user} = useSelector(state => state.auth);
  const user = JSON.parse(getStorage("User"));
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    window.location = "/vdc/management/logout";
  };


  return (<>
        {layoutProps.offcanvas && (<>
            <div className="topbar-item" onClick={handleClick}>
              <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
                  id="kt_quick_user_toggle">
                  <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                  <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                    {user}
                  </span>
                  <span className="symbol symbol-35 symbol-light-success">                
                      <span className="symbol-label font-size-h5 font-weight-bold">
                        {user ? (
                          user[0].toUpperCase()
                        ) : (
                          "?"
                        )}
                      </span>
                  </span>
              </div>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'center',
                }}
              >
            <button className="btn btn-light-primary btn-bold" onClick={logoutClick}>Sign out</button>
            </Popover>
        </>)}

        {/* {!layoutProps.offcanvas && (<UserProfileDropdown/>)} */}
      </>
  );
}
