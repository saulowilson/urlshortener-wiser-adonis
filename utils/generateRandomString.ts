export default function (min: number = 5, max: number = 10): string {
  const randomBetween5and10 = Math.floor(Math.random() * (max - min) + min)
  return Math.random().toString(22).substr(2, randomBetween5and10)
}
