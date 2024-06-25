const baseUrl = 'https://dg36nmbukx5oh.cloudfront.net/'
const watchVideo = async (req, res) => {
  try {
    const videoKey = req.query.key // Key of the video file in S3
    console.log('video key is ', videoKey)
    // use CloudFront instead
    const url = baseUrl + videoKey
    res.json({url})
    console.log(url)
  } catch (err) {
    console.error('Error generating pre-signed URL:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default watchVideo
