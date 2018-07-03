const success = (data, message, code = 200) => {
  const response = {
    status: 200,
    data: data,
    message: message
  }

  return response;
}

const notFound = (message) => {
  const response = {
    status: 404,
    data: [],
    message: message
  };

  return response;
}

const exists = (message) => {
  const response = {
    status: 404,
    data: [],
    message: message
  };

  return response;
}

module.exports = { success, notFound, exists };
