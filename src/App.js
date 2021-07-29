import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEdisting, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = e => {
    e.preventDefault();
    if (!name) {
      // diplay alert
      showAlert(true, "Please Eneter Value", "danger");
    } else if (name && isEdisting) {
      // edit
    } else {
      // show Alert
      // create new item
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "Item Added Sucessfully", "success");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} turnOffAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="grocery"
            type="text"
          />
          <button type="submit" className="submit-btn">
            {isEdisting ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list && list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button onClick={() => setList([])} className="clear-btn">
            {" "}
            Clear Item
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
