import { axiosInstance } from "../api/baseQuery";
import { store } from "../store";


let sessionId: string | null = null;

function getSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }
  return sessionId;
}

export async function trackEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  try {
    const token = store.getState().auth.accessToken;

    await axiosInstance.post(
      "/analytics/events",
      {
        eventName,
        sessionId: getSessionId(),
        properties,
      },
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    );
  } catch (err) {
    console.warn("[trackEvent] failed to log event:", eventName, err);
  }
}