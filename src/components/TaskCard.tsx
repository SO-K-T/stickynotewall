import {
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useState,
} from "react";
import { TaskType } from "../utils/TaskData";
import { DatePicker } from "zaman";

const TaskCard = ({
  taskData,
  allTasks,
  setAllTasks,
  index,
  onDragEnd,
  draggedTask,
  draggedOnTask,
}: {
  taskData: TaskType;
  allTasks: TaskType[];
  setAllTasks: Dispatch<SetStateAction<TaskType[]>>;
  index: number;
  onDragEnd: DragEventHandler<HTMLDivElement> | undefined;
  draggedTask: any;
  draggedOnTask: any;
}) => {
  const [taskCardData, SetTaskCardData] = useState<TaskType>(taskData);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingDeadLine, setIsEditingDeadLine] = useState<boolean>(false);
  // set the time left to deadline - today date
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.round(
      (taskCardData?.deadLine.valueOf() + 1 - Date.now().valueOf()) /
        (1000 * 3600 * 24)
    )
  );

  const HandleDeleteTask = (taskData: TaskType): void => {
    setAllTasks(allTasks.filter((t) => t.id !== taskData.id));
  };

  const changeDate = (Date: Date | Number): string => {
    return Date.toLocaleString("fa-IR", {
      // ts giving an error because of overloading bug with the toLocalString function
      // @ts-ignore
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div
      className={`${
        timeLeft <= 0 ? " bg-red-200 " : " bg-slate-100"
      } text-xs sm:text-sm lg:text-lg  md:text-base border shadow-lg py-2 px-2 m-2  flex flex-col gap-2 relative    justify-between  rounded-lg  `}
      draggable
      onDragStart={() => {
        draggedTask.current = index;
      }}
      onDragEnter={() => (draggedOnTask.current = index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex gap-2 justify-between ">
        <div className=" flex items-center justify-center gap-2 border-b-2 border-b-blue-200">
          {/* bascic condition for timeleft ui in the top right corner of taskcard */}
          <span>{Math.sign(timeLeft) !== 0 && Math.abs(timeLeft)}</span>
          {Math.sign(timeLeft) === -1 && (
            <span className="mb-1">روز گزشته</span>
          )}
          {Math.sign(timeLeft) === 1 && <span className="mb-1">روز مانده</span>}
          {Math.sign(timeLeft) === 0 && <span className="mb-1">روز تحویل</span>}

          <span className="mb-1">{}</span>
        </div>
        <button onClick={() => HandleDeleteTask(taskData)}>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 hover:bg-red-200 rounded-full border-1"
          >
            <path
              d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM11.95 15.46L14.08 17.58L12.66 19L10.54 16.87L8.42 19L7 17.58L9.13 15.46L7 13.34L8.42 11.92L10.54 14.05L12.66 11.92L14.08 13.34L11.95 15.46Z"
              fill="red"
            />
          </svg>
        </button>
      </div>

      {isEditingTitle ? (
        <textarea
          className="text-xl text-right font-semibold overflow-auto h-[4rem] pr-1  mb-1  leading-8 bg-orange-50     "
          defaultValue={taskCardData.title}
          autoFocus
          onChange={(e) =>
            SetTaskCardData({ ...taskCardData, title: e.target.value })
          }
          onBlur={() => setIsEditingTitle(false)}
        ></textarea>
      ) : (
        <h1
          onDoubleClick={() => setIsEditingTitle(true)}
          className="text-xl text-right  font-semibold overflow-auto  h-[4rem] px-1 pr-1  mb-1 leading-8"
        >
          {taskCardData.title}
        </h1>
      )}

      <div className="flex gap-2    justify-center ">
        <div className="flex gap-1 text-base">
          <span> تاریخ ثبت :</span>
          <span className="">{changeDate(taskCardData.createdAt)}</span>
        </div>

        <span className="border border-slate-400"></span>

        <div
          className="flex  text-base   gap-1"
          onBlur={() => setIsEditingTitle(false)}
        >
          <span> مهلت تحویل :</span>
          {isEditingDeadLine ? (
            <DatePicker
              name="deadLine"
              inputClass=" w-[4rem] flex text-center bg-transparent focus:bg-orange-50 "
              className=" z-50 !w-[22rem] absolute  top-10 left-[80%] "
              defaultValue={taskCardData.deadLine}
              onChange={(e) => {
                console.log("deadlinebefore", taskCardData.deadLine);
                SetTaskCardData({
                  ...taskCardData,
                  deadLine: new Date(e.value),
                });
                console.log("timeLeftbefore", timeLeft);
                setTimeLeft(
                  Math.round(
                    (e.value.valueOf() - Date.now().valueOf()) /
                      (1000 * 3600 * 24)
                  )
                );
                setIsEditingDeadLine(false);
              }}
              show={isEditingDeadLine}
            />
          ) : (
            <span className="" onClick={() => setIsEditingDeadLine(true)}>
              {changeDate(taskCardData.deadLine)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
