import { writable } from 'svelte/store';

export const users = writable<User[]>([]);
export const revealed = writable<boolean>(false);

let socket: WebSocket;

export const connectWebSocket = (name: string) => {
	socket = new WebSocket('ws://localhost:9090');

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
