const mocklogs = [
  {
    "id": 1,
    "title": "ミーティング",
    "category": "remind",
    "date": "2026-4-10",
    "minutes": 90,
    "status": "planned",
    "memo": "気づきや学び",
    "favorite": true,
    "isMock": true
  },
  {
    "id": 2,
    "title": "ミーティング",
    "category": "remind",
    "date": "2026-4-10",
    "minutes": 30,
    "status": "doing",
    "memo": "気づき",
    "favorite": false,
    "isMock": true
  },
  {
    "id": 3,
    "title": "会議",
    "category": "remind",
    "date": "2026-4-10",
    "minutes": 60,
    "status": "planned",
    "memo": "学び",
    "favorite": false,
    "isMock": true
  }
];

const fetchLogs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mocklogs);
    }, 500);
  });
};

export default fetchLogs;