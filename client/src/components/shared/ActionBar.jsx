// components/shared/ActionBar.jsx
import { NavLink } from 'react-router-dom'
import { Home, MapPin, FileText, Settings } from 'lucide-react' 

function ActionBar() {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/map', label: 'Map', icon: MapPin },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-auto right-auto max-w-[430px] w-full h-[70px] z-50
                    bg-[#0b1120] border-t border-white/5 px-2 pt-2 pb-2
                    flex items-start justify-around shadow-[var(--shadow-card) z-50] rounded-t-3xl"> 

      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.path}
            to={item.path}
            // 🌟 isolate each button into its own rigid box container to kill the ripple effect
            className="margin-bottom-3 flex flex-col items-center justify-end w-20 h-full pb-2 relative select-none"
          >
            {({ isActive }) => (
              <>
                {/* 1. Icon Container (Transforms instantly without expanding the baseline) */}
                <div 
                  className={`
                    flex items-center justify-center transition-all duration-200 ease-out absolute
                    ${isActive 
                      ? 'w-12 h-12 rounded-full bg-[#6e56cf] border-4 border-[#0b1120] bottom-7 text-white shadow-[0_8px_20px_rgba(110,86,207,0.45)]' 
                      : 'w-8 h-8 text-[var(--color-text-muted)]  border-4 border-[#0b1120]  hover:text-[var(--color-text)] bottom-6'
                    }
                  `}
                >
                  <Icon className={`stroke-[2.25] ${isActive ? 'w-5 h-5' : 'w-6 h-6'}`} />
                </div>

                {/* 2. Text Label (Stays locked at the bottom, shifting down slightly only when active) */}
                <span 
                  className={`
                    text-[11px] font-semibold tracking-wide transition-transform duration-200 block
                    ${isActive 
                      ? 'text-white translate-y-[2px]' 
                      : 'text-[var(--color-text-muted)]'
                    }
                  `}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        )
      })}

    </nav>
  )
}

export default ActionBar