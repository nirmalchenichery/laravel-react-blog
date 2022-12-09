import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '@/Components/ModalEx';
import ModalDialog from '@/Components/ModalDialogCall'; 
import SimpleWithGrayFooter from '@/Components/SimpleWithGrayFooter'; 

export default function ShowBlog(props) {
    
    const [modalOn, setModalOn] = useState(false);
    const [choice, setChoice] = useState(false);

    function clicked() {
        setModalOn(true);
    }
        
    return (
        <>
            <Head title="Blog" />
            
            <div className="flex justify-center">
                <div className='flex cursor-pointer justify-center w-1/3 bg-blue-400 p-4 m-6 rounded text-white'
                    onClick={() => {
                        clicked();
                    }}

                >
                    Click Me!
                </div>
            </div>
            {
                modalOn && <Modal setModalOn={setModalOn} setChoice={setModalOn}/> 
            }
            <ModalDialog />

            {/* <SimpleWithGrayFooter /> */}
        </>
    );
}
