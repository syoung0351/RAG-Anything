import os
import httpx
import anthropic


async def search_and_summarize(query: str) -> str:
    """Run a Brave web search and use Claude to summarize results as context."""
    brave_key = os.environ.get("BRAVE_SEARCH_API_KEY", "")
    if not brave_key:
        return ""

    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.get(
            "https://api.search.brave.com/res/v1/web/search",
            headers={"Accept": "application/json", "X-Subscription-Token": brave_key},
            params={"q": query, "count": 5},
        )
    if resp.status_code != 200:
        return ""

    results = resp.json().get("web", {}).get("results", [])
    if not results:
        return ""

    snippets = "\n\n".join(
        f"**{r.get('title', '')}** ({r.get('url', '')})\n{r.get('description', '')}"
        for r in results[:5]
    )

    client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    message = await client.messages.create(
        model=os.environ.get("LLM_MODEL", "claude-haiku-4-5-20251001"),
        max_tokens=512,
        messages=[
            {
                "role": "user",
                "content": (
                    f"Summarize the following search results into a single concise paragraph "
                    f"of current facts relevant to this query: \"{query}\"\n\n{snippets}"
                ),
            }
        ],
    )
    return message.content[0].text if message.content else ""
