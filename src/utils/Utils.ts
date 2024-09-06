export const convertTime = (time: number) => {
  let result = "";
  const ticks = time / 50;
  const minutes = Math.floor(ticks / 20 / 60);
  const seconds = Math.floor(ticks / 20 - minutes * 60);
  const ms = (ticks - minutes * 60 * 20 - seconds * 20) * 50;

  if (minutes > 0) result += minutes + ":";
  result += seconds.toString().padStart(2, "0") + "." + ms.toString().padStart(3, "0");
  return result;
};
