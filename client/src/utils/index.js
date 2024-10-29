export const convertTimeToDate = (timestamp) => {
  if (!timestamp) return "";

  const parsedTimestamp = parseInt(timestamp, 10);
  const date = new Date(parsedTimestamp);

  if (isNaN(date.getTime())) {
    console.error("Invalid date timestamp:", timestamp);
    return "";
  }

  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

export function getInitials(text) {
  const firstLetter = text.trim()[0].toUpperCase();
  return firstLetter;
}
