import styles from "./dropdownBlock.module.css";
import CustomDropdown from "../../_components/Dropdown";
import {useState} from "react";
import type {CountryOption, ProductCategory} from "../../_types/types.ts";
import {categoryOptions, cityOptions, countryOptions} from "../../mockData/data.ts";
import {asyncSearch} from "../../_service/asyncSearch.ts";

export default function DropdownsBlock() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className={styles.appContainer}>
            <div className={styles.demoSection}>
                <div className={styles.dropdownWrapper}>
                    <label>Країна:</label>
                    <CustomDropdown<CountryOption>
                        options={countryOptions}
                        value={selectedCountry}
                        onChange={(o) => setSelectedCountry(o.value)}
                        onSearch={asyncSearch}
                        placeholder="Виберіть країну"

                        renderOption={(opt, selected) => (
                            <div className={styles.countryOption}>
                                <span className={styles.flag}>{opt.flag}</span>
                                <span className={styles.label}>{opt.label}</span>
                                {selected && <span className={styles.checkmark}>✓</span>}
                            </div>
                        )}

                        renderSelected={(opt) => (
                            <div className={styles.countrySelected}>
                                <span className={styles.flag}>{opt.flag}</span>
                                <span>{opt.label}</span>
                            </div>
                        )}
                    />
                </div>

                <div className={styles.dropdownWrapper}>
                    <label>Місто:</label>
                    <CustomDropdown<string>
                        options={cityOptions}
                        value={selectedCity}
                        onChange={(option) => setSelectedCity(option)}
                        onSearch={asyncSearch}
                        placeholder="Виберіть місто"
                    />
                </div>

                <div className={styles.dropdownWrapper}>
                    <label>Категорія продукту:</label>
                    <CustomDropdown<ProductCategory>
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={(option) => setSelectedCategory(option.value)}
                        onSearch={asyncSearch}
                        placeholder="Виберіть категорію"

                        renderOption={(opt, selected) => (
                            <div className={styles.categoryOption}>
                                <strong>{opt.label}</strong>
                                {selected && <span className={styles.checkmark}>✓</span>}
                            </div>
                        )}

                        renderSelected={(opt) => <span className={styles.categorySelected}>{opt.label}</span>}
                    />
                </div>

                <div className={styles.resultBox}>
                    <strong>Вибрано:</strong>
                    <div className={styles.selectedItems}>
                        <span>
                            Країна: {selectedCountry
                                            ? `${countryOptions.find(country => country.value === selectedCountry)?.flag} ${countryOptions.find(country => country.value === selectedCountry)?.label}`
                                            : 'не вибрано'}
                        </span>
                        <span>
                            Місто: {selectedCity ?? 'не вибрано'}
                        </span>
                        <span>
                            Категорія: {selectedCategory ? categoryOptions.find(category => category.value === selectedCategory)?.label : 'не вибрано'}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
