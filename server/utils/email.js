const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const logoPath = path.resolve(__dirname, '../../client/public/images/logo.png');

const commonStyles = `
  background-color: #faf7f2;
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #2c1f13;
  padding: 40px 20px;
`;

const headerStyles = `
  background-color: #3a1e4d;
  color: #d4af37;
  padding: 40px 30px;
  text-align: center;
  border-radius: 16px 16px 0 0;
`;

const contentStyles = `
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 30px rgba(58, 30, 77, 0.1);
`;

const buttonStyles = `
  display: inline-block;
  background: linear-gradient(135deg, #d4af37 0%, #f1d570 100%);
  color: #3a1e4d !important;
  padding: 14px 35px;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 800;
  margin-top: 25px;
  letter-spacing: 1px;
  font-size: 14px;
`;

const logoHtml = `
  <div style="margin-bottom: 20px;">
    <img src="cid:logo" alt="Lola's Lumpia" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
  </div>
`;

const sendContactEmails = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const attachments = [{
    filename: 'logo.png',
    path: logoPath,
    cid: 'logo'
  }];

  // Email to User
  const userMailOptions = {
    from: `"Lola's Lumpia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Message! - Lola\'s Lumpia',
    attachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 1px;">Lola's Lumpia</h1>
          </div>
          <div style="${contentStyles}">
            <h2 style="color: #3a1e4d; font-family: 'Playfair Display', serif; margin-top: 0;">Hello ${name},</h2>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to us! We've received your message regarding "<strong>${subject}</strong>" and our team will get back to you as soon as possible.</p>
            <p style="font-size: 16px; line-height: 1.6;">Lola's kitchen is busy, but we always make time for our family!</p>
            <div style="text-align: center;">
              <a href="https://lolas-lumpia-app-c8c541d5a2ee.herokuapp.com/menu" style="${buttonStyles}">WHILE YOU WAIT, BROWSE MENU</a>
            </div>
            <hr style="border: none; border-top: 1px solid #eae1d3; margin: 30px 0;">
            <p style="font-style: italic; color: #5d4e41; text-align: center; font-size: 14px;">"From Lola's Kitchen to Yours"</p>
          </div>
        </div>
      </div>
    `,
  };

  // Email to Admin
  const adminMailOptions = {
    from: `"Lola's Website" <${process.env.EMAIL_USER}>`,
    to: 'info@codingcarranza.com',
    subject: `New Contact Form: ${subject}`,
    attachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-size: 24px;">New Inquiry</h1>
          </div>
          <div style="${contentStyles}">
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin-top: 20px;"><strong>Message:</strong></p>
            <div style="background: #faf7f2; padding: 20px; border-radius: 12px; border-left: 5px solid #d4af37; margin-top: 10px; font-style: italic; line-height: 1.6;">
              ${message}
            </div>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(userMailOptions);
  await transporter.sendMail(adminMailOptions);
};

const sendNewsletterWelcome = async (email) => {
  const mailOptions = {
    from: `"Lola's Lumpia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to the Family! 🥟',
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: 'logo'
    }],
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 1px;">Lola's Lumpia</h1>
          </div>
          <div style="${contentStyles}">
            <h2 style="color: #3a1e4d; font-family: 'Playfair Display', serif; margin-top: 0; text-align: center;">You're on the list!</h2>
            <p style="font-size: 16px; line-height: 1.6; text-align: center;">Thanks for joining our newsletter. You'll be the first to know about new flavors, special events, and Lola's secret tips.</p>
            <p style="font-size: 16px; line-height: 1.6; text-align: center; margin-top: 20px;">Ready to see what's cooking today?</p>
            <div style="text-align: center;">
              <a href="https://lolas-lumpia-app-c8c541d5a2ee.herokuapp.com/menu" style="${buttonStyles}">EXPLORE OUR MENU</a>
            </div>
            <hr style="border: none; border-top: 1px solid #eae1d3; margin: 30px 0;">
            <p style="font-size: 12px; color: #5d4e41; text-align: center; letter-spacing: 1px;">LOLA'S LUMPIA • SAN ANTONIO, TX</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendContactEmails, sendNewsletterWelcome };
