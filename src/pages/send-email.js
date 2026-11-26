export const prerender = false;

export async function POST(context) {
    try {
        const data = await context.request.json();
        const { name, phone, email, service, carModel, year, address, description } = data;

        // Validación básica
        if (!name || !phone || !email) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Access environment variables from Cloudflare runtime
        const RESEND_API_KEY = context.locals?.runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

        // Validación de API Key de Resend
        if (!RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY environment variable');
            return new Response(
                JSON.stringify({ message: 'Server configuration error: Missing email API key' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Enviar email usando Resend API (gratis 100 emails/día)
        const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'HRZ Wheels <hector@hrzwheel.com>', // Email autenticado
                to:  ['hector@hrzwheel.com'], // Email de destino (temporal)
                reply_to: email,
                subject: `✨ New Quote Request from ${name} - ${service}`,
                html: generateEmailHTML({ name, phone, email, service, carModel, year, address, description }),
                attachments: data.attachments || []
            })
        });

        const responseData = await emailResponse.json();

        if (!emailResponse.ok) {
            console.error('Resend API error:', JSON.stringify(responseData, null, 2));
            console.error('Response status:', emailResponse.status);
            console.error('Response headers:', Object.fromEntries(emailResponse.headers.entries()));

            return new Response(
                JSON.stringify({
                    message: 'Email API error',
                    error: responseData.message || emailResponse.statusText,
                    details: responseData
                }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        console.log('Email sent successfully:', responseData);
        return new Response(
            JSON.stringify({ message: 'Email sent successfully', id: responseData.id }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to send email', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

function generateEmailHTML({ name, phone, email, service, carModel, year, address, description }) {
    const firstName = (name || '').trim().split(/\s+/)[0] || 'there';
    const e164 = '+1' + String(phone || '').replace(/\D/g, '').slice(-10);

    const smsHref = `sms:${e164}?&body=${encodeURIComponent(
        `Hi ${firstName}, this is Hector from HRZ Wheels about your ${service} quote request. When is a good time to talk?`
    )}`;

    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
        `Re: Your ${service} quote request - HRZ Wheels`
    )}&body=${encodeURIComponent(
        `Hi ${firstName},\n\nThanks for your quote request for ${service}` +
        `${carModel ? ` on your ${year ? year + ' ' : ''}${carModel}` : ''}.\n\n` +
        `I'd like to get you an exact price — when is a good time to talk?\n\n` +
        `Best regards,\nHector\nHRZ Wheels\n(626) 863-2885`
    )}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request - HRZ Wheels</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.12);">
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #d97706 100%); padding: 50px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #000; font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 4px;">
                                HRZ WHEELS
                            </h1>
                            <div style="margin: 12px auto 0; width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #000, transparent);"></div>
                            <p style="margin: 12px 0 0 0; color: rgba(0,0,0,0.8); font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">
                                Premium Wheel Restoration
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 40px 30px 40px;">
                            <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 2px solid #f59e0b; border-radius: 20px; padding: 28px; text-align: center; box-shadow: 0 8px 24px rgba(245,158,11,0.15);">
                                <h2 style="margin: 12px 0 0 0; color: #92400e; font-size: 28px; font-weight: 800;">
                                    🎉 Quote Request Received
                                </h2>
                                <p style="margin: 10px 0 0 0; color: #b45309; font-size: 15px; font-weight: 600;">
                                    A customer is interested in your premium services
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <div style="background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); border-radius: 16px; padding: 24px 28px; box-shadow: 0 8px 24px rgba(30,64,175,0.2);">
                                <p style="margin: 0; color: #93c5fd; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                                    Service Requested
                                </p>
                                <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 800;">
                                    ${service}
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <div style="border-left: 4px solid #f59e0b; padding-left: 20px; margin-bottom: 20px;">
                                <h3 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                                    👤 Customer Details
                                </h3>
                            </div>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%); border: 2px solid #fde68a; border-radius: 12px;">
                                        <p style="margin: 0; color: #92400e; font-size: 11px; font-weight: 700; text-transform: uppercase;">Full Name</p>
                                        <p style="margin: 6px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">${name}</p>
                                    </td>
                                </tr>
                                <tr><td style="height: 12px;"></td></tr>
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #fef3c7 0%, #ffffff 100%); border: 2px solid #fbbf24; border-radius: 12px;">
                                        <p style="margin: 0; color: #92400e; font-size: 11px; font-weight: 700; text-transform: uppercase;">Phone Number</p>
                                        <p style="margin: 6px 0 0 0; color: #d97706; font-size: 18px; font-weight: 800;">
                                            <a href="tel:${e164}" style="color: #d97706; text-decoration: none;">📞 ${phone}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr><td style="height: 12px;"></td></tr>
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #dbeafe 0%, #ffffff 100%); border: 2px solid #93c5fd; border-radius: 12px;">
                                        <p style="margin: 0; color: #1e3a8a; font-size: 11px; font-weight: 700; text-transform: uppercase;">Email Address</p>
                                        <p style="margin: 6px 0 0 0; color: #1e40af; font-size: 18px; font-weight: 700;">
                                            <a href="mailto:${email}" style="color: #1e40af; text-decoration: none;">✉️ ${email}</a>
                                        </p>
                                    </td>
                                </tr>
                                ${address ? `
                                <tr><td style="height: 12px;"></td></tr>
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%); border: 2px solid #d1d5db; border-radius: 12px;">
                                        <p style="margin: 0; color: #374151; font-size: 11px; font-weight: 700; text-transform: uppercase;">Service Address</p>
                                        <p style="margin: 6px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">
                                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" style="color: #1f2937; text-decoration: none;">📍 ${address}</a>
                                        </p>
                                        <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">
                                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" style="color: #3b82f6; text-decoration: underline;">🗺️ Open in Google Maps</a>
                                        </p>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                        </td>
                    </tr>

                    ${carModel || year ? `
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <div style="border-left: 4px solid #f59e0b; padding-left: 20px; margin-bottom: 20px;">
                                <h3 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 800; text-transform: uppercase;">
                                    🚗 Vehicle Information
                                </h3>
                            </div>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                ${carModel ? `
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%); border: 2px solid #e5e7eb; border-radius: 12px;">
                                        <p style="margin: 0; color: #374151; font-size: 11px; font-weight: 700; text-transform: uppercase;">Car Model</p>
                                        <p style="margin: 6px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">${carModel}</p>
                                    </td>
                                </tr>
                                ` : ''}
                                ${carModel && year ? '<tr><td style="height: 12px;"></td></tr>' : ''}
                                ${year ? `
                                <tr>
                                    <td style="padding: 18px 24px; background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%); border: 2px solid #e5e7eb; border-radius: 12px;">
                                        <p style="margin: 0; color: #374151; font-size: 11px; font-weight: 700; text-transform: uppercase;">Year</p>
                                        <p style="margin: 6px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">${year}</p>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    ${description ? `
                    <tr>
                        <td style="padding: 0 40px 25px 40px;">
                            <div style="border-left: 4px solid #f59e0b; padding-left: 20px; margin-bottom: 20px;">
                                <h3 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 800; text-transform: uppercase;">
                                    💬 Customer Message
                                </h3>
                            </div>
                            <div style="background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%); border: 2px solid #bfdbfe; border-radius: 16px; padding: 24px 28px; border-left: 6px solid #3b82f6;">
                                <p style="margin: 0; color: #1e3a8a; font-size: 16px; line-height: 1.7; font-weight: 500;">
                                    "${description}"
                                </p>
                            </div>
                        </td>
                    </tr>
                    ` : ''}

                    <tr>
                        <td style="padding: 35px 40px 45px 40px; text-align: center;">
                            <a href="tel:${e164}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #d97706 100%); color: #000; text-decoration: none; padding: 18px 48px; border-radius: 14px; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 8px 24px rgba(245,158,11,0.35);">
                                📞 CALL CUSTOMER NOW
                            </a>
                            <br>
                            <a href="${smsHref}" style="display: inline-block; margin-top: 14px; background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 14px; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 8px 24px rgba(30,64,175,0.3);">
                                💬 TEXT CUSTOMER NOW
                            </a>
                            <br>
                            <a href="${mailtoHref}" style="display: inline-block; margin-top: 14px; background: #ffffff; color: #92400e; text-decoration: none; padding: 16px 46px; border-radius: 14px; border: 2px solid #f59e0b; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
                                ✉️ REPLY BY EMAIL
                            </a>
                            <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                                Or just hit <strong style="color: #1f2937;">Reply</strong> — it goes straight to ${name} at ${email}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background: linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%); padding: 32px 40px; text-align: center;">
                            <p style="margin: 0; color: #78716c; font-size: 13px; line-height: 1.6; font-weight: 500;">
                                This quote request was submitted via the <strong style="color: #d97706;">HRZ Wheels</strong> website<br>
                                <span style="color: #a8a29e; font-size: 12px;">Premium Wheel Restoration Services</span>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
