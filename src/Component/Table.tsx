import React from "react";
import data from "../../data.json";
import AddAppointment from "./AddAppointment";

// name of the patient, start date, start time, duration, and clinician name.

const TableComponent = () => {
  const [json, setJson] = React.useState(data);
  const [edit, setEdit] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddAppointment = (formData: any) => {
    console.log(formData);
    let arr = json;
    arr.push(formData);
    setJson(arr);
    handleClose();
  };

  console.log(json);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleStartDate = (startDate: any) => {
    let d = new Date(startDate);
    return `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()} ${
      month[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  const handleStartTime = (startDate: any) => {
    let d = new Date(startDate);
    return `${d.getHours()} : ${d.getMinutes()}`;
  };

  const handleDuration = (startDate: any, endDate: any) => {
    let difference =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    let secondsDifference = Math.floor(difference / 1000);

    return `${daysDifference ? daysDifference + " days" : ""} ${
      hoursDifference ? hoursDifference + " hour" : ""
    } ${minutesDifference ? minutesDifference + "minutes" : ""} ${
      secondsDifference ? secondsDifference : ""
    }`;
  };

  const handleRemove = (value: any) => {
    setJson(json.filter((e) => e.id !== value.id));
  };

  const checkDuration = (startDate: any, endDate: any) => {
    if (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        1000 /
        60 /
        60 >
      1
    )
      return "bg-danger";
    else return "";
  };

  return (
    <div>
      <AddAppointment
        show={show}
        handleClose={handleClose}
        handleAddAppointment={handleAddAppointment}
      />
      <div>
        <div className="d-flex justify-content-between m-3 p-2">
          <h1>
            <button className="btn btn-lg btn-success" onClick={handleShow}>
              Add Appointment
            </button>
          </h1>
          <h1>
            <button className="btn btn-lg btn-danger" onClick={handleEdit}>
              {!edit ? "Remove Appointment" : "Done"}
            </button>
          </h1>
        </div>
        <table className="table text-center table-striped table-bordered table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Clinician Name</th>
              {edit && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {json
              .sort(
                (a: any, b: any) =>
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime()
              )
              .map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.patient.name}</td>
                    <td>{handleStartDate(value.startDate)}</td>
                    <td>{handleStartTime(value.startDate)}</td>
                    <td
                      className={checkDuration(value.startDate, value.endDate)}
                    >
                      {handleDuration(value.startDate, value.endDate)}
                    </td>
                    <td>{value.clinicianName}</td>
                    {edit && (
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleRemove(value)}
                        >
                          X
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
