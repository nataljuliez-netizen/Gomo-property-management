import { useEffect, useState } from "react";

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
  getUnits,
  addUnit,
  updateUnit,
  deleteUnit,
} from "../services/unitService";

import { getProperties } from "../services/propertyService";

import { can } from "../services/permissionService";

export default function Units() {
  const [units, setUnits] = useState([]);
  const [properties, setProperties] = useState([]);

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

  useEffect(() => {
    loadUnits();
    loadProperties();
  }, []);

  function loadUnits() {
    setUnits(getUnits());
  }

  function loadProperties() {
    setProperties(getProperties());
  }

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

  function handleSave(unit) {
    if (selectedUnit) {
      if (!canEdit) return;

      updateUnit(unit);
    } else {
      if (!canCreate) return;

      addUnit(unit);
    }

    loadUnits();

    setShowModal(false);
    setSelectedUnit(null);
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const unit = units.find(
      (u) => u.id === id
    );

    setUnitToDelete(unit);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (!canDelete) return;

    if (!unitToDelete) return;

    deleteUnit(unitToDelete.id);

    loadUnits();

    setShowDeleteModal(false);
    setUnitToDelete(null);
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
          .toLowerCase()
          .includes(text) ||

        (property.name || "")
          .toLowerCase()
          .includes(text) ||

        unit.status
          .toLowerCase()
          .includes(text)
      );
    }
  );

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