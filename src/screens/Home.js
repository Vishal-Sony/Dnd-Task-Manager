import HomeNav from "../components/navBars/HomeNav";
import { useContext } from "react";
import { DataContext } from "../DataContext";
import Category from "../components/Category";
import { DragDropContext } from "react-beautiful-dnd";

const Home = () => {
  const [data, setData] = useContext(DataContext);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If there's no destination, or the item is dropped in the same location, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const start_column = data.columns[source.droppableId];
    const finish_column = data.columns[destination.droppableId];

    if (start_column === finish_column) {
      // create new taskIds array that is a copy of taskIds array that we want to change
      const newTaskIds = start_column.taskIds;
      // 1. Change the taskIds array
      // From this index, remove one item
      newTaskIds.splice(source.index, 1);
      // From this index, remove nothing, insert draggableId
      newTaskIds.splice(destination.index, 0, draggableId);
      // 2. Change the Column's props to accomodate change in taskIds array
      const newColumn = { ...start_column, taskIds: newTaskIds };

      // 3. Change state data to accomodate change in the column
      const newState = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };
      setData(newState);
      // return is important to stop the function from continuing
      return;
    }

    if (start_column !== finish_column) {
      // Make copy of taskIds array from source
      const newStartTaskIds = start_column.taskIds.map((task) => task);
      // Make copy of taskIds array from destination
      const newFinishTaskIds = finish_column.taskIds.map((task) => task);

      // Adjust taskIds array from source for change
      newStartTaskIds.splice(source.index, 1);
      // Adjust taskIds array from destination for change
      newFinishTaskIds.splice(destination.index, 0, draggableId);

      // Update source column for change in taskIds array
      const newColumnStart = { ...start_column, taskIds: newStartTaskIds };
      // Update destination column for change in taskIds array
      const newColumnFinish = { ...finish_column, taskIds: newFinishTaskIds };

      // Create copy of state data and adjust for changes in columns
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };
      console.log(newState);
      // Update state data with changes
      setData(newState);

      // return is important to stop the function from continuing
      return;
    }
  };

  return (
    <div>
      {/* navigation bar */}
      <HomeNav />
      <div style={{ paddingLeft: "5%", paddingTop: "2%", paddingRight: "5%" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "2%",
            columnGap: "100px",
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Category name={"ADDED"} />
              <Category name={"STARTED"} />
              <Category name={"COMPLETED"} />
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Home;
