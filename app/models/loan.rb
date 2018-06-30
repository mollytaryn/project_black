class Loan < ActiveRecord::Base

  belongs_to :user
  belongs_to :loan_category

  validates_length_of :name, maximum: 30
  validates_presence_of :name, :principle_balance, :interest_rate, :minimum_payment_due, :next_due_date
  validates_numericality_of :principle_balance, :interest_rate, :minimum_payment_due

  scope :total_principal, -> { sum(:principle_balance) }
  scope :by_highest_balance, -> { order(principle_balance: :desc) }

  def amortization_schedule(additional_payment = 0)
    balance = principle_balance
    monthly_interest_principal_balance = []
    while balance > minimum_payment_due
      new_balance = balance - (principal_this_month(balance) + additional_payment)
      monthly_interest_principal_balance << [interest_this_month(balance).round(2), principal_this_month(balance).round(2), new_balance.round(2)]
      balance = new_balance
    end
    monthly_interest_principal_balance
  end

  def growing?(balance = principle_balance, interest = interest_rate)
    principal_this_month(balance, interest) < 0
  end

  def interest_this_month(balance = principle_balance, interest = interest_rate)
    balance * monthly_interest_rate(interest)
  end

  def max_interest_rate
    ir = interest_rate
    growing?(principle_balance, ir) ? calc_max_ir(ir, false, 0.25) : calc_max_ir(ir, true, -0.25) - 0.25
  end

  def monthly_interest_rate(interest = interest_rate)
    interest_to_decimal(interest) / 12
  end

  def num_payments_left(additional_payment = 0)
    amortization_schedule(additional_payment).size
  end

  def pay_off_month(additional_payment = 0)
    (Date.today + num_payments_left(additional_payment).months).strftime('%b %Y')
  end

  def principal_this_month(balance = principle_balance, interest = interest_rate)
    minimum_payment_due - interest_this_month(balance, interest)
  end

  def total_interest(additional_payment = 0)
    amortization_schedule(additional_payment).sum(&:first).round(2)
  end

  def total_paid(additional_payment = 0)
    principle_balance + total_interest(additional_payment)
  end

  class << self
    def num_payments_left
      months = 0
      all.each do |loan|
        num_payments = loan.num_payments_left
        months = num_payments if num_payments > months
      end
      months
    end

    def pay_off_month
     (Date.today + num_payments_left.months).strftime('%b %Y')
    end

    def total_paid
      (total_interest + total_principal).round(2)
    end

    def total_interest
      total = 0
      all.each do |loan|
        total += loan.total_interest
      end
      total
    end
  end

  private

  def calc_max_ir(ir, boolean_value, step_value)
   until growing?(principle_balance, ir) == boolean_value
      ir = (ir - step_value)
    end
    ir
  end

  def interest_to_decimal(interest = interest_rate)
    interest / 100
  end
end
