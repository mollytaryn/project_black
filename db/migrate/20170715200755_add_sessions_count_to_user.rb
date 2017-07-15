class AddSessionsCountToUser < ActiveRecord::Migration
  def change
    add_column :users, :sessions_count, :integer
  end
end
