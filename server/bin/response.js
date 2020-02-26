function sendResponse(res, statusCode, code, data, message) {
  res.set({
    'Content-Type': 'application/json',
  });

  return res.status(statusCode).send(
    JSON.stringify({
      code: code,
      data: data,
      message: message,
    }),
  );
}

module.exports.sendResponse = sendResponse;
