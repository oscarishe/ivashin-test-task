export const extractTags = (input: string) => {
  return input.split(' ').filter((word) => word.startsWith('#'));
};
