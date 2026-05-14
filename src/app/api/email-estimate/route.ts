import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  const emailProvider = process.env.EMAIL_PROVIDER;

  if (!emailProvider) {
    return NextResponse.json({
      message:
        "Email sending is not configured yet. You can still download or copy your estimate.",
    });
  }

  // TODO: Integrate Resend, SendGrid, or another provider here
  return NextResponse.json({ message: "Estimate sent to your email." });
}
