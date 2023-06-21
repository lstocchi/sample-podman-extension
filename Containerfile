FROM scratch
LABEL org.opencontainers.image.title="Sample Podman extension" \
      org.opencontainers.image.description="Example of podman extension" \
      org.opencontainers.image.vendor="luca" \
      io.podman-desktop.api.version=">= 0.12.0"
COPY package.json /extension/
COPY media /extension/media
COPY dist /extension/dist