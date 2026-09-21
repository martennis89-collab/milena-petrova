# --- Stage 1: build the static bundle ----------------------------------------
FROM node:22-slim AS build

WORKDIR /app

# Create React App inlines REACT_APP_* variables at BUILD time, so they have to
# be supplied here rather than at container start. See docker-compose.yml.
ARG REACT_APP_BACKEND_URL=http://localhost:8001
ARG REACT_APP_SITE_URL=https://milenapetrova.bg
ARG REACT_APP_ASSET_BASE_URL=
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL \
    REACT_APP_SITE_URL=$REACT_APP_SITE_URL \
    REACT_APP_ASSET_BASE_URL=$REACT_APP_ASSET_BASE_URL

# Dependencies first so code edits reuse this layer. --frozen-lockfile makes the
# build fail loudly if yarn.lock and package.json have drifted apart.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

COPY . .

# CI=false so warnings from react-scripts are not promoted to build errors.
RUN CI=false yarn build

# --- Stage 2: serve it -------------------------------------------------------
FROM nginx:1.27-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
