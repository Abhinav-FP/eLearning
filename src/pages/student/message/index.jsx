import React, { useState } from 'react';
import StudentLayout from '../Common/StudentLayout';
import {  CiLock } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import moment from 'moment';
import Image from 'next/image';

export default function Index(props) {
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: 'John Doe',
      message: 'Hello!',
      time: '12:30 PM',
      unread: 2,
      profile_url: 'https://via.placeholder.com/56',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'See you soon!',
      time: '1:45 PM',
      unread: 0,
      profile_url: 'https://via.placeholder.com/56',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(userData[0]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [usermessage, setUserMessage] = useState({
    sender_id: 1,
    receiver_id: 2,
    message: 'Hi there!',
    created_at: new Date().toISOString(),
  });

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    setUserMessage({
      sender_id: props?.auth?.admin?.id || 1,
      receiver_id: selectedUser.id,
      message: message,
      created_at: new Date().toISOString(),
    });

    setMessage('');
  };

  return (
    <StudentLayout page={"Messages"}>
      <>
        <div className="flex flex-wrap w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-[#ffffff] rounded-lg pb-5">
            <div className="mt-0 space-y-4 h-[calc(100vh-300px)] overflow-y-auto customscroll">
              {userData.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(chat)}
                  className="flex items-center bg-[#CC28281A] text-[#ffffff] min-h-[56px] pr-[66px] pl-[89px] pt-[15px] rounded-lg hover:bg-[#CC28281A] relative cursor-pointer "
                >
                  <Image
                    src={"/profile.png"}
                    width={50}
                    height={50}
                    alt={chat.name}
                    className="w-[50px] h-[50px] rounded-lg absolute left-[22px] top-1/2 -translate-y-1/2"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium font-inter text-base mb-1 text-black ">{chat.name}</h3>
                    {chat.unread ? (
                    <p className="text-sm text-[#CC2828] "> {chat.unread > 5 ? '5+' : chat.unread} unread messages</p>

                    ) : (
                    <p className="text-sm text-[#09132C]"> Teacher</p>

                    ) }
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-[#CC2828] h-[24px] w-[24px] text-[#fff] text-xs font-bold flex items-center justify-center absolute right-[22px] bottom-1.5 rounded-full">
                      {chat.unread > 5 ? '5+' : chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="w-full lg:w-3/4 flex flex-col rounded-full p-4">
            {/* Chat Header */}
            {selectedUser && (
              <div className="flex items-center gap-3 bg-[#CC2828] px-5 lg:px-[30px] py-4">
                <Image
                    src={"/profile.png"}
                    width={50}
                    height={50}
                    alt={"chat.nam"}
                    className="w-[50px] h-[50px] rounded-lg  left-[22px] "
                  />
                <div>
                <h2 className="font-medium text-base lg:text-[21px] text-[#FFFFFF]">{selectedUser.name}</h2>
                <p className="font-medium text-sm lg:text-[18pxs] text-[#FFFFFF]">{"Teacher"}</p>
                </div>
              </div>
            )}

            {/* Chat Body */}
            <div className="bg-[#ffffff] px-5 lg:px-[30px] pt-5 lg:pt-[35px] pb-[10px] min-h-[500px] max-h-[500px] overflow-y-auto">
              <div className="bg-[#EAEAEA] rounded-[14px] relative pl-[50px] lg:pl-[70px] pr-[20px] lg:pr-[30px] py-[12px] mb-[30px] text-sm text-[#1E1E1E] max-w-[570px] mx-auto">
                <div className="absolute top-1/2 left-[20px] lg:left-[30px] -translate-y-1/2">
                  <CiLock color="#312E40" size={20} />
                </div>
                <span>Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
              </div>

                <div className="mt-4 space-y-3">
                  {/* Incoming Message */}
                    <>
                      <div className="flex justify-end">
                        <div className="bg-[#EAEAEA]  px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-full max-w-[60%]">
                          <p className="text-sm lg:text-base  opacity-90">{usermessage?.message}</p>
                        </div>
                      </div>
                      <span className="block text-[#0B3048] text-right text-sm opacity-70 mt-3">
                        {moment(usermessage?.created_at).format('DD MM YYYY hh:mmA')}
                      </span>
                    </>
                    <>
                      <div className="flex justify-start">
                        <div className="bg-[#CC2828] px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-full max-w-[60%]">
                          <p className="text-sm lg:text-base text-[#ffffff] opacity-90">{"Hello"}</p>
                        </div>
                      </div>
                      <span className="block text-[#0B3048] text-left text-sm opacity-70 mt-3">
                        {moment(usermessage?.created_at).format('DD MM YYYY hh:mmA')}
                      </span>
                    </>
                </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage}>
              <div className="p-4 border-t flex items-center gap-2 bg-[#ffffff]">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#CC28281A]"
                />
                <button
                  type="submit"
                  className="bg-[#CC2828] text-white px-4 py-2 rounded-full hover:bg-[#0256cc] transition duration-200"
                >
                  <IoSend size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </StudentLayout>
  );
}
