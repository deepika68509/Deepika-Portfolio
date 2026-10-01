const recipient = "deepika.shantappa@gmail.com";
const web3FormsAccessKey = "b8f24e7a-bee3-4134-a08e-4a6765b79ac5";

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

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: web3FormsAccessKey,
        subject: `Portfolio enquiry from ${name}`,
        from_name: "Deepika Portfolio",
        to: process.env.CONTACT_EMAIL || recipient,
        name,
        email,
        organization,
        projectType,
        message,
      }),
    });
    const result = await response.json().catch(() => ({})) as { message?: string; success?: boolean };

    if (!response.ok || result.success === false) {
      return Response.json({ error: result.message || "The message could not be sent. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The message could not be sent. Please try again." }, { status: 400 });
  }
}
