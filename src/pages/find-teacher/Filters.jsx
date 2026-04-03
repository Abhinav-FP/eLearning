import React, { useEffect, useState } from 'react'
import Popup from '../common/Popup';
import moment from 'moment-timezone';

export default function Filters({ isOpen, onClose, onSearch }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [englishOnly, setEnglishOnly] = useState(false);
  const [studentTimeZone, setStudentTimeZone] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const slots = [
    "6 AM - 9 AM",
    "9 AM - 12 PM",
    "12 PM - 3 PM",
    "3 PM - 6 PM",
    "6 PM - 9 PM",
    "9 PM - 12 AM",
    "12 AM - 3 AM",
    "3 AM - 6 AM"
  ];

  useEffect(() => {
    const detectedZone = moment.tz.guess();
    setStudentTimeZone(detectedZone || "");
  }, []);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSearch = () => {
    onSearch?.({
      days: selectedDays || [],
      slots: selectedSlots || [],
      english: englishOnly || false,
      studentTimeZone,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedDays([]);
    setSelectedSlots([]);
    setEnglishOnly(false);
    onSearch?.({
      days: [],
      slots: [],
      english: false,
      studentTimeZone,
    });
    onClose();
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <div className="mx-auto px-3 sm:px-6 pb-3 sm:pb-6 bg-white space-y-4 sm:space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#55844D]">
          Filters
        </h2>

        {/* Days */}
        <div>
          <h3 className="text-sm font-semibold text-[#33403D] mb-2">Days</h3>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-2 rounded border text-sm cursor-pointer ${
                  selectedDays.includes(day)
                    ? "bg-[#55844D] text-white border-[#55844D]"
                    : "bg-white text-[#33403D] border-gray-300"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div>
          <h3 className="text-sm font-semibold text-[#33403D] mb-2">Time Slots</h3>
          <div className="flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`px-3 py-2 rounded border text-sm cursor-pointer ${
                  selectedSlots.includes(slot)
                    ? "bg-[#55844D] text-white border-[#55844D]"
                    : "bg-white text-[#33403D] border-gray-300"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* English Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={englishOnly}
            onChange={() => setEnglishOnly(!englishOnly)}
          />
          <span className="text-sm text-[#33403D]">I want an English speaking teacher</span>
        </label>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded-md border border-[#55844D] text-[#55844D] text-sm font-medium cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 btn md cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Popup>
  );
}