import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import WhyTech from "./WhyTech";
import JoinPlatform from "./JoinPlatform";
import FAQ from "../common/FAQ";
import ReadyJoin from "./ReadyJoin";
import Listing from "../api/Listing";
import { useRole } from "@/context/RoleContext";

export default function Index() {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { language } = useRole();
  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.TeacherFaqList();
      if (response.data) {
        setHomeData(response.data.data);
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

  const data = {
    "benefits": {
      "title": {
        "en": "Why Teach with Japanese for Me?",
        "ja": "Japanese for Meで教える魅力とは"
      },
      "description": {
        "en": "At Japanese for Me, we empower educators to share their passion, connect with eager learners worldwide, and thrive in a flexible, supportive environment.",
        "ja": "オンライン日本語教師としての魅力的なキャリアを築きたい方へ。Japanese for Me は、あなたのスキルを最大に活かし、安心して続ける環境を提供します。"
      },
      "points": [
        {
          "en": "Lowest commission from all online portals (10%)",
          "ja": "日本語教育に特化＆100%日本国内運営"
        },
        {
          "en": "Minimum hourly rates of $30",
          "ja": "教研第一の運営方針で、手数料も最小限"
        },
        {
          "en": "Free seminars from like-minded teachers every month",
          "ja": "時給30ドル以下なし！価格競争に巻き込まれない"
        },
        {
          "en": "Free legal support for online harassment and access to blacklisted students",
          "ja": "トラブル時も心強い法的サポート付き"
        },
        {
          "en": "Fully Japanese company focused on supporting the teachers over students",
          "ja": "仲間がいる！教師コミュニティで孤独を感じない"
        },
        {
          "en": "No license or teaching experience required",
          "ja": "教えながら学べる！スキルアップのチャンスも豊富"
        }
      ]
    },

    "requirements": {
      "title": {
        "en": "Ways to join the platform - NO LICENSE REQUIRED",
        "ja": "参加条件（資格の有無は問いません）"
      },
      "points": {
        "en": [
          "Finishing the online teachers course - link here",
          "Introduction from one of the current teachers (subject to the portal approval)",
          "For anyone who is unexperienced and below 20 years old - free access after finishing the online teachers course (the course fee is waived - limited number of applicants)",
          "Bringing over students with minimum of 80 hours teaching each month"
        ],
        "ja": [
          "公式オンライン講座（模擬授業を含む）を修了していること",
          "直近3ヶ月間において、毎月80時間以上のオンライン指導実績があること",
          "コース開始時に18歳以下で、コースを修了していること（コースは無料で提供いたします)",
        ],
      }
    },
    "join": {
      "heading": {
        "en": "Ready to Join Our Teaching Community?",
        "ja": "オンライン日本語教師として活動してみませんか？",
      },
      "text": {
        "en": "Take the first step toward an exciting and rewarding teaching journey.",
        "ja": "",
      },
      "button": {
        "en": "Become a Teacher Now",
        "ja": "今すぐ登録！",
      }
    }
  };

  return (
    <Layout>
      <WhyTech
        //  title={'Why Teach with Japanese for Me?'} 
        title={data?.benefits?.title[language] || ""}
        pargraph={data?.benefits?.description[language] || ""}
        points={data?.benefits?.points || []}
        language={language}
      />
      <JoinPlatform
        //  title={'Ways to join the platform - NO LICENSE REQUIRED'}
        title={data?.requirements?.title[language] || ""}
        points={data?.requirements?.points[language] || []}
      />
      <FAQ classess={'mt-[40px] md:mt-[80px] lg:mt-[100px] md:mb-5 lg:mb-10'} Faq={homeData} />
      <ReadyJoin data={data?.join} language={language} />
    </Layout>
  )
}