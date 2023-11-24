import { Fragment } from "react";
//fragment là một React element đặc biệt có tác dụng giúp cho Component nào khi dùng nó thì sẽ không được thêm vào DOM
// như vậy, ta có thể dùng nó để tạo hiệu ứng... mà không làm thay đổi bố cục (không thêm node vào DOM)
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
//Dialog là một headless UI có tác dụng hiện chiếm màn hình (giống các bảng thông báo trong windows), ta muốn dùng nó để khi bấm vào viewmore thì dialog hiện lên thể hiện chi tiết.
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";

// tạo kiểu dữ liệu CarDetailsProps, vì ở đây cần nhiều dữ liệu hơn so với CarProps có. Cụ thể ta cần thêm isOpen, và closeModal, nên ta tạo kiểu dữ liệu mới
interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
  <>
    {/* Transition sẽ giúp thêm hiệu ứng hiện từ từ  */}
    <Transition appear show={isOpen} as={Fragment}>
      {/* transition as fragment vì chỉ dùng để tạo hiệu ứng, không thêm bản thân nó vào DOM làm gì. */}
      {/* nó sẽ xuất hiện khi isOpen = true */}
      {/* khi nó xuất hiện thì Dialog thể hiện CarDetails cũng xuất hiện theo. */}
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        {/* khi onClose thì sẽ gọi closeModal, tức là sẽ gọi hàm setIsopen để set lại isOpen thành false */}
        {/* bản chất của Transition.Child đầu tiên này là đưa vào một khối div màu black có bg-opacity-25 nhằm tạo hiệu ứng làm cho nền tối mờ đi để làm nổi nội dung của dialog lên cho đẹp. */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          // ease-out duration-300,... để tạo hiệu ứng xuất hiện hay biến mất từ từ cho đẹp.
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

phần dưới này sẽ chứa nội dung chính của carcardetails.
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              //phần này có thêm scale thay đổi từ 95 sang 100 hoặc ngược lại để tạo hiệu ứng phóng to hay thu nhỏ lại bên cạnh hiệu ứng xuất hiện chậm, cũng để cho đẹp.
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                {/* max-h-[90vh] để dialog chỉ chiếm 90% của screen. */}
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>
{/* khối div chứa ảnh về car */}
                <div className='flex-1 flex flex-col gap-3'>
                  {/* khối div sẽ chứa ảnh chính trong dialog */}
                  <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                    <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
                  </div>
{/* khối div chứa 3 ảnh nhỏ. */}
                  <div className='flex gap-3'>
                    {/* ta thấy ở trên ảnh to vì đặt h-40, còn đây ảnh sẽ nhỏ hơn vì đặt h-24 */}
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image src={generateCarImageUrl(car, "29")} alt='car model' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image src={generateCarImageUrl(car, "33")} alt='car model' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image  src={generateCarImageUrl(car, "13")} alt='car model' fill priority className='object-contain' />
                    </div>
                  </div>
                </div>

{/* khối div này sẽ chứa các thông tin bổ sung cho carcarddetails */}
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='font-semibold text-xl capitalize'>
                    {car.make} {car.model}
                  </h2>

                  <div className='mt-3 flex flex-wrap gap-4'>
                    {/* ở đây ta muốn hiển thị chi tiết các thông số ra. */}
                    {/* car của ta là một object có key và value tương ứng. */}
                    {/* Do đó, dùng object.entries sẽ giúp trả về một array chứa từng cặp key và value này. */}
                    {/* Từ đó ta có thể map để thể hiện nó ra. */}
                    {Object.entries(car).map(([key, value]) => (
                      <div className='flex justify-between gap-5 w-full text-right' key={key} >
                        <h4 className='text-grey capitalize'>
                          {key.split("_").join(" ")}
                        {/* các key của ta đang ở dạng abc_def. Do đó, để nó hiển thị đẹp hơn thì ta sẽ phải thay hết _ với space. */}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);

export default CarDetails;
