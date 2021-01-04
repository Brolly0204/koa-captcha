const svgCaptcha = require('svg-captcha')

const getCaptcha = (size = 5) => {
  const options = {
    size,
  }
  const captcha = svgCaptcha.create(options)
  return captcha
}

module.exports = {
  getCaptcha
}
