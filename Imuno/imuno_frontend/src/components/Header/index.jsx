import "./style.css";
import logout from "../../img/logout.svg";

export function Header({
  title = "Dashboard",
  subtitle = "",
  userName = "João",
}) {
  return (
    <header className="header">
      <div className="header-left"></div>

      <div className="header-right">
        <span className="user-name">{userName}</span>

        <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>

        <img
          src={logout}
          alt="logout-button"
          className="logout-button"
          onClick={() => {
            window.location.href = "/login";
          }}
        />
      </div>
    </header>
  );
}
