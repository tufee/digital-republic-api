import express, { Response, Request } from 'express'

const app = express()

app.get('/', (request: Request, response: Response) => {
  response.send('hello world')
})

app.listen(3000, () => { console.log('Server started on port 3000') })

