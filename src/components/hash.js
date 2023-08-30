const bcrypt = require('bcryptjs')

 const salt = bcrypt.genSaltSync(10)

 const hashData = (input) =>{
   const hashed = bcrypt.hashSync(input, salt)
    return hashed

 }
 module.exports = {
    hashData
}