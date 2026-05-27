import { useState } from "react";

const tags = [
  { id: "all", label: "All", dot: null },
  { id: "emergency", label: "Emergency", dot: "#ef4444" },
  { id: "academic", label: "Academic", dot: "#3b82f6" },
  { id: "others", label: "Others", dot: "#f97316" },
];

export default function SearchbarSection() {
  const [activeTag, setActiveTag] = useState("all");
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "12px 16px",
        width: "100%",
        maxWidth: "480px",
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "999px",
          height: "40px",
          paddingLeft: "14px",
          paddingRight: "14px",
          gap: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        {/* Grey Search Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search building, room or service..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "13px",
            color: "#374151",
            fontFamily: "sans-serif",
          }}
        />
      </div>

      {/* Tags Row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {tags.map((tag) => {
          const isActive = activeTag === tag.id;
          return (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingLeft: "14px",
                paddingRight: "14px",
                height: "30px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: isActive ? "#22c55e" : "#1e293b",
                color: "#ffffff",
                fontSize: "12.5px",
                fontWeight: isActive ? "600" : "600",
                cursor: "pointer",
                fontFamily: "sans-serif",
                transition: "all 0.18s ease",
                outline: "none",
                flexShrink: 0,
              }}
            >
              {tag.dot && (
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: tag.dot,
                    flexShrink: 0,
                  }}
                />
              )}
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}