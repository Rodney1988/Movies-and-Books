export const pluralize = (value: String, count?: Number) => {
  if (!count) return value;
  if (count && count === 1) {
    return value;
  } else {
    return value + 's';
  }
};
