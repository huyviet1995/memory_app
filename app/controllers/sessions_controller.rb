class SessionsController < ApplicationController
  before_action :save_my_previous_url, only: [:create, :new]

  def new
  end

  def create
    user = User.find_by(email: session_params[:email])
    if (user && user.authenticate(session_params[:password])) 
      # Log the user and redirect to the user show page 
      log_in(user) 
      flash.now[:success] = "Welcome, #{current_user}" 
      redirect_to session[:my_previous_url] 
    else
      # Create an error message 
      flash.now[:danger] = "Invalid login!"
    end 
  end 

  # Render  
  def destroy
    log_out
    redirect_to '/'
  end

  private

  def session_params 
    params.require(:session).permit(
      :user_id,
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end 

  def save_my_previous_url
    session[:my_previous_url] = URI(request.referer || '').path
  end
end
