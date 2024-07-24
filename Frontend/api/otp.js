const nodemailer = require('nodemailer');

// Configure the SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "noreplycampusgrader@gmail.com",
    pass: "Onevision@2024",
  },
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    const mailOptions = {
      from: "noreplycampusgrader@gmail.com",
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
