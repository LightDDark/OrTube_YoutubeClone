import dotenv from 'dotenv'
import KafkaConfig from './kafka/kafka.js'
import s3ToS3 from './hls/s3Tos3.js'

dotenv.config()
const kafkaconfig = new KafkaConfig()
kafkaconfig.consume('transcode', (value) => {
  console.log('Got data from kafka : ', value)
  s3ToS3()
})
