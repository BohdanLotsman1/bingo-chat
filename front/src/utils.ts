export const generateUniqueUserId = () =>
  "_" + Math.random().toString(36) + "_" + new Date().getTime();
