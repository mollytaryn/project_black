module ApplicationHelper

  def flash_class(level)
    case level.to_sym
    when :notice then "Flash-notice"
    when :success then "Flash-success"
    when :error then "Flash-error"
    when :alert then "Flash-alert"
    end
  end

end
