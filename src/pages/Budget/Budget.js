import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Wrapper, LoadingIndicator, Button } from 'components';
import { fetchAllCategories } from 'data/actions/common.actions';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions';

import { BudgetCategoryList, BudgetTransactionList } from './components';
import { Grid } from './Budget.css';

const Budget = ({ fetchAllCategories, fetchBudget, fetchBudgetedCategories, commonState, budgetState }) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchAllCategories();
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchAllCategories]);
  const isLoaded = useMemo(
    () => commonState === 'LOADED' && Object.keys(budgetState).length === 0,
    [commonState, budgetState],
  );

  return (
    <Wrapper>
      <Grid>
        <section>
          {isLoaded ? (
            <BudgetCategoryList />
          ) : (
            <LoadingIndicator />
          )}
        </section>
        <section>
          <Button to="/budget/transactions/new">{t('Add new transaction')}</Button>
          {isLoaded ? (
            <BudgetTransactionList />
          ) : (
            <LoadingIndicator />
          )}
        </section>
      </Grid>
    </Wrapper>
  );
};

export default connect(state => ({
  commonState: state.common.state,
  budgetState: state.budget.loadingState,
}), {
  fetchAllCategories,
  fetchBudget,
  fetchBudgetedCategories,
})(Budget);
