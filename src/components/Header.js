import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, showForm } from "../reducers/factFormSlice";

const Header = () => {
  const isFormVisible = useSelector(showForm);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Today i learned" />
        <h1>Today i learned</h1>
      </div>
      <button className="btn btn-large" onClick={() => dispatch(toggle())}>
        {isFormVisible ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

export default Header;
