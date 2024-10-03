import React, { useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { CirclePlus, CircleX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddGroupForm from '../addGroupForm/AddGroupForm';
import JoinGroupForm from '../joinGroupForm/JoinGroupForm';
import './modalgroup.scss';

export default function EnhancedModal({ bouton, title, onGroupAdded}) {
const [modalState, setModalState] = useState({
    isOpen: false,
    gridTemplate: '50% 50%',
    leftVisible: true,
    rightVisible: true,
    leftClicked: false,
    rightClicked: false,
});

const updateModalState = useCallback((newState) => {
    setModalState(prevState => ({ ...prevState, ...newState }));
}, []);

const resetToInitialState = useCallback(() => {
    updateModalState({
    gridTemplate: '50% 50%',
    leftVisible: true,
    rightVisible: true,
    leftClicked: false,
    rightClicked: false,
    });
}, [updateModalState]);


const handleLeftMouseOver = useCallback(() => {
    if (!modalState.leftClicked && !modalState.rightClicked) {
    updateModalState({ gridTemplate: "70% 30%", rightVisible: false });
    }
}, [modalState.leftClicked, modalState.rightClicked, updateModalState]);

const handleLeftMouseOut = useCallback(() => {
    if (!modalState.leftClicked && !modalState.rightClicked) {
    updateModalState({ gridTemplate: "50% 50%", rightVisible: true });
    }
}, [modalState.leftClicked, modalState.rightClicked, updateModalState]);

const handleRightMouseOver = useCallback(() => {
    if (!modalState.leftClicked && !modalState.rightClicked) {
    updateModalState({ gridTemplate: "30% 70%", leftVisible: false });
    }
}, [modalState.leftClicked, modalState.rightClicked, updateModalState]);

const handleRightMouseOut = useCallback(() => {
    if (!modalState.leftClicked && !modalState.rightClicked) {
    updateModalState({ gridTemplate: "50% 50%", leftVisible: true });
    }
}, [modalState.leftClicked, modalState.rightClicked, updateModalState]);

const handleLeftClick = useCallback(() => {
    updateModalState({
    leftClicked: true,
    rightClicked: false,
    gridTemplate: "100% 0%",
    rightVisible: false
    });
}, [updateModalState]);

const handleRightClick = useCallback(() => {
    updateModalState({
    rightClicked: true,
    leftClicked: false,
    gridTemplate: "0% 100%",
    leftVisible: false
    });
}, [updateModalState]);

const renderGroupModal = () => (
        <Dialog.Panel className="modal max-w-5xl mx-auto bg-white rounded relative">
            <CircleX 
            onClick={() => updateModalState({ isOpen: false })} 
            className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            />
            {(modalState.leftClicked || modalState.rightClicked) && (
            <button
                onClick={resetToInitialState}
                className="absolute top-2 left-2 flex items-center text-blue-600 hover:text-blue-800 z-10"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Retour
            </button>
            )}
            <div className='container' style={{ 
            display: 'grid', 
            gridTemplateColumns: modalState.gridTemplate, 
            transition: 'grid-template-columns 0.3s ease',
            height: '500px',
            }}>
            <div 
                className='left flex items-center justify-center'
                onMouseOver={handleLeftMouseOver}
                onMouseOut={handleLeftMouseOut}
                onClick={handleLeftClick}
                style={{ 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {!modalState.leftClicked ? (
                <Link 
                    id='addGroup' 
                    className="text-lg font-semibold bg-white bg-opacity-75 px-4 py-2 rounded"
                    style={{ opacity: modalState.leftVisible ? 1 : 0 }}
                >
                    Ajouter un groupe
                </Link>
                ) : (
                <AddGroupForm onGroupAdded={onGroupAdded} />
                )}
            </div>
            <div 
                className='right flex items-center justify-center'
                onMouseOver={handleRightMouseOver}
                onMouseOut={handleRightMouseOut}
                onClick={handleRightClick}
                style={{ 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {!modalState.rightClicked ? (
                <Link 
                    id='createGroup' 
                    className="text-lg font-semibold bg-white bg-opacity-75 px-4 py-2 rounded"
                    style={{ opacity: modalState.rightVisible ? 1 : 0 }}
                >
                    Rejoindre un groupe
                </Link>
                ) : (
                <JoinGroupForm onGroupAdded={onGroupAdded}/>
                )}
            </div>
            </div>
        </Dialog.Panel>
);

const renderTaskModal = () => (
    <Dialog.Panel className="modal max-w-md mx-auto bg-white rounded relative p-6">
    <CircleX 
        onClick={() => updateModalState({ isOpen: false })} 
        className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
    />
    <h2 className="text-2xl font-bold mb-4">Ajouter un tag</h2>
    <form>
        <div className="mb-4">
        <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">Couleur du tag</label>
        <input type="text" id="taskName" name="taskName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Ajouter un tag
        </button>
    </form>
    </Dialog.Panel>
);

return (
    <>
    <li>
        <Link className="addGroup" href="#" onClick={() => updateModalState({ isOpen: true })}>
        <CirclePlus className="w-3 h-3" /> <span>{bouton}</span>
        </Link>
    </li>

    <Dialog 
        open={modalState.isOpen} 
        onClose={() => updateModalState({ isOpen: false })} 
        className="relative z-50"
    >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
        {title && (title.toLowerCase() === 'groupe'
            ? renderGroupModal()
            : title.toLowerCase() === 'task'
            ? renderTaskModal()
            : null)}
        </div>
    </Dialog>
    </>
);
}