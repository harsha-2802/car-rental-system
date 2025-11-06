import { stripe } from '../server.js'

const stripePayment = async (req, res) => {
  let { amount, id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'INR',
      description: 'RentEse',
      payment_method: id,
      confirm: true,
    })
    console.log('Payment', payment)
    res.json({
      message: 'Payment successful',
      success: true,
    })
  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false,
    })
  }
}

export { stripePayment }
