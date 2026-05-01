import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login')
    }
  }, [loading, session, navigate])

  if (loading || !session) {
    return (
      <div className="min-h-screen flex">
        <div className="hidden md:block w-[260px] bg-[#611f69] p-4 space-y-3">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="h-4 w-24 bg-white/20" />
          <Skeleton className="h-4 w-28 bg-white/20" />
          <Skeleton className="h-4 w-20 bg-white/20" />
        </div>
        <div className="flex-1 p-6 space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-2/3" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
