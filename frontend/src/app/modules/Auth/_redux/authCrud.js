import axios from "axios";
import { setStorage, getStorage } from "../../../../_metronic/_helpers/LocalStorageHelpers"
import store from "../../../../redux/store"
import https from "https";
import { saveAs } from 'file-saver';

export const BASE_URL = "https://co-us.fev.com/vdc/management/";
export const LOGIN_URL = BASE_URL + "auth/login/";
export const LOGOUT_URL = BASE_URL + "auth/logout/";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const EXCEL_URL = "api/upload/"
export const CHECK_URL = BASE_URL + "auth/check/";
export function API_URL() {
  return BASE_URL + "api/interface/"
};

export const ME_URL = "api/me";

const fs = require('graceful-fs');
fs.readFileSync = () => {
  console.log();
};
const httpsAgent = new https.Agent({ 
  host: LOGIN_URL,
   });

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export function login(username, password) {
  const credentials = btoa(`${username}:${password}`);
    return axios({
      method: 'post',
      url: LOGIN_URL,
    httpsAgent: new https.Agent({ 
      keepAlive: true,
       }),
    headers: 
      {'Authorization': `Basic ${credentials}`,
        // 'Session': Cookies.get('sessionid')
      },
  }

    ).then(function(response) {
      setStorage("AuthToken", JSON.stringify(response.data.token));
      setStorage("User", JSON.stringify(username));
    })
    .catch((response) => {
      console.log(response);
      console.log(response.code);
      console.log(response.message);
    });
}

export function logout(username) {
  return axios.post(LOGOUT_URL, 
    { username }, 
    {headers: {'Authorization': "Token " + JSON.parse(getStorage("AuthToken"))}},
    )
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function APICall(props) {
  console.log(props);
  var method = '';
  var url = '';
  var action = null;
  switch(props.call){

    case 'getVehicleDetails':
      method = 'get';
      url = String(API_URL()) + (props.id);
      action = (props, response) => {
        if (props.id === 0) {
          setStorage("fieldChoices", JSON.stringify(response.data.choices));
          return [JSON.stringify(response.data.data), JSON.stringify(response.data.archive), response.data.admin];
        } else{
          setStorage("viewRecords", JSON.stringify(response.data.data[0]));
          setStorage("fieldChoices", JSON.stringify(response.data.choices));
          return [JSON.stringify(response.data.data[0]), JSON.stringify(response.data.choices), response.data.admin];
        };
      }
      break;

    case 'submitRegistration':
      method = 'post';
      url = String(API_URL() + "0");
      action = (props, response) => {
        setStorage("Snackbar", "Submission was successful!");
        setStorage("Variant", "success");
		return response;
      }
      break;

    case 'submitExcel':
      method = 'post';
      url = EXCEL_URL;
      action = (props, response) => {
        return {props, response};
      }
      break;

    case 'editRecord':
      method = 'put';
      url = String(API_URL() + "0");
      action = (props, response) => {
        setStorage("Snackbar", "Changes applied!");
        setStorage("Variant", "success");
        return response;
      }
      break;

    case 'deleteRecord':
      method = 'delete';
      url = String(API_URL() + "0");
      action = (props, response) => {
        setStorage("Snackbar", "Record deleted!");
        setStorage("Variant", "success");
        return response;
      }
      break;

    case 'submissions':
      method = props.method;
      url = String(API_URL() + "subs/");
      action = (props, response) => {
        if (response.status == 200) {
          return [JSON.stringify(response.data.data), JSON.stringify(response.data.archive), JSON.stringify(response.data.choices)];
        } else {
          setStorage("Snackbar", "Status updated!");
          setStorage("Variant", "success");
          return;
        }
      }
      break;

    case 'getChangelog':
      method = 'get';
      url = String(API_URL()) + "changelog/";
      action = (props, response) => {
        return JSON.stringify(response.data.data);
      }
      break;

    case 'saveDraft':
      method = 'post';
      url = String(API_URL() + "draft/");
      action = (props, response) => {
        var filename = response.headers.filename;
        saveAs(response.data, filename);
      }
      break;

    case 'dataAdmin':
      method = props.method;
      url = String(API_URL()) + "data/";
      action = (props, response) => {
		  if (method === 'get') {
			  return [response.data.choices, response.data.filter];
		  }
		  else {
			  return response;
		  }
      }
      break;

	case 'activeCheck':
		method = 'get';
		url = String(CHECK_URL);
		action = (props, response) => {
			if (response.status == 204) {
				return true;
			}
			else {
				return false;
			}
		}
		break;
	
	case 'flowRate':
		method = 'post';
		url = String(API_URL + "flow_rate");
		action = (props, response) => {
			if (response.status == 204) {
				return response.data.length;
			}
			else {
				return false;
			}
		}
		break;
      
    default:
      method = '';
      url = '';
      action = {};
  }
  
  return axios({
    method: method,
    url: url,
    data: ((method !== 'get') ? props.data : []),
    headers: {'Authorization': "Token " + JSON.parse(getStorage("AuthToken")), 'User': JSON.parse(getStorage("User"))},
    responseType: ((props.call === 'saveDraft') ? 'blob' : 'json'),
  })
  .then(function (response) {
    console.log(response);
    return action(props, response);
  })
  .catch(function (error) {
    if (error.response.status == 401 && !getStorage("activeCheck")) {
	  setStorage("activeCheck", true);
      alert("Your session has expired. Please log in again.");
      window.location = "/vdc/management/logout";
    } else {
      console.log(error);
      if (error.response.headers.message){
        props.enqueueSnackbar(error.response.headers.message, {variant: 'error'});
      } else {
        props.enqueueSnackbar(String(error), {variant: 'error'});
      }
      return error;
    }
  });
};