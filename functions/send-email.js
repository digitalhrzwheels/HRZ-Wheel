// Cloudflare Workers function for sending emails with Resend
export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        const { name, phone, email, service, carModel, year, address, description, turnstileToken } = data;

        // Validación de Turnstile
        if (!turnstileToken) {
            return new Response(
                JSON.stringify({ message: 'Turnstile token missing' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Verificar Turnstile con Cloudflare
        const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: context.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken,
            }),
        });

        const turnstileResult = await turnstileResponse.json();

        // Verificar que la validación fue exitosa
        if (!turnstileResult.success) {
            console.error('Turnstile verification failed:', turnstileResult);
            return new Response(
                JSON.stringify({
                    message: 'Security verification failed. Please try again.',
                    errors: turnstileResult['error-codes']
                }),
                { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
        }

        console.log('Turnstile verification successful');

        // Validación básica
        if (!name || !phone || !email) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validación de API Key de Resend
        if (!context.env.RESEND_API_KEY) {
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
                'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'HRZ Wheels <contact@hrzwheelrepair.com>', // Email autenticado
                to: ['hector@hrzwheel.com'], // Email de destino
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
                                            <a href="tel:${phone}" style="color: #d97706; text-decoration: none;">📞 ${phone}</a>
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
                                        <p style="margin: 6px 0 0 0; color: #1f2937; font-size: 18px; font-weight: 700;">📍 ${address}</p>
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
                            <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #d97706 100%); color: #000; text-decoration: none; padding: 18px 48px; border-radius: 14px; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 8px 24px rgba(245,158,11,0.35);">
                                📞 CALL CUSTOMER NOW
                            </a>
                            <p style="margin: 18px 0 0 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                                Or reply to this email to contact <strong style="color: #1f2937;">${name}</strong> directly
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
