import { useState } from "react";

import {
  Button,
  Card,
  PageHeader,
} from "../components/common";

import SearchBar from "../components/landlords/SearchBar";

import UnitCards from "../components/Units/UnitCards";
import UnitModal from "../components/Units/UnitModal";
import DeleteUnitModal from "../components/Units/DeleteUnitModal";

import {
  useUnits,
  useAddUnit,
  useUpdateUnit,
  useDeleteUnit,
} from "../hooks/useUnits";

import { useProperties } from "../hooks/useProperties";

import { can } from "../services/permissionService";

export default function Units() {
  const {
    units,
    loading,
    error,
  } = useUnits();

  const {
    properties,
    loading: propertiesLoading,
  } = useProperties();

  const addMutation = useAddUnit();
  const updateMutation = useUpdateUnit();
  const deleteMutation = useDeleteUnit();

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [unitToDelete, setUnitToDelete] =
    useState(null);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("unit.create");
  const canEdit = can("unit.edit");
  const canDelete = can("unit.delete");

  function openAddModal() {
    if (!canCreate) return;

    setSelectedUnit(null);
    setShowModal(true);
  }

  function openEditModal(unit) {
    if (!canEdit) return;

    setSelectedUnit(unit);
    setShowModal(true);
  }

  async function handleSave(unit) {
    try {
      if (selectedUnit) {
        if (!canEdit) return;

        await updateMutation.mutateAsync(unit);
      } else {
        if (!canCreate) return;

        await addMutation.mutateAsync(unit);
      }

      setShowModal(false);
      setSelectedUnit(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const unit = units.find(
      (u) => u.id === id
    );

    setUnitToDelete(unit);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!canDelete) return;
    if (!unitToDelete) return;

    try {
      await deleteMutation.mutateAsync(
        unitToDelete.id
      );

      setShowDeleteModal(false);
      setUnitToDelete(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const filteredUnits = units.filter(
    (unit) => {
      const property =
        properties.find(
          (p) => p.id === unit.propertyId
        ) || {};

      const text = search.toLowerCase();

      return (
        unit.unitNumber
          ?.toLowerCase()
          .includes(text) ||

        (property.name || "")
          .toLowerCase()
          .includes(text) ||

        unit.status
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

  if (loading || propertiesLoading) {
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
        title="Units"
        subtitle="Manage all rental units."
      >
        {canCreate && (
          <Button onClick={openAddModal}>
            + Add Unit
          </Button>
        )}
      </PageHeader>

      <Card>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <UnitCards
          units={filteredUnits}
          properties={properties}
          onEdit={canEdit ? openEditModal : undefined}
          onDelete={
            canDelete ? openDeleteModal : undefined
          }
        />
      </Card>

      {(canCreate || canEdit) && (
        <UnitModal
          open={showModal}
          unit={selectedUnit}
          properties={properties}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedUnit(null);
          }}
        />
      )}

      {canDelete && (
        <DeleteUnitModal
          open={showDeleteModal}
          unit={unitToDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setUnitToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}