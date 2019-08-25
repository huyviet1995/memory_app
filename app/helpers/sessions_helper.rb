module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id 
  end

  def log_out
    session.delete(:user_id) 
  end 

  def current_user
    if session[:user_id]
      @current_user = @current_user || User.find_by(id: session[:user_id]) 
    end
  end

  def logged_in?
    !@current_user.nil?
  end

  def login_title
    return "#{current_user.first_name}" if logged_in?
    "LOG IN"
  end

end
