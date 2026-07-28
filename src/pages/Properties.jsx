import { useEffect, useState } from "react";

import {
  Button,
  Card,
  PageHeader,
} from "../components/common";

import SearchBar from "../components/landlords/SearchBar";

import PropertyCards from "../components/Properties/PropertyCards";
import PropertyModal from "../components/Properties/PropertyModal";
import DeletePropertyModal from "../components/Properties/DeletePropertyModal";

import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

import { getLandlords } from "../services/landlordService";

import { can } from "../services/permissionService";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [propertyToDelete, setPropertyToDelete] =
    useState(null);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("property.create");
  const canEdit = can("property.edit");
  const canDelete = can("property.delete");

  useEffect(() => {
    loadProperties();
    loadLandlords();
  }, []);

  function loadProperties() {
    setProperties(getProperties());
  }

  function loadLandlords() {
    setLandlords(getLandlords());
  }

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

  function handleSave(property) {
    if (selectedProperty) {
      if (!canEdit) return;

      updateProperty(property);
    } else {
      if (!canCreate) return;

      addProperty(property);
    }

    loadProperties();

    setShowModal(false);
    setSelectedProperty(null);
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const property = properties.find(
      (p) => p.id === id
    );

    setPropertyToDelete(property);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (!canDelete) return;

    if (!propertyToDelete) return;

    deleteProperty(propertyToDelete.id);

    loadProperties();

    setShowDeleteModal(false);
    setPropertyToDelete(null);
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
          onDelete={canDelete ? openDeleteModal : undefined}
        />
      </Card>

      {canCreate || canEdit ? (
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
      ) : null}

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