# Developer entry points for milenapetrova.bg.
# Run `make` or `make help` for the list.

.DEFAULT_GOAL := help
.PHONY: help install install-backend install-frontend env \
        dev-backend dev-frontend test test-backend test-integration \
        lint format build up down logs clean

BACKEND  := backend
FRONTEND := frontend

help: ## Show this help
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

## --- Setup -----------------------------------------------------------------

env: ## Create backend/.env and frontend/.env from the templates (never overwrites)
	@test -f $(BACKEND)/.env  || (cp $(BACKEND)/.env.example  $(BACKEND)/.env  && echo "created $(BACKEND)/.env")
	@test -f $(FRONTEND)/.env || (cp $(FRONTEND)/.env.example $(FRONTEND)/.env && echo "created $(FRONTEND)/.env")
	@echo "Fill in real values before running anything that talks to Stripe, Resend or Google."

install: install-backend install-frontend ## Install all dependencies

install-backend: ## Install Python dependencies (including dev tooling)
	cd $(BACKEND) && pip install -r requirements.txt -r requirements-dev.txt

install-frontend: ## Install JavaScript dependencies from the lockfile
	cd $(FRONTEND) && yarn install --frozen-lockfile

## --- Run -------------------------------------------------------------------

dev-backend: ## Run the API with reload on :8001 (needs a reachable MongoDB)
	cd $(BACKEND) && uvicorn server:app --reload --host 0.0.0.0 --port 8001

dev-frontend: ## Run the CRA dev server on :3000
	cd $(FRONTEND) && yarn start

## --- Test and check --------------------------------------------------------

test: test-backend ## Run the default test suite (unit tests only)

test-backend: ## Run backend unit tests
	cd $(BACKEND) && python -m pytest

test-integration: ## Run tests that need a live API (set REACT_APP_BACKEND_URL first)
	cd $(BACKEND) && python -m pytest -m integration

# Frontend linting is not a separate step: react-scripts runs eslint during
# `make build` and `make dev-frontend`, configured in frontend/craco.config.js.
# The installed eslint 9 has no flat config, so calling it directly fails.
lint: ## Lint the backend (frontend is linted by the build)
	cd $(BACKEND) && flake8 . --max-line-length=120 --exclude=.venv,venv,__pycache__

format: ## Auto-format Python code
	cd $(BACKEND) && black . && isort .

## --- Build and containers --------------------------------------------------

build: ## Build the frontend production bundle
	cd $(FRONTEND) && CI=false yarn build

up: ## Start the whole stack in Docker (mongo + backend + frontend)
	docker compose up --build

down: ## Stop the stack
	docker compose down

logs: ## Tail container logs
	docker compose logs -f

clean: ## Remove build artefacts and caches
	rm -rf $(FRONTEND)/build $(FRONTEND)/node_modules/.cache
	find $(BACKEND) -type d -name __pycache__ -prune -exec rm -rf {} +
	rm -rf $(BACKEND)/.pytest_cache
