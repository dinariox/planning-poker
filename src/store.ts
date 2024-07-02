import { writable } from 'svelte/store';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { io, type Socket } from 'socket.io-client';

export const users = writable<User[]>([]);
export const revealed = writable<boolean>(false);

export const darkMode = writable<boolean>(false);

let socket: Socket | null;

export const connectWebSocket = (name: string) => {
	socket = io(`${PUBLIC_BACKEND_URL}`);

	socket.on('connect', () => {
		socket?.emit('join', name);
	});

	socket.on('users', (data) => {
		users.set(data);
	});

	socket.on('reset', () => {
		users.update((users) => users.map((user) => ({ ...user, vote: null })));
		revealed.set(false);
	});

	socket.on('reveal', () => {
		revealed.set(true);
	});

	socket.on('disconnect', () => {
		socket = null;
	});
};

export const addVote = (name: string, value: number) => {
	socket?.emit('vote', { name, value });
};

export const resetVotes = () => {
	socket?.emit('reset');
};

export const revealVotes = () => {
	socket?.emit('reveal');
};

export const disconnectFromSocket = () => {
	socket?.disconnect();
	socket = null;
};
