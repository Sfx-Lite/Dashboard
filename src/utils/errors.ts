type ApiErrorShape = {
  status?: number;
  data?: {
    message?: string;
    error?: string;
  } | string;
};

export function isApiError(err: unknown): err is ApiErrorShape {
  return typeof err === "object" && err !== null && "status" in err;
}

function extractMessage(data: ApiErrorShape["data"]): string | undefined {
  if (!data) return undefined;
  if (typeof data === "string") return data;
  return data.message ?? data.error;
}

export function getAuthErrorMessage(err: unknown): string {
  if (!isApiError(err)) {
    return "Something went wrong. Please try again.";
  }

  const serverMessage = extractMessage(err.data);

  switch (err.status) {
    case 401:
      return serverMessage ?? "Incorrect email/username or password.";
    case 403:
      return serverMessage ?? "This account isn't authorized for admin access.";
    case undefined:
      return "Network error — check your connection and try again.";
    default:
      return serverMessage ?? "Something went wrong. Please try again.";
  }
}

export function getErrorMessage(err: unknown, notFoundMessage?: string): string {
  if (!isApiError(err)) {
    return "Something went wrong. Please try again.";
  }

  const serverMessage = extractMessage(err.data);

  switch (err.status) {
    case 404:
      return notFoundMessage ?? serverMessage ?? "Not found.";
    case undefined:
      return "Network error — check your connection and try again.";
    default:
      return serverMessage ?? "Something went wrong. Please try again.";
  }
}