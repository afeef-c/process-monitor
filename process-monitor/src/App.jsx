import React, { useState, useEffect } from "react";
import ProcessTable from "./components/ProcessTable";
import SearchBar from "./components/SearchBar";
import { fetchProcesses, terminateProcess } from "./utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import SystemSummary from "./components/SystemSummary";

const App = () => {
  const [processes, setProcesses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("cpu_percent");  // Default sorting by CPU usage
  const [sortDirection, setSortDirection] = useState("desc");  // Default descending order

  const loadProcesses = async () => {
    setLoading(true);
    try {
      const data = await fetchProcesses();
      setProcesses(data);
      console.log('dataaaaaaaaaas:',data)
      toast.success("Processes loaded successfully!");
    } catch (error) {
      console.error("Failed to fetch processes:", error);
      toast.error("Failed to fetch processes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTerminate = async (pid) => {
    if (!window.confirm("Are you sure you want to terminate this process?")) {
      return;
    }

    try {
      await terminateProcess(pid);
      toast.success(`Process ${pid} terminated successfully.`);
      loadProcesses();
    } catch (error) {
      console.error("Failed to terminate process:", error);
      toast.error("Failed to terminate process. Please try again.");
    }
  };

  const handleSort = (column) => {
    const newDirection = sortBy === column && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDirection(newDirection);
  };

  const sortedProcesses = [...processes].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredProcesses = sortedProcesses.filter(
    (proc) =>
      proc.name.toLowerCase().includes(search.toLowerCase()) ||
      proc.pid.toString().includes(search)
  );
  console.log("processes: ",processes)
  useEffect(() => {
    loadProcesses();
  }, []);

  return (
    <div className="outer-container">
      <div className="container mx-auto mt-5">
        <h1 className="text-center mb-4">System Process Monitor</h1>
        <SystemSummary/>

        <SearchBar search={search} onSearchChange={setSearch} />
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={loadProcesses}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
        {loading ? (
          <div>Loading processes...</div> // Optional: display loading message or spinner
        ) : (
          <ProcessTable
            processes={filteredProcesses}
            onTerminate={handleTerminate}
            onSort={handleSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        )}
        <footer className="text-center mt-4">
          <small className="text-muted">
            © {new Date().getFullYear()} System Process Monitor
          </small>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
