import { writable } from 'svelte/store';

export const votes = writable<Vote[]>([]);
export const revealed = writable<boolean>(false);

export const addVote = (name: string, value: number) => {
	votes.update((v) => [...v, { name, value } satisfies Vote]);
};

export const resetVotes = () => {
	votes.set([]);
	revealed.set(false);
};

export const revealVotes = () => {
	revealed.set(true);
};
