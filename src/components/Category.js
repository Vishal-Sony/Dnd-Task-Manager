import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { DataContext } from "../DataContext";
import { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import TaskModal from "./modals/TaskModal";


export default function Category({ name,}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useContext(DataContext);
  const [tasks,setTasks] = useState([])

  useEffect(() => {
    // Ensure the column with the provided name exists
    if (data.columns[name]) {
      const columnTaskIds = data.columns[name].taskIds;

      const finalTasks = columnTaskIds.map(taskId => {
        // Find the task with the current taskId
        const task = data.tasks.find(task => task.id === taskId);
    
        // Return the task object
        return task;
      });
      setTasks(finalTasks)
    }
    
}, [data, name]);


  return (
    <>
    <div
      style={{
        border: "solid",
        padding: "20px",
        borderWidth: "1.8px",
        borderRadius: "8px",
        borderColor: "#EBEBEB",
        margin:'0px 1.5vw',
        marginBottom:'10px'
      }}
    >
      <div style={{ display: "flex" ,justifyContent:'space-between' ,paddingBottom: "10px",}}>
        <div
          style={{
            fontFamily: "Arial, Sans-serif",
            fontWeight: "700",
            fontSize: "20px",
            color: "#222222",
            paddingLeft: "10px",
            paddingTop:'5px',
            justifyContent:'center'

          }}
        >
          {name} 
        </div>
        <button
          className={`nav-item btn ms-5`}
          style={{ backgroundColor: "#D33852", color: "white" }}
          onClick={() => setModalVisible(true)}
        >
          <AiOutlinePlus
            className="d-inline-block align-left me-1"
            style={{ paddingBottom: "3px", fontSize: "23px" }}
          />
          Create New Task
        </button>
      </div>

      <div>
        <Droppable droppableId={name} direction="vertical" type="column">
          {(provided) => (
            <div
              className="category-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map != undefined ? (
                tasks.map((task, index) => {
                  return (
                    <TaskItem
                      color={task.color}
                      name={task.name}
                      data={data}
                      setData={setData}
                      index={index}
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      Taskid={task.id}
                      key={task.id}
                      category={name}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
    <TaskModal
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    name={""}
    color={""}
    operation={"add"}
    category={name}
  />
  </>
  );
}
