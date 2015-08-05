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

get '/news-form' do
  send_file File.join('app/views/news-form.html')
end

get '/form' do
  send_file File.join('app/views/form.html')
end

get '/flood-locations' do
  send_file File.join('app/views/flood-locations-map.html')
end

# For old links
get '/flood_locations' do
  send_file File.join('app/views/flood-locations-map.html')
end

get '/campaigns' do
  send_file File.join('app/views/campaigns.html')
end

get '/about-us' do
  send_file File.join('app/views/about.html')
end
