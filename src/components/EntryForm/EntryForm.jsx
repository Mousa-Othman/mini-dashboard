// src/components/EntryForm/EntryForm.jsx
import React, { useState, useEffect } from "react";

function EntryForm({ initialData = null, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // لو فيه بيانات للتعديل، نملأ الحقول
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ارسال البيانات للمكون الأب
    onSubmit({
      id: initialData ? initialData.id : null,
      title,
      body,
    }).finally(() => setIsSubmitting(false));
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? "Edit Entry" : "Add Entry"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                  className="form-control"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
