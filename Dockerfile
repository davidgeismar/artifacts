FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y \
curl \
vim \
build-essential \
libpq-dev &&\
curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y nodejs yarn postgresql-client

RUN mkdir /artifacts
WORKDIR /artifacts

EXPOSE 4000

COPY . .
RUN gem install bundler
RUN gem install rails
RUN bundle install
RUN yarn install
RUN RAILS_ENV=production RACK_ENV=production NODE_ENV=production bundle exec rake assets:precompile
RUN rm -f ./tmp/pids/server.pid
# Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# RUN set -e
# Remove a potentially pre-existing server.pid for Rails.
