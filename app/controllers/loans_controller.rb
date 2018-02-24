class LoansController < ApplicationController
  before_action :authenticate_user!

  def new
    @loan = Loan.new
  end

  def create
    @record = current_user.loans.create(complete_params)
    @path = continue_loans_path
    @name = "loan"
    render 'shared/submit'
  end

  private

  def complete_params
    loan_params.merge(next_due_date: construct_date)
  end

  def loan_params
    params.require(:loan).permit(:name, :principle_balance, :interest_rate, :minimum_payment_due, :loan_category_id)
  end

  def construct_date
    begin
      Date.new(params[:next_due_date][:year].to_i, params[:next_due_date][:month].to_i, params[:next_due_date][:day].to_i)
    rescue
      nil
    end
  end
end
