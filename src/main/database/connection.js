import mongoose from 'mongoose'

const connection = mongoose.createConnection(import.meta.env.MAIN_VITE_CONNECTION_URL)

function getConnection() {
  return connection
}

async function validate() {
  const conn = await getConnection()
  return new Promise(function (resolve, reject) {
    if (!conn) {
      reject(new Error('No connection found'))
    }
    conn.once('open', () => {
      resolve('CONNECTION OPEN')
    })
    conn.on('error', (err) => {
      reject(err)
    })
  })
}
export { getConnection, validate }
