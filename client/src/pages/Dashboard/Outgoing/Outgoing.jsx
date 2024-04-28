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
  setEmptyOutgoingMessage,
} from "../../../features/outgoing/outgoingSlice";
import { authSelector } from "../../../features/auth/authSlice";
import API from "../../../utils/api";

const Outgoing = () => {
  const dispatch = useDispatch();
  const { outgoingError, outgoingMessage } = useSelector(outgoingSelector);
  const { user } = useSelector(authSelector);
  // const pdfUrl = "https://example.com/path/to/your/file.pdf";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const todaysDate = new Date();
    const formattedDate = `${todaysDate.getFullYear()}-${(
      todaysDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${todaysDate.getDate().toString().padStart(2, "0")}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  // form Data init

  const [input, setInput] = useState({
    to: "",
    ref: "",
    date: "",
    subject: "",
    category: "",
    file: null, // Initialize file as null
  });
  const fileInputRef = useRef(null);

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
    formData.append("date", currentDate);
    formData.append("subject", input.subject);
    formData.append("category", categoryInput.category);
    formData.append("file", input.file); // Append file to form data

    dispatch(createOutgoing(formData));
    fileInputRef.current.value = "";
    setPdfUrl(null);
  };

  useEffect(() => {
    if (outgoingMessage) {
      createToast(outgoingMessage, "success");
      dispatch(setEmptyOutgoingMessage());
      setInput({
        to: "",
        ref: "",
        date: "",
        subject: "",
        file: null, // Reset file object
      });
    }
    if (outgoingError) {
      createToast(outgoingError);
      dispatch(setEmptyOutgoingMessage());
    }
  }, [outgoingMessage, outgoingError, dispatch]);

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

  const [categoryInput, setCategoryInput] = useState({ category: "" }); // Function to handle changes in the category input
  const handleCategoryChange = (e) => {
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };
  // handle add category modal

  const handleCategoryAdd = () => {
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleCategoryForm = async (e) => {
    e.preventDefault();

    try {
      // Send only the category value, not the entire categoryInput object
      await API.post("/api/v1/category", { category: categoryInput.category });
      createToast("Category Created Successful", "success");
    } catch (error) {
      console.error("Error to Create:", error);
    }
    setCategoryInput({
      category: "",
    });
  };

  const [cate, setCate] = useState([]);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        // Send only the category value, not the entire categoryInput object
        const response = await API.get("/api/v1/category");
        setCate(response.data.reverse());
      } catch (error) {
        console.error("Error to Fetch:", error);
      }
    };

    fetchCategoryList();
  }, []);

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
        <Modal.Header closeButton>
          {" "}
          <h6>Outgoing Letter</h6>
        </Modal.Header>
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
                  type="date"
                  name="date"
                  value={currentDate}
                  onChange={handleDateChange}
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
                <Form.Label>
                  Category &nbsp;{" "}
                  {user.role == "admin" ? (
                    <span
                      className="btn btn-sm bg-success-light"
                      onClick={handleCategoryAdd}
                    >
                      Add New Category
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Form.Label>
                <Form.Select
                  name="category"
                  value={categoryInput.category}
                  onChange={handleCategoryChange}
                  style={{ backgroundColor: "lightyellow" }}
                >
                  <option value="">-Select-</option>
                  {cate &&
                    cate.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </Form.Select>
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

      <Modal
        show={categoryModalOpen}
        onHide={closeCategoryModal}
        size="sm"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {" "}
          <h6>Add Category</h6>{" "}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCategoryForm}>
            <Form.Group className="mb-3" controlId="formGridId">
              <Form.Control
                type="text"
                placeholder="Write"
                name="category"
                value={categoryInput.category}
                onChange={handleCategoryChange}
                style={{ backgroundColor: "lightyellow" }}
              />
            </Form.Group>
            <Button type="submit" className="btn btn-sm bg-success-light w-100">
              Add Category
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
