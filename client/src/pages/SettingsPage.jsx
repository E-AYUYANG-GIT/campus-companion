import { PhoneCall, ContactRound, CloudLightning } from 'lucide-react';
// pages/SettingsPage.jsx
function SettingsPage() {
  return (
      <div className="page-content flex flex-col min-h-[60vh] px-4 py-8 gap-4 ">
      
      {/* Centered Title with your global upward fade animation */}
      <h1 className="text-3xl sm:text-4xl font-bold text-left tracking-tight text-[var(--color-text)] mb-6">
        Profile Settings
      </h1>
      
      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Profile Image */}
        <div className="flex items-center justify-center">
          <img
            src="../avatar.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover0"
          />
        </div>
        
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text-xl font-bold">Elizar Y. Ayuyang</h2>
          <p className="text-sm">Student</p>
        </div>
        
        {/* Right column (Right oriented) */}
        <div className="text-right">
          <p className="text-sm">BSIT3R</p>
          <p className="text-sm">20yo</p>
        </div>
      </div>


      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-blue-500/20 rounded-sm justify-center items-center gap-2">
          <PhoneCall className="w-6 h-6 text-blue-500" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold">Contact Details</h2>
          <p className="text-sm  text-gray-400">Contact: 0123-456-7890</p>
          <p className="text-sm text-gray-400">Email: elizar.ayuyang@up.edu.ph</p>
          <p className="text-sm text-gray-400">Address: 123 Main St, City, Country</p>
        </div>        

      </div>

      <div className="mx-5 my-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3 bg-black/30 rounded-lg">
        {/* Icon */}
        <div className="w-12 h-12 flex bg-orange-500/20 rounded-sm justify-center items-center gap-2">
          <ContactRound className="w-6 h-6 text-orange-500" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold">Contact Details</h2>
          <p className="text-sm  text-gray-400">Contact: 0123-456-7890</p>
          <p className="text-sm text-gray-400">Email: elizar.ayuyang@up.edu.ph</p>
          <p className="text-sm text-gray-400">Address: 123 Main St, City, Country</p>
        </div>        

      </div>

    </div>
  )
}
export default SettingsPage

