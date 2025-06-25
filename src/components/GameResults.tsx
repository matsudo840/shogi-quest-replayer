import { useState } from 'react'
import GameRecord from './GameRecord'
import { type SearchParams, type GameData } from '../services/shogiQuest'
import './GameResults.css'

interface GameResultsProps {
  searchParams: SearchParams
  games: GameData[]
  isLoading: boolean
}

export default function GameResults({ searchParams, games, isLoading }: GameResultsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const gamesPerPage = 10

  const totalPages = Math.ceil(games.length / gamesPerPage)
  const startIndex = (currentPage - 1) * gamesPerPage
  const currentGames = games.slice(startIndex, startIndex + gamesPerPage)

  if (isLoading) {
    return (
      <div className="game-results loading">
        <div className="loading-spinner"></div>
        <p>検索中...</p>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="game-results empty">
        <p>対局が見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div className="game-results">
      <div className="results-header">
        <h3>検索結果: {games.length}件</h3>
        <p>ユーザー: {searchParams.username}</p>
      </div>

      <div className="games-list">
        {currentGames.map(game => (
          <GameRecord key={game.id} game={game} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            前へ
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}