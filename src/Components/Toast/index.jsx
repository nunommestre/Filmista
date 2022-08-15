import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const CustomNotification = (title, error) => {
  return (
    <div>
      <p>
        <strong>{title}</strong>
      </p>
      <p>{error}</p>
    </div>
  );
};

export const ToastAlert = (message, type) => {
  if (type == "success") {
    toast.success(CustomNotification("Success!", message), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      transition: Bounce,
      theme: "colored",
    });
  } else if (type == "error") {
    toast.error(CustomNotification("Error!", message), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      transition: Bounce,
      theme: "colored",
    });
  } else if (type == "info") {
    toast.info(CustomNotification("Attention!", message), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      transition: Bounce,
      theme: "colored",
    });
  } else if (type == "warning") {
    toast.warning(CustomNotification("Don't worry!", message), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      transition: Bounce,
      theme: "colored",
    });
  }
};