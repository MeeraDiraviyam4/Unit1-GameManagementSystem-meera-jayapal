import { useState } from "react";
import { isOrganizerLoggedIn } from "../../utils/authHelpers.js";
import { loadGameData, saveGameData } from "../../utils/storage.js";
import CreateMatchForm from "./CreateMatchForm.jsx";
import RecordScoreForm from "./RecordScoreForm.jsx";
import MatchTable from "../Common/MatchTable.jsx";

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "var(--color-background-secondary)",
        borderRadius: "var(--border-radius-md)",
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          color: "var(--color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 24, fontWeight: 500 }}>{value}</p>
    </div>
  );
}

function SectionCard({ title, badge, onDismiss, children }) {
  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        overflow: "hidden",
        marginBottom: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {badge && (
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 99,
                background: "var(--color-background-secondary)",
                color: "var(--color-text-secondary)",
              }}
            >
              {badge}
            </span>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                padding: "5px 10px",
                fontSize: 12,
                borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-secondary)",
                background: "var(--color-background-primary)",
                cursor: "pointer",
                color: "var(--color-text-primary)",
              }}
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}

function ActionButton({ onClick, primary, icon, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 18px",
        borderRadius: "var(--border-radius-md)",
        border: primary
          ? "0.5px solid #7c65ed"
          : "0.5px solid var(--color-border-secondary)",
        background: primary ? "#5c4ef8" : "var(--color-background-primary)",
        color: primary ? "#fff" : "var(--color-text-primary)",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="8" y1="3" x2="8" y2="13" />
    <line x1="3" y1="8" x2="13" y2="8" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="8" cy="8" r="5" />
    <polyline points="8,5 8,8 10,10" />
  </svg>
);

function OrganizerDashboard() {
  const loggedIn = isOrganizerLoggedIn();
  const initialData = loadGameData(); // FIX: renamed to avoid shadowing inside clearUpcomingMatches

  const [matches, setMatches] = useState(initialData.upcomingMatches || []);
  const [showCreate, setShowCreate] = useState(false);
  const [showRecord, setShowRecord] = useState(false);

  const handleCreateMatch = (match) => {
    const newMatch = { ...match, id: Date.now(), score: "", winner: "" };
    const updated = [...matches, newMatch];
    setMatches(updated);
    const current = loadGameData();
    saveGameData({ ...current, upcomingMatches: updated });
    setShowCreate(false);
  };

  const handleRecordScore = (id, score, winner) => {
    const updated = matches.map((m) =>
      m.id === id ? { ...m, score, winner, completed: true } : m
    );
    setMatches(updated);
    const current = loadGameData();
    saveGameData({ ...current, upcomingMatches: updated });
    setShowRecord(false);
  };

  // FIX: removed shadowed `const data` — use a fresh loadGameData() call directly
  const clearUpcomingMatches = () => {
    const current = loadGameData();
    saveGameData({ ...current, upcomingMatches: [] });
    setMatches([]);
  };

  const handleSignout = () => {
    localStorage.removeItem("isOrganizerLoggedIn");
    localStorage.removeItem("organizerName");
    window.location.href = "/organizer-login";
  };

  const completed = matches.filter((m) => m.completed).length;
  const upcoming = matches.length - completed;

  if (!loggedIn) {
    return (
      <div style={{ padding: "2rem 0" }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
          Organizer dashboard
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
          Please{" "}
          <a href="/organizer-login" style={{ color: "#534AB7" }}>
            log in
          </a>{" "}
          to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem 0" }}>
      {/* FIX: header now correctly contains only title + sign out; buttons moved below */}
      <div
        className="dashboard-header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1.75rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 2 }}>
            Organizer dashboard
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            Manage matches, record scores, and track results
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handleSignout}>
          Sign Out
        </button>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: "1.5rem",
        }}
      >
        <StatCard label="Total matches" value={matches.length} />
        <StatCard label="Completed" value={completed} />
        <StatCard label="Upcoming" value={upcoming} />
      </div>

      {/* FIX: single set of action buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
        <ActionButton
          primary
          icon={<PlusIcon />}
          onClick={() => setShowCreate((s) => !s)}
        >
          Create match
        </ActionButton>
        <ActionButton
          icon={<ClockIcon />}
          onClick={() => setShowRecord((s) => !s)}
        >
          Record score
        </ActionButton>
        <ActionButton onClick={clearUpcomingMatches}>
          Clear upcoming matches
        </ActionButton>
      </div>

      {showCreate && (
        <SectionCard title="New match" onDismiss={() => setShowCreate(false)}>
          <CreateMatchForm
            onCreate={handleCreateMatch}
            onCancel={() => setShowCreate(false)}
          />
        </SectionCard>
      )}

      {showRecord && matches.length > 0 && (
        <SectionCard title="Record score" onDismiss={() => setShowRecord(false)}>
          <RecordScoreForm
            matches={matches}
            onSave={handleRecordScore}
            onCancel={() => setShowRecord(false)}
          />
        </SectionCard>
      )}

      <SectionCard title="All matches" badge={`${matches.length} matches`}>
        <MatchTable matches={matches} />
      </SectionCard>
    </div>
  );
}

export default OrganizerDashboard;