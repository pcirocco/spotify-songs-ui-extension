exports.main = async (context = {}, callback) => {
  const message = context.parameters['inputValue'];
  return({alertMessage: `You typed "${message}".`})
};
