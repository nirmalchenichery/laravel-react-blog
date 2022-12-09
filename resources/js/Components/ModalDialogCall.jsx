
import React, { useState }from "react";
import ModalDialog from '@/Components/ModalDialog'; 

export default function Modal() {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded 
                   shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {
        showModal ? <ModalDialog 
                        setShowModal={setShowModal}
                        title="Modal Title" 
                        btnOk ="Yes"
                        btnClose="No"
                        content="III always felt like I could do anything. 
                                 That’s the main thing people are controlled by! 
                                 Thoughts- their perception of themselves! They're 
                                 slowed down by their perception of themselves. 
                                 If you're taught you can’t do anything, 
                                 you won’t do anything. I was taught I could do everything."
                    /> : ""}
    </>
  );
}