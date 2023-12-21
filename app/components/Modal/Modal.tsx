import { IoCloseSharp } from 'react-icons/io5';
import clsx from 'clsx';


interface ModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ showModal, handleModalClose,  children }) => {
  return (
    <>
      <div
        id='modal-overlay'
        className={clsx(
          showModal ? '' : 'hidden',
          'fixed top-0 left-0',
          'w-full h-full',
          'z-20  bg-bg_overlay '
        )}
      ></div>

      <div
        id='modal'
        className={clsx(
          showModal ? '' : 'hidden',
          'fixed z-30 ',
          'flex flex-col',
          'rounded bg-white shadow',
          "absolute top-14 right-0",
        )}
      >
        <button
          className='text-bg_navbar  font-bold py-2 px-4 z-10 absolute right-1 top-1'
          id='close-button'
          onClick={handleModalClose}
        >
          <IoCloseSharp size={20} />
        </button>

       {children}
      </div>

   
    </>
  );
};

export default Modal;