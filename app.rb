require 'sinatra'
require 'sinatra/reloader'

configure do
  set :public_folder, File.dirname(__FILE__) + "/public"
end

get '/' do
  send_file File.join('app/views/index.html')
end

get '/news' do
  send_file File.join('app/views/news.html')
end

get '/form' do
  send_file File.join('app/views/form.html')
end

get '/flood_locations' do
  send_file File.join('app/views/flood_locations_map.html')
end

get '/campaigns' do
  'Campaigns will be here'
end
