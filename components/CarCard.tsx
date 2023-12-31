// file này dùng để tạo component carcard
// carcard có nhiệm vụ hiển thị thông tin về car.
"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

// tạo interface kiểu dữ liệu CarCardProps:
// trong đó có property car có kiểu dữ liệu là CarProps
// kiểu dữ liệu CarProps này được khai báo trong @types/index.ts
interface CarCardProps {
  car: CarProps;
}

//dùng destructuring assignment để extract propterty car từ CarCardProps
const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
// dùng destructuring assignment để extract các properties từ car.
  const [isOpen, setIsOpen] = useState(false);
// state isOpen để track trạng thái user có bấm vào nút viewmore không
  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

{/* dùng component custombutton để tạo một nút viewmore ở carcard, tức là bấm vào thì sẽ ra hiện ra chi tiết hơn: ảnh to hơn, nhiều info hơn. */}
        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
            // khi bấm vào thì sẽ đổi state isOpen thành true
          />
        </div>
      </div>

{/* đây là component dùng để hiển thị chi tiết cho Carcard, nên nó cần có prop car. Nó sẽ hiện ra khi bấm vào nút viewmore ở carcard. */}
{/* Vì khi nó close thì state isOpen của carCard phải được set lại, nên nó cần có thêm một prop là closemodal có tác dụng gọi setIsOpen để set lại state isOpen. */}
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
