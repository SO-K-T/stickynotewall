import { Dispatch, SetStateAction, useState } from "react";
import { TaskType } from "../utils/TaskData";
import { DatePicker } from "zaman";

const TaskCreation = ({
  allTasks,
  setAllTasks,
  setIsCreating,
}: {
  allTasks: TaskType[];
  setAllTasks: Dispatch<SetStateAction<TaskType[]>>;
  setIsCreating: Dispatch<SetStateAction<Boolean>>;
}) => {
  const intitalFormData: TaskType = {
    // random id for basic needs
    id: (Math.random() * (100000 - 1) + 1).toString(),
    title: "",
    deadLine: 0,
    createdAt: new Date(),
  };
  const [formData, setFormData] = useState<TaskType>(intitalFormData);

  const handleCreateTask = (formData: TaskType): void => {
    // basic require validation
    if (formData.deadLine && formData.title) {
      setAllTasks([...allTasks, formData]);
      setIsCreating(false);
    }
  };

  return (
    <form
      className=" text-xs sm:text-sm md:text-base lg:text-lg  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  justify-center items-center w-full md:inset-0 max-h-full flex bg-opacity-20 bg-black text-right  "
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTask(formData);
      }}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className=" bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b-4 border-blue-600    rounded-md ">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-red-600 bg-red-200 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <h3 className="text-3xl font-bold   ">ایجاد نوت</h3>
          </div>
          <div className="p-4 md:p-5 space-y-4 ">
            <label htmlFor="title" className=" text-xl">
              : موضوع نوت
            </label>
            <textarea
              className="shadow  no-underline  appearance-none border rounded w-full  h-[6rem]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-right "
              id="username"
              name="title"
              placeholder="نوت شما"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value.trim() })
              }
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-6 pb-1 ">
            <div className="flex flex-col gap-2  relative">
              <label htmlFor="title" className=" text-xl">
                : مهلت تحویل
              </label>
              <div className="border-2 rounded-sm px-2   ">
                <DatePicker
                  className=" z-50 !w-[22rem] absolute md:top-[0] md:left-[75%] top-[10rem] left-[90%] shadow-lg "
                  onChange={(e) => {
                    if (formData.createdAt <= e.value) {
                      setFormData({ ...formData, deadLine: new Date(e.value) });
                    } else {
                      alert(
                        "تاریخ تحویل نمی تواند بعد از تارخ ثبت باشد. در صورت نیاز به تست عملکر تغییر رنگ تسک به فایل تسک دیتا مراجعه کنید و از انجا تاریخ را هر طور مایل هستید تغییر دهید"
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="title" className=" text-xl">
                : تاریخ ثبت
              </label>
              <div className="border-2 rounded-sm px-2  ">
                <DatePicker className=" hidden " defaultValue={new Date()} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              type="submit"
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              ایجاد نوت
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskCreation;
