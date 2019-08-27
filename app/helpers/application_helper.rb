module ApplicationHelper
  def format_time(time)
    time.to_formatted_s(:long)
  end 
end
