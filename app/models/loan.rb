class Loan < ActiveRecord::Base

  belongs_to :user

  validates_length_of :name, maximum: 30
  validates_presence_of :name, :principle_balance, :interest_rate, :minimum_payment_due
  validates_numericality_of :principle_balance, :interest_rate, :minimum_payment_due
  validates_numericality_of :monthly_payment_day, only_integer: true, greater_than: 0, less_than: 32
  scope :total, -> { sum(:principle_balance) }

end
