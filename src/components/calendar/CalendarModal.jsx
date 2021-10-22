import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { SaveIcon, TrashIcon, BackspaceIcon } from "@heroicons/react/outline";
import moment from "moment";

import { uiCloseModal } from "../../actions/ui";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/events";
import { DeleteEventBtn } from "../ui/DeleteEventBtn";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
  },
};

if(process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initialEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  const [, setStartDate] = useState(now.toDate());
  const [, setEndDate] = useState(nowPlusOne.toDate());
  const [dateValid, setDateValid] = useState(true);
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initialEvent);

  const { title, notes, start, end } = formValues;

  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initialEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initialEvent);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event);
    setFormValues({
      ...formValues,
      start: event,
    });
  };

  const handleEndDateChange = (event) => {
    setEndDate(event);
    setFormValues({
      ...formValues,
      end: event,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const momentStartDate = moment(start);
    const momentEndDate = moment(end);

    if (momentStartDate.isSameOrAfter(momentEndDate)) {
      // return Swal.fire("Error", "End date must be greater than start date", "error");
      return setDateValid(false);
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    
    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setDateValid(true);
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal bg-gray-800 rounded-md text-gray-50 inline w-3/12y outline-none p-6 space-y-4"
      overlayClassName="bg-dark-lava bg-opacity-50 bottom-0 left-0 right-0 top-0 fixed"
      ariaHideApp={!process.env.NODE_ENV === "test"}
    >
      <h1 className="font-abril text-5xl">
        {activeEvent ? (
          activeEvent.title
        ) : (
          <span>
            New <span className="text-indigo-400">Event</span>
          </span>
        )}
      </h1>
      <hr className="h-0.5 bg-opacity-50" />
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label>Date and hour starting</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            className="bg-gray-700 block w-full p-1.5 rounded-md"
            calendarIcon={<TrashIcon className="w-5 h-5" />}
            clearIcon={<BackspaceIcon className="w-5 h-5" />}
          />
        </div>

        <div className="space-y-1">
          <label>Date and hour ending</label>
          {!dateValid && (
            <span className="date-error block text-red-400">
              Error: End date must be greater than start date
            </span>
          )}
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            minDate={start}
            className="bg-gray-700 block w-full p-1.5 rounded-md"
            calendarIcon={<TrashIcon className="w-5 h-5" />}
            clearIcon={<BackspaceIcon className="w-5 h-5" />}
          />
        </div>
        <hr className="h-0.5 bg-opacity-50" />
        <div className="space-y-1">
          <label>Title and notes</label>
          {!titleValid && (
            <span className="error-span block text-red-400">Error: Title too short</span>
          )}
          <input
            type="text"
            className="bg-gray-700 block w-full p-1.5 rounded-md focus:outline-none"
            placeholder="Event title"
            name="title"
            autoComplete="off"
            onChange={handleInputChange}
            value={title}
          />
        </div>

        <div>
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
          <div className="form-group">
            <textarea
              type="text"
              className="bg-gray-700 block w-full p-1.5 rounded-md focus:outline-none"
              placeholder="Notes"
              rows="5"
              name="notes"
              onChange={handleInputChange}
              value={notes}
            ></textarea>
          </div>
          <small id="emailHelp" className="form-text text-muted">
            Aditional info
          </small>
        </div>

        <button
          type="submit"
          className="hover:bg-green-600 bg-green-400 p-2.5 font-bold rounded-md text-alabaster flex justify-center w-full transition ease-in"
        >
          <SaveIcon className="mt-1 mr-1 h-5 w-5" />
          <span>Save</span>
        </button>
        {activeEvent && <DeleteEventBtn />}
      </form>
    </Modal>
  );
};
