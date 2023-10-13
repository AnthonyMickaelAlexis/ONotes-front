export function formatIsoDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
