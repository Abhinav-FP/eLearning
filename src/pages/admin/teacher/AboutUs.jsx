import React from 'react';

export default function AboutUs({ record }) {
  const renderField = (label, value, isHighlight = false) => (
    <div className="w-full sm:w-6/12 lg:w-4/12 mb-4">
      <label className="text-base font-semibold tracking-tight text-[#1E1E1E] block mb-1">
        {label}
      </label>
      <p
        className={`font-medium text-sm md:text-base tracking-tight ${
          isHighlight && value === true
            ? 'text-green-600'
            : 'text-[#8D929A]'
        }`}
      >
        {value === undefined || value === null || value === '' ? 'N/A' : value.toString()}
      </p>
    </div>
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
        {renderField('Gender', record?.gender)}
        {renderField('Japanese for me approved', record?.japanese_for_me_approved, true)}
        {renderField('Qualifications', record?.qualifications)}
        {renderField('Languages Spoken', record?.languages_spoken)}
        {renderField('Experience', record?.experience)}
        {renderField('Average Duration', record?.average_duration)}
        {renderField('Average Time', record?.average_time)}
        {renderField('Average Price', record?.average_price)}
      </div>

      {/* Description: full width */}
      <div className="w-full mt-6">
        <label className="text-base font-semibold tracking-tight text-[#1E1E1E] block mb-1">
          Description
        </label>
        <p className="font-medium text-sm md:text-base tracking-tight text-[#8D929A]">
          {record?.description || 'N/A'}
        </p>
      </div>
    </div>
  );
}
