# Noxy

⚡ A super simple and fast Nano RPC proxy and relay

## Usage

Deploy Noxy as a Docker container next to your Nano node and setup the environment.
Then your node RPC interface is available via `POST` at `/rpc`.

```bash
curl --location --request POST 'https://rpc.yourdomain.com/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
  "action": "version"
}'
```

## Basic Docker Compose

```
version: '3.8'
services:
  noxy:
    image: "bitdesert/noxy"
    restart: "unless-stopped"
    environment:
     - NODE_RPC=http://nano_node_1:7076
     - AUTH_KEY=yoursupersecretauthkey
```
