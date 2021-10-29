import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session/";
import { put, takeLatest } from "redux-saga/effects";
// import { getUserByToken } from "./authCrud";
import {getStorage, setStorage, removeStorage} from "../../../../_metronic/_helpers/LocalStorageHelpers"

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  // Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  AuthToken: getStorage("AuthToken"),
  isAuthenticated: null,
  username: null,
};

export const reducer = persistReducer(
  { storage: sessionStorage, key: "AuthKey", whitelist: ["username", "AuthToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {

      case actionTypes.Login: {
        const { AuthToken } = getStorage("AuthToken");
        return {...state, AuthToken, isAuthenticated: true, user: getStorage("User") };
      }

      // case actionTypes.Register: {
      //   const { AuthToken } = action.payload.AuthToken;

      //   return { AuthToken, user: action.user };
      // }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        removeStorage("AuthToken");
        return {...state, AuthToken: null, user: null, isAuthenticated: false };
      }

      case actionTypes.UserLoaded: {
        // const { user } = getStorage("User");
        // console.log({user});
        // setStorage("AuthToken", JSON.stringify(action.payload.AuthToken));
        return { ...state, isAuthenticated: true, user: getStorage("User") };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: AuthToken => ({ type: actionTypes.Login, payload: { AuthToken } }),
  register: AuthToken => ({
    type: actionTypes.Register,
    payload: { AuthToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: username => ({ type: actionTypes.UserRequested, payload: { username } }),
  fulfillUser: username => ({ type: actionTypes.UserLoaded, payload: { username } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    // const { data: username } = yield getUserByToken();
    const { data: username } = yield getStorage("User");

    yield put(actions.fulfillUser(username));
  });
}
