import React, { useEffect, useRef, useState } from 'react';
import StudentLayout from '../Common/StudentLayout';
import { CiLock } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import moment from 'moment';
import Image from 'next/image';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Index() {
  const chatContainerRef = useRef(null);

  const router = useRouter();
  console.log("router", router)

  const Query = router.query.query;

  console.log("Query", Query)

  const [selectedUser, setSelectedUser] = useState();
  const [message, setMessage] = useState('');
  const [usermessage, setUserMessage] = useState();
  const [Loading, setLoading] = useState();

  const [messageCount, SetmessageCount] = useState([])

  useEffect(() => {
    if (Query) {
      MessageGetAlls(Query)
    }
  }, [Query]);


  const MessageCount = async () => {
    try {
      const main = new Listing();
      const response = await main.getCountmessage();
      console.log("response", response)
      SetmessageCount(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    MessageCount();
  }, []);


  const handleUserSelect = (user) => {
    setSelectedUser(user);
    MessageGetAlls(user?.teacher?._id)
  };

  const MessageGetAlls = async (Id) => {
    console.log("Id", Id)
    try {
      const main = new Listing();
      const response = await main.MessageGetAll(Id);
      console.log("response", response)
      setUserMessage(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("usermessage", usermessage)

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (Loading) return;

    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.SendMessage({
        content: message,
        receiver: selectedUser?.teacher?._id,
      });
      if (response?.data?.status) {
        MessageGetAlls(selectedUser?.teacher?._id)
        setMessage("")
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [usermessage]);

  const formatDate = (date) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const messageDate = moment(date).startOf("day");
    if (messageDate.isSame(today)) {
      return "Today";
    } else if (messageDate.isSame(yesterday)) {
      return "Yesterday";
    } else {
      return moment(date).format("DD MMM YYYY ");
    }
  };


  return (
    <StudentLayout page={"Messages"}>
      <>
        <div className="flex flex-wrap w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-[#ffffff] rounded-lg pb-5">
            <div className="mt-0 space-y-4 h-[calc(100vh-300px)] overflow-y-auto customscroll">
              {messageCount && messageCount.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(chat)}
                  className="flex items-center bg-[#CC28281A] text-[#ffffff] min-h-[56px] pr-[66px] pl-[89px] pt-[15px] rounded-lg hover:bg-[#CC28281A] relative cursor-pointer "
                >
                  <Image
                    src={"/profile.png"}
                    width={50}
                    height={50}
                    alt={chat?.teacher?.name}
                    className="w-[50px] h-[50px] rounded-lg absolute left-[22px] top-1/2 -translate-y-1/2"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium font-inter text-base mb-1 text-black ">{chat?.teacher?.name}</h3>
                    {chat?.count ? (
                      <p className="text-sm text-[#CC2828] "> {chat?.count > 5 ? '5+' : chat?.count} unread messages</p>

                    ) : (
                      <p className="text-sm text-[#09132C]"> Teacher</p>

                    )}
                  </div>
                  {chat?.count > 0 && (
                    <div className="bg-[#CC2828] h-[24px] w-[24px] text-[#fff] text-xs font-bold flex items-center justify-center absolute right-[22px] bottom-1.5 rounded-full">
                      {chat?.count > 5 ? '5+' : chat?.count}
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
                  <h2 className="font-medium text-base lg:text-[21px] text-[#FFFFFF]">{selectedUser.teacher.name}</h2>
                  <p className="font-medium text-sm lg:text-[18pxs] text-[#FFFFFF] capitalize">{selectedUser.teacher.role}</p>
                </div>
              </div>
            )}

            {/* Chat Body */}
            <div
              ref={chatContainerRef}
              className="px-5 lg:px-[30px] pt-5 lg:pt-[35px] pb-[10px] min-h-[500px] max-h-[500px] overflow-y-auto"
            >
              <div className="bg-[#FEECDC] rounded-[14px] relative pl-[50px] lg:pl-[70px] pr-[20px] lg:pr-[30px] py-[12px] mb-[30px] text-sm text-[#1E1E1E] max-w-[570px] mx-auto">
                <div className="absolute top-1/2 left-[20px] lg:left-[30px] -translate-y-1/2">
                  <CiLock color="#312E40" size={20} />
                </div>
                <span>Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
              </div>

              {usermessage && usermessage?.map((item, index) => {
                const isIncoming = item.sent_by !== selectedUser?.teacher?.role;
                return (
                  <div className="mt-4 space-y-3" key={index}>
                    {index === 0 || formatDate(item.created_at) !== formatDate(usermessage[index - 1]?.created_at) ? (
                      <div className="text-center my-3">
                        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-600">
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                    ) : null}
                    {isIncoming ? (
                      <>
                        <div className="flex justify-end">
                          <div className="bg-red-500 px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-[18px] max-w-[60%]">
                            <p className="text-sm lg:text-base text-[#1E1E1E] opacity-90 text-black text-left">{item?.content}</p>
                          </div>
                        </div>

                        {item?.createdAt && (
                          <span className="block text-[#0B3048] text-right text-sm opacity-70 mt-3">
                            {moment(item.createdAt).format(" hh:mm A")}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-start">
                          <div className="bg-red-500  px-[15px] lg:px-[30px] py-[12px] lg:py-[18px] rounded-[18px] max-w-[60%]">
                            <p className="text-sm lg:text-base text-[#1E1E1E] opacity-90 text-left">{item?.content}</p>
                          </div>
                        </div>

                        {item?.createdAt && (
                          <span className="block text-[#0B3048] text-left text-sm opacity-70 mt-3">
                            {moment(item.createdAt).format("hh:mm A")}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
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
