import React, { useState } from 'react';

import { t } from 'i18next';
import { Text } from '../common/Text';
import { Block } from '../common/Block';
import { CheckboxOption } from '../modals/ImportTransactionsModal/CheckboxOption';
import { theme } from '../../style';
import { useCategories } from '../../hooks/useCategories';
import { Button, ButtonWithLoading } from '../common/Button2';

import { Setting } from './UI';

export function Categorization() {
  const { grouped: categoryGroups } = useCategories();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (categoryName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    if (checked) {
      setCheckedCategories([...checkedCategories, categoryName])
    } else {
      setCheckedCategories(checkedCategories.filter(item => item !== categoryName));
    }
  }

  return (
    <Setting
      primaryAction={
        <>
          <ButtonWithLoading isLoading={isLoading}>
            {t('Upload data')}
          </ButtonWithLoading>
          {error && (
            <Block style={{ color: theme.errorText, marginTop: 15 }}>
              {t(
                'An unknown error occurred while exporting. Please report this as a new issue on Github.',
              )}
            </Block>
          )}
        </>
      }
    >
      <Text>
        <strong>Fuzzy Categorizaiton</strong> allow Fuzzy Finder to automatically categorize transactions based on your history based payee description
      </Text>
      <Text>
        Select the categories you would like to be categorized by Fuzzy Finder:
      </Text>
      {categoryGroups.map((group, groupIndex) => (
        group.categories?.map((cat, catIndex) => (
          <CheckboxOption
            id={cat.id}
            key={`${groupIndex}-${catIndex}`}
            onChange={handleCheckboxChange(cat.name)}
          >
            {t(cat.name)}
          </CheckboxOption>
        ))
      ))}
    </Setting >
  );
}
