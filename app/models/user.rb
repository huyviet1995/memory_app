class User < ApplicationRecord
  before_save { self.email = email.downcase }
  has_secure_password
  has_many :plays  
end
