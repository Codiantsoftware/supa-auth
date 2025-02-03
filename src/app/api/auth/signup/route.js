import { signupLogger } from '../../../../lib/logger';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
    const { email, password, name, phoneNumber } = await req.json();

    const { data, error } = await supabase.auth.signUp({ email, password });
    const userObject = data;
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    else {
        const obj = {
            id: userObject.user.id,
            email,
            name,
            phone_number: phoneNumber,
            password
        }
        console.log(obj);

        const { data, error } = await supabase.from('user').insert([obj]);
        if (error) {
            signupLogger.error(`Signup failed for email: ${email} - ${error.message}`);
            return new Response(JSON.stringify({ message: 'Signup failed!' }), { status: 500 });
        } else {
            signupLogger.info(`Signup successful for email: ${email}`);
            return new Response(JSON.stringify({ message: 'Signup successful!' }), { status: 200 });
        }
    }
}
