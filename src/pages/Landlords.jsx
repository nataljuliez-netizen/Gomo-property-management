import { useEffect, useState } from "react";

import {
  Button,
  Card,
  PageHeader,
} from "../components/common";

import SearchBar from "../components/landlords/SearchBar";
import LandlordsTable from "../components/landlords/LandlordsTable";
import LandlordModal from "../components/landlords/LandlordModal";
import DeleteLandlordModal from "../components/landlords/DeleteLandlordModal";

import {
  getLandlords,
  addLandlord,
  updateLandlord,
  deleteLandlord,
} from "../services/landlordService";

import { can } from "../services/permissionService";

export default function Landlords() {
  const [landlords, setLandlords] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedLandlord, setSelectedLandlord] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [landlordToDelete, setLandlordToDelete] =
    useState(null);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("landlord.create");
  const canEdit = can("landlord.edit");
  const canDelete = can("landlord.delete");

  useEffect(() => {
    loadLandlords();
  }, []);

  function loadLandlords() {
    setLandlords(getLandlords());
  }

  function openAddModal() {
    if (!canCreate) return;

    setSelectedLandlord(null);
    setShowModal(true);
  }

  function openEditModal(landlord) {
    if (!canEdit) return;

    setSelectedLandlord(landlord);
    setShowModal(true);
  }

  function handleSave(landlord) {
    if (selectedLandlord) {
      if (!canEdit) return;

      updateLandlord(landlord);
    } else {
      if (!canCreate) return;

      addLandlord(landlord);
    }

    loadLandlords();

    setShowModal(false);
    setSelectedLandlord(null);
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const landlord = landlords.find(
      (l) => l.id === id
    );

    setLandlordToDelete(landlord);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (!canDelete) return;

    if (!landlordToDelete) return;

    deleteLandlord(landlordToDelete.id);

    loadLandlords();

    setShowDeleteModal(false);
    setLandlordToDelete(null);
  }

  const filteredLandlords = landlords.filter(
    (landlord) => {
      const text = search.toLowerCase();

      return (
        landlord.name
          .toLowerCase()
          .includes(text) ||
        landlord.phone
          .toLowerCase()
          .includes(text) ||
        landlord.email
          .toLowerCase()
          .includes(text)
      );
    }
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Landlords"
        subtitle="Manage all property owners."
      >
        {canCreate && (
          <Button onClick={openAddModal}>
            + Add Landlord
          </Button>
        )}
      </PageHeader>

      <Card>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <LandlordsTable
          landlords={filteredLandlords}
          onEdit={canEdit ? openEditModal : undefined}
          onDelete={
            canDelete ? openDeleteModal : undefined
          }
        />
      </Card>

      {(canCreate || canEdit) && (
        <LandlordModal
          open={showModal}
          landlord={selectedLandlord}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedLandlord(null);
          }}
        />
      )}

      {canDelete && (
        <DeleteLandlordModal
          open={showDeleteModal}
          landlord={landlordToDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setLandlordToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}