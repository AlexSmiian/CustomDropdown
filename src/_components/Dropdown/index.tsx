import { useState, useCallback } from 'react';
import type { KeyboardEvent} from 'react';
import styles from './Dropdown.module.css';
import {useFilteredOptions} from "../../_hooks/useFilteredOptions.ts";
import {useDropdown} from "../../_hooks/useDropdown.ts";
import {useOutsideClick} from "../../_hooks/useOutsideClick.ts";
import {useCloseOtherDropdowns} from "../../_hooks/useCloseOtherDropdowns.ts";
import type {CustomDropdownProps, DefaultOption} from "../../_types/types.ts";

export default function CustomDropdown<T extends DefaultOption | string>({
     options = [],
     value,
     onChange = () => {},
     placeholder = 'Оберіть опцію',
     searchPlaceholder = 'Пошук...',
     renderOption,
     renderSelected,
     onSearch,
     searchDebounce = 300,
     disabled = false,
     className = '',
 }: CustomDropdownProps<T>) {

    const getOptionValue = useCallback(
        (option: T) => (typeof option === 'string' ? option : (option as DefaultOption).value),
        []
    );

    const getOptionLabel = useCallback(
        (option: T) => (typeof option === 'string' ? option : (option as DefaultOption).label),
        []
    );

    const [searchQuery, setSearchQuery] = useState('');
    const { filteredOptions, isSearching } = useFilteredOptions(
        options,
        searchQuery,
        onSearch,
        searchDebounce,
        getOptionLabel
    );

    const {
        dropdownRef,
        isOpen,
        highlightedIndex,
        setHighlightedIndex,
        toggleDropdown,
        handleFocus,
        handleMouseDown,
        setIsOpen,
    } = useDropdown(disabled);

    useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);
    useCloseOtherDropdowns(dropdownRef, () => setIsOpen(false));

    const handleSelect = useCallback(
        (option: T) => {
            onChange(option);
            setIsOpen(false);
            setSearchQuery('');
            setHighlightedIndex(-1);
        },
        [onChange, setIsOpen, setHighlightedIndex]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLButtonElement>) => {
            if (disabled) return;

            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                        handleSelect(filteredOptions[highlightedIndex]);
                    }
                    break;

                case 'Escape':
                    setIsOpen(false);
                    setHighlightedIndex(-1);
                    break;
            }
        },
        [disabled, filteredOptions, highlightedIndex, handleSelect, setIsOpen, setHighlightedIndex]
    );

    const handleOptionKeyDown = useCallback(
        (e: KeyboardEvent<HTMLLIElement>, option: T) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelect(option);
            }
        },
        [handleSelect]
    );

    const selectedOption = options.find((option) => getOptionValue(option) === value);

    return (
        <div ref={dropdownRef} className={`${styles.customDropdown} ${className} ${disabled ? styles.disabled : ''}`}>
            <button
                type="button"
                className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''}`}
                onClick={toggleDropdown}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={styles.dropdownValue}>
                    {renderSelected && selectedOption
                        ? renderSelected(selectedOption)
                        : selectedOption
                            ? getOptionLabel(selectedOption)
                            : placeholder}
                </span>
                <span className={styles.dropdownArrow}>▼</span>
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownSearch}>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Пошук в списку"
                        />
                        {isSearching && <span className={styles.searchLoader}>...</span>}
                    </div>
                    <ul className={styles.dropdownList} role="listbox">
                        {filteredOptions.length === 0 ? (
                            <li className={styles.emptyMessage}>
                                {isSearching ? 'Пошук...' : 'Нічого не знайдено'}
                            </li>
                        ) : (
                            filteredOptions.map((option, i) => {
                                const val = getOptionValue(option);
                                const isSelected = val === value;
                                const isHighlighted = i === highlightedIndex;
                                return (
                                    <li
                                        key={val || `option-${i}`}
                                        role="option"
                                        onClick={() => handleSelect(option)}
                                        onMouseEnter={() => setHighlightedIndex(i)}
                                        onKeyDown={(e) => handleOptionKeyDown(e, option)}
                                        aria-selected={isSelected}
                                        className={`${isSelected ? styles.selected : ''} ${
                                            isHighlighted ? styles.highlighted : ''
                                        }`}
                                        tabIndex={0}
                                    >
                                        {renderOption ? renderOption(option, isSelected) : getOptionLabel(option)}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
