import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {Button} from "@/components/ui/button.tsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [ok, setOk]             = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Login failed (${res.status})`);
      }

      const data = await res.json().catch(() => ({}));
      const token = data.jwt || data.token;
      if (!token) throw new Error("No token in response");

      localStorage.setItem("jwt", token);
      setOk(true);
      const decoded: any = jwtDecode(token);

        if (decoded.roles.includes("ROLE_ADMIN")) {
            navigate("/admin-dashboard");
        } else if (decoded.roles.includes("ROLE_USER")) {
            navigate("/user-dashboard");
        } else {
            navigate("/");
        }



    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourname"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="text-sm border border-red-400/40 bg-red-50 text-red-700 rounded-md px-3 py-2">
            {error}
          </div>
        )}
        {ok && (
          <div className="text-sm border border-emerald-400/40 bg-emerald-50 text-emerald-700 rounded-md px-3 py-2">
            Login successful ✅
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </Button>

      </form>
    </div>
  );
}