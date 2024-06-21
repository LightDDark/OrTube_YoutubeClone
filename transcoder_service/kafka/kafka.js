import { Kafka } from 'kafkajs'
import fs from 'fs'
import path from 'path'

class KafkaConfig {
  constructor() {
    console.log(process.env.BROKER)
    this.kafka = new Kafka({
      clientId: 'ortube uploader',
      brokers: [process.env.BROKER],
      ssl: true,
      sasl: {
        username: process.env.SASL_USERNAME,
        password: process.env.SASL_PASSWORD,
        mechanism: 'plain',
      },
    })
    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId: 'ortube-uploader' })
  }

  async produce(topic, messages) {
    try {
      const result = await this.producer.connect()
      console.log('kafka connected... : ', result)
      await this.producer.send({
        topic: topic,
        messages: messages,
      })
    } catch (error) {
      console.log(error)
    } finally {
      await this.producer.disconnect()
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect()
      await this.consumer.subscribe({ topic: topic, fromBeginning: true })
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString()
          callback(value)
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export default KafkaConfig
