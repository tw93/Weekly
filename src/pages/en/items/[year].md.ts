import type { APIRoute } from "astro";
import {
  getIssueItems,
  issueYears,
  renderItemsMarkdown,
  textResponse,
} from "@/agents";

export const getStaticPaths = () =>
  issueYears("en").map((year) => ({ params: { year } }));

export const GET: APIRoute = async ({ params }) =>
  textResponse(
    renderItemsMarkdown("en", params.year ?? "", await getIssueItems("en")),
  );
