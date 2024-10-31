<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

$replicate_widget = replicate_widget();
$plugin_file = $replicate_widget->file;

// Plugin Activation
register_activation_hook( $plugin_file,                               'replicate_widget__activation_action'                          );

// Plugin Deactivation
register_deactivation_hook( $plugin_file,                             'replicate_widget__deactivation_action'                        );