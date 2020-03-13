FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn
RUN mkdir /artifacts
WORKDIR /artifacts
COPY Gemfile /artifacts/Gemfile
COPY Gemfile.lock /artifacts/Gemfile.lock
RUN gem install bundler
RUN gem install rails
RUN bundle install
COPY . /artifacts
RUN yarn install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
EXPOSE 4000
RUN set -e
# Remove a potentially pre-existing server.pid for Rails.
RUN rm -f /artifacts/tmp/pids/server.pid
