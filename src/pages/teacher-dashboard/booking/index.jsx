import React, { useState } from 'react'
import TeacherLayout from '../Common/TeacherLayout'

export default function Index() {

  const [TabOpen, setTabOpen] = useState('upcoming');

const data = [ 
  {

  }
]

  return (
    <TeacherLayout>
      <div className="min-h-screen p-5 lg:p-[30px]">
        <div className="flex justify-between items-center mb-4 lg:mb-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#CC2828] tracking-[-0.04em] font-inter">
            Bookings
          </h2>
        </div>
        <div className="">
          <div className='flex flex-wrap gap-10  mb-4'>
            <button onClick={() => setTabOpen('upcoming')} className={ `text-lg font-medium tracking-[-0.04em] px-10 py-2 rounded-[10px] cursor-pointer ${TabOpen === 'upcoming' ? 'bg-[#CC2828] text-[#fff]' : 'bg-[#E0E0E0] text-[#727272]'}`}>Upcoming</button>
            <button onClick={() => setTabOpen('completed')} className={ `text-lg font-medium tracking-[-0.04em] px-10 py-2 rounded-[10px] cursor-pointer ${TabOpen === 'completed' ? 'bg-[#CC2828] text-[#fff]' : 'bg-[#E0E0E0] text-[#727272]'}`}>Completed</button>
          </div>
          {
            TabOpen === 'upcoming' && (
               <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
                <table className="min-w-full text-sm text-center rounded-[20px]">
                  <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                    <tr>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Lesson name
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Lesson date and time
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Student Name
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Duration
                      </th> 
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      data?.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                        >
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.lesson}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.lessonDate}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.sudentName}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            ${item?.duration}
                          </td> 
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )
          }
          {
            TabOpen === 'completed' && (
              <div className="rounded-[5px] border border-[rgba(204,40,40,0.3)] overflow-x-auto">
                <table className="min-w-full text-sm text-center rounded-[20px]">
                  <thead className="bg-[rgba(204,40,40,0.1)] text-[#535353] tracking-[-0.04em] font-inter rounded-[20px] whitespace-nowrap">
                    <tr>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Lesson name
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Lesson date and time
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Student Name
                      </th>
                      <th className="font-normal text-sm lg:text-base px-3 lg:px-4 py-2 lg:py-3 border-t border-[rgba(204,40,40,0.2)] capitalize">
                        Duration
                      </th> 
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      data?.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-[rgba(204,40,40,0.1)] border-t border-[rgba(204,40,40,0.2)]"
                        >
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.lesson}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.lessonDate}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.sudentName}
                          </td>
                          <td className="px-3 lg:px-4 py-2 lg:py-3 text-black text-sm lg:text-base font-medium font-inter ">
                            {item?.duration}
                          </td> 
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </div>
      </div>
    </TeacherLayout>
  )
}

