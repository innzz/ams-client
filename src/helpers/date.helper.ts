export function getCurrentDate(currentDate: Date) {
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}

export function getTime(currentDate : Date) {

  let hour = currentDate.getHours();
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour clock

  const minute = String(currentDate.getMinutes()).padStart(2, "0");

  return `${hour}:${minute} ${ampm}`;
}
