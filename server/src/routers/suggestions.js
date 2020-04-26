const express = require('express');
const stringSimilarity = require('string-similarity');

const app = express();
const router = express.Router();

const { getSuccessResponse, getFailedResponse } = require('../helpers/responseMethdos');
const { getSuggestionsByKeywords } = require('../services/SuggestionsScrapper');

function compare(a, b) {
	if (a.similarity < b.similarity) {
		return 1;
	}
	if (a.similarity > b.similarity) {
		return -1;
	}
	return 0;
}

router.get('/suggestions', async (req, res, next) => {
	try {
		const query = req.query.q;

		const suggestions = await getSuggestionsByKeywords(query);

		const suggestionsWithSimilarity = suggestions.map((suggestion) => ({
			suggestion,
			similarity: stringSimilarity.compareTwoStrings(query, suggestion.slice(0, query.length)),
		}));

		const sortedSuggestions = suggestionsWithSimilarity.sort(compare);

		const mappedSuggestions = sortedSuggestions.map((suggestion) => suggestion.suggestion);

		return res.json(getSuccessResponse({ suggestions: mappedSuggestions }));
	} catch (e) {
		res.status = 5000;
		return res.json(getFailedResponse({ message: 'INTERNAL_SERVER_ERROR' }));
	}
});


module.exports = router;
