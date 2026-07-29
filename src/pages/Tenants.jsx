import { useState } from "react";

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
  useTenants,
  useAddTenant,
  useUpdateTenant,
  useDeleteTenant,
} from "../hooks/useTenants";

import { useUnits } from "../hooks/useUnits";
import { useProperties } from "../hooks/useProperties";

import { can } from "../services/permissionService";

export default function Tenants() {
  const {
    tenants,
    loading,
    error,
  } = useTenants();

  const {
    units,
    loading: unitsLoading,
  } = useUnits();

  const {
    properties,
    loading: propertiesLoading,
  } = useProperties();

  const addMutation = useAddTenant();
  const updateMutation = useUpdateTenant();
  const deleteMutation = useDeleteTenant();

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedTenant, setSelectedTenant] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [tenantToDelete, setTenantToDelete] =
    useState(null);

  const canCreate = can("tenant.create");
  const canEdit = can("tenant.edit");
  const canDelete = can("tenant.delete");

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

  async function handleSave(tenant) {
    try {
      if (selectedTenant) {
        await updateMutation.mutateAsync(tenant);
      } else {
        await addMutation.mutateAsync(tenant);
      }

      setShowModal(false);
      setSelectedTenant(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function openDeleteModal(id) {
    const tenant = tenants.find(
      (t) => t.id === id
    );

    setTenantToDelete(tenant);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!tenantToDelete) return;

    try {
      await deleteMutation.mutateAsync(
        tenantToDelete.id
      );

      setShowDeleteModal(false);
      setTenantToDelete(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const filteredTenants = tenants.filter(
    (tenant) => {
      const text = search.toLowerCase();

      const property =
        properties.find(
          (p) => p.id === tenant.propertyId
        ) || {};

      return (
        tenant.firstName
          ?.toLowerCase()
          .includes(text) ||

        tenant.lastName
          ?.toLowerCase()
          .includes(text) ||

        tenant.email
          ?.toLowerCase()
          .includes(text) ||

        property.name
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

  if (
    loading ||
    unitsLoading ||
    propertiesLoading
  ) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error.message}
      </div>
    );
  }

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
          properties={properties}
          onEdit={
            canEdit ? openEditModal : undefined
          }
          onDelete={
            canDelete
              ? openDeleteModal
              : undefined
          }
        />
      </Card>

      {(canCreate || canEdit) && (
        <TenantModal
          open={showModal}
          tenant={selectedTenant}
          units={units}
          properties={properties}
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