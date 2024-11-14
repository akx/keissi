FROM node:22 AS frontend-build
WORKDIR /frontend
ADD ./frontend/package.json /frontend
RUN npm i
ADD ./frontend /frontend
RUN npm run build -- --outDir=/built
FROM ghcr.io/astral-sh/uv:python3.13-bookworm
ADD ./backend /app
WORKDIR /app
RUN uv sync --no-cache-dir --frozen
COPY --from=frontend-build /built ./static
CMD uv run fastapi run
