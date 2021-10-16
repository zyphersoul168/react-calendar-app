import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (event) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (event) => {
    dispatch(eventSetActive(event));
  };

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  // const onSelectSlot = (event) => {
  //   dispatch(eventClearActive());

  //   if (event.action === "doubleClick") {
  //     dispatch(uiOpenModal());
  //     dispatch(
  //       eventSetActive({
  //         id: new Date().getDate(),
  //         title: "",
  //         start: event.start,
  //         end: event.end,
  //         bgcolor: "#212121",
  //         notes: "",
  //         user: {
  //           _id: "123",
  //           name: "aaron",
  //         },
  //       })
  //     );
  //   }
  // };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#e0afa0" : "#463f3a",
      borderWidth: 0,
      color: "#f4f3ee",
      display: "block",
    };

    return {
      style,
    };
  };

  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <AddNewFab />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "92vh" }}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          // onSelectSlot={onSelectSlot}
          // selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
      </div>
      <CalendarModal />
    </div>
  );
};
