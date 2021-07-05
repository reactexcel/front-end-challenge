import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddAppointment = ({ show, handleClose, handleAddAppointment }: any) => {
  const [formData, setFormData] = React.useState({
    clinicianName: "",
    endDate: "",
    id: "",
    patient: {
      id: "",
      name: "",
    },
    startDate: "",
    status: "CANCELLED",
  });
  const [submit, setSubmit] = React.useState(false);

  React.useEffect(() => {
    if (submit) {
      handleAddAppointment(formData);
    }
  }, [submit]);

  const handleSubmit = () => {
    setFormData({ ...formData, id: uuidv4() });
    setFormData({
      ...formData,
      patient: { ...formData.patient, id: uuidv4() },
    });
    setSubmit(true);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    patient: { ...formData.patient, name: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Clinician Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Clinician name"
                onChange={(e) =>
                  setFormData({ ...formData, clinicianName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Start Date"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter name"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddAppointment;
