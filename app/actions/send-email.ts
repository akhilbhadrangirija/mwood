'use server';

import nodemailer from 'nodemailer';

type FormData = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
};

type EmailResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function sendContactEmail(formData: FormData): Promise<EmailResponse> {
  try {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.service) {
      return {
        success: false,
        error: 'Missing required fields',
      } as EmailResponse;
    }

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@mwooduae.com';

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('Missing email configuration');
      return {
        success: false,
        error: 'Email service is not configured. Please contact us directly.',
      } as EmailResponse;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Service labels mapping
    const serviceLabels: Record<string, string> = {
      sofa: 'Sofa Cleaning',
      carpet: 'Carpet Cleaning',
      curtain: 'Curtain Cleaning',
      other: 'Other Service',
    };

    const serviceLabel = serviceLabels[formData.service] || formData.service;

    // Email content
    const mailOptions = {
      from: `"MWood Website" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: formData.email || smtpUser,
      subject: `New Contact Form Submission - ${serviceLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007ec7;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
            ${formData.email ? `<p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>` : ''}
            <p><strong>Service:</strong> ${serviceLabel}</p>
            ${formData.message ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${formData.message}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px;">This email was sent from the MWood Services contact form.</p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}
Service: ${serviceLabel}
${formData.message ? `\nMessage:\n${formData.message}` : ''}

This email was sent from the MWood Services contact form.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Verify email was sent successfully
    console.log('Email sent successfully:', info.messageId);
    
    return {
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
    } as EmailResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error details:', errorMessage);
    return {
      success: false,
      error: 'Failed to send message. Please try again or contact us directly.',
    } as EmailResponse;
  }
}

