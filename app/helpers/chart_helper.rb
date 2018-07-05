module ChartHelper
  def payments_left_array(loan)
    num = loan.num_payments_left
    (1..num).to_a
  end
end
