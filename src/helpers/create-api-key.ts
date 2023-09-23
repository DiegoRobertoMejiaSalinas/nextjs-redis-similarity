import { CreateApiData } from "@/types/api";

export const createApiKey = async () => {
  const res = await fetch("/api/api-key/create", {
    method: "POST",
  });
  const data: CreateApiData = await res.json();

  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }

    throw new Error(data.error ?? "Something went wrong.");
  }

  return data.createdApiKey.key;
};
