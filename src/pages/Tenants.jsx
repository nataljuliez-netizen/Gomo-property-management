import { useEffect, useState } from "react";

import {
  Button,
  Card,
  PageHeader,
} from "../components/common";

import SearchBar from "../components/landlords/SearchBar";

import TenantCards from "../components/Tenants/TenantCards";
import TenantModal from "../components/Tenants/TenantModal";
import DeleteTenantModal from "../components/Tenants/DeleteTenantModal";

import {
  getTenants,
  addTenant,
  updateTenant,
  deleteTenant,
} from "../services/tenantService";

import { getUnits } from "../services/unitService";

import { can } from "../services/permissionService";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [units, setUnits] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedTenant, setSelectedTenant] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [tenantToDelete, setTenantToDelete] =
    useState(null);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("tenant.create");
  const canEdit = can("tenant.edit");
  const canDelete = can("tenant.delete");

  useEffect(() => {
    loadTenants();
    loadUnits();
  }, []);

  function loadTenants() {
    setTenants(getTenants());
  }

  function loadUnits() {
    setUnits(getUnits());
  }

  function openAddModal() {
    if (!canCreate) return;

    setSelectedTenant(null);
    setShowModal(true);
  }

  function openEditModal(tenant) {
    if (!canEdit) return;

    setSelectedTenant(tenant);
    setShowModal(true);
  }

  function handleSave(tenant) {
    if (selectedTenant) {
      if (!canEdit) return;

      updateTenant(tenant);
    } else {
      if (!canCreate) return;

      addTenant(tenant);
    }

    loadTenants();

    setShowModal(false);
    setSelectedTenant(null);
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const tenant = tenants.find(
      (t) => t.id === id
    );

    setTenantToDelete(tenant);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (!canDelete) return;

    if (!tenantToDelete) return;

    deleteTenant(tenantToDelete.id);

    loadTenants();

    setShowDeleteModal(false);
    setTenantToDelete(null);
  }

  const filteredTenants = tenants.filter(
    (tenant) => {
      const unit =
        units.find(
          (u) => u.id === tenant.unitId
        ) || {};

      const text = search.toLowerCase();

      return (
        tenant.fullName
          .toLowerCase()
          .includes(text) ||

        tenant.email
          .toLowerCase()
          .includes(text) ||

        tenant.phone
          .toLowerCase()
          .includes(text) ||

        (unit.unitNumber || "")
          .toString()
          .toLowerCase()
          .includes(text)
      );
    }
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tenants"
        subtitle="Manage all tenants."
      >
        {canCreate && (
          <Button onClick={openAddModal}>
            + Add Tenant
          </Button>
        )}
      </PageHeader>

      <Card>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <TenantCards
          tenants={filteredTenants}
          units={units}
          onEdit={canEdit ? openEditModal : undefined}
          onDelete={
            canDelete ? openDeleteModal : undefined
          }
        />
      </Card>

      {(canCreate || canEdit) && (
        <TenantModal
          open={showModal}
          tenant={selectedTenant}
          units={units}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedTenant(null);
          }}
        />
      )}

      {canDelete && (
        <DeleteTenantModal
          open={showDeleteModal}
          tenant={tenantToDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setTenantToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}