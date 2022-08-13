export const getLastWord = url => {
  try {
    const slashParts = url.split('/')
    return slashParts[slashParts.length - 1].toUpperCase()
  } catch (error) {
    return ''
  }
}
