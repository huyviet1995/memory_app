class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: session_params[:email])
    if (user && user.authenticate(session_params[:password])) 
      # Log the user and redirect to the user show page 
    else
      # Create an error message 
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
