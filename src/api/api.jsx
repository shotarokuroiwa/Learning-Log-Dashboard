const mocklogs = [
  {
    id: 1,
    title: "サンプル１",
    category: "backend",
    date: "2026-4-12",
    minutes: 90,
    status: "planned",
    memo: "気づきや学び",
    favorite: true,
  },
  {
    id: 2,
    title: "サンプル２",
    category: "frontend",
    date: "2026-4-10",
    minutes: 30,
    status: "doing",
    memo: "気づき",
    favorite: false,
  },
  {
    id: 3,
    title: "サンプル３",
    category: "backend",
    date: "2026-4-11",
    minutes: 60,
    status: "done",
    memo: "学び",
    favorite: false,
  },
];

const fetchLogs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mocklogs);
    }, 500);
  });
};

export default fetchLogs;
