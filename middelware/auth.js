const pkg = require ('jsonwebtoken');
const { jwt } = pkg
const { decode } = pkg
const { verify } = pkg

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData

    if (token && isCustomAuth) {
      decodedData = verify(token, 'test')

      req.userId = decodedData?.id
    } else {
      decodedData = decode(token)

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth