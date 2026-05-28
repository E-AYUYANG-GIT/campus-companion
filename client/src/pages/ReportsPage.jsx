import { ShieldHalf, Activity, CloudLightning } from 'lucide-react';
// pages/ReportsPage.jsx
function ReportsPage() {
  return (
    <div className="px-4 py-6 gap-3 flex flex-col items-start justify-start min-h-[60vh]">
      {/* Centered Title with your global upward fade animation */}
      <h1 className="text-3xl sm:text-4xl font-bold text-left tracking-tight text-[var(--color-text)] mb-6">
        Reports Page
      </h1>

      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-green-500/20 rounded-sm justify-center items-center gap-2">
          <ShieldHalf className="w-6 h-6 text-green-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text font-bold">Moved to Safe Zone</h2>
          <p className="text-sm  text-gray-400">Location</p>
        </div>

        <div className="text-right">
          <h2 className="text-sm text-green-400">now</h2>
          <p className="text-sm  text-gray-400">2 min walk</p>
        </div>
      </div>

      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-red-500/20 rounded-sm justify-center items-center gap-2">
          <Activity className="w-6 h-6 text-red-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text font-bold">Moved to Safe Zone</h2>
          <p className="text-sm text-gray-400">Location</p>
        </div>

        <div className="text-right">
          <h2 className="text-sm text-green-400">now</h2>
          <p className="text-sm  text-gray-400">2 min walk</p>
        </div>       
      </div>

      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-green-500/20 rounded-sm justify-center items-center gap-2">
          <ShieldHalf className="w-6 h-6 text-green-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text font-bold">Moved to Safe Zone</h2>
          <p className="text-sm text-gray-400">Location</p>
        </div>
        <div className="text-right">
          <h2 className="text-sm text-green-400">now</h2>
          <p className="text-sm  text-gray-400">2 min walk</p>
        </div>        
      </div>

      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-orange-500/20 rounded-sm justify-center items-center gap-2">
          <CloudLightning className="w-6 h-6 text-orange-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text font-bold">Moved to Safe Zone</h2>
          <p className="text-sm text-gray-400">Location</p>
        </div>
        <div className="text-right">
          <h2 className="text-sm text-green-400">now</h2>
          <p className="text-sm  text-gray-400">2 min walk</p>
        </div>        
      </div>            

    </div>
  )
}
export default ReportsPage
