import { useState } from "react";

export default function App() {
  const [dob, setDob] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const target = new Date(toDate);
    if (birth > target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) nextBirthday.setFullYear(target.getFullYear() + 1);
    const daysToNextBirthday = Math.ceil((nextBirthday - target) / (1000 * 60 * 60 * 24));

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const birthDay = dayNames[birth.getDay()];

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNextBirthday, birthDay });
  };

  const reset = () => {
    setDob("");
    setToDate(new Date().toISOString().split("T")[0]);
    setResult(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fff",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  const statCard = (value, label, color = "#6366f1") => (
    <div key={label} style={{ background: "#f9fafb", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
      <div style={{ fontSize: "26px", fontWeight: "900", color }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontWeight: "600" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "15px", fontWeight: "700", color: "#6366f1", textDecoration: "none" }}>⌘ Tabutility</a>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>Free Online Tools</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#111827", margin: "0 0 8px 0" }}>Age Calculator</h1>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 28px 0" }}>
          Find out your exact age in years, months, days, weeks, and more.
        </p>

        {/* Input card */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                max={toDate}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Age at Date</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "13px",
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Calculate Age
          </button>
        </div>

        {/* Result */}
        {result && (
          <>
            {/* Main result */}
            <div style={{ background: "#6366f1", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 4px 12px rgba(99,102,241,0.3)", marginBottom: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>Your Age</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
                {[
                  { value: result.years, label: "Years" },
                  { value: result.months, label: "Months" },
                  { value: result.days, label: "Days" },
                ].map(({ value, label }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "52px", fontWeight: "900", color: "#fff", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
              {result.birthDay && (
                <div style={{ marginTop: "16px", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                  You were born on a <strong style={{ color: "#fff" }}>{result.birthDay}</strong>
                </div>
              )}
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {statCard(result.totalMonths, "Total Months", "#8b5cf6")}
              {statCard(result.totalWeeks, "Total Weeks", "#06b6d4")}
              {statCard(result.totalDays, "Total Days", "#f59e0b")}
              {statCard(result.totalHours, "Total Hours", "#10b981")}
            </div>

            {/* Next birthday */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>🎂 Next Birthday</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>Days until your next birthday</div>
              </div>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#6366f1" }}>{result.daysToNextBirthday}</div>
            </div>

            <button onClick={reset} style={{ display: "block", margin: "0 auto 32px", padding: "9px 28px", background: "#f3f4f6", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", color: "#374151", cursor: "pointer" }}>
              Reset
            </button>
          </>
        )}

        {/* Back link */}
        <div style={{ textAlign: "center" }}>
          <a href="https://tabutility.com" style={{ fontSize: "14px", color: "#6366f1", textDecoration: "none", fontWeight: "600" }}>
            ← Back to all free tools
          </a>
        </div>
      </div>
    </div>
  );
}
