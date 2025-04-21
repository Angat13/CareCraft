// import express from 'express';
// import mongoose from 'mongoose';
// import Nexmo from 'nexmo';  // Import Nexmo
// const router = express.Router();

// // Configure Nexmo with your credentials (Get these from your Nexmo dashboard)
// const nexmo = new Nexmo({
//   apiKey: 'your_nexmo_api_key',  // Replace with your API key
//   apiSecret: 'your_nexmo_api_secret',  // Replace with your API secret
// });

// // Mongoose OTP Schema
// const otpSchema = new mongoose.Schema({
//   phoneNumber: { type: String, required: true },
//   userId: { type: String, required: false },  // Optional userId for testing
//   otp: { type: String, required: true },
// });

// const Otp = mongoose.model('Otp', otpSchema);

// // Send OTP route
// router.post('/send-otp', async (req, res) => {
//   const { phoneNumber, userId } = req.body;

//   try {
//     const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP

//     // Save OTP to the database with the phone number and optional userId
//     const otpRecord = new Otp({ phoneNumber, userId, otp });
//     await otpRecord.save();

//     // Send OTP via SMS using Nexmo
//     nexmo.message.sendSms(
//       'your_nexmo_virtual_number',  // Replace with your Nexmo virtual number
//       phoneNumber,
//       `Your OTP is ${otp}`,
//       { type: 'unicode' },
//       (err, responseData) => {
//         if (err) {
//           console.error('Error sending SMS:', err);
//           return res.status(500).send('Failed to send OTP');
//         }

//         if (responseData.messages[0].status === '0') {
//           console.log('OTP sent successfully');
//           res.status(200).send('OTP sent successfully');
//         } else {
//           console.error('Failed to send OTP:', responseData.messages[0]['error-text']);
//           res.status(500).send('Failed to send OTP');
//         }
//       }
//     );
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).send('Failed to send OTP');
//   }
// });

// // Verify OTP route
// router.post('/verify-otp', async (req, res) => {
//   const { userId, otpEntered } = req.body;

//   try {
//     const otpRecord = await Otp.findOne({ userId, otp: otpEntered });

//     if (otpRecord) {
//       res.status(200).send('OTP verified successfully');
//     } else {
//       res.status(400).send('Invalid OTP or OTP expired');
//     }
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).send('Failed to verify OTP');
//   }
// });

// export default router;  // Export the router using export default
