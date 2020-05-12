import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input onChange={props.handleInputChange} value={props.value} name={props.name} type="text" id="searchInput" placeholder="Book Search" />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success" type="button">
      {props.children}
    </button>
  );
}
