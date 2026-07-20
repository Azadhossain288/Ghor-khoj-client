const API_BASE = "https://ghor-khoj-server.onrender.com";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include", // sends Better Auth session cookie
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Request failed");
  return res.json();
}

export const api = {
  getProperties: (params: URLSearchParams) => request(`/api/properties?${params.toString()}`),
  getProperty: (id: string) => request(`/api/properties/${id}`),
  getMyProperties: () => request(`/api/properties/user/mine`),
  addProperty: (data: any) => request(`/api/properties`, { method: "POST", body: JSON.stringify(data) }),
  updateProperty: (id: string, data: any) => request(`/api/properties/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProperty: (id: string) => request(`/api/properties/${id}`, { method: "DELETE" }),
  trackInteraction: (propertyId: string, type: string) =>
    request(`/api/interactions/track`, { method: "POST", body: JSON.stringify({ propertyId, type }) }),
  getRecommendations: () => request(`/api/recommendations`),
  getChatHistory: (sessionId: string) => request(`/api/chat/history/${sessionId}`),
  sendInquiry: (data: any) => request(`/api/inquiries`, { method: "POST", body: JSON.stringify(data) }),
};