import create from 'zustand';

import { generateId } from '../helpers';

interface Comment {
    id: string;
    title: string;
    createdAt: number;
}
interface CommentsStore {
    comments: Comment[];    
    createComment: (title: string) => void;
    updateComment: (id: string, title: string) => void;
    removeComment: (id: string) => void;
}

export const useCommentsStore = create<CommentsStore>((set, get) => ({
    comments: [],    
    createComment: (title) => {
        const { comments } = get();
        const newComment = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            comments: [newComment].concat(comments),
        })
    },
    updateComment: (id: string, title: string) => {
        const { comments } = get();
        set({
            comments: comments.map((comment) => ({
                ...comment,
                title: comment.id === id ? title : comment.title,
            }))
        });
    },
    removeComment: (id: string) => {
        const { comments } = get();
        set({
            comments: comments.filter((comment) => comment.id !== id),
        });
    },
}));