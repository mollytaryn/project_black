class AddNextDueDateToLoans < ActiveRecord::Migration
  def change
    add_column :loans, :next_due_date, :date
  end
end
