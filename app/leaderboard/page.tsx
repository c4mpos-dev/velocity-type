import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/typing/header'
import { getUser } from '@/lib/supabase/actions'
import { Trophy, Clock, Target, Gauge, User, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const user = await getUser()

  // Fetch top scores grouped by user to show only their best score
  // For simplicity, we'll just fetch all scores joined with profiles
  const { data: scores, error } = await supabase
    .from('leaderboard')
    .select(`
      *,
      profiles:user_id (
        display_name
      )
    `)
    .order('wpm', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching leaderboard:', error)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 container max-w-4xl mx-auto px-4">
        {/* We can reuse the header but we need to mock the props or update it */}
        <Header 
          user={user} 
        />
        
        <main className="py-8">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xl shadow-primary/20 animate-pulse">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Leaderboard</h1>
            <p className="text-muted-foreground max-w-md">
              Os digitadores mais rápidos da comunidade Velocity Type.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-card border border-border/50">
                <TabsTrigger value="all">Global</TabsTrigger>
                <TabsTrigger value="time">Modo Tempo</TabsTrigger>
                <TabsTrigger value="words">Modo Palavras</TabsTrigger>
              </TabsList>
              
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Atualizado em tempo real</span>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card className="border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/40">
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead className="text-right">PPM</TableHead>
                      <TableHead className="text-right hidden md:table-cell">Precisão</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Modo</TableHead>
                      <TableHead className="text-right">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scores?.map((score, index) => {
                      const isTop3 = index < 3
                      const scoreData = score as any;
                      const displayName = scoreData.profiles?.display_name || 'Anônimo'
                      
                      return (
                        <TableRow 
                          key={score.id} 
                          className={cn(
                            "group transition-colors border-border/20",
                            user?.id === score.user_id && "bg-primary/5 hover:bg-primary/10"
                          )}
                        >
                          <TableCell className="text-center font-mono font-bold">
                            {isTop3 ? (
                              <div className={cn(
                                "inline-flex items-center justify-center w-6 h-6 rounded-md",
                                index === 0 ? "bg-chart-4/20 text-chart-4" : 
                                index === 1 ? "bg-muted-foreground/20 text-muted-foreground" : 
                                "bg-chart-2/20 text-chart-2"
                              )}>
                                {index + 1}
                              </div>
                            ) : index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-border/50">
                                <AvatarImage src={`https://avatar.vercel.sh/${score.user_id}`} />
                                <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                              </Avatar>
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {displayName}
                              </span>
                              {user?.id === score.user_id && (
                                <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-primary/20 text-primary border-none">VOCÊ</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono font-bold text-xl text-primary">{score.wpm}</span>
                              <span className="text-[10px] text-muted-foreground uppercase leading-none">WPM</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right hidden md:table-cell">
                            <div className="flex items-center justify-end gap-1.5">
                              <Target className={cn(
                                "w-3 h-3",
                                score.accuracy >= 98 ? "text-correct" : "text-muted-foreground"
                              )} />
                              <span className="font-mono">{score.accuracy}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right hidden sm:table-cell">
                            <Badge variant="outline" className="font-normal text-[10px] capitalize border-border/50">
                              {score.mode} {score.mode_value}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(score.created_at), { addSuffix: true, locale: ptBR })}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {(!scores || scores.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                          Nenhuma pontuação registrada ainda. Seja o primeiro!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            
            <TabsContent value="time" className="mt-0">
               <div className="p-8 text-center border border-dashed rounded-xl border-border/50 text-muted-foreground">
                  Filtro por modo de tempo em breve...
               </div>
            </TabsContent>

            <TabsContent value="words" className="mt-0">
               <div className="p-8 text-center border border-dashed rounded-xl border-border/50 text-muted-foreground">
                  Filtro por modo de palavras em breve...
               </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-chart-4/5 rounded-full blur-[120px]" />
      </div>
    </div>
  )
}
