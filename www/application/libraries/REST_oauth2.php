<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'libraries/REST_Controller.php';
require_once APPPATH . 'libraries/GoogleSignIn.php';

class REST_oauth2 extends REST_Controller
{
  protected $client;

  function __construct(){
    parent::__construct();

    $this->load->library('session');
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

    $this->client = new GoogleSignIn();
    $this->client->setClientId((string) $this->config->item('google_client_id'));
    $this->client->setClientSecret((string) $this->config->item('google_client_secret'));

    $token = $this->getToken();
    $payload = $token?$this->client->getUserFromToken($token):NULL;

    if(!$payload){
      // Response and exit
      $this->response([
              $this->config->item('rest_status_field_name') => FALSE,
              $this->config->item('rest_message_field_name') => $this->lang->line('text_rest_unauthorized')
          ], self::HTTP_UNAUTHORIZED);
    }else{
        $this->db->where('gapi_uid', $payload['sub']);
        $this->db->from('usuario');
        if($this->db->count_all_results() == 0){
            // INSERT
            $data = array(
              'gapi_uid'       => $payload['sub'],
              'usua_nombres'   => $payload['given_name'],
              'usua_apellidos' => $payload['family_name'],
              'usua_email'     => $payload['email']
            );

            $this->db->set($data);
            $this->db->insert('usuario');
        }
    }
    $this->session->set_userdata('token', $token);
  }

  public function getGoogleClient(){
    return $this->client;
  }

  public function getToken(){
    return $this->input->server('HTTP_X_SESSION_TOKEN') ? $this->input->server('HTTP_X_SESSION_TOKEN') : $this->session->userdata('token');
  }

}
