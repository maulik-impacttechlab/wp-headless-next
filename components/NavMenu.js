// components/NavMenu.js
import Link from "next/link";

const SITE_HOST = "deek57.sg-host.com";

function isInternal(url) {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  try { return new URL(url).hostname === SITE_HOST; } catch { return false; }
}
function toPath(url) {
  if (!url) return "/";
  if (url.startsWith("/")) return url.replace(/\/+$/, "") || "/";
  try {
    const u = new URL(url);
    return (u.pathname + (u.search || "") + (u.hash || "")).replace(/\/+$/, "") || "/";
  } catch { return url; }
}

function ItemLink({ item }) {
  const url = item.url || "#";
  const label = item.label || "";
  const target = item.target || undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  if (isInternal(url)) {
    return (
      <Link className="menu-link main-menu-link" href={toPath(url)} target={target} rel={rel}>
        {label}
      </Link>
    );
  }
  return (
    <a className="menu-link main-menu-link" href={url} target={target} rel={rel}>
      {label}
    </a>
  );
}

export default function NavMenu({ menu, className = "" }) {
  const items = menu?.menuItems?.nodes || [];
  return (
    <ul id="menu-main-menu" className={`mobile-menu main-menu navbar-nav ${className}`}>
      {items.map((item) => {
        const hasChildren = item.childItems?.nodes?.length > 0;
        const liCls = [
          "main-menu-item",
          "menu-item-depth-0",
          "menu-item",
          hasChildren ? "menu-item-has-children" : "",
        ].join(" ");
        return (
          <li key={item.id} className={liCls}>
            <ItemLink item={item} />
            {hasChildren && (
              <ul className="sub-menu menu-depth-1">
                {item.childItems.nodes.map((child) => (
                  <li key={child.id} className="sub-menu-item menu-item-depth-1 menu-item">
                    <ItemLink item={child} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
