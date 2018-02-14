class LoansController < ApplicationController
  before_action :authenticate_user!

  def new
    @loan = Loan.new
  end

  def create
    @record = current_user.loans.create(loan_params)
    @path = continue_loans_path
    @name = "loan"
    render 'shared/submit'
  end

  private

  def loan_params
    params.require(:loan).permit(:name, :principle_balance, :interest_rate, :minimum_payment_due, :loan_category_id, :next_due_date)
  end

end
