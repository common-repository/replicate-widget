var replicate_widget;
( function( $ ) {
	replicate_widget = {
		init : function() {

			// On widget open or on widget replicate
			$( document.body ).on( 'click', function( e ) {
				var target = $( e.target ), widget, inside, controls, delete_button;

				if ( target.parents( '.widget-top' ).length ) {
					widget = target.closest( '.widget' );
					controls = widget.find( '.widget-control-actions' );
					
					if ( ! controls.hasClass( 'replicate-widget' ) )  {
						controls.addClass( 'replicate-widget' );
						
						delete_button = controls.find( '.widget-control-remove' );
						
						delete_button.after( " | " + '<button type="button" class="button-link widget-control-replicate">Replicate</button>' );
					}
					
					e.preventDefault();
				} else if ( target.hasClass( 'widget-control-replicate' ) ) {
					widget = target.closest( '.widget' );
					replicate_widget.replicate( widget );
					
					e.preventDefault();
				}
			} );
		},
		
		replicate : function( widget ) {
			var id_base                           = widget.find( 'input[name="id_base"]' ).val();
			var search_widget_base_id             = $( 'input.widget-id[value="' + id_base + '-__i__"]' );
			var search_widget                     = search_widget_base_id.closest( '.widget' );
			var search_widget_multi_number        = search_widget_base_id.siblings( 'input.multi_number' );
			var search_widget_multi_number_val    = search_widget_multi_number.val();
			var replicate                         = search_widget.clone();

			replicate.html(
				replicate.html().replace( /<[^<>]+>/g, function( tag ) {
					return tag.replace( /__i__|%i%/g, search_widget_multi_number_val );
				})
			);
			
			replicate.attr( 'id', replicate.attr( 'id' ).replace( '__i__', search_widget_multi_number_val ) );

			var search_widget_multi_number_new_val = Number( search_widget_multi_number_val ) + 1;
			search_widget_multi_number.val( search_widget_multi_number_new_val );

			widget.after( replicate );

			var widget_next = widget.next();
			
			wpWidgets.save( widget_next, 0, 0, 1 );
			
			$( document ).trigger( 'widget-added', [ widget_next ] );
		}
	};

	$( document ).ready( function( $ ) { replicate_widget.init(); } );
} ) ( jQuery );