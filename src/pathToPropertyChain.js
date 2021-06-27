export default function pathToPropertyChain (path) {
  return Array.isArray(path)
    ? path
    : path.split(/\.|\[|\]\[|\]\.|\]/g).filter(e => e)
}
