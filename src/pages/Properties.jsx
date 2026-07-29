import { useState } from "react";

import {
  Button,
  Card,
  PageHeader,
} from "../components/common";

import SearchBar from "../components/landlords/SearchBar";

import PropertyCards from "../components/Properties/PropertyCards";
import PropertyModal from "../components/Properties/PropertyModal";
import DeletePropertyModal from "../components/Properties/DeletePropertyModal";

import { useProperties } from "../hooks/useProperties";
import { useLandlords } from "../hooks/useLandlords";

import { can } from "../services/permissionService";

export default function Properties() {
  const {
    properties,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useProperties();

  const {
    data: landlords = [],
    isLoading: landlordsLoading,
  } = useLandlords();

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [propertyToDelete, setPropertyToDelete] =
    useState(null);

  const canCreate = can("property.create");
  const canEdit = can("property.edit");
  const canDelete = can("property.delete");

  function openAddModal() {
    if (!canCreate) return;

    setSelectedProperty(null);
    setShowModal(true);
  }

  function openEditModal(property) {
    if (!canEdit) return;

    setSelectedProperty(property);
    setShowModal(true);
  }

  async function handleSave(property) {
    try {
      if (selectedProperty) {
        if (!canEdit) return;

        await updateProperty(property);
      } else {
        if (!canCreate) return;

        await addProperty(property);
      }

      setShowModal(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save property.");
    }
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const property = properties.find(
      (p) => p.id === id
    );

    setPropertyToDelete(property);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!canDelete) return;

    if (!propertyToDelete) return;

    try {
      await deleteProperty(propertyToDelete.id);

      setShowDeleteModal(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete property.");
    }
  }

  const filteredProperties = properties.filter(
    (property) => {
      const text = search.toLowerCase();

      const landlordName =
        landlords.find(
          (l) => l.id === property.landlordId
        )?.name || "";

      return (
        property.name
          .toLowerCase()
          .includes(text) ||
        property.address
          .toLowerCase()
          .includes(text) ||
        property.type
          .toLowerCase()
          .includes(text) ||
        landlordName
          .toLowerCase()
          .includes(text)
      );
    }
  );

  if (loading || landlordsLoading) {
    return (
      <p className="p-6">
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        subtitle="Manage all properties."
      >
        {canCreate && (
          <Button onClick={openAddModal}>
            + Add Property
          </Button>
        )}
      </PageHeader>

      <Card>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <PropertyCards
          properties={filteredProperties}
          landlords={landlords}
          onEdit={canEdit ? openEditModal : undefined}
          onDelete={
            canDelete ? openDeleteModal : undefined
          }
        />
      </Card>

      {(canCreate || canEdit) && (
        <PropertyModal
          open={showModal}
          property={selectedProperty}
          landlords={landlords}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {canDelete && (
        <DeletePropertyModal
          open={showDeleteModal}
          property={propertyToDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setPropertyToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}