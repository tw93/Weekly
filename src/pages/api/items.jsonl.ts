// Every item the Chinese issues recommend, one JSON object per line, so an
// agent can grep the whole archive in one request instead of 280+ issues.
import { getIssueItems, textResponse } from "@/agents";

export const GET = async () => {
  const items = await getIssueItems("zh");
  return textResponse(
    `${items.map((item) => JSON.stringify(item)).join("\n")}\n`,
    "application/x-ndjson; charset=utf-8",
  );
};
