class LoansController < ApplicationController
  before_action :authenticate_user!

  def new
    @loan = Loan.new
  end

  def create
    @loan = current_user.debts.new(loan_params)
    if @loan.save
      flash[:message] = "You have successfully saved this debt."
    else
      flash[:error] = "There was an issue saving your debt."
    end
  end

  private

  def loan_params
    params.require(:debt).permit(:name, :principle_balance, :interest_rate, :minimum_payment_due)
  end

end
