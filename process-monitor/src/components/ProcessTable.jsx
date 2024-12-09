import React from "react";

const ProcessTable = ({ processes, onTerminate, onSort, sortBy, sortDirection }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th
            onClick={() => onSort("pid")}
            style={{ cursor: "pointer" }}
          >
            PID {sortBy === "pid" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => onSort("name")}
            style={{ cursor: "pointer" }}
          >
            Name {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => onSort("cpu_percent")}
            style={{ cursor: "pointer" }}
          >
            CPU (%) {sortBy === "cpu_percent" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => onSort("memory_percent")}
            style={{ cursor: "pointer" }}
          >
            Memory (%) {sortBy === "memory_percent" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th>Start Time</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(processes) && processes.length > 0 ? (
        processes.map((proc) => (
          <tr key={proc.pid}>
            <td>{proc.pid}</td>
            <td>{proc.name}</td>
            <td>{proc.cpu_percent.toFixed(2)}</td>
            <td>{proc.memory_percent.toFixed(2)}</td>
            <td>{new Date(proc.create_time * 1000).toLocaleString()}</td>
            <td>{proc.username || "N/A"}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onTerminate(proc.pid)}
              >
                Terminate
              </button>
            </td>
          </tr>
        ))
    ):(
        <tr>
          <td colSpan="7" className="text-center">
            No processes found.
          </td>
        </tr>
      )
    }
      </tbody>
    </table>
  );
};

export default ProcessTable;
