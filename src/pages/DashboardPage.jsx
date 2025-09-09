import React, { useState, useEffect } from "react";
import API from "../data/Data.js";
import Table from "../components/Table/Table.jsx";
import EntryForm from "../components/EntryForm/EntryForm.jsx";
import Header from "../components/Header/Heade.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Swal from "sweetalert2";

function DashboardPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await API.get("/posts");
      setData(response.data || []);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = () => { setEditData(null); setShowModal(true); };
  const handleEdit = (rowData) => { setEditData(rowData); setShowModal(true); };

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await API.put(`/posts/${formData.id}`, formData);
        setData((prev) => prev.map((item) => item.id === formData.id ? formData : item));
        Swal.fire("Success", "Entry updated successfully.", "success");
      } else {
        const response = await API.post("/posts", formData);
        setData((prev) => [response.data, ...prev]);
        Swal.fire("Success", "Entry added successfully.", "success");
      }
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", "Failed to save data.", "error");
    }
  };

  const filteredData = (data || []).filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Dashboard</h2>
            <button className="btn btn-primary" onClick={handleAdd}>Add Entry</button>
          </div>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by Title..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />

          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Table data={paginatedData || []} onEdit={handleEdit} />
              <div className="d-flex justify-content-center mt-3">
                <ul className="pagination flex-wrap justify-content-center">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i+1} className={`page-item ${currentPage === i+1 ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {showModal && (
            <EntryForm initialData={editData} onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
