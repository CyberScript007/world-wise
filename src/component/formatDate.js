const formatDate = function (dateStr) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  }).format(new Date(dateStr));
};

export { formatDate };
