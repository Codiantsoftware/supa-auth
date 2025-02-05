"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="authPage">
      <div className="authPage_inner">
      <h1 className="authPage_title">Welcome to Our App</h1>
      <p className="authPage_para">
        Getting started is easy. Just click below to log in!
      </p>
      <button className="btn authPage_btn" type="button" onClick={handleSignIn}>
        Sign In
      </button>
      </div>
    </div>
  );
}
