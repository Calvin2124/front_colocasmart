const local = 'http://localhost:3000/api';
// const dev = 'https://colocasmart-backend.herokuapp.com';

async function post(endpoint, data, token = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    // Ajout dynamique de l'en-tête Authorization si le token est présent
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${local}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // S'assurer que la réponse est bien au format JSON
}

export { post };

async function get(endpoint, token = null){
    const headers = {
        'Content-Type': 'application/json',
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    };
    const response = await fetch(`${local}/${endpoint}`, {
        method: 'GET',
        headers,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json(); 
}
export { get };