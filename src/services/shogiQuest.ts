interface GameData {
  id: string
  date: string
  opponent: string
  result: 'win' | 'lose' | 'draw'
  userRating: number
  opponentRating: number
  timeControl: string
  moves: number
  duration: string
  gameUrl?: string
  csaData?: string
}

interface SearchParams {
  username: string
  timeControl: string
  ratingRange: [number, number]
}

class ShogiQuestAPI {
  private baseUrl = 'https://www.shogi-quest.com'

  async searchGames(params: SearchParams): Promise<GameData[]> {
    try {
      // TODO: 実際のShogi Quest APIを実装
      // 現在はモックデータを返す
      
      // 実際のAPIエンドポイント例:
      // const response = await fetch(`${this.baseUrl}/api/games/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params),
      // })
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }
      
      // return await response.json()

      // モックデータ（実装時に削除）
      await new Promise(resolve => setTimeout(resolve, 1000)) // API遅延をシミュレート

      const mockGames: GameData[] = [
        {
          id: '20240625001',
          date: '2024-06-25',
          opponent: 'TestPlayer1',
          result: 'win',
          userRating: 1800,
          opponentRating: 1750,
          timeControl: '10min',
          moves: 85,
          duration: '08:45',
          gameUrl: `${this.baseUrl}/game/20240625001`,
          csaData: this.generateMockCSA('TestPlayer1', params.username, '2024-06-25', '10:00:00')
        },
        {
          id: '20240624001',
          date: '2024-06-24',
          opponent: 'TestPlayer2',
          result: 'lose',
          userRating: 1785,
          opponentRating: 1820,
          timeControl: '5min',
          moves: 67,
          duration: '04:32',
          gameUrl: `${this.baseUrl}/game/20240624001`,
          csaData: this.generateMockCSA(params.username, 'TestPlayer2', '2024-06-24', '15:30:00')
        },
        {
          id: '20240623001',
          date: '2024-06-23',
          opponent: 'TestPlayer3',
          result: 'win',
          userRating: 1770,
          opponentRating: 1760,
          timeControl: '2min',
          moves: 92,
          duration: '01:58',
          gameUrl: `${this.baseUrl}/game/20240623001`,
          csaData: this.generateMockCSA('TestPlayer3', params.username, '2024-06-23', '20:15:00')
        }
      ]

      // フィルタリング（時間制御）
      const filteredGames = mockGames.filter(game => {
        if (params.timeControl && game.timeControl !== params.timeControl) {
          return false
        }
        if (game.userRating < params.ratingRange[0] || game.userRating > params.ratingRange[1]) {
          return false
        }
        return true
      })

      return filteredGames

    } catch (error) {
      console.error('Failed to search games:', error)
      throw new Error('対局の検索に失敗しました')
    }
  }

  private generateMockCSA(sente: string, gote: string, date: string, time: string): string {
    return `V2.2
N+${sente}
N-${gote}
$START_TIME:${date.replace(/-/g, '/')} ${time}
$TIME_LIMIT:00:10+00
+2726FU
-3334FU
+7776FU
-8384FU
+2625FU
-8485FU
+6978KI
-4132KI
+5968OU
-6152KI
+7968GI
-5142OU
+6867GI
-7374FU
+2524FU
-2324FU
+2824HI
-8786FU
+8776GI
-8587TO
+7687GI
-2388UM
+2428HI
-8833UM
+6766GI
-3324UM
+2838HI
-2444UM
+3828HI
-4428UM
+TORYO
$END_TIME:${date.replace(/-/g, '/')} ${time}`
  }

  async getGameDetails(gameId: string): Promise<GameData | null> {
    try {
      // TODO: 実際のAPI実装
      // const response = await fetch(`${this.baseUrl}/api/games/${gameId}`)
      // if (!response.ok) return null
      // return await response.json()
      
      console.log('Getting game details for:', gameId)
      return null
    } catch (error) {
      console.error('Failed to get game details:', error)
      return null
    }
  }
}

export const shogiQuestAPI = new ShogiQuestAPI()
export type { GameData, SearchParams }