// pages/ReportsPage.jsx
function ReportsPage() {
  return (
      <div className="page-content flex flex-col items-center justify-center min-h-[60vh] px-4">
      
      {/* Centered Title with your global upward fade animation */}
      <h1 className="animate-fade-in-up text-3xl sm:text-4xl font-bold text-center tracking-tight text-[var(--color-text)]">
        Welcome to Reports Page
      </h1>

      {/* Optional Subtitle using the global animation with a built-in tailwind delay */}
      <p className="animate-fade-in-up [animation-delay:150ms] opacity-0 mt-3 text-center text-sm sm:text-base text-[var(--color-text-muted)]">
        Everything is running smoothly.
      </p>

    </div>
  )
}
export default ReportsPage
