class DebtsController < ApplicationController

  before_action :authenticate_user!

  def create
    debt = current_user.debts.new(debt_params)
    if debt.save
      flash[:message] = "You have successfully saved this debt."
    else
      flash[:error] = "There was an issue saving your debt."
    end
  end

  private

  def debt_params
    params.require(:debt).permit(:name, :principle_balance, :interest_rate, :minimum_payment_due)
  end

end
