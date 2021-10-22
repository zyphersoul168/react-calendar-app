import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-300 hover:bg-purple-400 p-4 absolute bottom-3 right-3 rounded-full z-10 text-gray-800 transition ease-in"
    >
      <PlusIcon className="w-6 h-6" />
    </button>
  );
};
