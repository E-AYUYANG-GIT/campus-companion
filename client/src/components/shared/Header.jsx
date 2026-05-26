// components/shared/Header.jsx
import { Bell } from 'lucide-react'

function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[430px] w-full h-[80px] z-50
                       bg-[#0b1120] border-b border-white/5 px-4
                       grid grid-cols-[auto_1fr_auto] items-center gap-3">
      
      {/* 1. Left Section: Circular badge housing logo.jpg */}
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 
                      flex items-center justify-center overflow-hidden shadow-inner">
        <img 
          src="/logo.png" 
          alt="QCU Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Middle Section: Dynamic Title Block */}
      <div className="flex flex-col justify-center min-w-0">
        <h1 className="text-[17px] font-bold tracking-wide text-white leading-tight truncate">
          Campus Companion
        </h1>
        <p className="text-[12px] text-[var(--color-text-muted)] tracking-wide font-medium truncate mt-0.5">
          Quezon City University
        </p>
      </div>

      {/* 3. Right Section: Circular badge housing notification handler */}
      <button 
        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 
                   flex items-center justify-center relative text-[var(--color-text-muted)] 
                   hover:text-white transition-colors focus:outline-none cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 stroke-[2]" />
        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[var(--color-danger)] 
                         rounded-full ring-2 ring-[#0b1120]" />
      </button>

    </header>
  )
}

export default Header