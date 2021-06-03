export const selectId = (id) => {
  if (typeof (id) === "string") {
    return id;
  }
  if (typeof (id) === "object") {
    const newId = id.userId;
    return selectId(newId);
  }
};