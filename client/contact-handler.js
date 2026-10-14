const { isIP } = require('node:net');
const validEmail = (value) => typeof value === 'string' && value.length <= 254 && /^[^\s@<>\r\n,;]+@[^\s@<>\r\n,;]+\.[^\s@<>\r\n,;]+$/.test(value);

function createContactHandler(options = {}) {
  const env = options.env || process.env;
  const attempts = new Map();
  let transporter;
  function reply(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(JSON.stringify(data));
  }
  function readBody(req) {
    return new Promise((resolve, reject) => {
      const chunks = []; let bytes = 0; let tooLarge = false;
      req.setTimeout(10000, () => { reject(new Error('timeout')); req.resume(); });
      req.on('data', chunk => { bytes += chunk.length; if (bytes > 16384) tooLarge = true; else chunks.push(chunk); });
      req.on('end', () => { req.setTimeout(0); if (tooLarge) reject(new Error('size')); else resolve(Buffer.concat(chunks).toString('utf8')); });
      req.on('error', reject);
    });
  }
  return async function contact(req, res) {
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(res, 405, { error: 'Use the contact form to send a message.' }); }
    if (!['https://mozytech.com.ng', 'https://www.mozytech.com.ng'].includes(req.headers.origin)) return reply(res, 403, { error: 'Please send your message from the portfolio website.' });
    if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return reply(res, 415, { error: 'Invalid message format.' });
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    const ip = isIP(forwarded) ? forwarded : req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    if (!attempts.has(ip) && attempts.size >= 2048) return reply(res, 503, { error: 'Please try again shortly.' });
    const bucket = attempts.get(ip) || { count: 0, until: now + 15 * 60000 };
    if (bucket.count >= 5) { res.setHeader('Retry-After', Math.ceil((bucket.until - now) / 1000)); return reply(res, 429, { error: 'Too many attempts. Please try again in 15 minutes.' }); }
    bucket.count++; attempts.set(ip, bucket);
    let data;
    try { data = JSON.parse(await readBody(req)); }
    catch (error) { return reply(res, error.message === 'size' ? 413 : 400, { error: 'Please enter a valid message.' }); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(res, 400, { error: 'Please enter a valid message.' });
    if (typeof data.website === 'string' && data.website.trim()) return reply(res, 201, { success: true });
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';
    if (!name || name.length > 100 || /[\r\n\x00]/.test(name) || !validEmail(email) || !message || message.length > 2000 || message.includes('\x00')) return reply(res, 400, { error: 'Please check your name, email and message (maximum 2,000 characters).' });
    const port = Number(env.SMTP_PORT || 465);
    if (!env.SMTP_HOST || !env.SMTP_PASSWORD || !validEmail(env.SMTP_USER) || !validEmail(env.CONTACT_TO) || ![465, 587].includes(port)) return reply(res, 503, { error: 'Messaging is temporarily unavailable. Please try again later.' });
    try {
      let sendMail = options.sendMail;
      if (!sendMail) {
        if (!transporter) transporter = require('nodemailer').createTransport({
          host: env.SMTP_HOST, port, secure: port === 465, requireTLS: port === 587,
          auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
          connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000,
          disableFileAccess: true, disableUrlAccess: true,
        });
        sendMail = transporter.sendMail.bind(transporter);
      }
      const result = await sendMail({
        from: { name: 'MOZYTECH Portfolio', address: env.SMTP_USER },
        to: env.CONTACT_TO, replyTo: email,
        subject: 'New MOZYTECH portfolio enquiry',
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        disableFileAccess: true, disableUrlAccess: true,
      });
      if (!result.accepted || result.accepted.length === 0) throw new Error('Message not accepted');
      return reply(res, 201, { success: true });
    } catch (error) {
      console.error('Portfolio email delivery failed:', error.code || 'MAIL_FAILED');
      return reply(res, 502, { error: 'Your message could not be sent. Please try again later.' });
    }
  };
}
module.exports = { createContactHandler };
