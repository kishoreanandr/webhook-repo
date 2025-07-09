import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import dayjs from "dayjs";

export default function Editor() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastTimestampRef = useRef(null);
  const displayedKeysRef = useRef(new Set());

  // Helper to format date
  const formatDate = (isoString) => dayjs(isoString).format("YYYY-MM-DD HH:mm:ss");

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/events");
      let data = await res.json();

      // Remove duplicates based on message+timestamp
      const unique = [];
      const seen = new Set();
      for (const e of data) {
        const key = e.message + e.timestamp;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(e);
        }
      }

      // Only show events newer than the last seen timestamp (if any)
      let filtered = unique;
      if (lastTimestampRef.current) {
        filtered = unique.filter(
          (e) => dayjs(e.timestamp).isAfter(dayjs(lastTimestampRef.current))
        );
      }

      // Remove events already displayed
      filtered = filtered.filter(e => {
        const key = e.message + e.timestamp;
        return !displayedKeysRef.current.has(key);
      });

      // Update last seen timestamp and displayed keys
      if (filtered.length > 0) {
        lastTimestampRef.current = filtered[0].timestamp;
        filtered.forEach(e => displayedKeysRef.current.add(e.message + e.timestamp));
        setEvents(prev => [...filtered, ...prev]);
      }
    } catch (err) {
      // Do not update events on error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <div className="webhook-event-section">
          <h2 className="mb-4 fw-bold text-center" style={{ color: "#6366f1" }}>
            <FaBell style={{ marginRight: 8, verticalAlign: "middle" }} />
            Webhook Event Viewer
          </h2>
          <p className="mb-4 text-center text-secondary">
            View and manage your GitHub webhook events here.
          </p>
          {loading ? (
            <p className="text-muted text-center">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-muted text-center">No events found.</p>
          ) : (
            <div className="table-responsive">
              <table className="webhook-event-table">
                <thead>
                  <tr>
                    <th style={{width: '60%'}}>Message</th>
                    <th style={{width: '40%'}}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i} className="webhook-event-row">
                      <td className="webhook-event-message">{e.message}</td>
                      <td className="webhook-event-timestamp">{formatDate(e.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}