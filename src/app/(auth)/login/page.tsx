import LoginForm from "@/components/auth/LoginForm";
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Login = () => {
  return (
    <main>
      {/* LoginForm-এর ভেতরে useSearchParams() ব্যবহার করা হয়েছে, 
                তাই ক্লায়েন্ট-সাইড রেন্ডারিং সেফ রাখার জন্য Suspense দিয়ে র‍্যাপ করা জরুরি।
            */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40 animate-pulse">
                Loading TRENDly Auth...
              </p>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
};

export default Login;
