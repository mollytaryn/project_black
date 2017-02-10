class CreateDebts < ActiveRecord::Migration
  def change
    create_table :debts do |t|
      t.string :name
      t.float :principle_balance
      t.float :interest_rate
      t.float :minimum_payment_due
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
