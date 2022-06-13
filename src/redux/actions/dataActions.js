import { actionTypes } from "./actionTypes";
import { userLogout } from "./userActions";

import axios from "axios";

export const fetchUserData = () => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_PROCESSING });
    axios
      .get("https://loyalty-app-bk.herokuapp.com/authorized", {
        headers: {
          Authorization: `Bearer ${getState().user.access_token}`,
        },
      })
      .then((userAPIresponse) => {
        if (userAPIresponse.data.username)
          return dispatch({
            type: actionTypes.FETCH_SUCCESS,
            payload: {
              username: userAPIresponse.data.username,
              points: userAPIresponse.data.points,
              orders: userAPIresponse.data.orders,
            },
          });
      })
      .catch((error) => {
        dispatch(userLogout());
      });
  };
};