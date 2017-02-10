class LoansController < ApplicationController
  before_action :authenticate_user!

  def new
    @loan = Loan.new
  end

  def create
    @loan = current_user.loans.create(loan_params)
    if @loan.errors.any?
      flash[:error] = "There was an issue saving your loan."
      redirect_to(:back)
    else
      flash[:success] = "You have successfully saved this loan."
      redirect_to loans_path
    end
  end

  private

  def loan_params
    params.require(:loan).permit(:name, :principle_balance, :interest_rate, :minimum_payment_due)
  end

end
