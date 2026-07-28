// src/pages/AuditLog.jsx

import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";

import AuditCards from "../components/Audit/AuditCards";

import {
  getAllAuditLogs,
  clearAuditLogs,
} from "../services/auditService";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  function loadLogs() {
    setLogs(getAllAuditLogs());
  }

  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the audit log?"
    );

    if (!confirmed) return;

    clearAuditLogs();
    loadLogs();
  }

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      `${log.action} ${log.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [logs, search]);

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <PageHeader
          title="Audit Log"
          subtitle="Track every important action performed in GOMO."
        />

        <Button onClick={handleClear}>
          <Trash2 size={18} />
          Clear Log
        </Button>

      </div>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search activity..."
      />

      <AuditCards logs={filteredLogs} />

    </div>
  );
}