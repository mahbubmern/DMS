import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import OutgoingDatatable from "../../../components/Datatables/OutgoingDatatable";

// import pdf Viewer
// import PDFViewer from "./PDFViewer";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import createToast from "../../../utils/createToast";
import { createOutgoing } from "../../../features/outgoing/outgoingApiSlice";
import {
  outgoingSelector,
  setEmptyMessage,
} from "../../../features/outgoing/outgoingSlice";

const Outgoing = () => {
  const dispatch = useDispatch();
  const { loader, error, message } = useSelector(outgoingSelector);
  // const pdfUrl = "https://example.com/path/to/your/file.pdf";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = getCurrentDate();

  // form Data init

  const [input, setInput] = useState({
    to: "",
    ref: "",
    date: currentDate,
    subject: "",
    category: "",
    file: null, // Initialize file as null
  });
  const fileInputRef = useRef(null);

  // Function to format date as "dd/mm/yyyy"
  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Pdf Element
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Retrieve the file object from event
    setInput((prevInput) => ({
      ...prevInput,
      file: file, // Update file object in input state
    }));

    if (file) {
      setPdfUrl(URL.createObjectURL(file));
      setPageNumber(1); // Reset page number when a new file is selected
    }
  };
  const handleOutgoingFile = (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("to", input.to);
    formData.append("ref", input.ref);
    formData.append("date", input.date);
    formData.append("subject", input.subject);
    formData.append("category", input.category);
    formData.append("file", input.file); // Append file to form data

    dispatch(createOutgoing(formData));
    fileInputRef.current.value = "";
    setPdfUrl(null);
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(setEmptyMessage());
      setInput({
        to: "",
        ref: "",
        date: "",
        subject: "",
        category: "",
        file: null, // Reset file object
      });
    }
    if (error) {
      createToast(error);
      dispatch(setEmptyMessage());
    }
  }, [message, error, dispatch]);

  // handle pdf file
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     setPdfUrl(URL.createObjectURL(file));
  //     setPageNumber(1); // Reset page number when a new file is selected
  //   }
  // };

  const modalOpen = () => {
    // open the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <Breadcrumb />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {/* Recent Orders */}
              <div className="card card-table">
                <div className="card-header">
                  <h5 className="card-title" style={{ color: "red" }}>
                    {" "}
                    Outgoing Letters &nbsp;
                    <a
                      className="btn btn-sm bg-success-light"
                      onClick={modalOpen}
                    >
                      <i className="fe fe-check"></i> Add
                    </a>
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <OutgoingDatatable />
                  </div>
                </div>
              </div>
              {/* /Recent Orders */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOutgoingFile} encType="multipart/form-data">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridIndex">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="To"
                  name="to"
                  value={input.to}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "lightyellow" }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridIndex">
                <Form.Label>Reference</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Reference"
                  name="ref"
                  value={input.ref}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "lightyellow" }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text" // Change type to "text" to allow custom formatting
                  name="date"
                  value={input.date}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "lightyellow" }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridId">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={input.subject}
                onChange={handleInputChange}
                style={{ backgroundColor: "lightyellow" }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridIndex">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={input.category}
                  onChange={handleInputChange}
                  style={{ backgroundColor: "lightyellow" }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridIndex">
                <Form.Label>Document</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  ref={fileInputRef} // Assign the ref to the file input element
                  onChange={handleFileChange}
                  style={{ backgroundColor: "lightyellow" }}
                />
              </Form.Group>
            </Row>

            <div>
              {/* <input type="file" onChange={handleFileChange} /> */}
              {pdfUrl && (
                <div>
                  <iframe
                    title="pdfViewer"
                    src={pdfUrl}
                    width="100%"
                    height="500px"
                    type="application/pdf"
                    frameBorder="0"
                    onLoadSuccess={onDocumentLoadSuccess}
                  />
                </div>
              )}
            </div>

            <Button variant="primary" type="submit" className="w-100">
              Add
            </Button>
          </Form>
        </Modal.Body>
        {/* Render PDFViewer component only if pdfUrl is not null */}
        {/* {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />} */}
      </Modal>
    </>
  );
};

export default Outgoing;
