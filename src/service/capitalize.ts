export const capitalize = (word: string) => {
  return word
    .split(' ')
    .map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.slice(1))
    .join(' ')
}
