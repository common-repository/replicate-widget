<?php
/*
 Plugin Name: Replicate Widget
 Plugin URI: http://wordpress.org/plugins/replicate-widget
 Description: This plugin will help you to replicate a widget. (Go to: Dashboard -> Appearance -> Widgets, open a widget and click Replicate button)
 Version: 1.0
 Author: Alexandru Vornicescu
 Author URI: https://profiles.wordpress.org/alexvorn2
 */
 
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Function on plugin 
function replicate_widget__activation_action() {
	// Nothing, just because
}

// Function on plugin deactivation
function replicate_widget__deactivation_action() {
	// Nothing, just because
}

final class replicate_widget {

	public static function instance() {

		// Store the instance locally to avoid private static replication
		static $instance = null;

		// Only run these methods if they haven't been ran previously
		if ( null === $instance ) {
			$instance = new replicate_widget;
			$instance->setup_globals();
			$instance->includes();
		}

		// Always return the instance
		return $instance;
	}
	
	private function setup_globals() {

		/** Versions **********************************************************/

		$this->version         = '1.0';

		// Setup some base path and URL information
		$this->file            = __FILE__;
		$this->basename        = plugin_basename( $this->file );
		$this->plugin_dir      = plugin_dir_path( $this->file );
		$this->plugin_url      = plugin_dir_url ( $this->file );

		// Includes
		$this->admin_dir       = trailingslashit( $this->plugin_dir . 'admin'  );
		$this->admin_url       = trailingslashit( $this->plugin_url . 'admin'  );
		
		/** Misc **************************************************************/
		$this->domain          = 'replicate_widget';   
	}
	
	private function includes() {
		require( $this->plugin_dir . 'actions.php'                                           );
		
		if ( is_admin() ) {
			require( $this->admin_dir . 'actions.php'                                        );
			require( $this->admin_dir . 'functions.php'                                      );
		}
	}
}


function replicate_widget() {
	return replicate_widget::instance();
}

// Function that will activate our plugin
replicate_widget();