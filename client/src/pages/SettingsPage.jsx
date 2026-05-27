import { PhoneCall } from 'lucide-react';
// pages/SettingsPage.jsx
function SettingsPage() {
  return (
      <div className="page-content flex flex-col min-h-[60vh] px-4 py-8">
      
      {/* Centered Title with your global upward fade animation */}
      <h1 className="text-3xl sm:text-4xl font-bold text-left tracking-tight text-[var(--color-text)] mb-6">
        Profile Settings
      </h1>
      
      <div className="mx-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3">
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


      <div className="mx-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3">
        {/* Profile Image */}
        <div className="flex items-center gap-2">
          <PhoneCall className="w-6 h-6 text-blue-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text-xl font-bold">Contact Details</h2>
          <p className="text-sm">Contact: 0123-456-7890</p>
          <p className="text-sm">Email: elizar.ayuyang@up.edu.ph</p>
          <p className="text-sm">Address: 123 Main St, City, Country</p>
        </div>
      </div>

            <div className="mx-5 grid grid-cols-[auto_1fr_auto] gap-4 w-full max-w-md items-center px-4 py-3">
        {/* Profile Image */}
        <div className="flex items-center gap-2">
          <PhoneCall className="w-6 h-6 text-blue-500" />
        </div>
         
        {/* Profile Details (Middle column, will expand) */}
        <div>
          <h2 className="text-xl font-bold">Guardian Details</h2>
          <p className="text-sm">Contact: 0123-456-7890</p>
          <p className="text-sm">Email: father.ayuyang@up.edu.ph</p>
          <p className="text-sm">Address: 123 Main St, City, Country</p>
        </div>
      </div>

    </div>
  )
}
export default SettingsPage

