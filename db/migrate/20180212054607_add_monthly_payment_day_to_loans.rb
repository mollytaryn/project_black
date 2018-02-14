class AddMonthlyPaymentDayToLoans < ActiveRecord::Migration
  def change
    add_column :loans, :monthly_payment_day, :integer
  end
end
