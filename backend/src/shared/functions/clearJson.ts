export default function clearJson(object: any): any {
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'undefined') {
      delete object[key];
    }
  });
  return object;
}
