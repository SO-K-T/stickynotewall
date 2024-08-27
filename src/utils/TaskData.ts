export type TaskType = {
  id: string;
  title: string;
  deadLine: Date | number;
  createdAt: Date | number;
};

export const tasksData: TaskType[] = [
  {
    id: "1",
    title: "درست کردن پروژه",
    // ۱۴۷۹/۶/۱۰
    deadLine: new Date("2024/8/31"),
    // ۱۴۷۹/۶/۳
    createdAt: new Date("2024/8/24"),
  },
  {
    id: "2",
    title: "مشغول به کار شدن در شرکت ریرا",
    deadLine: new Date("2024/9/24"),
    createdAt: new Date("2024/8/24"),
  },
  {
    id: "3",
    title:
      "یادگیری برنامه نویسی تی دی دی با استفاده از جست و ار تی ال برای یونیت تستینگ و سایپرس برای تست اند تو اند ",
    deadLine: new Date("2024/9/3"),
    createdAt: new Date("2024/8/27"),
  },
  {
    id: "4",
    title: "اتمام کتاب اتومیک هبیتس",
    deadLine: new Date("2024/8/1"),
    createdAt: new Date("2024/7/20"),
  },
];
