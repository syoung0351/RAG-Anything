from .technical import TECHNICAL_SYSTEM_PROMPT
from .recall import RECALL_SYSTEM_PROMPT
from .negotiation import NEGOTIATION_SYSTEM_PROMPT
from .financial import FINANCIAL_SYSTEM_PROMPT

DOMAIN_PROMPTS: dict[str, str] = {
    "technical": TECHNICAL_SYSTEM_PROMPT,
    "recall": RECALL_SYSTEM_PROMPT,
    "negotiation": NEGOTIATION_SYSTEM_PROMPT,
    "financial": FINANCIAL_SYSTEM_PROMPT,
}
