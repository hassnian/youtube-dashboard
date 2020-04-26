const getSuccessResponse = (response) => ({
	success: true,
	data: response,
});

const getFailedResponse = (response) => ({
	success: false,
	data: response,
});

module.exports = { getSuccessResponse, getFailedResponse };
