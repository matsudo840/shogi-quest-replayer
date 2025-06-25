# Shogi Quest Game Search & Analysis Tool

A web application for searching Shogi Quest game records and analyzing them with KENTO.

## Features

- **Game Search**: Search games by username, time control, and rating range
- **KENTO Integration**: Analyze searched games directly with KENTO
- **Game Export**: Download/copy games in CSA format
- **Responsive Design**: Compatible with both PC and mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Custom CSS (inspired by shogi-extend.com design)
- **API**: Shogi Quest API (planned implementation)

## Development

### Requirements

- Node.js 18+
- npm

### Setup

#### Standard Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build
npm run build

# Preview
npm run preview
```

#### Docker Environment (Recommended)

```bash
# Start development environment
docker-compose up dev

# Start production environment
docker-compose up prod

# Run in background
docker-compose up -d dev
```

**Access URLs:**
- Development: http://localhost:5173
- Production: http://localhost:8080

### Project Structure

```
src/
├── components/          # React components
│   ├── SearchForm.tsx   # Search form
│   ├── GameResults.tsx  # Search results list
│   └── GameRecord.tsx   # Individual game record
├── services/            # API related
│   └── shogiQuest.ts    # Shogi Quest API
├── App.tsx             # Main application
└── main.tsx            # Entry point
```

## TODO

- [ ] Implement actual Shogi Quest API
- [ ] Add KIF format export support
- [ ] Add rating progression graph
- [ ] Integrate with other external tools

## License

MIT
