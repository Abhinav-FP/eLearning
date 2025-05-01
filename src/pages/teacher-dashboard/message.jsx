import React, { useEffect, useRef, useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import moment from 'moment';
import Image from 'next/image';
import Listing from '@/pages/api/Listing';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import TeacherLayout from './Common/TeacherLayout';
import DefaultMessage from '../common/DefaultMessage';

export default function Message() {
  const [teacherId, setTeacherId] = useState("")
  const [message, setMessage] = useState('');
  const [usermessage, setUserMessage] = useState();
  const [Loading, setLoading] = useState();
  const [messageCount, SetmessageCount] = useState([])
  const [selectedIdUser, setSelectedIdUser] = useState();

  const chatContainerRef = useRef(null);
  const router = useRouter();
  const Query = router.query.query;

  useEffect(() => {
    if (Query) {
      setTeacherId(Query)
      MessageGetAlls(Query)
    }
  }, [Query]);


  const MessageCount = async () => {
    try {
      const main = new Listing();
      const response = await main.getCountmessage();
      SetmessageCount(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    MessageCount();
  }, []);



  const handleUserSelect = (user) => {
    setTeacherId(user?.student?._id)
    MessageGetAlls(user?.student?._id)
  };

  const MessageGetAlls = async (Id) => {
    try {
      const main = new Listing();
      const response = await main.MessageGetAll(Id);
      console.log("response.data.messages", response.data.messages);
      setUserMessage(response.data.messages);
      setSelectedIdUser(response.data.ReciverUser);
    } catch (error) {
      console.log("error", error);
    }
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    if (Loading) return;

    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.SendMessage({
        content: message,
        receiver: teacherId,
      });
      if (response?.data?.status) {
        MessageGetAlls(teacherId)
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
    <TeacherLayout page={"Messages"}>
      <>
        <div className="flex flex-wrap w-full">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4  rounded-lg pb-5 pt-2">
            <div className="mt-0 space-y-1 h-[calc(100vh-300px)] overflow-y-auto customscroll">
              {messageCount && messageCount.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(chat)}
                  className={`flex items-center  text-[#ffffff] min-h-[56px] pr-[66px] pl-[89px] py-[8px] hover:bg-[#CC28281A] relative cursor-pointer min-h-[72px] ${teacherId === chat?.teacher?._id ? "bg-[#CC28281A]" : "bg-[#fff]"}`}
                >
                  <Image
                    src={"/profile.png"}
                    width={50}
                    height={50}
                    alt={chat?.student?.name}
                    className="w-[50px] h-[50px] lg:w-[56px] lg:h-[56px] rounded-lg absolute left-[22px] top-1/2 -translate-y-1/2"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium font-inter text-base mb-0 text-black capitalize">{chat?.student?.name}</h3>
                    {chat?.count ? (
                      <p className="text-sm text-[#CC2828] font-inter tracking-[-0.04em] "> {chat?.count > 5 ? '5+' : chat?.count} unread messages</p>

                    ) : (
                      <p className="text-sm text-[#7A7A7A] font-inter tracking-[-0.04em]">Student</p>
                    )}
                  </div>
                  {chat?.count > 0 && (
                    <div className={` h-[28px] w-[28px] text-[#535353] text-xs font-bold flex items-center justify-center absolute right-[22px] rounded-full top-1/2 -translate-y-1/2 ${teacherId === chat?.tecaher?._id ? "bg-white" : "bg-[rgba(204,40,40,0.1)]"}`}>
                      {chat?.count > 5 ? '5+' : chat?.count}
                    </div>
                  )}
                </div>

              ))}

            </div>
          </div>

          {teacherId ? (
            <div className="w-full lg:w-3/4 flex flex-col  bg-[#F1F1F1]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 lg:gap-4 bg-[#FFFFFF] px-4 lg:px-5 py-3.5 lg:py-4">
                <Image
                  src={"/profile.png"}
                  width={45}
                  height={45}
                  alt={"chat.nam"}
                  className="w-[45px] h-[45px] rounded-full left-[22px] "
                />
                <div>
                  <h2 className="font-medium text-base text-black mb-0 tracking-[-0.06em] capitalize">{selectedIdUser?.name}</h2>
                  <p className="font-normal text-sm font-inter text-[#1E1E1E] capitalize">{selectedIdUser?.role}</p>
                </div>
              </div>
              {/* Chat Body */}
              <div
                ref={chatContainerRef}
                className="px-4 lg:px-5 pt-5 lg:pt-[30px] pb-[10px] min-h-[500px] max-h-[500px] overflow-y-auto"
              >
                <div className="bg-[#FEECDC] rounded-[14px] relative pl-[50px] lg:pl-[60px] pr-[20px] lg:pr-[30px] py-[12px] mb-[30px] text-sm text-[#1E1E1E] max-w-[570px] mx-auto">
                  <div className="absolute top-1/2 left-[20px] lg:left-[20px] -translate-y-1/2">
                    <CiLock color="#312E40" size={20} />
                  </div>
                  <span>Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
                </div>

                {usermessage && usermessage?.map((item, index) => {
                  const isIncoming = item.sent_by !== selectedIdUser?.role;
                  return (
                    <div className="mt-4 space-y-1" key={index}>
                      {index === 0 || formatDate(item.createdAt) !== formatDate(usermessage[index - 1]?.createdAt) ? (
                        <div className="text-center my-3">
                          <span className=" py-1 tracking-[-0.06em] font-inter text-base text-[#7A7A7A]">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      ) : null}
                      {isIncoming ? (
                        <>
                          <div className="flex justify-end">
                            <div className="bg-[rgba(204,40,40,0.1)] px-4 lg:px-5 py-[12px] lg:py-[15px] rounded-bl-[10px] rounded-t-[10px] lg:rounded-t-[15px] lg:rounded-bl-[15px] max-w-[60%]">
                              <p className="text-sm tracking-[-0.04em] font-inter text-[#535353] text-left">{item?.content}</p>
                            </div>
                          </div>

                          {item?.createdAt && (
                            <span className="tracking-[-0.04em] font-inter block text-[#535353] text-right text-sm  mt-2">
                              {moment(item.createdAt).format(" hh:mm A")}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-start">
                            <div className="bg-white  px-4 lg:px-5 py-[12px] lg:py-[15px] rounded-br-[10px] rounded-t-[10px] lg:rounded-t-[15px] lg:rounded-br-[15px] max-w-[60%]">
                              <p className="text-sm tracking-[-0.04em] font-inter  text-[#535353] text-left">{item?.content}</p>
                            </div>
                          </div>

                          {item?.createdAt && (
                            <span className="tracking-[-0.04em] font-inter block text-[#535353] text-left text-sm mt-2">
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
                <div className="px-4 lg:px-5 py-3.5 lg:py-4 flex items-center gap-2 bg-[#e5e5e5]">
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
                    className="w-full px-5 py-3 h-[50px] rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#CC2828] h-[50px] w-[50px] cursor-pointer text-white px-4 py-2 rounded-full hover:bg-[#ad0e0e] transition duration-200"
                  >
                    <IoSend size={22} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <DefaultMessage />
          )}
          {/* Chat Panel */}
        </div>
      </>
    </TeacherLayout>
  );
}