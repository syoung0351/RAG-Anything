import hmac
import os
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


class BearerAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path in ("/health", "/"):
            return await call_next(request)

        token = os.environ.get("PM_BRAIN_API_TOKEN", "")
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return JSONResponse({"detail": "Missing authorization"}, status_code=401)

        provided = auth_header.removeprefix("Bearer ").strip()
        if not hmac.compare_digest(provided.encode(), token.encode()):
            return JSONResponse({"detail": "Invalid token"}, status_code=401)

        return await call_next(request)
