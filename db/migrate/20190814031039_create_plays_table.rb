class CreatePlaysTable < ActiveRecord::Migration[5.2]
  def change
    create_table :plays do |t|
      t.integer :score, default: 0
      t.integer :level, default: 1
      t.timestamps
    end
  end
end
