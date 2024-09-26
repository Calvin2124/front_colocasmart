import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CirclePlus, CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import './modalgroup.scss';

const EnhancedModal = ({ bouton }) => {
const [isOpen, setIsOpen] = useState(false);
const [gridTemplate, setGridTemplate] = useState('50% 50%');
const [leftVisible, setLeftVisible] = useState(true);
const [rightVisible, setRightVisible] = useState(true);

const applyGridTemplate = (columns) => {
    setGridTemplate(columns);
};

const handleLeftMouseOver = () => {
    applyGridTemplate("70% 30%");
    setRightVisible(false);
};

const handleLeftMouseOut = () => {
    applyGridTemplate("50% 50%");
    setRightVisible(true);
};

const handleRightMouseOver = () => {
    applyGridTemplate("30% 70%");
    setLeftVisible(false);
};

const handleRightMouseOut = () => {
    applyGridTemplate("50% 50%");
    setLeftVisible(true);
};

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
        <Dialog.Panel className="modal max-w-5xl mx-auto bg-white rounded">
            <CircleX />
            <div className='container' style={{ display: 'grid', gridTemplateColumns: gridTemplate, transition: 'grid-template-columns 0.3s ease' }}>
            <div 
                className='left' 
                onMouseOver={handleLeftMouseOver}
                onMouseOut={handleLeftMouseOut}
                style={{ transition: 'opacity 0.3s ease' }}
            >
                <Link id='addGroup' style={{ opacity: leftVisible ? 1 : 0 }}>Ajouter un groupe</Link>
            </div>
            <div 
                className='right'
                onMouseOver={handleRightMouseOver}
                onMouseOut={handleRightMouseOut}
                style={{ transition: 'opacity 0.3s ease' }}
            >

                <Link id='createGroup' style={{ opacity: rightVisible ? 1 : 0 }}>Rejoindre un groupe</Link>
            </div>
            </div>
        </Dialog.Panel>
        </div>
    </Dialog>
    </>
);
};

export default EnhancedModal;