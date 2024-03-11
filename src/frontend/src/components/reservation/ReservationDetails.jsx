import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import modifyReservation from "../../utilities/modifyReservation";

export default function ReservationDetails({ reservation, vehicle }) {
  const [fromDate, setFromDate] = React.useState(new Date(reservation.pickupDate));
  const [toDate, setToDate] = React.useState(new Date(reservation.returnDate));

  const handleModifyReservation = async () => {
    try {
      await modifyReservation(reservation._id, fromDate, toDate);
      // Consider updating state or providing feedback upon successful modification
    } catch (error) {
      console.error("Error modifying reservation:", error);
      // Provide feedback to the user about the error
    }
  };

  const total = computeTotal(fromDate, toDate, vehicle.price);

  return (
    <div className={"pl-3"}>
      <p>Vehicle: {vehicle.make} {vehicle.model}</p>
      <p>From: </p>
      {(new Date(reservation.returnDate) > new Date()) ? (
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MM/d/yyyy h:mm aa"
        />
      ) : (
        <p className={"font-bold"}>{fromDate.toDateString()}</p>
      )}
      <p>To: </p>
      {(new Date(reservation.returnDate) > new Date()) ? (
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MM/d/yyyy h:mm aa"
        />
      ) : (
        <p className={"font-bold"}>{toDate.toDateString()}</p>
      )}
      <p>Total: ${total}</p>
      {new Date(reservation.returnDate) > new Date() && (
        <button
          className="float-right ml-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleModifyReservation}
        >
          Modify
        </button>
      )}
    </div>
  );
}

function computeTotal(fromDate, toDate, price) {
  const diffTime = Math.abs(toDate - fromDate);
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays * price;
}
