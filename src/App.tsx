import { useState } from 'react'
import SearchForm from './components/SearchForm'
import GameResults from './components/GameResults'
import { shogiQuestAPI, type SearchParams, type GameData } from './services/shogiQuest'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [games, setGames] = useState<GameData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true)
    setError(null)
    setSearchParams(params)
    
    try {
      const gameResults = await shogiQuestAPI.searchGames(params)
      setGames(gameResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索に失敗しました')
      setGames([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>将棋クエスト棋譜検索・分析</h1>
        <p>将棋クエストの対局履歴を検索してKENTOで分析できます</p>
      </header>
      
      <main className="app-main">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {searchParams && (
          <GameResults 
            searchParams={searchParams} 
            games={games}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  )
}

export default App