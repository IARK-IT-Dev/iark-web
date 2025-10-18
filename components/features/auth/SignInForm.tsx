"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function SignInForm() {
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data: profile, error: lookupError } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", username)
        .single();

      if (lookupError || !profile) {
        throw new Error("Username not found");
      }

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: profile.email,
          password,
        });

      if (loginError) {
        throw new Error("Invalid password");
      }

      router.push("/dashboard");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Selamat Datang Kembali
          </h1>
          <p className="text-gray-600">
            Masuk untuk melanjutkan kontribusi Anda
          </p>
        </div>

        {/* Username/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username Anda"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-iark-red focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-iark-red focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-600 text-sm font-medium text-center">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg shadow-lg text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-iark-red hover:bg-red-700"
            }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
