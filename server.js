import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import connectDb from './config/connectDB.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import carRoute from './routes/carRoute.js'
import userRoute from './routes/userRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import reservationRoute from './routes/reservationRoute.js'
import stripeRoute from './routes/stripeRoute.js'
import Stripe from 'stripe'

connectDb()

// IMPORTANT: stripe must be constructed with `new`
export const stripe = new Stripe(process.env.STRIPE_SECRET_TEST)

const app = express()
const port = process.env.PORT || 5000

// ✅ FIXED CORS HERE
app.use(cors({
  origin: [
    "http://localhost:5173", // for local development
    "https://car-rental-system-front-end.onrender.com" // your deployed frontend
  ],
  credentials: true
}))

app.use(json())
app.use('/uploads', express.static('uploads'))

// API routes
app.use('/api/user', userRoute)
app.use('/api/cars', carRoute)
app.use('/api/reservation', reservationRoute)
app.use('/api/upload', uploadRoute)
app.use('/api/stripe', stripeRoute)

// ✅ Health and root routes MUST be before notFound/errorHandler
app.get('/health', (req, res) => res.send('ok'))
app.get('/', (req, res) => res.send('Backend alive 🚀'))

// Keep these LAST
app.use(notFound)
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`)
})


