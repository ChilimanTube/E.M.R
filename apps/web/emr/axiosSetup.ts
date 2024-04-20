import axios from 'axios';

export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem('jwtToken', token);
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('jwtToken');
};


export const setupAxiosInterceptors = (token: string) => {
    axios.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// const jwtToken = localStorage.getItem('jwtToken');
// if (jwtToken !== null) {
//     setupAxiosInterceptors(jwtToken);
// }

// axios.get('/api/protected')
//     .then((response) => {
//         console.log('Response from protected route:', response.data);
//     })
//     .catch((error) => {
//         console.error('Error fetching protected route:', error);
//     });


// export function getJwtToken() {
//     localStorage.getItem('jwtToken');
//     return jwtToken;
// }