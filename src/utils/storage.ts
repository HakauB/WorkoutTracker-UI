const storagePrefix = "workout_tracker_";

const storage = {
    getToken: () => {
        return JSON.parse(window.localStorage.getItem('workout_tracker_token') as string);
    },
    setToken: (token: string) => {
        window.localStorage.setItem('workout_tracker_token', JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem('workout_tracker_token');
    }
}

export default storage;