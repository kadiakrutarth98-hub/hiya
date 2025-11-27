// Vercel Serverless Function - api/submit.js
// Receives onboarding form POST requests and sends email via SendGrid.
// Required Environment Variables in Vercel:
// - SENDGRID_API_KEY : Your SendGrid API key
// - TO_EMAIL : Destination email to receive form submissions
//
// This function expects JSON body with fields: businessName, contactName, phone, email, website, industry, goals (array), package, message

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await request.json();

    const {
      businessName = '',
      contactName = '',
      phone = '',
      email = '',
      website = '',
      industry = '',
      goals = [],
      package: pkg = '',
      message = ''
    } = data;

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL || process.env.SEND_TO_EMAIL;

    if (!SENDGRID_API_KEY || !TO_EMAIL) {
      return response.status(500).json({ error: 'SendGrid API key or destination email not configured.' });
    }

    const subject = `New Hiyadigital Onboarding: ${businessName || contactName || 'New Lead'}`;
    const html = `
      <h2>New Onboarding Form Submission</h2>
      <p><strong>Business Name:</strong> ${escapeHtml(businessName)}</p>
      <p><strong>Contact Name:</strong> ${escapeHtml(contactName)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Website:</strong> ${escapeHtml(website)}</p>
      <p><strong>Industry:</strong> ${escapeHtml(industry)}</p>
      <p><strong>Goals:</strong> ${escapeHtml(goals.join(', '))}</p>
      <p><strong>Package:</strong> ${escapeHtml(pkg)}</p>
      <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      <hr />
      <p>Sent via Hiyadigital site</p>
    `;

    const body = {
      personalizations: [{ to: [{ email: TO_EMAIL }] }],
      from: { email: 'no-reply@hiyadigital.com', name: 'Hiyadigital Website' },
      subject,
      content: [
        { type: 'text/html', value: html }
      ]
    };

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('SendGrid error', res.status, text);
      return response.status(502).json({ error: 'Failed to send email', details: text });
    }

    return response.status(200).json({ ok: true, message: 'Form submitted and email sent.' });

  } catch (err) {
    console.error('Function error', err);
    return response.status(500).json({ error: 'Server error', details: String(err) });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}