import Listing from '@/pages/api/Listing';
import Popup from '@/pages/common/Popup';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from "moment";

export default function Addavailablility({ isOpen, onClose, TeacherAvailabilitys, selectedSlot }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  // Convert date → YYYY-MM-DDTHH:mm (rounded to :00 or :30)
  function toDatetimeLocal(dateStr) {
    let m = moment(dateStr);

    // round minutes to nearest 00 or 30
    const minutes = m.minutes();
    if (minutes < 15) m.minutes(0);
    else if (minutes < 45) m.minutes(30);
    else m.minutes(0).add(1, "hour");

    return m.format("YYYY-MM-DDTHH:mm");
  }

  // If time is "00:00", shift date by +1 day
  function adjustDateTime(input) {
    const [datePart, timePart] = input.split("T");

    if (timePart === "00:00") {
      const newDate = moment(datePart).add(1, "day").format("YYYY-MM-DD");
      return `${newDate}T${timePart}`;
    }

    return input;
  }

  useEffect(() => {
    if (selectedSlot?.start && selectedSlot?.end) {
      let endTime = toDatetimeLocal(selectedSlot.end);
      // Old logic of adding +1 to date, used when system timezones were being enforced
      // endTime = adjustDateTime(endTime);
      endTime = toDatetimeLocal(endTime);

      setFormData((prev) => ({
        ...prev,
        startDateTime: toDatetimeLocal(selectedSlot.start),
        endDateTime: endTime,
      }));
    }
  }, [selectedSlot]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate :00 or :30 only
    const minutes = moment(value).minutes();
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

    const start = moment(formData.startDateTime);
    const end = moment(formData.endDateTime);

    // validate minutes again
    const validTime = (m) => {
      const mins = m.minutes();
      return mins === 0 || mins === 30;
    };

    if (!validTime(start) || !validTime(end)) {
      toast.error("Only times ending in :00 or :30 are allowed.");
      return;
    }

    if (!end.isAfter(start)) {
      toast.error("End date/time must be after start date/time");
      return;
    }

    setLoading(true);

    try {
      const main = new Listing();
      const response = await main.AddAvailablility({
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
      });

      if (response?.data?.status) {
        toast.success(response.data.message);
        setFormData({ startDateTime: "", endDateTime: "" });
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

  // min date for input
  const minDateTime = moment().format("YYYY-MM-DDTHH:mm");

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      <form
        onSubmit={handleAdd}
        className="max-w-md mx-auto lg:px-6 lg:py-4 bg-white space-y-2 sm:space-y-4"
      >
        <h2 className="text-xl md:text-2xl font-bold lg:text-[28px] tracking-[-0.04em] text-center text-[#CC2828] mb-3 lg:mb-4">
          Add Availability
        </h2>

        <div>
          <label className="block text-[#CC2828] text-base lg:text-xl font-medium mb-1 tracking-[-0.04em]">
            Start Date and Time
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            min={minDateTime}
            className="w-full p-3 rounded-md lg:rounded-lg text-base bg-[#F4F6F8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        <div>
          <label className="block text-[#CC2828] text-base lg:text-xl font-medium mb-1 tracking-[-0.04em]">
            End Date and Time
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            min={minDateTime}
            onChange={handleChange}
            className="w-full p-3 rounded-md lg:rounded-lg text-base bg-[#F4F6F8] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CC2828]"
            required
          />
        </div>

        <p class="text-sm text-gray-600 italic">
          ⏰ Please note: Only times ending in :00 or :30 are allowed. For example, 1:00 to 4:00 or 2:30 to 3:30 is valid — but 1:00 to 4:05 or 2:15 to 3:45 is not.
        </p>

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
  );
}