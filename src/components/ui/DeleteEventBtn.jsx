import React from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";
import { uiCloseModal } from "../../actions/ui";

export const DeleteEventBtn = () => {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(eventStartDelete());
    dispatch(uiCloseModal())
  };
  
  return (
    <button onClick={handleDelete} className="bg-red-400 hover:bg-red-500 p-2.5 font-bold rounded-md text-gray-50 flex justify-center w-full transition ease-in">
      <TrashIcon className="mt-0.5 mr-1 w-6 h-6" />
      <span>Delete</span>
    </button>
  );
};
