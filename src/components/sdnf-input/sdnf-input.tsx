import * as React from 'react';
import { isEqual } from 'lodash';

import './sdnf-input.scss';

// import Sigma from '../../assets/images/sigma.png';

const SDNF_LABEL = 'Введите значения для СДНФ через запятую:';
const RANG_LABEL = 'Введите ранг термов:';
// const CHAR_WIDTH = 8;
// const MIN_WIDTH = CHAR_WIDTH * 5;

type SDNFInputProps = {
    onTermsChange?: (values: number[]) => void;
    onRangChange?: (rang: number) => void;
}

export const SDNFInput = ({ 
    onTermsChange,
    onRangChange,
}: SDNFInputProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [terms, setTerms] = React.useState<number[]>([]);
    const [rang, setRang] = React.useState(1);

    const handleOnTermsInputChange = React.useCallback(({ 
        target: { 
            value, 
        }, 
    }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(value);

        const convertedValues = value
            .split(',')
            .map(v => v.replace(/\s+/g, ''))
            .filter(v => v && !Number.isNaN(Number(v)))
            .map(v => Number(v));
        const filteredValues = Array.from(new Set(convertedValues));

        if(!isEqual(terms, filteredValues)){
            setTerms(filteredValues);
        }
    }, [terms]);

    const handleOnRangInputChange = React.useCallback(({ 
        target: { 
            value, 
        }, 
    }: React.ChangeEvent<HTMLInputElement>) => {
        if(rang !== value){
            setRang(value);
        }
    }, [rang]);

    React.useEffect(() => onTermsChange && onTermsChange(terms), [terms, onTermsChange]);
    React.useEffect(() => onRangChange && onRangChange(Number(rang)), [rang, onRangChange]);

    return (
        <div className="sdnf-input" >
            <div className="sdnf-input__input-wrapper">
                <label className="sdnf-input__label">{SDNF_LABEL}</label>
                <input 
                    type="text" 
                    className="sdnf-input__input" 
                    value={inputValue} 
                    onChange={handleOnTermsInputChange}/>
            </div>
            <div className="sdnf-input__input-wrapper">
                <label className="sdnf-input__label">{RANG_LABEL}</label>
                <input
                    type="number" 
                    className="sdnf-input__input"
                    min="1"
                    value={rang || ''}
                    onChange={handleOnRangInputChange}/>
            </div>
        </div>
    );
};