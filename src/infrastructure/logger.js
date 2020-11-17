const Error = (message, method, params, body) => {
  console.error(Date() + '(' + Date.now() + ')');
  console.error('Method: ' + method);
  console.error('Message: ' + message);
  process.stderr.write('With params: ');
  console.error(params);
  process.stderr.write('With body: ');
  console.error(body);
  console.error();
};

module.exports = { Error };
