// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

export const links: LinksFunction = () => [...(stylesheet ? [{ rel: "stylesheet", href: stylesheet }] : [])];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="px-10 pt-5">
        <Link to="/" prefetch="intent" className="text-2xl font-semibold">
          Movies<span className="text-teal-500">DB</span>
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
