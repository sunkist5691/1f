export const countExp = (explvl: string) => {
  return !Number(explvl) ? 'No experience' : `${explvl} years`
}
