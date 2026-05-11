import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminStatus, loginAdmin } from "../../api/admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [hasAdmin, setHasAdmin] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      try {
        const data = await fetchAdminStatus();
        if (isMounted) {
          setHasAdmin(Boolean(data?.hasAdmin));
        }
      } catch (err) {
        if (isMounted) {
          setHasAdmin(true);
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    loadStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem("dm_admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-stone/40 bg-white/80 p-8 shadow-sm">
        <h1 className="font-display text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-clay">
          Secure access for DM CLOTHS inventory.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm">
            <span className="text-clay">Email</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-clay">Password</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {status.error && (
            <p className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
              {status.error}
            </p>
          )}
          <button
            type="submit"
            className="h-11 rounded-full bg-ink text-sm font-semibold uppercase tracking-[0.2em] text-sand"
            disabled={status.loading}
          >
            {status.loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        {!checking && !hasAdmin && (
          <div className="mt-6 rounded-2xl border border-stone/40 bg-sand/70 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-clay">
              No admin found
            </p>
            <p className="mt-2 text-sm text-clay">
              Create the first admin account to start managing inventory.
            </p>
            <Link
              className="mt-4 inline-flex h-10 items-center rounded-full bg-ink px-5 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
              to="/admin/signup"
            >
              Create admin account
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminLogin;
