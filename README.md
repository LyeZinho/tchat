# VAX Chat — Secure Terminal Chat

A cryptographically secure, end-to-end encrypted terminal chat application.

## Features

- **End-to-End Encryption**: All messages encrypted with Ed25519 signatures and XChaCha20-Poly1305
- **Zero-Knowledge**: Server never sees message content — only encrypted payloads
- **2FA Support**: TOTP-based two-factor authentication
- **Terminal-First**: Built with Ink (React) for a reactive, modern CLI experience
- **Real-Time**: Server-Sent Events (SSE) for instant message delivery
- **Cross-Platform**: Linux, macOS, and Windows binaries via GitHub Releases

## Install

### Linux / macOS

```bash
curl -sSL https://raw.githubusercontent.com/LyeZinho/vox/main/install.sh | bash
```

### Windows

```powershell
irm https://raw.githubusercontent.com/LyeZinho/vox/main/install.ps1 | iex
```

### Version

```bash
# Install specific version
curl -sSL https://raw.githubusercontent.com/LyeZinho/vox/main/install.sh | bash -s 1.0.0

# Install latest pre-release (dev build)
curl -sSL https://raw.githubusercontent.com/LyeZinho/vox/ink-migration/install.sh | bash
```

### Custom Server

```bash
VAX_SERVER=https://your-server.com vax
# or
export VAX_SERVER=https://your-server.com
vax
```

Default server: `https://vox.devscafe.org`

## Development

### Prerequisites

- Node.js 22+
- Rust (for building the crypto core)
- Docker & Docker Compose (for server)

### Setup

```bash
git clone https://github.com/LyeZinho/vox.git
cd vox
npm install

# Build the Rust crypto core
npm run build:core

# Start the backend
docker-compose up -d

# Start the server
npm run dev:server

# Start the terminal client
npm run dev:client
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Terminal Client                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   TUI       │  │   State     │  │   Rust     │  │
│  │  (Ink)     │◄─┤   (Store)  │◄─┤   Core     │  │
│  │  React     │  │  useReducer │  │  (crypto) │  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────┘
                          │
                    HTTPS + SSE
                          │
┌─────────────────────────────────────────────────────┐
│                   Relay Server                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   NestJS    │  │   Redis     │  │  Postgres  │  │
│  │   API       │◄─┤   Pub/Sub   │  │  Database  │  │
│  └─────────────┘  └──────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Usage

1. **First Launch**: Enter email and password to create your vault
2. **Subsequent Launches**: Enter password to unlock your private key
3. **Send Messages**: Type in the input bar and press Enter
4. **Commands**: Type `/help` to see all available commands

### Commands

| Command | Description |
|---------|-------------|
| `/join <room>` | Join a room |
| `/create <name>` | Create a new room |
| `/rooms` | List available rooms |
| `/leave` | Leave current room |
| `/theme <name>` | Switch theme (default, dracula, nord) |
| `/clear` | Clear chat |
| `/quit` | Exit VAX Chat |

### Keybindings

| Key | Action |
|-----|--------|
| `Ctrl+C` / `q` | Quit |
| `Ctrl+P` | Toggle privacy mode |
| `↑ / ↓` | Scroll chat history |
| `Tab` | Navigate form fields (onboarding) |

## Security

### Cryptography

- **Key Derivation**: Argon2id (memory-hard KDF)
- **Identity**: Ed25519 (Curve25519 elliptic curve)
- **Vault Encryption**: XChaCha20-Poly1305 (AEAD)
- **Message Signing**: Ed25519 signatures

### Trust Model

1. User generates Ed25519 keypair locally
2. Private key encrypted with Argon2id-derived master key
3. Only the public key is ever transmitted to the server
4. Messages are signed before encryption

## Environment Variables

### Client

| Variable | Default | Description |
|----------|---------|-------------|
| `VAX_API_URL` | `https://vox.devscafe.org` | Server URL |
| `VAX_SERVER` | `https://vox.devscafe.org` | Alias for `VAX_API_URL` |
| `VAX_HOME` | `~/.vax` | Installation directory |

### Server

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | — | PostgreSQL connection string |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string |
| `PORT` | `3000` | Server port |

See `.env.example` for a full configuration template.

## License

MIT License — see LICENSE file
