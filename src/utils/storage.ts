import type { Comment, InvitationData } from '../types/invitation';

const COMMENTS_KEY = 'wedding_comments';
const DATA_KEY = 'wedding_invitation_data';
const LIKES_KEY = 'wedding_likes';

export const storage = {
  // Comments
  getComments: (): Comment[] => {
    const saved = localStorage.getItem(COMMENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  },
  
  saveComment: (comment: Omit<Comment, 'id' | 'date'>) => {
    const comments = storage.getComments();
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    localStorage.setItem(COMMENTS_KEY, JSON.stringify([newComment, ...comments]));
    return newComment;
  },

  deleteComment: (id: string) => {
    const comments = storage.getComments().filter(c => c.id !== id);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  },

  // Likes
  getLikes: (): number => {
    const saved = localStorage.getItem(LIKES_KEY);
    return saved ? parseInt(saved, 10) : 0;
  },

  addLike: () => {
    const current = storage.getLikes();
    localStorage.setItem(LIKES_KEY, (current + 1).toString());
  },

  // Settings / Invitation Data
  getInvitationData: (defaultData: InvitationData): InvitationData => {
    const saved = localStorage.getItem(DATA_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  },

  saveInvitationData: (data: InvitationData) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }
};
