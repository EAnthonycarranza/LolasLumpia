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
const APP_URL = 'https://lolas-lumpia-app-c8c541d5a2ee.herokuapp.com';

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
  background: #d4af37;
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
    <img src="cid:logo_img" alt="Lola's Lumpia" width="120" height="120" style="display: block; margin: 0 auto; border-radius: 50%; border: 4px solid #ffffff;">
  </div>
`;

const emailAttachments = [{
  filename: 'logo.png',
  path: logoPath,
  cid: 'logo_img'
}];

const sendContactEmails = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Email to User
  const userMailOptions = {
    from: `"Lola's Lumpia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'We Received Your Message! - Lola\'s Lumpia',
    attachments: emailAttachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 1px; color: #d4af37;">Lola's Lumpia</h1>
          </div>
          <div style="${contentStyles}">
            <h2 style="color: #3a1e4d; font-family: 'Playfair Display', serif; margin-top: 0;">Hello ${name},</h2>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to us! We've received your message regarding "<strong>${subject}</strong>" and our team will get back to you as soon as possible.</p>
            <p style="font-size: 16px; line-height: 1.6;">Lola's kitchen is busy, but we always make time for our family!</p>
            <div style="text-align: center;">
              <a href="${APP_URL}/menu" style="${buttonStyles}">BROWSE OUR MENU</a>
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
    attachments: emailAttachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-size: 24px; color: #d4af37;">New Inquiry</h1>
          </div>
          <div style="${contentStyles}">
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
            <p style="margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</p>
            ${contactData.address ? `<p style="margin-bottom: 10px;"><strong>Address:</strong> ${contactData.address}</p>` : ''}
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
    attachments: emailAttachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 1px; color: #d4af37;">Lola's Lumpia</h1>
          </div>
          <div style="${contentStyles}">
            <h2 style="color: #3a1e4d; font-family: 'Playfair Display', serif; margin-top: 0; text-align: center;">You're on the list!</h2>
            <p style="font-size: 16px; line-height: 1.6; text-align: center;">Thanks for joining our newsletter. You'll be the first to know about new flavors, special events, and Lola's secret tips.</p>
            <p style="font-size: 16px; line-height: 1.6; text-align: center; margin-top: 20px;">Ready to see what's cooking today?</p>
            <div style="text-align: center;">
              <a href="${APP_URL}/menu" style="${buttonStyles}">EXPLORE OUR MENU</a>
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

const sendOrderEmails = async (orderData) => {
  const { customerName, email, phone, orderType, address, notes, items, total } = orderData;

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #eae1d3;">
        <div style="font-weight: 700; color: #3a1e4d;">${item.name}</div>
        <div style="font-size: 12px; color: #5d4e41;">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eae1d3; text-align: right; font-weight: 700;">
        $${(item.quantity * item.price).toFixed(2)}
      </td>
    </tr>
  `).join('');

  // Email to Customer
  const userMailOptions = {
    from: `"Lola's Lumpia" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Order Confirmation - Lola\'s Lumpia',
    attachments: emailAttachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; letter-spacing: 1px; color: #d4af37;">Order Received!</h1>
          </div>
          <div style="${contentStyles}">
            <h2 style="color: #3a1e4d; font-family: 'Playfair Display', serif; margin-top: 0;">Salamat, ${customerName}!</h2>
            <p style="font-size: 16px; line-height: 1.6;">Lola is excited to prepare your order! We've received your ${orderType} request and will have it ready for you soon.</p>
            
            <div style="background: #faf7f2; padding: 20px; border-radius: 12px; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #3a1e4d; font-size: 18px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding: 15px 0 0; font-size: 18px; font-weight: 800; color: #3a1e4d;">Total</td>
                  <td style="padding: 15px 0 0; font-size: 18px; font-weight: 800; color: #3a1e4d; text-align: right;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 25px;">
              <h4 style="margin-bottom: 5px; color: #3a1e4d;">Details:</h4>
              <p style="margin: 0; font-size: 14px;"><strong>Method:</strong> ${orderType.toUpperCase()}</p>
              ${address ? `<p style="margin: 5px 0 0; font-size: 14px;"><strong>Address:</strong> ${address}</p>` : ''}
              ${notes ? `<p style="margin: 5px 0 0; font-size: 14px;"><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>

            <p style="font-size: 14px; color: #5d4e41;">We'll contact you at ${phone} if we have any questions.</p>
            
            <hr style="border: none; border-top: 1px solid #eae1d3; margin: 30px 0;">
            <p style="font-style: italic; color: #5d4e41; text-align: center; font-size: 14px;">"Authentic Filipino Lumpia, From Lola's Kitchen to Yours"</p>
          </div>
        </div>
      </div>
    `,
  };

  // Email to Admin
  const adminMailOptions = {
    from: `"New Order" <${process.env.EMAIL_USER}>`,
    to: 'info@codingcarranza.com',
    subject: `New ${orderType.toUpperCase()} Order from ${customerName}`,
    attachments: emailAttachments,
    html: `
      <div style="${commonStyles}">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="${headerStyles}">
            ${logoHtml}
            <h1 style="margin: 0; font-size: 24px; color: #d4af37;">New Order Received</h1>
          </div>
          <div style="${contentStyles}">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Type:</strong> ${orderType.toUpperCase()}</p>
            ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
            
            <div style="background: #faf7f2; padding: 20px; border-radius: 12px; margin-top: 20px;">
              <h3 style="margin-top: 0;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding-top: 15px; font-weight: 800;">Total Revenue</td>
                  <td style="padding-top: 15px; font-weight: 800; text-align: right;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </div>
            ${notes ? `<p style="margin-top: 20px;"><strong>Special Instructions:</strong><br>${notes}</p>` : ''}
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(userMailOptions);
  await transporter.sendMail(adminMailOptions);
};

module.exports = { sendContactEmails, sendNewsletterWelcome, sendOrderEmails };
