import React from 'react';

import { CommentsList } from '../CommentsList';

import styles from './index.module.scss';

export const App: React.FC = () => {    
    return (
        <div>
            <CommentsList />
        </div>
    );
}