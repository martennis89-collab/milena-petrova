# --- Stage: base — runtime dependencies and application code -----------------
FROM python:3.11-slim AS base

# Keep Python from buffering logs or writing .pyc files into the image layer.
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Dependencies first, so edits to application code reuse this layer.
COPY requirements.txt ./

# One RUN on purpose: build-essential is needed to compile wheels that have no
# prebuilt binary for this architecture (cffi, cryptography), and purging it in
# the same layer keeps it out of the image rather than merely hiding it.
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY . .

# --- Stage: test — adds pytest and the linters -------------------------------
# Built on demand by the `backend-test` service in docker-compose.yml:
#   docker compose run --rm backend-test
# The default suite is unit tests only, so this needs no database.
FROM base AS test

RUN pip install --no-cache-dir -r requirements-dev.txt

CMD ["python", "-m", "pytest"]

# --- Stage: runtime — what actually ships ------------------------------------
# Last stage, so a plain `docker build` produces this one.
FROM base AS runtime

# Drop privileges: nothing here needs root at runtime.
RUN useradd --create-home --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8001

# Shell form on purpose, so ${PORT} expands at runtime. Platforms such as Render
# and Fly assign the port through that variable and expect the process to bind
# to it; 8001 is the fallback for local Compose runs.
#
# Single worker: routes/admin.py keeps its session tokens in process memory, so
# additional workers would each hold a different set and log admins out at
# random. Fix that (Redis or a signed token) before scaling this up.
CMD uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001} --workers 1
