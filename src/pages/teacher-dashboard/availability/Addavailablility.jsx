import Listing from '@/pages/api/Listing';
import Popup from '@/pages/common/Popup';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Addavailablility({ isOpen, onClose, TeacherAvailabilitys, selectedSlot }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  function toDatetimeLocal(date) {
    const pad = (n) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());

    // Round minutes to nearest 0 or 30
    let minutes = date.getMinutes();
    minutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 0;

    // If rounded to next hour (i.e., >45), increment hour
    let roundedHours = date.getHours();
    if (date.getMinutes() > 45) {
      roundedHours += 1;
    }

    const finalHours = pad(roundedHours % 24); // ensure 24 → 00
    const finalMinutes = pad(minutes);

    return `${year}-${month}-${day}T${finalHours}:${finalMinutes}`;
  }

  function adjustDateTime(input) {
  const [datePart, timePart] = input.split('T');

  if (timePart === '00:00') {
    const [year, month, day] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    console.log("Old date", date);

    date.setDate(date.getDate() + 1);

    // Get local date components
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const newDatePart = `${yyyy}-${mm}-${dd}`;
    console.log("New date", newDatePart);

    return `${newDatePart}T${timePart}`;
  }
  return input;
}


  useEffect(() => {
    if (selectedSlot?.start && selectedSlot?.end) {
      let endTime = toDatetimeLocal(new Date(selectedSlot?.end));
      endTime=adjustDateTime(endTime);
      console.log("endTime",endTime);
      setFormData((prev) => ({
        ...prev,
        startDateTime: toDatetimeLocal(new Date(selectedSlot?.start)),
        endDateTime: endTime,
      }));
    }
  }, [selectedSlot])

  const handleChange = (e) => {
    const { name, value } = e.target;
    const minutes = new Date(value).getMinutes();
  
    // Check if the time is not in :00 or :30 minutes
    if (minutes !== 0 && minutes !== 30) {
    toast.error("Please select a time with :00 or :30 minutes.");
    return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;

    const start = new Date(formData.startDateTime);
    const end = new Date(formData.endDateTime);
    console.log("start", start);
    console.log("end", end);

    const isValidTime = (date) => {
      const mins = date.getMinutes();
      return mins === 0 || mins === 30;
    };

    if (!isValidTime(start) || !isValidTime(end)) {
      toast.error("Only times ending in :00 or :30 are allowed.");
      return;
    }

    if (end <= start) {
      toast.error("End date/time must be after start date/time");
      return;
    }

    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.AddAvailablility({
        startDateTime: formData?.startDateTime,
        endDateTime: formData?.endDateTime,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({
          startDateTime: "",
          endDateTime: "",
        });
        TeacherAvailabilitys();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
    setLoading(false);
  };

  console.log("formData", formData);


  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <form
        onSubmit={handleAdd}
        className="max-w-md mx-auto lg:px-6 lg:py-4 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold lg:text-[28px] tracking-[-0.04em] text-center text-[#CC2828] mb-3 lg:mb-4">
          {"Add Availability"}
        </h2>
        {/* Title Field */}
        <div>
          <label className="block text-[#CC2828] text-base lg:text-xl font-medium mb-1 tracking-[-0.04em]">Start Date and time</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            placeholder="Enter start date and time"
            className="w-full p-3 rounded-md lg:rounded-lg text-base bg-[#F4F6F8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>
        {/* Description Field */}
        <div>
          <label className="block text-[#CC2828] text-base lg:text-xl font-medium mb-1 tracking-[-0.04em]">
            End Date and time
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            min={new Date().toISOString().slice(0, 16)}
            value={formData.endDateTime}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full p-3 rounded-md lg:rounded-lg text-base bg-[#F4F6F8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>
        <p class="text-sm text-gray-600 italic">
          ⏰ Please note: Only times ending in :00 or :30 are allowed. For example, 1:00 to 4:00 or 2:30 to 3:30 is valid — but 1:00 to 4:05 or 2:15 to 3:45 is not.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            className="cursor-pointer font-medium text-base lg:text-xl tracking-[-0.04em] flex-1 bg-[#CC2828] text-white py-2 lg:py-2.5 rounded-md lg:rounded-xl hover:bg-[#ad0e0e]"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Popup>
  )
}