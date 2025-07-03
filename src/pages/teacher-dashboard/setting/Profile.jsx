import Image from "next/image";
import React, { useEffect, useState } from "react";
import Profile_img from "../../Assets/Images/hero_top_img.png";
import timeZones from "../../../Json/TimeZone";
import Nationality from "../../../Json/Nationality.json";
import Qualification from "../../../Json/Qualification.json";
import langauage from "../../../Json/langauage.json";
import Listing from "@/pages/api/Listing";
import toast from "react-hot-toast";
import { TeacherProfileFormLoader } from "@/components/Loader";
import { useRole } from "@/context/RoleContext";

export default function Profile() {
  const [processing, setProcessing] = useState(false);
  const { setUser } = useRole();
  const [data, setData] = useState({
    name: "",
    email: "",
    timezone: "",
    nationality: "",
    languages_spoken: [],
    gender: "M",
    ais_trained: false,
    intro_video: "",
    interest: "",
    description: "",
    specialities: [],
  });
  const [file, setFile] = useState(null);
  const [newSpeciality, setNewSpeciality] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const main = new Listing();
    main
      .Teacherprofile()
      .then((r) => {
        const profiledata = r?.data?.data?.user;
        setData({
          name: profiledata?.userId?.name,
          email: profiledata?.userId?.email,
          timezone: profiledata?.userId?.time_zone,
          nationality: profiledata?.userId?.nationality,
          ais_trained: profiledata?.ais_trained,
          // average_time: profiledata?.average_time,
          // average_price: profiledata?.average_price,
          languages_spoken: profiledata?.languages_spoken,
          description: profiledata?.description,
          intro_video: profiledata?.intro_video,
          // experience: profiledata?.experience,
          gender: profiledata?.gender,
          // documentlink: profiledata?.documentlink,
          // qualifications: profiledata?.qualifications,
          specialities: profiledata?.tags || [],
        });
        setFile(profiledata?.userId?.profile_photo);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "languages_spoken") {
      if (!data?.languages_spoken?.includes(value) && value !== "")
        setData((prev) => ({
          ...prev,
          languages_spoken: [...(prev?.languages_spoken || []), value],
        }));
    } else if (name === "ais_trained") {
      setData((prevState) => ({
        ...prevState,
        [name]: value === "true", // convert string to boolean
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRemoveLanguage = (lang) => {
    setData((prev) => ({
      ...prev,
      languages_spoken: prev.languages_spoken.filter((l) => l !== lang),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data?.intro_video) {
      const url = data.intro_video;
      const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
      const isVimeo = url.includes('vimeo.com');
      if (!isYouTube && !isVimeo) {
        toast.error('Only YouTube and Vimeo links are allowed in intro video.');
        return;
      }
    }
    if (processing) return;
    setProcessing(true);
    try {
      const main = new Listing();
      const formData = new FormData();
      formData.append("name", data?.name)
      formData.append("email", data?.email)
      formData.append("timezone", data?.timezone)
      formData.append("nationality", data?.nationality)
      formData.append("languages_spoken", JSON.stringify(data.languages_spoken))
      formData.append("gender", data?.gender)
      formData.append("ais_trained", data?.ais_trained)
      formData.append("intro_video", data?.intro_video)
      formData.append("interest", data?.interest)
      // formData.append("experience", data?.experience)
      formData.append("description", data?.description)
      formData.append("tags", JSON.stringify(data?.specialities))
      // formData.append("average_price", data?.average_price)
      // formData.append("average_time", data?.average_time)
      // formData.append("qualifications", data?.qualifications)
      // if (data?.documentlink instanceof File) {
      //   formData.append("documentlink", data?.documentlink)
      // }
      if (file instanceof File) {
        formData.append("profile_photo", file);
      }
      const response = await main.TeacherprofileUpdate(formData);
      if (response?.data) {
        toast.success(response.data.message);
        // console.log("response?.data?.user",response?.data);
        setUser(response?.data?.data?.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    setProcessing(false);
  };

  const handleAddSpeciality = () => {
    const trimmed = newSpeciality && newSpeciality?.trim();
    if (!trimmed) {
      toast.error("Speciality can't be empty");
      return;
    }
    if (data && data?.specialities && data?.specialities?.includes(trimmed)) {
      toast.error("Speciality already present");
      return;
    }
    if (data && data?.specialities && data?.specialities?.length >= 5) {
      toast.error("Only 5 specialities are allowed");
      return;
    }
    if (trimmed) {
      setData((prev) => ({
        ...prev,
        specialities: [...prev.specialities, trimmed],
      }));
      setNewSpeciality("");
    }
  };

  const handleRemoveSpeciality = (item) => {
    setData((prev) => ({
      ...prev,
      specialities: prev.specialities.filter((spec) => spec !== item),
    }));
  };


  const handlefileChange = (e) => {
    const { name, type, files, value } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };


  return (
    <>
      {loading ?
        <TeacherProfileFormLoader />
        :
        <form onSubmit={handleSubmit}>
          <div className="border-b  border-[rgba(0,0,0,.1)] flex flex-wrap py-6 lg:py-8">
            <div className="w-full lg:w-5/12  lg:pr-3 mb-2 sm:mb-0">
              <label className="block text-[#CC2828] tracking-[-0.04em] font-medium text-base xl:text-xl mb-1">
                Your Photo
              </label>
              <p className="block text-[#535353] text-sm xl:text-base tracking-[-0.04em] font-medium">
                This will be displayed in your profile
              </p>
            </div>
            <div className="w-full lg:w-6/12 xl:w-5/12 lg:pl-3">
              <div className="flex items-center">
                <div className="relative h-[52px] w-[52px] flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4">
                  <Image
                    className="h-[52px] w-[52px] rounded-full object-cover object-top"
                    src={
                      file instanceof File
                        ? URL.createObjectURL(file)
                        : file || Profile_img
                    }
                    height={100}
                    width={100}
                    alt={data?.name || "Profile Image"}
                  />
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profileImageInput"
                  accept="image/*"
                />
                <label
                  htmlFor="profileImageInput"
                  className="text-[#CC2828] font-medium text-base xl:text-xl border-none tracking-[-0.04em] cursor-pointer"
                >
                  Update Profile
                </label>
              </div>
            </div>
          </div>
          <div className="border-b border-[rgba(0,0,0,.1)] py-6 lg:py-8 space-y-4 lg:space-y-6">
            <div className="flex flex-wrap -mx-2 space-y-4">
              <div className="w-full lg:w-6/12 px-2 ">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                  value={data?.name}
                  required
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full lg:w-6/12  px-2">

                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={data?.email}
                  required
                  name="email"
                  onChange={handleChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div>
              <div className="w-full lg:w-6/12  px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Time Zone<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none tracking-[-0.04em]"
                  onChange={handleChange}
                  value={data?.timezone}
                  name="timezone"
                  required
                >
                  <option value="" disabled>Please select Time-Zone</option>
                  {timeZones &&
                    timeZones.map((zone, index) => (
                      <option key={index} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full lg:w-6/12  px-2">
                <label
                  className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]"
                  onChange={handleChange}
                  value={data?.nationality}
                  name="nationality"
                >
                  Nationality
                </label>
                <select
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none tracking-[-0.04em]"
                  onChange={handleChange}
                  value={data?.nationality}
                  name="nationality"
                >
                  <option value="" disabled>Please select Nationality</option>
                  {Nationality &&
                    Nationality.map((zone, index) => (
                      <option key={index} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full lg:w-6/12 px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Languages spoken
                </label>

                <select
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none tracking-[-0.04em]"
                  onChange={handleChange}
                  value=""
                  name="languages_spoken"
                >
                  <option value="">Please select Languages spoken</option>
                  {langauage &&
                    langauage.map((zone, index) => (
                      <option key={index} value={zone}>
                        {zone}
                      </option>
                    ))}
                </select>

                {/* Display selected languages */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {data?.languages_spoken && data?.languages_spoken?.map((lang, idx) => (
                    <div
                      key={idx}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="text-red-500 hover:text-red-800 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-6/12  px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em] capitalize">
                  Intro video link (Only Youtube and vimeo allowed)
                </label>
                <input
                  type="text"
                  value={data?.intro_video}
                  name="intro_video"
                  onChange={handleChange}
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div>
              {/* <div className="w-full lg:w-6/12 px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Upload any relevant certificate
                </label>

                <input
                  type="file"
                  name="documentlink"
                  onChange={handlefileChange}
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />

                {data?.documentlink && typeof data.documentlink === 'string' && (
                  <div className="mt-2">
                    <a
                      href={data.documentlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-medium text-blue-600 underline hover:text-blue-800"
                    >
                      View uploaded document
                    </a>
                  </div>
                )}
              </div> */}

              {/* <div className="w-full lg:w-6/12  px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Experience (In Years)
                </label>
                <input
                  type="text"
                  value={data?.experience}
                  required
                  name="experience"
                  onChange={handleChange}
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div> */}

              {/* <div className="w-full lg:w-6/12  px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Average Price (In USD)
                </label>
                <input
                  type="number"
                  value={data?.average_price}
                  required
                  name="average_price"
                  onChange={handleChange}
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div>

              <div className="w-full lg:w-6/12  px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Average Time (In Minutes)
                </label>
                <input
                  type="number"
                  value={data?.average_time}
                  required
                  name="average_time"
                  onChange={handleChange}
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div> */}

              {/* <div className="w-full px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Qualification
                </label>
                <select
                  className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none tracking-[-0.04em]"
                  onChange={handleChange}
                  value={data?.qualifications}
                  name="qualifications"
                  required
                >
                  <option value="">Please select Qualification</option>
                  {Qualification &&
                    Qualification.map((zone, index) => (
                      <option key={index} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                </select>
              </div> */}

              <div className="w-full lg:w-6/12 px-2 mb-4">
                <label className="text-[#CC2828] font-medium text-base xl:text-xl mb-2 block">
                  Gender
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1 text-base">
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={data.gender === "M"}
                      onChange={handleChange}
                      className=" w-4 h-4 accent-[#CC2828]"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1 text-base">
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={data.gender === "F"}
                      onChange={handleChange}
                      className=" w-4 h-4 accent-[#CC2828]"
                    />
                    <span>Female</span>
                  </label>
                  {/* <label className="flex items-center space-x-1 text-base">
                    <input
                      type="radio"
                      name="gender"
                      value="O"
                      checked={data.gender === "O"}
                      onChange={handleChange}
                       className=" w-4 h-4 accent-[#CC2828]"
                    />
                    <span>Other</span>
                  </label> */}
                </div>
              </div>

              {/* AIS Trained */}
              <div className="w-full lg:w-6/12 px-2 mb-4">
                <label className="text-[#CC2828] font-medium text-base xl:text-xl mb-2 block">
                  Akita Inaka School Trained(AIS)
                </label>
                <div className="flex items-center space-x-4">
                  {data?.ais_trained ? "True" : "False"} (Can be changed by the Admin only)
                </div>
              </div>

              {/* Speciality Tags */}
              <div className="w-full px-2 mb-4">
                <div className="flex justify-between items-center mb-2 ">
                  <label className="text-[#CC2828] font-medium text-base xl:text-xl block">
                    Specialities (Upto 5 allowed)
                  </label>
                  {/* Character Counter */}
                  <p className="text-[#CC2828] text-sm">
                    {newSpeciality.length}/20 characters
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-full h-11 lg:h-[54px] font-medium appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                    maxLength={20} // prevent input over 30 characters
                    value={newSpeciality}
                    placeholder="Enter a speciality"
                    onChange={(e) => setNewSpeciality(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSpeciality();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSpeciality}
                    className="bg-[#CC2828] text-white px-6 h-11 lg:h-[54px] rounded-lg hover:bg-[#a81e1e] text-sm cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Show Added Specialities */}
                {data?.specialities?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.specialities.map((spec, idx) => (
                      <div
                        key={idx}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {spec}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpeciality(spec)}
                          className="text-red-500 hover:text-red-800 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Description */}
              <div className="w-full px-2">
                <label className="block text-[#CC2828] font-medium text-base xl:text-xl mb-1 tracking-[-0.04em]">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={data?.description}
                  name="description"
                  onChange={handleChange}
                  className="w-full font-medium text-base appearance-none block bg-[#F4F6F8] text-[#46494D] text-base border border-[#F4F6F8] rounded-lg py-3 px-3 lg:px-6 leading-tight focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-12/12 xl:w-11/12 flex-wrap justify-center items-center pt-6 lg:pt-10 space-x-4 lg:space-x-6">
            <button
              className="w-full max-w-[143px] md:max-w-[183px] cursor-pointer border border-[#CC2828] bg-[#CC2828] hover:bg-red-700  text-white py-2.5 lg:py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl transition  tracking-[-0.04em]"
              type="submit"
              // onClick={handleSubmit}
              disabled={processing}
            >
              {processing ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>}
    </>
  );
}
