import "./style.css";

function Modal({ open, tableData, deleteUser, setOpenModal }) {
  return (
    <>
      {open && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">
              <h3>Are you sure you want to delete the user?</h3>
            </div>
            <div className="footer">
              <button
                className="btn btn-primary"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOpenModal(false);
                  deleteUser(tableData._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
