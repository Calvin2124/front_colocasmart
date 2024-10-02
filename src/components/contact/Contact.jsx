import { useState } from "react";
import { Link } from "react-router-dom";
import { post } from "../../services/ApiService";
import './contact.scss';

export default function Contact() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rgpd, setRgpd] = useState(false);
        const handleSubmit = async (e) => {
            e.preventDefault();

            console.log(username, email, message);
            const data = {
                content: `Nouveau message du formulaire`,
                embeds: [{
                    title: 'Détails du message',
                    fields: [
                    { name: 'Nom', value: username },
                    { name: 'Email', value: email },
                    { name: 'Message', value: message }
                    ]
                }]
            };
            try {
                const response = await post('https://discord.com/api/webhooks/1288044432171728937/qZBU371r6Ydsw6fFvblgrIrsCAuLcmfKtoC9mK1d8iIHcAxGzc-oIU30QZ56hXnT6WEz', data);
        
                if (response.ok) {
                    console.log("Message envoyé avec succès !");
                    setEmail("");
                    setMessage("");
                    setUsername("");
                    setRgpd(false);
                } else {
                    console.error("Échec de l'envoi du message.");
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi :", error);
            }
        };
    return (
        <>
        <form 
            action="#"
            onSubmit={handleSubmit}
            className="px-2"
        >
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" 
                placeholder="Nom"
            />
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="Email"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
            />
            <div id="rgpd">
                <input 
                    value={rgpd}
                    onChange={(e) => setRgpd(true)}
                    type="checkbox" 
                    id="consent" 
                    name="consent" 
                    required
                />
                <label htmlFor="consent">
                    J'accepte que mes données personnelles soient collectées et utilisées conformément à la 
                    <Link to="/" target="_blank">Politique de Confidentialité</Link>.
                </label>
            </div>
            <button type="submit">Envoyer</button>
        </form>
        </>
    )
}
