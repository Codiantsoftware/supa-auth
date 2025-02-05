'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

/**
 * Login component for authenticating users with Supabase URL and Service Role Key.
 * @returns {JSX.Element} The login form component.
 */
export default function Login() {
    const [credentials, setCredentials] = useState({ url: '', key: '' });
    const router = useRouter();

    /**
     * Handles form submission by sending credentials to the authentication API.
     * If authentication is successful, stores auth data in sessionStorage and navigates to '/home'.
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (res.status == 400) {
                const errorData = await res.json();
                console.log(errorData, "errorData");
                toast.error(errorData.message);
                return;
            }

            const data = await res.json();
            sessionStorage.setItem('authData', JSON.stringify(data));
            router.push('/home');
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    return (
        <div className='authPage'>
             <div className="container">
                <div className="authPage_inner">
                    <div className="authPage_form">
                        <h1 className="authPage_title">Welcome to Our App</h1>
                        <p className="authPage_para">
                        Getting started is easy. Just click below to log in!
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className='formGroup'>
                                <label>Supabase URL</label>
                                <input
                                    type="text"
                                    placeholder="Enter Supabase URL"
                                    onChange={(e) => setCredentials({ ...credentials, url: e.target.value })}
                                />
                            </div>
                            <div className='formGroup'>
                                <label>Service Role Key</label>
                                <input
                                    type="text"
                                    placeholder="Enter Service Role Key"
                                    onChange={(e) => setCredentials({ ...credentials, key: e.target.value })}
                                />
                            </div>


                            <button className='btn authPage_btn' type="submit">Authenticate</button>
                        </form>
                    </div>
                    <div className="authPage_img">
                        {/* <img src="mainpagelogo.webp" alt="logo" /> */}
                        <motion.img
                            src="mainpagelogo.webp"
                            alt="Shaking Image"
                            initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }} 
                                transition={{ ease: "easeInOut", duration:1, delay: 0.1 }}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
}
