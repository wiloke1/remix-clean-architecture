export function delay(ms = 0): Promise<() => void> {
  return new Promise(resolve => {
    const timeId = setTimeout(() => {
      const clear = () => clearTimeout(timeId);
      resolve(clear);
      clearTimeout(timeId);
    }, ms);
  });
}
