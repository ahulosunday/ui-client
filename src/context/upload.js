import React, {useContext, useEffect, useState} from "react";
import multer  from 'multer'
export const upload = (formData) =>{
//===============image function=========

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,  '../upload')
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + file.originalname)
  },
});
const upload = multer({
    storage,
    limits:{fieldSize:1000000},
    
    })
router.post('/uploadfile', upload.single('file'), function(req, res){
  const file = req.file
  return res.status(200).json(file.filename)

  
})
//============END OF IMAGE
}