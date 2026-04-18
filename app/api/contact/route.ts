import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "milestone.pni@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, course, message } = body;

    // 1. Send Email via Resend
    let emailResult = null;
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_key") {
      try {
        emailResult = await resend.emails.send({
          from: "Milestone Academy <onboarding@resend.dev>", // Replace with verified domain if available
          to: [ADMIN_EMAIL],
          subject: `New Inquiry from ${fullName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #10b981;">New Student Inquiry</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Program:</strong> ${course}</p>
              <p><strong>Message:</strong> ${message || "No message provided."}</p>
              <hr />
              <p style="font-size: 12px; color: #666;">This inquiry was sent from the Milestone Academy contact form.</p>
            </div>
          `,
        });
      } catch (error) {
        console.error("Resend error:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not set or invalid. Skipping email.");
    }

    // 2. Send to Google Sheets Webhook
    let sheetResult = null;
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            course,
            message,
            timestamp: new Date().toISOString(),
          }),
        });
        sheetResult = await response.json();
      } catch (error) {
        console.error("Google Sheets webhook error:", error);
      }
    } else {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set. Skipping spreadsheet sync.");
    }

    return NextResponse.json({ 
      success: true, 
      emailSent: !!emailResult, 
      spreadsheetSynced: !!sheetResult 
    });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
