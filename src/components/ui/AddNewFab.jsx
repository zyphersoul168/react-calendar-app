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
      className="bg-melon p-4 absolute bottom-3 right-3 rounded-full z-10 text-dark-lava"
    >
      <PlusIcon className="w-6 h-6" />
    </button>
  );
};
