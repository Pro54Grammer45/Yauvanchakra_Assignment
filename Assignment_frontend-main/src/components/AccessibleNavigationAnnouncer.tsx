'use client';

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const AccessibleNavigationAnnouncer: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    // ignore the /
    if (pathname.slice(1)) {
      // make sure navigation has occurred and screen reader is ready
      setTimeout(() => setMessage(`Navigated to ${pathname.slice(1)} page.`), 500)
    } else {
      setMessage('')
    }
  }, [pathname])

  return (
    <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </span>
  )
}

export default AccessibleNavigationAnnouncer
