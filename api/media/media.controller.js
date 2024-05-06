async function getMediaFromYtId(req, res) {
  try {
    const { videoId } = req.params
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const mediaData = ytdl(videoUrl, { filter: 'audioonly' });
    loggerService.info(mediaData)
    mediaData.pipe(fs.createWriteStream(res))

  } catch (err) {
    if (err.message === 'User Not Found') {
      res.status(404).send({ error: 'User Not Found' })
    } else {
      res.status(500).send({ err })
    }
  }
}

module.exports = {
  getMediaFromYtId,
}
