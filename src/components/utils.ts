export const replaceVars = (input: string, userData: any) => {
  return input.replace(/\[(.*?)\]/g, (match, p1) => {
    if (userData) {
      return userData[p1];
    }
    return match;
  });
};
