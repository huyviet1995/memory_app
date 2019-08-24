class ApplicationController < ActionController::Base
  protect_from_forgery_with with: :exception 
  include SessionsHelper 

end
