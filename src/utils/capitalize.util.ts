export const capitalize = (name: string) => {
  return name
    .split(' ')
    .map((word) => {
      const lowercaseWord = word.toLocaleLowerCase();
      return `${lowercaseWord[0].toLocaleUpperCase()}${lowercaseWord.slice(1)}`;
    })
    .join(' ');
};
