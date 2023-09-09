import { customAlphabet } from 'nanoid'
export const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321', 11)


const gpc = require('generate-pincode')
export const pin = gpc(11)