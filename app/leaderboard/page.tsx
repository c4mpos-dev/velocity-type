import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/typing/header'
import { getUser } from '@/lib/supabase/actions'
import { Trophy, Clock, Target, Gauge, User, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import Link from 'next/link'
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

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const activeType = params.type || 'common'
  const supabase = await createClient()
  const user = await getUser()

  const typeLabels: Record<string, string> = {
    common: 'Comum',
    medium: 'Médio',
    programming: 'Código',
    punctuation: 'Pontuação'
  }

  const { data: scores, error } = await supabase
    .from('leaderboard')
    .select(`
      *,
      profiles:user_id (
        display_name
      )
    `)
    .eq('word_list', activeType)
    .order('wpm', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching leaderboard:', error)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 container max-w-4xl mx-auto px-4">
        <Header user={user} />
        
        <main className="py-8">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-xl shadow-primary/20 animate-pulse">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Leaderboard</h1>
            <p className="text-muted-foreground max-w-md">
              Os digitadores mais rápidos na categoria <span className="text-primary font-bold">{typeLabels[activeType]}</span>.
            </p>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <Tabs defaultValue={activeType} className="w-full sm:w-auto">
                <TabsList className="bg-card border border-border/50">
                  <TabsTrigger value="common" asChild>
                    <Link href="/leaderboard?type=common">Comum</Link>
                  </TabsTrigger>
                  <TabsTrigger value="medium" asChild>
                    <Link href="/leaderboard?type=medium">Médio</Link>
                  </TabsTrigger>
                  <TabsTrigger value="programming" asChild>
                    <Link href="/leaderboard?type=programming">Código</Link>
                  </TabsTrigger>
                  <TabsTrigger value="punctuation" asChild>
                    <Link href="/leaderboard?type=punctuation">Pontuação</Link>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Atualizado em tempo real</span>
              </div>
            </div>

            <Card className="border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/40">
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead className="text-right">PPM</TableHead>
                      <TableHead className="text-right hidden md:table-cell">Precisão</TableHead>
                      <TableHead className="text-right hidden sm:table-cell">Duração</TableHead>
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
                                index === 0 ? "bg-chart-4/20 text-chart-4 shadow-[0_0_15px_rgba(255,165,0,0.3)]" : 
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
                              <span className="text-[10px] text-muted-foreground uppercase leading-none">PPM</span>
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
                            <Badge variant="outline" className="font-normal text-[10px] border-border/50">
                              {score.mode_value}s
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
                          Nenhuma pontuação nesta categoria ainda. Seja o primeiro!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
