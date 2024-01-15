'use client';
import { httpClient } from '@/utils/api';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TitleUpdateModal({ id, title, submit, setSubmit }) {
    const [openModal, setOpenModal] = useState(false);
    const [newTitle, setNewTitle] = useState('')

    const handleTitleUpdate = (id, title) => {
        if (newTitle !== '' && title !== newTitle) {
            httpClient.patch(`/todos/${id}`, { title: newTitle })
                .then((response) => {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setSubmit(!submit)
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)} color='purple'>Edit</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Update Todo</Modal.Header>
                <Modal.Body>
                    <input className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        defaultValue={title}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex justify-center w-full'>
                        <Button color="green" onClick={() => {
                            setOpenModal(false)
                            handleTitleUpdate(id, title)
                        }
                        }>
                            Update
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TitleUpdateModal;