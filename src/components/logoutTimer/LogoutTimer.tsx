import { useEffect, useState, useRef } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logOut } from "../../redux/user/userSlice";
import { AppState } from "../../redux/store";
import ModalText from "../modals/modalText";

const LogoutTimer = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const isLoggedIn = useAppSelector(
    (state: AppState) => state.userSlice.isLoggedIn
  );
  const expiresTokenTime = 60 * 60 * 1000;

  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleLogout = () => {
      dispatch(logOut());
      setOpenModal(true);
    };

    const setLogoutTimeout = () => {
      return setTimeout(() => {
        handleLogout();
      }, expiresTokenTime);
    };

    if (isLoggedIn) {
      logoutTimeoutRef.current = setLogoutTimeout();
    }

    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, [dispatch, isLoggedIn, expiresTokenTime]);

  return (
    <ModalText
      text="Your session is over. Please log in again."
      openModal={openModal}
      handleCloseModal={() => setOpenModal(false)}
    />
  );
};

export default LogoutTimer;
