const express = require('express');

const app = express();
const router = express.Router();

const Video = require('../models/Video');

/** *** VIDEOS ROUTERS **** */

const exampleRouterNameSpace = '/';

const getSuccessResponse = (response) => ({
	success: true,
	data: response,
});

const getFailedResponse = (response) => ({
	success: false,
	data: response,
});


router.get('/videos', async (req, res, next) => {
	try {
		const videos = await Video.find({});
		return res.json(getSuccessResponse({ videos }));
	} catch (e) {
		res.status = 5000;
		return res.json(getFailedResponse({ message: 'INTERNAL_SERVER_ERROR' }));
	}
});

router.get('/videos/:id', async (req, res) => {
	try {
		const video = await Video.find({ _id: req.params.id });
		return res.json(getSuccessResponse({ video }));
	} catch (e) {
		console.log(e)
		res.status = 5000;
		return res.json(getFailedResponse({ message: 'INTERNAL_SERVER_ERROR' }));
	}
});


router.post('/videos', async (req, res, next) => {
	try {
		const { title } = req.body;
		const video = new Video({ title });
		console.log(video)
		await video.save();
		return res.json(getSuccessResponse({ video }));
	} catch (e) {
		return res.json(getFailedResponse({ message: 'FAILED CREATING VIDEO' }));
	}
});

app.use(exampleRouterNameSpace, router);

module.exports = router;
