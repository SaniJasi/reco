export const getImageName = (name: string) => {
  return `${name
    .toLowerCase()
    .replace("app_source_", "")
    .replace("msft", "microsoft")}.com`;
};
