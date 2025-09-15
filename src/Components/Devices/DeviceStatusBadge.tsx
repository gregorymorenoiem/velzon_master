import React from "react";

const DeviceStatusBadge = ({ status }: { status: "Online" | "Offline" }) => {
  if (status === "Online") {
    return (
      <span className="badge text-uppercase bg-success-subtle text-success">
        Online
      </span>
    );
  }
  return (
    <span className="badge text-uppercase bg-danger-subtle text-danger">
      Offline
    </span>
  );
};

export default DeviceStatusBadge;
