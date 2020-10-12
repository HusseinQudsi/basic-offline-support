import express from 'express'
import config from './config'

const app = express()
const dir = __dirname

// TODO: move to config
const fileConfig = {
    publicDir: '/../public',
    index: '/../public/index.html'
};

app.use(express.static(dir + fileConfig.publicDir))

export const server = () => (
  app.listen(config.port, () => (
    config.log.logs && console.log(`REST API on http://localhost:${config.port}/`))
  )
)