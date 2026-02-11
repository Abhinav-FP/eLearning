import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import Image from "next/image";
import Heading from "../common/Heading";
import LineImg from "../Assets/Images/linebar-red.png";
import Listing from "../api/Listing";
import { BookLoader } from "@/components/Loader";
import Link from "next/link";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.homeCourse();
      if (response.data) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="pt-[115px] md:pt-[120px] lg:pt-[150px] pb-[20px] md:pb-[40px] lg:pb-[60px]">
        <div className="mx-auto container sm:container md:container lg:container xl:max-w-[1230px]  px-4">
          <Heading
            classess={"text-center mb-2 lg:mb-3"}
            title={"Explore Our Recommended Learning Resources"}
          />
          <p className="text-center text-[#535353] font-medium text-base -tracking-[0.03em] mb-4 lg:mb-5">
            Along with our in-house lessons, we’ve curated some valuable courses
            from trusted educators to support your learning journey. Click below
            to explore these resources directly on their platforms.
          </p>
          {/* <h2 className="text-center text-xl md:text-2xl lg:text-4xl font-bold -tracking-[0.03em] mb-4 lg:mb-5">
                    If you are not sure what teacher to choose, where to start, what to focus on - contact us
                    </h2>
                    <div className="flex justify-center mb-8 lg:mb-10">
                        <a
                            className="font-semibold bg-[#55844D] hover:bg-[#3d5e37] text-white transition-all duration-300 rounded-full py-2.5 px-6 md:py-3 md:px-8 text-sm md:text-base"
                            target="_blank"
                            href="https://www.takemetojapan.com/contact"
                        >
                            Let’s Work Together
                        </a>
                    </div> */}
          <div className="text-center mb-8 lg:mb-10">
            <Image className="inline-block" src={LineImg} alt="icon" />
          </div>
          {loading ? (
            <BookLoader />
          ) : data && data?.length === 0 ? (
            <div className="w-full text-center py-8 text-gray-500 text-lg">
              No course found
            </div>
          ) : (
            <div className="flex flex-wrap justify-center ">
              {data &&
                data?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full mb-6 lg:mb-8 bg-[#FFE8E8] rounded-[10px] p-5 md:p-8 lg:p-10"
                  >
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-[80px] lg:w-[276px]">
                        <Image
                          className={
                            "object-cover rounded-[10px] h-[250px] w-[276px]"
                          }
                          src={item?.thumbnail || "/Placeholder.png"}
                          alt={item?.title}
                          width={527}
                          height={311}
                        />
                      </div>
                      <div className="w-full md:w-[calc(100%-80px)] lg:w-[calc(100%-276px)] mt-2 md:mt-0 md:pl-6 lg:pl-8">
                        <h3 className="text-black text-xl lg:text-2xl font-bold -tracking-[0.03em] text-left mb-2.5 lg:mb-4 capitalize">
                          {item?.title}
                        </h3>
                        <p className="text-black text-base font-normal -tracking-[0.03em] mb-3 lg:mb-6">
                          {item?.description}
                        </p>
                        <div className="flex flex-wrap md:items-center md:justify-between">
                          <div className="w-full md:w-6/12 flex justify-start gap-3 md:gap-4 lg:gap-5 order-2 md:order-none">
                            <a href={item?.link} 
                            className="font-medium cursor-pointer rounded-full py-2 px-5 bg-[#55844D] hover:bg-[#3d5e37] text-white text-sm lg:text-base transition-all"
                            target="blank"
                            >
                              View
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
