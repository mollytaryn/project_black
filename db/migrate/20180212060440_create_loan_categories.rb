class CreateLoanCategories < ActiveRecord::Migration
  def change
    create_table :loan_categories do |t|
      t.string :name
      t.string :key

      t.timestamps null: false
    end
  end
end
