import { useState } from "react";
import Checkbox from "./Checkbox";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import { useEffect } from "react";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if tasks is not null before setting isChecked
    if (task && task.isCompleted !== undefined) {
      setIsChecked(task.isCompleted);
    }
  }, [task]);

  const handleCheckboxChange = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...task,
            isCompleted: !isChecked,
            progress: !isChecked ? 100 : 50,
          }),
        }
      );
      setIsChecked(!isChecked);
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <p
          className="task-title"
          style={{
            textDecoration: isChecked ? "line-through" : "none",
          }}
        >
          {task.title}
        </p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
