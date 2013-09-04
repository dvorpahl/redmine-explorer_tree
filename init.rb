Redmine::Plugin.register :explorer_tree do
  name 'Explorer Tree (Index-View)'
  author 'Danilo Vorpahl'
  description 'this plugin enables "Explorer-Like" tree view'
  version '0.2'
  url 'http://www.plastart.de/redmine-explorer_tree.html'
  #author_url 'http://example.com/about'
end

require 'redmine'
require 'hooks/view_layouts_base_html_hook'
