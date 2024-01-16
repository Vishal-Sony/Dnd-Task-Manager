import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState({
    tasks: [
      { id: "1", name: "x12 Oranges", color: "#A7F0F9" },
      { id: "2", name: "Bread", color: "#FFAEC0" },
      { id: "3", name: "Free Range Eggs", color: "#FFEDC1" },
      { id: "4", name: "Eat", color: "#C5C5FC" },
      { id: "5", name: "Sleep", color: "#FFAEC0" },
      { id: "6", name: "Code", color: "#A7F0F9" },
    ],
    columns: {
      ADDED: {
        id: "ADDED",
        title: "ADDED",
        // Ensures ownership and order of the task
        taskIds: ["1", "2", "3"],
      },
      STARTED: {
        id: "STARTED",
        title: "STARTED",
        // Ensures ownership and order of the task
        taskIds: ["4", "5"],
      },
      COMPLETED: {
        id: "COMPLETED",
        title: "COMPLETED",
        // Ensures ownership and order of the task
        taskIds: ["6"],
      },
    },
  });
  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
