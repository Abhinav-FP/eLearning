import React, { useState } from 'react';
import StudentLayout from '../Common/StudentLayout';
import { CiSearch, CiLock } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import moment from 'moment';

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
    <StudentLayout>
      <>
        <div className="flex flex-wrap w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-[#0367F71A] rounded-bl-[20px] pb-5">
            <div className="px-[22px] py-[22px] relative">
              <div className="absolute top-1/2 left-9 text-[#8D929A] -translate-y-1/2">
                <CiSearch size={22} />
              </div>
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or start a new chat"
                className="w-full h-[38px] pl-11 text-sm bg-white border-0 max-w-[260px] rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="mt-0 space-y-4 h-[calc(100vh-300px)] overflow-y-auto customscroll">
              {userData.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(chat)}
                  className="flex items-center min-h-[56px] pr-[66px] pl-[89px] rounded-lg hover:bg-gray-200 relative cursor-pointer"
                >
                  <img
                    src={chat.profile_url}
                    alt={chat.name}
                    className="w-[56px] h-[56px] rounded-lg absolute left-[22px] top-1/2 -translate-y-1/2"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-base mb-1 text-[#1E1E1E]">{chat.name}</h3>
                    <p className="text-sm text-[#09132C]">{chat.message}</p>
                  </div>
                  <div className="text-xs text-[#829C99] absolute right-[22px] top-1.5">{chat.time}</div>
                  {chat.unread > 0 && (
                    <div className="bg-[#D1E4FF] h-[24px] w-[24px] text-[#0367F7] text-xs font-bold flex items-center justify-center absolute right-[22px] bottom-1.5 rounded-full">
                      {chat.unread > 5 ? '5+' : chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="w-full lg:w-3/4 flex flex-col bg-[#FAFAFA]">
            {/* Chat Header */}
            {selectedUser && (
              <div className="flex items-center gap-3 bg-[#F7F7FC] px-5 lg:px-[30px] py-4">
                <img
                  src={selectedUser.profile_url}
                  alt={selectedUser.name}
                  className="w-[46px] h-[46px] lg:w-[56px] lg:h-[56px] rounded-lg mb-1"
                />
                <h2 className="font-medium text-base lg:text-[21px] text-[#1E1E1E]">{selectedUser.name}</h2>
              </div>
            )}

            {/* Chat Body */}
            <div className="px-5 lg:px-[30px] pt-5 lg:pt-[35px] pb-[10px] min-h-[500px] max-h-[500px] overflow-y-auto">
              <div className="bg-[#FEECDC] rounded-[14px] relative pl-[50px] lg:pl-[70px] pr-[20px] lg:pr-[30px] py-[12px] mb-[30px] text-sm text-[#1E1E1E] max-w-[570px] mx-auto">
                <div className="absolute top-1/2 left-[20px] lg:left-[30px] -translate-y-1/2">
                  <CiLock color="#312E40" size={20} />
                </div>
                <span>Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
              </div>

              {usermessage && (
                <div className="mt-4 space-y-3">
                  {/* Incoming Message */}
                  {usermessage?.sender_id === (props?.auth?.admin?.id || 1) ? (
                    <>
                      <div className="flex justify-end">
                        <div className="bg-white px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-[18px] max-w-[60%]">
                          <p className="text-sm lg:text-base text-[#1E1E1E] opacity-90">{usermessage?.message}</p>
                        </div>
                      </div>
                      <span className="block text-[#0B3048] text-right text-sm opacity-70 mt-3">
                        {moment(usermessage?.created_at).format('DD MM YYYY hh:mmA')}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-start">
                        <div className="bg-white px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-[18px] max-w-[60%]">
                          <p className="text-sm lg:text-base text-[#1E1E1E] opacity-90">{usermessage?.message}</p>
                        </div>
                      </div>
                      <span className="block text-[#0B3048] text-left text-sm opacity-70 mt-3">
                        {moment(usermessage?.created_at).format('DD MM YYYY hh:mmA')}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage}>
              <div className="p-4 border-t flex items-center gap-2">
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
                  className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="bg-[#0367F7] text-white px-4 py-2 rounded-full hover:bg-[#0256cc] transition duration-200"
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
