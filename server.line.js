const request = require('request')
var moment = require('moment')
var randomstring = require('randomstring')
const fs = require('fs')
const line = require('@line/bot-sdk')
const imageDir = 'images/'

const lineToken = {
  channelAccessToken: process.env.channelAccessToken || 'fixme',
  channelSecret: process.env.channelSecret || 'fixme',
}

const client = new line.Client(lineToken)

const fn = {}

// app.get('/image', function (req, res) {
//   var z = currentImage.toString('base64')
//   res.send(z)
// })

fn.webhook = (req, res) =>
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))

const handleEvent = (event) => {
  console.log(event)
  if (event.type === 'message' && event.message.type === 'text') {
    return Promise.resolve(null)
    handleMessageEvent(event)
  } else if (event.type === 'message' && event.message.type === 'image') {
    handleImageEvent(event)
  } else {
    return Promise.resolve(null)
  }
}

const handleImageEvent = (event) => {
  var message = event.message
  var chunks = []
  client.getMessageContent(message.id).then((stream) => {
    stream.on('data', (chunk) => {
      chunks.push(chunk)
      // console.log(chunks);
    })

    stream.on('end', () => {
      var body = Buffer.concat(chunks)

      var msg = {
        type: 'text',
        text: 'อ่านรูปแล้วนะ กำลังส่งไปปริ้นแหล่ะ',
      }
      currentImage = body

      const messageSend = [msg]
      const string_data = body.toString('base64')
      messageSend.push(msg)
      const dataUri = string_data
      const data = dataUri.replace(/^data:image\/\w+;base64,/, '')
      const buf = new Buffer(data, 'base64')

      let imageName = moment(new Date()).format('YYYY-MM-DD_HH_MM_SS_SSS')
      imageName += randomstring.generate(4) + '.png'

      fs.writeFileSync(imageDir + imageName, buf)
      return client.replyMessage(event.replyToken, { type: 'text', text: 'OK :)' })
    })

    stream.on('error', (err) => {
      // error handling
    })
  })
}

function handleMessageEvent(event) {
  var msg = {
    type: 'text',
    text: 'ส่งรูปมาเลยจ้า',
  }

  if (event.message.text == 'Firer') {
  }

  return client.replyMessage(event.replyToken, msg)
}

module.exports = fn
