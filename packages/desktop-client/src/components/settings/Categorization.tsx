import React, { useState, useCallback } from 'react';

import { t } from 'i18next';
import { Text } from '../common/Text';
import { Block } from '../common/Block';
import { CheckboxOption } from '../modals/ImportTransactionsModal/CheckboxOption';
import { theme } from '../../style';
import { useCategories } from '../../hooks/useCategories';
import { ButtonWithLoading } from '../common/Button2';
import {
  useTransactions,
} from 'loot-core/client/data-hooks/transactions';
import * as queries from 'loot-core/client/queries';

import { Setting } from './UI';

/* OPEN ACTIONS
 * 1) How often do we want to index the fuzzy finder? Should it be automatic? What if I delete a transaction
 * 2)
 */

export function Categorization() {
  const { grouped: categoryGroups } = useCategories();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Collect transactions
  const baseTransactionsQuery = useCallback(
    () =>
      queries.transactions().options({ splits: 'none' }).select('*'),
    [],
  );
  const [transactionsQuery, setTransactionsQuery] = useState(
    baseTransactionsQuery(),
  );
  const transactions = useTransactions({
    query: transactionsQuery,
  });

  const handleCheckboxChange = (categoryName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    if (checked) {
      setCheckedCategories([...checkedCategories, categoryName])
    } else {
      setCheckedCategories(checkedCategories.filter(item => item !== categoryName));
    }
  }

  async function uploadTransactions() {

  }



  return (
    <Setting
      primaryAction={
        <>
          <ButtonWithLoading onPress={uploadTransactions} isLoading={isLoading}>
            {t('Save')}
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
        Select the categories you would like to be automatically categorized by Fuzzy Finder:
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
