import type { APIRoute } from "astro";
import {
  getIssueItems,
  issueYears,
  renderItemsMarkdown,
  textResponse,
} from "@/agents";

export const getStaticPaths = () =>
  issueYears("zh").map((year) => ({ params: { year } }));

export const GET: APIRoute = async ({ params }) =>
  textResponse(
    renderItemsMarkdown("zh", params.year ?? "", await getIssueItems("zh")),
  );
