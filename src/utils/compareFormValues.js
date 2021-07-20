export const compareFormValues = (object1, object2) => {
  for (const key in object1) {
    if (object1[key].value) {
      if (object1[key].value != object2[key].value) {
        return false;
      }
    }
  }

  return true;
};
