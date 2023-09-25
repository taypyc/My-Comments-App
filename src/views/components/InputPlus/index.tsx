import React, {useState, useCallback} from 'react';

import styles from './index.module.scss';

interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({
    onAdd,
}) => {
    const [inputValue, setInputValue] = useState('');
    const addComment = useCallback(() => {
        onAdd(inputValue);        
        setInputValue('');
    }, [inputValue]);

    return (
        <div className={styles.inputPlus}>
            <textarea                
                className={styles.inputPlusValue}
                value={inputValue}
                onChange={(evt) => {                    
                    setInputValue(evt.target.value);
                }}                
                placeholder="Leave your comment here..."
            /> 
            <button
                onClick={addComment}
                aria-label="Add"
                className={styles.inputPlusButton}
            />
        </div>
    )
};