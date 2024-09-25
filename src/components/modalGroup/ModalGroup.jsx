import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { CirclePlus, CircleX } from 'lucide-react'; // Assure-toi d'importer l'icône CirclePlus de ta bibliothèque
import { Link } from 'react-router-dom';
import './modalgroup.scss';

const SimpleModal = ({ bouton }) => {
const [isOpen, setIsOpen] = useState(false);

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
            <div className='container'>
                <div className='left'>
                    {/* <img src="./couple.webp" alt="logo" /> */}
                    <Link id='addGroup'>Ajouter un groupe</Link>
                </div>
                <div className='right'>
                    {/* <img src="./womenIdea.webp" alt="logo" /> */}
                    <Link id='createGroup'>Rejoindre un groupe</Link>
                </div>
            </div>
        </Dialog.Panel>
        </div>
    </Dialog>
    </>
);
};

export default SimpleModal;