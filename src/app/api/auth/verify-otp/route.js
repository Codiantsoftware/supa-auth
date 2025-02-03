import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, otp } = await req.json();

    // Call Supabase to verify OTP
    const {
        data: { session },
        error,
    } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
    })

    console.log(session, "session");
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'OTP verified successfully!' }), { status: 200 });
}
