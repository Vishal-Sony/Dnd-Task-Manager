import { Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { DataContext } from "../../DataContext";


const TaskModal = ({
  modalVisible,
  setModalVisible,
  name,
  color,
  operation,
  category,
}) => {
  //Get data from context API
  const [data, setData] = useContext(DataContext);
  const [selectedColor, setSelectedColor] = useState(color);
  const [taskName, setTaskName] = useState(name);

  
  //when submit is clicked this runs
  const submitData = (event) => {
    event.preventDefault();

    //if we are adding the board
    if (operation === "add") {
      const newData = { ...data };
      const id = Math.floor(Math.random() * 100).toString();
      const newTask = {
        name: { taskName }.taskName,
        color: { selectedColor }.selectedColor,
        id: id,
      };
      const targetColumn = Object.values(newData.columns).find(
        (column) => column.title === category
      );
      targetColumn.taskIds = [...targetColumn.taskIds, id];

      newData.tasks = [...newData.tasks, newTask];

      
      setData(newData);
      console.log(category);
    }
    //if we are editing a board
    else {
      const newData = { ...data };  

  // Find the task with the given taskId
  const taskToEdit = newData.tasks.find(task => task.name === name);

  // If the task is found, update its name and color
  if (taskToEdit) {
    taskToEdit.name = taskName;
    taskToEdit.color = selectedColor;
  }

  // Set the updated state
  setData(newData);
    }

    //setting states to empty
    setSelectedColor(null);
    setTaskName("");
    setModalVisible(false);
  };

  const colorOptions = [
    { hexCode: "#A7F0F9" },
    { hexCode: "#FFEDC1" },
    { hexCode: "#FFAEC0" },
    { hexCode: "#C5C5FC" },
  ];

  //onchange function textField of name
  const nameChange = (event) => {
    setTaskName(event.target.value);
  };

  return (
    <Modal
      show={modalVisible}
      onHide={() => {
        setModalVisible(false);
      }}
      centered
    >
      <Modal.Body>
        {/* heading of modal */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h4>Add your Task</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setModalVisible(false);
            }}
          ></button>
        </div>
        {/* form of modal */}
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <input
              placeholder="Type name"
              type="text"
              id="place"
              className="form-control-lg form-control"
              name="place"
              value={taskName}
              onChange={nameChange}
            />
          </div>
          <h4>Select post color:</h4>
          <p>Here are some templates to help you get started</p>
          <div className="color-options" style={{ display: "flex" }}>
            {colorOptions.map((option) => (
              <div
                key={option.hexCode}
                className={`color-option ${
                  option.hexCode === selectedColor ? "selected" : ""
                }`}
                style={{
                  backgroundColor: option.hexCode,
                  width: "1.5rem",
                  cursor: "pointer",
                  height: "1.5rem",
                  borderRadius: "50%",
                  margin: "0 10px",
                  border:
                    option.hexCode === selectedColor
                      ? "2px solid blue"
                      : "none",
                }}
                onClick={() => setSelectedColor(option.hexCode)}
              ></div>
            ))}
          </div>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn"
              style={{ backgroundColor: "#D33852", color: "white" }}
              onClick={submitData}
            >
              {operation === "add" ? "Create Task" : "Update Task"}
            </button>
          </div>
        </div>
        {/* end of form */}
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
