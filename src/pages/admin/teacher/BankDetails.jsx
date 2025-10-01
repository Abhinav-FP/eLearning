import React from "react";

export default function BankDetails({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
        <div>
          <span className="font-medium">Bank Name:</span>{" "}
          {data.BankName || "N/A"}
        </div>
        <div>
          <span className="font-medium">Account Holder:</span>{" "}
          {data.AccountHolderName || "N/A"}
        </div>
        <div>
          <span className="font-medium">Bank Account Number:</span>{" "}
          {data.BankNumber || "N/A"}
        </div>
        {/* <div>
          <span className="font-medium">Branch Name:</span>{" "}
          {data.BranchName || "N/A"}
        </div> */}
        {/* <div>
          <span className="font-medium">IFSC:</span> {data.IFSC || "N/A"}
        </div>*/}
        <div> 
          <span className="font-medium">Account Type:</span>{" "}
          {data.AccountType || "N/A"}
        </div>
        <div>
          <span className="font-medium">Overseas Details:</span>{" "}
          {data.OverseasDetails || "N/A"}
        </div>
        <div>
          <span className="font-medium">Branch Code:</span>{" "}
          {data.BranchCode || "N/A"}
        </div>
      </div>
    </div>
  );
}