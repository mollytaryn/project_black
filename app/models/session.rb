class Session < ApplicationRecord
  belongs_to :user, counter_cache: true

  default_scope { order(created_at: :desc) }

  def length_in_minutes
    ((ended_at - created_at)/60).round
  end
end
