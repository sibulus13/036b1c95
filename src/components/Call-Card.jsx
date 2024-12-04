'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Phone, PhoneIncoming, PhoneOutgoing, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function CallCard({ call }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Call {call.direction === 'inbound' ? 'from' : 'to'} {call.direction === 'inbound' ? call.from : call.to}
        </CardTitle>
        <Badge variant={call.call_type === 'answered' ? 'default' : 'destructive'}>
          {call.call_type}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm">
          {call.direction === 'inbound' ? <PhoneIncoming className="h-4 w-4" /> : <PhoneOutgoing className="h-4 w-4" />}
          <span>{format(new Date(call.created_at), 'MMM d, yyyy HH:mm')}</span>
          <span>{formatDuration(call.duration)}</span>
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-2 text-sm">
            <p>From: {call.from}</p>
            <p>To: {call.to}</p>
            <p>Via: {call.via}</p>
            <p>Archived: {call.is_archived ? 'Yes' : 'No'}</p>
            <p>ID: {call.id}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show more
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

