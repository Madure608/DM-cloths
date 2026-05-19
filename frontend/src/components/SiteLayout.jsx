import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/WhatsApp Image 2026-05-13 at 4.18.03 PM.jpeg";

const SiteLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userToken, setUserToken] = useState(() =>
    localStorage.getItem("dm_user_token")
  );

  useEffect(() => {
    setUserToken(localStorage.getItem("dm_user_token"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("dm_user_token");
    setUserToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="sticky top-0 z-30 bg-ink/95 text-white shadow-sm backdrop-blur">
        <div className="border-b border-white/10">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.3em] text-white/80">
            <span>Delivering across Sri Lanka</span>
            <div className="flex flex-wrap items-center gap-4">
              <span>Hotline: 076-364-9510</span>
              <Link to="/admin/login" className="underline underline-offset-4">
                Sell on DM
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-6 py-4 md:py-5">
            <Link to="/" className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <img
                  src={logo}
                  alt="DM Cloths"
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </span>
              <span className="font-display text-3xl tracking-[0.2em]">
                DM CLOTHS
              </span>
            </Link>

            <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 shadow-sm backdrop-blur">
              <input
                className="w-full border-none bg-transparent text-sm text-white placeholder:text-white/60 outline-none"
                placeholder="Search tees, colors, collections"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-brandBlue px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="17" cy="20" r="1" />
                  <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
                </svg>
                Cart
              </Link>
              {userToken ? (
                <>
                  <Link
                    to="/account"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20a8 8 0 0 1 16 0" />
                    </svg>
                    My Account
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-white/15"
                    onClick={handleLogout}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M20 4v16" />
                    </svg>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M20 4v16" />
                    </svg>
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 rounded-full bg-brandBlue px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white/70">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <Link to="/customize" className="hover:text-white">
                Customize
              </Link>
              <a href="/#collection" className="hover:text-white">
                New arrivals
              </a>
              <a href="/#flash" className="hover:text-white">
                Flash sale
              </a>
              <a href="/#faq" className="hover:text-white">
                Support
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brandOrangeSoft blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 translate-x-1/3 rounded-full bg-brandYellow/40 blur-3xl" />
        <Outlet />
      </main>

      <footer className="border-t border-white/20 bg-ink text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="grid gap-3">
            <p className="font-display text-2xl tracking-[0.2em]">DM CLOTHS</p>
            <p className="text-sm text-white/70">
              Custom tees with a marketplace feel: fresh drops, fast checkout,
              and island-wide delivery.
            </p>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
            <Link to="/customize">Start customizing</Link>
            <Link to="/login">My account</Link>
            <Link to="/signup">Create account</Link>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
            <a href="/#faq">Help center</a>
            <Link
              to="/admin/login"
              className="w-fit rounded-full border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            >
              Admin
            </Link>
            <span className="text-[11px] text-white/70">hello@dmcloths.lk</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
