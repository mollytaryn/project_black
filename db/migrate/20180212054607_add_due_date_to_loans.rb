class AddDueDateToLoans < ActiveRecord::Migration
  def change
    add_column :loans, :due_date, :date
  end
end
