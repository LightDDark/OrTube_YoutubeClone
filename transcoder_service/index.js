// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import KafkaConfig from './kafka/kafka.js'
// import s3ToS3 from './hls/s3Tos3.js'

// dotenv.config()
// const port = 8081

// const app = express()
// app.use(
//   cors({
//     allowedHeaders: ['*'],
//     origin: '*',
//   }),
// )

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('HHLD YouTube service transcoder')
// })

// app.get('/transcode', (req, res) => {
//   s3ToS3()
//   res.send('Transcoding done')
// })

// const kafkaconfig = new KafkaConfig()
// kafkaconfig.consume('transcode', (value) => {
//   console.log('Got data from kafka : ', value)
// })

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`)
// })

import fs from 'fs'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const bucketName = process.env.AWS_BUCKET

// try {
//   const filePath = './IMG-20190128-WA0012.jpg'
//   const fileStream = fs.createReadStream(filePath)
//   const client = new S3Client({ region: 'eu-north-1' })
//   const uploadParams = {
//     Bucket: bucketName,
//     Key: 'IMG-20190128-WA0012.jpg',
//     Body: fileStream,
//     ContentType: 'video/mp2t',
//   }
//   const command = new PutObjectCommand(uploadParams)
//   const response = await client.send(command)
//   fs.unlinkSync(filePath)
//   console.log('Success.')
// } catch (e) {
//   console.log(e)
// }

try {
  const writeStream = fs.createWriteStream('local.jpg')
  const client = new S3Client({ region: 'eu-north-1' })
  const uploadParams = {
    Bucket: bucketName,
    Key: 'IMG-20190128-WA0012.jpg',
  }
  const command = new GetObjectCommand(uploadParams)
  const respone = await client.send(command)
  const readStream = respone.Body
  readStream.pipe(writeStream)
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
  console.log('Downloaded s3 mp4 file locally')
} catch (e) {
  console.log(e)
}
