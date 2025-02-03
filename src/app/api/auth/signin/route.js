import { loginLogger } from '../../../../lib/logger';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, password } = await req.json();

    // const { data: user, error: userError } = await supabase
    //     .from('users')
    //     .select('*')
    //     .eq('email', email)
    //     .single();

    // if (userError || !user) {
    //     return new Response(JSON.stringify({ message: 'User not found. Please sign up first.' }), { status: 400 });
    // }

    loginLogger.info(`Login attempt for email: ${email}`);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
        loginLogger.error(`Login failed for email: ${email} - ${error.message}`);
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    } else {
        return new Response(JSON.stringify({ message: 'OTP sent successfully!' }), { status: 200 });
    }
}
