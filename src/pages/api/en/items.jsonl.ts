import { getIssueItems, textResponse } from "@/agents";

export const GET = async () => {
  const items = await getIssueItems("en");
  return textResponse(
    `${items.map((item) => JSON.stringify(item)).join("\n")}\n`,
    "application/x-ndjson; charset=utf-8",
  );
};
