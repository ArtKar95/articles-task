export const formatDate = (dateStr = "") => dateStr.slice(0, 10);

export const shortStr = (str = "", length = 0) =>
  !length || length >= str.length ? str : str.slice(0, length) + "...";

export const filterTitel = (array, text) => {
  return array.filter((item) => item.title.toLowerCase().includes(text));
};

export const filterDate = (array, type) => {
  if (type === "ASC") {
    array.sort((a, b) => (a.date > b.date ? 1 : -1));
  }
  if (type === "DESC") {
    array.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
};
