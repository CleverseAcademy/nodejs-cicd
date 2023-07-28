import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import { createClient } from 'redis'

import { mongoDbUrl } from './mongodb'
import { avg, max, min } from './utils'

dotenv.config()

type HandlerFunc = (req: Request, res: Response) => Promise<Response>

async function main(): Promise<void> {
  const version = process.env.APP_VERSION || 'no-app-version-information'
  const repo = process.env.FROM_REPO || 'no-repo-information'
  console.log({ status: 'starting app', version, repo })

  const port = process.env.PORT || 8000

  const mongoUser = process.env.MONGODB_USERNAME
  const mongoPass = process.env.MONGODB_PASSWORD
  const mongoHost = process.env.MONGODB_HOST

  let mongoPort: number | undefined = Number(process.env.MONGODB_PORT)
  if (isNaN(mongoPort)) {
    mongoPort = undefined
  }

  const mongoUrl = mongoDbUrl({
    username: mongoUser,
    password: mongoPass,
    host: mongoHost,
    port: mongoPort,
  })

  const mongo = new MongoClient(mongoUrl)
  const redis = createClient({
    url: process.env.REDIS_URL,
  })
  const prisma = new PrismaClient()

  redis.on('error', (err) => console.log('Redis Client Error', err))

  try {
    await mongo.connect()
    await redis.connect()
    await prisma.$connect()
    await prisma.user.findMany()
  } catch (err) {
    console.error(err)
    return
  }

  const app = express()
  app.use(express.json())

  app.get('/max', newCalcHandler('max', max))
  app.get('/min', newCalcHandler('min', min))
  app.get('/avg', newCalcHandler('avg', avg))

  // Get MongoDB collection "coll" from db "demo"
  const coll = await mongo.db('demo').collection('coll')

  app.post(
    '/',
    async (req: Request, res: Response): Promise<Response> => {
      const body = req.body
      if (!body) {
        return res
          .status(400)
          .json({ error: `bad request body: ${body}` })
          .end()
      }

      try {
        const result = await coll.insertOne(body)
        return res
          .status(201)
          .json({
            id: result.insertedId.toString(),
            item: { ...body, _id: undefined },
          })
          .end()
      } catch (err) {
        const errMsg = 'failed to save data to database'
        console.error(`${errMsg}: ${err}`)

        return res.status(500).json({ error: errMsg }).end()
      }
    },
  )

  app.get(
    '/:id',
    async (req: Request, res: Response): Promise<Response> => {
      const id = req.params.id

      try {
        const item = await coll.find({ _id: new ObjectId(id) }).toArray()
        if (item.length === 0) {
          return res.status(404).json({ error: `item ${id} not found` })
        }

        const body = item.map((data) => {
          return { id: data._id.toString(), ...data, _id: undefined }
        })

        return res.status(200).json(body).end()
      } catch (err) {
        const errMsg = `failed to get item ${id}`
        console.error(`${errMsg}: ${err}`)

        return res.status(500).json({ error: errMsg }).end()
      }
    },
  )

  app.listen(port, () => {
    console.log({ status: `server is listening`, port })
  })
}

function newCalcHandler(
  name: string,
  calcFunc: (numbers: number[]) => number,
): HandlerFunc {
  return async (req: Request, res: Response): Promise<Response> => {
    const { numbers } = req.body
    if (!numbers) {
      return res.status(400).json({ error: 'missing `numbers` in body' }).end()
    }
    try {
      const result = calcFunc(numbers)
      return res.status(200).json({ numbers, ops: name, result }).end()
    } catch (err) {
      return res.status(400).json({ error: err }).end()
    }
  }
}

main()
