<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'libraries/REST_Controller.php';
require_once APPPATH . 'libraries/GoogleSignIn.php';

class REST_oauth2 extends REST_Controller
{

  function __construct(){
    parent::__construct();

    $this->_prepare_oauth_gapi();
  }

  /**
   * Check to see if the user is logged in with a Google Sign-in token
   *
   * @access protected
   * @return void
   */
  protected function _prepare_oauth_gapi()
  {
    // Load the gapi.php configuration file
    $this->load->config('gapi.php');

    $client = new GoogleSignIn();
    $client->setClientId((string) $this->config->item('google_client_id'));
    $client->setClientSecret((string) $this->config->item('google_client_secret'));

    $token = isset($_SERVER['HTTP_X_SESSION_TOKEN'])?$_SERVER['HTTP_X_SESSION_TOKEN']:NULL;
    $payload = $token?$client->getUserFromToken($token):NULL;

    if(!$payload){
      // Response and exit
      $this->response([
              $this->config->item('rest_status_field_name') => FALSE,
              $this->config->item('rest_message_field_name') => $this->lang->line('text_rest_unauthorized')
          ], self::HTTP_UNAUTHORIZED);
    }
  }

}
