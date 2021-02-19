export const createRandomCharacters = (min: number = 5, max: number = 10): string => {
  if (!Number(min) || !Number(max)) throw new Error('Only numbers accepted')

  const randomBetween5and10 = Math.floor(Math.random() * (max - min) + min)
  return Math.random().toString(22).substr(2, randomBetween5and10)
}
