import { actionTypes } from "./actionTypes";
import { AsyncStorage } from "react-native";
import axios from "axios";
import jwt from "jwt-decode";

export const setCurrentUser = (data) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: data,
  };
};


// Thunk action, calling Auth0 API to requset 6-digit OTP code.
export const requestOTP = (number) => {
  var options = {
    method: "POST",
    url: "https://dev--idxzr33.us.auth0.com/passwordless/start",
    headers: {
      "content-type": "application/json",
    },
    data: {
      client_id: "s03BJmMo6nZkhRQuzZsgh2D4iE6iARM6",
      connection: "sms",
      phone_number: number,
      send: "code",
    },
  };

  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNIN_REQUEST_OTP,
    });

    axios.request(options).then((response) => {
      if (response.error) {
        return dispatch({
          type: "SIGNIN_FAILED",
          payload: responseJSON.error_description || "Some auth error",
        });
      }

      return dispatch({
        type: actionTypes.SIGNIN_SENT_OTP,
      });
    });
  };
};

// Thunk action, calling Auth0 api with OTP code from user input as argument.
// If OTP is correct, api should return access_token.
export const userLogin = (data) => {
  var options = {
    method: "POST",
    url: "https://dev--idxzr33.us.auth0.com/oauth/token",
    headers: {
      "content-type": "application/json",
    },
    data: {
      grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
      client_id: "s03BJmMo6nZkhRQuzZsgh2D4iE6iARM6",
      username: data.phone_number,
      otp: data.otp,
      realm: "sms",
      audience: "test-api",
      scope: "offline_access",
    },
  };

  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNIN_PROCESSING,
    });

    axios.request(options).then((authAPIresponse) => {
      if (authAPIresponse.data.error)
        return dispatch({
          type: "SIGNIN_FAILED",
          payload: authAPIresponse.data.error_description || "Some auth error",
        });

      AsyncStorage.setItem(
        "refresh_token",
        authAPIresponse.data.refresh_token.toString()
      );

      AsyncStorage.setItem(
        "access_token",
        authAPIresponse.data.access_token.toString()
      );

      return dispatch({
        type: actionTypes.SIGNIN_SUCCESS,
        payload: {
          access_token: authAPIresponse.data.access_token,
        },
      });
    });
  };
};

export const checkToken = () => {
  return (dispatch) => {
    AsyncStorage.getItem("access_token").then((access_token) => {
      // no token in memory
      if (!access_token)
        return dispatch({
          type: actionTypes.CHECK_NO_TOKEN,
        });

      let exp = jwt(access_token).exp;
      // token is not about to expire, log in now.
      if (exp * 1000 - Date.now() > 30000) {
  
        return dispatch({
          type: actionTypes.CHECK_SET_STORED_TOKEN,
          payload: {
            access_token: access_token,
          },
        });
      }

     
      AsyncStorage.getItem("refresh_token").then((refreshToken) => {
       
        var options = {
          method: "POST",
          url: "https://dev--idxzr33.us.auth0.com/oauth/token",
          headers: {
            "content-type": "application/json",
          },
          data: {
            grant_type: "refresh_token",
            client_id: "s03BJmMo6nZkhRQuzZsgh2D4iE6iARM6",
            refresh_token: refreshToken,
            scope: "offline_access",
          },
        };

        axios
          .request(options)
          .then((authAPIresponse) => {
            if (authAPIresponse.data.error)
              return dispatch({
                type: actionTypes.CHECK_FAILED,
                payload:
                  authAPIresponse.data.error_description || "Some auth error",
              });

            AsyncStorage.setItem(
              "access_token",
              authAPIresponse.data.access_token.toString()
            );

            return dispatch({
              type: actionTypes.CHECK_RENEW_TOKEN,
              payload: authAPIresponse.data.access_token,
            });
          })
          .catch((error) => {
            return dispatch({
              type: actionTypes.CHECK_FAILED,
              payload: "Failed to send auth API token renew query.",
            });
          });
      })
      .catch(error => {
        AsyncStorage.clear();
        return dispatch({
          type: actionTypes.CHECK_FAILED,
          payload: "Ambigious async storage data.",
        });
      })
    }).catch(error => {
      AsyncStorage.clear();
        return dispatch({
          type: actionTypes.CHECK_FAILED,
          payload: "Async storage access function failed.",
        });
    })
  };
};

export const userLogout = () => {
  return (dispatch) => {
    AsyncStorage.clear();
    return dispatch({
      type: actionTypes.LOG_OUT,
    });
  };
};
