import { writable } from 'svelte/store';

export const votes = writable<Vote[]>([]);
export const revealed = writable<boolean>(false);
export const activeUsers = writable<string[]>([]);

let socket: WebSocket;

export const connectWebSocket = (name: string) => {
	socket = new WebSocket('ws://localhost:9090');

	socket.onopen = () => {
		socket.send(JSON.stringify({ type: 'join', name }));
	};

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case 'init':
			case 'vote':
				votes.set(data.votes);
				break;
			case 'reset':
				votes.set([]);
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
