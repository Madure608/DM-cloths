import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("dm_user_token"), []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dm_user_token");
    navigate("/");
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate">Account</p>
        <h1 className="mt-4 font-display text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-slate">
          Your account is ready. We will surface order history once the checkout
          flow is fully connected.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="h-11 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            onClick={() => navigate("/customize")}
          >
            Start new order
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-borderSoft px-6 text-xs font-semibold uppercase tracking-[0.2em]"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;
