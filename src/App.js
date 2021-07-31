import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(
    (localStorage.getItem("list") &&
      JSON.parse(localStorage.getItem("list"))) ||
      []
  );
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
      setList(
        list.map(item => {
          if (item.id === editID) {
            item.title = name;
          }
          return item;
        })
      );
      setEditID(null);
      setIsEditing(false);
      setName("");
      showAlert(true, "Value Change Sucessfully", "success");
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

  const removeItem = id => {
    showAlert(true, "Item Removed", "danger");
    setList(list.filter(item => item.id !== id));
  };

  const editItem = (id, title) => {
    setEditID(id);
    setIsEditing(true);
    setName(title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert list={list} {...alert} turnOffAlert={showAlert} />
        )}
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
          <List editItem={editItem} removeItem={removeItem} items={list} />
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
