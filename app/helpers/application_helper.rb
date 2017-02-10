module ApplicationHelper

  def flash_class(level)
    case level.to_sym
    when :notice then "Flash Flash-notice"
    when :success then "Flash Flash-success"
    when :error then "Flash Flash-error"
    when :alert then "Flash Flash-alert"
    end
  end

end
