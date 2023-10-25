export default function formatDate(date) {
  let parsedDate = new Date(date);

  // Format the date as per special  format
  let formattedDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString("default", { month: "long" })} ${parsedDate.getFullYear()} at ${parsedDate.getHours()}:${parsedDate.getMinutes()}`;
  return formattedDate;
}
