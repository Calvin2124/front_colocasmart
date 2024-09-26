import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CirclePlus, CircleX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './modalgroup.scss';

const EnhancedModal = ({ bouton }) => {
const [isOpen, setIsOpen] = useState(false);
const [gridTemplate, setGridTemplate] = useState('50% 50%');
const [leftVisible, setLeftVisible] = useState(true);
const [rightVisible, setRightVisible] = useState(true);
const [leftClicked, setLeftClicked] = useState(false);
const [rightClicked, setRightClicked] = useState(false);

const applyGridTemplate = (columns) => {
    setGridTemplate(columns);
};

const resetToInitialState = () => {
    setGridTemplate('50% 50%');
    setLeftVisible(true);
    setRightVisible(true);
    setLeftClicked(false);
    setRightClicked(false);
};

const handleLeftMouseOver = () => {
    if (!leftClicked && !rightClicked) {
    applyGridTemplate("70% 30%");
    setRightVisible(false);
    }
};

const handleLeftMouseOut = () => {
    if (!leftClicked && !rightClicked) {
    applyGridTemplate("50% 50%");
    setRightVisible(true);
    }
};

const handleRightMouseOver = () => {
    if (!leftClicked && !rightClicked) {
    applyGridTemplate("30% 70%");
    setLeftVisible(false);
    }
};

const handleRightMouseOut = () => {
    if (!leftClicked && !rightClicked) {
    applyGridTemplate("50% 50%");
    setLeftVisible(true);
    }
};

const handleLeftClick = () => {
    setLeftClicked(true);
    setRightClicked(false);
    applyGridTemplate("100% 0%");
    setRightVisible(false);
};

const handleRightClick = () => {
    setRightClicked(true);
    setLeftClicked(false);
    applyGridTemplate("0% 100%");
    setLeftVisible(false);
};

const AddGroupForm = () => (
    <form className="space-y-4 p-6 bg-white bg-opacity-90 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">Ajouter un groupe</h2>
    <div>
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nom du groupe</label>
        <input type="text" id="groupName" name="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="createGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" id="createGroupPass" name="createGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="confirmGroupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="password" id="confirmGroupPass" name="confirmGroupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Créer le groupe
    </button>
    </form>
);

const JoinGroupForm = () => (
    <form className="space-y-4 p-6 bg-white bg-opacity-90 rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-green-600">Rejoindre un groupe</h2>
    <div>
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Nom du groupe</label>
        <input type="text" id="groupName" name="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
    </div>
    <div>
        <label htmlFor="groupPass" className="block text-sm font-medium text-gray-700">Mot de passe du groupe</label>
        <input type="text" id="groupPass" name="groupPass" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="w-full bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        Rejoindre le groupe
    </button>
    </form>
);

return (
    <>
    <li>
        <Link className="addGroup" href="#" onClick={() => setIsOpen(true)}>
        <CirclePlus className="w-3 h-3" /> <span>{bouton}</span>
        </Link>
    </li>

    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="modal max-w-5xl mx-auto bg-white rounded relative">
            <CircleX 
            onClick={() => setIsOpen(false)} 
            className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            />
            {(leftClicked || rightClicked) && (
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
            gridTemplateColumns: gridTemplate, 
            transition: 'grid-template-columns 0.3s ease',
            height: '500px',
            }}>
            <div 
                className='left flex items-center justify-center'
                onMouseOver={handleLeftMouseOver}
                onMouseOut={handleLeftMouseOut}
                onClick={handleLeftClick}
                style={{ 
                transition: 'opacity 0.3s ease',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {!leftClicked ? (
                <Link 
                    id='addGroup' 
                    className="text-blue-600 hover:text-blue-800 text-lg font-semibold bg-white bg-opacity-75 px-4 py-2 rounded"
                    style={{ opacity: leftVisible ? 1 : 0 }}
                >
                    Ajouter un groupe
                </Link>
                ) : (
                <AddGroupForm />
                )}
            </div>
            <div 
                className='right flex items-center justify-center'
                onMouseOver={handleRightMouseOver}
                onMouseOut={handleRightMouseOut}
                onClick={handleRightClick}
                style={{ 
                transition: 'opacity 0.3s ease',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {!rightClicked ? (
                <Link 
                    id='createGroup' 
                    className="text-green-600 hover:text-green-800 text-lg font-semibold bg-white bg-opacity-75 px-4 py-2 rounded"
                    style={{ opacity: rightVisible ? 1 : 0 }}
                >
                    Rejoindre un groupe
                </Link>
                ) : (
                <JoinGroupForm />
                )}
            </div>
            </div>
        </Dialog.Panel>
        </div>
    </Dialog>
    </>
);
};

export default EnhancedModal;