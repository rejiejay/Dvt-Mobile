module.exports = {
  success: (data, message) => ({
      'result': 1,
      'data': data || null,
      'message': message || 'Request was successful'
  }),

  error: (message, result, data) => ({
      'result': result || 0,
      'data': data || null,
      'message': message
  })
}
