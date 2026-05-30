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
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
          Account overview
        </p>
        <h1 className="mt-4 font-display text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-slate">
          Manage your orders, wish list, and delivery details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="h-11 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.25em] text-white"
            onClick={() => navigate("/customize")}
          >
            Start new order
          </button>
          <button
            type="button"
            className="h-11 rounded-full border border-borderSoft px-6 text-xs font-semibold uppercase tracking-[0.25em]"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            My wish list
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate">
            <div className="flex items-center justify-between rounded-2xl border border-borderSoft px-4 py-3">
              <span>Soft ash tee</span>
              <span>Rs. 2,990</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-borderSoft px-4 py-3">
              <span>Jet black tee</span>
              <span>Rs. 2,750</span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate">
            Saved addresses
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate">
            <div className="rounded-2xl border border-borderSoft px-4 py-3">
              Colombo 03, Sri Lanka
            </div>
            <div className="rounded-2xl border border-borderSoft px-4 py-3">
              Kandy, Sri Lanka
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
