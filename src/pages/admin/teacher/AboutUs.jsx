import React from 'react';
import { IoMdEye } from 'react-icons/io';
import QualificationMapping from "../../../Json/Qualification.json";
import { TeacherDetailShimmer } from '@/components/Loader';


const qualificationLookup = QualificationMapping.reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});

export default function AboutUs({ record ,loading }) {
  console.log("record", record)
  const formatBoolean = (val) => (val === true ? 'Yes' : val === false ? 'No' : 'N/A');
  const formatGender = (val) => (val === 'M' ? 'Male' : val === 'F' ? 'Female' : val ? 'Other' : 'N/A');
  const formatQualification = (val) => qualificationLookup[val] || 'N/A';
  const formatArray = (val) => (Array.isArray(val) && val.length ? val.join(', ') : 'N/A');
  const formatText = (val) => (val !== undefined && val !== null && val !== '' ? val.toString() : 'N/A');

  if (!record) {
    return <p className="text-gray-500">No information available.</p>;
  }

  return (
    <>
    {loading ? (<TeacherDetailShimmer/>)  :(
       <section className="mt-6 mx-auto px-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Gender</label>
          <p className="font-medium text-sm md:text-base text-gray-600">{formatGender(record.gender)}</p>
        </div>


        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Japanese for Me Approved</label>
          <p className={`font-medium text-sm md:text-base ${record.japanese_for_me_approved ? 'text-green-600' : 'text-red-600'}`}>
            {formatBoolean(record.japanese_for_me_approved)}
          </p>
        </div>

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Admin Approved</label>
          <p className={`font-medium text-sm md:text-base ${record.admin_approved ? 'text-green-600' : 'text-red-600'}`}>
            {formatBoolean(record.admin_approved)}
          </p>
        </div>

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1"> Akita Inaka School (AIS) Trained</label>
          <p className={`font-medium text-sm md:text-base ${record.ais_trained ? 'text-green-600' : 'text-red-600'}`}>
            {formatBoolean(record.ais_trained)}
          </p>
        </div>

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Qualifications</label>
          <p className="font-medium text-sm md:text-base text-gray-600">{formatQualification(record.qualifications)}</p>
        </div>

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Experience</label>
          <p className="font-medium text-sm md:text-base text-gray-600">{formatText(record.experience)}</p>
        </div>


        {record.documentlink && (
          <div className="mb-1">
            <label className="block text-base font-semibold text-gray-800 mb-1">Uploaded Document</label>
            <a
              href={record.documentlink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
              title="View Document"
            >
              <IoMdEye className="w-5 h-5" />
              <span className="text-sm">View</span>
            </a>
          </div>
        )}

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Languages Spoken</label>
          <p className="font-medium text-sm md:text-base text-gray-600">{formatArray(record.languages_spoken)}</p>
        </div>

        <div className='mb-2'>
          <label className="block text-base font-semibold text-gray-800 mb-1">Tags</label>
          <p className="font-medium text-sm md:text-base text-gray-600">{formatArray(record.tags)}</p>
        </div>

      </div>



      <div className="mt-8">
        <label className="block text-base font-semibold text-gray-800 mb-1">Description</label>
        <p className="font-medium text-sm md:text-base text-gray-600 whitespace-pre-line">
          {record.description || 'N/A'}
        </p>
      </div>
    </section>
    ) }</>
   
  );
}
