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
import { ChatListShimmer, MessageLoader } from '@/components/Loader';

export default function Message() {
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState('');
  const [usermessage, setUserMessage] = useState();
  const [Loading, setLoading] = useState();
  const [chatListLoading, setChatListLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [messageCount, SetmessageCount] = useState([]);
  const [selectedIdUser, setSelectedIdUser] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const chatContainerRef = useRef(null);
  const router = useRouter();
  const Query = router.query.query;

  const skipNextRefresh = useRef(false);

  useEffect(() => {
    const handleResize = () => { };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (Query) {
      setTeacherId(Query);
      MessageGetAlls(Query);
    }
  }, [Query]);

  const MessageCount = async () => {
    try {
      setChatListLoading(true);
      const main = new Listing();
      const response = await main.getCountmessage();
      SetmessageCount(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
    setChatListLoading(false);
  };

  useEffect(() => {
    MessageCount();
  }, []);

  const handleUserSelect = (user) => {
    setTeacherId(user?.student?._id);
    MessageGetAlls(user?.student?._id);
    if (window.innerWidth < 1024) {
      setMobileOpen(true);
    }
  };

  const MessageGetAlls = async (Id, silent = false) => {
    try {
      if (!silent) setProcessing(true);
      const main = new Listing();
      const response = await main.MessageGetAll(Id);
      setUserMessage(response.data.messages);
      setSelectedIdUser(response.data.ReciverUser);
      if (!silent) setProcessing(false);
    } catch (error) {
      if (!silent) setProcessing(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (teacherId) {
        if (skipNextRefresh.current) {
          skipNextRefresh.current = false;
          return;
        }
        MessageGetAlls(teacherId, true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [teacherId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || Loading) return;
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.SendMessage({
        content: message,
        receiver: teacherId,
      });
      if (response?.data?.status) {
        skipNextRefresh.current = true;
        MessageGetAlls(teacherId);
        setMessage("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
    setLoading(false);
  };

  // === FIXED SCROLL TO BOTTOM ON NEW MESSAGE ===
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [usermessage]);

  const formatDate = (date) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const messageDate = moment(date).startOf("day");
    if (messageDate.isSame(today)) return "Today";
    if (messageDate.isSame(yesterday)) return "Yesterday";
    return moment(date).format("DD MMM YYYY ");
  };

  const linkify = (text) => {
    const urlRegex = /((https?:\/\/|www\.)[^\s]+)/g;
    if (!urlRegex.test(text)) return text;
    return text.split(urlRegex).map((part, i) => {
      if (urlRegex.test(part)) {
        const href = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            {part}
          </a>
        );
      }
      return part.replace(/https:\/\//g, '');
    });
  };

  return (
    <TeacherLayout page={"Messages"}>
      <div className="flex flex-wrap w-full">
        {/* Sidebar */}
        <div className={`w-full lg:w-4/12 xl:w-3/12 rounded-lg pt-2 ${mobileOpen ? 'hidden lg:block' : 'block lg:block'}`}>
          {chatListLoading ? <ChatListShimmer /> : (
            <div className="mt-0 space-y-1 lg:h-[calc(100vh-136px)] overflow-y-auto customscroll min-h-[300px] ">
              {messageCount?.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleUserSelect(chat)}
                  className={`flex items-center text-[#ffffff] min-h-[56px] pr-[66px] pl-[89px] py-[8px] hover:bg-[#CC28281A] relative cursor-pointer min-h-[72px] ${teacherId === chat?.teacher?._id ? "bg-[#CC28281A]" : "bg-[#fff]"}`}
                >
                  <Image
                    src={chat?.student?.profile_photo || "/profile.png"}
                    width={50}
                    height={50}
                    alt={chat?.student?.name}
                    className="w-[50px] h-[50px] lg:w-[56px] lg:h-[56px] rounded-full !object-cover absolute left-[22px] top-1/2 -translate-y-1/2"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium font-inter text-base mb-0 text-black capitalize">{chat?.student?.name}</h3>
                    {chat?.count ? (
                      <p className="text-sm text-[#CC2828] font-inter tracking-[-0.04em] ">{chat?.count > 5 ? '5+' : chat?.count} unread messages</p>
                    ) : (
                      <p className="text-sm text-[#7A7A7A] font-inter tracking-[-0.04em]">Student</p>
                    )}
                  </div>
                  {chat?.count > 0 && (
                    <div className={`h-[28px] w-[28px] text-[#535353] text-xs font-bold flex items-center justify-center absolute right-[22px] rounded-full top-1/2 -translate-y-1/2 ${teacherId === chat?.teacher?._id ? "bg-white" : "bg-[rgba(204,40,40,0.1)]"}`}>
                      {chat?.count > 5 ? '5+' : chat?.count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat panel */}
        {teacherId ? (
          <div className={`w-full lg:w-8/12 xl:w-9/12 flex flex-col bg-[#F1F1F1] ${mobileOpen ? "block lg:block" : "hidden lg:block"}`}>
            <div className="flex items-center gap-3 bg-[#FFFFFF] px-4 py-3.5">
              <Image
                src={selectedIdUser?.profile_photo || "/profile.png"}
                width={45}
                height={45}
                alt={selectedIdUser?.name}
                className="w-[45px] h-[45px] rounded-full !object-cover"
              />
              <div>
                <h2 className="font-medium text-base text-black mb-0 tracking-[-0.06em] capitalize">{selectedIdUser?.name}</h2>
                <p className="font-normal text-sm text-[#1E1E1E] capitalize">{selectedIdUser?.role}</p>
              </div>
              {mobileOpen && (
                <button onClick={() => setMobileOpen(false)} className='ml-auto px-6 py-2 text-[#CC2828] border border-[#CC2828] rounded-md text-xs hover:bg-[#CC2828] hover:text-white'>Back</button>
              )}
            </div>

            <div ref={chatContainerRef} className="px-4 pt-5 pb-[10px] h-[calc(100vh-287px)] overflow-y-auto">
              <div className="bg-[#FEECDC] rounded-[14px] relative pl-[50px] pr-[20px] py-[12px] mb-[30px] text-sm text-[#1E1E1E] max-w-[570px] mx-auto">
                <div className="absolute top-1/2 left-[20px] -translate-y-1/2">
                  <CiLock color="#312E40" size={20} />
                </div>
                <span>Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
              </div>
              {processing ? <MessageLoader /> : usermessage?.map((item, index) => {
                const isIncoming = item.sent_by !== selectedIdUser?.role;
                return (
                  <div key={index} className="mt-4 space-y-1">
                    {(index === 0 || formatDate(item.createdAt) !== formatDate(usermessage[index - 1]?.createdAt)) && (
                      <div className="text-center my-3">
                        <span className="py-1 text-base text-[#7A7A7A]">{formatDate(item.createdAt)}</span>
                      </div>
                    )}
                    <div className={`flex ${isIncoming ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${isIncoming ? 'bg-[rgba(204,40,40,0.1)]' : 'bg-white'} px-4 py-[12px] rounded-t-[15px] ${isIncoming ? 'rounded-bl-[15px]' : 'rounded-br-[15px]'} max-w-[60%]`}>
                        <p className="break-words text-sm text-[#535353]">{linkify(item?.content)}</p>
                      </div>
                    </div>
                    <span className={`block text-[#535353] text-sm mt-2 ${isIncoming ? 'text-right' : 'text-left'}`}>
                      {moment(item.createdAt).format("hh:mm A")}
                    </span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="px-4 py-3.5 flex items-center gap-2 bg-[#e5e5e5]">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type a message..."
                className="w-full px-5 py-3 resize-none min-h-[50px] max-h-[200px] rounded-lg border border-gray-200 focus:ring-1 focus:ring-gray-400 bg-white"
              />
              <button type="submit"
                className="bg-[#CC2828] h-[50px] w-[50px] cursor-pointer text-white px-4 py-2 rounded-full hover:bg-[#ad0e0e] transition duration-200"
              >
                <IoSend size={22} />
              </button>
            </form>
          </div>
        ) : (
          <DefaultMessage className={`${mobileOpen ? "block lg:block" : "hidden lg:block"}`} />
        )}
      </div>
    </TeacherLayout>
  );
}
