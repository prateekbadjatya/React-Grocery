import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-lise">
      {items.map(({ id, title }) => {
        return (
          <article className="grocery-item" key={id}>
            <p className="title"> {title}</p>
            <div className="btn-container">
              <button
                onClick={() => editItem(id, title)}
                type="button"
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeItem(id)}
                type="button"
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
