export const formatMultipleValues = (valueArray?: string[]) => {
  return valueArray?.map((string, i) => {
    return <div key={string + i}>{string}</div>;
  });
};
