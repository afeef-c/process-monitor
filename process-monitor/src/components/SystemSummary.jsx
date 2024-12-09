import React, { useState, useEffect } from "react";
import { fetchSystemSummary } from "../utils/api";

const SystemSummary = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchSystemSummary();
        setSummary(data);
      } catch (error) {
        setError("Failed to fetch system summary.");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (loading) return <div className="text-center">Loading system summary...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">System Summary</h4>
        </div>
        <div className="card-body">
          <ul className="list-unstyled">
            <li className="d-flex justify-content-between">
              <strong>Total CPU Usage:</strong>
              <span>{summary.total_cpu_percent}%</span>
            </li>
            <li className="d-flex justify-content-between">
              <strong>Total Memory:</strong>
              <span>{summary.total_memory} GB</span>
            </li>
            <li className="d-flex justify-content-between">
              <strong>Used Memory:</strong>
              <span>{summary.used_memory} GB</span>
            </li>
            <li className="d-flex justify-content-between">
              <strong>Free Memory:</strong>
              <span>{summary.free_memory} GB</span>
            </li>
            <li className="d-flex justify-content-between">
              <strong>Memory Usage:</strong>
              <span>{summary.memory_percent}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemSummary;
