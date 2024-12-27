import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultToastProps = {
  autoClose: 5000,
  hideProgressBar: true,
  position: toast.POSITION.TOP_RIGHT,
  closeButton: true,
  pauseOnHover: true,
  draggable: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  transition: Slide,
  style: { color: "black" },
};

export const Toast = (type, message, options = {}) => {
  const toastTypes = {
    success: toast.success,
    info: toast.info,
    warn: toast.warn,
    error: toast.error,
  };

  const showToastFunction = toastTypes[type] || toast;
  showToastFunction(message, { ...defaultToastProps, ...options });
};
