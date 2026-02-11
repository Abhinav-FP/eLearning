import Popup from '@/pages/common/Popup';
import React from 'react';

function Field({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span className="font-medium">{label}</span>
      <span className="capitalize text-left text-gray-600 max-w-[60%] break-words">{value}</span>
    </div>
  );
}

export default function BankDetailPopup({ isOpen, onClose, data }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} size="max-w-[510px]">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#55844D] mb-4">Bank Account Details</h2>

        <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
          <Field label="Bank Name" value={data?.BankName} />
          <Field label="Account Holder Name" value={data?.AccountHolderName} />
          <Field label="Bank Number" value={data?.BankNumber} />
          <Field label="Branch Name" value={data?.BranchName} />
          <Field label="IFSC Code" value={data?.IFSC || "-"} />
          <Field label="Account Type" value={data?.AccountType} />
          <Field label="Branch Code" value={data?.BranchCode} />
          <Field label="Overseas Details" value={data?.OverseasDetails || "-"} />
        </div>
      </div>
    </Popup>
  );
};
