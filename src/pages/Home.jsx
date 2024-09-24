import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import contactHome from '../assets/img/contactHome.webp';
import '../main.scss';
import { ChartPieIcon, ListTodo, LockKeyhole, UsersRound } from 'lucide-react';
import Contact from '../components/contact/Contact';

export default function Home() {
return (
    <>
    <Header />
    <main>
        <section id='section1' className='mb-20'>
            <div className="max-w-4xl m-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 h-screen">
                <div className="z-10 text-white">
                    <h1>Vivre ensemble,<br/> <span>C'est simple avec Colocasmart.</span></h1>
                    <p>Simplifiez votre vie en colocation grâce à nos outils de gestion quotidiens et financiers.</p>
                </div>
                <Link className='z-10' id='btnFree' to="#">Inscrivez-vous gratuitement</Link>
            </div>
        </section>

        {/* SECTION 2 */}
        <section id="services" className='mb-20'>
            <div className="max-w-7xl m-auto flex flex-col items-center gap-5 justify-center px-4 sm:px-6">
                <h2 className='text-5xl'>Gérez votre colocation facilement</h2>
                <p className='text-lg text-gray-500'>Notre application vous permet de créer et rejoindre des groupes de colocation, de planifier les tâches, de visualiser le budget et de vous inscrire en toute sécurité.</p>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <article>
                        <UsersRound className='text-5xl' />
                        <h3>Création de groupe</h3>
                        <p>Créez et rejoignez facilement des groupes de colocation.</p>
                    </article>
                    <article>
                        <ListTodo />
                        <h3>Planificartion des tâches</h3>
                        <p>Répartissez les tâches 
                            quotidiennes entre colocataires.</p>
                    </article>
                    <article>
                        <ChartPieIcon className='text-5xl' />
                        <h3>Gestion du budget</h3>
                        <p>Visualisez et gérez le budget de votre colocation.</p>
                    </article>
                    <article>
                        <LockKeyhole />
                        <h3>Inscription sécurisée</h3>
                        <p>Inscrivez-vous en toute sécurité sur notre plateforme.</p>
                    </article>
                </div>
            </div>
        </section>
        {/* SECTION 3 */}
        <section id="pret">
            <h2>Prêt à Simplifier Votre Vie en Colocation ?</h2>
            <a href="#">Inscrivez-vous gratuitement</a>
        </section>
        {/* SECTION 4 */}
        <section id="video">
            <div className="w-auto px-2 m-auto lg:max-w-7xl ">
                <h2>ColocaSmart : Votre Solution en Vidéo</h2>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/3HOGZvMsN2c?si=JjzrfPELZqg2eCMm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </section>
        <section id="contact">
            <h2 className='text-center text-4xl lg:text-5xl lg:px-2 font-bold mb-10'>Contactez-nous</h2>
            <div>
                <Contact />
                <img src={contactHome} alt="contact" />

            </div>
        </section>
    </main>
    <Footer />
    </>
);
}