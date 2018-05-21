class DashboardController < ApplicationController

  before_action :authenticate_user!

  layout 'dashboard'

  def show
    @loans = current_user.loans.by_highest_balance
  end

end
