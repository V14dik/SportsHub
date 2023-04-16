const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function getDate(date) {
  return new Date(date).toLocaleDateString("en-US", dateOptions);
}
