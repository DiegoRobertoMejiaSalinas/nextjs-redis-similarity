export const revokeApiKey = async ({ keyId }: { keyId: string }) => {
  const res = await fetch("/api/api-key/revoke", {
    method: "POST",
    body: JSON.stringify({ keyId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: { error?: string } = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }
};
