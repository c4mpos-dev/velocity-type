'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/supabase/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Keyboard, Loader2, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex mt-32 items-center justify-center p-4 bg-background relative overflow-hidden">
      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-2xl shadow-primary/20"
            >
              <Keyboard className="w-10 h-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-xl font-bold tracking-tight text-foreground">Velocidade em processamento...</h2>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <Card className="border-border/40 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden relative border-t-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/0 via-primary/40 to-primary/0" />
          
          <CardHeader className="pt-2 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 ring-1 ring-primary/20 shadow-xl shadow-primary/5"
            >
              <Keyboard className="w-8 h-8" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">
              Velocity Type
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground font-medium">
              Acesse sua conta para continuar evoluindo
            </CardDescription>
          </CardHeader>

          <form action={formAction}>
            <CardContent className="space-y-6 px-8">
              <AnimatePresence mode="wait">
                {state?.error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive py-3 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs font-semibold">{state.error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@exemplo.com"
                  required
                  className="bg-background/40 border-border/40 focus:border-primary/50 h-12 transition-all duration-300 focus:ring-4 focus:ring-primary/5 text-base"
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center ml-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Senha</Label>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-background/40 border-border/40 focus:border-primary/50 h-12 pr-12 transition-all duration-300 focus:ring-4 focus:ring-primary/5 text-base"
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/5"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-6 px-8 pt-8 pb-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all group overflow-hidden relative" 
                disabled={isPending}
              >
                <div className="absolute inset-0 bg-linear-to-r from-primary-foreground/0 via-primary-foreground/5 to-primary-foreground/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <span className="flex items-center">
                    Entrar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
              <div className="text-center text-sm font-medium text-muted-foreground">
                Novo por aqui?{' '}
                <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-bold border-b border-primary/30 hover:border-primary">
                  Cadastre-se grátis
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

