# Noxy

⚡ A super simple and fast Nano RPC proxy and relay

## Basic Docker Compose

```
version: '3.8'
services:
  server:
    image: "bitdesert/noxy"
    restart: "unless-stopped"
    environment:
     - NODE_RPC=http://nano_node_1:7076
     - AUTH_KEY=yoursupersecretauthkey
```
