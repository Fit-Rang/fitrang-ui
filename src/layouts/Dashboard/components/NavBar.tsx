import Logo from "@assets/Shirt.svg";
import Auth from "@assets/icons/auth.svg";
import Bell from "@assets/icons/bell-solid.svg";
import Dossier from "@assets/icons/dossier.svg";
import Search from "@assets/icons/search.svg";
import Profile from "@assets/icons/user.svg";
import { useRouter } from "@routes/hooks";
import { usePathname } from "@routes/hooks";
import { useAuthStore } from "../../../store/authStore";
import { useEffect, useRef, useState } from "react";
import { handleGetSessionId } from "../../../services/handleGetSessionId";
import handleGetNotifications from "../../../services/handleGetNotifications";
import handleGrantDossierAccess from "../../../services/handleGrantDossierAccess";
import handleMarkRead from "../../../services/handleMarkRead";

type NotificationMessage = {
  id: number;
  sender_name: string;
  text: string;
  type: string;
  is_read: boolean;
  created_at: string;
};

export function NavBar() {
  const router = useRouter();
  const currentPath = usePathname();
  const { isAuthenticated } = useAuthStore();
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const dropdownRef = useRef(null);

  const handleNavigate = (path: string) => {
    router.push(`/${path}`);
  };

  const getNavItemClasses = (path: string) => {
    const isActive = currentPath === path;
    return `${
      isActive ? "bg-grey text-white" : "hover:bg-grey hover:text-white"
    } py-2 px-3 rounded border border-grey flex justify-center items-center font-bold gap-2 font-dancing text-xl hover:cursor-pointer`;
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) fetchNotifications();
  };

  const fetchNotifications = async () => {
    try {
      const data = await handleGetNotifications();
      setNotifications(data.messages || []);
      console.log("Fetched all notifications");
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleGrant = async (user_id: string, notify_id: string) => {
    try {
      const data = await handleGrantDossierAccess(user_id);
      setNotifications((prev) => prev.filter((n) => n.id.toString() !== notify_id));
      const res = await handleMarkRead(notify_id);
    } catch (error) {
      console.error("Grant failed:", error);
    }
  };

  const handleIgnore = async (id: string) => {
    try {
      const res = await handleMarkRead(id);
      setNotifications((prev) => prev.filter((n) => n.id.toString() !== id));
    } catch (error) {
      console.error("Request Failed", error);
    }
  };

  useEffect(() => {
    let ws: WebSocket;

    const setupWebSocket = async () => {
      if (!isAuthenticated || !token) return;

      try {
        const sessionId = await handleGetSessionId();
        if (!sessionId) return;

        await fetchNotifications();

        ws = new WebSocket(`ws://127.0.0.1:8000/notification-ws/ws/${sessionId}/`);

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data) as NotificationMessage;
          setNotifications((prev) => [data, ...prev]);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } catch (error) {
        console.error("Error setting up WebSocket:", error);
      }
    };

    setupWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, [isAuthenticated, token]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  function extractSenderId(text: string): string | null {
    const match = text.match(/\(Id (\w+)\)/);
    return match ? match[1] : null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-transparent z-10">
      <button
        onClick={() => handleNavigate("")}
        aria-label="Go to homepage"
        className="h-[120px] hover:cursor-pointer"
      >
        <img src={Logo} alt="Main Logo" className="h-full" />
      </button>

      {token && (
        <ul className="hidden lg:flex md:flex space-x-4 bg-gold px-5 py-2 rounded-lg items-center">
          {[
            { label: "Dossiers", path: "dossiers", icon: Dossier },
            { label: "Search", path: "search", icon: Search },
            { label: "Profile", path: "profile", icon: Profile },
          ].map(({ label, path, icon }) => (
            <li key={path}>
              <button
                onClick={() => handleNavigate(path)}
                className={getNavItemClasses(`/${path}`)}
                aria-label={`Go to ${label}`}
              >
                <img src={icon} alt={`${label} icon`} className="h-10" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex space-x-6 pr-12 items-center">
        {!token && !isAuthenticated ? (
          <li>
            <button
              onClick={() => handleNavigate("auth")}
              aria-label="Go to authentication"
              className="group"
            >
              <img
                src={Auth}
                alt="Auth icon"
                className="h-10 hover:cursor-pointer transform hover:translate-y-1 transition-transform duration-200"
              />
            </button>
          </li>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="hover:cursor-pointer"
              aria-label="Toggle notifications dropdown"
            >
              <img src={Bell} alt="Notifications" className="h-[40px]" />
            </button>

            {isDropdownOpen && (
              <article className="absolute right-0 mt-2 w-fit bg-grey border border-gold rounded-md shadow-lg z-50 max-h-96 overflow-auto">
                <ul className="text-sm text-white divide-y divide-gray-300 px-2 py-1">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-2 text-center">No notifications</li>
                  ) : (
                    notifications.map((n) => (
                      <li key={n.id} className="px-4 py-2 space-y-2">
                        <p 
                          className="text-blue-600 underline cursor-pointer"
                          onClick={() => handleNavigate(`profile/${extractSenderId(n.text)}`)}
                        >
                          {n.text}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleGrant(extractSenderId(n.text), n.id.toString())}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                          >
                            Grant
                          </button>
                          <button
                            onClick={() => handleIgnore(n.id.toString())}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                          >
                            Ignore
                          </button>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </article>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
}

