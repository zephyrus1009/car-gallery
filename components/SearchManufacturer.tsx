//component này là con của component SearchBar
import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { manufacturers } from "@constants";
import { SearchManuFacturerProps } from "@types";

// 2 props manufacturer và setManufacturer sẽ được pass từ SearchBar. 2 props này chính là state của SearchBar. Tức là ở đây ta sẽ gán manufacturer thành giá trị của combobox. Từ đó, thay đổi giá trị được chọn ở combobox sẽ thay đổi manufacturer từ đó update ngược lên, thay đổi state của SearchBar.
const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  // tạo state để lưu input của user, giúp lọc manufacturers.
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
// lưu ý: replace(/\s+/g, "") is a JavaScript method that returns a new string with all the whitespace characters in the original string removed. The regular expression /\\s+/g matches one or more whitespace characters (spaces, tabs, line breaks, etc.) globally in the string, and the empty string "" is used as the replacement value. This is useful for removing spaces and other whitespace characters from a string before comparing or processing it.

        // Đoạn code trên nhằm mục đích lọc ra các manufacture từ query người dùng nhập vào
// 1. manufactures là mảng chứa các nhà sản xuất xe 
// 2. Nếu query empty thì giả về toàn bộ manufactures
// 3. nếu query không empty thì lọc ra và giả về các item từ manufactures thoả mãn: 
// mang mỗi item biến toàn bộ thành in thường, lọc hết toàn bộ khoảng trắng gây ra bởi spaces, tabs, line breaks, etc..Xem nó có chứa query không (query này cũng đã được chuyển thành in thường và lọc khoảng trắng). 


  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        {/* gán states của SearchBar vào Combobox */}
        {/* combobox này có tác dụng hiển thị ra list các manufacturer từ input của user. */}
        <div className='relative w-full'>
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='car logo'
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className='search-manufacturer__input'
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder='Volkswagen...'
          />

          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static
            >
              {/* nếu user có input, mà lọc không ra kết quả thì hiện create...; còn nếu có kết quả tương ứng, thì hiện list đó ra dưới dạng các option của combobox để cho user chọn. */}
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='search-manufacturer__option'
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
