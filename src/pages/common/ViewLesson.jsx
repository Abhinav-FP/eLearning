import { formatMultiPrice } from "@/components/ValueDataHook";
import Popup from "./Popup";

export default function ViewLesson({ title, description, price, duration, isOpen, setIsOpen }) {
    const onClose = () => setIsOpen(false);

    return (
        <>
            {isOpen && (
                <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
                    <div className="max-w-md mx-auto mt-5 px-4 sm:px-6 pb-6 bg-white space-y-5">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-semibold text-[#CC2828] tracking-tight capitalize">
                            {title || ""}
                        </h3>
                        {/* Description */}
                        <p
                            className="text-sm sm:text-base text-gray-800   rounded-md font-medium tracking-tight"
                        >
                            {description || ""}
                        </p>
                        {/* Price & Duration */}
                        {price && duration && (
                            <div className="text-left sm:text-left">
                                <div className="inline-block bg-[rgba(204,40,40,0.1)] tracking-[-0.04em] text-sm lg:text-base text-[#CC2828] font-semibold capitalize min-w-[140px] px-4 py-2 rounded-full">
                                    {`${formatMultiPrice(price, "USD")} / ${duration} min`}
                                </div>
                            </div>
                        )}
                        {/* Close Button */}
                     
                    </div>
                </Popup>
            )}
        </>
    );
}
