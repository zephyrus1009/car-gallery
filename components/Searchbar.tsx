"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";
//tạo component SearchButton là child của component SearchBar
//component này ta muốn tuỳ biến style cho nó (có giao diện khác nhau tuỳ lúc)
// do đó,  tailwind css sẽ được pass từ SearchBar sang dưới dạng prop với tên là
// otherClasses
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  // style của button được lấy từ otherClasses
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);
//const add = (a, b) => {
//  return a + b;
//};
//equal with: 
//const add = (a, b) => (a + b);

const SearchBar = () => {
  // quản lý state với useState
  // state manufacturer của SearchBar sẽ được lấy giá trị ngược từ component con là SearchManufacturer
  const [manufacturer, setManuFacturer] = useState("");
  // state model được thay đổi nhờ element input
  const [model, setModel] = useState("");
// giúp navigation
  const router = useRouter();
//handleSearch là hàm được tạo để xử lý sự kiện onSubmit của Form element
// vì ở đây dùng typescript nên cần xác định kiểu dữ liệu cho e
// trong typescript thì React.FormEvent<HTMLFormElement> là kiểu dữ liệu 
// đại biểu cho Form event.
// ta lôi e vào hàm handleSearch ở đây để có thể dùng e.prevenDefault
// vì ở đây, ta không muốn dùng form như đúng công dụng của nó
// nên cần preven default behavior của nó khi được submit. 
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }
    //The trim() method removes whitespace from both ends of a string and returns the new string without the whitespace. If the string is empty or contains only whitespace, trim() returns an empty string
    // check xem input có phải empty không

    // nếu không empty thì biến tất thành lowercase rồi gọi hàm updateSarchparams để thay đổi giá trị URL. 
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

// khai báo hàm updateSearchParams có tác dụng thay đổi giá trị URL rồi route đến URL mới đó.
  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
       searchParams.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        {/* gán state manufacturer thành props của component SearchManufacturer để cập nhật giá trị từ đó lên. Do muốn dùng giá trị từ combobox của component này. */}
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
