import Meteors from '@/components/magicui/meteors'
import React from 'react'
import { Link } from 'react-router-dom'
import LetterPullup from '@/components/magicui/letter-pullup'

const NotFound = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl z-50">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
      <LetterPullup words={"Stock does Not Sync! ☠️"} delay={0.05} />
      </span>
      <Link to='/' className='text-primary font-bold'>Go to Home </Link>
    </div>
  )
}

export default NotFound