import React, {useRef, useEffect} from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputComment } from '../components/InputComment';

import styles from './index.module.scss';

interface CommentsListProps {
    mainTitle?: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({
    mainTitle = 'Sample text with comments'
}) => {
    const [
        comments,
        createComment,
        updateComment,
        removeComment
    ] = useToDoStore(state => [
        state.comments,
        state.createComment,
        state.updateComment,
        state.removeComment,
    ]);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>{mainTitle}</h1>
            <p><img src='https://placehold.co/900x600' alt='Placeholder Image' width={900} height={600} /></p>
            <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                       if (title) {
                            createComment(title)
                       } 
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!comments.length && (
                    <p className={styles.articleText}>There is no comments yet.</p>
                )}
                {comments.map((comment) => (
                    <InputComment
                        key={comment.id}
                        id={comment.id}
                        title={comment.title}
                        onDone={removeComment}
                        onEdited={updateComment}
                        onRemoved={removeComment}
                    />
                ))}
            </section>
        </article>
    );
}
