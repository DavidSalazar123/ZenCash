import React from 'react';

import { t } from 'i18next';

import { Text } from '../common/Text';
import { CheckboxOption } from '../modals/ImportTransactionsModal/CheckboxOption';
import { useCategories } from '../../hooks/useCategories';

import { Setting } from './UI';

export function Categorization() {
    const { grouped: categoryGroups } = useCategories();

    return (
        <Setting>
            <Text>
                <strong>Fuzzy Categorizaiton</strong> allow Fuzzy Finder to automatically categorize transactions based on your history based payee description
            </Text>
            {categoryGroups.map((group, groupIndex) => (
                group.categories?.map((cat, catIndex) => (
                    <CheckboxOption
                        id={cat.id}
                        key={`${groupIndex}-${catIndex}`}
                    >
                        {t(cat.name)}
                    </CheckboxOption>
                ))
            ))}
        </Setting >
    );
}
