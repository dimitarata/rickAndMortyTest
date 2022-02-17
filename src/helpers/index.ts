export function generateQuery(object: { [x: string]: string | number }) {
  const validParams = Object.keys(object).filter(key => object[key])
  const params = validParams.map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
  );

  if(params.length){
    return '?' + params.join('&')
  }

  return ''
}
