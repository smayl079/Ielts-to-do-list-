export function getToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("token") || "";
}

export function saveSession(token, user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getSessionUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export function isAuthenticated() {
  return Boolean(getToken());
}
