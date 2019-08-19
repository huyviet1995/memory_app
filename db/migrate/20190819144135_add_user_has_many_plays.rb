class AddUserHasManyPlays < ActiveRecord::Migration[5.2]
  def change
    add_column :plays, :user_id, :integer
    add_index :plays, :user_id
  end
end
