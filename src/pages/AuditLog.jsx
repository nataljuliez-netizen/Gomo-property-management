import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";

import AuditCards from "../components/Audit/AuditCards";

import {
  useAuditLogs,
  useClearAuditLogs,
} from "../hooks/useAuditLogs";

export default function AuditLog() {
  const { logs } = useAuditLogs();
  const clearLogs = useClearAuditLogs();

  const [search, setSearch] = useState("");

  async function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the audit log?"
    );

    if (!confirmed) return;

    try {
      await clearLogs.mutateAsync();
      alert("Audit log cleared.");
    } catch (error) {
      console.error(error);
      alert("Failed to clear audit log.");
    }
  }

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const description =
        log.changes?.description ?? "";

      return `${log.action} ${description}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
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