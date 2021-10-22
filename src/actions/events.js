import Swal from "sweetalert2";
import { types } from "../actionTypes/types";
import { fetchWithToken } from "../helpers/fetch";
import { parseEvents } from "../helpers/parseEvents";

// async actions
export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchWithToken("events", event, "POST");
      const body = await resp.json();

      if (body.ok) {
        event._id = body.event._id;
        event.user = {
          _id: uid,
          name: name,
        };
        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("events");
      const body = await resp.json();
      const events = parseEvents(body.events);
      dispatch(eventLoad(events));
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventStartUpdate = (event) => {
  return async(dispatch) => {
    try {
      const resp =  await fetchWithToken(`events/${event._id}`, event, "PUT");
      const body = await resp.json();

      if(body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { _id } = getState().calendar.activeEvent;

    try {
      const resp =  await fetchWithToken(`events/${_id}`, {}, "DELETE");
      const body = await resp.json();

      if(body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// sync actions
export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventLoad = (events) => ({
  type: types.eventLoad,
  payload: events,
}) 

export const eventLogout = () => ({
  type: types.eventLogout,
});
