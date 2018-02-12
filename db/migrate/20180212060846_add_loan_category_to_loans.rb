class AddLoanCategoryToLoans < ActiveRecord::Migration
  def change
    add_reference :loans, :loan_category, index: true, foreign_key: true
  end
end
