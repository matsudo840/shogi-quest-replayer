import { useState } from 'react'
import { type SearchParams } from '../services/shogiQuest'
import './SearchForm.css'

interface SearchFormProps {
  onSearch: (params: SearchParams) => void
  isLoading: boolean
}

const timeControlOptions = [
  { value: '', label: '全て' },
  { value: '10min', label: '10分' },
  { value: '5min', label: '5分' },
  { value: '2min', label: '2分' },
]

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [username, setUsername] = useState('')
  const [timeControl, setTimeControl] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(3000)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      alert('ユーザー名を入力してください')
      return
    }
    
    onSearch({
      username: username.trim(),
      timeControl,
      ratingRange: [minRating, maxRating]
    })
  }

  return (
    <div className="search-form-container">
      <h2>棋譜検索</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="将棋クエストのユーザー名"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="timeControl">持ち時間</label>
            <select
              id="timeControl"
              value={timeControl}
              onChange={(e) => setTimeControl(e.target.value)}
              disabled={isLoading}
            >
              {timeControlOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minRating">最低レーティング</label>
            <input
              type="number"
              id="minRating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              min="0"
              max="3000"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="maxRating">最高レーティング</label>
            <input
              type="number"
              id="maxRating"
              value={maxRating}
              onChange={(e) => setMaxRating(Number(e.target.value))}
              min="0"
              max="3000"
              disabled={isLoading}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? '検索中...' : '検索'}
        </button>
      </form>
    </div>
  )
}