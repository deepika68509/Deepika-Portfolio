const recipient = "deepika.shantappa@gmail.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const organization = String(payload.organization ?? "").trim();
    const projectType = String(payload.projectType ?? "").trim();
    const message = String(payload.message ?? "").trim();

    if (!name || !email || !message) {
      return Response.json({ error: "Please complete your name, email, and project details." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Email service is not configured yet." }, { status: 500 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL || recipient],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company / Organisation: ${organization || "Not provided"}`,
          `Project type: ${projectType || "Not provided"}`,
          "",
          "Project details:",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      return Response.json({ error: "The message could not be sent. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The message could not be sent. Please try again." }, { status: 400 });
  }
}
