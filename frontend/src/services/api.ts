// src/services/api.ts

import { ApiError } from "./api-error";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  token?: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

function getBaseUrl(): string {
  const url =
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error("API URL is not configured");
  }

  return url;
}

export async function apiFetch<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers,
    token,
    cache = "no-store",
    next,
  } = options;

  const url = `${getBaseUrl().replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }
  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (token && !requestHeaders.has("Authorization")) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    method,

    headers: requestHeaders,

    body: body !== undefined ? JSON.stringify(body) : undefined,

    cache,

    next,
  });

  let responseData: unknown = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    responseData = await response.json();
  }

  if (!response.ok) {
    const errorData = responseData as {
      message?: string;
    };

    throw new ApiError(
      response.status,
      errorData?.message || "Something went wrong",
      responseData,
    );
  }

  return responseData as TResponse;
}
