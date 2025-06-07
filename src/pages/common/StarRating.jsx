import { MdOutlineStarPurple500, MdStarHalf, MdOutlineStar } from "react-icons/md";

function StarRating({ rating }) {
    // Validate and clamp the rating between 0 and 3
    const safeRating = Math.min(Math.max(typeof rating === "number" ? rating : 0, 0), 3);

    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.25 && safeRating % 1 <= 0.75;
    const emptyStars = 3 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="inline-flex items-center gap-[1px]">
            {/* Full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <MdOutlineStarPurple500 key={`full-${index}`} size={24} className="text-[#c1ac15]" />
            ))}

            {/* Half star */}
            {hasHalfStar && (
                <MdStarHalf key="half-star" size={24} className="text-[#c1ac15]" />
            )}

            {/* Empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <MdOutlineStar key={`empty-${index}`} size={24} className="text-[#c1ac15]" />
            ))}
        </div>
    );
}

export default StarRating;
