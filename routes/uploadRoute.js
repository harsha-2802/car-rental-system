import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()
import { s3Uploadv2 } from '../middlewares/s3Service.js'

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/webp' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
})

router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files)
    res.json(results)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
})

router.post('/update', upload.array('images', 5), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files)
    res.json(results)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
})

export default router
