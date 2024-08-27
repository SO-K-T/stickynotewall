import { useRef, useState } from "react";
import TaskCard from "./components/TaskCard";
import { tasksData, TaskType } from "./utils/TaskData";
import TaskCreation from "./components/TaskCreation";

function App() {
  const [allTasks, setAllTasks] = useState<TaskType[]>(tasksData);
  const [isCreating, setIsCreating] = useState<Boolean>(false);

  // ref for task user drags and task that is getting dragging on
  const draggedTask = useRef<any>(null);
  const draggedOnTask = useRef<any>(null);

  // handle drag sorting
  const handleSort = () => {
    // clone the tasks
    const newAllTasks = [...allTasks];

    // remove and save the dragged task
    const draggedTaskCardData = newAllTasks.splice(draggedTask.current, 1)[0];

    // change the order
    newAllTasks.splice(draggedOnTask.current, 0, draggedTaskCardData);

    // reset the order ref
    draggedTask.current = null;
    draggedOnTask.current = null;

    // update the state
    setAllTasks(newAllTasks);
  };

  return (
    <main className="max-w-8xl flex items-center justify-center h-screen gap-4 relative">
      <div className="h-[42rem]  w-[95%]  bg-blue-50 shadow-md flex  flex-col items-center ">
        <h1 className="text-3xl text-center font-bold border-b-4 w-full rounded-md py-4 border-blue-600">
          نوت های من
        </h1>
        <div className="grid xl:grid-cols-4 md:grid-cols-2  sm:gap-x-4 sm:gap-y-2 grid-cols-1       ">
          {allTasks.map((task, index) => (
            <TaskCard
              taskData={task}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              key={task.id}
              index={index}
              onDragEnd={handleSort}
              draggedTask={draggedTask}
              draggedOnTask={draggedOnTask}
            ></TaskCard>
          ))}
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={() => setIsCreating(true)}
        className="size-14  rounded-full flex justify-center items-center absolute bottom-16 right-16 shadow-md shadow-blue-400  hover:shadow-blue-500 hover:fill-green-400 bg-blue-400 hover:bg-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#2b91f0"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#193f9e"
          className="size-16 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      {isCreating && (
        <TaskCreation
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          setIsCreating={setIsCreating}
        ></TaskCreation>
      )}
    </main>
  );
}

export default App;
