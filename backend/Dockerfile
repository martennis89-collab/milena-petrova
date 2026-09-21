FROM python:3.11-slim

# Keep Python from buffering logs or writing .pyc files into the image layer.
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Build toolchain for the wheels that need compiling (cffi/cryptography on
# architectures without a prebuilt wheel). Removed again in the same layer.
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

# Dependencies first, so edits to application code reuse this layer.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove build-essential

COPY . .

# Drop privileges: nothing here needs root at runtime.
RUN useradd --create-home --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8001

# Single worker: routes/admin.py keeps its session tokens in process memory, so
# additional workers would each hold a different set and log admins out at
# random. Fix that (Redis or a signed token) before scaling this up.
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "1"]
