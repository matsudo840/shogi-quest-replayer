import { type GameData } from '../services/shogiQuest'
import './GameRecord.css'

interface GameRecordProps {
  game: GameData
}

export default function GameRecord({ game }: GameRecordProps) {
  const resultText = {
    win: '勝ち',
    lose: '負け',
    draw: '引き分け'
  }

  const resultClass = `result ${game.result}`

  const handleKentoAnalysis = () => {
    if (game.csaData) {
      // KENTOのURLを生成してCSAデータを渡す
      const kentoUrl = `https://www.kento-shogi.com/?csa=${encodeURIComponent(game.csaData)}`
      window.open(kentoUrl, '_blank')
    }
  }

  const handleCopyCSA = async () => {
    if (game.csaData) {
      try {
        await navigator.clipboard.writeText(game.csaData)
        alert('CSA形式の棋譜をコピーしました')
      } catch (err) {
        console.error('Failed to copy CSA data:', err)
        alert('コピーに失敗しました')
      }
    }
  }

  const handleDownloadCSA = () => {
    if (game.csaData) {
      const blob = new Blob([game.csaData], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `game_${game.id}_${game.date}.csa`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="game-record">
      <div className="game-info">
        <div className="game-header">
          <span className="game-date">{game.date}</span>
          <span className={resultClass}>{resultText[game.result]}</span>
        </div>
        
        <div className="game-details">
          <div className="opponent">
            vs {game.opponent}
          </div>
          <div className="ratings">
            {game.userRating} vs {game.opponentRating}
          </div>
          <div className="game-meta">
            {game.timeControl} | {game.moves}手 | {game.duration}
          </div>
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="action-button kento"
          onClick={handleKentoAnalysis}
          title="KENTOで分析"
        >
          KENTO
        </button>
        
        <button 
          className="action-button copy"
          onClick={handleCopyCSA}
          title="CSA形式をコピー"
        >
          COPY
        </button>
        
        <button 
          className="action-button download"
          onClick={handleDownloadCSA}
          title="CSAファイルをダウンロード"
        >
          CSA
        </button>
        
        {game.gameUrl && (
          <a 
            href={game.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button play"
            title="将棋クエストで再生"
          >
            PLAY
          </a>
        )}
      </div>
    </div>
  )
}