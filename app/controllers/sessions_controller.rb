class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: session_params[:email])
    if (user && user.authenticate(session_params[:password])) 
      # Log the user and redirect to the user show page 
      log_in(user) 
      redirect_to user
    else
      # Create an error message 
      flash.now[:danger] = "Invalid login!"
    end 
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
end
