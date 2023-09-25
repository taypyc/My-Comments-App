import React, {useState, useRef, useEffect} from 'react';

import styles from './index.module.scss';

interface InputCommentProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputComment: React.FC<InputCommentProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved
}) => {
    
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div className={styles.inputComment}>            
            { isEditMode ? (
                <textarea                        
                    ref={editTitleInputRef}
                    value={value}
                    onChange={(evt) => {
                        setValue(evt.target.value);
                    }}                    
                    className={styles.inputCommentEditTitle}
                />
            ) : (
                <h3 className={styles.inputCommentTitle}>{title}</h3>
            )}            
            { isEditMode ? (
                <button
                    aria-label="Save"
                    className={styles.inputCommentSave}
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <button
                    aria-label="Edit"
                    className={styles.inputCommentEdit}
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                />
            )}
            <button
                aria-label="Remove"
                className={styles.inputCommentRemove}
                onClick={() => {
                    if(confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    )
};