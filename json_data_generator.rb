# frozen_string_literal: true

require 'csv'
require 'json'
# Teams runs in ipl problem
def teams_runs
  deliveries = CSV.read('deliveries.csv', headers: true)
  teams_runs = Hash.new(0)
  deliveries.each do |row|
    teams_runs[row[2]] += row[17].to_i
  end
  teams_runs
end
File.open('json_data/teams_runs.json', 'w') { |f| f.write teams_runs.to_json }

# Rcb top players runs
def rcb_players_runs
  deliveries = CSV.read('deliveries.csv', headers: true)
  rcb_players_runs = Hash.new(0)
  deliveries.each do |row|
    rcb_players_runs[row[6]] += row[15].to_i if row[2] == 'Royal Challengers Bangalore'
  end
  rcb_players_runs.sort_by { |_k, v| v }.reverse.to_h
end
# pp rcb_players_runs.first(10)
File.open('json_data/rcb_players_runs.json', 'w') { |f| f.write rcb_players_runs.first(10).to_h.to_json }
# pp rcb_players_runs.to_json

# Games played by teams by season
def games_played
  matches = CSV.read('matches.csv', headers: true)
  matches_by_team_per_season = {}
  matches.each do |row|
    matches_by_team_per_season[row[1]] = Hash.new(0) unless matches_by_team_per_season.key?(row[1])

    matches_by_team_per_season[row[1]][row[4]] += 1
    matches_by_team_per_season[row[1]][row[5]] += 1
  end
  matches_by_team_per_season
end

File.open('json_data/games_played_byteams.json', 'w') { |f| f.write games_played.to_json }
# pp games_played.to_json

# Umpires by nation
def umpires_by_country
  umpires_data = CSV.read('umpires.csv', headers: true)

  umpires_by_country = Hash.new(0)
  umpires_data.each do |row|
    umpires_by_country[row[1]] += 1
  end
  umpires_by_country
end
File.open('json_data/umpires_by_nation.json', 'w') { |f| f.write umpires_by_country.to_json }
