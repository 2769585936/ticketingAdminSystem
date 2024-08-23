/**
 *
 * @param {*} res
 * @param {{code: string, message: string, data: any}} config a config object
 * @param {string} config.code - 失败 返回Code.
 * @param {string} config.message - 失败 消息.
 * @param {any} config.data - 失败 返回数据.
 */
const errorSend = (res, config = {}) => {
  const { code, message, data } = Object.assign({ code: '0001', message: '失败', data: null }, config)
  res.send({
    code,
    data,
    message: {
      type: 'error',
      message
    }
  })
}

/**
 *
 * @param {*} res
 * @param {{code: string, message: string, data: any}} config a config object
 * @param {string} config.code - 成功 返回Code.
 * @param {string} config.message - 成功消息.
 * @param {any} config.data - 成功 返回数据.
 */
const successSend = (res, config = {}) => {
  const { code, message, data } = Object.assign({ code: '0000', message: '成功', data: null }, config)
  res.send({
    code,
    data,
    message: {
      type: 'success',
      message
    }
  })
}
module.exports = {
  errorSend,
  successSend
}
