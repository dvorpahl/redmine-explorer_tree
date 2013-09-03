class RedmineExplorerTreeHookListener < Redmine::Hook::ViewListener

  ASSETS = File.dirname(__FILE__) + '/../../assets'
  PLUGIN = 'explorer_tree'

  def view_layouts_base_html_head(context = { })
    if File.file?( "#{ASSETS}/stylesheets/explorer_tree.css" )
      stylesheet_link_tag "explorer_tree", :plugin => PLUGIN
    end
    prj = context[:project]# || return
    if prj.nil?
        javascript_include_tag "explorer_tree", :plugin => PLUGIN
        stylesheet_link_tag "explorer_tree", :plugin => PLUGIN
    end
  end

  def view_layouts_base_body_bottom(context = { })
    prj = context[:project]# || return
    if prj.nil?
      stylesheet_link_tag "explorer_tree", :plugin => PLUGIN
      javascript_include_tag "explorer_tree", :plugin => PLUGIN
    end
  end

end