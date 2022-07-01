export const populateList = [
  {
    path: 'sentUserId',
  },
  {
    path: 'groupId',
    populate: {
      path: 'memberIds',
    },
  },
  {
    path: 'memberIds',
  },
];
