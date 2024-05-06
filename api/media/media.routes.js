const express = require('express')
const { getMediaFromYtId } = require('./media.controller')
const router = express.Router()

router.get('/mp3/:videoId', getMediaFromYtId)
router.get('/mp4/:videoId', getMediaFromYtId)

module.exports = router