import { useState } from "react";

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
  useLandlords,
  useAddLandlord,
  useUpdateLandlord,
  useDeleteLandlord,
} from "../hooks/useLandlords";

import { can } from "../services/permissionService";

export default function Landlords() {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedLandlord, setSelectedLandlord] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [landlordToDelete, setLandlordToDelete] =
    useState(null);

  /* -------------------------------- */
  /* React Query                      */
  /* -------------------------------- */

  const {
    data: landlords = [],
    isLoading,
    error,
  } = useLandlords();

  const addMutation = useAddLandlord();
  const updateMutation = useUpdateLandlord();
  const deleteMutation = useDeleteLandlord();

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("landlord.create");
  const canEdit = can("landlord.edit");
  const canDelete = can("landlord.delete");

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

  async function handleSave(landlord) {
    try {
      if (selectedLandlord) {
        if (!canEdit) return;

        await updateMutation.mutateAsync(landlord);
      } else {
        if (!canCreate) return;

        await addMutation.mutateAsync(landlord);
      }

      setShowModal(false);
      setSelectedLandlord(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function openDeleteModal(id) {
    if (!canDelete) return;

    const landlord = landlords.find(
      (l) => l.id === id
    );

    setLandlordToDelete(landlord);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!canDelete) return;
    if (!landlordToDelete) return;

    try {
      await deleteMutation.mutateAsync(
        landlordToDelete.id
      );

      setShowDeleteModal(false);
      setLandlordToDelete(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const filteredLandlords = landlords.filter(
    (landlord) => {
      const text = search.toLowerCase();

      return (
        landlord.name
          ?.toLowerCase()
          .includes(text) ||
        landlord.phone
          ?.toLowerCase()
          .includes(text) ||
        landlord.email
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

  if (isLoading) {
    return <div className="p-6">Loading landlords...</div>;
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