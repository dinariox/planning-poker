import { writable } from 'svelte/store';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const users = writable<User[]>([]);
export const revealed = writable<boolean>(false);

export const darkMode = writable<boolean>(false);

let socket: WebSocket;

export const connectWebSocket = (name: string) => {
	socket = new WebSocket(`${PUBLIC_BACKEND_URL}`);

	socket.onopen = () => {
		socket.send(JSON.stringify({ type: 'join', name }));
	};

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case 'users':
				users.set(data.users);
				break;
			case 'reset':
				users.update((users) => users.map((user) => ({ ...user, vote: null })));
				revealed.set(false);
				break;
			case 'reveal':
				revealed.set(true);
				break;
		}
	};
};

export const addVote = (name: string, value: number) => {
	socket.send(JSON.stringify({ type: 'vote', name, value }));
};

export const resetVotes = () => {
	socket.send(JSON.stringify({ type: 'reset' }));
};

export const revealVotes = () => {
	socket.send(JSON.stringify({ type: 'reveal' }));
};
